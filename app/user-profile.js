/* global AFRAME */
var axios = require("axios");
var _ = require('lodash');
/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('user-profile', {
	schema: {
		nothing: {type: 'string'}
	},

	init: function () {
		var data = this.data;
		var el = this.el;
		axios.get(window.location.origin + '/userData')
			.then((response) => {
				if (_.has(response, 'user')) {
					this.user = response.data.user;
				}
				console.log('in aframe', response);
				var userData = response.data;
				this.showSaved(userData);
				this.showSearches(userData);


				var usernameLabel = document.createElement('a-text');
				usernameLabel.setAttribute("value", response.data.username);
				usernameLabel.setAttribute("position", {x: -4, y: 0, z: -2});
				usernameLabel.setAttribute('color', 'white');
				usernameLabel.setAttribute('text', {height: 1});
				//usernameLabel.setAttribute('scale', {x: 0.25, y: 0.25, z: 0.25});
				el.appendChild(usernameLabel);


			})
			.catch(function (error) {
				document.querySelector('a-router').addState('redirect-profile');
				window.location.hash = 'login';
				console.log(error);
			});

	},


	buildAndAttach: function () {
		var data = this.data;
		var el = this.el;
		var elems = [];

		for (var i = 0; i < elems.length; i++) {
			var newEl = document.createElement(elems[i].element);
			for (var prop in elems[i]) {
				if (prop !== "element") {
					newEl.setAttribute(prop, elems[i][prop])
				}
			}

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
				var usernameLabel = document.getElementById('username');
				usernameLabel.setAttribute("text", "value: " + response.data.username + "; color: white; height: 3");
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
			msgPlane.setAttribute('rotation', {x: -10, y: -30, z: 0});
			messageContainer.appendChild(msgPlane);
		}
		document.querySelector('a-scene').appendChild(messageContainer);
	},

	showSaved: function (userData) {
		var searchCount = 0;
		var row = 0;
		for (var i = 0; i < userData.saved.length; i++) {
			if(i % 5 === 0){
				row++;
			}
			//messageContainer.setAttribute('id', 'errorMsg');
			console.log('address', userData.saved[i]);

			var imgPlane = document.createElement('a-image');
			//msgPlane.setAttribute("value", userData.searches[i].address);
			imgPlane.setAttribute('data-filename', userData.saved[i]);
	/*		imgPlane.setAttribute('position', {x: -7, y: i, z: -4});
			imgPlane.setAttribute('rotation', {x: -10, y: 45, z: 0});*/
			imgPlane.setAttribute('position', this.distributeSaved(i, row));
			imgPlane.setAttribute('rotation', {x: -10, y: 0, z: 0});
			imgPlane.setAttribute('class', 'clickable');
			imgPlane.setAttribute('width', 1);
			imgPlane.setAttribute('height', 0.5);
			if(/http/.test(userData.saved[i])){
				imgPlane.setAttribute('src', userData.saved[i]);
				$(imgPlane).on('click',function () {
					var sky = document.querySelector('a-sky');
					sky.emit('set-image-fade');
					var thumbSrc = $(this).attr('data-filename');
					var src = thumbSrc.replace("thumbnail_", "").replace(".png", ".jpg");
					console.log(src);
					setTimeout(function () {
						// Set image.
						console.log(sky);
						sky.setAttribute('material', 'src', src);
						//sky.setAttribute('src', src);
					}, 1500);

				});
			} else {
				imgPlane.setAttribute('src', window.location.origin + '/savedImage/thumb_' + userData.saved[i]);
				$(imgPlane).on('click',function () {
					var sky = document.querySelector('a-sky');
					sky.emit('set-image-fade');
					var thumbSrc = $(this).attr('data-filename');
					var actual = thumbSrc.replace("thumb_", "");
					var src =  window.location.origin + '/savedImage/' +  actual;
					console.log(actual);
					setTimeout(function () {
						// Set image.
						sky.setAttribute('material', 'src', src);
						//sky.setAttribute('src', src);
					}, 1500);

				});
			}


			this.el.appendChild(imgPlane);

		}
		var searchesLabel = document.createElement('a-text');
		searchesLabel.setAttribute("value", "Your Saved Images");
		searchesLabel.setAttribute('position', {x: -7, y: userData.saved.length, z: -4});
		searchesLabel.setAttribute('rotation', {x: -10, y: 45, z: 0});
		searchesLabel.setAttribute('color', 'white');
		searchesLabel.setAttribute('text', {height: 1});
		this.el.appendChild(searchesLabel);
/*		var messageContainer = document.createElement('a-entity');
		messageContainer.setAttribute('geometry', "primitive: plane; height: " + (userData.saved.length + 2) + "; width: 7");
		messageContainer.setAttribute('material', "color: red; transparent: true; opacity: 0.4");
		messageContainer.setAttribute('position', {x: -9, y: (userData.saved.length + 2) / 2, z: -2});
		messageContainer.setAttribute('rotation', {x: -10, y: 45, z: 0});
		this.el.appendChild(messageContainer);*/
	},

	distributeSaved: function(i, row){
		switch (i % 5) {
			case 0:
				row++;
				return {x: 0, y: ((row * .57) - 0.38), z: -3.65};
				break;
			case 1:
				return {x: -1.11, y: ((row * .57) - 0.38), z: -3.65};
				break;
			case 2:
				return {x: 1.11, y: ((row * .57) - 0.38), z: -3.65};
				break;
			case 3:
				return {x: -2.22, y: ((row * .57) - 0.38), z: -3.65};
				break;
			case 4:
				return {x: 2.22, y: ((row * .57) - 0.38), z: -3.65};
				break;
		}
	},

	showSearches: function (userData) {
		var searchCount = 0;
		for (var i = 0; i < userData.searches.length; i++) {

			//messageContainer.setAttribute('id', 'errorMsg');
			console.log('address', userData.searches[i].address);
			if (userData.searches[i].address) {
				searchCount++;
				var msgPlane = document.createElement('a-text');
				msgPlane.setAttribute("value", userData.searches[i].address);
				msgPlane.setAttribute('data-mongo', userData.searches[i]._id);
				msgPlane.setAttribute('position', {x: 7, y: searchCount, z: -4});
				msgPlane.setAttribute('rotation', {x: 0, y: -45, z: 0});
				msgPlane.setAttribute('color', 'white');
				msgPlane.setAttribute('zOffset', '0.01');
				msgPlane.setAttribute('text', {height: 1});
				/*var msgPlane = document.createElement('a-entity');
				msgPlane.setAttribute('zOffset', '0.01');
				msgPlane.setAttribute('geometry', "primitive: plane; height: auto; width: 5");
				msgPlane.setAttribute('material', "color: red; transparent: true; opacity: 0.4");
				msgPlane.setAttribute('text', {value: userData.searches[i].address , color: "white"});
				msgPlane.setAttribute('position', {x: 7, y: i, z: -4});
				msgPlane.setAttribute('rotation', {x: 0, y: -30, z: 0});*/
				this.el.appendChild(msgPlane);
			}
		}
		var searchesLabel = document.createElement('a-text');
		searchesLabel.setAttribute("value", "Your Top Searches");
		searchesLabel.setAttribute('position', {x: 7, y: searchCount + 1, z: -4});
		searchesLabel.setAttribute('rotation', {x: 0, y: -45, z: 0});
		searchesLabel.setAttribute('color', 'white');
		searchesLabel.setAttribute('text', {height: 1});
		this.el.appendChild(searchesLabel);
		var messageContainer = document.createElement('a-entity');
		messageContainer.setAttribute('geometry', "primitive: plane; height: " + (searchCount + 2) + "; width: 7");
		messageContainer.setAttribute('material', "color: red; transparent: true; opacity: 0.4");
		messageContainer.setAttribute('position', {x: 9, y: (searchCount + 2) / 2, z: -2});
		messageContainer.setAttribute('rotation', {x: 0, y: -45, z: 0});
		this.el.appendChild(messageContainer);
	}
});