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
		//var html = document.createElement('div');
		//html.setAttribute('id', 'embeddedMap');
		//html.setAttribute('style', 'position: absolute; top: 0; right: 0; height: 200px; width: 200px;');
		el.setAttribute('style', 'position: absolute;' +
			'margin: 10px;'+
			' top: 0; ' +
			'right: 0; '
			//'perspective: 500px;' +
			//' perspective-origin: 150% 150%; ' +
			//'transform-style: preserve-3d; ' +
			//'transform: translateZ(50px);'
		);
		var map = document.createElement('div');
		map.setAttribute('id', 'map');
		el.appendChild(map);
		//var attach = document.querySelector('body');
		//attach.appendChild(html);
		this.initialize();
		console.log(AFRAME);


		this.el.addEventListener('gotLocation', function(event){
			console.log('gotLocation Event: ', event);
		})

	},

	remove: function(){
		var mapContainer = document.querySelector('div#embeddedMap');
		mapContainer.parentNode.removeChild(mapContainer);
	},

	initialize: function () {
		var geocoder;
		var marker;
		var loader;
		var locations = [
			{lat: 51.50700703827454, lng: -0.12791916931155356},
			{lat: 32.6144404, lng: -108.9852017},
			{lat: 39.36382677360614, lng: 8.431220278759724},
			{lat: 59.30571937680209, lng: 4.879402148657164},
			{lat: 28.240385123352873, lng: -16.629988706884774},
			{lat: 50.09072314148827, lng: 14.393133454556278},
			{lat: 41.413416092316275, lng: 2.1531126527786455},
			{lat: 35.69143938066447, lng: 139.695139627539},
			{lat: 35.67120372775569, lng: 139.77167914398797},
			{lat: 54.552083679428065, lng: -3.297380963134742}
		];

		var pos;
		if (window.location.hash) {
			var parts = window.location.hash.substr(1).split(',');
			pos = {lat: parts[0], lng: parts[1]};
		} else {
			pos = locations[Math.floor(Math.random() * locations.length)];
		}
		var myLatlng = new google.maps.LatLng(pos.lat, pos.lng);

		var myOptions = {
			zoom: 4,
			center: myLatlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			streetViewControl: false
		};
		this.gmap = new google.maps.Map(document.getElementById("map"), myOptions);
		google.maps.event.addListener(this.gmap, 'click', this.addMarker.bind(this));
		console.log('this.gmap', this.gmap);
		//	geocoder = new google.maps.Geocoder();
		//	setZoom( 2 );
		//	addMarker( myLatlng );
	},

	addMarker: function (event) {
		console.log('map click event', event);
		var location = event.latLng;
		this.el.emit('gotLocation', {lat: location.lat(),lng: location.lng()}, true);
		if (this.marker) this.marker.setMap(null);
		this.marker = new google.maps.Marker({
			position: location,
			map: this.gmap
		});
		this.marker.setMap(this.gmap);

	//	showMessage('Loading panorama for zoom ' + /*zoom*/ 4 + '...');
		//loader.load( location );
	}
});
