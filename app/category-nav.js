/* global AFRAME */
var axios = require("axios");
var _ = require('lodash');
/**
 * Component that builds navigation row for explore categories
 */
AFRAME.registerComponent('category-nav', {
	schema: {
		initialCategory: {type: 'string', default: 'mural'}
	},

	init: function () {
		var data = this.data;
		var el = this.el;

		axios.get(window.location.origin + '/compDetails/explore')
			.then((response) => {
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
					if (data.initialCategory === details[i]["data-cat"]) {
						newEl.addEventListener('displayNewScene', function (event) {
							console.log('displayNewScene set initial category');
							console.log(event.target.components.position['attrValue']);
							var selected = event.target.components.position['attrValue'];
							console.log(selected);
							var position = {
								x: selected.x,
								y: selected.y,
								z: selected.z - 0.02
							};
							var highlighter = document.querySelector('a-ring#catHighlighter');
							highlighter.setAttribute('position', position);
						});
					}
					newEl.addEventListener("click", this.selectorMove);
					el.appendChild(newEl);
					if (details[i].element === 'a-ring') {
						var setSelected = document.querySelector('a-image[data-cat=' + data.initialCategory + ']');
						if(setSelected){
							setSelected.emit('displayNewScene');
						}

					}
				}
				el.flushToDOM(true);


			});
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
	selectorMove: function (event) {
		var categorySelected = event.detail.target.getAttribute('data-cat');
		console.log(categorySelected);
		var selected = event.detail.target.getAttribute('position');
		event.detail.target.emit('displayNewScene', {newScene: categorySelected}, true);
		var position = {
			x: selected.x,
			y: selected.y,
			z: selected.z - 0.02
		};
		var highlighter = document.querySelector('a-ring#catHighlighter');
		highlighter.setAttribute('position', position);
		var collection = document.querySelector('a-entity#collection-root');
		collection.setAttribute('collection-panels', {collection: categorySelected, initial: false})
	},

});


/*
//
for(var thing in event.target.components.position){
	console.log(thing);
}
 */