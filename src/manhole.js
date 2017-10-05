/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('manhole', {
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

		el.addEventListener("click", function () {
			console.log("on click")
			// Fade out image.
			/*			data.target.emit('set-image-fade');
						// Wait for fade to complete.
						setTimeout(function () {
							// Set image.
							data.target.setAttribute('material', 'src', data.src);
						}, data.dur);*/
		});
	},

	/**
	 * Setup fade-in + fade-out.
	 */
	buildAndAttach: function () {
		var data = this.data;
		var el = this.el;
		var imagePath = "assets/ui/BlackCircle.png";

		var newEl = document.createElement('a-image');
		newEl.setAttribute('src', imagePath);
		newEl.setAttribute("position", {x:0, y:-28, z:0});
		newEl.setAttribute("scale", {x:30, y:30, z:30});
		newEl.setAttribute("rotation", {x:-90, y:0, z:0});
		el.appendChild(newEl);

	},

	selectedHighlight: function () {

	}
});