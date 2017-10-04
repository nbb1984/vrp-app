self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open('v1').then(function(cache) {
			return cache.addAll([
				'images/loc1.jpg',
				'images/loc2.jpg',
				'images/loc3.jpg',
				'images/loc4.jpg',
				'images/loaction_1.jpg',
				'images/loaction_2.jpg',
				'images/loaction_3.jpg',
				'images/loaction_5.jpg',
				'images/loaction_6.jpg',
				'images/loaction_7.jpg',
				'images/loaction_8.jpg',
				'images/loaction_9.jpg'
			]);
		})
	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(caches.match(event.request).then(function(response) {
		// caches.match() always resolves
		// but in case of success response will have value
		if (response !== undefined) {
			return response;
		} else {
			return fetch(event.request).then(function (response) {
				// response may be used only once
				// we need to save clone to put one copy in cache
				// and serve second one
				let responseClone = response.clone();

				caches.open('v1').then(function (cache) {
					cache.put(event.request, responseClone);
				});
				return response;
			}).catch(function () {
				return caches.match('/assets/images/loc1.jpg');
			});
		}
	}));
});