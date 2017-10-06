/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('user-profile-base', {
	schema: {
		username: {type: 'string'}
		/*on: {type: 'string'},
		imgDir: {type: 'string'}*/
		/*	page: {type: 'string'}*/
	},

	init: function () {
		var data = this.data;
		var el = this.el;

		this.userData();

		this.buildAndAttach();
	},


	buildAndAttach: function () {
		var data = this.data;
		var el = this.el;
		var elems = [
			{
				element: "a-entity",
				id: "username",
				//value: this.data.username,
				geometry: "primitive: plane; height: 1; width: 5",
				material: "color: red; transparent: true; opacity: 0.4",
				text: "value: username; color: white; height: 3",
				color: "white",
				zOffset: "0.01",
				width: 1,
				position: {x: -1.2, y: 2, z: -2.944}
				//scale: {x: 1.5, y: 1.5, z: 1.5}
			},
			/*{element: "a-input", id: "password", class: "clickable", placeholder: "Password", type: "password", width: 1, position: {x: -1.2, y: -1.07, z: -2.944}, scale: {x: 1.5, y: 1.5, z: 1.5}},
			{element: "a-text", id: "", value: "Login",  position: {x: -1.176, y: -0.45, z: -2.944}, text: {height: 3}},
			{element: "a-button", id: "submit", class: "clickable", value: "Login", name: "stuff", color: "white", position: {x: 0.337, y: -1.075, z: -2.944}, scale: {x: 0.8, y: 0.8, z: 0.8}},
			{element: "a-text", id: "", value: " or Sign up, now.",  position: {x: -0.53, y: -0.49, z: -2.944}, text: {height: 1}, scale: {x: 0.5, y: 0.5, z: 0.5}},*/
		];

		for (var i = 0; i < elems.length; i++) {
			var newEl = document.createElement(elems[i].element);
			for (var prop in elems[i]) {
				if (prop !== "element") {
					newEl.setAttribute(prop, elems[i][prop])
				}
			}
			/*if (elems[i].id === "submit") {
				newEl.addEventListener('click', (event) => {
					console.log('submit click');
					var userDetails = {};
					var username = document.querySelector('a-input#username');
					var password = document.querySelector('a-input#password');
					userDetails.username = username.value;
					userDetails.password = password.value;
					this.userLogin(userDetails);
				})
			}*/
			//	{ username: username, password: password }

			el.appendChild(newEl);
		}
	},

	userData: function () {
		console.log();
		console.log(window.location);
		return axios.get(window.location.origin + '/userData')
			.then((response) => {
				console.log('in aframe', response);
				/*var camera = document.getElementById('camera');
				var usernameLabel = document.createElement('a-text');
				usernameLabel.setAttribute("value", response.data.username);
				usernameLabel.setAttribute("position", {x:1.18, y:0.4, z:-0.5});
				usernameLabel.setAttribute('color', 'white');
				usernameLabel.setAttribute('text', {height: 0.001});
				usernameLabel.setAttribute('scale', {x: 0.25, y: 0.25, z: 0.25});
				camera.appendChild(usernameLabel);*/
				 var usernameLabel = document.getElementById('username');
				usernameLabel.setAttribute("text", "value: "+ response.data.username + "; color: white; height: 3");
				this.data.user = response.data;

			})
			.catch(function (error) {
				console.log(error);
			});
	},

	errorMsg: function (errorArray) {
		var messageContainer = document.createElement('a-entity');
		messageContainer.setAttribute('id', 'errorMsg');

		for (var i = 0; i < errorArray.length; i++) {
			console.log(errorArray[i].msg);
			var msgPlane = document.createElement('a-entity');
			msgPlane.setAttribute('zOffset', '0.01');
			msgPlane.setAttribute('geometry', "primitive: plane; height: auto; width: 5");
			msgPlane.setAttribute('material', "color: red; transparent: true; opacity: 0.4");
			msgPlane.setAttribute('text', "value:" + errorArray[i].msg + "; color: white");
			msgPlane.setAttribute('position', {x: 7, y: i, z: -4});
			msgPlane.setAttribute('rotation', {x: 0, y: -30, z: 0});
			messageContainer.appendChild(msgPlane);
		}
		document.querySelector('a-scene').appendChild(messageContainer);
	}
});