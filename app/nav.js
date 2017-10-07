/* global AFRAME */
var axios = require("axios");
var _ = require('lodash');
/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('nav', {
	schema: {
		initialSelected: {type: 'string', default: 'explore'}
	},

	init: function () {
		var data = this.data;
		var el = this.el;
		var initialPage;
		this.el.addEventListener('initialPage', (event) => {
			initialPage = event.detail.page;
		});
		this.el.addEventListener('navigateTo', function(event){
			this.selectorProgMove(event.detail.newPage);
		}.bind(this));
		axios.get(window.location.origin + '/compDetails/nav')
			.then(response => {
				if (_.has(response, 'user')) {
					this.user = response.data.user;
				}
				console.log(response);
				var details = response.data.details;
				var exclude = response.data.exclude;
				exclude.push('element');
				exclude.push('events');
				for (var i = 0; i < details.length; i++) {
					var newEl = document.createElement(details[i].element);
					for (var prop in details[i]) {
						if (!exclude.includes(prop)) {
							newEl.setAttribute(prop, details[i][prop])
						}
					}
					// should tie this into the url to extract the present page
					if (initialPage === details[i]["data-page"]) {
						//this.includedPages(data.initialSelected);
						newEl.addEventListener('loaded', function (event) {
							var selected = event.detail.target.getAttribute('position');
							var position = {
								x: selected.x,
								y: selected.y,
								z: selected.z - 0.02
							};
							var highlighter = document.querySelector('a-ring#selectedhighlighter');
							highlighter.setAttribute('position', position);
						});
					}
					newEl.addEventListener("click", (event) => {
						this.selectorMove(event)
					});
					el.appendChild(newEl);
				}
				el.flushToDOM(true);
			});
	},

	selectorMove: function (event) {
		console.log(window.location);
		var pageSelected = event.detail.target.getAttribute('data-page');
		if (pageSelected === 'hide-menu') {
			this.hideMenus();
		} else {
			location.hash = pageSelected;

			//history.pushState(pageSelected, null, window.location.origin + '/' + pageSelected);

			console.log(pageSelected);
			//this.includedPages(pageSelected);
			var selected = event.detail.target.getAttribute('position');
			//event.detail.target.emit('displayNewScene', {newScene: pageSelected}, true);
			var position = {
				x: selected.x,
				y: selected.y,
				z: selected.z - 0.02
			};
			var highlighter = document.querySelector('a-ring#selectedhighlighter');
			highlighter.setAttribute('position', position);
		}
	},

	selectorProgMove: function (newPage) {
		console.log(window.location);
		var pageSelected = event.detail.target.getAttribute('data-page');
		if (pageSelected === 'hide-menu') {
			this.hideMenus();
		} else {
			var selected = this.el.querySelector('a-image[data-page='+ newPage +']');

			var position = {
				x: selected.x,
				y: selected.y,
				z: selected.z - 0.02
			};
			var highlighter = document.querySelector('a-ring#selectedhighlighter');
			highlighter.setAttribute('position', position);
		}
	},

	hideMenus: function (event) {
		console.log('submit click');
		var nav = document.querySelector('a-entity#nav-attach');
		nav.setAttribute('visible', 'false');

		var menu = document.querySelector('a-router');
		menu.setAttribute('visible', 'false');

		var cursor = document.querySelector('[raycaster]');
		cursor.setAttribute('raycaster', 'objects', '.showIcons');
		console.log(cursor.components);

		var showContainer = document.createElement('a-entity');
		showContainer.setAttribute('id', 'showAgain');
		showContainer.setAttribute('position', '0 -2.5 -3.08');

		var showText = document.createElement('a-text');
		showText.setAttribute('value', 'Show Menus and Icons');
		showText.setAttribute('position', '-1 -1 0');
		showText.setAttribute('text', 'height: 3;');


		var showItems = document.createElement('a-image');
		showItems.setAttribute('src', 'assets/ui/ic_visibility_black_48dp_2x.png');
		showItems.setAttribute('class', 'showIcons');
		showItems.setAttribute('position', '0 -0.5 0');
		showItems.addEventListener('click', function (evt) {
			var cursor = document.querySelector('[raycaster]');
			cursor.setAttribute('raycaster', 'objects', '.clickable');

			var nav = document.querySelector('a-entity#nav-attach');
			nav.setAttribute('visible', 'true');

			var menu = document.querySelector('a-router');
			menu.setAttribute('visible', 'true');

			var show = document.querySelector('a-entity#showAgain');
			show.parentNode.removeChild(show);
		});
		showContainer.appendChild(showText);
		showContainer.appendChild(showItems);
		this.el.sceneEl.appendChild(showContainer);
	}

});