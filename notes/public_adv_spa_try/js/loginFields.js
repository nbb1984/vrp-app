/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('login-fields', {
	schema: {
		/*on: {type: 'string'},
		imgDir: {type: 'string'}*/
		/*	page: {type: 'string'}*/
	},

	init: function () {
		var data = this.data;
		var el = this.el;


		this.buildAndAttach();
	},


	buildAndAttach: function () {
		var data = this.data;
		var el = this.el;
		var elems = [
			{element: "a-input", placeholder: "Username", color: "black", width: 1, position: {x: -1.2, y: -0.75, z: -2.944}, scale: {x: 1.5, y: 1.5, z: 1.5}},
			{element: "a-input", placeholder: "Password", type: "password", width: 1, position: {x: -1.2, y: -1.07, z: -2.944}, scale: {x: 1.5, y: 1.5, z: 1.5}},
			{element: "a-text", value: "Login",  position: {x: -1.176, y: -0.45, z: -2.944}, text: {height: 3}},
			{element: "a-button", value: "Login", name: "stuff", color: "white", position: {x: 0.337, y: -1.075, z: -2.944}, scale: {x: 0.8, y: 0.8, z: 0.8}},
			{element: "a-text", value: " or Sign up, now.",  position: {x: -0.53, y: -0.49, z: -2.944}, text: {height: 1}, scale: {x: 0.5, y: 0.5, z: 0.5}},
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