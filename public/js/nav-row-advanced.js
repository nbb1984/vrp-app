/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('nav-row', {
	schema: {
		/*on: {type: 'string'},
		imgDir: {type: 'string'}*/
		page: {type: 'string'}
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
			{page: "explore", comp: "", file: "explore.png", class:"clickable",position: {x: -1.6, y: -2, z: -3.8}},
			{page: "help",  comp: "", file:"help.png", class:"clickable", position: {x: 1.6, y: -2, z: -3.8}},
			{page: "search",  comp: "discover", file:"search.png", class:"clickable",position: {x: -0.8, y: -2, z: -3.8}},
			{page: "profile",  comp: "login", file:"Profile.png", class:"clickable",position: {x: 0, y: -2, z: -3.8}},
			{page: "myPassport",  comp: "", file:"myPassport.png", class:"clickable",position: {x: .8, y: -2, z: -3.80}},
		];

		var selectedHighlight = "selected.png";

		var width = 0.5;
		var height = 0.5;

		for(var i=0; i<btns.length; i++){
			var newEl = document.createElement('a-image');
			newEl.setAttribute('src', basePath + btns[i].file);
			newEl.setAttribute("position", btns[i].position);
			newEl.setAttribute('data-page', i);
			newEl.setAttribute("class", btns[i].class);
			newEl.setAttribute("width", width);
			newEl.setAttribute("height", height);
			if(data.page === btns[i].page){
				var selected = document.createElement("a-ring");
				var position = {x: btns[i].position.x, y: btns[i].position.y, z: btns[i].position.z - 0.01};
				selected.setAttribute('radius-inner', width/2);
				selected.setAttribute('radius-outer', (width + 0.1)/2);
				selected.setAttribute('color', 'teal');
				selected.setAttribute('data-current', btns[i].comp);
				selected.setAttribute('id', 'selectedHighlighter');
				selected.setAttribute("position", position);
/*				var selected = document.createElement("a-image");
				var position = {x: btns[i].position.x, y: btns[i].position.y, z: btns[i].position.z - 0.01};
				selected.setAttribute('src', basePath + selectedHighlight);
				selected.setAttribute('id', 'selectedHighlighter');
				selected.setAttribute("position", position);
				selected.setAttribute("width", width + 0.05);
				selected.setAttribute("height", height + 0.05);*/
				el.appendChild(selected);
			}

			newEl.addEventListener("click", function (event) {
				console.log("on click", event.detail.target.getAttribute('data-page'));
				var indexSelected = event.detail.target.getAttribute('data-page');
				var position = {x: btns[indexSelected].position.x, y: btns[indexSelected].position.y, z: btns[indexSelected].position.z - 0.02};
				var highlighter = document.querySelector('a-ring#selectedHighlighter');
				var priorPage = highlighter.getAttribute('data-current');
				highlighter.setAttribute('position', position);
				var prior = document.querySelector("a-entity#" + priorPage);
				prior.setAttribute('visible', 'false');
				var next = document.querySelector('a-entity#' + btns[indexSelected].comp);
				next.setAttribute('visible', "true");
				highlighter.setAttribute('data-current', btns[indexSelected].comp);
				/*for(var j=0; j<attach.children.length; j++){
					attach.children[j].parentNode.removeChild(attach.children[j]);
				}*/
				/*attach.setAttribute('mixin', btns[indexSelected].comp);
				attach.flushToDOM(true);*/
			});

			el.appendChild(newEl);
		}
	},

	selectedHighlight: function(){

	}
});