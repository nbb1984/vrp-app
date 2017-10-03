/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('cat-row', {
	schema: {
		/*on: {type: 'string'},
		imgDir: {type: 'string'}*/
		cat: {type: 'string'}
	},

	init: function () {
		var data = this.data;
		var el = this.el;


		this.buildAndAttach();
		// el.addEventListener(data.on, function () {

		/*el.addEventListener("click", function () {
			console.log("on click")
			// Fade out image.
/!*			data.target.emit('set-image-fade');
			// Wait for fade to complete.
			setTimeout(function () {
				// Set image.
				data.target.setAttribute('material', 'src', data.src);
			}, data.dur);*!/
		});*/
	},

	/**
	 * Setup fade-in + fade-out.
	 */
	buildAndAttach: function () {
		var data = this.data;
		var el = this.el;
		var basePath = "assets/ui/";

		var btns = [
			{cat: "art", file: "art.png", class:"clickable",position: {x: -1.6, y: -1.3, z: -4.1}},
			{cat: "mural", file:"mural.png", class:"clickable", position: {x: -0.8, y: -1.3, z: -4.1}},
			{cat: "building", file:"building.png", class:"clickable",position: {x: 0, y: -1.3, z: -4.1}},
			{cat: "cities", file:"citys.png", class:"clickable",position: {x: 0.8, y: -1.3, z: -4.1}},
			{cat: "video",  file:"video.png", class:"clickable",position: {x: 1.6, y: -1.3, z: -4.1}},
		];

		var width = 0.75;
		var height = 0.75;
		var rotation = {x: -10, y: 0, z: 0};

		for(var i=0; i<btns.length; i++){
			var newEl = document.createElement('a-image');
			newEl.setAttribute('src', basePath + btns[i].file);
			newEl.setAttribute("position", btns[i].position);
			newEl.setAttribute('data-page', i);
			newEl.setAttribute("class", btns[i].class);
			newEl.setAttribute("width", width);
			newEl.setAttribute("height", height);
			if(data.cat === btns[i].cat){
				var selected = document.createElement("a-ring");
				var position = {x: btns[i].position.x, y: btns[i].position.y, z: btns[i].position.z - 0.01};
				selected.setAttribute('radius-inner', width/2);
				selected.setAttribute('radius-outer', (width + 0.1)/2);
				selected.setAttribute('color', 'teal');
				selected.setAttribute('data-current', btns[i].cat);
				selected.setAttribute('id', 'catHighlighter');
				selected.setAttribute("position", position);
				el.appendChild(selected);
			}

			newEl.addEventListener("click", function (event) {
				console.log("on click", event.detail.target.getAttribute('data-page'));
				var indexSelected = event.detail.target.getAttribute('data-page');
				var position = {x: btns[indexSelected].position.x, y: btns[indexSelected].position.y, z: btns[indexSelected].position.z - 0.02};
				var highlighter = document.querySelector('a-ring#catHighlighter');
				var priorPage = highlighter.getAttribute('data-current');
				highlighter.setAttribute('position', position);
				highlighter.setAttribute('data-current', btns[indexSelected].comp);
			});

			el.appendChild(newEl);
		}
	},

	selectedHighlight: function(){

	}
});