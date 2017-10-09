/* global AFRAME */
var axios = require("axios");
var GSVPANO = require('../lib/GSVPano');
var _ = require('lodash');

var messageDisplay = require('./display-errors');
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
		var data = this.data;
		var el = this.el;
		this.loggedIn = document.querySelector('a-router').is('LoggedIn');
		axios.get(window.location.origin + '/compDetails/search')
			.then((response) => {
				if (_.has(response, 'user')) {
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
							if (queryTerm) {
								if (queryTerm.length > 0) {
									this.runQuery(queryTerm);
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

	// clean up listeners when the component is removed from the dom/scene
	remove: function () {
		var scene = document.querySelector('a-scene');
		scene.removeEventListener('keyboardIsOpen', this.keyboardOpen.bind(this));
		scene.removeEventListener('keyboardIsClosed', this.keyboardClosed.bind(this));
		scene.removeEventListener('gotLocation', this.mapCoordinates.bind(this));
	},


	// add the show map button and animate the input field when the keyboard is hidden
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

	// remove the show map button and animate the input field when the keyboard is hidden
	keyboardClosed: function () {
		this.el.emit("keyboardIsClosedMove");
		var mapBtn = document.querySelector('a-button#mapButton');
		this.tryRemoveElement(mapBtn);
	},


	// show the 'overlay-map' (produced via the map-overlay component)
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

	// hide the 'overlay-map
	hideMap: function () {
		var mapEl, mapBtn;
		if (document.querySelector('a-entity#mapElement')) {
			mapEl = document.querySelector('a-entity#mapElement');
			mapEl.parentNode.removeChild(mapEl);
			mapBtn = document.querySelector('a-button#mapButton');
			mapBtn.setAttribute('value', 'show map');
		}
	},



	// get the coordinates when a user clicks on the html map 'overlay'
	mapCoordinates: function (event) {
		// USING THE MAP ALSO HAS SOME BUGS/GOTCHAS.  MAP GOING BLANK  NOT RECOVERING, AND NO RESULTS;
		var lat = event.detail.lat;
		var lng = event.detail.lng;
		this.getPic(lat, lng);
	},


	 // Send the search query to the server to request the related latitude and longitude;
	runQueryBackEnd: function (location) {
		var errorMsg = document.querySelector('a-entity#errorMsg');
		if (errorMsg) {
			errorMsg.parentNode.removeChild(errorMsg);
		}

		this.el.addState('newSearch');
		return axios.post(window.location.origin + '/search', {query: location})
			.then((response) => {
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
			});

	},


	// attempt to retrieve the image corresponding to the lat and lng obtained from google geocode api

	getPic: function (queryLat, queryLng) {
		// todo plug in a different means of informing user that no results exist
		var zoom = 1;
		// Google Street view only returns an image if the lat/long (location) is near enough (corresponds) to
		// A location which is a street and where a street view image exists.
		var lat = queryLat || 32.472170; //41.5044381; //39.9495073;//41.5044381; //32.472170;
		var lng = queryLng || 34.996909;//-81.6068944; //-75.1506225;//-81.6068944; //34.996909;
		var loader = new GSVPANO.PanoLoader({zoom: zoom});

		// handle obtained image or error
		loader.onPanoramaLoad = (data) => {
			try {
				var newImage = data.toDataURL();
				this.showPic(newImage, lat, lng);
			} catch (err) {
				console.log(err);
				this.onGetPicError("No Result.  Here is a Random View!");
			}
		};

		// Invoke the load method with a LatLng point.
		loader.load(new google.maps.LatLng(lat, lng));

		// Set error handle.
		loader.onError = (message) => {
			this.onGetPicError(message);
			return null;
		}

	},



	// Display One from a list of pre-selected images when an image for the search location fails to produce a result;

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

	errorMsg: messageDisplay,


	 // Display the dataURL and note the related lat and lng for possible image save
	showPic: function (newImage, lat, lng) {
		// track if the image returned is from a user query or a 'not found' random placeholder
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
		if (!element) return;
		element.parentNode.removeChild(element);
	},



});