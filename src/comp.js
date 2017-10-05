/* global AFRAME */
var axios = require("axios");
var rebuildFunctions = require('./rebuildFunctions');
/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('comp', {
	schema: {
		initialSelected: {type: 'string', default: 'explore'},
		content: {type: 'string', default: 'nav'}
	},

	init: function () {
		var data = this.data;
		var el = this.el;
		axios.get(window.location.origin + '/compDetails/' + data.content)
			.then(response => {
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
						if(prop === 'events'){
							try{
								for(var e=0; e<details[i].events.length; e++){
									//console.log(details[i].events[e]);
									newEl.addEventListener(details[i].events[e].trigger, rebuildFunctions(details[i].events[e].handler))
								}
							} catch(err){
								console.log('event setting error: ', err);
							}

						}
					}
					el.appendChild(newEl);
				}
			el.flushToDOM(true);
			});
	}

});


AFRAME.registerComponent('select-highlight', {
	schema: {
		'radius-inner': {type: 'string'},
		'radius-outer': {type: 'string'},
		color: {type: 'string'},
		position: {type: 'vec3'}
	},
	init: function(){
		if(data.page === btns[i].page){
			var selected = document.createElement("a-ring");
			var position = {x: btns[i].position.x, y: btns[i].position.y, z: btns[i].position.z - 0.01};
			selected.setAttribute('radius-inner', width/2);
			selected.setAttribute('radius-outer', (width + 0.1)/2);
			selected.setAttribute('color', 'teal');
			//selected.setAttribute('data-current', btns[i].comp);
			selected.setAttribute('id', 'selectedHighlighter');
			selected.setAttribute("position", position);
			el.appendChild(selected);
		}
	},
	setHighlighted: (btns, event) => {
		console.log("on click", event.detail.target.getAttribute('data-page'));
		var indexSelected = event.detail.target.getAttribute('data-page');
		var position = {
			x: btns[indexSelected].position.x,
			y: btns[indexSelected].position.y,
			z: btns[indexSelected].position.z - 0.02
		};
		var highlighter = document.querySelector('a-ring#catHighlighter');
		var priorPage = highlighter.getAttribute('data-current');
		highlighter.setAttribute('position', position);
		highlighter.setAttribute('data-current', btns[indexSelected].comp);
	}
})


/*

AFRAME.registerPrimitive('a-nav', {
	defaultComponents:{
		nav: {}
	},
	mappings: {
		page: 'nav.page'
	}
});*/
