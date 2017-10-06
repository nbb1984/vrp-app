/* global AFRAME */
var axios = require("axios");
var GSVPANO = require('../lib/GSVPano');





var axiosConfig = {
	baseUrl: window.location.origin
};

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
		console.log(axiosConfig);
		var data = this.data;
		var el = this.el;

		axios.get('/compDetails/search', axiosConfig)
			.then((response) => {
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
		var root = document.querySelector('a-router');
		root.appendChild(mapBtn);
	},

	keyboardClosed: function () {
		this.el.emit("keyboardIsClosedMove");
		var mapBtn = document.querySelector('a-button#mapButton');
		if (mapBtn) mapBtn.parentNode.removeChild(mapBtn);
	},


	showMap: function () {
		var mapEl, mapBtn;
		var root = document.querySelector('a-entity#content-root');
		if (document.querySelector('a-entity#mapElement')) {
			mapEl = document.querySelector('a-entity#mapElement');
			mapEl.parentNode.removeChild(mapEl);
			mapBtn = document.querySelector('a-button#mapButton');
			mapBtn.setAttribute('value', 'show map');
		} else {
			mapEl = document.createElement('a-entity');
			mapEl.setAttribute('id', 'mapElement');
			mapEl.setAttribute('map-overlay', 'nothing:nothing;');
			root.appendChild(mapEl);
			mapBtn = document.querySelector('a-button#mapButton');
			mapBtn.setAttribute('value', 'hide map');
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
		this.removeErrorMsg();
		console.log(location);
		return axios.post('/search', {query: location}, axiosConfig)
			.then((response) => {
				console.log(response);
				if(response.data.ok){
					this.getPic(response.data.details.lat, response.data.details.lng);
				} /*else {
					if(_.has(response, 'data.err')){
						console.log('error during search or search save');
					}
					if(_.has(response, 'data.userError')){
						console.log('not logged in');
					}
				}*/



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
			})
			.catch(err =>{
				console.log(err);
				this.errorMsg(err);
			})

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
		return axios.post('/search-save', {query: location}, axiosConfig).then((response) => {
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
				this.removeErrorMsg();
				this.showPic(newImage, lat, lng);
			} catch (err) {
				console.log(err);
				this.errorMsg(message);
			}
		};

		// Invoke the load method with a LatLng point.
		loader.load(new google.maps.LatLng(lat, lng));

		// Set error handle.
		loader.onError = (message) => {
			this.errorMsg(message);
			//alert(message); // todo plug in a different means of informing user that no results exist
			return null;
		}

	},

	errorMsg: function (errorMessage) {
		var priorError = document.querySelector('a-entity#errorMsg');
		if(priorError){
			priorError.parentNode.removeChild(priorError);
		}
		var messageContainer = document.createElement('a-entity');
		messageContainer.setAttribute('id', 'errorMsg');

		console.log(errorMessage);
		var msgPlane = document.createElement('a-entity');
		msgPlane.setAttribute('zOffset', '0.01');
		msgPlane.setAttribute('geometry', "primitive: plane; height: auto; width: 5");
		msgPlane.setAttribute('material', "color: red; transparent: true; opacity: 0.4");
		msgPlane.setAttribute('text', "value:" + errorMessage + "; color: white");
		msgPlane.setAttribute('position', {x: -7, y: 0, z: -4});
		msgPlane.setAttribute('rotation', {x: 0, y: 30, z: 0});
		messageContainer.appendChild(msgPlane);

		this.el.appendChild(messageContainer);
	},

	removeErrorMsg: function () {
		var priorError = document.querySelector('a-entity#errorMsg');
		if(priorError){
			priorError.parentNode.removeChild(priorError);
		}
	},

	showPic: function (newImage, lat, lng) {
		console.log('newImage');
		if (newImage) {
			$('a-sky').attr('src', newImage);
			$('a-sky').attr('data-lat', lat);
			$('a-sky').attr('data-lng', lng);
			this.showMap();
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
		this.removeErrorMsg();
		var imageEl = document.querySelector('a-sky');
		var lat = imageEl.getAttribute('data-lat');
		var lng = imageEl.getAttribute('data-lng');
		var image = imageEl.getAttribute('src');
		axios.post('/saveSearchImage', {lat: lat, lng: lng, image: image}, axiosConfig)
			.then(response => {
				console.log(response);
			})
			.catch(err => {
				console.log(err);
				this.errorMsg(err);
			})
	}

});