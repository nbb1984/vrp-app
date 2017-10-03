/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('help-menu', {
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
		var basePath = "assets/ui/";

		var elems = [
			{element: "a-image", file: "HelpMenu.png", class:"clickable", position: {x: -1.6, y: -2, z: -1.8}},
			{element: "a-image", file:"login_signup_Btn.png", class:"clickable", position: {x: 1.6, y: -2, z: -1.8}},
/*			{page: "search", file:"search.png", class:"clickable",position: {x: -0.8, y: -2, z: -3.8}},
			{page: "profile", file:"Profile.png", class:"clickable",position: {x: 0, y: -2, z: -3.8}},
			{page: "profile-expanded",  file:"myPassport.png", class:"clickable",position: {x: .8, y: -2, z: -3.80}},
			{element: "a-image", id: "info", class: "clickable", placeholder: "Username", color: "black", width: 1, position: {x: -1.2, y: -0.75, z: -2.944}, scale: {x: 1.5, y: 1.5, z: 1.5}},
			{element: "a-input", id: "password", class: "clickable", placeholder: "Password", type: "password", width: 1, position: {x: -1.2, y: -1.07, z: -2.944}, scale: {x: 1.5, y: 1.5, z: 1.5}},
			{element: "a-text", id: "", value: "Login",  position: {x: -1.176, y: -0.45, z: -2.944}, text: {height: 3}},
			{element: "a-button", id: "submit", class: "clickable", value: "Login", name: "stuff", color: "white", position: {x: 0.337, y: -1.075, z: -2.944}, scale: {x: 0.8, y: 0.8, z: 0.8}},
			{element: "a-text", id: "", value: " or Sign up, now.",  position: {x: -0.53, y: -0.49, z: -2.944}, text: {height: 1}, scale: {x: 0.5, y: 0.5, z: 0.5}},*/
		];

		for(var i=0; i<elems.length; i++){
			var newEl = document.createElement(elems[i].element);
			for(var prop in elems[i]){
				if(prop !== "element" ){
					newEl.setAttribute(prop, elems[i][prop])
				}
			}
			/*if(elems[i].id === "submit"){
				newEl.addEventListener('click', (event) =>{
					console.log('submit click');
					var userDetails = {};
					/!*var username = document.querySelector('a-input#username');
					var password = document.querySelector('a-input#password');
					userDetails.username = username.value;
					userDetails.password = password.value;*!/
					userDetails.username = "testuser";
					userDetails.password = "Apassword1";
					/!*	userDetails.username = "tesfsdfstuser";
						userDetails.password = "Apassdfsdfsdfsword1";*!/
					this.userLogin(userDetails);
				})
			}*/
			//	{ username: username, password: password }

			el.appendChild(newEl);
		}
	},

	userLogin: function (userDetails){
		if (userDetails.username.length > 0 && userDetails.password.length > 0) {
			var priorError = document.querySelectorAll('a-entity#errorMsg');
			console.log('priorError', priorError);
			if(priorError){
				for(var n=0; n<priorError.length; n++){
					priorError[n].parentNode.removeChild(priorError[n]);
				}
			}
			console.log(userDetails);
			console.log(window.location);
			axios.post(window.location.origin + '/loginUser', userDetails)
				.then( (response) => {
					if(_.has(response.data, 'ok')){
						if(!response.data.ok){
							if(Array.isArray(response.data.errors)){
								this.errorMsg(response.data.errors);
							} else {
								this.errorMsg([{msg: "Incorrect username or password"}])
							}
						} else {
							window.location = window.location.origin + "/profile";
						}
					}
					console.log('in aframe', response);
				})
				.catch(function (error) {
					console.log(error);
				});
		}},

	errorMsg: function(errorArray){
		var messageContainer = document.createElement('a-entity');
		messageContainer.setAttribute('id', 'errorMsg');

		for(var i=0; i<errorArray.length; i++){
			console.log(errorArray[i].msg);
			var msgPlane = document.createElement('a-entity');
			msgPlane.setAttribute('zOffset', '0.01');
			msgPlane.setAttribute('geometry', "primitive: plane; height: auto; width: 5");
			msgPlane.setAttribute('material', "color: red; transparent: true; opacity: 0.4");
			msgPlane.setAttribute('text', "value:" + errorArray[i].msg + "; color: white");
			msgPlane.setAttribute('position', {x:7, y: i, z: -4});
			msgPlane.setAttribute('rotation', {x: 0, y: -30, z: 0});
			messageContainer.appendChild(msgPlane);
		}
		document.querySelector('a-scene').appendChild(messageContainer);
	}
});