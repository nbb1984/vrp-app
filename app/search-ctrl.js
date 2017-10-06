var axios = require("axios");
var GSVPANO = require('../lib/GSVPano');


function search(query) {
	var baseUrl = window.location.origin;
	var data = {query: location, source: 'text'};
	return axios.post(baseUrl + '/search', data)
		.then((response) => {
			console.log(response);
			var placeName = response.data[1].address.replace(/\s*/, "+");
			//this.runQuery(encodeURI(placeName));
			var getImage = baseUrl + '/save/photo/' + response.data[1].coords + '/' + response.data[1].address;

		})
		.catch(err =>{
			console.log(err);
		})
}


function runQueryBackEnd(location) {
	console.log(location);
	var baseUrl = window.location.origin;
	var queryUrl = baseUrl + '/search';
	return axios.post(queryUrl, {query: location, source: 'text'}).then((response) => {
		console.log(response);
		var placeName = response.data[1].address.replace(/\s*/, "+");
		//this.runQuery(encodeURI(placeName));
		var getImage = baseUrl + '/save/photo/' + response.data[1].coords + '/' + response.data[1].address;
		axios.get(getImage)
			.then((response) => {
				console.log(response);
			})
			.catch(err => {
				console.log(err);
			})
	});

};

function saveImage() {
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
		axios.get(getImage)
			.then((response) => {
				console.log(response);
			})
			.catch(err => {
				console.log(err);
			})

	});
};


function runQuery(location) {
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
};

// Google Street view only returns an image if the lat/long (location) is near enough (corresponds) to
// A location which is a street and where a street view image exists.
function getPic(queryLat, queryLng) {
	// todo plug in a different means of informing user that no results exist
	var zoom = 1;

	var lat = queryLat || 53.45688234441371; //41.5044381; //39.9495073;//41.5044381; //32.472170;
	var lng = queryLng || -1.4538002014160156;//-81.6068944; //-75.1506225;//-81.6068944; //34.996909;
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
		}
	};

	// Invoke the load method with a LatLng point.
	loader.load(new google.maps.LatLng(lat, lng));

	// Set error handle.
	loader.onError = (message) => {
		alert(message); // todo plug in a different means of informing user that no results exist
		return null;
	}

}


function init(query, coords) {
	if (query) {

	}
	if (coords) {

	}
}

