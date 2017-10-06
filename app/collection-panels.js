/* global AFRAME */
var axios = require("axios");
/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('collection-panels', {
	schema: {
		/*on: {type: 'string'},
		imgDir: {type: 'string'}*/
		collection: {type: 'string', default: 'mural'},
		initial: {type: 'boolean'}
	},

	init: function () {
		var data = this.data;
		var el = this.el;
		/*this.buildDisplay = buildDisplay.bind(this);*/

		this.builPanels(data);

	},

	updateSchema: function(data){
		console.log('updateSchema data: ', data);
		if(!data.initial){
			this.tearDownDisplay();
			this.builPanels(data);
		}

	},

	// Paging should be taken care of on the back end;
	tearDownDisplay: function() {
		var current = document.querySelectorAll('a-image.row-pic');
		console.log('tear down display prior content: ', current);
		if (current) {
			for (var i = 0; i < current.length; i++) {
				var actual = current[i];
				current[i].setAttribute('data-marked', 'removal');
				current[i].addEventListener('animation__leave-complete', () => {
					console.log('remove animation complete');
				});
				//console.log(current[i]);
				current[i].emit("removal");
			}
		} else {
			throw new Error('wtf');
		}
	},

	CleanTornDown: function()  {
		var current = document.querySelectorAll('a-image[data-marked=removal]');
		if (current) {
			for (var j = 0; j < current.length; j++) {
			//	console.log(current[j]);
				current[j].parentNode.removeChild(current[j]);
			}
		} else {
			throw new Error('wtf');
		}

	},
	builPanels: function(data) {
		var width = 1;
		var height = 0.5;
		var rotation = "-10 0 0";
		var classes = "clickable row-pic";

		var baseUrl = window.location.origin;
		var queryUrl = baseUrl + '/geoSearch/Categories/' + data.collection;
		axios.get(queryUrl)
			.then(response => {
				var img = response.data;
				var row = 0;
				var root = document.querySelector('a-entity#content-root');
				for (var i = 0; i < img.length; i++) {
					var finalPosition;
				//	console.log(i % 5);
					switch (i % 5) {
						case 0:
							row++;
							finalPosition = {x: 0, y: ((row * .57) - 0.38), z: -3.65};
							break;
						case 1:
							finalPosition = {x: -1.11, y: ((row * .57) - 0.38), z: -3.65};
							break;
						case 2:
							finalPosition = {x: 1.11, y: ((row * .57) - 0.38), z: -3.65};
							break;
						case 3:
							finalPosition = {x: -2.22, y: ((row * .57) - 0.38), z: -3.65};
							break;
						case 4:
							finalPosition = {x: 2.22, y: ((row * .57) - 0.38), z: -3.65};
							break;
					}
					var pic = document.createElement('a-image');
					pic.setAttribute('class', classes);
					pic.setAttribute('data-image-category', data.collection);
					pic.setAttribute('src', img[i].src);
					pic.setAttribute('width', width);
					pic.setAttribute('height', height);
					pic.setAttribute('rotation', rotation);
					$(pic).on('click', function () {
						var sky = document.querySelector('a-sky');
						sky.emit('set-image-fade');
						var thumbSrc = $(this).attr('src');
						var splitted = thumbSrc.slice(10, thumbSrc.length);
						var src = 'assets' + splitted;
						//console.log(src);
						setTimeout(function () {
							// Set image.
							sky.setAttribute('material', 'src', src);
							//sky.setAttribute('src', src);
						}, 1000);

					});

					if (data.initial) pic.setAttribute('position', finalPosition);
					if (!data.initial) {
						pic.setAttribute('animation__enter', {
							property: "position",
							easing: "easeOutCubic",
							from: {x: 0, y: 0, z: -20},
							to: finalPosition,
							dur: 1500,
							startEvents: "loaded",
							dir: "normal"
						});
						pic.setAttribute('animation__leave', {
							property: "position",
							easing: "easeOutCubic",
							from: finalPosition,
							to: {x: 0, y: 0, z: -20},
							dur: 1500,
							startEvents: "removal",
							dir: "normal"
						});
					}


					this.el.appendChild(pic);
				}
				if (!data.initial) {
					setTimeout(() => {
						var current = document.querySelectorAll('a-image[data-marked=removal]');
						if (current) {
							for (var j = 0; j < current.length; j++) {
								//console.log(current[j]);
								current[j].parentNode.removeChild(current[j]);
							}
						} else {
							throw new Error('wtf');
						}
					}, 1000);
					console.log('current root entity: ', this.el);
				} else {
					document.querySelector('a-scene').flushToDOM(true);
				}

			})
			.catch(err => {
				console.log('http request error: ', err);
			})

	}



});
/*


function buildDisplay(data) {
	var width = 1;
	var height = 0.5;
	var rotation = "-10 0 0";
	var classes = "clickable row-pic";

	var baseUrl = window.location.origin;
	var queryUrl = baseUrl + '/geoSearch/Categories/' + data.collection;
	axios.get(queryUrl)
		.then(response => {
			var img = response.data;
			var row = 0;
			var root = document.querySelector('a-entity#content-root');
			for (var i = 0; i < img.length; i++) {
				var finalPosition;
				console.log(i % 5);
				switch (i % 5) {
					case 0:
						row++;
						finalPosition = {x: 0, y: ((row * .57) - 0.38), z: -3.65};
						break;
					case 1:
						finalPosition = {x: -1.11, y: ((row * .57) - 0.38), z: -3.65};
						break;
					case 2:
						finalPosition = {x: 1.11, y: ((row * .57) - 0.38), z: -3.65};
						break;
					case 3:
						finalPosition = {x: -2.22, y: ((row * .57) - 0.38), z: -3.65};
						break;
					case 4:
						finalPosition = {x: 2.22, y: ((row * .57) - 0.38), z: -3.65};
						break;
				}
				var pic = document.createElement('a-image');
				pic.setAttribute('class', classes);
				pic.setAttribute('data-image-category', data.collection);
				pic.setAttribute('src', img[i].src);
				pic.setAttribute('width', width);
				pic.setAttribute('height', height);
				pic.setAttribute('rotation', rotation);
				$(pic).on('click', function () {
					var sky = document.querySelector('a-sky');
					sky.emit('set-image-fade');
					var thumbSrc = $(this).attr('src');
					var splitted = thumbSrc.slice(10, thumbSrc.length);
					var src = 'assets' + splitted;
					console.log(src);
					setTimeout(function () {
						// Set image.
						sky.setAttribute('material', 'src', src);
						//sky.setAttribute('src', src);
					}, 1000);

				});

				if (data.initial) pic.setAttribute('position', finalPosition);
				if (!data.initial) {
					pic.setAttribute('animation__enter', {
						property: "position",
						easing: "easeOutCubic",
						from: {x: 0, y: 0, z: -20},
						to: finalPosition,
						dur: 1500,
						startEvents: "loaded",
						dir: "normal"
					});
					pic.setAttribute('animation__leave', {
						property: "position",
						easing: "easeOutCubic",
						from: finalPosition,
						to: {x: 0, y: 0, z: -20},
						dur: 1500,
						startEvents: "removal",
						dir: "normal"
					});
				}


				this.el.appendChild(pic);
			}
			if (!data.initial) {
				setTimeout(() => {
					var current = document.querySelectorAll('a-image[data-marked=removal]');
					if (current) {
						for (var j = 0; j < current.length; j++) {
							console.log(current[j]);
							current[j].parentNode.removeChild(current[j]);
						}
					} else {
						throw new Error('wtf');
					}
				}, 1000);

			} else {
				document.querySelector('a-scene').flushToDOM(true);
				//this.putUpDisplay();
			}

		})
		.catch(err => {
			console.log('http request error: ', err);
		})

};
*/
