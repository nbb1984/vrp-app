/* global AFRAME */
var axios = require("axios");
var _ = require('lodash');
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
		this.builPanels(data);

	},

	remove: function () {
		document.querySelector('a-sky').setAttribute('visible', 'true');
		var vid = document.querySelector('a-videosphere');
		if (vid) {
			vid.parentNode.removeChild(vid);
		}
	},

	updateSchema: function (data) {
		console.log('updateSchema data: ', data);
		if (!data.initial) {
			this.tearDownDisplay();
			this.builPanels(data);
		}

	},

	// Paging should be taken care of on the back end;
	tearDownDisplay: function () {
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

	CleanTornDown: function () {
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
	builPanels: function (data) {
		var width = 1;
		var height = 0.5;
		var rotation = "-10 0 0";
		var classes = "clickable row-pic";

		var baseUrl = window.location.origin;
		var queryUrl = baseUrl + '/geoSearch/Categories/' + data.collection;
		axios.get(queryUrl)
			.then(response => {
				if (_.has(response, 'user')) {
					this.user = response.data.user;
				}
				if(data.collection !== 'video'){
					document.querySelector('a-sky').setAttribute('visible', 'true');
					var vid = document.querySelector('a-videosphere');
					if (vid) {
						vid.parentNode.removeChild(vid);
					}
				}
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
					pic.setAttribute('side', 'front');
					pic.setAttribute('class', classes);
					if (/art_/.test(img[i].src)) {
						pic.setAttribute('data-imageSrc', img[i].src.replace("thumbnail_", ""));
					} else if (data.collection === 'video') {
						pic.setAttribute('data-imageSrc', img[i].uri);
					} else {
						pic.setAttribute('data-imageSrc', img[i].src.replace("thumbnail_", "").replace(".png", ".jpg"));
					}

					pic.setAttribute('data-image-category', data.collection);
					pic.setAttribute('src', img[i].src);
					pic.setAttribute('width', width);
					pic.setAttribute('height', height);
					pic.setAttribute('rotation', rotation);
					if (data.collection === 'video') {
						$(pic).on('click', function () {
							var sky = document.querySelector('a-sky');
							this.emit('image-save', {shown: $(this).attr('src')});
							//sky.emit('set-image-fade');
							var actual = $(this).attr('data-imageSrc');
							this.emit('video-show', {uri: actual});

							/*						var actual = thumbSrc.replace("thumbnail_", "").replace(".png", ".jpg");
												var splitted = thumbSrc.slice(10, thumbSrc.length);
												var src = 'assets' + splitted;*/
							console.log(actual);
							sky.setAttribute('visible', 'false');
							/*setTimeout(function () {
								// Set image.
								sky.setAttribute('material', 'src', actual);
								//sky.setAttribute('src', src);
							}, 200);*/

						});
					} else {
						$(pic).on('click', function () {
							var sky = document.querySelector('a-sky');
							this.emit('image-save', {shown: $(this).attr('src')});
							sky.emit('set-image-fade');
							var actual = $(this).attr('data-imageSrc');
							/*						var actual = thumbSrc.replace("thumbnail_", "").replace(".png", ".jpg");
													var splitted = thumbSrc.slice(10, thumbSrc.length);
													var src = 'assets' + splitted;*/
							console.log(actual);
							//sky.setAttribute('material', 'src', actual);
							setTimeout(function () {

								// Set image.
								sky.setAttribute('material', 'src', actual);
								//sky.setAttribute('src', src);
							}.bind(this), 1500);

						});
					}


					pic.addEventListener('image-save', function (event) {
						console.log(event);
						this.el.setAttribute('data-image-save', event.detail.shown);
						var router = document.querySelector('a-router');
						if (router) {
							if (this.user) {
								this.showSaveButton()
							}
						}
					}.bind(this));


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
				this.el.addEventListener('video-show', function (event) {
					var vid = document.querySelector('a-videosphere');
					if (!vid) {
						vid = document.createElement('a-videosphere');
					}
					console.log(event);
					vid.setAttribute('src', event.detail.uri);
					vid.setAttribute('loop', 'false');
					this.el.sceneEl.appendChild(vid);
				}.bind(this));

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

	},

	showSaveButton: function () {
		if (this.user) {
			if (!document.querySelector('a-image#saveButton')) {
				var saveBtn = document.createElement('a-image');
				saveBtn.setAttribute('id', 'saveButton');
				saveBtn.setAttribute('class', 'clickable');
				saveBtn.setAttribute('height', 0.5);
				saveBtn.setAttribute('width', 0.5);
				saveBtn.setAttribute('position', {x: 2.4, y: -2, z: -3.8});
				saveBtn.setAttribute('src', 'assets/ui/ic_stars_black_48dp_2x.png');
				//saveBtn.setAttribute('scale', {x: 2.0, y: 0.8, z: 0.8});
				saveBtn.addEventListener('click', this.savePic.bind(this));
				this.el.appendChild(saveBtn);
			}
		}

	},

	savePic: function () {
		var filename = this.el.getAttribute('data-image-save');
		var data = {filename: filename};
		console.log(data);
		axios.post(window.location.origin + '/saveCollectionImage', data)
			.then(response => {
				console.log(response);
				if (_.has(response, 'data.err')) {
					console.log('error during search or search save');
				}
				if (_.has(response, 'data.userError')) {
					this.errorMsg("Must Be Logged In to Save");
					console.log('not logged in');
				}
			})
			.catch(err => {
				console.log(err);
			})
	}


});
