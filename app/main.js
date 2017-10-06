if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('assets/sw.js', { scope: '/assets/' }).then(function(reg) {

		if(reg.installing) {
			console.log('Service worker installing');
		} else if(reg.waiting) {
			console.log('Service worker installed');
		} else if(reg.active) {
			console.log('Service worker active');
		}

	}).catch(function(error) {
		// registration failed
		console.log('Registration failed with ' + error);
	});
}


function imgLoad(imgJSON) {
	// return a promise for an image loading
	return new Promise(function(resolve, reject) {
		var request = new XMLHttpRequest();
		request.open('GET', imgJSON.url);
		request.responseType = 'blob';

		request.onload = function() {
			if (request.status == 200) {
				var arrayResponse = [];
				arrayResponse[0] = request.response;
				arrayResponse[1] = imgJSON;
				resolve(arrayResponse);
			} else {
				reject(Error('Image didn\'t load successfully; error code:' + request.statusText));
			}
		};

		request.onerror = function() {
			reject(Error('There was a network error.'));
		};

		// Send the request
		request.send();
	});
}