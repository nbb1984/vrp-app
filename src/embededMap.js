/* global AFRAME */
var axios = require("axios");
/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('map-overlay', {
	schema: {
		nothing: {type: 'string'}
	},

	// ACTUAL IMPLEMENTATION IS LOCATED WITHIN THE nav-row.js FILE

	init: function () {
		var data = this.data;
		var el = this.el;

		axios.get(window.location.origin + '/compDetails/help')
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
					if (details[i].id === "userLogout") {
						newEl.addEventListener('click', (event) => {
							console.log('submit click');
						})
					}
					if (details[i].id === "hideMenus") {
						newEl.addEventListener('click', this.hideMenus.bind(this))
					}


					el.appendChild(newEl);
				}

			});
	},
});
var geocoder;
var marker;
var loader;

function initialize(){

	var locations = [
		{ lat: 51.50700703827454, lng: -0.12791916931155356 },
		{ lat: 32.6144404, lng: -108.9852017 },
		{ lat: 39.36382677360614, lng: 8.431220278759724 },
		{ lat: 59.30571937680209, lng: 4.879402148657164 },
		{ lat: 28.240385123352873, lng: -16.629988706884774 },
		{ lat: 50.09072314148827, lng: 14.393133454556278 },
		{ lat: 41.413416092316275, lng: 2.1531126527786455 },
		{ lat: 35.69143938066447, lng: 139.695139627539 },
		{ lat: 35.67120372775569, lng: 139.77167914398797 },
		{ lat: 54.552083679428065, lng: -3.297380963134742 }
	];

	var pos;
	if( window.location.hash ) {
		var parts = window.location.hash.substr( 1 ).split( ',' );
		pos = { lat: parts[ 0 ], lng: parts[ 1 ] };
	} else {
		pos = locations[ Math.floor( Math.random() * locations.length ) ];
	}
	var myLatlng = new google.maps.LatLng( pos.lat, pos.lng );

	var myOptions = {
		zoom: 14,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		streetViewControl: false
	};
	map = new google.maps.Map(document.getElementById("map"), myOptions);
	google.maps.event.addListener(map, 'click', function(event) {
		addMarker(event.latLng);
	});

	geocoder = new google.maps.Geocoder();
}


function geoSuccess( position ) {

	var currentLocation = new google.maps.LatLng( position.coords.latitude, position.coords.longitude );
	map.panTo( currentLocation );
	addMarker( currentLocation ); // move to position (thanks @theCole!)

}

function geoError( message ) {
	showError( message );
}

function findAddress( address ) {

	showMessage( 'Getting coordinates...' );
	geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			showMessage( 'Address found.' );
			addMarker( results[0].geometry.location ); // move to position (thanks @jocabola!)
		} else {
			showError("Geocode was not successful for the following reason: " + status);
			showProgress( false );
		}
	});
}

function showError( message ) {
	errorDiv.innerHTML = message;
}

function showMessage( message ) {
	showError('');
	messageDiv.innerHTML = message;
}

function addMarker(location) {
	if( marker ) marker.setMap( null );
	marker = new google.maps.Marker({
		position: location,
		map: map
	});
	marker.setMap( map );
	showMessage( 'Loading panorama for zoom ' + zoom + '...' );
	loader.load( location );
}