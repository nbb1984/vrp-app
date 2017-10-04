/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('discover-search', {
	schema: {
		/*on: {type: 'string'},
		imgDir: {type: 'string'}*/
		/*	page: {type: 'string'}*/
	},

	init: function () {
		var data = this.data;
		var el = this.el;

		this.buildAndAttach();

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
		scene.addEventListener('keyboardIsOpen', function () {
			el.emit("keyboardIsOpenMove");
			//console.log(el.components)
		});
		scene.addEventListener('keyboardIsClosed', function () {
			el.emit("keyboardIsClosedMove");
			//console.log(el.components)
		})

	},

	/**
	 * Setup fade-in + fade-out.
	 */
	buildAndAttach: function () {
		var data = this.data;
		var el = this.el;
		var elems = [
			{
				item: "input",
				element: "a-input",
				class: "clickable",
				placeholder: "Discover a location now.",
				width: 1,
				position: {x: -1.2, y: -1.07, z: -2.944},
				scale: {x: 1.5, y: 1.5, z: 1.5}
			},
			{
				item: "text",
				element: "a-text",
				value: "Discover",
				position: {x: -1.176, y: -0.801, z: -2.944},
				text: {height: 3}
			},
			{
				item: "button",
				element: "a-button",
				class: "clickable",
				value: "search",
				name: "stuff",
				color: "white",
				position: {x: 0.337, y: -1.075, z: -2.944},
				scale: {x: 0.8, y: 0.8, z: 0.8}
			},
		];

		for (var i = 0; i < elems.length; i++) {
			var newEl = document.createElement(elems[i].element);
			for (var prop in elems[i]) {
				if (prop !== "element" && prop !== "item") {
					newEl.setAttribute(prop, elems[i][prop])
				}
			}

			if (elems[i].item === "button") {
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