/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('four-o-four', {
	schema: {
		/*on: {type: 'string'},
		imgDir: {type: 'string'}*/
		/*	page: {type: 'string'}*/
	},

	init: function () {
		var data = this.data;
		var el = this.el;


		//this.buildAndAttach();
	},
	// ACTUAL IMPLEMENTATION IS LOCATED WITHIN THE nav-row.js FILE

	buildAndAttach: function () {
		var data = this.data;
		var el = this.el;
		axios.get(window.location.origin + '/compDetails/help')
			.then((response) => {
				var details = response.data.details;
				var exclude = response.data.exclude;
				exclude.push('element');
				for (var i = 0; i < details.length; i++) {
					var newEl = document.createElement(details[i].element);
					for (var prop in details[i]) {
						if (!exclude.includes(prop)) {
							newEl.setAttribute(prop, details[i][prop])
						}
					}
					if (details[i].id === "userLogout") {
						newEl.addEventListener('click', (event) => {
							console.log('submit click');
						})
					}
					if (details[i].id === "hideMenus") {
						newEl.addEventListener('click', (event) => {
							console.log('submit click');
						})
					}


					el.appendChild(newEl);
				}

			});
	}
});