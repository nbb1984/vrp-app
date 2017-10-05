/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('signup-fields', {
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
			{id: "textLabel", element: 'a-text', value:'Sign Up', text: {height: 3}, position: {x: -1.176, y: -0.45, z: -2.944}},
			{id: "username", element: "a-input", class: "clickable",  placeholder: "Username", color: "black", width: 0.6, position: {x: -1.2, y: -0.75, z: -2.944}, scale: {x: 1.5, y: 1.5, z: 1.5}},
			{id: "passOne", element: "a-input", class: "clickable", placeholder: "Password", type: "password", color: 'black', width: 0.6, position: {x: -1.2, y: -1.07, z: -2.944}, scale: {x: 1.5, y: 1.5, z: 1.5}},
			{id: "passTwo", element: "a-input", class: "clickable", placeholder: "Password", type: "password", color: 'black', width: 0.6, position: {x: -0.230, y: -1.07, z: -2.944}, scale: {x: 1.5, y: 1.5, z: 1.5}},
			{id: "submit", element: "a-button", class: "clickable", value: "Login", name: "stuff", color: "white", position: {x: 0.736, y: -1.075, z: -2.944}, scale: {x: 0.8, y: 0.8, z: 0.8}},
			{id: "textLink", element: "a-text", class: "clickable", value: " or Login.",  position: {x: -0.37, y: -0.49, z: -2.944}, text: {height: 1}, scale: {x: 0.5, y: 0.5, z: 0.5}},
		];

		for(var i=0; i<elems.length; i++){
			var newEl = document.createElement(elems[i].element);
			for(var prop in elems[i]){
				if(prop !== "element" ){
					newEl.setAttribute(prop, elems[i][prop])
				}
			}
			if(elems[i].id === "submit"){
				newEl.addEventListener('click', (event) =>{
					console.log('submit click');
					var userDetails = {};
					var username = document.querySelector('a-input#username');
					var password = document.querySelector('a-input#passOne');
					var passwordCheck = document.querySelector('a-input#passTwo');
					userDetails.username = username.value;
					userDetails.password = password.value;
					userDetails.password2 = passwordCheck.value;
					this.userSignUp(userDetails);

				})
			}


			el.appendChild(newEl);
			/*var lsls = [
				{msg: "Password must be at least six characters and must contain at least one number, one capital letter, and one lower case letter.  Cannot contain a special character."},
				{msg: "Password must be at least six characters and must contain at least one number, one capital letter, and one lower case letter.  Cannot contain a special character."}
			];
			this.errorMsg(lsls);*/
		}
	},



	userSignUp: function (userDetails){
		if (userDetails.username.length > 0 && userDetails.password.length > 0 && userDetails.password2.length > 0) {
			var priorError = document.querySelectorAll('a-entity#errorMsg');
			console.log('priorError', priorError);
			if(priorError){
				for(var n=0; n<priorError.length; n++){
					priorError[n].parentNode.removeChild(priorError[n]);
				}
			}
			console.log(userDetails);
			console.log(window.location);
			axios.post(window.location.origin + '/registerUser', userDetails)
				.then( (response) => {
					if(_.has(response.data, 'ok')){
						if(!response.data.ok){
							if(Array.isArray(response.data.errors)){
								this.errorMsg(response.data.errors);
							}
						} else {
							window.location = window.location.origin + "/login";
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