/* global AFRAME */
var axios = require("axios");
var GSVPANO = require('../lib/GSVPano');
var _ = require('lodash');
/**
 * GOOGLE MAP WILL ONLY SHOW IF THE URL IS NOT A HASH URL.
 * A STREET VIEW IMAGE WILL ONLY BE FOUND IF THE COORDINATES USED LIE ON A STREET (OR AT LEAST VERY VERY CLOSE [I THINK])
 *
 */
AFRAME.registerComponent('search', {
	schema: {
		nothing: {type: 'string'}
	},

	init: function () {
		//console.log(window.simpleState);
		var data = this.data;
		var el = this.el;
		this.loggedIn = document.querySelector('a-router').is('LoggedIn');
		axios.get(window.location.origin + '/compDetails/search')
			.then((response) => {
				if (_.has(response, 'user')) {
				//	this.user = response.data.user;
					document.querySelector('a-router').addState('LoggedIn');
				}
				var details = response.data.details;
				var exclude = response.data.exclude;
				exclude.push('element');
				for (var i = 0; i < details.length; i++) {
					var newEl = document.createElement(details[i].element);
					for (var prop in details[i]) {
						if (!exclude.includes(prop)) {
							newEl.setAttribute(prop, details[i][prop])
						}
					}

					if (details[i].item === "button") {
						newEl.addEventListener('click', (event) => {
							var input = document.querySelector('a-input');
							var queryTerm = input.value;
							//this.getPic();
							this.runQueryBackEnd('eiffel tower');
							if (queryTerm) {
								if (queryTerm.length > 0) {
									//	this.runQuery(queryTerm);
								}
							}
							console.log(input.value);
						})
					}


					el.appendChild(newEl);
				}
				el.setAttribute("animation__keyopen", {
					property: "position",
					easing: "easeOutCubic",
					from: {x: 0, y: 0, z: 0},
					to: {x: 0, y: 1.25, z: 0},
					dur: 1500,
					startEvents: "keyboardIsOpenMove",
					dir: "normal"
				});

				el.setAttribute("animation__keyclose", {
					property: "position",
					easing: "easeOutCubic",
					from: {x: 0, y: 1.25, z: 0},
					to: {x: 0, y: 0, z: 0},
					dur: 1500,
					startEvents: "keyboardIsClosedMove",
					dir: "normal"
				});
				var scene = document.querySelector('a-scene');
				scene.addEventListener('keyboardIsOpen', this.keyboardOpen.bind(this));
				scene.addEventListener('keyboardIsClosed', this.keyboardClosed.bind(this));
				scene.addEventListener('gotLocation', this.mapCoordinates.bind(this));
			});
	},

	remove: function () {
		var scene = document.querySelector('a-scene');
		scene.removeEventListener('keyboardIsOpen', this.keyboardOpen.bind(this));
		scene.removeEventListener('keyboardIsClosed', this.keyboardClosed.bind(this));
		scene.removeEventListener('gotLocation', this.mapCoordinates.bind(this));
	},

	keyboardOpen: function () {
		this.el.emit("keyboardIsOpenMove");
		let isMobile = AFRAME.utils.device.isMobile();
		if(!isMobile){
			var mapBtn = document.createElement('a-button');
			mapBtn.setAttribute('id', 'mapButton');
			mapBtn.setAttribute('class', 'clickable');
			mapBtn.setAttribute('color', 'white');
			if (!document.querySelector('a-entity#mapElement')) {
				mapBtn.setAttribute('value', 'show map');
			} else {
				mapBtn.setAttribute('value', 'hide map');
			}
			mapBtn.setAttribute('position', {x: -1.1, y: -2.5, z: -3.8});
			mapBtn.setAttribute('scale', {x: 2.0, y: 0.8, z: 0.8});
			mapBtn.addEventListener('click', this.showMap.bind(this));
			let root = document.querySelector('a-router');
			root.appendChild(mapBtn);
		}
	},

	keyboardClosed: function () {
		this.el.emit("keyboardIsClosedMove");
		var mapBtn = document.querySelector('a-button#mapButton');
		this.tryRemoveElement(mapBtn);
		//if (mapBtn) mapBtn.parentNode.removeChild(mapBtn);
	},


	showMap: function (updateOnly) {
		console.log('show map');
		var root, mapEl, mapBtn;
		root = document.querySelector('a-entity#content-root');
		mapEl = document.querySelector('a-entity#mapElement');

		if (!mapEl) {
			console.log('make map');
			mapEl = document.createElement('a-entity');
			mapEl.setAttribute('id', 'mapElement');
			mapEl.setAttribute('map-overlay', 'nothing:nothing;');
			root.appendChild(mapEl);
			mapBtn = document.querySelector('a-button#mapButton');
			mapBtn.setAttribute('value', 'hide map');
		}
	},

	hideMap: function () {
		var root, mapEl, mapBtn;
		if (document.querySelector('a-entity#mapElement')) {
			mapEl = document.querySelector('a-entity#mapElement');
			mapEl.parentNode.removeChild(mapEl);
			mapBtn = document.querySelector('a-button#mapButton');
			mapBtn.setAttribute('value', 'show map');
		}
	},

	getMyLocation: function () {
		var el = document.getElementById('myLocationButton');
		el.addEventListener('click', function (event) {
			event.preventDefault();
			navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
		}, false);
	},

	geoSuccess: function (position) {

		var currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		var isMapPresent = document.querySelector('a-entity#mapElement');
		if(isMapPresent){
			isMapPresent.emit('goToLocation', {currentLocation: currentLocation});
			// move to position (thanks @theCole!)
		}


	},


	mapCoordinates: function (event) {
		// USING THE MAP ALSO HAS SOME BUGS/GOTCHAS.  MAP GOING BLANK  NOT RECOVERING, AND NO RESULTS;
		console.log(event);
		var lat = event.detail.lat;
		var lng = event.detail.lng;
		this.getPic(lat, lng);
		/*	var baseUrl = window.location.origin;
			var queryUrl = baseUrl + '/searchThumbCoords/' + lat +"/"+ lng;
			return axios.get(queryUrl).then((response) => {
				console.log(response);
				this.showPic(response.data.url)
			})*/
	},


	runQueryBackEnd: function (location) {
		var errorMsg = document.querySelector('a-entity#errorMsg');
		if (errorMsg) {
			errorMsg.parentNode.removeChild(errorMsg);
		}

		this.el.addState('newSearch');
		console.log(location);
		return axios.post(window.location.origin + '/search', {query: location})
			.then((response) => {
				console.log(response);
				if (response.data.ok) {
					this.getPic(response.data.details.lat, response.data.details.lng);
				} else {
					if (_.has(response, 'data.err')) {
						console.log('error during search or search save');
					}
					if (_.has(response, 'data.userError')) {
						console.log('not logged in');
					}
				}


				/*var placeName = response.data[1].address.replace(/\s*!/, "+");
				//this.runQuery(encodeURI(placeName));
				var getImage = baseUrl + '/save/photo/' + response.data[1].coords + '/' + response.data[1].address;
				axios.get(getImage)
					.then((response) => {
						console.log(response);
					})
					.catch(err => {
						console.log(err);
					})*/
			});

	},

	saveImage: function () {
		var sky = document.querySelector('a-sky');
		var lat = sky.getAttribute('data-lat');
		var lng = sky.getAttribute('data-lng');
		var src = sky.getAttribute('src');
		axios.get(src)
			.then((response) => {
				console.log(response);
			});
		var baseUrl = window.location.origin;
		var queryUrl = baseUrl + '/search-save';
		return axios.post(queryUrl, {query: location}).then((response) => {
			console.log(response);
			var getImage = baseUrl + '/save/photo/' + response.data[1].coords + '/' + response.data[1].address;
			axios.get(getImage)
				.then((response) => {
					console.log(response);
				})
				.catch(err => {
					console.log(err);
				})

		});
	},


	runQuery: function (location) {
		console.log(location);
		var geocodeAPI = "4f03af1a1ea4428891dd006b61a9b4be";
		// Figure out the geolocation
		var queryURL = "http://api.opencagedata.com/geocode/v1/json?query=" + location + "&min_confidence=9&pretty=1&key=" + geocodeAPI;
		return axios.get(queryURL).then((response) => {
			console.log(response);
			// If get get a result, return that result's formatted address property
			if (response.data.results[0]) {
				var lat = response.data.results[0].geometry.lat;
				var lng = response.data.results[0].geometry.lng;
				console.log(response.data.results[0].geometry);
				console.log(lat);
				console.log(lng);
				//var newImage = this.getPic(lat, lng);
				this.getPic(lat, lng);


				//this.getPic();
				//return response.data.results[0];
			}
			// If we don't get any results, return an empty string
			$("a-text#noresults")
			//return "";
		});
	},

	// Google Street view only returns an image if the lat/long (location) is near enough (corresponds) to
	// A location which is a street and where a street view image exists.
	getPic: function (queryLat, queryLng) {
		// todo plug in a different means of informing user that no results exist
		var zoom = 1;

		var lat = queryLat || 32.472170; //41.5044381; //39.9495073;//41.5044381; //32.472170;
		var lng = queryLng || 34.996909;//-81.6068944; //-75.1506225;//-81.6068944; //34.996909;
		var loader = new GSVPANO.PanoLoader({zoom: zoom});
		//var loader = GSVPANO.PanoLoader({zoom: zoom});

		loader.onPanoramaLoad = (data) => {
			try {
				// did not think of creating a canvas element to hold the image but never attaching it to the DOM
				console.log(data);
				var newImage = data.toDataURL();
				console.log("LOADED:", data);
				this.showPic(newImage, lat, lng);
			} catch (err) {
				console.log(err);
				//this.errorMsg(message);
				this.onGetPicError("No Result.  Here is a Random View!");
			}
		};

		// Invoke the load method with a LatLng point.
		loader.load(new google.maps.LatLng(lat, lng));

		// Set error handle.
		loader.onError = (message) => {
			this.onGetPicError(message);
			//this.errorMsg(message);
			//alert(message); // todo plug in a different means of informing user that no results exist
			return null;
		}

	},

	onGetPicError: function (message) {
		this.errorMsg(message);
		if (this.el.is('newSearch')) {
			this.el.removeState('newSearch');
			var randomPics = [
				{lat: 40.7016113, lng: -73.9890025},
				{lat: 40.7012087, lng: -73.9877161},
				{lat: 34.0419134, lng: -118.2564639},
				{lat: 40.6431476, lng: -111.4953956}
			];

			var randomLoc = randomPics[Math.floor(Math.random() * randomPics.length)];
			this.getPic(randomLoc.lat, randomLoc.lng);
		}
	},

	errorMsg: function (errorMessage) {
		var priorError = document.querySelector('a-entity#errorMsg');
		this.tryRemoveElement(priorError);
		var messageContainer = document.createElement('a-entity');
		messageContainer.setAttribute('id', 'errorMsg');

		console.log(errorMessage);
		var msgPlane = document.createElement('a-entity');
		msgPlane.setAttribute('zOffset', '0.01');
		msgPlane.setAttribute('geometry', "primitive: plane; height: auto; width: 5");
		msgPlane.setAttribute('material', "color: red; transparent: true; opacity: 0.4");
		msgPlane.setAttribute('text', "value:" + errorMessage + "; color: white");
		msgPlane.setAttribute('position', {x: 7, y: 0, z: -4});
		msgPlane.setAttribute('rotation', {x: 0, y: -30, z: 0});
		messageContainer.appendChild(msgPlane);

		this.el.appendChild(messageContainer);
	},

	showPic: function (newImage, lat, lng) {
		console.log('newImage');
		if (this.el.is('newSearch')) {
			this.el.removeState('newSearch');
		}
		if (newImage) {
			$('a-sky').attr('src', newImage);
			$('a-sky').attr('data-lat', lat);
			$('a-sky').attr('data-lng', lng);

			this.hideMap();

			this.showSaveButton();
		} else {
			// inform user no image was found
		}
	},

	showSaveButton: function () {
		if (!document.querySelector('a-button#saveButton')) {
			var saveBtn = document.createElement('a-button');
			saveBtn.setAttribute('id', 'saveButton');
			saveBtn.setAttribute('class', 'clickable');
			saveBtn.setAttribute('color', 'white');
			saveBtn.setAttribute('value', 'save image');
			saveBtn.setAttribute('position', {x: -1.1, y: -3.5, z: -3.8});
			saveBtn.setAttribute('scale', {x: 2.0, y: 0.8, z: 0.8});
			saveBtn.addEventListener('click', this.savePic.bind(this));
			var root = document.querySelector('a-router');
			root.appendChild(saveBtn);
		}
	},

	savePic: function () {
		var imageEl = document.querySelector('a-sky');
		var lat = imageEl.getAttribute('data-lat');
		var lng = imageEl.getAttribute('data-lng');
		var image = imageEl.getAttribute('src');
		var data = {lat: lat, lng: lng, image: image};
		console.log(data);
		axios.post(window.location.origin + '/saveSearchImage', data)
			.then(response => {
				console.log(response);
				if (_.has(response, 'data.err')) {
					console.log('error during search or search save');
				}
				if (_.has(response, 'data.userError')) {
					this.errorMsg("Must Be Logged In to Save");
					console.log('not logged in');
				}
			})
			.catch(err => {
				console.log(err);
			})
	},

	tryRemoveElement: function (element) {
		if (!element) {
			return;
		}
		element.parentNode.removeChild(element);
	}

});