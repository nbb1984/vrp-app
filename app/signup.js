/* global AFRAME */
var axios = require("axios");
var _ = require('lodash');
var messageDisplay = require('./display-errors');
/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('signup', {
	schema: {
		nothing: {type: 'string'}
	},

	init: function () {
		var data = this.data;
		var el = this.el;


		axios.get(window.location.origin + '/compDetails/signup')
			.then((response) => {
				if (_.has(response, 'user')) {
					this.user = response.data.user;
				}
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
							var username = document.querySelector('a-input#usernameSignup');
							var password = document.querySelector('a-input#passOneSignup');
							var passwordCheck = document.querySelector('a-input#passTwoSignup');
							userDetails.username = username.value;
							userDetails.password = password.value;
							userDetails.password2 = passwordCheck.value;
							this.userSignUp(userDetails);

						})
					}


					el.appendChild(newEl);
				}
				document.addEventListener('keyup', function(event){
					console.log('Actual keyup event: ', event);
				})
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

	remove: function(){
		var scene = document.querySelector('a-scene');
		scene.removeEventListener('keyboardIsOpen', this.keyboardOpen.bind(this));
		scene.removeEventListener('keyboardIsClosed', this.keyboardClosed.bind(this));
	},

	keyboardOpen: function(){
		this.el.emit("keyboardIsOpenMove");
		/*var str;
		let keyboard = document.querySelector("a-keyboard");
		keyboard.open();
		keyboard.addEventListener('input', (e)=>{
			str += e.detail;
			console.log(str);
		});
		keyboard.addEventListener('enter', (e)=>{
			console.log("Enter key pressed!")
		})
		keyboard.addEventListener('dismiss', (e)=>{
			console.log("Dismiss: ", e);
			keyboard.dismiss();
		});
		keyboard.addEventListener('backspace', (e)=>{
			str = str.slice(0, -1);
			console.log(str);
		});*/
	},

	keyboardClosed: function(){
		this.el.emit("keyboardIsClosedMove");
	},



	userSignUp: function (userDetails) {
		if (userDetails.username.length > 0 && userDetails.password.length > 0 && userDetails.password2.length > 0) {
			var priorError = document.querySelectorAll('a-entity#errorMsg');
			console.log('priorError', priorError);
			if (priorError) {
				for (var n = 0; n < priorError.length; n++) {
					priorError[n].parentNode.removeChild(priorError[n]);
				}
			}
			console.log(userDetails);
			console.log(window.location);
			axios.post(window.location.origin + '/registerUser', userDetails)
				.then((response) => {
					if (_.has(response.data, 'ok')) {
						if (!response.data.ok) {
							if (Array.isArray(response.data.errors)) {
								this.errorMsg(response.data.errors);
							}
						} else {
							document.querySelector('a-image[data-page=profile]').removeState('showSignup');
							//window.location = window.location.origin + "/login";
							location.hash = 'login';
						}
					}
					console.log('in aframe', response);
				})
				.catch(function (error) {
					console.log(error);
				});
		}
	},

	errorMsg: messageDisplay
});