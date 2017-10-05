/* global AFRAME */
var axios = require("axios");
/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('search', {
	schema: {
		nothing: {type: 'string'}
	},

	init: function () {
		var data = this.data;
		var el = this.el;

		axios.get(window.location.origin + '/compDetails/search')
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
							this.demoRun();
							//this.getPic();
							/*this.runQuery('liberty bell USA');
							this.runQueryBackEnd('liberty bell');*/
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
				scene.addEventListener('keyboardIsClosed', this.keyboardClosed.bind(this))
			});
	},

	remove: function(){
		var scene = document.querySelector('a-scene');
		scene.removeEventListener('keyboardIsOpen', this.keyboardOpen.bind(this));
		scene.removeEventListener('keyboardIsClosed', this.keyboardClosed.bind(this));
	},

	keyboardOpen: function(){
		this.el.emit("keyboardIsOpenMove");
	},

	keyboardClosed: function(){
		this.el.emit("keyboardIsClosedMove");
	},

	demoRun: function(){
		var baseUrl = window.location.origin;
		var queryUrl = baseUrl + '/geoSearch';
		axios.get(queryUrl)
			.then((response) => {
				console.log(response);
			})
	},

	runQueryBackEnd: function (location) {
		console.log(location);
		if (axios) {
			var baseUrl = window.location.origin;
			var queryUrl = baseUrl + '/user/search';
			return axios.post(queryUrl, {query: location}).then((response) => {
				console.log(response);
				var placeName = response.data[1].address.replace(/\s*/, "+");
				//this.runQuery(encodeURI(placeName));
				var getImage = baseUrl + '/save/photo/' + response.data[1].coords + '/' + response.data[1].address;
				/*	axios.get(getImage)
						.then((response) => {
							console.log(response);
						})
						.catch(err => {
							console.log(err);
						})*/
			});
		}
	},

	runQuery: function (location) {
		console.log(location);
		if (axios) {
			var geocodeAPI = "4f03af1a1ea4428891dd006b61a9b4be";
			// Figure out the geolocation
			var queryURL = "http://api.opencagedata.com/geocode/v1/json?query=" + location + "&min_confidence=9&pretty=1&key=" + geocodeAPI;
			return axios.get(queryURL).then((response) => {
				console.log(response);
				// If get get a result, return that result's formatted address property
				if (response.data.results[0]) {
					var lat =response.data.results[0].geometry.lat;
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
		}
	},

	// Google Street view only returns an image if the lat/long (location) is near enough (corresponds) to
	// A location which is a street and where a street view image exists.
	getPic: function (queryLat, queryLng) {

		var zoom = 1;
		var lat = queryLat || 41.5044381; //39.9495073;//41.5044381; //32.472170;
		var lng = queryLng || -81.6068944; //-75.1506225;//-81.6068944; //34.996909;
		var loader = new GSVPANO.PanoLoader({zoom: zoom});

		loader.onPanoramaLoad = (data) => {
			try{
				// did not think of creating a canvas element to hold the image but never attaching it to the DOM
				console.log(data);
				var newImage = data.toDataURL();
				console.log("LOADED:", data);
				this.showPic(newImage, lat, lng);
			} catch(err){
				console.log(err);
			}
		};

		// Invoke the load method with a LatLng point.
		loader.load(new google.maps.LatLng(lat, lng));

		// Set error handle.
		loader.onError = (message) => {
			alert(message);
			return null;
		}

	},

	showPic: function(newImage, lat, lng){
		console.log('newImage');
		if(newImage){
			$('a-sky').attr('src', newImage);
			$('a-sky').attr('data-lat', lat);
			$('a-sky').attr('data-lng', lng);
		} else {
			// inform user no image was found
		}
	},
	saveImage: function(){
		var sky = document.querySelector('a-sky');
		var lat = sky.getAttribute('data-lat');
		var lng = sky.getAttribute('data-lng');
		var src = sky.getAttribute('src');
		axios.get(src)
			.then((response) => {
				console.log(response);
			})
		var baseUrl = window.location.origin;
		var queryUrl = baseUrl + '/search-save';
		return axios.post(queryUrl, {query: location}).then((response) => {
			console.log(response);
			var getImage = baseUrl + '/save/photo/' + response.data[1].coords + '/' + response.data[1].address;

		});
	}

});