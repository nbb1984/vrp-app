/* global AFRAME */
var axios = require("axios");
/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('help-menu', {
	schema: {
		nothing: {type: 'string'}
	},

	// ACTUAL IMPLEMENTATION IS LOCATED WITHIN THE nav-row.js FILE

	init: function () {
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
						newEl.addEventListener('click', this.hideMenus.bind(this))
					}


					el.appendChild(newEl);
				}

			});
	},


	hideMenus: function(event){
		console.log('submit click');
		var nav = document.querySelector('a-entity#nav-attach');
		nav.setAttribute('visible', 'false');

		var menu = document.querySelector('a-entity#content-root');
		menu.setAttribute('visible', 'false');

		var cursor = document.querySelector('[raycaster]');
		cursor.setAttribute('raycaster', 'objects', '.showIcons');
		console.log(cursor.components);

		var showContainer = document.createElement('a-entity');
		showContainer.setAttribute('id','showAgain');
		showContainer.setAttribute('position', '0 -2.5 -3.08');

		var showText = document.createElement('a-text');
		showText.setAttribute('value', 'Show Menus and Icons');
		showText.setAttribute('position', '-1 -1 0');
		showText.setAttribute('text', 'height: 3;');


		var showItems = document.createElement('a-image');
		showItems.setAttribute('src', 'assets/ui/ic_visibility_black_48dp_2x.png');
		showItems.setAttribute('class', 'showIcons');
		showItems.setAttribute('position', '0 -0.5 0');
		showItems.addEventListener('click', function(evt){
			var cursor = document.querySelector('[raycaster]');
			cursor.setAttribute('raycaster', 'objects', '.clickable');

			var nav = document.querySelector('a-entity#nav-attach');
			nav.setAttribute('visible', 'true');

			var menu = document.querySelector('a-entity#content-root');
			menu.setAttribute('visible', 'true');

			var show = document.querySelector('a-entity#showAgain');
			show.parentNode.removeChild(show);
		});
		showContainer.appendChild(showText);
		showContainer.appendChild(showItems);
		this.el.sceneEl.appendChild(showContainer);
	}

});