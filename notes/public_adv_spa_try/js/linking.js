/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('linking', {
	schema: {
		target: {type: 'string'},
	},

	init: function () {
		var data = this.data;
		var el = this.el;

		el.addEventListener('click', function () {
			if(/http/.test(data.target)){
				window.location = data.target;
			} else {
				window.location = window.location.origin + data.target;
			}
		});
	},

});