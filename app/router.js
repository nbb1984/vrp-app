AFRAME.registerComponent('router', {
	schema: {
		navController: {type: 'selector'}
	},
	init: function () {
		this.el.addEventListener('navigate', this.navigate.bind(this));
		this.el.addEventListener('initialPage', this.navigate.bind(this))
	},
	update: function () {
		console.log('router component update method', this.system);
	},
	remove: function () {
	},
	tick: function (time, timeDelta) {
	},
	pause: function () {
	},
	play: function () {
	},
	updateSchema: function (data) {
	},


	navigate: function (event) {
		var page = event.detail.page;
		var oldContent = this.el.children;
		if (oldContent.length > 0) {
			_.forEach(oldContent, (item) => {
				item.parentNode.removeChild(item);
			})
		}
		console.log('page on: ', page);
		/*var priorContent = document.querySelector('a-entity#content-root');
		if (priorContent) {
			priorContent.parentNode.removeChild(priorContent);
		} else {
			//page = 'explore';
		}*/
		var root, keyboard;
		switch (page) {
			case 'explore':
				this.buildExplorePage();
				break;
			case 'login':
				this.buildLoginPage();
				break;
			case 'signup':
				this.buildSignupPage();
				break;
			case 'profile':
				var loggedIn;
				var profileIcon = document.querySelector('a-image[data-page=profile]');
				if (profileIcon) {
					loggedIn = profileIcon.is('loggedIn');
				}
				if (loggedIn) {
					this.buildExplorePage();
				} else {
					location.hash = 'login';
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
		this.el.appendChild(root);
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
		this.el.appendChild(root);
	},

	buildSignupPage: function () {
		var root = this.buildBase();
		root.appendChild(this.buildKeyboard());
		var signup = document.createElement('a-entity');
		signup.setAttribute('signup', 'nothing: nothing;');
		root.appendChild(signup);
		this.el.appendChild(root);
	},

	buildLoginPage: function () {
		var root = this.buildBase();
		root.appendChild(this.buildKeyboard());
		var signup = document.createElement('a-entity');
		signup.setAttribute('login', 'nothing: nothing;');
		root.appendChild(signup);
		this.el.appendChild(root);
	},


	buildHelpMenu: function () {
		var root = this.buildBase();
		root.setAttribute('position', '0 1.5 -4');
		var helpMenu = document.createElement('a-entity');
		helpMenu.setAttribute('help-menu', 'nothing: nothing;');
		root.appendChild(helpMenu);
		this.el.appendChild(root);
	},

	buildProfilePage: function () {
		var root = this.buildBase();
		var profile = document.createElement('a-entity');
		profile.setAttribute('user-profile', 'nothing: nothing;');
		root.appendChild(profile);
		this.el.appendChild(root);
	},

	buildAddNote: function () {
		var root = this.buildBase();
	},

	buildBase: function () {
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

	build404: function () {
		var root = document.createElement('a-entity');
		root.setAttribute('id', 'content-root');
		var noFound = document.createElement('a-text');
		noFound.setAttribute('value', "404. Page Not Found :(");
		noFound.setAttribute('position', {x: -1.176, y: -0.801, z: -2.944});
		noFound.setAttribute('text', "height: 10");
		root.appendChild(noFound);
		this.el.appendChild(root);
	}
});


AFRAME.registerPrimitive('a-router', {
	defaultComponents: {
		router: {}
	},
	mappings: {
		'navController': 'router.navController'
		/*'is-open': 'keyboard.isOpen',
		'physical-keyboard': 'keyboard.physicalKeyboard',*/
	}
});