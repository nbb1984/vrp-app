/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('set-video', {
	schema: {
		on: {type: 'string'},
		target: {type: 'selector'},
		src: {type: 'string'},
		dur: {type: 'number', default: 300}
	},

	init: function () {
		var data = this.data;
		var el = this.el;

		this.setupFadeAnimation();

		/*el.addEventListener(data.on, function () {
			// Fade out image.
			data.target.emit('set-image-fade');
			// Wait for fade to complete.
			setTimeout(function () {
				// Set image.
				data.target.setAttribute('material', 'src', data.src);
			}, data.dur);
		});*/
	},

	/**
	 * Setup fade-in + fade-out.
	 */
	setupFadeAnimation: function () {
		var data = this.data;
		var targetEl = this.data.target;

		// Only set up once.
		console.log(targetEl);
		console.log(data);
		if (targetEl.dataset.setImageFadeSetup) { return; }
		targetEl.dataset.setImageFadeSetup = true;

		// Create animation.
		targetEl.setAttribute('animation__fadeVideo', {
			property: 'material.opacity',
			startEvents: 'set-video-fade',
			dir: 'alternate',
			dur: data.dur,
			from: '1',
			to: '0'
		});
	}
});