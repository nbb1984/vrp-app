AFRAME.registerSystem('router', {
	schema: {
		navController: {type: 'selector'},
		routerEl: {type: 'selector', default: 'a-router'}
	},
	init: function () {
		//console.log(simpleState);
		window.addEventListener("hashchange", this.emitOnHashChange.bind(this), false);
		document.addEventListener('readystatechange', this.handleInitialLoad.bind(this));
	},
	update: function(){},
	remove: function(){},
	tick: function(time, timeDelta){},
	pause: function(){},
	play: function(){},
	updateSchema: function(data){},

	handleInitialLoad: function(event){
		var router;
		if(document.readyState === 'interactive'){
			var url = event.target.URL;
			//console.log(url);
			if(/#/.test(url)){
				var hash = url.match(/#.*/)[0].replace('#','');
				//console.log(document.querySelector('a-entity#nav-attach'));
				this.data.routerEl.emit('initialPage', {page: hash});
				this.data.navController.emit('initialPage', {page: this.resolveSubPages(hash)});
				//this.navigate(hash);
			} else {
				this.data.routerEl.emit('initialPage', {page: 'search'});
				this.data.navController.emit('initialPage', {page: this.resolveSubPages('search')});
			}

		}
		//console.log('readystatechange', event);
		//console.log('document.readyState', document.readyState);
	},

	emitOnHashChange: function(event){
		//console.log('hash event', event);
		//console.log('hash portion', event.newURL.match(/#.*/)[0].replace('#',''));
		var hash = event.newURL.match(/#.*/)[0].replace('#','');
		this.data.currentPage = hash;
		this.data.routerEl.emit('navigate', {page: hash});
		//this.data.navController.emit('navigate', {page: this.resolveSubPages('login')});
		//this.navigate(hash);
	},

	resolveSubPages: function(hash){
		var located = false;
		var pageMapping = {
			profile: ['login', 'signup', 'profile']
		};
		for(var prop in pageMapping){
			if(pageMapping[prop].includes(hash)){
				located = true;
				return prop;
			}
		}
		if(!located){
			return hash; // actually should return 404 but... for later
		}
	}

/*	navigate: function (page) {
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
		this.el.sceneEl.appendChild(root);
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


	buildHelpMenu: function(){
		var root = this.buildBase();
		root.setAttribute('position', '0 1.5 -4');
		var helpMenu = document.createElement('a-entity');
		helpMenu.setAttribute('help-menu','nothing: nothing;');
		root.appendChild(helpMenu);
		this.el.appendChild(root);
	},

	buildProfilePage: function(){
		var root = this.buildBase();
		var profile = document.createElement('a-entity');
		profile.setAttribute('map-overlay', 'nothing: nothing;');
		root.appendChild(profile);
		this.el.appendChild(root);
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
		this.el.appendChild(root);
	}*/
});