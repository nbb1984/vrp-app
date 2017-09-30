$(document).ready(function () {
	let button = document.querySelector('a-button');
	let toast = document.querySelector('a-toast');
	let queryText = document.getElementById("searchText");
	let query = document.getElementById("runSearch");

	query.addEventListener('click', (event) => {
		console.log("Event", event);
		//	alert(queryText.getAttribute("value"));
		console.log(queryText.getAttribute("value"));
		runQuery();
	});
	toast.addEventListener('actionclick', () => {
		toast.hide();

	}, false);
	button.addEventListener('click', () => {
		toast.show();

	}, false);
});


function runQuery(location) {
	console.log(location);
	// Figure out the geolocation
	var queryURL = "http://api.opencagedata.com/geocode/v1/json?query=" + location + "&pretty=1&key=" + geocodeAPI;
	return axios.get(queryURL).then(function(response) {
		// If get get a result, return that result's formatted address property
		if (response.data.results[0]) {
			console.log(response.data.results[0].geometry);
			console.log(response.data.results[0].geometry.lat);
			console.log(response.data.results[0].geometry.lng);
			getPic(response.data.results[0].geometry.lat, response.data.results[0].geometry.lng);
			//return response.data.results[0];
		}
		// If we don't get any results, return an empty string
		$("a-text#noresults")
		//return "";
	});
}

function getPic(queryLat, queryLng) {

	var zoom = 1;
	var lat = queryLat || 32.472170;
	var lng = queryLng || 34.996909;
	var loader = new GSVPANO.PanoLoader({zoom: zoom});

	loader.onPanoramaLoad = function () {
		// did not think of creating a canvas element to hold the image but never attaching it to the DOM
		var newImage = this.canvas.toDataURL();
		$('a-sky').attr('src', newImage);
		console.log("LOADED:", this.canvas)
	};

	// Invoke the load method with a LatLng point.
	loader.load(new google.maps.LatLng(lat, lng));

	// Set error handle.
	loader.onError = function (message) {
		alert(message);
	}

}
