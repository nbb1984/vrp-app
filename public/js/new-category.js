/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('categories', {
	schema: {
		/*on: {type: 'string'},
		imgDir: {type: 'string'}*/
		cat: {type: 'string'}
	},

	init: function () {
		var data = this.data;
		var el = this.el;


		this.buildAndAttach();
		this.buildDisplay(true, 'mural');
		var skySphere = document.querySelector('a-sky');
		skySphere.setAttribute('animation__fade', {
			property: 'material.color',
			startEvents: 'set-image-fade',
			dir: 'alternate',
			dur: 1000,
			from: '#FFF',
			to: '#000'
		});

	},

	/**
	 * Setup fade-in + fade-out.
	 */
	buildAndAttach: function () {
		var data = this.data;
		var el = this.el;
		var basePath = "assets/ui/";

		var btns = [
			{cat: "art", file: "art.png", class: "clickable", position: {x: -1.6, y: -1.3, z: -4.1}},
			{cat: "mural", file: "mural.png", class: "clickable", position: {x: -0.8, y: -1.3, z: -4.1}},
			{cat: "building", file: "building.png", class: "clickable", position: {x: 0, y: -1.3, z: -4.1}},
			{cat: "cities", file: "citys.png", class: "clickable", position: {x: 0.8, y: -1.3, z: -4.1}},
			{cat: "video", file: "video.png", class: "clickable", position: {x: 1.6, y: -1.3, z: -4.1}},
		];

		var width = 0.75;
		var height = 0.75;
		var rotation = {x: -10, y: 0, z: 0};

		for (var i = 0; i < btns.length; i++) {
			var newEl = document.createElement('a-image');
			newEl.setAttribute('src', basePath + btns[i].file);
			newEl.setAttribute("position", btns[i].position);
			newEl.setAttribute('data-page', i);
			newEl.setAttribute('data-category', btns[i].cat);
			newEl.setAttribute("class", btns[i].class);
			newEl.setAttribute("width", width);
			newEl.setAttribute("height", height);
			if (data.cat === btns[i].cat) {
				var selected = document.createElement("a-ring");
				var position = {x: btns[i].position.x, y: btns[i].position.y, z: btns[i].position.z - 0.01};
				selected.setAttribute('radius-inner', width / 2);
				selected.setAttribute('radius-outer', (width + 0.1) / 2);
				selected.setAttribute('color', 'teal');
				selected.setAttribute('data-current', btns[i].cat);
				selected.setAttribute('id', 'catHighlighter');
				selected.setAttribute("position", position);
				el.appendChild(selected);
			}

			newEl.addEventListener("click", (event) => {
				this.setHighlighted(btns, event);
				this.tearDownDisplay();
				var cat = event.detail.target.getAttribute('data-category');
				this.buildDisplay(false, cat)
			});

			el.appendChild(newEl);
		}
	},

	setHighlighted: (btns, event) => {
		console.log("on click", event.detail.target.getAttribute('data-page'));
		var indexSelected = event.detail.target.getAttribute('data-page');
		var position = {
			x: btns[indexSelected].position.x,
			y: btns[indexSelected].position.y,
			z: btns[indexSelected].position.z - 0.02
		};
		var highlighter = document.querySelector('a-ring#catHighlighter');
		var priorPage = highlighter.getAttribute('data-current');
		highlighter.setAttribute('position', position);
		highlighter.setAttribute('data-current', btns[indexSelected].comp);
	},

	displayPositions: [
		{x: -2.22, y: -.38, z: -3.65},
		{x: -1.11, y: -.38, z: -3.65},
		{x: 0, y: -.38, z: -3.65},
		{x: 1.11, y: -.38, z: -3.65},
		{x: 2.22, y: -.38, z: -3.65},
		{x: -2.22, y: -.38, z: -3.65},
		{x: -2.22, y: -.38, z: -3.65},
		{x: -2.22, y: -.38, z: -3.65},
		{x: -2.22, y: -.38, z: -3.65},
		{x: -2.22, y: -.38, z: -3.65},
		{x: -2.22, y: -.38, z: -3.65},
	],
	/*
	// 0
	// 1 3
	// 2 4
	vertical spacing: .57
	horizontal spacing: 1.11
	 */
	// Paging should be taken care of on the back end;
	tearDownDisplay: () => {
		var current = document.querySelectorAll('a-image.row-pic');
		if (current) {
			for (var i = 0; i < current.length; i++) {
				var actual = current[i];
				current[i].setAttribute('data-marked', 'removal');
				current[i].addEventListener('animation__leave-complete', () => {
					console.log('remove animation complete');
				});
				console.log(current[i]);
				current[i].emit("removal");
			}
		} else {
			throw new Error('wtf');
		}
	},

	putUpDisplay: () => {
		var current = document.querySelectorAll('a-image.row-pic');
		if (current) {
			for (var i = 0; i < current.length; i++) {
				current[i].emit("build");
			}
		} else {
			throw new Error('wtf');
		}
	},

	CleanTornDown: () => {
		var current = document.querySelectorAll('a-image[data-marked=removal]');
		if (current) {
			for (var j = 0; j < current.length; j++) {
				console.log(current[j]);
				current[j].parentNode.removeChild(current[j]);
			}
		} else {
			throw new Error('wtf');
		}

	},

	buildDisplay: (initial, cat) => {
		var that = this;
		var baseUrl = window.location.origin;
		var queryUrl = baseUrl + '/geoSearch/Categories/' + cat;
		axios.get(queryUrl)
			.then(response => {
				var img = response.data;
				var row = 0;
				var scene = document.querySelector('a-scene');
				for (var i = 0; i < img.length; i++) {
					/*if(i % 5 === 0){
						row++;
					}*/
					var position, finalPosition;
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
					pic.setAttribute('class', 'clickable row-pic');
					pic.setAttribute('data-image-category', cat);
					pic.setAttribute('src', img[i].src);
					pic.setAttribute('width', 1);
					pic.setAttribute('height', 0.5);
					pic.setAttribute('rotation', "-10 0 0");
					$(pic).on('click', function(){
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
					/*pic.addEventListener('click', (event) =>{
						var sky = document.querySelector('a-sky');
						pic.getAttribute()
					})*/
					if(initial) pic.setAttribute('position', finalPosition);
					if(!initial){
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


					scene.appendChild(pic);
				}
				if (!initial) {
					setTimeout(()=>{
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

	}
});


//categories


AFRAME.registerPrimitive('a-categories', {
	defaultComponents:{
		categories: {}
	},
	mappings: {
		cat: 'categories.cat'
	}
});
