/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	(()=>{
		if (!AFRAME) { return console.error('AFRAME is required!'); }
		if (!AFRAME.ASSETS_PATH) { AFRAME.ASSETS_PATH = "./assets"; }
	/*	require('aframe');
		require('aframe-mouse-cursor-component');
		require('aframe-event-set-component');
		require('aframe-animation-component');*/
	
		__webpack_require__(2);
		__webpack_require__(3);
		__webpack_require__(4);
		__webpack_require__(5);
		__webpack_require__(33);
		__webpack_require__(34);
		__webpack_require__(35);
		__webpack_require__(36);
		__webpack_require__(37);
		__webpack_require__(39);
		__webpack_require__(43);
		__webpack_require__(40);
	
	
		__webpack_require__(41);
	})();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	AFRAME.registerSystem('router', {
		schema: {
			navController: {type: 'selector'},
			routerEl: {type: 'selector', default: 'a-router'}
		},
		init: function () {
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

/***/ }),
/* 3 */
/***/ (function(module, exports) {

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

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	/* global AFRAME */
	
	/**
	 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
	 * back in.
	 */
	AFRAME.registerComponent('manhole', {
		schema: {
			/*on: {type: 'string'},
			imgDir: {type: 'string'}*/
			page: {type: 'string'}
		},
	
		init: function () {
			var data = this.data;
			var el = this.el;
	
	
			this.buildAndAttach();
			// el.addEventListener(data.on, function () {
	
			el.addEventListener("click", function () {
				console.log("on click")
				// Fade out image.
				/*			data.target.emit('set-image-fade');
							// Wait for fade to complete.
							setTimeout(function () {
								// Set image.
								data.target.setAttribute('material', 'src', data.src);
							}, data.dur);*/
			});
		},
	
		/**
		 * Setup fade-in + fade-out.
		 */
		buildAndAttach: function () {
			var data = this.data;
			var el = this.el;
			var imagePath = "assets/ui/BlackCircle.png";
	
			var newEl = document.createElement('a-image');
			newEl.setAttribute('src', imagePath);
			newEl.setAttribute("position", {x:0, y:-28, z:0});
			newEl.setAttribute("scale", {x:30, y:30, z:30});
			newEl.setAttribute("rotation", {x:-90, y:0, z:0});
			el.appendChild(newEl);
	
		},
	
		selectedHighlight: function () {
	
		}
	});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/* global AFRAME */
	var axios = __webpack_require__(6);
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
			var initialPage;
			this.el.addEventListener('initialPage', (event) => {
					initialPage = event.detail.page;
			});
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
						if (initialPage === details[i]["data-page"]) {
							//this.includedPages(data.initialSelected);
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
			//history.pushState(pageSelected, null, window.location.origin + '/' + pageSelected);
			location.hash = pageSelected;
			console.log(pageSelected);
			//this.includedPages(pageSelected);
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
	
		/*includedPages: function (page) {
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
		}*/
	
	});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(7);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(8);
	var bind = __webpack_require__(9);
	var Axios = __webpack_require__(11);
	var defaults = __webpack_require__(12);
	
	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  var context = new Axios(defaultConfig);
	  var instance = bind(Axios.prototype.request, context);
	
	  // Copy axios.prototype to instance
	  utils.extend(instance, Axios.prototype, context);
	
	  // Copy context to instance
	  utils.extend(instance, context);
	
	  return instance;
	}
	
	// Create the default instance to be exported
	var axios = createInstance(defaults);
	
	// Expose Axios class to allow class inheritance
	axios.Axios = Axios;
	
	// Factory for creating new instances
	axios.create = function create(instanceConfig) {
	  return createInstance(utils.merge(defaults, instanceConfig));
	};
	
	// Expose Cancel & CancelToken
	axios.Cancel = __webpack_require__(30);
	axios.CancelToken = __webpack_require__(31);
	axios.isCancel = __webpack_require__(27);
	
	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(32);
	
	module.exports = axios;
	
	// Allow use of default import syntax in TypeScript
	module.exports.default = axios;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var bind = __webpack_require__(9);
	var isBuffer = __webpack_require__(10);
	
	/*global toString:true*/
	
	// utils is a library of generic helper functions non-specific to axios
	
	var toString = Object.prototype.toString;
	
	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}
	
	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}
	
	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return (typeof FormData !== 'undefined') && (val instanceof FormData);
	}
	
	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}
	
	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}
	
	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}
	
	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}
	
	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}
	
	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}
	
	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}
	
	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}
	
	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}
	
	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}
	
	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}
	
	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}
	
	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  navigator.product -> 'ReactNative'
	 */
	function isStandardBrowserEnv() {
	  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
	    return false;
	  }
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined'
	  );
	}
	
	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }
	
	  // Force an array if not already something iterable
	  if (typeof obj !== 'object' && !isArray(obj)) {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }
	
	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}
	
	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (typeof result[key] === 'object' && typeof val === 'object') {
	      result[key] = merge(result[key], val);
	    } else {
	      result[key] = val;
	    }
	  }
	
	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}
	
	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 * @return {Object} The resulting value of object a
	 */
	function extend(a, b, thisArg) {
	  forEach(b, function assignValue(val, key) {
	    if (thisArg && typeof val === 'function') {
	      a[key] = bind(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  });
	  return a;
	}
	
	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isBuffer: isBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  extend: extend,
	  trim: trim
	};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	
	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually
	module.exports = function (obj) {
	  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
	}
	
	function isBuffer (obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	}
	
	// For Node v0.10 support. Remove this eventually.
	function isSlowBuffer (obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
	}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaults = __webpack_require__(12);
	var utils = __webpack_require__(8);
	var InterceptorManager = __webpack_require__(24);
	var dispatchRequest = __webpack_require__(25);
	var isAbsoluteURL = __webpack_require__(28);
	var combineURLs = __webpack_require__(29);
	
	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} instanceConfig The default config for the instance
	 */
	function Axios(instanceConfig) {
	  this.defaults = instanceConfig;
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}
	
	/**
	 * Dispatch a request
	 *
	 * @param {Object} config The config specific for this request (merged with this.defaults)
	 */
	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }
	
	  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
	  config.method = config.method.toLowerCase();
	
	  // Support baseURL config
	  if (config.baseURL && !isAbsoluteURL(config.url)) {
	    config.url = combineURLs(config.baseURL, config.url);
	  }
	
	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);
	
	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });
	
	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });
	
	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }
	
	  return promise;
	};
	
	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	});
	
	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});
	
	module.exports = Axios;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var utils = __webpack_require__(8);
	var normalizeHeaderName = __webpack_require__(14);
	
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};
	
	function setContentTypeIfUnset(headers, value) {
	  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}
	
	function getDefaultAdapter() {
	  var adapter;
	  if (typeof XMLHttpRequest !== 'undefined') {
	    // For browsers use XHR adapter
	    adapter = __webpack_require__(15);
	  } else if (typeof process !== 'undefined') {
	    // For node use HTTP adapter
	    adapter = __webpack_require__(15);
	  }
	  return adapter;
	}
	
	var defaults = {
	  adapter: getDefaultAdapter(),
	
	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Content-Type');
	    if (utils.isFormData(data) ||
	      utils.isArrayBuffer(data) ||
	      utils.isBuffer(data) ||
	      utils.isStream(data) ||
	      utils.isFile(data) ||
	      utils.isBlob(data)
	    ) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils.isObject(data)) {
	      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
	      return JSON.stringify(data);
	    }
	    return data;
	  }],
	
	  transformResponse: [function transformResponse(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],
	
	  timeout: 0,
	
	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',
	
	  maxContentLength: -1,
	
	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};
	
	defaults.headers = {
	  common: {
	    'Accept': 'application/json, text/plain, */*'
	  }
	};
	
	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  defaults.headers[method] = {};
	});
	
	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
	});
	
	module.exports = defaults;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;
	
	process.listeners = function (name) { return [] }
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(8);
	
	module.exports = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(8);
	var settle = __webpack_require__(16);
	var buildURL = __webpack_require__(19);
	var parseHeaders = __webpack_require__(20);
	var isURLSameOrigin = __webpack_require__(21);
	var createError = __webpack_require__(17);
	var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(22);
	
	module.exports = function xhrAdapter(config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    var requestData = config.data;
	    var requestHeaders = config.headers;
	
	    if (utils.isFormData(requestData)) {
	      delete requestHeaders['Content-Type']; // Let the browser set it
	    }
	
	    var request = new XMLHttpRequest();
	    var loadEvent = 'onreadystatechange';
	    var xDomain = false;
	
	    // For IE 8/9 CORS support
	    // Only supports POST and GET calls and doesn't returns the response headers.
	    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
	    if ((undefined) !== 'test' &&
	        typeof window !== 'undefined' &&
	        window.XDomainRequest && !('withCredentials' in request) &&
	        !isURLSameOrigin(config.url)) {
	      request = new window.XDomainRequest();
	      loadEvent = 'onload';
	      xDomain = true;
	      request.onprogress = function handleProgress() {};
	      request.ontimeout = function handleTimeout() {};
	    }
	
	    // HTTP basic authentication
	    if (config.auth) {
	      var username = config.auth.username || '';
	      var password = config.auth.password || '';
	      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	    }
	
	    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);
	
	    // Set the request timeout in MS
	    request.timeout = config.timeout;
	
	    // Listen for ready state
	    request[loadEvent] = function handleLoad() {
	      if (!request || (request.readyState !== 4 && !xDomain)) {
	        return;
	      }
	
	      // The request errored out and we didn't get a response, this will be
	      // handled by onerror instead
	      // With one exception: request that using file: protocol, most browsers
	      // will return status as 0 even though it's a successful request
	      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
	        return;
	      }
	
	      // Prepare the response
	      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
	      var response = {
	        data: responseData,
	        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
	        status: request.status === 1223 ? 204 : request.status,
	        statusText: request.status === 1223 ? 'No Content' : request.statusText,
	        headers: responseHeaders,
	        config: config,
	        request: request
	      };
	
	      settle(resolve, reject, response);
	
	      // Clean up request
	      request = null;
	    };
	
	    // Handle low level network errors
	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(createError('Network Error', config, null, request));
	
	      // Clean up request
	      request = null;
	    };
	
	    // Handle timeout
	    request.ontimeout = function handleTimeout() {
	      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
	        request));
	
	      // Clean up request
	      request = null;
	    };
	
	    // Add xsrf header
	    // This is only done if running in a standard browser environment.
	    // Specifically not if we're in a web worker, or react-native.
	    if (utils.isStandardBrowserEnv()) {
	      var cookies = __webpack_require__(23);
	
	      // Add xsrf header
	      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
	          cookies.read(config.xsrfCookieName) :
	          undefined;
	
	      if (xsrfValue) {
	        requestHeaders[config.xsrfHeaderName] = xsrfValue;
	      }
	    }
	
	    // Add headers to the request
	    if ('setRequestHeader' in request) {
	      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	          // Remove Content-Type if data is undefined
	          delete requestHeaders[key];
	        } else {
	          // Otherwise add header to the request
	          request.setRequestHeader(key, val);
	        }
	      });
	    }
	
	    // Add withCredentials to request if needed
	    if (config.withCredentials) {
	      request.withCredentials = true;
	    }
	
	    // Add responseType to request if needed
	    if (config.responseType) {
	      try {
	        request.responseType = config.responseType;
	      } catch (e) {
	        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
	        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
	        if (config.responseType !== 'json') {
	          throw e;
	        }
	      }
	    }
	
	    // Handle progress if needed
	    if (typeof config.onDownloadProgress === 'function') {
	      request.addEventListener('progress', config.onDownloadProgress);
	    }
	
	    // Not all browsers support upload events
	    if (typeof config.onUploadProgress === 'function' && request.upload) {
	      request.upload.addEventListener('progress', config.onUploadProgress);
	    }
	
	    if (config.cancelToken) {
	      // Handle cancellation
	      config.cancelToken.promise.then(function onCanceled(cancel) {
	        if (!request) {
	          return;
	        }
	
	        request.abort();
	        reject(cancel);
	        // Clean up request
	        request = null;
	      });
	    }
	
	    if (requestData === undefined) {
	      requestData = null;
	    }
	
	    // Send the request
	    request.send(requestData);
	  });
	};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var createError = __webpack_require__(17);
	
	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	module.exports = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  // Note: status is not exposed by XDomainRequest
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(createError(
	      'Request failed with status code ' + response.status,
	      response.config,
	      null,
	      response.request,
	      response
	    ));
	  }
	};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var enhanceError = __webpack_require__(18);
	
	/**
	 * Create an Error with the specified message, config, error code, request and response.
	 *
	 * @param {string} message The error message.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	module.exports = function createError(message, config, code, request, response) {
	  var error = new Error(message);
	  return enhanceError(error, config, code, request, response);
	};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Update an Error with the specified config, error code, and response.
	 *
	 * @param {Error} error The error to update.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The error.
	 */
	module.exports = function enhanceError(error, config, code, request, response) {
	  error.config = config;
	  if (code) {
	    error.code = code;
	  }
	  error.request = request;
	  error.response = response;
	  return error;
	};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(8);
	
	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}
	
	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }
	
	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];
	
	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }
	
	      if (utils.isArray(val)) {
	        key = key + '[]';
	      }
	
	      if (!utils.isArray(val)) {
	        val = [val];
	      }
	
	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });
	
	    serializedParams = parts.join('&');
	  }
	
	  if (serializedParams) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }
	
	  return url;
	};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(8);
	
	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;
	
	  if (!headers) { return parsed; }
	
	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));
	
	    if (key) {
	      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	    }
	  });
	
	  return parsed;
	};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(8);
	
	module.exports = (
	  utils.isStandardBrowserEnv() ?
	
	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	  (function standardBrowserEnv() {
	    var msie = /(msie|trident)/i.test(navigator.userAgent);
	    var urlParsingNode = document.createElement('a');
	    var originURL;
	
	    /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	    function resolveURL(url) {
	      var href = url;
	
	      if (msie) {
	        // IE needs attribute set twice to normalize properties
	        urlParsingNode.setAttribute('href', href);
	        href = urlParsingNode.href;
	      }
	
	      urlParsingNode.setAttribute('href', href);
	
	      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	      return {
	        href: urlParsingNode.href,
	        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	        host: urlParsingNode.host,
	        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	        hostname: urlParsingNode.hostname,
	        port: urlParsingNode.port,
	        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	                  urlParsingNode.pathname :
	                  '/' + urlParsingNode.pathname
	      };
	    }
	
	    originURL = resolveURL(window.location.href);
	
	    /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	    return function isURLSameOrigin(requestURL) {
	      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	      return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	    };
	  })() :
	
	  // Non standard browser envs (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return function isURLSameOrigin() {
	      return true;
	    };
	  })()
	);


/***/ }),
/* 22 */
/***/ (function(module, exports) {

	'use strict';
	
	// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js
	
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	
	function E() {
	  this.message = 'String contains an invalid character';
	}
	E.prototype = new Error;
	E.prototype.code = 5;
	E.prototype.name = 'InvalidCharacterError';
	
	function btoa(input) {
	  var str = String(input);
	  var output = '';
	  for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars;
	    // if the next str index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    str.charAt(idx | 0) || (map = '=', idx % 1);
	    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	  ) {
	    charCode = str.charCodeAt(idx += 3 / 4);
	    if (charCode > 0xFF) {
	      throw new E();
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	}
	
	module.exports = btoa;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(8);
	
	module.exports = (
	  utils.isStandardBrowserEnv() ?
	
	  // Standard browser envs support document.cookie
	  (function standardBrowserEnv() {
	    return {
	      write: function write(name, value, expires, path, domain, secure) {
	        var cookie = [];
	        cookie.push(name + '=' + encodeURIComponent(value));
	
	        if (utils.isNumber(expires)) {
	          cookie.push('expires=' + new Date(expires).toGMTString());
	        }
	
	        if (utils.isString(path)) {
	          cookie.push('path=' + path);
	        }
	
	        if (utils.isString(domain)) {
	          cookie.push('domain=' + domain);
	        }
	
	        if (secure === true) {
	          cookie.push('secure');
	        }
	
	        document.cookie = cookie.join('; ');
	      },
	
	      read: function read(name) {
	        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	        return (match ? decodeURIComponent(match[3]) : null);
	      },
	
	      remove: function remove(name) {
	        this.write(name, '', Date.now() - 86400000);
	      }
	    };
	  })() :
	
	  // Non standard browser env (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return {
	      write: function write() {},
	      read: function read() { return null; },
	      remove: function remove() {}
	    };
	  })()
	);


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(8);
	
	function InterceptorManager() {
	  this.handlers = [];
	}
	
	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};
	
	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};
	
	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};
	
	module.exports = InterceptorManager;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(8);
	var transformData = __webpack_require__(26);
	var isCancel = __webpack_require__(27);
	var defaults = __webpack_require__(12);
	
	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	function throwIfCancellationRequested(config) {
	  if (config.cancelToken) {
	    config.cancelToken.throwIfRequested();
	  }
	}
	
	/**
	 * Dispatch a request to the server using the configured adapter.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  throwIfCancellationRequested(config);
	
	  // Ensure headers exist
	  config.headers = config.headers || {};
	
	  // Transform request data
	  config.data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );
	
	  // Flatten headers
	  config.headers = utils.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers || {}
	  );
	
	  utils.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );
	
	  var adapter = config.adapter || defaults.adapter;
	
	  return adapter(config).then(function onAdapterResolution(response) {
	    throwIfCancellationRequested(config);
	
	    // Transform response data
	    response.data = transformData(
	      response.data,
	      response.headers,
	      config.transformResponse
	    );
	
	    return response;
	  }, function onAdapterRejection(reason) {
	    if (!isCancel(reason)) {
	      throwIfCancellationRequested(config);
	
	      // Transform response data
	      if (reason && reason.response) {
	        reason.response.data = transformData(
	          reason.response.data,
	          reason.response.headers,
	          config.transformResponse
	        );
	      }
	    }
	
	    return Promise.reject(reason);
	  });
	};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(8);
	
	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });
	
	  return data;
	};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	module.exports = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	module.exports = function combineURLs(baseURL, relativeURL) {
	  return relativeURL
	    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
	    : baseURL;
	};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * A `Cancel` is an object that is thrown when an operation is canceled.
	 *
	 * @class
	 * @param {string=} message The message.
	 */
	function Cancel(message) {
	  this.message = message;
	}
	
	Cancel.prototype.toString = function toString() {
	  return 'Cancel' + (this.message ? ': ' + this.message : '');
	};
	
	Cancel.prototype.__CANCEL__ = true;
	
	module.exports = Cancel;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Cancel = __webpack_require__(30);
	
	/**
	 * A `CancelToken` is an object that can be used to request cancellation of an operation.
	 *
	 * @class
	 * @param {Function} executor The executor function.
	 */
	function CancelToken(executor) {
	  if (typeof executor !== 'function') {
	    throw new TypeError('executor must be a function.');
	  }
	
	  var resolvePromise;
	  this.promise = new Promise(function promiseExecutor(resolve) {
	    resolvePromise = resolve;
	  });
	
	  var token = this;
	  executor(function cancel(message) {
	    if (token.reason) {
	      // Cancellation has already been requested
	      return;
	    }
	
	    token.reason = new Cancel(message);
	    resolvePromise(token.reason);
	  });
	}
	
	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	CancelToken.prototype.throwIfRequested = function throwIfRequested() {
	  if (this.reason) {
	    throw this.reason;
	  }
	};
	
	/**
	 * Returns an object that contains a new `CancelToken` and a function that, when called,
	 * cancels the `CancelToken`.
	 */
	CancelToken.source = function source() {
	  var cancel;
	  var token = new CancelToken(function executor(c) {
	    cancel = c;
	  });
	  return {
	    token: token,
	    cancel: cancel
	  };
	};
	
	module.exports = CancelToken;


/***/ }),
/* 32 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	/* global AFRAME */
	var axios = __webpack_require__(6);
	/**
	 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
	 * back in.
	 */
	AFRAME.registerComponent('category-nav', {
		schema: {
			/*on: {type: 'string'},
			imgDir: {type: 'string'}*/
			initialCategory: {type: 'string', default: 'mural'}
		},
	
		init: function () {
			var data = this.data;
			var el = this.el;
	
			axios.get(window.location.origin + '/compDetails/explore')
				.then((response) => {
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
						if (data.initialCategory === details[i]["data-cat"]) {
							newEl.addEventListener('displayNewScene', function (event) {
								console.log('displayNewScene set initial category');
								console.log(event.target.components.position['attrValue']);
	
	
								//var selected = event.target.getAttribute('position');
								var selected = event.target.components.position['attrValue'];
								console.log(selected);
								var position = {
									x: selected.x,
									y: selected.y,
									z: selected.z - 0.02
								};
								var highlighter = document.querySelector('a-ring#catHighlighter');
								highlighter.setAttribute('position', position);
							});
						}
						newEl.addEventListener("click", this.selectorMove);
						el.appendChild(newEl);
						if (details[i].element === 'a-ring') {
							var setSelected = document.querySelector('a-image[data-cat=' + data.initialCategory + ']');
							if(setSelected){
								setSelected.emit('displayNewScene');
							}
	
						}
					}
					el.flushToDOM(true);
	
	
				});
			//	this.buildAndAttach();
			//	this.buildDisplay(true, 'mural');
			var skySphere = document.querySelector('a-sky');
			skySphere.setAttribute('animation__fade', {
				property: 'material.color',
				startEvents: 'set-image-fade',
				dir: 'alternate',
				dur: 1000,
				from: '#FFF',
				to: '#000'
			});
	
		},
		selectorMove: function (event) {
			var categorySelected = event.detail.target.getAttribute('data-cat');
			console.log(categorySelected);
			var selected = event.detail.target.getAttribute('position');
			event.detail.target.emit('displayNewScene', {newScene: categorySelected}, true);
			var position = {
				x: selected.x,
				y: selected.y,
				z: selected.z - 0.02
			};
			var highlighter = document.querySelector('a-ring#catHighlighter');
			highlighter.setAttribute('position', position);
			var collection = document.querySelector('a-entity#collection-root');
			collection.setAttribute('collection-panels', {collection: categorySelected, initial: false})
		},
	
		/*/!**
		 * Setup fade-in + fade-out.
		 *!/
		buildAndAttach: function () {
			var data = this.data;
			var el = this.el;
			var basePath = "assets/ui/";
	
			var btns = [
				{cat: "art", file: "art.png", class: "clickable", position: {x: -1.6, y: -1.3, z: -4.1}},
				{cat: "mural", file: "mural.png", class: "clickable", position: {x: -0.8, y: -1.3, z: -4.1}},
				{cat: "building", file: "building.png", class: "clickable", position: {x: 0, y: -1.3, z: -4.1}},
				{cat: "cities", file: "citys.png", class: "clickable", position: {x: 0.8, y: -1.3, z: -4.1}},
				{cat: "video", file: "video.png", class: "clickable", position: {x: 1.6, y: -1.3, z: -4.1}},
			];
	
			var width = 0.75;
			var height = 0.75;
			var rotation = {x: -10, y: 0, z: 0};
	
			for (var i = 0; i < btns.length; i++) {
				var newEl = document.createElement('a-image');
				//newEl.setAttribute('src', basePath + btns[i].file);
				//newEl.setAttribute("position", btns[i].position);
				newEl.setAttribute('data-page', i);
				newEl.setAttribute('data-category', btns[i].cat);
				newEl.setAttribute("class", btns[i].class);
				newEl.setAttribute("width", width);
				newEl.setAttribute("height", height);
				if (data.cat === btns[i].cat) {
					var selected = document.createElement("a-ring");
					var position = {x: btns[i].position.x, y: btns[i].position.y, z: btns[i].position.z - 0.01};
					selected.setAttribute('radius-inner', width / 2);
					selected.setAttribute('radius-outer', (width + 0.1) / 2);
					selected.setAttribute('color', 'teal');
					selected.setAttribute('data-current', btns[i].cat);
					selected.setAttribute('id', 'catHighlighter');
					selected.setAttribute("position", position);
					el.appendChild(selected);
				}
	
				newEl.addEventListener("click", (event) => {
					this.setHighlighted(btns, event);
					this.tearDownDisplay();
					var cat = event.detail.target.getAttribute('data-category');
					this.buildDisplay(false, cat)
				});
	
				el.appendChild(newEl);
			}
		},
	
		setHighlighted: (btns, event) => {
			console.log("on click", event.detail.target.getAttribute('data-page'));
			var indexSelected = event.detail.target.getAttribute('data-page');
			var position = {
				x: btns[indexSelected].position.x,
				y: btns[indexSelected].position.y,
				z: btns[indexSelected].position.z - 0.02
			};
			var highlighter = document.querySelector('a-ring#catHighlighter');
			var priorPage = highlighter.getAttribute('data-current');
			highlighter.setAttribute('position', position);
			highlighter.setAttribute('data-current', btns[indexSelected].comp);
		},
	
		displayPositions: [
			{x: -2.22, y: -.38, z: -3.65},
			{x: -1.11, y: -.38, z: -3.65},
			{x: 0, y: -.38, z: -3.65},
			{x: 1.11, y: -.38, z: -3.65},
			{x: 2.22, y: -.38, z: -3.65},
			{x: -2.22, y: -.38, z: -3.65},
			{x: -2.22, y: -.38, z: -3.65},
			{x: -2.22, y: -.38, z: -3.65},
			{x: -2.22, y: -.38, z: -3.65},
			{x: -2.22, y: -.38, z: -3.65},
			{x: -2.22, y: -.38, z: -3.65},
		],*/
		/*
		// 0
		// 1 3
		// 2 4
		vertical spacing: .57
		horizontal spacing: 1.11
		 */
		// Paging should be taken care of on the back end;
		tearDownDisplay: () => {
			var current = document.querySelectorAll('a-image.row-pic');
			if (current) {
				for (var i = 0; i < current.length; i++) {
					var actual = current[i];
					current[i].setAttribute('data-marked', 'removal');
					current[i].addEventListener('animation__leave-complete', () => {
						console.log('remove animation complete');
					});
					console.log(current[i]);
					current[i].emit("removal");
				}
			} else {
				throw new Error('wtf');
			}
		},
	
		putUpDisplay: () => {
			var current = document.querySelectorAll('a-image.row-pic');
			if (current) {
				for (var i = 0; i < current.length; i++) {
					current[i].emit("build");
				}
			} else {
				throw new Error('wtf');
			}
		},
	
		CleanTornDown: () => {
			var current = document.querySelectorAll('a-image[data-marked=removal]');
			if (current) {
				for (var j = 0; j < current.length; j++) {
					console.log(current[j]);
					current[j].parentNode.removeChild(current[j]);
				}
			} else {
				throw new Error('wtf');
			}
	
		},
	
		buildDisplay: (initial, cat) => {
			var that = this;
			var baseUrl = window.location.origin;
			var queryUrl = baseUrl + '/geoSearch/Categories/' + cat;
			axios.get(queryUrl)
				.then(response => {
					var img = response.data;
					var row = 0;
					var scene = document.querySelector('a-scene');
					for (var i = 0; i < img.length; i++) {
						/*if(i % 5 === 0){
							row++;
						}*/
						var position, finalPosition;
						console.log(i % 5);
						switch (i % 5) {
							case 0:
								row++;
								finalPosition = {x: 0, y: ((row * .57) - 0.38), z: -3.65};
								break;
							case 1:
								finalPosition = {x: -1.11, y: ((row * .57) - 0.38), z: -3.65};
								break;
							case 2:
								finalPosition = {x: 1.11, y: ((row * .57) - 0.38), z: -3.65};
								break;
							case 3:
								finalPosition = {x: -2.22, y: ((row * .57) - 0.38), z: -3.65};
								break;
							case 4:
								finalPosition = {x: 2.22, y: ((row * .57) - 0.38), z: -3.65};
								break;
						}
						var pic = document.createElement('a-image');
						pic.setAttribute('class', 'clickable row-pic');
						pic.setAttribute('data-image-category', cat);
						pic.setAttribute('src', img[i].src);
						pic.setAttribute('width', 1);
						pic.setAttribute('height', 0.5);
						pic.setAttribute('rotation', "-10 0 0");
						$(pic).on('click', function () {
							var sky = document.querySelector('a-sky');
							sky.emit('set-image-fade');
							var thumbSrc = $(this).attr('src');
							var splitted = thumbSrc.slice(10, thumbSrc.length);
							var src = 'assets' + splitted;
							console.log(src);
							setTimeout(function () {
								// Set image.
								sky.setAttribute('material', 'src', src);
								//sky.setAttribute('src', src);
							}, 1000);
	
						});
						/*pic.addEventListener('click', (event) =>{
							var sky = document.querySelector('a-sky');
							pic.getAttribute()
						})*/
						if (initial) pic.setAttribute('position', finalPosition);
						if (!initial) {
							pic.setAttribute('animation__enter', {
								property: "position",
								easing: "easeOutCubic",
								from: {x: 0, y: 0, z: -20},
								to: finalPosition,
								dur: 1500,
								startEvents: "loaded",
								dir: "normal"
							});
							pic.setAttribute('animation__leave', {
								property: "position",
								easing: "easeOutCubic",
								from: finalPosition,
								to: {x: 0, y: 0, z: -20},
								dur: 1500,
								startEvents: "removal",
								dir: "normal"
							});
						}
	
	
						scene.appendChild(pic);
					}
					if (!initial) {
						setTimeout(() => {
							var current = document.querySelectorAll('a-image[data-marked=removal]');
							if (current) {
								for (var j = 0; j < current.length; j++) {
									console.log(current[j]);
									current[j].parentNode.removeChild(current[j]);
								}
							} else {
								throw new Error('wtf');
							}
						}, 1000);
	
					} else {
						document.querySelector('a-scene').flushToDOM(true);
						//this.putUpDisplay();
					}
	
				})
				.catch(err => {
					console.log('http request error: ', err);
				})
	
		}
	});
	
	
	/*
	//
	for(var thing in event.target.components.position){
		console.log(thing);
	}
	 */

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	/* global AFRAME */
	var axios = __webpack_require__(6);
	/**
	 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
	 * back in.
	 */
	AFRAME.registerComponent('collection-panels', {
		schema: {
			/*on: {type: 'string'},
			imgDir: {type: 'string'}*/
			collection: {type: 'string', default: 'mural'},
			initial: {type: 'boolean'}
		},
	
		init: function () {
			var data = this.data;
			var el = this.el;
			/*this.buildDisplay = buildDisplay.bind(this);*/
	
			this.builPanels(data);
	
		},
	
		updateSchema: function(data){
			console.log('updateSchema data: ', data);
			if(!data.initial){
				this.tearDownDisplay();
				this.builPanels(data);
			}
	
		},
	
		// Paging should be taken care of on the back end;
		tearDownDisplay: function() {
			var current = document.querySelectorAll('a-image.row-pic');
			console.log('tear down display prior content: ', current);
			if (current) {
				for (var i = 0; i < current.length; i++) {
					var actual = current[i];
					current[i].setAttribute('data-marked', 'removal');
					current[i].addEventListener('animation__leave-complete', () => {
						console.log('remove animation complete');
					});
					//console.log(current[i]);
					current[i].emit("removal");
				}
			} else {
				throw new Error('wtf');
			}
		},
	
		CleanTornDown: function()  {
			var current = document.querySelectorAll('a-image[data-marked=removal]');
			if (current) {
				for (var j = 0; j < current.length; j++) {
				//	console.log(current[j]);
					current[j].parentNode.removeChild(current[j]);
				}
			} else {
				throw new Error('wtf');
			}
	
		},
		builPanels: function(data) {
			var width = 1;
			var height = 0.5;
			var rotation = "-10 0 0";
			var classes = "clickable row-pic";
	
			var baseUrl = window.location.origin;
			var queryUrl = baseUrl + '/geoSearch/Categories/' + data.collection;
			axios.get(queryUrl)
				.then(response => {
					var img = response.data;
					var row = 0;
					var root = document.querySelector('a-entity#content-root');
					for (var i = 0; i < img.length; i++) {
						var finalPosition;
					//	console.log(i % 5);
						switch (i % 5) {
							case 0:
								row++;
								finalPosition = {x: 0, y: ((row * .57) - 0.38), z: -3.65};
								break;
							case 1:
								finalPosition = {x: -1.11, y: ((row * .57) - 0.38), z: -3.65};
								break;
							case 2:
								finalPosition = {x: 1.11, y: ((row * .57) - 0.38), z: -3.65};
								break;
							case 3:
								finalPosition = {x: -2.22, y: ((row * .57) - 0.38), z: -3.65};
								break;
							case 4:
								finalPosition = {x: 2.22, y: ((row * .57) - 0.38), z: -3.65};
								break;
						}
						var pic = document.createElement('a-image');
						pic.setAttribute('class', classes);
						pic.setAttribute('data-image-category', data.collection);
						pic.setAttribute('src', img[i].src);
						pic.setAttribute('width', width);
						pic.setAttribute('height', height);
						pic.setAttribute('rotation', rotation);
						$(pic).on('click', function () {
							var sky = document.querySelector('a-sky');
							sky.emit('set-image-fade');
							var thumbSrc = $(this).attr('src');
							var splitted = thumbSrc.slice(10, thumbSrc.length);
							var src = 'assets' + splitted;
							//console.log(src);
							setTimeout(function () {
								// Set image.
								sky.setAttribute('material', 'src', src);
								//sky.setAttribute('src', src);
							}, 1000);
	
						});
	
						if (data.initial) pic.setAttribute('position', finalPosition);
						if (!data.initial) {
							pic.setAttribute('animation__enter', {
								property: "position",
								easing: "easeOutCubic",
								from: {x: 0, y: 0, z: -20},
								to: finalPosition,
								dur: 1500,
								startEvents: "loaded",
								dir: "normal"
							});
							pic.setAttribute('animation__leave', {
								property: "position",
								easing: "easeOutCubic",
								from: finalPosition,
								to: {x: 0, y: 0, z: -20},
								dur: 1500,
								startEvents: "removal",
								dir: "normal"
							});
						}
	
	
						this.el.appendChild(pic);
					}
					if (!data.initial) {
						setTimeout(() => {
							var current = document.querySelectorAll('a-image[data-marked=removal]');
							if (current) {
								for (var j = 0; j < current.length; j++) {
									//console.log(current[j]);
									current[j].parentNode.removeChild(current[j]);
								}
							} else {
								throw new Error('wtf');
							}
						}, 1000);
						console.log('current root entity: ', this.el);
					} else {
						document.querySelector('a-scene').flushToDOM(true);
					}
	
				})
				.catch(err => {
					console.log('http request error: ', err);
				})
	
		}
	
	
	
	});
	/*
	
	
	function buildDisplay(data) {
		var width = 1;
		var height = 0.5;
		var rotation = "-10 0 0";
		var classes = "clickable row-pic";
	
		var baseUrl = window.location.origin;
		var queryUrl = baseUrl + '/geoSearch/Categories/' + data.collection;
		axios.get(queryUrl)
			.then(response => {
				var img = response.data;
				var row = 0;
				var root = document.querySelector('a-entity#content-root');
				for (var i = 0; i < img.length; i++) {
					var finalPosition;
					console.log(i % 5);
					switch (i % 5) {
						case 0:
							row++;
							finalPosition = {x: 0, y: ((row * .57) - 0.38), z: -3.65};
							break;
						case 1:
							finalPosition = {x: -1.11, y: ((row * .57) - 0.38), z: -3.65};
							break;
						case 2:
							finalPosition = {x: 1.11, y: ((row * .57) - 0.38), z: -3.65};
							break;
						case 3:
							finalPosition = {x: -2.22, y: ((row * .57) - 0.38), z: -3.65};
							break;
						case 4:
							finalPosition = {x: 2.22, y: ((row * .57) - 0.38), z: -3.65};
							break;
					}
					var pic = document.createElement('a-image');
					pic.setAttribute('class', classes);
					pic.setAttribute('data-image-category', data.collection);
					pic.setAttribute('src', img[i].src);
					pic.setAttribute('width', width);
					pic.setAttribute('height', height);
					pic.setAttribute('rotation', rotation);
					$(pic).on('click', function () {
						var sky = document.querySelector('a-sky');
						sky.emit('set-image-fade');
						var thumbSrc = $(this).attr('src');
						var splitted = thumbSrc.slice(10, thumbSrc.length);
						var src = 'assets' + splitted;
						console.log(src);
						setTimeout(function () {
							// Set image.
							sky.setAttribute('material', 'src', src);
							//sky.setAttribute('src', src);
						}, 1000);
	
					});
	
					if (data.initial) pic.setAttribute('position', finalPosition);
					if (!data.initial) {
						pic.setAttribute('animation__enter', {
							property: "position",
							easing: "easeOutCubic",
							from: {x: 0, y: 0, z: -20},
							to: finalPosition,
							dur: 1500,
							startEvents: "loaded",
							dir: "normal"
						});
						pic.setAttribute('animation__leave', {
							property: "position",
							easing: "easeOutCubic",
							from: finalPosition,
							to: {x: 0, y: 0, z: -20},
							dur: 1500,
							startEvents: "removal",
							dir: "normal"
						});
					}
	
	
					this.el.appendChild(pic);
				}
				if (!data.initial) {
					setTimeout(() => {
						var current = document.querySelectorAll('a-image[data-marked=removal]');
						if (current) {
							for (var j = 0; j < current.length; j++) {
								console.log(current[j]);
								current[j].parentNode.removeChild(current[j]);
							}
						} else {
							throw new Error('wtf');
						}
					}, 1000);
	
				} else {
					document.querySelector('a-scene').flushToDOM(true);
					//this.putUpDisplay();
				}
	
			})
			.catch(err => {
				console.log('http request error: ', err);
			})
	
	};
	*/


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	/* global AFRAME */
	var axios = __webpack_require__(6);
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
	
		remove: function(){
			var scene = document.querySelector('a-scene');
			scene.removeEventListener('keyboardIsOpen', this.keyboardOpen.bind(this));
			scene.removeEventListener('keyboardIsClosed', this.keyboardClosed.bind(this));
		},
	
		keyboardOpen: function(){
			this.el.emit("keyboardIsOpenMove");
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
			document.querySelector('a-scene').appendChild(messageContainer);
		}
	});

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	/* global AFRAME */
	var axios = __webpack_require__(6);
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

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	/* global AFRAME */
	var axios = __webpack_require__(6);
	var GSVPANO = __webpack_require__(42);
	/**
	 * GOOGLE MAP WILL ONLY SHOW IF THE URL IS NOT A HASH URL.
	 * A STREET VIEW IMAGE WILL ONLY BE FOUND IF THE COORDINATES USED LIE ON A STREET (OR AT LEAST VERY VERY CLOSE [I THINK])
	 *
	 */
	AFRAME.registerComponent('search', {
		schema: {
			nothing: {type: 'string'}
		},
	
		init: function () {
			var data = this.data;
			var el = this.el;
	
			axios.get(window.location.origin + '/compDetails/search')
				.then((response) => {
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
	
						if (details[i].item === "button") {
							newEl.addEventListener('click', (event) => {
								var input = document.querySelector('a-input');
								var queryTerm = input.value;
								//this.getPic();
								this.runQueryBackEnd('eiffel tower');
								if (queryTerm) {
									if (queryTerm.length > 0) {
										//	this.runQuery(queryTerm);
									}
								}
								console.log(input.value);
							})
						}
	
	
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
					scene.addEventListener('keyboardIsClosed', this.keyboardClosed.bind(this));
					scene.addEventListener('gotLocation', this.mapCoordinates.bind(this));
				});
		},
	
		remove: function () {
			var scene = document.querySelector('a-scene');
			scene.removeEventListener('keyboardIsOpen', this.keyboardOpen.bind(this));
			scene.removeEventListener('keyboardIsClosed', this.keyboardClosed.bind(this));
			scene.removeEventListener('gotLocation', this.mapCoordinates.bind(this));
		},
	
		keyboardOpen: function () {
			this.el.emit("keyboardIsOpenMove");
			var mapBtn = document.createElement('a-button');
			mapBtn.setAttribute('id', 'mapButton');
			mapBtn.setAttribute('class', 'clickable');
			mapBtn.setAttribute('color', 'white');
			if (!document.querySelector('a-entity#mapElement')) {
				mapBtn.setAttribute('value', 'show map');
			} else {
				mapBtn.setAttribute('value', 'hide map');
			}
			mapBtn.setAttribute('position', {x: -1.1, y: -2.5, z: -3.8});
			mapBtn.setAttribute('scale', {x: 2.0, y: 0.8, z: 0.8});
			mapBtn.addEventListener('click', this.showMap.bind(this));
			var root = document.querySelector('a-router');
			root.appendChild(mapBtn);
		},
	
		keyboardClosed: function () {
			this.el.emit("keyboardIsClosedMove");
			var mapBtn = document.querySelector('a-button#mapButton');
			if (mapBtn) mapBtn.parentNode.removeChild(mapBtn);
		},
	
	
		showMap: function () {
			var mapEl, mapBtn;
			var root = document.querySelector('a-entity#content-root');
			if (document.querySelector('a-entity#mapElement')) {
				mapEl = document.querySelector('a-entity#mapElement');
				mapEl.parentNode.removeChild(mapEl);
				mapBtn = document.querySelector('a-button#mapButton');
				mapBtn.setAttribute('value', 'show map');
			} else {
				mapEl = document.createElement('a-entity');
				mapEl.setAttribute('id', 'mapElement');
				mapEl.setAttribute('map-overlay', 'nothing:nothing;');
				root.appendChild(mapEl);
				mapBtn = document.querySelector('a-button#mapButton');
				mapBtn.setAttribute('value', 'hide map');
			}
	
		},
	
	
		mapCoordinates: function (event) {
			// USING THE MAP ALSO HAS SOME BUGS/GOTCHAS.  MAP GOING BLANK  NOT RECOVERING, AND NO RESULTS;
			console.log(event);
			var lat = event.detail.lat;
			var lng = event.detail.lng;
			this.getPic(lat, lng);
			/*	var baseUrl = window.location.origin;
				var queryUrl = baseUrl + '/searchThumbCoords/' + lat +"/"+ lng;
				return axios.get(queryUrl).then((response) => {
					console.log(response);
					this.showPic(response.data.url)
				})*/
		},
	
	
		runQueryBackEnd: function (location) {
			var errorMsg = document.querySelector('a-entity#errorMsg');
			if(errorMsg){
				errorMsg.parentNode.removeChild(errorMsg);
			};
			console.log(location);
			return axios.post(window.location.origin + '/search', {query: location})
				.then((response) => {
					console.log(response);
					if(response.data.ok){
						this.getPic(response.data.details.lat, response.data.details.lng);
					} else {
						if(_.has(response, 'data.err')){
							console.log('error during search or search save');
						}
						if(_.has(response, 'data.userError')){
							console.log('not logged in');
						}
					}
	
	
	
					/*var placeName = response.data[1].address.replace(/\s*!/, "+");
					//this.runQuery(encodeURI(placeName));
					var getImage = baseUrl + '/save/photo/' + response.data[1].coords + '/' + response.data[1].address;
					axios.get(getImage)
						.then((response) => {
							console.log(response);
						})
						.catch(err => {
							console.log(err);
						})*/
				});
	
		},
	
		saveImage: function () {
			var sky = document.querySelector('a-sky');
			var lat = sky.getAttribute('data-lat');
			var lng = sky.getAttribute('data-lng');
			var src = sky.getAttribute('src');
			axios.get(src)
				.then((response) => {
					console.log(response);
				});
			var baseUrl = window.location.origin;
			var queryUrl = baseUrl + '/search-save';
			return axios.post(queryUrl, {query: location}).then((response) => {
				console.log(response);
				var getImage = baseUrl + '/save/photo/' + response.data[1].coords + '/' + response.data[1].address;
				axios.get(getImage)
					.then((response) => {
						console.log(response);
					})
					.catch(err => {
						console.log(err);
					})
	
			});
		},
	
	
		runQuery: function (location) {
			console.log(location);
			var geocodeAPI = "4f03af1a1ea4428891dd006b61a9b4be";
			// Figure out the geolocation
			var queryURL = "http://api.opencagedata.com/geocode/v1/json?query=" + location + "&min_confidence=9&pretty=1&key=" + geocodeAPI;
			return axios.get(queryURL).then((response) => {
				console.log(response);
				// If get get a result, return that result's formatted address property
				if (response.data.results[0]) {
					var lat = response.data.results[0].geometry.lat;
					var lng = response.data.results[0].geometry.lng;
					console.log(response.data.results[0].geometry);
					console.log(lat);
					console.log(lng);
					//var newImage = this.getPic(lat, lng);
					this.getPic(lat, lng);
	
	
					//this.getPic();
					//return response.data.results[0];
				}
				// If we don't get any results, return an empty string
				$("a-text#noresults")
				//return "";
			});
		},
	
		// Google Street view only returns an image if the lat/long (location) is near enough (corresponds) to
		// A location which is a street and where a street view image exists.
		getPic: function (queryLat, queryLng) {
			// todo plug in a different means of informing user that no results exist
			var zoom = 1;
	
			var lat = queryLat || 32.472170; //41.5044381; //39.9495073;//41.5044381; //32.472170;
			var lng = queryLng || 34.996909;//-81.6068944; //-75.1506225;//-81.6068944; //34.996909;
			var loader = new GSVPANO.PanoLoader({zoom: zoom});
			//var loader = GSVPANO.PanoLoader({zoom: zoom});
	
			loader.onPanoramaLoad = (data) => {
				try {
					// did not think of creating a canvas element to hold the image but never attaching it to the DOM
					console.log(data);
					var newImage = data.toDataURL();
					console.log("LOADED:", data);
					this.showPic(newImage, lat, lng);
				} catch (err) {
					console.log(err);
					this.errorMsg(message);
				}
			};
	
			// Invoke the load method with a LatLng point.
			loader.load(new google.maps.LatLng(lat, lng));
	
			// Set error handle.
			loader.onError = (message) => {
				this.errorMsg(message);
				//alert(message); // todo plug in a different means of informing user that no results exist
				return null;
			}
	
		},
	
		errorMsg: function (errorMessage) {
			var messageContainer = document.createElement('a-entity');
			messageContainer.setAttribute('id', 'errorMsg');
	
			console.log(errorMessage);
			var msgPlane = document.createElement('a-entity');
			msgPlane.setAttribute('zOffset', '0.01');
			msgPlane.setAttribute('geometry', "primitive: plane; height: auto; width: 5");
			msgPlane.setAttribute('material', "color: red; transparent: true; opacity: 0.4");
			msgPlane.setAttribute('text', "value:" + errorMessage + "; color: white");
			msgPlane.setAttribute('position', {x: 7, y: 0, z: -4});
			msgPlane.setAttribute('rotation', {x: 0, y: -30, z: 0});
			messageContainer.appendChild(msgPlane);
	
			this.el.appendChild(messageContainer);
		},
	
		showPic: function (newImage, lat, lng) {
			console.log('newImage');
			if (newImage) {
				$('a-sky').attr('src', newImage);
				$('a-sky').attr('data-lat', lat);
				$('a-sky').attr('data-lng', lng);
				this.showMap();
				this.showSaveButton();
			} else {
				// inform user no image was found
			}
		},
	
		showSaveButton: function () {
			if (!document.querySelector('a-button#saveButton')) {
				var saveBtn = document.createElement('a-button');
				saveBtn.setAttribute('id', 'saveButton');
				saveBtn.setAttribute('class', 'clickable');
				saveBtn.setAttribute('color', 'white');
				saveBtn.setAttribute('value', 'save image');
				saveBtn.setAttribute('position', {x: -1.1, y: -3.5, z: -3.8});
				saveBtn.setAttribute('scale', {x: 2.0, y: 0.8, z: 0.8});
				saveBtn.addEventListener('click', this.savePic.bind(this));
				var root = document.querySelector('a-router');
				root.appendChild(saveBtn);
			}
		},
	
		savePic: function () {
			var imageEl = document.querySelector('a-sky');
			var lat = imageEl.getAttribute('data-lat');
			var lng = imageEl.getAttribute('data-lng');
			var image = imageEl.getAttribute('src');
			axios.post(window.location.origin + '/saveSearchImage', {lat: lat, lng: lng, image: image})
				.then(response => {
					console.log(response);
				})
				.catch(err => {
					console.log(err);
				})
		}
	
	});

/***/ }),
/* 38 */,
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	/* global AFRAME */
	var axios = __webpack_require__(6);
	/**
	 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
	 * back in.
	 */
	AFRAME.registerComponent('help-menu', {
		schema: {
			nothing: {type: 'string'}
		},
	
		// ACTUAL IMPLEMENTATION IS LOCATED WITHIN THE nav-row.js FILE
	
		init: function () {
			var data = this.data;
			var el = this.el;
	
			axios.get(window.location.origin + '/compDetails/help')
				.then((response) => {
	
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
						if (details[i].id === "userLogout") {
							newEl.addEventListener('click', (event) => {
								console.log('submit click');
							})
						}
						if (details[i].id === "hideMenus") {
							newEl.addEventListener('click', this.hideMenus.bind(this))
						}
	
	
						el.appendChild(newEl);
					}
	
				});
		},
	
	
		hideMenus: function(event){
			console.log('submit click');
			var nav = document.querySelector('a-entity#nav-attach');
			nav.setAttribute('visible', 'false');
	
			var menu = document.querySelector('a-entity#content-root');
			menu.setAttribute('visible', 'false');
	
			var cursor = document.querySelector('[raycaster]');
			cursor.setAttribute('raycaster', 'objects', '.showIcons');
			console.log(cursor.components);
	
			var showContainer = document.createElement('a-entity');
			showContainer.setAttribute('id','showAgain');
			showContainer.setAttribute('position', '0 -2.5 -3.08');
	
			var showText = document.createElement('a-text');
			showText.setAttribute('value', 'Show Menus and Icons');
			showText.setAttribute('position', '-1 -1 0');
			showText.setAttribute('text', 'height: 3;');
	
	
			var showItems = document.createElement('a-image');
			showItems.setAttribute('src', 'assets/ui/ic_visibility_black_48dp_2x.png');
			showItems.setAttribute('class', 'showIcons');
			showItems.setAttribute('position', '0 -0.5 0');
			showItems.addEventListener('click', function(evt){
				var cursor = document.querySelector('[raycaster]');
				cursor.setAttribute('raycaster', 'objects', '.clickable');
	
				var nav = document.querySelector('a-entity#nav-attach');
				nav.setAttribute('visible', 'true');
	
				var menu = document.querySelector('a-entity#content-root');
				menu.setAttribute('visible', 'true');
	
				var show = document.querySelector('a-entity#showAgain');
				show.parentNode.removeChild(show);
			});
			showContainer.appendChild(showText);
			showContainer.appendChild(showItems);
			this.el.sceneEl.appendChild(showContainer);
		}
	
	});

/***/ }),
/* 40 */
/***/ (function(module, exports) {

	/******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "/dist/";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ (function(module, exports, __webpack_require__) {
	
		module.exports = __webpack_require__(1);
	
	
	/***/ }),
	/* 1 */
	/***/ (function(module, exports, __webpack_require__) {
	
		'use strict';
		
		(function () {
		  if (!AFRAME) {
		    return console.error('AFRAME is required!');
		  }
		  if (!AFRAME.ASSETS_PATH) {
		    AFRAME.ASSETS_PATH = "./assets";
		  }
		  __webpack_require__(2);
		  __webpack_require__(3);
		  //require("./alert"); @TODO ;)
		  __webpack_require__(5);
		  __webpack_require__(13);
		  //require("./switch");
		  //require("./form");
		  //require("./radio");
		  // require("./checkbox");
		  __webpack_require__(14);
		  // require("./toast");
		})();
	
	/***/ }),
	/* 2 */
	/***/ (function(module, exports) {
	
		!function(t){function e(i){if(a[i])return a[i].exports;var d=a[i]={exports:{},id:i,loaded:!1};return t[i].call(d.exports,d,d.exports,e),d.loaded=!0,d.exports}var a={};return e.m=t,e.c=a,e.p="",e(0)}([function(t,e){AFRAME.registerComponent("rounded",{schema:{enabled:{default:!0},width:{type:"number",default:1},height:{type:"number",default:1},radius:{type:"number",default:.3},topLeftRadius:{type:"number",default:-1},topRightRadius:{type:"number",default:-1},bottomLeftRadius:{type:"number",default:-1},bottomRightRadius:{type:"number",default:-1},color:{type:"color",default:"#F0F0F0"},opacity:{type:"number",default:1}},init:function(){this.rounded=new THREE.Mesh(this.draw(),new THREE.MeshPhongMaterial({color:new THREE.Color(this.data.color),side:THREE.DoubleSide})),this.updateOpacity(),this.el.setObject3D("mesh",this.rounded)},update:function(){this.data.enabled?this.rounded&&(this.rounded.visible=!0,this.rounded.geometry=this.draw(),this.rounded.material.color=new THREE.Color(this.data.color),this.updateOpacity()):this.rounded.visible=!1},updateOpacity:function(){this.data.opacity<0&&(this.data.opacity=0),this.data.opacity>1&&(this.data.opacity=1),this.data.opacity<1?this.rounded.material.transparent=!0:this.rounded.material.transparent=!1,this.rounded.material.opacity=this.data.opacity},tick:function(){},remove:function(){this.rounded&&(this.el.object3D.remove(this.rounded),this.rounded=null)},draw:function(){function t(t,e,a,i,d,o,u,r,s){o||(o=1e-5),u||(u=1e-5),r||(r=1e-5),s||(s=1e-5),t.moveTo(e,a+o),t.lineTo(e,a+d-o),t.quadraticCurveTo(e,a+d,e+o,a+d),t.lineTo(e+i-u,a+d),t.quadraticCurveTo(e+i,a+d,e+i,a+d-u),t.lineTo(e+i,a+s),t.quadraticCurveTo(e+i,a,e+i-s,a),t.lineTo(e+r,a),t.quadraticCurveTo(e,a,e,a+r)}var e=new THREE.Shape,a=[this.data.radius,this.data.radius,this.data.radius,this.data.radius];return this.data.topLeftRadius!=-1&&(a[0]=this.data.topLeftRadius),this.data.topRightRadius!=-1&&(a[1]=this.data.topRightRadius),this.data.bottomLeftRadius!=-1&&(a[2]=this.data.bottomLeftRadius),this.data.bottomRightRadius!=-1&&(a[3]=this.data.bottomRightRadius),t(e,0,0,this.data.width,this.data.height,a[0],a[1],a[2],a[3]),new THREE.ShapeBufferGeometry(e)},pause:function(){},play:function(){}}),AFRAME.registerPrimitive("a-rounded",{defaultComponents:{rounded:{}},mappings:{enabled:"rounded.enabled",width:"rounded.width",height:"rounded.height",radius:"rounded.radius","top-left-radius":"rounded.topLeftRadius","top-right-radius":"rounded.topRightRadius","bottom-left-radius":"rounded.bottomLeftRadius","bottom-right-radius":"rounded.bottomRightRadius",color:"rounded.color",opacity:"rounded.opacity"}})}]);
	
	/***/ }),
	/* 3 */
	/***/ (function(module, exports, __webpack_require__) {
	
		'use strict';
		
		var Event = __webpack_require__(4);
		
		var opacityUpdate = function opacityUpdate(opacity) {
		  this.el.object3D.traverse(function (o) {
		    if (o.material) {
		      o.material.transparent = true;
		      o.material.opacity = opacity;
		    }
		  });
		  var _iteratorNormalCompletion = true;
		  var _didIteratorError = false;
		  var _iteratorError = undefined;
		
		  try {
		    for (var _iterator = this.textEntities[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
		      var text = _step.value;
		
		      text.setAttribute('opacity', opacity);
		    }
		  } catch (err) {
		    _didIteratorError = true;
		    _iteratorError = err;
		  } finally {
		    try {
		      if (!_iteratorNormalCompletion && _iterator.return) {
		        _iterator.return();
		      }
		    } finally {
		      if (_didIteratorError) {
		        throw _iteratorError;
		      }
		    }
		  }
		};
		
		// -----------------------------------------------------------------------------
		// FADEIN
		
		AFRAME.registerComponent('fadein', {
		  schema: {
		    duration: { type: 'int', default: 200 }
		  },
		  init: function init() {
		    this.textEntities = this.el.querySelectorAll('a-text');
		    this.opacityUpdate(0);
		    this.start = null;
		  },
		  tick: function tick(t) {
		    if (!this.start) {
		      this.start = t;
		    }
		    var opacity = Math.min((t - this.start) / this.data.duration, 1);
		    this.opacityUpdate(opacity);
		    if (opacity === 1) {
		      this.el.removeAttribute('fadein');
		      Event.emit(this.el, 'animationend');
		    }
		  },
		  opacityUpdate: opacityUpdate
		});
		
		// -----------------------------------------------------------------------------
		// FADEOUT
		
		AFRAME.registerComponent('fadeout', {
		  schema: {
		    duration: { type: 'int', default: 200 }
		  },
		  init: function init() {
		    this.textEntities = this.el.querySelectorAll('a-text');
		    this.opacityUpdate(1);
		    this.start = null;
		  },
		  tick: function tick(t) {
		    if (!this.start) {
		      this.start = t;
		    }
		    var opacity = 1 - Math.min((t - this.start) / this.data.duration, 1);
		    this.opacityUpdate(opacity);
		    if (opacity === 0) {
		      this.el.removeAttribute('fadeout');
		      Event.emit(this.el, 'animationend');
		    }
		  },
		  opacityUpdate: opacityUpdate
		});
		
		// -----------------------------------------------------------------------------
		// SHOW
		
		AFRAME.registerComponent('show', {
		  init: function init() {
		    this.textEntities = this.el.querySelectorAll('a-text');
		    this.opacityUpdate(1);
		    this.el.removeAttribute('show');
		  },
		  opacityUpdate: opacityUpdate
		});
		
		// -----------------------------------------------------------------------------
		// HIDE
		
		AFRAME.registerComponent('hide', {
		  init: function init() {
		    this.textEntities = this.el.querySelectorAll('a-text');
		    this.opacityUpdate(0);
		    this.el.removeAttribute('hide');
		  },
		  opacityUpdate: opacityUpdate
		});
	
	/***/ }),
	/* 4 */
	/***/ (function(module, exports) {
	
		"use strict";
		
		module.exports = {
		  emit: function emit(el, name, data) {
		    el.dispatchEvent(new CustomEvent(name, { detail: data }));
		  }
		};
	
	/***/ }),
	/* 5 */
	/***/ (function(module, exports, __webpack_require__) {
	
		'use strict';
		
		var Utils = __webpack_require__(6);
		var Assets = __webpack_require__(7);
		var Draw = __webpack_require__(8);
		var Behaviors = __webpack_require__(11);
		var SFX = __webpack_require__(12);
		var Event = __webpack_require__(4);
		
		AFRAME.registerComponent('keyboard', {
		  schema: {
		    isOpen: { type: "boolean", default: false },
		    physicalKeyboard: { type: "boolean", default: false }
		  },
		  currentInput: null,
		  init: function init() {
		    var that = this;
		
		    // Assets
		    Utils.preloadAssets(Assets);
		
		    // SFX
		    SFX.init(this.el);
		
		    // Draw
		    Draw.init(this.el);
		
		    // Init keyboard UI
		    var numericalUI = Draw.numericalUI(),
		        mainUI = Draw.mainUI(),
		        actionsUI = Draw.actionsUI();
		
		    // Create layout
		    this.el.alphabeticalLayout = Draw.alphabeticalLayout();
		    this.el.symbolsLayout = Draw.symbolsLayout();
		
		    // Append layouts to UI
		    numericalUI.appendChild(Draw.numericalLayout());
		    mainUI.appendChild(this.el.alphabeticalLayout);
		    actionsUI.appendChild(Draw.actionsLayout());
		
		    this.el.appendChild(numericalUI);
		    this.el.appendChild(mainUI);
		    this.el.appendChild(actionsUI);
		
		    // Inject methods in elements..
		    this.el.show = function () {
		      Behaviors.showKeyboard(that.el);
		    };
		    this.el.hide = function () {
		      Behaviors.hideKeyboard(that.el);
		    };
		    this.el.open = function () {
		      Behaviors.openKeyboard(that.el);
		    };
		    this.el.dismiss = function () {
		      Behaviors.dismissKeyboard(that.el);
		    };
		    this.el.destroy = function () {
		      Behaviors.destroyKeyboard(that.el);
		    };
		
		    // Set default value
		    this.el.setAttribute("scale", "2 2 2");
		    this.el.setAttribute("rotation", "-20 0 0");
		    this.el.setAttribute("position", "-1.5 -0.3 -2");
		
		    // Register keyboard events
		    this.el.addEventListener('input', this.inputEvent.bind(this));
		    this.el.addEventListener('backspace', this.backspaceEvent.bind(this));
		    this.el.addEventListener('dismiss', this.dismissEvent.bind(this));
		
		    // Register global events
		    document.addEventListener('keydown', this.keydownEvent.bind(this));
		    document.body.addEventListener('didfocusinput', this.didFocusInputEvent.bind(this));
		    document.body.addEventListener('didblurinput', this.didBlurInputEvent.bind(this));
		  },
		  update: function update() {
		    if (this.data.isOpen) {
		      Behaviors.showKeyboard(this.el);
		    } else {
		      Behaviors.hideKeyboard(this.el);
		    }
		  },
		  tick: function tick() {},
		  remove: function remove() {
		    this.el.removeEventListener('input', this.inputEvent.bind(this));
		    this.el.removeEventListener('backspace', this.backspaceEvent.bind(this));
		    this.el.removeEventListener('dismiss', this.dismissEvent.bind(this));
		
		    document.removeEventListener('keydown', this.keydownEvent.bind(this));
		    document.body.removeEventListener('didfocusinput', this.didFocusInputEvent.bind(this));
		    document.body.removeEventListener('didblurinput', this.didBlurInputEvent.bind(this));
		  },
		  pause: function pause() {},
		  play: function play() {},
		
		  // Fired on keyboard key press
		  inputEvent: function inputEvent(e) {
		    if (this.currentInput) {
		      this.currentInput.appendString(e.detail);
		    }
		  },
		
		  // Fired on backspace key press
		  backspaceEvent: function backspaceEvent(e) {
		    if (this.currentInput) {
		      this.currentInput.deleteLast();
		    }
		  },
		
		  dismissEvent: function dismissEvent(e) {
		    if (this.currentInput) {
		      this.currentInput.blur();
		    }
		  },
		
		  // physical keyboard event
		  keydownEvent: function keydownEvent(e) {
		    if (this.currentInput && this.data.physicalKeyboard) {
		      e.preventDefault();
		      e.stopPropagation();
		
		      if (e.key === 'Enter') {
		        Event.emit(Behaviors.el, 'input', '\n');
		        Event.emit(Behaviors.el, 'enter', '\n');
		      } else if (e.key === 'Backspace') {
		        Event.emit(Behaviors.el, 'backspace');
		      } else if (e.key === 'Escape') {
		        Event.emit(Behaviors.el, 'dismiss');
		      } else if (e.key.length < 2) {
		        Event.emit(Behaviors.el, 'input', e.key);
		      }
		    }
		  },
		
		  // Fired when an input has been selected
		  didFocusInputEvent: function didFocusInputEvent(e) {
		    if (this.currentInput) {
		      this.currentInput.blur(true);
		    }
		    this.currentInput = e.detail;
		    if (!this.el.isOpen) {
		      Behaviors.openKeyboard(this.el);
		    }
		  },
		
		  // Fired when an input has been deselected
		  didBlurInputEvent: function didBlurInputEvent(e) {
		    this.currentInput = null;
		    Behaviors.dismissKeyboard(this.el);
		  }
		});
		
		AFRAME.registerPrimitive('a-keyboard', {
		  defaultComponents: {
		    keyboard: {}
		  },
		  mappings: {
		    'is-open': 'keyboard.isOpen',
		    'physical-keyboard': 'keyboard.physicalKeyboard'
		  }
		});
	
	/***/ }),
	/* 6 */
	/***/ (function(module, exports) {
	
		'use strict';
		
		var Utils = {};
		
		/**
		  Utils.preloadAssets([])
		  Add assets to Assets managment system.
		*/
		Utils.preloadAssets = function (assets_arr) {
		  var assets = document.querySelector('a-assets'),
		      already_exists = void 0;
		
		  if (!assets) {
		    var scene = document.querySelector('a-scene');
		    assets = document.createElement('a-assets');
		    scene.appendChild(assets);
		  }
		
		  var _iteratorNormalCompletion = true;
		  var _didIteratorError = false;
		  var _iteratorError = undefined;
		
		  try {
		    for (var _iterator = assets_arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
		      var item = _step.value;
		
		      already_exists = false;
		
		      var _iteratorNormalCompletion2 = true;
		      var _didIteratorError2 = false;
		      var _iteratorError2 = undefined;
		
		      try {
		        for (var _iterator2 = assets.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
		          var stuff = _step2.value;
		
		          if (item.id === stuff.id) {
		            already_exists = true;
		          }
		        }
		      } catch (err) {
		        _didIteratorError2 = true;
		        _iteratorError2 = err;
		      } finally {
		        try {
		          if (!_iteratorNormalCompletion2 && _iterator2.return) {
		            _iterator2.return();
		          }
		        } finally {
		          if (_didIteratorError2) {
		            throw _iteratorError2;
		          }
		        }
		      }
		
		      if (!already_exists) {
		        var asset_item = document.createElement(item.type);
		        asset_item.setAttribute('id', item.id);
		        asset_item.setAttribute('src', item.src);
		        assets.appendChild(asset_item);
		      }
		    }
		  } catch (err) {
		    _didIteratorError = true;
		    _iteratorError = err;
		  } finally {
		    try {
		      if (!_iteratorNormalCompletion && _iterator.return) {
		        _iterator.return();
		      }
		    } finally {
		      if (_didIteratorError) {
		        throw _iteratorError;
		      }
		    }
		  }
		};
		
		/**
		  Utils.extend(a, b)
		  Assign object to other object.
		*/
		Utils.extend = function (a, b) {
		  for (var key in b) {
		    if (b.hasOwnProperty(key)) {
		      a[key] = b[key];
		    }
		  }
		  return a;
		};
		
		Utils.clone = function (original) {
		  if (Array.isArray(original)) {
		    return original.slice(0);
		  }
		
		  // First create an empty object with
		  // same prototype of our original source
		  var clone = Object.create(Object.getPrototypeOf(original));
		  var i = undefined;
		  var keys = Object.getOwnPropertyNames(original);
		  i = 0;
		  while (i < keys.length) {
		    // copy each property into the clone
		    Object.defineProperty(clone, keys[i], Object.getOwnPropertyDescriptor(original, keys[i]));
		    i++;
		  }
		  return clone;
		};
		
		Utils.updateOpacity = function (el, opacity) {
		  if (el.hasAttribute('text')) {
		    var props = el.getAttribute('text');
		    if (props) {
		      props.opacity = opacity;
		      el.setAttribute('text', props);
		    }
		  }
		  el.object3D.traverse(function (o) {
		    if (o.material) {
		      o.material.transparent = true;
		      o.material.opacity = opacity;
		    }
		  });
		  var _iteratorNormalCompletion3 = true;
		  var _didIteratorError3 = false;
		  var _iteratorError3 = undefined;
		
		  try {
		    for (var _iterator3 = el.querySelectorAll('a-text')[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
		      var text = _step3.value;
		
		      text.setAttribute('opacity', opacity);
		    }
		  } catch (err) {
		    _didIteratorError3 = true;
		    _iteratorError3 = err;
		  } finally {
		    try {
		      if (!_iteratorNormalCompletion3 && _iterator3.return) {
		        _iterator3.return();
		      }
		    } finally {
		      if (_didIteratorError3) {
		        throw _iteratorError3;
		      }
		    }
		  }
		};
		
		// Calculate the width factor
		Utils.getWidthFactor = function (el, wrapCount) {
		  var widthFactor = 0.00001;
		  if (el.components.text && el.components.text.currentFont) {
		    widthFactor = el.components.text.currentFont.widthFactor;
		    widthFactor = (0.5 + wrapCount) * widthFactor;
		  }
		  return widthFactor;
		};
		
		module.exports = Utils;
	
	/***/ }),
	/* 7 */
	/***/ (function(module, exports) {
	
		'use strict';
		
		module.exports = [{ type: 'img', id: 'aframeKeyboardShift', src: AFRAME.ASSETS_PATH + '/images/ShiftIcon.png' }, { type: 'img', id: 'aframeKeyboardShiftActive', src: AFRAME.ASSETS_PATH + '/images/ShiftActiveIcon.png' }, { type: 'img', id: 'aframeKeyboardGlobal', src: AFRAME.ASSETS_PATH + '/images/GlobalIcon.png' }, { type: 'img', id: 'aframeKeyboardBackspace', src: AFRAME.ASSETS_PATH + '/images/BackspaceIcon.png' }, { type: 'img', id: 'aframeKeyboardEnter', src: AFRAME.ASSETS_PATH + '/images/EnterIcon.png' }, { type: 'img', id: 'aframeKeyboardDismiss', src: AFRAME.ASSETS_PATH + '/images/DismissIcon.png' }, { type: 'img', id: 'aframeKeyboardShadow', src: AFRAME.ASSETS_PATH + '/images/KeyShadow.png' }, { type: 'audio', id: 'aframeKeyboardKeyIn', src: AFRAME.ASSETS_PATH + '/sounds/KeyIn.mp3' }, { type: 'audio', id: 'aframeKeyboardKeyDown', src: AFRAME.ASSETS_PATH + '/sounds/KeyDown.mp3' }];
	
	/***/ }),
	/* 8 */
	/***/ (function(module, exports, __webpack_require__) {
	
		'use strict';
		
		var Layouts = __webpack_require__(9);
		var Config = __webpack_require__(10);
		var Behaviors = __webpack_require__(11);
		var Draw = {};
		
		Draw.el = null;
		
		Draw.init = function (el) {
		  Draw.el = el;
		  Behaviors.el = el;
		  Behaviors.SFX = el.SFX;
		};
		
		// -----------------------------------------------------------------------------
		// DRAW NUMERICAL UI
		
		Draw.numericalUI = function () {
		  var wrapper = document.createElement('a-entity');
		  wrapper.setAttribute('position', '0.025 0 0.12');
		  wrapper.setAttribute('rotation', '0 25 0');
		  wrapper.setAttribute('data-ui', true);
		
		  var el = document.createElement('a-rounded');
		  el.setAttribute('width', '0.280');
		  el.setAttribute('height', '0.360');
		  el.setAttribute('radius', '0.02');
		  el.setAttribute('color', Config.KEYBOARD_COLOR);
		  wrapper.appendChild(el);
		
		  return wrapper;
		};
		
		// -----------------------------------------------------------------------------
		// DRAW MAIN UI
		
		Draw.mainUI = function () {
		  var wrapper = document.createElement('a-entity');
		  wrapper.setAttribute('position', '0.312 0 0');
		  wrapper.setAttribute('data-ui', true);
		
		  var el = document.createElement('a-rounded');
		  el.setAttribute('width', '0.840');
		  el.setAttribute('height', '0.360');
		  el.setAttribute('radius', '0.02');
		  el.setAttribute('color', Config.KEYBOARD_COLOR);
		  wrapper.appendChild(el);
		
		  return wrapper;
		};
		
		// -----------------------------------------------------------------------------
		// DRAW ACTION UI
		
		Draw.actionsUI = function () {
		  var wrapper = document.createElement('a-entity');
		  wrapper.setAttribute('position', '1.180 0 0.01');
		  wrapper.setAttribute('rotation', '0 -25 0');
		  wrapper.setAttribute('data-ui', true);
		
		  var el = document.createElement('a-rounded');
		  el.setAttribute('width', '0.180');
		  el.setAttribute('height', '0.360');
		  el.setAttribute('radius', '0.02');
		  el.setAttribute('color', Config.KEYBOARD_COLOR);
		  wrapper.appendChild(el);
		
		  return wrapper;
		};
		
		// -----------------------------------------------------------------------------
		// DRAW NUMERICAL LAYOUT
		
		Draw.numericalLayout = function () {
		  var data = Layouts.numerical;
		  var wrapper = document.createElement('a-entity');
		  wrapper.setAttribute('position', '0.02 0.26 0.001');
		
		  var index_y = 0;
		  for (var i in data) {
		    var key_id = 'num-' + i;
		    var key = Draw.key(key_id, data[i].type, data[i].value);
		    var index_x = i % 3;
		    var x = Config.KEY_WIDTH * index_x;
		    var y = Config.KEY_WIDTH * index_y;
		    key.setAttribute('position', x + ' -' + y + ' 0');
		    if (index_x === 2) {
		      index_y++;
		    }
		    wrapper.appendChild(key);
		  }
		
		  return wrapper;
		};
		
		// -----------------------------------------------------------------------------
		// DRAW ALPHABETICAL LAYOUT
		
		Draw.alphabeticalLayout = function () {
		  var data = Layouts.alphabetical;
		  var wrapper = document.createElement('a-entity');
		  wrapper.setAttribute('position', '0.02 0.26 0.001');
		
		  var index_y = 0,
		      index_x = 0,
		      prev_was_space = false;
		
		  for (var i in data) {
		    var key_id = 'main-' + i;
		    var key = Draw.key(key_id, data[i].type, data[i].value);
		
		    var x = Config.KEY_WIDTH * index_x;
		    var y = Config.KEY_WIDTH * index_y;
		
		    // Add left padding on the second line
		    if (index_y === 1) {
		      x = x + Config.KEY_WIDTH / 2;
		    }
		
		    // Add margin on the key next to the spacebar key
		    if (prev_was_space) {
		      x = x + Config.SPACE_KEY_WIDTH - Config.KEY_WIDTH + 0.055 * 2;
		    }
		
		    // Add margin to the spacebar key
		    if (data[i].type === 'spacebar') {
		      prev_was_space = true;
		      x = x + 0.055;
		      y = Config.KEY_WIDTH * index_y - 0.01;
		    }
		
		    key.setAttribute('position', x + ' -' + y + ' 0');
		
		    if (index_y === 1 && index_x === 8) {
		      index_x = -1;
		      index_y++;
		    } else if (index_x === 9) {
		      index_x = -1;
		      index_y++;
		    }
		    index_x++;
		
		    wrapper.appendChild(key);
		  }
		
		  return wrapper;
		};
		
		// -----------------------------------------------------------------------------
		// DRAW SYMBOLS LAYOUT
		
		Draw.symbolsLayout = function () {
		  var data = Layouts.symbols;
		  var wrapper = document.createElement('a-entity');
		  wrapper.setAttribute('position', '0.02 0.26 0.001');
		
		  var index_y = 0,
		      index_x = 0,
		      prev_was_space = false;
		
		  for (var i in data) {
		
		    var key_id = 'symbols-' + i;
		    var key = Draw.key(key_id, data[i].type, data[i].value);
		    var x = Config.KEY_WIDTH * index_x;
		    var y = Config.KEY_WIDTH * index_y;
		
		    // Add margin on the key next to the spacebar key
		    if (prev_was_space) {
		      x = x + Config.SPACE_KEY_WIDTH - Config.KEY_WIDTH + 0.055 * 2;
		    }
		
		    // Add margin to the spacebar key
		    if (data[i].type === 'spacebar') {
		      prev_was_space = true;
		      x = x + 0.055;
		      y = Config.KEY_WIDTH * index_y - 0.01;
		    }
		
		    key.setAttribute('position', x + ' -' + y + ' 0');
		
		    if (index_x === 9) {
		      index_x = -1;
		      index_y++;
		    }
		    index_x++;
		    wrapper.appendChild(key);
		  }
		
		  return wrapper;
		};
		
		// -----------------------------------------------------------------------------
		// DRAW ACTIONS LAYOUT
		
		Draw.actionsLayout = function () {
		  var data = Layouts.actions;
		  var wrapper = document.createElement('a-entity');
		  wrapper.setAttribute('position', '0.02 0.26 0.001');
		
		  var val_y = 0;
		  for (var i in data) {
		    var key_id = 'action-' + i;
		    var key = Draw.key(key_id, data[i].type, data[i].value);
		
		    key.setAttribute('position', '0 -' + val_y + ' 0');
		    if (i == 0) {
		      val_y += Config.ACTION_WIDTH + 0.01;
		    } else if (i == 1) {
		      val_y += Config.KEY_WIDTH + 0.01;
		    }
		    wrapper.appendChild(key);
		  }
		
		  return wrapper;
		};
		
		// -----------------------------------------------------------------------------
		// DRAW KEY
		
		Draw.key = function (id, type, value) {
		  var that = undefined;
		
		  var el = document.createElement('a-rounded');
		  el.setAttribute('key-id', id);
		  el.setAttribute('width', Config.KEY_WIDTH);
		  el.setAttribute('height', Config.KEY_WIDTH);
		  el.setAttribute('radius', '0.008');
		  el.setAttribute('position', '0 0 0');
		  el.setAttribute('key-type', type);
		  el.setAttribute('key-value', value);
		  el.setAttribute('color', Config.KEYBOARD_COLOR);
		
		  // ---------------------------------------------------------------------------
		  // EVENTS
		
		  Behaviors.addKeyEvents(el);
		
		  // ---------------------------------------------------------------------------
		  // SHADOW
		
		  el.shadow_el = document.createElement('a-image');
		  el.shadow_el.setAttribute('width', Config.KEY_WIDTH * 1.25);
		  el.shadow_el.setAttribute('height', Config.KEY_WIDTH * 1.25);
		  el.shadow_el.setAttribute('position', Config.KEY_WIDTH / 2 + ' ' + Config.KEY_WIDTH / 2 + ' -0.002');
		  el.shadow_el.setAttribute('src', '#aframeKeyboardShadow');
		  el.appendChild(el.shadow_el);
		
		  // ---------------------------------------------------------------------------
		  // TEXT KEY
		
		  if (type === 'text' || type === 'spacebar' || type === 'symbol') {
		    var letter_el = document.createElement('a-text');
		    letter_el.setAttribute('value', value);
		    letter_el.setAttribute('color', '#dbddde');
		    letter_el.setAttribute('position', Config.KEY_WIDTH / 2 + ' ' + Config.KEY_WIDTH / 2 + ' 0.01');
		    letter_el.setAttribute('scale', '0.16 0.16 0.16');
		    letter_el.setAttribute('align', 'center');
		    letter_el.setAttribute('baseline', 'center');
		    el.appendChild(letter_el);
		  }
		
		  // ---------------------------------------------------------------------------
		  // SPACEBAR KEY
		
		  if (type === 'spacebar') {
		    el.setAttribute('width', Config.SPACE_KEY_WIDTH);
		    el.setAttribute('height', Config.SPACE_KEY_HEIGHT);
		    el.setAttribute('color', '#404b50');
		    el.shadow_el.setAttribute('width', Config.SPACE_KEY_WIDTH * 1.12);
		    el.shadow_el.setAttribute('height', Config.SPACE_KEY_HEIGHT * 1.2);
		    el.shadow_el.setAttribute('position', Config.SPACE_KEY_WIDTH / 2 + ' ' + Config.SPACE_KEY_HEIGHT / 2 + ' -0.02');
		    letter_el.setAttribute('color', '#adb1b3');
		    letter_el.setAttribute('scale', '0.12 0.12 0.12');
		    letter_el.setAttribute('position', Config.SPACE_KEY_WIDTH / 2 + ' ' + Config.SPACE_KEY_HEIGHT / 2 + ' 0');
		  }
		
		  // ---------------------------------------------------------------------------
		  // SYMBOL KEY
		
		  else if (type === 'symbol') {
		      letter_el.setAttribute('scale', '0.12 0.12 0.12');
		    }
		
		  // ---------------------------------------------------------------------------
		  // ACTION KEY
		
		  if (type === 'backspace' || type === 'enter' || type === 'dismiss') {
		    el.setAttribute('width', Config.ACTION_WIDTH);
		    el.shadow_el.setAttribute('width', Config.ACTION_WIDTH * 1.25);
		    el.shadow_el.setAttribute('position', Config.ACTION_WIDTH / 2 + ' ' + Config.KEY_WIDTH / 2 + ' -0.02');
		  }
		
		  // ---------------------------------------------------------------------------
		  // SHIFT KEY
		
		  if (type === 'shift') {
		    var icon_el = document.createElement('a-image');
		    icon_el.setAttribute('data-type', 'icon');
		    icon_el.setAttribute('width', '0.032');
		    icon_el.setAttribute('height', '0.032');
		    icon_el.setAttribute('position', '0.04 0.04 0.01');
		    icon_el.setAttribute('src', '#aframeKeyboardShift');
		    el.appendChild(icon_el);
		    Draw.el.shiftKey = el;
		  }
		
		  // ---------------------------------------------------------------------------
		  // GLOBAL
		
		  else if (type === 'global') {
		      var icon_el = document.createElement('a-image');
		      icon_el.setAttribute('width', '0.032');
		      icon_el.setAttribute('height', '0.032');
		      icon_el.setAttribute('position', '0.04 0.04 0.01');
		      icon_el.setAttribute('src', '#aframeKeyboardGlobal');
		      el.appendChild(icon_el);
		    }
		
		    // ---------------------------------------------------------------------------
		    // BACKSPACE
		
		    else if (type === 'backspace') {
		        var icon_el = document.createElement('a-image');
		        icon_el.setAttribute('width', '0.046');
		        icon_el.setAttribute('height', '0.046');
		        icon_el.setAttribute('position', '0.07 0.04 0.01');
		        icon_el.setAttribute('src', '#aframeKeyboardBackspace');
		        el.appendChild(icon_el);
		      }
		
		      // ---------------------------------------------------------------------------
		      // ENTER
		
		      else if (type === 'enter') {
		          el.setAttribute('height', Config.ACTION_WIDTH);
		          el.shadow_el.setAttribute('height', Config.ACTION_WIDTH * 1.25);
		          el.shadow_el.setAttribute('position', Config.ACTION_WIDTH / 2 + ' ' + Config.ACTION_WIDTH / 2 + ' -0.02');
		
		          var circle_el = document.createElement('a-circle');
		          circle_el.setAttribute('color', '#4285f4');
		          circle_el.setAttribute('radius', 0.044);
		          circle_el.setAttribute('position', '0.07 0.07 0.01');
		          el.appendChild(circle_el);
		
		          var icon_el = document.createElement('a-image');
		          icon_el.setAttribute('width', '0.034');
		          icon_el.setAttribute('height', '0.034');
		          icon_el.setAttribute('position', '0.07 0.07 0.011');
		          icon_el.setAttribute('src', '#aframeKeyboardEnter');
		          el.appendChild(icon_el);
		        }
		
		        // ---------------------------------------------------------------------------
		        // DISMISS
		
		        else if (type === 'dismiss') {
		            var icon_el = document.createElement('a-image');
		            icon_el.setAttribute('width', '0.046');
		            icon_el.setAttribute('height', '0.046');
		            icon_el.setAttribute('position', '0.07 0.04 0.01');
		            icon_el.setAttribute('src', '#aframeKeyboardDismiss');
		            el.appendChild(icon_el);
		          }
		
		  return el;
		};
		
		module.exports = Draw;
	
	/***/ }),
	/* 9 */
	/***/ (function(module, exports) {
	
		'use strict';
		
		var Layouts = {
		  numerical: [{ type: 'text', value: '1' }, { type: 'text', value: '2' }, { type: 'text', value: '3' }, { type: 'text', value: '4' }, { type: 'text', value: '5' }, { type: 'text', value: '6' }, { type: 'text', value: '7' }, { type: 'text', value: '8' }, { type: 'text', value: '9' }, { type: 'text', value: '.' }, { type: 'text', value: '0' }, { type: 'text', value: '-' }],
		
		  alphabetical: [{ type: 'text', value: 'q' }, { type: 'text', value: 'w' }, { type: 'text', value: 'e' }, { type: 'text', value: 'r' }, { type: 'text', value: 't' }, { type: 'text', value: 'y' }, { type: 'text', value: 'u' }, { type: 'text', value: 'i' }, { type: 'text', value: 'o' }, { type: 'text', value: 'p' }, { type: 'text', value: 'a' }, { type: 'text', value: 's' }, { type: 'text', value: 'd' }, { type: 'text', value: 'f' }, { type: 'text', value: 'g' }, { type: 'text', value: 'h' }, { type: 'text', value: 'j' }, { type: 'text', value: 'k' }, { type: 'text', value: 'l' }, { type: 'shift' }, { type: 'text', value: 'z' }, { type: 'text', value: 'x' }, { type: 'text', value: 'c' }, { type: 'text', value: 'v' }, { type: 'text', value: 'b' }, { type: 'text', value: 'n' }, { type: 'text', value: 'm' }, { type: 'text', value: '!' }, { type: 'text', value: '?' }, { type: 'symbol', value: '#+=' }, { type: 'text', value: '@' }, { type: 'spacebar', value: '' }, { type: 'text', value: ',' }, { type: 'text', value: '.' }],
		
		  symbols: [{ type: 'text', value: '@' }, { type: 'text', value: '#' }, { type: 'text', value: '$' }, { type: 'text', value: '%' }, { type: 'text', value: '&' }, { type: 'text', value: '*' }, { type: 'text', value: '-' }, { type: 'text', value: '+' }, { type: 'text', value: '(' }, { type: 'text', value: ')' }, { type: 'text', value: '~' }, { type: 'text', value: '`' }, { type: 'text', value: '"' }, { type: 'text', value: '\'' }, { type: 'text', value: ':' }, { type: 'text', value: ';' }, { type: 'text', value: '_' }, { type: 'text', value: '=' }, { type: 'text', value: '\\' }, { type: 'text', value: '/' }, { type: 'text', value: '{' }, { type: 'text', value: '}' }, { type: 'text', value: '[' }, { type: 'text', value: ']' }, { type: 'text', value: '<' }, { type: 'text', value: '>' }, { type: 'text', value: '^' }, { type: 'text', value: '|' }, { type: 'text', value: '!' }, { type: 'text', value: '?' }, { type: 'symbol', value: 'ABC' }, { type: 'text', value: '@' }, { type: 'spacebar', value: '' }, { type: 'text', value: ',' }, { type: 'text', value: '.' }],
		
		  actions: [{ type: 'backspace', value: 'Del' }, { type: 'enter', value: 'OK' }, { type: 'dismiss', value: 'W' }]
		};
		
		module.exports = Layouts;
	
	/***/ }),
	/* 10 */
	/***/ (function(module, exports) {
	
		"use strict";
		
		var Config = {
		  KEYBOARD_COLOR: "#263238",
		  KEY_COLOR_HIGHLIGHT: "#29363c",
		  KEY_COLOR_ACTIVE: "#404b50",
		  SPACEBAR_COLOR_ACTIVE: "#3c464b",
		  SPACEBAR_COLOR_HIGHLIGHT: "#445055",
		  KEY_WIDTH: 0.08,
		  SPACE_KEY_WIDTH: 0.368,
		  SPACE_KEY_HEIGHT: 0.05,
		  ACTION_WIDTH: 0.140
		};
		
		module.exports = Config;
	
	/***/ }),
	/* 11 */
	/***/ (function(module, exports, __webpack_require__) {
	
		'use strict';
		
		var Config = __webpack_require__(10);
		var Utils = __webpack_require__(6);
		var Event = __webpack_require__(4);
		var SFX = __webpack_require__(12);
		var Behaviors = {};
		
		Behaviors.el = null;
		
		// -----------------------------------------------------------------------------
		// KEYBOARD METHODS
		
		Behaviors.showKeyboard = function (el) {
		  if (el.o_position) {
		    el.setAttribute("position", el.o_position);
		  }
		  el.isOpen = true;
		  var _iteratorNormalCompletion = true;
		  var _didIteratorError = false;
		  var _iteratorError = undefined;
		
		  try {
		    for (var _iterator = el.querySelectorAll('[data-ui]')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
		      var item = _step.value;
		      var _iteratorNormalCompletion2 = true;
		      var _didIteratorError2 = false;
		      var _iteratorError2 = undefined;
		
		      try {
		        for (var _iterator2 = item.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
		          var child = _step2.value;
		
		          child.setAttribute('show', true);
		        }
		      } catch (err) {
		        _didIteratorError2 = true;
		        _iteratorError2 = err;
		      } finally {
		        try {
		          if (!_iteratorNormalCompletion2 && _iterator2.return) {
		            _iterator2.return();
		          }
		        } finally {
		          if (_didIteratorError2) {
		            throw _iteratorError2;
		          }
		        }
		      }
		    }
		  } catch (err) {
		    _didIteratorError = true;
		    _iteratorError = err;
		  } finally {
		    try {
		      if (!_iteratorNormalCompletion && _iterator.return) {
		        _iterator.return();
		      }
		    } finally {
		      if (_didIteratorError) {
		        throw _iteratorError;
		      }
		    }
		  }
		
		  var parent = el.parentNode;
		  if (parent) {
		    return;
		  }
		  el.sceneEl.appendChild(el);
		};
		
		Behaviors.hideKeyboard = function (el) {
		  var position = el.getAttribute("position");
		  if (position.x !== -10000) {
		    el.o_position = position;
		  }
			el.emit('keyboardIsClosed');
		  el.isOpen = false;
		  el.setAttribute("position", "-10000 -10000 -10000");
		  el.setAttribute('fadeout', { duration: 1 });
		};
		
		Behaviors.destroyKeyboard = function (el) {
		  var parent = el.parentNode;
		  if (!parent) {
		    return;
		  }
		  parent.removeChild(el);
		};
		
		Behaviors.openKeyboard = function (el) {
		  if (el.o_position) {
		    el.setAttribute("position", el.o_position);
		  }
		  el.isOpen = true;
		  el._transitioning = true;
		  el.emit('keyboardIsOpen');
		  var parent = el.parentNode;
		  if (!parent) {
		    el.sceneEl.appendChild(el);
		  }
		  var _iteratorNormalCompletion3 = true;
		  var _didIteratorError3 = false;
		  var _iteratorError3 = undefined;
		
		  try {
		    var _loop = function _loop() {
		      var item = _step3.value;
		      var _iteratorNormalCompletion4 = true;
		      var _didIteratorError4 = false;
		      var _iteratorError4 = undefined;
		
		      try {
		        for (var _iterator4 = item.children[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
		          var child = _step4.value;
		
		          child.setAttribute('hide', true);
		        }
		      } catch (err) {
		        _didIteratorError4 = true;
		        _iteratorError4 = err;
		      } finally {
		        try {
		          if (!_iteratorNormalCompletion4 && _iterator4.return) {
		            _iterator4.return();
		          }
		        } finally {
		          if (_didIteratorError4) {
		            throw _iteratorError4;
		          }
		        }
		      }
		
		      function animationend() {
		        item.children[0].removeEventListener('animationend', animationend);
		        setTimeout(function () {
		          item.children[1].setAttribute('fadein', { duration: 160 });
		          Event.emit(Behaviors.el, 'didopen');
		          el._transitioning = false;
		        }, 10);
		      }
		      item.children[0].setAttribute('fadein', { duration: 160 });
		      item.children[0].addEventListener('animationend', animationend);
		    };
		
		    for (var _iterator3 = el.querySelectorAll('[data-ui]')[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
		      _loop();
		    }
		  } catch (err) {
		    _didIteratorError3 = true;
		    _iteratorError3 = err;
		  } finally {
		    try {
		      if (!_iteratorNormalCompletion3 && _iterator3.return) {
		        _iterator3.return();
		      }
		    } finally {
		      if (_didIteratorError3) {
		        throw _iteratorError3;
		      }
		    }
		  }
		};
		
		Behaviors.dismissKeyboard = function (el) {
		  el._transitioning = true;
		  var _iteratorNormalCompletion5 = true;
		  var _didIteratorError5 = false;
		  var _iteratorError5 = undefined;
		
		  try {
		    var _loop2 = function _loop2() {
		      var item = _step5.value;
		      var _iteratorNormalCompletion6 = true;
		      var _didIteratorError6 = false;
		      var _iteratorError6 = undefined;
		
		      try {
		        for (var _iterator6 = item.children[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
		          var child = _step6.value;
		
		          child.setAttribute('show', true);
		        }
		      } catch (err) {
		        _didIteratorError6 = true;
		        _iteratorError6 = err;
		      } finally {
		        try {
		          if (!_iteratorNormalCompletion6 && _iterator6.return) {
		            _iterator6.return();
		          }
		        } finally {
		          if (_didIteratorError6) {
		            throw _iteratorError6;
		          }
		        }
		      }
		
		      el.isOpen = false;
		      function animationend() {
		        item.children[1].removeEventListener('animationend', animationend);
		        setTimeout(function () {
		          function animationend() {
		            item.children[0].removeEventListener('animationend', animationend);
		            Behaviors.hideKeyboard(el);
		            Event.emit(Behaviors.el, 'diddismiss');
		            el._transitioning = false;
		          }
		          item.children[0].setAttribute('fadeout', { duration: 160 });
		          item.children[0].addEventListener('animationend', animationend);
		        }, 10);
		      }
		      item.children[1].setAttribute('fadeout', { duration: 160 });
		      item.children[1].addEventListener('animationend', animationend);
		    };
		
		    for (var _iterator5 = el.querySelectorAll('[data-ui]')[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
		      _loop2();
		    }
		  } catch (err) {
		    _didIteratorError5 = true;
		    _iteratorError5 = err;
		  } finally {
		    try {
		      if (!_iteratorNormalCompletion5 && _iterator5.return) {
		        _iterator5.return();
		      }
		    } finally {
		      if (_didIteratorError5) {
		        throw _iteratorError5;
		      }
		    }
		  }
		};
		
		// -----------------------------------------------------------------------------
		// KEY EVENTS
		
		Behaviors.addKeyEvents = function (el) {
		  el.addEventListener('click', Behaviors.keyClick);
		  el.addEventListener('mousedown', Behaviors.keyDown);
		  el.addEventListener('mouseup', Behaviors.keyOut);
		  el.addEventListener('mouseleave', Behaviors.keyOut);
		  el.addEventListener('mouseenter', Behaviors.keyIn);
		 // el.addEventListener('raycaster-intersected', Behaviors.keyIn);
		//  el.addEventListener('raycaster-intersected-cleared', Behaviors.keyOut);
		  //triggerdown
		  // https://aframe.io/docs/0.6.0/components/hand-controls.html
		};
		
		// -----------------------------------------------------------------------------
		// KEYCLICK
		
		Behaviors.keyClick = function () {
		  // SFX.keyDown(Behaviors.el);
		
		  var type = this.getAttribute('key-type');
		  var value = this.getAttribute('key-value');
		
		  if (type === 'text' || type === 'spacebar') {
		    if (type === 'spacebar') {
		      value = ' ';
		    }
		    if (Behaviors.isShiftEnabled) {
		      value = value.toUpperCase();
		      Behaviors.shiftToggle();
		    } else if (Behaviors.isSymbols) {
		      Behaviors.symbolsToggle();
		    }
		    Event.emit(Behaviors.el, 'input', value);
		  } else if (type === 'shift') {
		    Behaviors.shiftToggle();
		  } else if (type === 'symbol') {
		    Behaviors.symbolsToggle();
		  } else if (type === 'backspace') {
		    Event.emit(Behaviors.el, 'backspace');
		  } else if (type === 'enter') {
		    Event.emit(Behaviors.el, 'input', '\n');
		    Event.emit(Behaviors.el, 'enter', '\n');
		  } else if (type === 'dismiss') {
		    Event.emit(Behaviors.el, 'dismiss');
		  }
		};
		
		// -----------------------------------------------------------------------------
		// KEYDOWN
		
		Behaviors.keyDown = function () {
		  if (Behaviors.el._transitioning) {
		    return;
		  }
		  this.object3D.position.z = 0.003;
		  if (this.getAttribute('key-type') === 'spacebar') {
		    this.setAttribute('color', Config.SPACEBAR_COLOR_ACTIVE);
		  } else {
		    this.setAttribute('color', Config.KEY_COLOR_ACTIVE);
		  }
		};
		
		// -----------------------------------------------------------------------------
		// KEYIN
		
		Behaviors.keyIn = function () {
		  if (Behaviors.el._transitioning) {
		    return;
		  }
		  if (this.object3D.children[2] && this.object3D.children[2].material && !this.object3D.children[2].material.opacity) {
		    return;
		  }
		  SFX.keyIn(Behaviors.el);
		  if (this.getAttribute('key-type') === 'spacebar') {
		    this.setAttribute('color', Config.SPACEBAR_COLOR_HIGHLIGHT);
		  } else {
		    this.setAttribute('color', Config.KEY_COLOR_HIGHLIGHT);
		  }
		};
		
		// -----------------------------------------------------------------------------
		// KEYOUT
		
		Behaviors.keyOut = function () {
		  this.object3D.position.z = 0;
		  if (this.getAttribute('key-type') === 'spacebar') {
		    this.setAttribute('color', Config.KEY_COLOR_ACTIVE);
		  } else {
		    this.setAttribute('color', Config.KEYBOARD_COLOR);
		  }
		};
		
		// -----------------------------------------------------------------------------
		// SHIFT
		
		Behaviors.isShiftEnabled = false;
		Behaviors.shiftToggle = function () {
		  Behaviors.isShiftEnabled = !Behaviors.isShiftEnabled;
		
		  var icon_el = Behaviors.el.shiftKey.querySelector('[data-type]');
		  if (Behaviors.isShiftEnabled) {
		    icon_el.setAttribute('src', '#aframeKeyboardShiftActive');
		  } else {
		    icon_el.setAttribute('src', '#aframeKeyboardShift');
		  }
		
		  var _iteratorNormalCompletion7 = true;
		  var _didIteratorError7 = false;
		  var _iteratorError7 = undefined;
		
		  try {
		    for (var _iterator7 = document.querySelectorAll("[key-id]")[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
		      var keyEl = _step7.value;
		
		      var key_id = keyEl.getAttribute('key-id'),
		          key_type = keyEl.getAttribute('key-type');
		      if (key_id.startsWith('main-') && key_type === "text") {
		        var textEl = keyEl.querySelector('a-text');
		        if (textEl) {
		          var value = textEl.getAttribute('value').toLowerCase();
		          if (this.isShiftEnabled) {
		            value = value.toUpperCase();
		          }
		          textEl.setAttribute('value', value);
		        }
		      }
		    }
		  } catch (err) {
		    _didIteratorError7 = true;
		    _iteratorError7 = err;
		  } finally {
		    try {
		      if (!_iteratorNormalCompletion7 && _iterator7.return) {
		        _iterator7.return();
		      }
		    } finally {
		      if (_didIteratorError7) {
		        throw _iteratorError7;
		      }
		    }
		  }
		};
		
		// -----------------------------------------------------------------------------
		// SYMBOLS
		
		Behaviors.isSymbols = false;
		Behaviors.symbolsToggle = function () {
		  Behaviors.isSymbols = !Behaviors.isSymbols;
		  if (!Behaviors.isSymbols) {
		    var parent = Behaviors.el.symbolsLayout.parentNode;
		    parent.removeChild(Behaviors.el.symbolsLayout);
		    parent.appendChild(Behaviors.el.alphabeticalLayout);
		    setTimeout(function () {
		      Utils.updateOpacity(Behaviors.el.alphabeticalLayout, 1);
		    }, 0);
		  } else {
		    var _parent = Behaviors.el.alphabeticalLayout.parentNode;
		    _parent.removeChild(Behaviors.el.alphabeticalLayout);
		    _parent.appendChild(Behaviors.el.symbolsLayout);
		  }
		};
		
		module.exports = Behaviors;
	
	/***/ }),
	/* 12 */
	/***/ (function(module, exports) {
	
		'use strict';
		
		var SFX = {
		
		  init: function init(parent) {
		    var el = document.createElement('a-sound');
		    el.setAttribute('key', 'aframeKeyboardKeyInSound');
		    el.setAttribute('sfx', true);
		    el.setAttribute('src', '#aframeKeyboardKeyIn');
		    el.setAttribute('position', '0 2 5');
		    parent.appendChild(el);
		
		    el = document.createElement('a-sound');
		    el.setAttribute('key', 'aframeKeyboardKeyDownSound');
		    el.setAttribute('sfx', true);
		    el.setAttribute('src', '#aframeKeyboardKeyDown');
		    el.setAttribute('position', '0 2 5');
		    parent.appendChild(el);
		  },
		
		  keyIn: function keyIn(parent) {
		    var el = parent.querySelector('[key=aframeKeyboardKeyInSound]');
		    if (!el) {
		      return;
		    }
		    el.components.sound.stopSound();
		    el.components.sound.playSound();
		  },
		
		  keyDown: function keyDown(parent) {
		    var el = parent.querySelector('[key=aframeKeyboardKeyDownSound]');
		    if (!el) {
		      return;
		    }
		    el.components.sound.stopSound();
		    el.components.sound.playSound();
		  }
		};
		
		module.exports = SFX;
	
	/***/ }),
	/* 13 */
	/***/ (function(module, exports, __webpack_require__) {
	
		'use strict';
		
		var Utils = __webpack_require__(6);
		var Event = __webpack_require__(4);
		
		/*
		@BUG: Space has not effect when no letter comes after.
		@TODO: <progress value="70" max="100">70 %</progress>
		*/
		
		AFRAME.registerComponent('input', {
		  schema: {
		    value: { type: "string", default: "" },
		    name: { type: "string", default: "" },
		    disabled: { type: "boolean", default: false },
		    color: { type: "color", default: "#000" },
		    align: { type: "string", default: "left" },
		    font: { type: "string", default: "" },
		    letterSpacing: { type: "int", default: 0 },
		    lineHeight: { type: "string", default: "" },
		    opacity: { type: "number", default: 1 },
		    side: { type: "string", default: 'front' },
		    tabSize: { type: "int", default: 4 },
		    placeholder: { type: "string", default: "" },
		    placeholderColor: { type: "color", default: "#AAA" },
		    maxLength: { type: "int", default: 0 },
		    type: { type: "string", default: "text" },
		    width: { type: "number", default: 1 },
		    cursorWidth: { type: "number", default: 0.01 },
		    cursorHeight: { type: "number", default: 0.08 },
		    cursorColor: { type: "color", default: "#007AFF" },
		    backgroundColor: { type: "color", default: "#FFF" },
		    backgroundOpacity: { type: "number", default: 1 }
		  },
		
		  init: function init() {
		    var that = this;
		
		    this.background = document.createElement('a-rounded');
		    this.background.setAttribute('radius', 0.01);
		    this.background.setAttribute('height', 0.18);
		    this.background.setAttribute('side', 'double');
		    this.el.appendChild(this.background);
		
		    this.cursor = document.createElement('a-plane');
		    this.cursor.setAttribute('position', '0 0 0.003');
		    this.cursor.setAttribute('visible', false);
		    this.el.appendChild(this.cursor);
		
		    this.text = document.createElement('a-entity');
		    this.el.appendChild(this.text);
		
		    this.placeholder = document.createElement('a-entity');
		    this.placeholder.setAttribute('visible', false);
		    this.el.appendChild(this.placeholder);
		
		    this.el.focus = this.focus.bind(this);
		    this.el.blur = this.blur.bind(this);
		    this.el.appendString = this.appendString.bind(this);
		    this.el.deleteLast = this.deleteLast.bind(this);
		
		    //setTimeout(function() { that.updateText(); }, 0);
		    this.blink();
		
		    this.el.addEventListener('click', function () {
		      if (this.components.input.data.disabled) {
		        return;
		      }
		      that.focus();
		    });
		
		    Object.defineProperty(this.el, 'value', {
		      get: function get() {
		        return this.getAttribute('value');
		      },
		      set: function set(value) {
		        this.setAttribute('value', value);
		      },
		      enumerable: true,
		      configurable: true
		    });
		  },
		  blink: function blink() {
		    var that = this;
		    if (!this.isFocused) {
		      that.cursor.setAttribute('visible', false);
		      clearInterval(this.cursorInterval);
		      this.cursorInterval = null;
		      return;
		    }
		    this.cursorInterval = setInterval(function () {
		      that.cursor.setAttribute('visible', !that.cursor.getAttribute('visible'));
		    }, 500);
		  },
		  isFocused: false,
		  focus: function focus(noemit) {
		    if (this.isFocused) {
		      return;
		    }
		    this.isFocused = true;
		    this.cursor.setAttribute('visible', true);
		    this.blink();
		    Event.emit(this.el, 'focus');
		    if (!noemit) {
		      Event.emit(document.body, 'didfocusinput', this.el);
		    }
		  },
		  blur: function blur(noemit) {
		    if (!this.isFocused) {
		      return;
		    }
		    this.isFocused = false;
		    if (this.cursorInterval) {
		      clearInterval(this.cursorInterval);
		      this.cursorInterval = null;
		    }
		    this.cursor.setAttribute('visible', false);
		    Event.emit(this.el, 'blur');
		    if (!noemit) {
		      Event.emit(document.body, 'didblurinput', this.el);
		    }
		  },
		  appendString: function appendString(data) {
		    if (data === '\n') {
		      return this.blur();
		    }
		    var str = this.el.getAttribute("value");
		    if (!str) {
		      str = "";
		    }
		    str = str + data;
		    this.el.setAttribute("value", str);
		    Event.emit(this.el, 'change', str);
		  },
		  deleteLast: function deleteLast() {
		    var str = this.el.getAttribute("value");
		    if (!str) {
		      str = "";
		    }
		    str = str.slice(0, -1);
		    this.el.setAttribute("value", str);
		    Event.emit(this.el, 'change', str);
		  },
		  updateText: function updateText() {
		    var that = this;
		    var padding = {
		      left: 0.021,
		      right: 0.021
		    };
		
		    var props = {
		      color: this.data.color,
		      align: this.data.align,
		      side: this.data.side,
		      tabSize: this.data.tabSize,
		      wrapCount: 24 * this.data.width,
		      width: this.data.width
		
		      // Make cursor stop blinking when typing..
		      // (and blinking again after typing stop).
		    };var attr = this.text.getAttribute("text");
		    if (attr) {
		      if (this.data.value !== attr.value) {
		        if (this.cursorInterval) {
		          clearInterval(this.cursorInterval);
		          this.cursorInterval = null;
		        }
		        if (this.cursorTimer) {
		          clearTimeout(this.cursorTimer);
		          this.cursorTimer = null;
		        }
		        this.cursor.setAttribute('visible', true);
		        this.cursorTimer = setTimeout(function () {
		          that.blink();
		        }, 50);
		      }
		    }
		
		    // Max length
		    if (this.data.maxLength) {
		      props.value = this.data.value.substring(0, this.data.maxLength);
		      this.el.setAttribute('value', props.value);
		    } else {
		      props.value = this.data.value;
		    }
		
		    if (this.data.type === "password") {
		      props.value = "*".repeat(this.data.value.length);
		    }
		
		    if (this.data.font.length) {
		      props.font = this.data.font;
		    }
		    if (this.data.letterSpacing) {
		      props.letterSpacing = this.data.letterSpacing;
		    }
		    if (this.data.lineHeight.length) {
		      props.lineHeight = this.data.lineHeight;
		    }
		    this.text.setAttribute('visible', false);
		    this.text.setAttribute("text", props);
		
		    function getTextWidth(el, data, trimFirst, _widthFactor) {
		      if (!el.object3D || !el.object3D.children || !el.object3D.children[0]) {
		        return 0;
		      }
		      var v = el.object3D.children[0].geometry.visibleGlyphs;
		      if (!v) {
		        return 0;
		      }
		      v = v[v.length - 1];
		      if (!v) {
		        return 0;
		      }
		      if (v.line) {
		        if (trimFirst) {
		          data.value = data.value.substr(1);
		        } else {
		          data.value = data.value.slice(0, -1);
		        }
		        el.setAttribute("text", data);
		        return getTextWidth(el, data, trimFirst);
		      } else {
		        if (!_widthFactor) {
		          _widthFactor = Utils.getWidthFactor(el, data.wrapCount);
		        }
		        v = (v.position[0] + v.data.width) / (_widthFactor / that.data.width);
		        var textRatio = (v + padding.left + padding.right) / that.data.width;
		
		        if (textRatio > 1) {
		          if (trimFirst) {
		            data.value = data.value.substr(1);
		          } else {
		            data.value = data.value.slice(0, -1);
		          }
		          el.setAttribute("text", data);
		          return getTextWidth(el, data, trimFirst, _widthFactor);
		        }
		      }
		      return v;
		    }
		
		    if (props.value.length) {
		      this.placeholder.setAttribute('visible', false);
		    } else {
		      this.placeholder.setAttribute('visible', true);
		    }
		
		    var placeholder_props = Utils.clone(props);
		    placeholder_props.value = this.data.placeholder;
		    placeholder_props.color = this.data.placeholderColor;
		    this.placeholder.setAttribute("text", placeholder_props);
		
		    setTimeout(function () {
		      if (that.text.object3D) {
		        var children = that.text.object3D.children;
		        if (children[0] && children[0].geometry && children[0].geometry.visibleGlyphs) {
		          var v = 0;
		          if (children[0].geometry.visibleGlyphs.length) {
		            v = getTextWidth(that.text, props, true);
		            that.text.setAttribute('visible', true);
		          }
		          that.cursor.setAttribute('position', v + padding.left + ' 0 0.003');
		        } else {
		          that.cursor.setAttribute('position', padding.left + ' 0 0.003');
		        }
		      } else {
		        that.cursor.setAttribute('position', padding.left + ' 0 0.003');
		      }
		      getTextWidth(that.placeholder, placeholder_props);
		    }, 0);
		
		    this.background.setAttribute('color', this.data.backgroundColor);
		    /*if (this.data.backgroundOpacity) {
		      setTimeout(function() {
		        Utils.updateOpacity(that.background, that.data.backgroundOpacity);
		      }, 0);
		    }*/
		    this.background.setAttribute('width', this.data.width);
		    //this.background.setAttribute('position', this.data.width/2+' 0 0');
		    this.background.setAttribute('position', '0 -0.09 0.001');
		    this.text.setAttribute('position', padding.left - 0.001 + this.data.width / 2 + ' 0 0.002');
		    this.placeholder.setAttribute('position', padding.left - 0.001 + this.data.width / 2 + ' 0 0.002');
		  },
		  updateCursor: function updateCursor() {
		    this.cursor.setAttribute('width', this.data.cursorWidth);
		    this.cursor.setAttribute('height', this.data.cursorHeight);
		    this.cursor.setAttribute('color', this.data.cursorColor);
		  },
		  update: function update() {
		    var that = this;
		    setTimeout(function () {
		      //  Utils.updateOpacity(that.el, that.data.opacity);
		    }, 0);
		
		    this.updateCursor();
		    this.updateText();
		  },
		  tick: function tick() {},
		  remove: function remove() {},
		  pause: function pause() {},
		  play: function play() {}
		});
		
		AFRAME.registerPrimitive('a-input', {
		  defaultComponents: {
		    input: {}
		  },
		  mappings: {
		    value: 'input.value',
		    name: 'input.name',
		    disabled: 'input.disabled',
		    color: 'input.color',
		    align: 'input.align',
		    font: 'input.font',
		    'letter-spacing': 'input.letterSpacing',
		    'line-height': 'input.lineHeight',
		    'opacity': 'input.opacity',
		    'side': 'input.side',
		    'tab-size': 'input.tabSize',
		    placeholder: 'input.placeholder',
		    'placeholder-color': 'input.placeholderColor',
		    'max-length': 'input.maxLength',
		    type: 'input.type',
		    width: 'input.width',
		    'cursor-width': "input.cursorWidth",
		    'cursor-height': "input.cursorHeight",
		    'cursor-color': "input.cursorColor",
		    'background-color': 'input.backgroundColor',
		    'background-opacity': 'input.backgroundOpacity'
		  }
		});
	
	/***/ }),
	/* 14 */
	/***/ (function(module, exports, __webpack_require__) {
	
		'use strict';
		
		var Utils = __webpack_require__(6);
		var Event = __webpack_require__(4);
		var Assets = __webpack_require__(15);
		var SFX = __webpack_require__(16);
		
		AFRAME.registerComponent('button', {
		  schema: {
		    disabled: { type: 'boolean', default: false },
		    type: { type: "string", default: "raised" },
		    name: { type: "string", default: "" },
		    value: { type: "string", default: "Button" },
		    buttonColor: { type: "color", default: "#4076fd" },
		    color: { type: "color", default: "#FFF" },
		    font: { type: "string", default: "" },
		    letterSpacing: { type: "int", default: 0 },
		    lineHeight: { type: "string", default: "" },
		    opacity: { type: "number", default: 1 },
		    width: { type: "number", default: 1 }
		  },
		  init: function init() {
		    var that = this;
		
		    // Assets
		    Utils.preloadAssets(Assets);
		
		    // SFX
		    SFX.init(this.el);
		
		    this.wrapper = document.createElement('a-entity');
		    this.wrapper.setAttribute('position', '0 0 0.01');
		    this.el.appendChild(this.wrapper);
		
		    this.shadow = document.createElement('a-image');
		    this.shadow.setAttribute('height', 0.36 * 1.25);
		    this.shadow.setAttribute('src', '#aframeButtonShadow');
		    this.wrapper.appendChild(this.shadow);
		
		    // OUTLINE
		    this.outline = document.createElement('a-rounded');
		    this.outline.setAttribute('height', 0.36);
		    this.outline.setAttribute('radius', 0.03);
		    this.outline.setAttribute('position', '0 -' + 0.36 / 2 + ' 0.01');
		    this.wrapper.appendChild(this.outline);
		
		    // LABEL
		    this.label = document.createElement('a-entity');
		    this.outline.appendChild(this.label);
		
		    // EVENTS
		    this.el.addEventListener('click', function () {
		      if (this.components.button && this.components.button.data.disabled) {
		        return;
		      }
		      that.onClick();
		    });
		    this.el.addEventListener('mousedown', function () {
		      if (this.components.button && this.components.button.data.disabled) {
		        return SFX.clickDisabled(this);
		      }
		      that.wrapper.setAttribute('position', '0 0 0.036');
		      SFX.click(this);
		    });
		    this.el.addEventListener('mouseup', function () {
		      if (this.components.button && this.components.button.data.disabled) {
		        return;
		      }
		      that.wrapper.setAttribute('position', '0 0 0');
		    });
		
		    this.el.getWidth = this.getWidth.bind(this);
		    Object.defineProperty(this.el, 'value', {
		      get: function get() {
		        return this.getAttribute('value');
		      },
		      set: function set(value) {
		        this.setAttribute('value', value);
		      },
		      enumerable: true,
		      configurable: true
		    });
		  },
		  onClick: function onClick() {
		    //Event.emit(this.el, 'click');
		  },
		  getWidth: function getWidth() {
		    return this.__width;
		  },
		  update: function update() {
		    var that = this;
		    this.outline.setAttribute('color', this.data.buttonColor);
		
		    var props = {
		      color: this.data.color,
		      align: 'center',
		      wrapCount: 10 * this.data.width,
		      width: this.data.width
		    };
		    if (this.data.font) {
		      props.font = this.data.font;
		    }
		
		    if (this.data.type === "flat") {
		      props.color = this.data.buttonColor;
		    }
		
		    // TITLE
		    props.value = this.data.value.toUpperCase();
		    this.label.setAttribute('text', props);
		    this.label.setAttribute('position', this.data.width / 2 + 0.24 + ' 0 0.01');
		
		    // TRIM TEXT IF NEEDED.. @TODO: optimize this mess..
		    function getTextWidth(el, callback, _widthFactor) {
		      if (!el.object3D || !el.object3D.children || !el.object3D.children[0]) {
		        return setTimeout(function () {
		          getTextWidth(el, callback);
		        }, 10);
		      }
		      var v = el.object3D.children[0].geometry.visibleGlyphs;
		      if (!v) {
		        return setTimeout(function () {
		          getTextWidth(el, callback);
		        }, 10);
		      }
		      v = v[v.length - 1];
		      if (!v) {
		        return callback(0);
		      }
		      if (v.line) {
		        props.value = props.value.slice(0, -1);
		        el.setAttribute("text", props);
		        return getTextWidth(el, callback);
		      } else {
		        if (!_widthFactor) {
		          _widthFactor = Utils.getWidthFactor(el, props.wrapCount);
		        }
		        v = (v.position[0] + v.data.width) / (_widthFactor / that.data.width);
		        var textRatio = v / that.data.width;
		        if (textRatio > 1) {
		          props.value = props.value.slice(0, -1);
		          el.setAttribute("text", props);
		          return getTextWidth(el, callback, _widthFactor);
		        }
		      }
		      return callback(v);
		    }
		    setTimeout(function () {
		      if (that.data.value.length) {
		        getTextWidth(that.label, function (width) {
		          that.label.setAttribute('position', width / 2 + 0.28 / 2 + ' ' + 0.36 / 2 + ' 0.02'); //
		          width = width + 0.28;
		          that.outline.setAttribute('width', width);
		          that.__width = width;
		          that.shadow.setAttribute('width', width * 1.17);
		          that.shadow.setAttribute('position', width / 2 + ' 0 0');
		          Event.emit(that.el, 'change:width', width);
		        });
		      }
		
		      if (that.data.disabled) {
		        that.shadow.setAttribute('visible', false);
		        var timer = setInterval(function () {
		          if (that.label.object3D.children[0] && that.label.object3D.children[0].geometry.visibleGlyphs) {
		            clearInterval(timer);
		            Utils.updateOpacity(that.el, 0.4);
		          }
		        }, 10);
		      } else {
		        var _timer = setInterval(function () {
		          if (that.label.object3D.children[0] && that.label.object3D.children[0].geometry.visibleGlyphs) {
		            clearInterval(_timer);
		            Utils.updateOpacity(that.el, 1);
		          }
		        }, 10);
		      }
		
		      if (that.data.type === "flat") {
		        that.shadow.setAttribute('visible', false);
		        var _timer2 = setInterval(function () {
		          if (that.label.object3D.children[0] && that.label.object3D.children[0].geometry.visibleGlyphs) {
		            clearInterval(_timer2);
		            Utils.updateOpacity(that.outline, 0);
		            if (that.data.disabled) {
		              Utils.updateOpacity(that.label, 0.4);
		            }
		          }
		        }, 10);
		      }
		    }, 0);
		  },
		  tick: function tick() {},
		  remove: function remove() {},
		  pause: function pause() {},
		  play: function play() {}
		});
		
		AFRAME.registerPrimitive('a-button', {
		  defaultComponents: {
		    button: {}
		  },
		  mappings: {
		    disabled: 'button.disabled',
		    type: 'button.type',
		    name: 'button.name',
		    value: 'button.value',
		    'button-color': 'button.buttonColor',
		    color: 'button.color',
		    font: 'button.font',
		    'letter-spacing': 'button.letterSpacing',
		    'line-height': 'button.lineHeight',
		    'opacity': 'button.opacity',
		    'width': 'button.width'
		  }
		});
	
	/***/ }),
	/* 15 */
	/***/ (function(module, exports) {
	
		'use strict';
		
		module.exports = [{ type: 'img', id: 'aframeButtonShadow', src: AFRAME.ASSETS_PATH + '/images/ButtonShadow.png' }, { type: 'audio', id: 'aframeButtonClick', src: AFRAME.ASSETS_PATH + '/sounds/ButtonClick.mp3' }, { type: 'audio', id: 'aframeButtonClickDisabled', src: AFRAME.ASSETS_PATH + '/sounds/ButtonClickDisabled.mp3' }];
	
	/***/ }),
	/* 16 */
	/***/ (function(module, exports) {
	
		'use strict';
		
		var SFX = {
		
		  init: function init(parent) {
		    var el = document.createElement('a-sound');
		    el.setAttribute('key', 'aframeButtonClickSound');
		    el.setAttribute('sfx', true);
		    el.setAttribute('src', '#aframeButtonClick');
		    el.setAttribute('position', '0 2 5');
		    parent.appendChild(el);
		
		    el = document.createElement('a-sound');
		    el.setAttribute('key', 'aframeButtonClickDisabledSound');
		    el.setAttribute('sfx', true);
		    el.setAttribute('src', '#aframeButtonClickDisabled');
		    el.setAttribute('position', '0 2 5');
		    parent.appendChild(el);
		  },
		
		  click: function click(parent) {
		    var el = parent.querySelector('[key=aframeButtonClickSound]');
		    if (!el) {
		      return;
		    }
		    el.components.sound.stopSound();
		    el.components.sound.playSound();
		  },
		
		  clickDisabled: function clickDisabled(parent) {
		    var el = parent.querySelector('[key=aframeButtonClickDisabledSound]');
		    if (!el) {
		      return;
		    }
		    el.components.sound.stopSound();
		    el.components.sound.playSound();
		  }
		};
		
		module.exports = SFX;
	
	/***/ })
	/******/ ]);
	//# sourceMappingURL=aframe-material.js.map

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	/* global AFRAME */
	var axios = __webpack_require__(6);
	/**
	 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
	 * back in.
	 */
	AFRAME.registerComponent('map-overlay', {
		schema: {
			nothing: {type: 'string'}
		},
	
		// ACTUAL IMPLEMENTATION IS LOCATED WITHIN THE nav-row.js FILE
	
		init: function () {
			var data = this.data;
			var el = this.el;
			var html = document.createElement('div');
			html.setAttribute('id', 'embeddedMap');
			//html.setAttribute('style', 'position: absolute; top: 0; right: 0; height: 200px; width: 200px;');
			html.setAttribute('style', 'position: absolute;' +
				'margin: 10px;'+
				' top: 0; ' +
				'right: 0; '
				//'perspective: 500px;' +
				//' perspective-origin: 150% 150%; ' +
				//'transform-style: preserve-3d; ' +
				//'transform: translateZ(50px);'
			);
			var map = document.createElement('div');
			map.setAttribute('id', 'map');
			html.appendChild(map);
			var attach = document.querySelector('body');
			attach.appendChild(html);
			this.initialize();
			console.log(AFRAME);
	
	
			this.el.addEventListener('gotLocation', function(event){
				console.log('gotLocation Event: ', event);
			})
	
		},
	
		remove: function(){
			var mapContainer = document.querySelector('div#embeddedMap');
			mapContainer.parentNode.removeChild(mapContainer);
		},
	
		initialize: function () {
			var geocoder;
			var marker;
			var loader;
			var locations = [
				{lat: 51.50700703827454, lng: -0.12791916931155356},
				{lat: 32.6144404, lng: -108.9852017},
				{lat: 39.36382677360614, lng: 8.431220278759724},
				{lat: 59.30571937680209, lng: 4.879402148657164},
				{lat: 28.240385123352873, lng: -16.629988706884774},
				{lat: 50.09072314148827, lng: 14.393133454556278},
				{lat: 41.413416092316275, lng: 2.1531126527786455},
				{lat: 35.69143938066447, lng: 139.695139627539},
				{lat: 35.67120372775569, lng: 139.77167914398797},
				{lat: 54.552083679428065, lng: -3.297380963134742}
			];
	
			var pos;
			if (window.location.hash) {
				var parts = window.location.hash.substr(1).split(',');
				pos = {lat: parts[0], lng: parts[1]};
			} else {
				pos = locations[Math.floor(Math.random() * locations.length)];
			}
			var myLatlng = new google.maps.LatLng(pos.lat, pos.lng);
	
			var myOptions = {
				zoom: 4,
				center: myLatlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				streetViewControl: false
			};
			this.gmap = new google.maps.Map(document.getElementById("map"), myOptions);
			google.maps.event.addListener(this.gmap, 'click', this.addMarker.bind(this));
			console.log('this.gmap', this.gmap);
			//	geocoder = new google.maps.Geocoder();
			//	setZoom( 2 );
			//	addMarker( myLatlng );
		},
	
		addMarker: function (event) {
			console.log('map click event', event);
			var location = event.latLng;
			this.el.emit('gotLocation', {lat: location.lat(),lng: location.lng()}, true);
			if (this.marker) this.marker.setMap(null);
			this.marker = new google.maps.Marker({
				position: location,
				map: this.gmap
			});
			this.marker.setMap(this.gmap);
	
		//	showMessage('Loading panorama for zoom ' + /*zoom*/ 4 + '...');
			//loader.load( location );
		}
	});


/***/ }),
/* 42 */
/***/ (function(module, exports) {

	/**
	 * @type {GSVPANO|*|{}}
	 */
	var GSVPANO = GSVPANO || {};
	
	/**
	 * Panoloader().
	 * @param parameters
	 * @constructor
	 */
	GSVPANO.PanoLoader = function ( parameters ) {
	
	  'use strict';
	
	  var _parameters = parameters || {},
	    _location,
	    _zoom,
	    _panoId,
	    _panoClient = new google.maps.StreetViewService(),
	    _count = 0,
	    _total = 0,
	    _canvas = document.createElement( 'canvas' ),
	    _ctx = _canvas.getContext( '2d' ),
	    rotation = 0,
	    pitch = 0,
	    copyright = '',
	    onSizeChange = null,
	    onPanoramaLoad = null;
	
	  /**
	   * setProgress().
	   * @param p
	   */
	  this.setProgress = function ( p ) {
	    if ( this.onProgress ) {
	      this.onProgress( p );
	    }
	
	  };
	
	  /**
	   * throwError().
	   * @param message
	   */
	  this.throwError = function ( message ) {
	    if ( this.onError ) {
	      this.onError( message );
	    }
	    else {
	      console.error( message );
	    }
	  };
	
	  /**
	   * adaptTextureToZoom().
	   */
	  this.adaptTextureToZoom = function () {
	
	    var w = 416 * Math.pow( 2, _zoom ),
	      h = (416 * Math.pow( 2, _zoom - 1 ));
	    _canvas.width = w;
	    _canvas.height = h;
	//    _ctx.translate( _canvas.width, 0 );
	//    _ctx.scale( -1, 1 );
	  };
	
	  /**
	   * composeFromTile().
	   * @param x
	   * @param y
	   * @param texture
	   */
	  this.composeFromTile = function ( x, y, texture ) {
	
	    _ctx.drawImage( texture, x * 512, y * 512 );
	    _count++;
	
	    var p = Math.round( _count * 100 / _total );
	    this.setProgress( p );
	
	    if ( _count === _total ) {
	      this.canvas = _canvas;
	      if ( this.onPanoramaLoad ) {
	        this.onPanoramaLoad(this.canvas);
	      }
	    }
	
	  };
	
	  /**
	   * composePanorama().
	   */
	  this.composePanorama = function ( panoId ) {
	    this.setProgress( 0 );
	    var
	      w = (_zoom == 3) ? 7 : Math.pow( 2, _zoom ),
	      h = Math.pow( 2, _zoom - 1 ),
	      self = this,
	      url, x, y;
	
	    _count = 0;
	    _total = w * h;
	
	    /**
	     * Get the tiles.
	     */
	    for ( y = 0; y < h; y++ ) {
	      for ( x = 0; x < w; x++ ) {
	        //        url = 'https://geo0.ggpht.com/cbk?cb_client=maps_sv.tactile&authuser=0&hl=en&panoid=' + _panoId + '&output=tile&x=' + x + '&y=' + y + '&zoom=' + _zoom + '&nbt&fover=2';
	//        url = 'https://cbks2.google.com/cbk?cb_client=maps_sv.tactile&authuser=0&hl=en&panoid=' + _panoId + '&output=tile&zoom=' + _zoom + '&x=' + x + '&y=' + y + '&' + Date.now();
	        url = 'http://maps.google.com/cbk?output=tile&panoid=' + _panoId + '&zoom=' + _zoom + '&x=' + x + '&y=' + y + '&' + Date.now();
	        (function ( x, y ) {
	          var img = new Image();
	          img.addEventListener( 'load', function () {
	            self.composeFromTile( x, y, this );
	          } );
	          img.crossOrigin = '';
	          img.src = url;
	          console.log("tile url: ", img);
	        })( x, y );
	      }
	    }
	  };
	
	  /**
	   * loadData().
	   * Middle function for working with IDs.
	   * @param location
	   */
	  this.loadData = function ( location ) {
	    var self = this;
	    var url;
	
	    url = 'https://maps.google.com/cbk?output=json&hl=x-local&ll=' + location.lat() + ',' + location.lng() + '&cb_client=maps_sv&v=3';
	    url = 'https://cbks0.google.com/cbk?cb_client=maps_sv.tactile&authuser=0&hl=en&output=polygon&it=1%3A1&rank=closest&ll=' + location.lat() + ',' + location.lng() + '&radius=350';
	
	    var http_request = new XMLHttpRequest();
	    http_request.open( "GET", url, true );
	    http_request.onreadystatechange = function () {
	      if ( http_request.readyState == 4 && http_request.status == 200 ) {
	        var data = JSON.parse( http_request.responseText );
	        self.loadPano( location, data.result[ 0 ].id );
	      }
	    };
	    http_request.send( null );
	  };
	
	
	  /**
	   * The load().
	   * @param location
	   * @param id
	   */
	  this.load = function ( location, id ) {
	    var self = this;
	//    _panoClient.getPanoramaById( id, function (result, status) {
	    _panoClient.getPanoramaByLocation( location, 50, function ( result, status ) {
	      if ( status === google.maps.StreetViewStatus.OK ) {
	        if ( self.onPanoramaData ) {
	          self.onPanoramaData( result );
	        }
	        rotation = result.tiles.centerHeading * Math.PI / 180.0;
	        pitch = result.tiles.originPitch;
	        copyright = result.copyright;
	        self.copyright = result.copyright;
	        _panoId = result.location.pano;
	        self.location = location;
	        self.rotation = rotation;
	        self.pitch = pitch;
	        self.image_date = result.imageDate;
	        self.id = _panoId;
	        self.composePanorama();
	      }
	      else {
	        if ( self.onNoPanoramaData ) {
	          self.onNoPanoramaData( status );
	        }
	        self.throwError( 'Could not retrieve panorama for the following reason: ' + status );
	      }
	    } );
	
	  };
	
	  /**
	  * setZoom().
	  * @param z
	  */
	  this.setZoom = function ( z ) {
	    _zoom = z;
	    this.adaptTextureToZoom();
	  };
	
	  // Default zoom.
	  this.setZoom( _parameters.zoom || 1 );
	
	};
	
	module.exports = GSVPANO;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	/* global AFRAME */
	var axios = __webpack_require__(6);
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
					console.log('in aframe', response);
					var userData = response.data;
					var searchCount = 0;
					for(var i=0; i<userData.searches.length; i++){
	
						//messageContainer.setAttribute('id', 'errorMsg');
						console.log('address', userData.searches[i].address);
						if(userData.searches[i].address){
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
							el.appendChild(msgPlane);
						}
					}
					var searchesLabel = document.createElement('a-text');
					searchesLabel.setAttribute("value", "Your Top Searches");
					searchesLabel.setAttribute('position', {x: 7, y: searchCount + 1, z: -4});
					searchesLabel.setAttribute('rotation', {x: 0, y: -45, z: 0});
					searchesLabel.setAttribute('color', 'white');
					searchesLabel.setAttribute('text', {height: 1});
					el.appendChild(searchesLabel);
					var messageContainer = document.createElement('a-entity');
					messageContainer.setAttribute('geometry', "primitive: plane; height: " + (searchCount + 2) + "; width: 7");
					messageContainer.setAttribute('material', "color: red; transparent: true; opacity: 0.4");
					messageContainer.setAttribute('position', {x: 9, y: (searchCount + 2)/2, z: -2});
					messageContainer.setAttribute('rotation', {x: 0, y: -45, z: 0});
					el.appendChild(messageContainer);
	
					var usernameLabel = document.createElement('a-text');
					usernameLabel.setAttribute("value", response.data.username);
					usernameLabel.setAttribute("position", {x:0, y:0, z:-1});
					usernameLabel.setAttribute('color', 'white');
					usernameLabel.setAttribute('text', {height: 1});
					//usernameLabel.setAttribute('scale', {x: 0.25, y: 0.25, z: 0.25});
					el.appendChild(usernameLabel);
	
	/*				var messageContainer = document.createElement('a-entity');
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
					var usernameLabel = document.getElementById('username');
					usernameLabel.setAttribute("text", "value: "+ response.data.username + "; color: white; height: 3");
					this.data.user = response.data;*/
	
				})
				.catch(function (error) {
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

/***/ })
/******/ ]);
//# sourceMappingURL=vpp-app.js.map