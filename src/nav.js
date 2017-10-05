/* global AFRAME */
var axios = require("axios");
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
		axios.get(window.location.origin + '/compDetails/nav')
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
					}
					// should tie this into the url to extract the present page
					if (data.initialSelected === details[i]["data-page"]) {
						this.includedPages(data.initialSelected);
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
		history.pushState(pageSelected, null, window.location.origin + '/' + pageSelected);
		console.log(pageSelected);
		this.includedPages(pageSelected);
		var selected = event.detail.target.getAttribute('position');
		//event.detail.target.emit('displayNewScene', {newScene: pageSelected}, true);
		var position = {
			x: selected.x,
			y: selected.y,
			z: selected.z - 0.02
		};
		var highlighter = document.querySelector('a-ring#selectedhighlighter');
		highlighter.setAttribute('position', position);
	},

	includedPages: function (page) {
		var priorContent = document.querySelector('a-entity#content-root');
		if (priorContent) {
			priorContent.parentNode.removeChild(priorContent);
		} else {
			//page = 'explore';
		}
		var root, keyboard;
		switch (page) {
			case 'explore':
				this.buildExplorePage();
				break;
			case 'profile':
				var showSignup, loggedIn;
				var profileIcon = document.querySelector('a-image[data-page=profile]');
				if(profileIcon){
					showSignup = profileIcon.is('showSignup');
					loggedIn = profileIcon.is('loggedIn');
				}
				if (loggedIn) {
					this.buildExplorePage();
				} else {
					if (showSignup) {
						document.querySelector('a-image[data-page=profile]').removeState('showSignup');
						this.buildSignupPage();
					} else {
						this.buildLoginPage();
					}
				}
				break;
			case 'search':
				this.buildSearchPage();
				break;
			case 'profile-expanded':
				this.buildProfilePage();
				break;
			case 'help':
				this.buildHelpMenu();
				break;
			default:
				this.build404();
				break;
		}
	},

	buildExplorePage: function () {
		var root = this.buildBase();
		var categories = document.createElement('a-entity');
		categories.setAttribute('category-nav', 'initialCategory: mural;');
		root.appendChild(categories);
		var collection = document.createElement('a-entity');
		collection.setAttribute('id', 'collection-root');
		collection.setAttribute('collection-panels', {collection: 'mural', initial: true});
		root.appendChild(collection);
		this.el.sceneEl.appendChild(root);
		root.setAttribute('visible', 'false');
		setTimeout(() => {
			root.setAttribute('visible', 'true');
		}, 1000);
	},

	buildSearchPage: function () {
		var root = this.buildBase();
		root.appendChild(this.buildKeyboard());
		var search = document.createElement('a-entity');
		search.setAttribute('search', 'nothing: nothing;');
		root.appendChild(search);
		this.el.sceneEl.appendChild(root);
	},

	buildSignupPage: function () {
		var root = this.buildBase();
		root.appendChild(this.buildKeyboard());
		var signup = document.createElement('a-entity');
		signup.setAttribute('signup', 'nothing: nothing;');
		root.appendChild(signup);
		this.el.sceneEl.appendChild(root);
	},

	buildLoginPage: function () {
		var root = this.buildBase();
		root.appendChild(this.buildKeyboard());
		var signup = document.createElement('a-entity');
		signup.setAttribute('login', 'nothing: nothing;');
		root.appendChild(signup);
		this.el.sceneEl.appendChild(root);
	},


	buildHelpMenu: function(){
		var root = this.buildBase();
		root.setAttribute('position', '0 1.5 -4');
		var helpMenu = document.createElement('a-entity');
		helpMenu.setAttribute('help-menu','nothing: nothing;');
		root.appendChild(helpMenu);
		this.el.sceneEl.appendChild(root);
	},

	buildProfilePage: function(){
		var root = this.buildBase();
		var profile = document.createElement('a-entity');
		profile.setAttribute('map-overlay', 'nothing: nothing;');
		root.appendChild(profile);
		this.el.sceneEl.appendChild(root);
	},

	buildAddNote: function(){
		var root = this.buildBase();
	},

	buildBase: function(){
		var root = document.createElement('a-entity');
		root.setAttribute('id', 'content-root');
		return root;
	},

	buildKeyboard: function () {
		var keyContainer = document.createElement('a-entity');
		keyContainer.setAttribute('position', "0 -0.5 0");
		var keyboard = document.createElement('a-keyboard');
		keyboard.setAttribute('class', "clickable");
		keyboard.setAttribute('physical-keyboard', "true");
		keyboard.setAttribute('position', "-1.724 -5.751 -2.52");
		keyboard.setAttribute('scale', "2.5 2.5 2.5");
		keyboard.setAttribute('rotation', "-40 0 0");
		keyContainer.appendChild(keyboard);
		return keyContainer;
	},

	build404: function(){
		var root = document.createElement('a-entity');
		root.setAttribute('id', 'content-root');
		var noFound = document.createElement('a-text');
		noFound.setAttribute('value', "404. Page Not Found :(");
		noFound.setAttribute('position', {x: -1.176, y: -0.801, z: -2.944});
		noFound.setAttribute('text', "height: 10");
		root.appendChild(noFound);
		this.el.sceneEl.appendChild(root);
	}

});