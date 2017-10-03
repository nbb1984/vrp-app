/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('discover-search', {
	schema: {
		/*on: {type: 'string'},
		imgDir: {type: 'string'}*/
	/*	page: {type: 'string'}*/
	},

	init: function () {
		var data = this.data;
		var el = this.el;

		this.buildAndAttach();
		// el.addEventListener(data.on, function () {

	/*	el.addEventListener("click", function () {
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
		var elems = [
			{element: "a-input", class:"clickable", placeholder: "Discover a loaction now.", width: 1, position: {x: -1.2, y: -1.07, z: -2.944}, scale: {x: 1.5, y: 1.5, z: 1.5}},
			{element: "a-text", value: "Discover",  position: {x: -1.176, y: -0.801, z: -2.944}, text: {height: 3}},
			{element: "a-button",class:"clickable", value: "search", name: "stuff", color: "white", position: {x: 0.337, y: -1.075, z: -2.944}, scale: {x: 0.8, y: 0.8, z: 0.8}},
		];

		for(var i=0; i<elems.length; i++){
			var newEl = document.createElement(elems[i].element);
			for(var prop in elems[i]){
				if(prop !== "element" ){
					newEl.setAttribute(prop, elems[i][prop])
				}
			}


			el.appendChild(newEl);
		}
	},

	selectedHighlight: function(){

	}
});