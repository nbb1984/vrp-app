/* global AFRAME */
var axios = require("axios");
/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('login', {
	schema: {
		nothing: {type: 'string'}
	},

	init: function () {
		var data = this.data;
		var el = this.el;

		axios.get(window.location.origin + '/compDetails/login')
			.then((response) => {
				console.log(response);
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
					if (details[i].id === "submit") {
						newEl.addEventListener('click', (event) => {
							console.log('submit click');
							var userDetails = {};
							/*var username = document.querySelector('a-input#username');
							var password = document.querySelector('a-input#password');
							userDetails.username = username.value;
							userDetails.password = password.value;*/
							userDetails.username = "testuser";
							userDetails.password = "Apassword1";
							/*	userDetails.username = "tesfsdfstuser";
								userDetails.password = "Apassdfsdfsdfsword1";*/
							this.userLogin(userDetails);
						})
					}
					if (details[i].id === 'signupBtn') {
						newEl.addEventListener('click', (event) => {
							location.hash = 'signup';
							//document.querySelector('a-image[data-page=profile]').addState('showSignup');
							//document.querySelector('a-image[data-page=profile]').emit('click');
						})
					}
					//	{ username: username, password: password }

					el.appendChild(newEl);
				}
				el.setAttribute("animation__keyopen", {
					property: "position",
					easing: "easeOutCubic",
					from: {x: 0, y: 0, z: 0},
					to: {x: 0, y: 1.25, z: 0},
					dur: 1500,
					startEvents: "keyboardIsOpenMove",
					dir: "normal"
				});

				el.setAttribute("animation__keyclose", {
					property: "position",
					easing: "easeOutCubic",
					from: {x: 0, y: 1.25, z: 0},
					to: {x: 0, y: 0, z: 0},
					dur: 1500,
					startEvents: "keyboardIsClosedMove",
					dir: "normal"
				});
				var scene = document.querySelector('a-scene');
				scene.addEventListener('keyboardIsOpen', this.keyboardOpen.bind(this));
				scene.addEventListener('keyboardIsClosed', this.keyboardClosed.bind(this))
			});
	},

	remove: function () {
		var scene = document.querySelector('a-scene');
		scene.removeEventListener('keyboardIsOpen', this.keyboardOpen.bind(this));
		scene.removeEventListener('keyboardIsClosed', this.keyboardClosed.bind(this));
	},

	keyboardOpen: function () {
		this.el.emit("keyboardIsOpenMove");
	},

	keyboardClosed: function () {
		this.el.emit("keyboardIsClosedMove");
	},


	userLogin: function (userDetails) {
		if (userDetails.username.length > 0 && userDetails.password.length > 0) {
			var priorError = document.querySelectorAll('a-entity#errorMsg');
			console.log('priorError', priorError);
			if (priorError) {
				for (var n = 0; n < priorError.length; n++) {
					priorError[n].parentNode.removeChild(priorError[n]);
				}
			}
			console.log(userDetails);
			console.log(window.location);
			axios.post(window.location.origin + '/loginUser', userDetails)
				.then((response) => {
					if (_.has(response.data, 'ok')) {
						if (!response.data.ok) {
							if (Array.isArray(response.data.errors)) {
								this.errorMsg(response.data.errors);
							} else {
								this.errorMsg([{msg: "Incorrect username or password"}])
							}
						} else {
							console.log('login success');
							document.querySelector('a-image[data-page=profile]').addState('loggedIn');
							location.hash = 'profile';
							//document.querySelector('a-image[data-page=explore]').emit('click');
							//window.location = window.location.origin + "/profile";
						}
					}
					console.log('in aframe', response);
				})
				.catch(function (error) {
					console.log(error);
				});
		}
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
		this.el.appendChild(messageContainer);
	}
});