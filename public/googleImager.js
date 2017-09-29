/*globals google*/

// object-assign (npm package)
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
			'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var assign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

// google-panorama-by-location

function panoramaByLocation(location, opt, cb) {
	if (!location || !Array.isArray(location)) {
		throw new TypeError('must provide location [ lat, lng ]')
	}

	if (typeof opt === 'function') {
		cb = opt;
		opt = {}
	}

	opt = assign({
		radius: 50
	}, opt);

	var service = opt.service;
	if (!service) {
		if (typeof google === 'undefined' || !google.maps || !google.maps.LatLng) {
			throw new Error('tried to use Google API without "google.maps" in global scope\n'
				+ '  try using \'google-panorama-by-location/node.js\' instead')
		}
		service = new google.maps.StreetViewService()
	}

	var latLng = new google.maps.LatLng(location[0], location[1]);

	if (typeof service.getPanorama === 'function') {
		// v3.21
		opt.location = latLng;
		service.getPanorama({
			location: latLng,
			preference: opt.preference,
			radius: opt.radius,
			source: opt.source
		}, handleResponse)
	} else if (typeof service.getPanoramaByLocation === 'function') {
		// v3.20
		service.getPanoramaByLocation(latLng, opt.radius, handleResponse)
	} else {
		throw new TypeError('must provide valid service with getPanorama or getPanoramaByLocation')
	}

	function handleResponse(result, status) {
		if (/^ok$/i.test(status)) {
			result.id = result.location.pano;
			result.latitude = result.location.latLng.lat();
			result.longitude = result.location.latLng.lng();
			cb(null, result)
		} else {
			cb(new Error('could not find street view at: [ ' + location.join(', ') + ' ]'))
		}
	}
}


// google-panorama-tiles

var widths = [ 416, 832, 1664, 3328, 6656, 13312 ];
var heights = [ 416, 416, 832, 1664, 3328, 6656 ];
var levelsW = [ 1, 2, 4, 7, 13, 26 ];
var levelsH = [ 1, 1, 2, 4, 7, 13 ];


function equirect (zoom, data) {
	if (typeof zoom !== 'number') {
		throw new Error('must provide zoom')
	}

	var width, height, cols, rows, squareW, squareH;
	if (data) {
		// if meta info is specified, we will compute the exact tile sizes
		// works with StreetView and PhotoSphere
		var ratio = data.worldSize.width / data.tileSize.width;
		var nearestZoom = Math.floor(Math.log(ratio) / Math.log(2));
		width = Math.floor(data.worldSize.width * Math.pow(2, zoom - 1) / Math.pow(2, nearestZoom));
		height = Math.floor(data.worldSize.height * Math.pow(2, zoom - 1) / Math.pow(2, nearestZoom));
		cols = Math.max(1, Math.ceil(width / data.tileSize.width));
		rows = Math.max(1, Math.ceil(height / data.tileSize.height));
		squareW = data.tileSize.width;
		squareH = data.tileSize.height
	} else {
		// otherwise, we approximate them assuming the result is
		// a regular StreetView panorama
		width = widths[zoom];
		height = heights[zoom];
		cols = levelsW[zoom];
		rows = levelsH[zoom];
		squareW = 512;
		squareH = 512
	}

	return {
		columns: cols,
		rows: rows,
		tileWidth: squareW,
		tileHeight: squareH,
		width: width,
		height: height
	}
}