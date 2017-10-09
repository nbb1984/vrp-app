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
		//require('./simpleState');
		__webpack_require__(33);
		__webpack_require__(2);
		__webpack_require__(35);
		__webpack_require__(36);
		__webpack_require__(48);
		__webpack_require__(37);
		__webpack_require__(38);
		__webpack_require__(39);
		__webpack_require__(40);
		__webpack_require__(41);
		__webpack_require__(42);
		__webpack_require__(44);
		__webpack_require__(45);
	
	
	
		__webpack_require__(46);
		__webpack_require__(47);
		//require('../lib/annyang');
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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(5);
	var bind = __webpack_require__(6);
	var Axios = __webpack_require__(8);
	var defaults = __webpack_require__(9);
	
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
	axios.Cancel = __webpack_require__(27);
	axios.CancelToken = __webpack_require__(28);
	axios.isCancel = __webpack_require__(24);
	
	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(29);
	
	module.exports = axios;
	
	// Allow use of default import syntax in TypeScript
	module.exports.default = axios;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var bind = __webpack_require__(6);
	var isBuffer = __webpack_require__(7);
	
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
/* 6 */
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
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaults = __webpack_require__(9);
	var utils = __webpack_require__(5);
	var InterceptorManager = __webpack_require__(21);
	var dispatchRequest = __webpack_require__(22);
	var isAbsoluteURL = __webpack_require__(25);
	var combineURLs = __webpack_require__(26);
	
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var utils = __webpack_require__(5);
	var normalizeHeaderName = __webpack_require__(11);
	
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
	    adapter = __webpack_require__(12);
	  } else if (typeof process !== 'undefined') {
	    // For node use HTTP adapter
	    adapter = __webpack_require__(12);
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 10 */
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(5);
	
	module.exports = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(5);
	var settle = __webpack_require__(13);
	var buildURL = __webpack_require__(16);
	var parseHeaders = __webpack_require__(17);
	var isURLSameOrigin = __webpack_require__(18);
	var createError = __webpack_require__(14);
	var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(19);
	
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
	      var cookies = __webpack_require__(20);
	
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var createError = __webpack_require__(14);
	
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var enhanceError = __webpack_require__(15);
	
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
/* 15 */
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(5);
	
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(5);
	
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(5);
	
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
/* 19 */
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(5);
	
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(5);
	
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(5);
	var transformData = __webpack_require__(23);
	var isCancel = __webpack_require__(24);
	var defaults = __webpack_require__(9);
	
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(5);
	
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
/* 24 */
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	};


/***/ }),
/* 25 */
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
/* 26 */
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
/* 27 */
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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Cancel = __webpack_require__(27);
	
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
/* 29 */
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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/**
	 * @license
	 * Lo-Dash 2.4.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash -o ./dist/lodash.compat.js`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	;(function() {
	
	  /** Used as a safe reference for `undefined` in pre ES5 environments */
	  var undefined;
	
	  /** Used to pool arrays and objects used internally */
	  var arrayPool = [],
	      objectPool = [];
	
	  /** Used to generate unique IDs */
	  var idCounter = 0;
	
	  /** Used internally to indicate various things */
	  var indicatorObject = {};
	
	  /** Used to prefix keys to avoid issues with `__proto__` and properties on `Object.prototype` */
	  var keyPrefix = +new Date + '';
	
	  /** Used as the size when optimizations are enabled for large arrays */
	  var largeArraySize = 75;
	
	  /** Used as the max size of the `arrayPool` and `objectPool` */
	  var maxPoolSize = 40;
	
	  /** Used to detect and test whitespace */
	  var whitespace = (
	    // whitespace
	    ' \t\x0B\f\xA0\ufeff' +
	
	    // line terminators
	    '\n\r\u2028\u2029' +
	
	    // unicode category "Zs" space separators
	    '\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000'
	  );
	
	  /** Used to match empty string literals in compiled template source */
	  var reEmptyStringLeading = /\b__p \+= '';/g,
	      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
	      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
	
	  /**
	   * Used to match ES6 template delimiters
	   * http://people.mozilla.org/~jorendorff/es6-draft.html#sec-literals-string-literals
	   */
	  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
	
	  /** Used to match regexp flags from their coerced string values */
	  var reFlags = /\w*$/;
	
	  /** Used to detected named functions */
	  var reFuncName = /^\s*function[ \n\r\t]+\w/;
	
	  /** Used to match "interpolate" template delimiters */
	  var reInterpolate = /<%=([\s\S]+?)%>/g;
	
	  /** Used to match leading whitespace and zeros to be removed */
	  var reLeadingSpacesAndZeros = RegExp('^[' + whitespace + ']*0+(?=.$)');
	
	  /** Used to ensure capturing order of template delimiters */
	  var reNoMatch = /($^)/;
	
	  /** Used to detect functions containing a `this` reference */
	  var reThis = /\bthis\b/;
	
	  /** Used to match unescaped characters in compiled string literals */
	  var reUnescapedString = /['\n\r\t\u2028\u2029\\]/g;
	
	  /** Used to assign default `context` object properties */
	  var contextProps = [
	    'Array', 'Boolean', 'Date', 'Error', 'Function', 'Math', 'Number', 'Object',
	    'RegExp', 'String', '_', 'attachEvent', 'clearTimeout', 'isFinite', 'isNaN',
	    'parseInt', 'setTimeout'
	  ];
	
	  /** Used to fix the JScript [[DontEnum]] bug */
	  var shadowedProps = [
	    'constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable',
	    'toLocaleString', 'toString', 'valueOf'
	  ];
	
	  /** Used to make template sourceURLs easier to identify */
	  var templateCounter = 0;
	
	  /** `Object#toString` result shortcuts */
	  var argsClass = '[object Arguments]',
	      arrayClass = '[object Array]',
	      boolClass = '[object Boolean]',
	      dateClass = '[object Date]',
	      errorClass = '[object Error]',
	      funcClass = '[object Function]',
	      numberClass = '[object Number]',
	      objectClass = '[object Object]',
	      regexpClass = '[object RegExp]',
	      stringClass = '[object String]';
	
	  /** Used to identify object classifications that `_.clone` supports */
	  var cloneableClasses = {};
	  cloneableClasses[funcClass] = false;
	  cloneableClasses[argsClass] = cloneableClasses[arrayClass] =
	  cloneableClasses[boolClass] = cloneableClasses[dateClass] =
	  cloneableClasses[numberClass] = cloneableClasses[objectClass] =
	  cloneableClasses[regexpClass] = cloneableClasses[stringClass] = true;
	
	  /** Used as an internal `_.debounce` options object */
	  var debounceOptions = {
	    'leading': false,
	    'maxWait': 0,
	    'trailing': false
	  };
	
	  /** Used as the property descriptor for `__bindData__` */
	  var descriptor = {
	    'configurable': false,
	    'enumerable': false,
	    'value': null,
	    'writable': false
	  };
	
	  /** Used as the data object for `iteratorTemplate` */
	  var iteratorData = {
	    'args': '',
	    'array': null,
	    'bottom': '',
	    'firstArg': '',
	    'init': '',
	    'keys': null,
	    'loop': '',
	    'shadowedProps': null,
	    'support': null,
	    'top': '',
	    'useHas': false
	  };
	
	  /** Used to determine if values are of the language type Object */
	  var objectTypes = {
	    'boolean': false,
	    'function': true,
	    'object': true,
	    'number': false,
	    'string': false,
	    'undefined': false
	  };
	
	  /** Used to escape characters for inclusion in compiled string literals */
	  var stringEscapes = {
	    '\\': '\\',
	    "'": "'",
	    '\n': 'n',
	    '\r': 'r',
	    '\t': 't',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };
	
	  /** Used as a reference to the global object */
	  var root = (objectTypes[typeof window] && window) || this;
	
	  /** Detect free variable `exports` */
	  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
	
	  /** Detect free variable `module` */
	  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
	
	  /** Detect the popular CommonJS extension `module.exports` */
	  var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;
	
	  /** Detect free variable `global` from Node.js or Browserified code and use it as `root` */
	  var freeGlobal = objectTypes[typeof global] && global;
	  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
	    root = freeGlobal;
	  }
	
	  /*--------------------------------------------------------------------------*/
	
	  /**
	   * The base implementation of `_.indexOf` without support for binary searches
	   * or `fromIndex` constraints.
	   *
	   * @private
	   * @param {Array} array The array to search.
	   * @param {*} value The value to search for.
	   * @param {number} [fromIndex=0] The index to search from.
	   * @returns {number} Returns the index of the matched value or `-1`.
	   */
	  function baseIndexOf(array, value, fromIndex) {
	    var index = (fromIndex || 0) - 1,
	        length = array ? array.length : 0;
	
	    while (++index < length) {
	      if (array[index] === value) {
	        return index;
	      }
	    }
	    return -1;
	  }
	
	  /**
	   * An implementation of `_.contains` for cache objects that mimics the return
	   * signature of `_.indexOf` by returning `0` if the value is found, else `-1`.
	   *
	   * @private
	   * @param {Object} cache The cache object to inspect.
	   * @param {*} value The value to search for.
	   * @returns {number} Returns `0` if `value` is found, else `-1`.
	   */
	  function cacheIndexOf(cache, value) {
	    var type = typeof value;
	    cache = cache.cache;
	
	    if (type == 'boolean' || value == null) {
	      return cache[value] ? 0 : -1;
	    }
	    if (type != 'number' && type != 'string') {
	      type = 'object';
	    }
	    var key = type == 'number' ? value : keyPrefix + value;
	    cache = (cache = cache[type]) && cache[key];
	
	    return type == 'object'
	      ? (cache && baseIndexOf(cache, value) > -1 ? 0 : -1)
	      : (cache ? 0 : -1);
	  }
	
	  /**
	   * Adds a given value to the corresponding cache object.
	   *
	   * @private
	   * @param {*} value The value to add to the cache.
	   */
	  function cachePush(value) {
	    var cache = this.cache,
	        type = typeof value;
	
	    if (type == 'boolean' || value == null) {
	      cache[value] = true;
	    } else {
	      if (type != 'number' && type != 'string') {
	        type = 'object';
	      }
	      var key = type == 'number' ? value : keyPrefix + value,
	          typeCache = cache[type] || (cache[type] = {});
	
	      if (type == 'object') {
	        (typeCache[key] || (typeCache[key] = [])).push(value);
	      } else {
	        typeCache[key] = true;
	      }
	    }
	  }
	
	  /**
	   * Used by `_.max` and `_.min` as the default callback when a given
	   * collection is a string value.
	   *
	   * @private
	   * @param {string} value The character to inspect.
	   * @returns {number} Returns the code unit of given character.
	   */
	  function charAtCallback(value) {
	    return value.charCodeAt(0);
	  }
	
	  /**
	   * Used by `sortBy` to compare transformed `collection` elements, stable sorting
	   * them in ascending order.
	   *
	   * @private
	   * @param {Object} a The object to compare to `b`.
	   * @param {Object} b The object to compare to `a`.
	   * @returns {number} Returns the sort order indicator of `1` or `-1`.
	   */
	  function compareAscending(a, b) {
	    var ac = a.criteria,
	        bc = b.criteria,
	        index = -1,
	        length = ac.length;
	
	    while (++index < length) {
	      var value = ac[index],
	          other = bc[index];
	
	      if (value !== other) {
	        if (value > other || typeof value == 'undefined') {
	          return 1;
	        }
	        if (value < other || typeof other == 'undefined') {
	          return -1;
	        }
	      }
	    }
	    // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
	    // that causes it, under certain circumstances, to return the same value for
	    // `a` and `b`. See https://github.com/jashkenas/underscore/pull/1247
	    //
	    // This also ensures a stable sort in V8 and other engines.
	    // See http://code.google.com/p/v8/issues/detail?id=90
	    return a.index - b.index;
	  }
	
	  /**
	   * Creates a cache object to optimize linear searches of large arrays.
	   *
	   * @private
	   * @param {Array} [array=[]] The array to search.
	   * @returns {null|Object} Returns the cache object or `null` if caching should not be used.
	   */
	  function createCache(array) {
	    var index = -1,
	        length = array.length,
	        first = array[0],
	        mid = array[(length / 2) | 0],
	        last = array[length - 1];
	
	    if (first && typeof first == 'object' &&
	        mid && typeof mid == 'object' && last && typeof last == 'object') {
	      return false;
	    }
	    var cache = getObject();
	    cache['false'] = cache['null'] = cache['true'] = cache['undefined'] = false;
	
	    var result = getObject();
	    result.array = array;
	    result.cache = cache;
	    result.push = cachePush;
	
	    while (++index < length) {
	      result.push(array[index]);
	    }
	    return result;
	  }
	
	  /**
	   * Used by `template` to escape characters for inclusion in compiled
	   * string literals.
	   *
	   * @private
	   * @param {string} match The matched character to escape.
	   * @returns {string} Returns the escaped character.
	   */
	  function escapeStringChar(match) {
	    return '\\' + stringEscapes[match];
	  }
	
	  /**
	   * Gets an array from the array pool or creates a new one if the pool is empty.
	   *
	   * @private
	   * @returns {Array} The array from the pool.
	   */
	  function getArray() {
	    return arrayPool.pop() || [];
	  }
	
	  /**
	   * Gets an object from the object pool or creates a new one if the pool is empty.
	   *
	   * @private
	   * @returns {Object} The object from the pool.
	   */
	  function getObject() {
	    return objectPool.pop() || {
	      'array': null,
	      'cache': null,
	      'criteria': null,
	      'false': false,
	      'index': 0,
	      'null': false,
	      'number': null,
	      'object': null,
	      'push': null,
	      'string': null,
	      'true': false,
	      'undefined': false,
	      'value': null
	    };
	  }
	
	  /**
	   * Checks if `value` is a DOM node in IE < 9.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if the `value` is a DOM node, else `false`.
	   */
	  function isNode(value) {
	    // IE < 9 presents DOM nodes as `Object` objects except they have `toString`
	    // methods that are `typeof` "string" and still can coerce nodes to strings
	    return typeof value.toString != 'function' && typeof (value + '') == 'string';
	  }
	
	  /**
	   * Releases the given array back to the array pool.
	   *
	   * @private
	   * @param {Array} [array] The array to release.
	   */
	  function releaseArray(array) {
	    array.length = 0;
	    if (arrayPool.length < maxPoolSize) {
	      arrayPool.push(array);
	    }
	  }
	
	  /**
	   * Releases the given object back to the object pool.
	   *
	   * @private
	   * @param {Object} [object] The object to release.
	   */
	  function releaseObject(object) {
	    var cache = object.cache;
	    if (cache) {
	      releaseObject(cache);
	    }
	    object.array = object.cache = object.criteria = object.object = object.number = object.string = object.value = null;
	    if (objectPool.length < maxPoolSize) {
	      objectPool.push(object);
	    }
	  }
	
	  /**
	   * Slices the `collection` from the `start` index up to, but not including,
	   * the `end` index.
	   *
	   * Note: This function is used instead of `Array#slice` to support node lists
	   * in IE < 9 and to ensure dense arrays are returned.
	   *
	   * @private
	   * @param {Array|Object|string} collection The collection to slice.
	   * @param {number} start The start index.
	   * @param {number} end The end index.
	   * @returns {Array} Returns the new array.
	   */
	  function slice(array, start, end) {
	    start || (start = 0);
	    if (typeof end == 'undefined') {
	      end = array ? array.length : 0;
	    }
	    var index = -1,
	        length = end - start || 0,
	        result = Array(length < 0 ? 0 : length);
	
	    while (++index < length) {
	      result[index] = array[start + index];
	    }
	    return result;
	  }
	
	  /*--------------------------------------------------------------------------*/
	
	  /**
	   * Create a new `lodash` function using the given context object.
	   *
	   * @static
	   * @memberOf _
	   * @category Utilities
	   * @param {Object} [context=root] The context object.
	   * @returns {Function} Returns the `lodash` function.
	   */
	  function runInContext(context) {
	    // Avoid issues with some ES3 environments that attempt to use values, named
	    // after built-in constructors like `Object`, for the creation of literals.
	    // ES5 clears this up by stating that literals must use built-in constructors.
	    // See http://es5.github.io/#x11.1.5.
	    context = context ? _.defaults(root.Object(), context, _.pick(root, contextProps)) : root;
	
	    /** Native constructor references */
	    var Array = context.Array,
	        Boolean = context.Boolean,
	        Date = context.Date,
	        Error = context.Error,
	        Function = context.Function,
	        Math = context.Math,
	        Number = context.Number,
	        Object = context.Object,
	        RegExp = context.RegExp,
	        String = context.String,
	        TypeError = context.TypeError;
	
	    /**
	     * Used for `Array` method references.
	     *
	     * Normally `Array.prototype` would suffice, however, using an array literal
	     * avoids issues in Narwhal.
	     */
	    var arrayRef = [];
	
	    /** Used for native method references */
	    var errorProto = Error.prototype,
	        objectProto = Object.prototype,
	        stringProto = String.prototype;
	
	    /** Used to restore the original `_` reference in `noConflict` */
	    var oldDash = context._;
	
	    /** Used to resolve the internal [[Class]] of values */
	    var toString = objectProto.toString;
	
	    /** Used to detect if a method is native */
	    var reNative = RegExp('^' +
	      String(toString)
	        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
	        .replace(/toString| for [^\]]+/g, '.*?') + '$'
	    );
	
	    /** Native method shortcuts */
	    var ceil = Math.ceil,
	        clearTimeout = context.clearTimeout,
	        floor = Math.floor,
	        fnToString = Function.prototype.toString,
	        getPrototypeOf = isNative(getPrototypeOf = Object.getPrototypeOf) && getPrototypeOf,
	        hasOwnProperty = objectProto.hasOwnProperty,
	        push = arrayRef.push,
	        propertyIsEnumerable = objectProto.propertyIsEnumerable,
	        setTimeout = context.setTimeout,
	        splice = arrayRef.splice,
	        unshift = arrayRef.unshift;
	
	    /** Used to set meta data on functions */
	    var defineProperty = (function() {
	      // IE 8 only accepts DOM elements
	      try {
	        var o = {},
	            func = isNative(func = Object.defineProperty) && func,
	            result = func(o, o, o) && func;
	      } catch(e) { }
	      return result;
	    }());
	
	    /* Native method shortcuts for methods with the same name as other `lodash` methods */
	    var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate,
	        nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray,
	        nativeIsFinite = context.isFinite,
	        nativeIsNaN = context.isNaN,
	        nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys,
	        nativeMax = Math.max,
	        nativeMin = Math.min,
	        nativeParseInt = context.parseInt,
	        nativeRandom = Math.random;
	
	    /** Used to lookup a built-in constructor by [[Class]] */
	    var ctorByClass = {};
	    ctorByClass[arrayClass] = Array;
	    ctorByClass[boolClass] = Boolean;
	    ctorByClass[dateClass] = Date;
	    ctorByClass[funcClass] = Function;
	    ctorByClass[objectClass] = Object;
	    ctorByClass[numberClass] = Number;
	    ctorByClass[regexpClass] = RegExp;
	    ctorByClass[stringClass] = String;
	
	    /** Used to avoid iterating non-enumerable properties in IE < 9 */
	    var nonEnumProps = {};
	    nonEnumProps[arrayClass] = nonEnumProps[dateClass] = nonEnumProps[numberClass] = { 'constructor': true, 'toLocaleString': true, 'toString': true, 'valueOf': true };
	    nonEnumProps[boolClass] = nonEnumProps[stringClass] = { 'constructor': true, 'toString': true, 'valueOf': true };
	    nonEnumProps[errorClass] = nonEnumProps[funcClass] = nonEnumProps[regexpClass] = { 'constructor': true, 'toString': true };
	    nonEnumProps[objectClass] = { 'constructor': true };
	
	    (function() {
	      var length = shadowedProps.length;
	      while (length--) {
	        var key = shadowedProps[length];
	        for (var className in nonEnumProps) {
	          if (hasOwnProperty.call(nonEnumProps, className) && !hasOwnProperty.call(nonEnumProps[className], key)) {
	            nonEnumProps[className][key] = false;
	          }
	        }
	      }
	    }());
	
	    /*--------------------------------------------------------------------------*/
	
	    /**
	     * Creates a `lodash` object which wraps the given value to enable intuitive
	     * method chaining.
	     *
	     * In addition to Lo-Dash methods, wrappers also have the following `Array` methods:
	     * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`, `splice`,
	     * and `unshift`
	     *
	     * Chaining is supported in custom builds as long as the `value` method is
	     * implicitly or explicitly included in the build.
	     *
	     * The chainable wrapper functions are:
	     * `after`, `assign`, `bind`, `bindAll`, `bindKey`, `chain`, `compact`,
	     * `compose`, `concat`, `countBy`, `create`, `createCallback`, `curry`,
	     * `debounce`, `defaults`, `defer`, `delay`, `difference`, `filter`, `flatten`,
	     * `forEach`, `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`,
	     * `functions`, `groupBy`, `indexBy`, `initial`, `intersection`, `invert`,
	     * `invoke`, `keys`, `map`, `max`, `memoize`, `merge`, `min`, `object`, `omit`,
	     * `once`, `pairs`, `partial`, `partialRight`, `pick`, `pluck`, `pull`, `push`,
	     * `range`, `reject`, `remove`, `rest`, `reverse`, `shuffle`, `slice`, `sort`,
	     * `sortBy`, `splice`, `tap`, `throttle`, `times`, `toArray`, `transform`,
	     * `union`, `uniq`, `unshift`, `unzip`, `values`, `where`, `without`, `wrap`,
	     * and `zip`
	     *
	     * The non-chainable wrapper functions are:
	     * `clone`, `cloneDeep`, `contains`, `escape`, `every`, `find`, `findIndex`,
	     * `findKey`, `findLast`, `findLastIndex`, `findLastKey`, `has`, `identity`,
	     * `indexOf`, `isArguments`, `isArray`, `isBoolean`, `isDate`, `isElement`,
	     * `isEmpty`, `isEqual`, `isFinite`, `isFunction`, `isNaN`, `isNull`, `isNumber`,
	     * `isObject`, `isPlainObject`, `isRegExp`, `isString`, `isUndefined`, `join`,
	     * `lastIndexOf`, `mixin`, `noConflict`, `parseInt`, `pop`, `random`, `reduce`,
	     * `reduceRight`, `result`, `shift`, `size`, `some`, `sortedIndex`, `runInContext`,
	     * `template`, `unescape`, `uniqueId`, and `value`
	     *
	     * The wrapper functions `first` and `last` return wrapped values when `n` is
	     * provided, otherwise they return unwrapped values.
	     *
	     * Explicit chaining can be enabled by using the `_.chain` method.
	     *
	     * @name _
	     * @constructor
	     * @category Chaining
	     * @param {*} value The value to wrap in a `lodash` instance.
	     * @returns {Object} Returns a `lodash` instance.
	     * @example
	     *
	     * var wrapped = _([1, 2, 3]);
	     *
	     * // returns an unwrapped value
	     * wrapped.reduce(function(sum, num) {
	     *   return sum + num;
	     * });
	     * // => 6
	     *
	     * // returns a wrapped value
	     * var squares = wrapped.map(function(num) {
	     *   return num * num;
	     * });
	     *
	     * _.isArray(squares);
	     * // => false
	     *
	     * _.isArray(squares.value());
	     * // => true
	     */
	    function lodash(value) {
	      // don't wrap if already wrapped, even if wrapped by a different `lodash` constructor
	      return (value && typeof value == 'object' && !isArray(value) && hasOwnProperty.call(value, '__wrapped__'))
	       ? value
	       : new lodashWrapper(value);
	    }
	
	    /**
	     * A fast path for creating `lodash` wrapper objects.
	     *
	     * @private
	     * @param {*} value The value to wrap in a `lodash` instance.
	     * @param {boolean} chainAll A flag to enable chaining for all methods
	     * @returns {Object} Returns a `lodash` instance.
	     */
	    function lodashWrapper(value, chainAll) {
	      this.__chain__ = !!chainAll;
	      this.__wrapped__ = value;
	    }
	    // ensure `new lodashWrapper` is an instance of `lodash`
	    lodashWrapper.prototype = lodash.prototype;
	
	    /**
	     * An object used to flag environments features.
	     *
	     * @static
	     * @memberOf _
	     * @type Object
	     */
	    var support = lodash.support = {};
	
	    (function() {
	      var ctor = function() { this.x = 1; },
	          object = { '0': 1, 'length': 1 },
	          props = [];
	
	      ctor.prototype = { 'valueOf': 1, 'y': 1 };
	      for (var key in new ctor) { props.push(key); }
	      for (key in arguments) { }
	
	      /**
	       * Detect if an `arguments` object's [[Class]] is resolvable (all but Firefox < 4, IE < 9).
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.argsClass = toString.call(arguments) == argsClass;
	
	      /**
	       * Detect if `arguments` objects are `Object` objects (all but Narwhal and Opera < 10.5).
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.argsObject = arguments.constructor == Object && !(arguments instanceof Array);
	
	      /**
	       * Detect if `name` or `message` properties of `Error.prototype` are
	       * enumerable by default. (IE < 9, Safari < 5.1)
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.enumErrorProps = propertyIsEnumerable.call(errorProto, 'message') || propertyIsEnumerable.call(errorProto, 'name');
	
	      /**
	       * Detect if `prototype` properties are enumerable by default.
	       *
	       * Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1
	       * (if the prototype or a property on the prototype has been set)
	       * incorrectly sets a function's `prototype` property [[Enumerable]]
	       * value to `true`.
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.enumPrototypes = propertyIsEnumerable.call(ctor, 'prototype');
	
	      /**
	       * Detect if functions can be decompiled by `Function#toString`
	       * (all but PS3 and older Opera mobile browsers & avoided in Windows 8 apps).
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.funcDecomp = !isNative(context.WinRTError) && reThis.test(runInContext);
	
	      /**
	       * Detect if `Function#name` is supported (all but IE).
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.funcNames = typeof Function.name == 'string';
	
	      /**
	       * Detect if `arguments` object indexes are non-enumerable
	       * (Firefox < 4, IE < 9, PhantomJS, Safari < 5.1).
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.nonEnumArgs = key != 0;
	
	      /**
	       * Detect if properties shadowing those on `Object.prototype` are non-enumerable.
	       *
	       * In IE < 9 an objects own properties, shadowing non-enumerable ones, are
	       * made non-enumerable as well (a.k.a the JScript [[DontEnum]] bug).
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.nonEnumShadows = !/valueOf/.test(props);
	
	      /**
	       * Detect if own properties are iterated after inherited properties (all but IE < 9).
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.ownLast = props[0] != 'x';
	
	      /**
	       * Detect if `Array#shift` and `Array#splice` augment array-like objects correctly.
	       *
	       * Firefox < 10, IE compatibility mode, and IE < 9 have buggy Array `shift()`
	       * and `splice()` functions that fail to remove the last element, `value[0]`,
	       * of array-like objects even though the `length` property is set to `0`.
	       * The `shift()` method is buggy in IE 8 compatibility mode, while `splice()`
	       * is buggy regardless of mode in IE < 9 and buggy in compatibility mode in IE 9.
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.spliceObjects = (arrayRef.splice.call(object, 0, 1), !object[0]);
	
	      /**
	       * Detect lack of support for accessing string characters by index.
	       *
	       * IE < 8 can't access characters by index and IE 8 can only access
	       * characters by index on string literals.
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.unindexedChars = ('x'[0] + Object('x')[0]) != 'xx';
	
	      /**
	       * Detect if a DOM node's [[Class]] is resolvable (all but IE < 9)
	       * and that the JS engine errors when attempting to coerce an object to
	       * a string without a `toString` function.
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      try {
	        support.nodeClass = !(toString.call(document) == objectClass && !({ 'toString': 0 } + ''));
	      } catch(e) {
	        support.nodeClass = true;
	      }
	    }(1));
	
	    /**
	     * By default, the template delimiters used by Lo-Dash are similar to those in
	     * embedded Ruby (ERB). Change the following template settings to use alternative
	     * delimiters.
	     *
	     * @static
	     * @memberOf _
	     * @type Object
	     */
	    lodash.templateSettings = {
	
	      /**
	       * Used to detect `data` property values to be HTML-escaped.
	       *
	       * @memberOf _.templateSettings
	       * @type RegExp
	       */
	      'escape': /<%-([\s\S]+?)%>/g,
	
	      /**
	       * Used to detect code to be evaluated.
	       *
	       * @memberOf _.templateSettings
	       * @type RegExp
	       */
	      'evaluate': /<%([\s\S]+?)%>/g,
	
	      /**
	       * Used to detect `data` property values to inject.
	       *
	       * @memberOf _.templateSettings
	       * @type RegExp
	       */
	      'interpolate': reInterpolate,
	
	      /**
	       * Used to reference the data object in the template text.
	       *
	       * @memberOf _.templateSettings
	       * @type string
	       */
	      'variable': '',
	
	      /**
	       * Used to import variables into the compiled template.
	       *
	       * @memberOf _.templateSettings
	       * @type Object
	       */
	      'imports': {
	
	        /**
	         * A reference to the `lodash` function.
	         *
	         * @memberOf _.templateSettings.imports
	         * @type Function
	         */
	        '_': lodash
	      }
	    };
	
	    /*--------------------------------------------------------------------------*/
	
	    /**
	     * The template used to create iterator functions.
	     *
	     * @private
	     * @param {Object} data The data object used to populate the text.
	     * @returns {string} Returns the interpolated text.
	     */
	    var iteratorTemplate = function(obj) {
	
	      var __p = 'var index, iterable = ' +
	      (obj.firstArg) +
	      ', result = ' +
	      (obj.init) +
	      ';\nif (!iterable) return result;\n' +
	      (obj.top) +
	      ';';
	       if (obj.array) {
	      __p += '\nvar length = iterable.length; index = -1;\nif (' +
	      (obj.array) +
	      ') {  ';
	       if (support.unindexedChars) {
	      __p += '\n  if (isString(iterable)) {\n    iterable = iterable.split(\'\')\n  }  ';
	       }
	      __p += '\n  while (++index < length) {\n    ' +
	      (obj.loop) +
	      ';\n  }\n}\nelse {  ';
	       } else if (support.nonEnumArgs) {
	      __p += '\n  var length = iterable.length; index = -1;\n  if (length && isArguments(iterable)) {\n    while (++index < length) {\n      index += \'\';\n      ' +
	      (obj.loop) +
	      ';\n    }\n  } else {  ';
	       }
	
	       if (support.enumPrototypes) {
	      __p += '\n  var skipProto = typeof iterable == \'function\';\n  ';
	       }
	
	       if (support.enumErrorProps) {
	      __p += '\n  var skipErrorProps = iterable === errorProto || iterable instanceof Error;\n  ';
	       }
	
	          var conditions = [];    if (support.enumPrototypes) { conditions.push('!(skipProto && index == "prototype")'); }    if (support.enumErrorProps)  { conditions.push('!(skipErrorProps && (index == "message" || index == "name"))'); }
	
	       if (obj.useHas && obj.keys) {
	      __p += '\n  var ownIndex = -1,\n      ownProps = objectTypes[typeof iterable] && keys(iterable),\n      length = ownProps ? ownProps.length : 0;\n\n  while (++ownIndex < length) {\n    index = ownProps[ownIndex];\n';
	          if (conditions.length) {
	      __p += '    if (' +
	      (conditions.join(' && ')) +
	      ') {\n  ';
	       }
	      __p +=
	      (obj.loop) +
	      ';    ';
	       if (conditions.length) {
	      __p += '\n    }';
	       }
	      __p += '\n  }  ';
	       } else {
	      __p += '\n  for (index in iterable) {\n';
	          if (obj.useHas) { conditions.push("hasOwnProperty.call(iterable, index)"); }    if (conditions.length) {
	      __p += '    if (' +
	      (conditions.join(' && ')) +
	      ') {\n  ';
	       }
	      __p +=
	      (obj.loop) +
	      ';    ';
	       if (conditions.length) {
	      __p += '\n    }';
	       }
	      __p += '\n  }    ';
	       if (support.nonEnumShadows) {
	      __p += '\n\n  if (iterable !== objectProto) {\n    var ctor = iterable.constructor,\n        isProto = iterable === (ctor && ctor.prototype),\n        className = iterable === stringProto ? stringClass : iterable === errorProto ? errorClass : toString.call(iterable),\n        nonEnum = nonEnumProps[className];\n      ';
	       for (k = 0; k < 7; k++) {
	      __p += '\n    index = \'' +
	      (obj.shadowedProps[k]) +
	      '\';\n    if ((!(isProto && nonEnum[index]) && hasOwnProperty.call(iterable, index))';
	              if (!obj.useHas) {
	      __p += ' || (!nonEnum[index] && iterable[index] !== objectProto[index])';
	       }
	      __p += ') {\n      ' +
	      (obj.loop) +
	      ';\n    }      ';
	       }
	      __p += '\n  }    ';
	       }
	
	       }
	
	       if (obj.array || support.nonEnumArgs) {
	      __p += '\n}';
	       }
	      __p +=
	      (obj.bottom) +
	      ';\nreturn result';
	
	      return __p
	    };
	
	    /*--------------------------------------------------------------------------*/
	
	    /**
	     * The base implementation of `_.bind` that creates the bound function and
	     * sets its meta data.
	     *
	     * @private
	     * @param {Array} bindData The bind data array.
	     * @returns {Function} Returns the new bound function.
	     */
	    function baseBind(bindData) {
	      var func = bindData[0],
	          partialArgs = bindData[2],
	          thisArg = bindData[4];
	
	      function bound() {
	        // `Function#bind` spec
	        // http://es5.github.io/#x15.3.4.5
	        if (partialArgs) {
	          // avoid `arguments` object deoptimizations by using `slice` instead
	          // of `Array.prototype.slice.call` and not assigning `arguments` to a
	          // variable as a ternary expression
	          var args = slice(partialArgs);
	          push.apply(args, arguments);
	        }
	        // mimic the constructor's `return` behavior
	        // http://es5.github.io/#x13.2.2
	        if (this instanceof bound) {
	          // ensure `new bound` is an instance of `func`
	          var thisBinding = baseCreate(func.prototype),
	              result = func.apply(thisBinding, args || arguments);
	          return isObject(result) ? result : thisBinding;
	        }
	        return func.apply(thisArg, args || arguments);
	      }
	      setBindData(bound, bindData);
	      return bound;
	    }
	
	    /**
	     * The base implementation of `_.clone` without argument juggling or support
	     * for `thisArg` binding.
	     *
	     * @private
	     * @param {*} value The value to clone.
	     * @param {boolean} [isDeep=false] Specify a deep clone.
	     * @param {Function} [callback] The function to customize cloning values.
	     * @param {Array} [stackA=[]] Tracks traversed source objects.
	     * @param {Array} [stackB=[]] Associates clones with source counterparts.
	     * @returns {*} Returns the cloned value.
	     */
	    function baseClone(value, isDeep, callback, stackA, stackB) {
	      if (callback) {
	        var result = callback(value);
	        if (typeof result != 'undefined') {
	          return result;
	        }
	      }
	      // inspect [[Class]]
	      var isObj = isObject(value);
	      if (isObj) {
	        var className = toString.call(value);
	        if (!cloneableClasses[className] || (!support.nodeClass && isNode(value))) {
	          return value;
	        }
	        var ctor = ctorByClass[className];
	        switch (className) {
	          case boolClass:
	          case dateClass:
	            return new ctor(+value);
	
	          case numberClass:
	          case stringClass:
	            return new ctor(value);
	
	          case regexpClass:
	            result = ctor(value.source, reFlags.exec(value));
	            result.lastIndex = value.lastIndex;
	            return result;
	        }
	      } else {
	        return value;
	      }
	      var isArr = isArray(value);
	      if (isDeep) {
	        // check for circular references and return corresponding clone
	        var initedStack = !stackA;
	        stackA || (stackA = getArray());
	        stackB || (stackB = getArray());
	
	        var length = stackA.length;
	        while (length--) {
	          if (stackA[length] == value) {
	            return stackB[length];
	          }
	        }
	        result = isArr ? ctor(value.length) : {};
	      }
	      else {
	        result = isArr ? slice(value) : assign({}, value);
	      }
	      // add array properties assigned by `RegExp#exec`
	      if (isArr) {
	        if (hasOwnProperty.call(value, 'index')) {
	          result.index = value.index;
	        }
	        if (hasOwnProperty.call(value, 'input')) {
	          result.input = value.input;
	        }
	      }
	      // exit for shallow clone
	      if (!isDeep) {
	        return result;
	      }
	      // add the source value to the stack of traversed objects
	      // and associate it with its clone
	      stackA.push(value);
	      stackB.push(result);
	
	      // recursively populate clone (susceptible to call stack limits)
	      (isArr ? baseEach : forOwn)(value, function(objValue, key) {
	        result[key] = baseClone(objValue, isDeep, callback, stackA, stackB);
	      });
	
	      if (initedStack) {
	        releaseArray(stackA);
	        releaseArray(stackB);
	      }
	      return result;
	    }
	
	    /**
	     * The base implementation of `_.create` without support for assigning
	     * properties to the created object.
	     *
	     * @private
	     * @param {Object} prototype The object to inherit from.
	     * @returns {Object} Returns the new object.
	     */
	    function baseCreate(prototype, properties) {
	      return isObject(prototype) ? nativeCreate(prototype) : {};
	    }
	    // fallback for browsers without `Object.create`
	    if (!nativeCreate) {
	      baseCreate = (function() {
	        function Object() {}
	        return function(prototype) {
	          if (isObject(prototype)) {
	            Object.prototype = prototype;
	            var result = new Object;
	            Object.prototype = null;
	          }
	          return result || context.Object();
	        };
	      }());
	    }
	
	    /**
	     * The base implementation of `_.createCallback` without support for creating
	     * "_.pluck" or "_.where" style callbacks.
	     *
	     * @private
	     * @param {*} [func=identity] The value to convert to a callback.
	     * @param {*} [thisArg] The `this` binding of the created callback.
	     * @param {number} [argCount] The number of arguments the callback accepts.
	     * @returns {Function} Returns a callback function.
	     */
	    function baseCreateCallback(func, thisArg, argCount) {
	      if (typeof func != 'function') {
	        return identity;
	      }
	      // exit early for no `thisArg` or already bound by `Function#bind`
	      if (typeof thisArg == 'undefined' || !('prototype' in func)) {
	        return func;
	      }
	      var bindData = func.__bindData__;
	      if (typeof bindData == 'undefined') {
	        if (support.funcNames) {
	          bindData = !func.name;
	        }
	        bindData = bindData || !support.funcDecomp;
	        if (!bindData) {
	          var source = fnToString.call(func);
	          if (!support.funcNames) {
	            bindData = !reFuncName.test(source);
	          }
	          if (!bindData) {
	            // checks if `func` references the `this` keyword and stores the result
	            bindData = reThis.test(source);
	            setBindData(func, bindData);
	          }
	        }
	      }
	      // exit early if there are no `this` references or `func` is bound
	      if (bindData === false || (bindData !== true && bindData[1] & 1)) {
	        return func;
	      }
	      switch (argCount) {
	        case 1: return function(value) {
	          return func.call(thisArg, value);
	        };
	        case 2: return function(a, b) {
	          return func.call(thisArg, a, b);
	        };
	        case 3: return function(value, index, collection) {
	          return func.call(thisArg, value, index, collection);
	        };
	        case 4: return function(accumulator, value, index, collection) {
	          return func.call(thisArg, accumulator, value, index, collection);
	        };
	      }
	      return bind(func, thisArg);
	    }
	
	    /**
	     * The base implementation of `createWrapper` that creates the wrapper and
	     * sets its meta data.
	     *
	     * @private
	     * @param {Array} bindData The bind data array.
	     * @returns {Function} Returns the new function.
	     */
	    function baseCreateWrapper(bindData) {
	      var func = bindData[0],
	          bitmask = bindData[1],
	          partialArgs = bindData[2],
	          partialRightArgs = bindData[3],
	          thisArg = bindData[4],
	          arity = bindData[5];
	
	      var isBind = bitmask & 1,
	          isBindKey = bitmask & 2,
	          isCurry = bitmask & 4,
	          isCurryBound = bitmask & 8,
	          key = func;
	
	      function bound() {
	        var thisBinding = isBind ? thisArg : this;
	        if (partialArgs) {
	          var args = slice(partialArgs);
	          push.apply(args, arguments);
	        }
	        if (partialRightArgs || isCurry) {
	          args || (args = slice(arguments));
	          if (partialRightArgs) {
	            push.apply(args, partialRightArgs);
	          }
	          if (isCurry && args.length < arity) {
	            bitmask |= 16 & ~32;
	            return baseCreateWrapper([func, (isCurryBound ? bitmask : bitmask & ~3), args, null, thisArg, arity]);
	          }
	        }
	        args || (args = arguments);
	        if (isBindKey) {
	          func = thisBinding[key];
	        }
	        if (this instanceof bound) {
	          thisBinding = baseCreate(func.prototype);
	          var result = func.apply(thisBinding, args);
	          return isObject(result) ? result : thisBinding;
	        }
	        return func.apply(thisBinding, args);
	      }
	      setBindData(bound, bindData);
	      return bound;
	    }
	
	    /**
	     * The base implementation of `_.difference` that accepts a single array
	     * of values to exclude.
	     *
	     * @private
	     * @param {Array} array The array to process.
	     * @param {Array} [values] The array of values to exclude.
	     * @returns {Array} Returns a new array of filtered values.
	     */
	    function baseDifference(array, values) {
	      var index = -1,
	          indexOf = getIndexOf(),
	          length = array ? array.length : 0,
	          isLarge = length >= largeArraySize && indexOf === baseIndexOf,
	          result = [];
	
	      if (isLarge) {
	        var cache = createCache(values);
	        if (cache) {
	          indexOf = cacheIndexOf;
	          values = cache;
	        } else {
	          isLarge = false;
	        }
	      }
	      while (++index < length) {
	        var value = array[index];
	        if (indexOf(values, value) < 0) {
	          result.push(value);
	        }
	      }
	      if (isLarge) {
	        releaseObject(values);
	      }
	      return result;
	    }
	
	    /**
	     * The base implementation of `_.flatten` without support for callback
	     * shorthands or `thisArg` binding.
	     *
	     * @private
	     * @param {Array} array The array to flatten.
	     * @param {boolean} [isShallow=false] A flag to restrict flattening to a single level.
	     * @param {boolean} [isStrict=false] A flag to restrict flattening to arrays and `arguments` objects.
	     * @param {number} [fromIndex=0] The index to start from.
	     * @returns {Array} Returns a new flattened array.
	     */
	    function baseFlatten(array, isShallow, isStrict, fromIndex) {
	      var index = (fromIndex || 0) - 1,
	          length = array ? array.length : 0,
	          result = [];
	
	      while (++index < length) {
	        var value = array[index];
	
	        if (value && typeof value == 'object' && typeof value.length == 'number'
	            && (isArray(value) || isArguments(value))) {
	          // recursively flatten arrays (susceptible to call stack limits)
	          if (!isShallow) {
	            value = baseFlatten(value, isShallow, isStrict);
	          }
	          var valIndex = -1,
	              valLength = value.length,
	              resIndex = result.length;
	
	          result.length += valLength;
	          while (++valIndex < valLength) {
	            result[resIndex++] = value[valIndex];
	          }
	        } else if (!isStrict) {
	          result.push(value);
	        }
	      }
	      return result;
	    }
	
	    /**
	     * The base implementation of `_.isEqual`, without support for `thisArg` binding,
	     * that allows partial "_.where" style comparisons.
	     *
	     * @private
	     * @param {*} a The value to compare.
	     * @param {*} b The other value to compare.
	     * @param {Function} [callback] The function to customize comparing values.
	     * @param {Function} [isWhere=false] A flag to indicate performing partial comparisons.
	     * @param {Array} [stackA=[]] Tracks traversed `a` objects.
	     * @param {Array} [stackB=[]] Tracks traversed `b` objects.
	     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	     */
	    function baseIsEqual(a, b, callback, isWhere, stackA, stackB) {
	      // used to indicate that when comparing objects, `a` has at least the properties of `b`
	      if (callback) {
	        var result = callback(a, b);
	        if (typeof result != 'undefined') {
	          return !!result;
	        }
	      }
	      // exit early for identical values
	      if (a === b) {
	        // treat `+0` vs. `-0` as not equal
	        return a !== 0 || (1 / a == 1 / b);
	      }
	      var type = typeof a,
	          otherType = typeof b;
	
	      // exit early for unlike primitive values
	      if (a === a &&
	          !(a && objectTypes[type]) &&
	          !(b && objectTypes[otherType])) {
	        return false;
	      }
	      // exit early for `null` and `undefined` avoiding ES3's Function#call behavior
	      // http://es5.github.io/#x15.3.4.4
	      if (a == null || b == null) {
	        return a === b;
	      }
	      // compare [[Class]] names
	      var className = toString.call(a),
	          otherClass = toString.call(b);
	
	      if (className == argsClass) {
	        className = objectClass;
	      }
	      if (otherClass == argsClass) {
	        otherClass = objectClass;
	      }
	      if (className != otherClass) {
	        return false;
	      }
	      switch (className) {
	        case boolClass:
	        case dateClass:
	          // coerce dates and booleans to numbers, dates to milliseconds and booleans
	          // to `1` or `0` treating invalid dates coerced to `NaN` as not equal
	          return +a == +b;
	
	        case numberClass:
	          // treat `NaN` vs. `NaN` as equal
	          return (a != +a)
	            ? b != +b
	            // but treat `+0` vs. `-0` as not equal
	            : (a == 0 ? (1 / a == 1 / b) : a == +b);
	
	        case regexpClass:
	        case stringClass:
	          // coerce regexes to strings (http://es5.github.io/#x15.10.6.4)
	          // treat string primitives and their corresponding object instances as equal
	          return a == String(b);
	      }
	      var isArr = className == arrayClass;
	      if (!isArr) {
	        // unwrap any `lodash` wrapped values
	        var aWrapped = hasOwnProperty.call(a, '__wrapped__'),
	            bWrapped = hasOwnProperty.call(b, '__wrapped__');
	
	        if (aWrapped || bWrapped) {
	          return baseIsEqual(aWrapped ? a.__wrapped__ : a, bWrapped ? b.__wrapped__ : b, callback, isWhere, stackA, stackB);
	        }
	        // exit for functions and DOM nodes
	        if (className != objectClass || (!support.nodeClass && (isNode(a) || isNode(b)))) {
	          return false;
	        }
	        // in older versions of Opera, `arguments` objects have `Array` constructors
	        var ctorA = !support.argsObject && isArguments(a) ? Object : a.constructor,
	            ctorB = !support.argsObject && isArguments(b) ? Object : b.constructor;
	
	        // non `Object` object instances with different constructors are not equal
	        if (ctorA != ctorB &&
	              !(isFunction(ctorA) && ctorA instanceof ctorA && isFunction(ctorB) && ctorB instanceof ctorB) &&
	              ('constructor' in a && 'constructor' in b)
	            ) {
	          return false;
	        }
	      }
	      // assume cyclic structures are equal
	      // the algorithm for detecting cyclic structures is adapted from ES 5.1
	      // section 15.12.3, abstract operation `JO` (http://es5.github.io/#x15.12.3)
	      var initedStack = !stackA;
	      stackA || (stackA = getArray());
	      stackB || (stackB = getArray());
	
	      var length = stackA.length;
	      while (length--) {
	        if (stackA[length] == a) {
	          return stackB[length] == b;
	        }
	      }
	      var size = 0;
	      result = true;
	
	      // add `a` and `b` to the stack of traversed objects
	      stackA.push(a);
	      stackB.push(b);
	
	      // recursively compare objects and arrays (susceptible to call stack limits)
	      if (isArr) {
	        // compare lengths to determine if a deep comparison is necessary
	        length = a.length;
	        size = b.length;
	        result = size == length;
	
	        if (result || isWhere) {
	          // deep compare the contents, ignoring non-numeric properties
	          while (size--) {
	            var index = length,
	                value = b[size];
	
	            if (isWhere) {
	              while (index--) {
	                if ((result = baseIsEqual(a[index], value, callback, isWhere, stackA, stackB))) {
	                  break;
	                }
	              }
	            } else if (!(result = baseIsEqual(a[size], value, callback, isWhere, stackA, stackB))) {
	              break;
	            }
	          }
	        }
	      }
	      else {
	        // deep compare objects using `forIn`, instead of `forOwn`, to avoid `Object.keys`
	        // which, in this case, is more costly
	        forIn(b, function(value, key, b) {
	          if (hasOwnProperty.call(b, key)) {
	            // count the number of properties.
	            size++;
	            // deep compare each property value.
	            return (result = hasOwnProperty.call(a, key) && baseIsEqual(a[key], value, callback, isWhere, stackA, stackB));
	          }
	        });
	
	        if (result && !isWhere) {
	          // ensure both objects have the same number of properties
	          forIn(a, function(value, key, a) {
	            if (hasOwnProperty.call(a, key)) {
	              // `size` will be `-1` if `a` has more properties than `b`
	              return (result = --size > -1);
	            }
	          });
	        }
	      }
	      stackA.pop();
	      stackB.pop();
	
	      if (initedStack) {
	        releaseArray(stackA);
	        releaseArray(stackB);
	      }
	      return result;
	    }
	
	    /**
	     * The base implementation of `_.merge` without argument juggling or support
	     * for `thisArg` binding.
	     *
	     * @private
	     * @param {Object} object The destination object.
	     * @param {Object} source The source object.
	     * @param {Function} [callback] The function to customize merging properties.
	     * @param {Array} [stackA=[]] Tracks traversed source objects.
	     * @param {Array} [stackB=[]] Associates values with source counterparts.
	     */
	    function baseMerge(object, source, callback, stackA, stackB) {
	      (isArray(source) ? forEach : forOwn)(source, function(source, key) {
	        var found,
	            isArr,
	            result = source,
	            value = object[key];
	
	        if (source && ((isArr = isArray(source)) || isPlainObject(source))) {
	          // avoid merging previously merged cyclic sources
	          var stackLength = stackA.length;
	          while (stackLength--) {
	            if ((found = stackA[stackLength] == source)) {
	              value = stackB[stackLength];
	              break;
	            }
	          }
	          if (!found) {
	            var isShallow;
	            if (callback) {
	              result = callback(value, source);
	              if ((isShallow = typeof result != 'undefined')) {
	                value = result;
	              }
	            }
	            if (!isShallow) {
	              value = isArr
	                ? (isArray(value) ? value : [])
	                : (isPlainObject(value) ? value : {});
	            }
	            // add `source` and associated `value` to the stack of traversed objects
	            stackA.push(source);
	            stackB.push(value);
	
	            // recursively merge objects and arrays (susceptible to call stack limits)
	            if (!isShallow) {
	              baseMerge(value, source, callback, stackA, stackB);
	            }
	          }
	        }
	        else {
	          if (callback) {
	            result = callback(value, source);
	            if (typeof result == 'undefined') {
	              result = source;
	            }
	          }
	          if (typeof result != 'undefined') {
	            value = result;
	          }
	        }
	        object[key] = value;
	      });
	    }
	
	    /**
	     * The base implementation of `_.random` without argument juggling or support
	     * for returning floating-point numbers.
	     *
	     * @private
	     * @param {number} min The minimum possible value.
	     * @param {number} max The maximum possible value.
	     * @returns {number} Returns a random number.
	     */
	    function baseRandom(min, max) {
	      return min + floor(nativeRandom() * (max - min + 1));
	    }
	
	    /**
	     * The base implementation of `_.uniq` without support for callback shorthands
	     * or `thisArg` binding.
	     *
	     * @private
	     * @param {Array} array The array to process.
	     * @param {boolean} [isSorted=false] A flag to indicate that `array` is sorted.
	     * @param {Function} [callback] The function called per iteration.
	     * @returns {Array} Returns a duplicate-value-free array.
	     */
	    function baseUniq(array, isSorted, callback) {
	      var index = -1,
	          indexOf = getIndexOf(),
	          length = array ? array.length : 0,
	          result = [];
	
	      var isLarge = !isSorted && length >= largeArraySize && indexOf === baseIndexOf,
	          seen = (callback || isLarge) ? getArray() : result;
	
	      if (isLarge) {
	        var cache = createCache(seen);
	        indexOf = cacheIndexOf;
	        seen = cache;
	      }
	      while (++index < length) {
	        var value = array[index],
	            computed = callback ? callback(value, index, array) : value;
	
	        if (isSorted
	              ? !index || seen[seen.length - 1] !== computed
	              : indexOf(seen, computed) < 0
	            ) {
	          if (callback || isLarge) {
	            seen.push(computed);
	          }
	          result.push(value);
	        }
	      }
	      if (isLarge) {
	        releaseArray(seen.array);
	        releaseObject(seen);
	      } else if (callback) {
	        releaseArray(seen);
	      }
	      return result;
	    }
	
	    /**
	     * Creates a function that aggregates a collection, creating an object composed
	     * of keys generated from the results of running each element of the collection
	     * through a callback. The given `setter` function sets the keys and values
	     * of the composed object.
	     *
	     * @private
	     * @param {Function} setter The setter function.
	     * @returns {Function} Returns the new aggregator function.
	     */
	    function createAggregator(setter) {
	      return function(collection, callback, thisArg) {
	        var result = {};
	        callback = lodash.createCallback(callback, thisArg, 3);
	
	        if (isArray(collection)) {
	          var index = -1,
	              length = collection.length;
	
	          while (++index < length) {
	            var value = collection[index];
	            setter(result, value, callback(value, index, collection), collection);
	          }
	        } else {
	          baseEach(collection, function(value, key, collection) {
	            setter(result, value, callback(value, key, collection), collection);
	          });
	        }
	        return result;
	      };
	    }
	
	    /**
	     * Creates a function that, when called, either curries or invokes `func`
	     * with an optional `this` binding and partially applied arguments.
	     *
	     * @private
	     * @param {Function|string} func The function or method name to reference.
	     * @param {number} bitmask The bitmask of method flags to compose.
	     *  The bitmask may be composed of the following flags:
	     *  1 - `_.bind`
	     *  2 - `_.bindKey`
	     *  4 - `_.curry`
	     *  8 - `_.curry` (bound)
	     *  16 - `_.partial`
	     *  32 - `_.partialRight`
	     * @param {Array} [partialArgs] An array of arguments to prepend to those
	     *  provided to the new function.
	     * @param {Array} [partialRightArgs] An array of arguments to append to those
	     *  provided to the new function.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param {number} [arity] The arity of `func`.
	     * @returns {Function} Returns the new function.
	     */
	    function createWrapper(func, bitmask, partialArgs, partialRightArgs, thisArg, arity) {
	      var isBind = bitmask & 1,
	          isBindKey = bitmask & 2,
	          isCurry = bitmask & 4,
	          isCurryBound = bitmask & 8,
	          isPartial = bitmask & 16,
	          isPartialRight = bitmask & 32;
	
	      if (!isBindKey && !isFunction(func)) {
	        throw new TypeError;
	      }
	      if (isPartial && !partialArgs.length) {
	        bitmask &= ~16;
	        isPartial = partialArgs = false;
	      }
	      if (isPartialRight && !partialRightArgs.length) {
	        bitmask &= ~32;
	        isPartialRight = partialRightArgs = false;
	      }
	      var bindData = func && func.__bindData__;
	      if (bindData && bindData !== true) {
	        // clone `bindData`
	        bindData = slice(bindData);
	        if (bindData[2]) {
	          bindData[2] = slice(bindData[2]);
	        }
	        if (bindData[3]) {
	          bindData[3] = slice(bindData[3]);
	        }
	        // set `thisBinding` is not previously bound
	        if (isBind && !(bindData[1] & 1)) {
	          bindData[4] = thisArg;
	        }
	        // set if previously bound but not currently (subsequent curried functions)
	        if (!isBind && bindData[1] & 1) {
	          bitmask |= 8;
	        }
	        // set curried arity if not yet set
	        if (isCurry && !(bindData[1] & 4)) {
	          bindData[5] = arity;
	        }
	        // append partial left arguments
	        if (isPartial) {
	          push.apply(bindData[2] || (bindData[2] = []), partialArgs);
	        }
	        // append partial right arguments
	        if (isPartialRight) {
	          unshift.apply(bindData[3] || (bindData[3] = []), partialRightArgs);
	        }
	        // merge flags
	        bindData[1] |= bitmask;
	        return createWrapper.apply(null, bindData);
	      }
	      // fast path for `_.bind`
	      var creater = (bitmask == 1 || bitmask === 17) ? baseBind : baseCreateWrapper;
	      return creater([func, bitmask, partialArgs, partialRightArgs, thisArg, arity]);
	    }
	
	    /**
	     * Creates compiled iteration functions.
	     *
	     * @private
	     * @param {...Object} [options] The compile options object(s).
	     * @param {string} [options.array] Code to determine if the iterable is an array or array-like.
	     * @param {boolean} [options.useHas] Specify using `hasOwnProperty` checks in the object loop.
	     * @param {Function} [options.keys] A reference to `_.keys` for use in own property iteration.
	     * @param {string} [options.args] A comma separated string of iteration function arguments.
	     * @param {string} [options.top] Code to execute before the iteration branches.
	     * @param {string} [options.loop] Code to execute in the object loop.
	     * @param {string} [options.bottom] Code to execute after the iteration branches.
	     * @returns {Function} Returns the compiled function.
	     */
	    function createIterator() {
	      // data properties
	      iteratorData.shadowedProps = shadowedProps;
	
	      // iterator options
	      iteratorData.array = iteratorData.bottom = iteratorData.loop = iteratorData.top = '';
	      iteratorData.init = 'iterable';
	      iteratorData.useHas = true;
	
	      // merge options into a template data object
	      for (var object, index = 0; object = arguments[index]; index++) {
	        for (var key in object) {
	          iteratorData[key] = object[key];
	        }
	      }
	      var args = iteratorData.args;
	      iteratorData.firstArg = /^[^,]+/.exec(args)[0];
	
	      // create the function factory
	      var factory = Function(
	          'baseCreateCallback, errorClass, errorProto, hasOwnProperty, ' +
	          'indicatorObject, isArguments, isArray, isString, keys, objectProto, ' +
	          'objectTypes, nonEnumProps, stringClass, stringProto, toString',
	        'return function(' + args + ') {\n' + iteratorTemplate(iteratorData) + '\n}'
	      );
	
	      // return the compiled function
	      return factory(
	        baseCreateCallback, errorClass, errorProto, hasOwnProperty,
	        indicatorObject, isArguments, isArray, isString, iteratorData.keys, objectProto,
	        objectTypes, nonEnumProps, stringClass, stringProto, toString
	      );
	    }
	
	    /**
	     * Used by `escape` to convert characters to HTML entities.
	     *
	     * @private
	     * @param {string} match The matched character to escape.
	     * @returns {string} Returns the escaped character.
	     */
	    function escapeHtmlChar(match) {
	      return htmlEscapes[match];
	    }
	
	    /**
	     * Gets the appropriate "indexOf" function. If the `_.indexOf` method is
	     * customized, this method returns the custom method, otherwise it returns
	     * the `baseIndexOf` function.
	     *
	     * @private
	     * @returns {Function} Returns the "indexOf" function.
	     */
	    function getIndexOf() {
	      var result = (result = lodash.indexOf) === indexOf ? baseIndexOf : result;
	      return result;
	    }
	
	    /**
	     * Checks if `value` is a native function.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is a native function, else `false`.
	     */
	    function isNative(value) {
	      return typeof value == 'function' && reNative.test(value);
	    }
	
	    /**
	     * Sets `this` binding data on a given function.
	     *
	     * @private
	     * @param {Function} func The function to set data on.
	     * @param {Array} value The data array to set.
	     */
	    var setBindData = !defineProperty ? noop : function(func, value) {
	      descriptor.value = value;
	      defineProperty(func, '__bindData__', descriptor);
	      descriptor.value = null;
	    };
	
	    /**
	     * A fallback implementation of `isPlainObject` which checks if a given value
	     * is an object created by the `Object` constructor, assuming objects created
	     * by the `Object` constructor have no inherited enumerable properties and that
	     * there are no `Object.prototype` extensions.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	     */
	    function shimIsPlainObject(value) {
	      var ctor,
	          result;
	
	      // avoid non Object objects, `arguments` objects, and DOM elements
	      if (!(value && toString.call(value) == objectClass) ||
	          (ctor = value.constructor, isFunction(ctor) && !(ctor instanceof ctor)) ||
	          (!support.argsClass && isArguments(value)) ||
	          (!support.nodeClass && isNode(value))) {
	        return false;
	      }
	      // IE < 9 iterates inherited properties before own properties. If the first
	      // iterated property is an object's own property then there are no inherited
	      // enumerable properties.
	      if (support.ownLast) {
	        forIn(value, function(value, key, object) {
	          result = hasOwnProperty.call(object, key);
	          return false;
	        });
	        return result !== false;
	      }
	      // In most environments an object's own properties are iterated before
	      // its inherited properties. If the last iterated property is an object's
	      // own property then there are no inherited enumerable properties.
	      forIn(value, function(value, key) {
	        result = key;
	      });
	      return typeof result == 'undefined' || hasOwnProperty.call(value, result);
	    }
	
	    /**
	     * Used by `unescape` to convert HTML entities to characters.
	     *
	     * @private
	     * @param {string} match The matched character to unescape.
	     * @returns {string} Returns the unescaped character.
	     */
	    function unescapeHtmlChar(match) {
	      return htmlUnescapes[match];
	    }
	
	    /*--------------------------------------------------------------------------*/
	
	    /**
	     * Checks if `value` is an `arguments` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is an `arguments` object, else `false`.
	     * @example
	     *
	     * (function() { return _.isArguments(arguments); })(1, 2, 3);
	     * // => true
	     *
	     * _.isArguments([1, 2, 3]);
	     * // => false
	     */
	    function isArguments(value) {
	      return value && typeof value == 'object' && typeof value.length == 'number' &&
	        toString.call(value) == argsClass || false;
	    }
	    // fallback for browsers that can't detect `arguments` objects by [[Class]]
	    if (!support.argsClass) {
	      isArguments = function(value) {
	        return value && typeof value == 'object' && typeof value.length == 'number' &&
	          hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee') || false;
	      };
	    }
	
	    /**
	     * Checks if `value` is an array.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is an array, else `false`.
	     * @example
	     *
	     * (function() { return _.isArray(arguments); })();
	     * // => false
	     *
	     * _.isArray([1, 2, 3]);
	     * // => true
	     */
	    var isArray = nativeIsArray || function(value) {
	      return value && typeof value == 'object' && typeof value.length == 'number' &&
	        toString.call(value) == arrayClass || false;
	    };
	
	    /**
	     * A fallback implementation of `Object.keys` which produces an array of the
	     * given object's own enumerable property names.
	     *
	     * @private
	     * @type Function
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns an array of property names.
	     */
	    var shimKeys = createIterator({
	      'args': 'object',
	      'init': '[]',
	      'top': 'if (!(objectTypes[typeof object])) return result',
	      'loop': 'result.push(index)'
	    });
	
	    /**
	     * Creates an array composed of the own enumerable property names of an object.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns an array of property names.
	     * @example
	     *
	     * _.keys({ 'one': 1, 'two': 2, 'three': 3 });
	     * // => ['one', 'two', 'three'] (property order is not guaranteed across environments)
	     */
	    var keys = !nativeKeys ? shimKeys : function(object) {
	      if (!isObject(object)) {
	        return [];
	      }
	      if ((support.enumPrototypes && typeof object == 'function') ||
	          (support.nonEnumArgs && object.length && isArguments(object))) {
	        return shimKeys(object);
	      }
	      return nativeKeys(object);
	    };
	
	    /** Reusable iterator options shared by `each`, `forIn`, and `forOwn` */
	    var eachIteratorOptions = {
	      'args': 'collection, callback, thisArg',
	      'top': "callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3)",
	      'array': "typeof length == 'number'",
	      'keys': keys,
	      'loop': 'if (callback(iterable[index], index, collection) === false) return result'
	    };
	
	    /** Reusable iterator options for `assign` and `defaults` */
	    var defaultsIteratorOptions = {
	      'args': 'object, source, guard',
	      'top':
	        'var args = arguments,\n' +
	        '    argsIndex = 0,\n' +
	        "    argsLength = typeof guard == 'number' ? 2 : args.length;\n" +
	        'while (++argsIndex < argsLength) {\n' +
	        '  iterable = args[argsIndex];\n' +
	        '  if (iterable && objectTypes[typeof iterable]) {',
	      'keys': keys,
	      'loop': "if (typeof result[index] == 'undefined') result[index] = iterable[index]",
	      'bottom': '  }\n}'
	    };
	
	    /** Reusable iterator options for `forIn` and `forOwn` */
	    var forOwnIteratorOptions = {
	      'top': 'if (!objectTypes[typeof iterable]) return result;\n' + eachIteratorOptions.top,
	      'array': false
	    };
	
	    /**
	     * Used to convert characters to HTML entities:
	     *
	     * Though the `>` character is escaped for symmetry, characters like `>` and `/`
	     * don't require escaping in HTML and have no special meaning unless they're part
	     * of a tag or an unquoted attribute value.
	     * http://mathiasbynens.be/notes/ambiguous-ampersands (under "semi-related fun fact")
	     */
	    var htmlEscapes = {
	      '&': '&amp;',
	      '<': '&lt;',
	      '>': '&gt;',
	      '"': '&quot;',
	      "'": '&#39;'
	    };
	
	    /** Used to convert HTML entities to characters */
	    var htmlUnescapes = invert(htmlEscapes);
	
	    /** Used to match HTML entities and HTML characters */
	    var reEscapedHtml = RegExp('(' + keys(htmlUnescapes).join('|') + ')', 'g'),
	        reUnescapedHtml = RegExp('[' + keys(htmlEscapes).join('') + ']', 'g');
	
	    /**
	     * A function compiled to iterate `arguments` objects, arrays, objects, and
	     * strings consistenly across environments, executing the callback for each
	     * element in the collection. The callback is bound to `thisArg` and invoked
	     * with three arguments; (value, index|key, collection). Callbacks may exit
	     * iteration early by explicitly returning `false`.
	     *
	     * @private
	     * @type Function
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array|Object|string} Returns `collection`.
	     */
	    var baseEach = createIterator(eachIteratorOptions);
	
	    /*--------------------------------------------------------------------------*/
	
	    /**
	     * Assigns own enumerable properties of source object(s) to the destination
	     * object. Subsequent sources will overwrite property assignments of previous
	     * sources. If a callback is provided it will be executed to produce the
	     * assigned values. The callback is bound to `thisArg` and invoked with two
	     * arguments; (objectValue, sourceValue).
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @alias extend
	     * @category Objects
	     * @param {Object} object The destination object.
	     * @param {...Object} [source] The source objects.
	     * @param {Function} [callback] The function to customize assigning values.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns the destination object.
	     * @example
	     *
	     * _.assign({ 'name': 'fred' }, { 'employer': 'slate' });
	     * // => { 'name': 'fred', 'employer': 'slate' }
	     *
	     * var defaults = _.partialRight(_.assign, function(a, b) {
	     *   return typeof a == 'undefined' ? b : a;
	     * });
	     *
	     * var object = { 'name': 'barney' };
	     * defaults(object, { 'name': 'fred', 'employer': 'slate' });
	     * // => { 'name': 'barney', 'employer': 'slate' }
	     */
	    var assign = createIterator(defaultsIteratorOptions, {
	      'top':
	        defaultsIteratorOptions.top.replace(';',
	          ';\n' +
	          "if (argsLength > 3 && typeof args[argsLength - 2] == 'function') {\n" +
	          '  var callback = baseCreateCallback(args[--argsLength - 1], args[argsLength--], 2);\n' +
	          "} else if (argsLength > 2 && typeof args[argsLength - 1] == 'function') {\n" +
	          '  callback = args[--argsLength];\n' +
	          '}'
	        ),
	      'loop': 'result[index] = callback ? callback(result[index], iterable[index]) : iterable[index]'
	    });
	
	    /**
	     * Creates a clone of `value`. If `isDeep` is `true` nested objects will also
	     * be cloned, otherwise they will be assigned by reference. If a callback
	     * is provided it will be executed to produce the cloned values. If the
	     * callback returns `undefined` cloning will be handled by the method instead.
	     * The callback is bound to `thisArg` and invoked with one argument; (value).
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to clone.
	     * @param {boolean} [isDeep=false] Specify a deep clone.
	     * @param {Function} [callback] The function to customize cloning values.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the cloned value.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * var shallow = _.clone(characters);
	     * shallow[0] === characters[0];
	     * // => true
	     *
	     * var deep = _.clone(characters, true);
	     * deep[0] === characters[0];
	     * // => false
	     *
	     * _.mixin({
	     *   'clone': _.partialRight(_.clone, function(value) {
	     *     return _.isElement(value) ? value.cloneNode(false) : undefined;
	     *   })
	     * });
	     *
	     * var clone = _.clone(document.body);
	     * clone.childNodes.length;
	     * // => 0
	     */
	    function clone(value, isDeep, callback, thisArg) {
	      // allows working with "Collections" methods without using their `index`
	      // and `collection` arguments for `isDeep` and `callback`
	      if (typeof isDeep != 'boolean' && isDeep != null) {
	        thisArg = callback;
	        callback = isDeep;
	        isDeep = false;
	      }
	      return baseClone(value, isDeep, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 1));
	    }
	
	    /**
	     * Creates a deep clone of `value`. If a callback is provided it will be
	     * executed to produce the cloned values. If the callback returns `undefined`
	     * cloning will be handled by the method instead. The callback is bound to
	     * `thisArg` and invoked with one argument; (value).
	     *
	     * Note: This method is loosely based on the structured clone algorithm. Functions
	     * and DOM nodes are **not** cloned. The enumerable properties of `arguments` objects and
	     * objects created by constructors other than `Object` are cloned to plain `Object` objects.
	     * See http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to deep clone.
	     * @param {Function} [callback] The function to customize cloning values.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the deep cloned value.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * var deep = _.cloneDeep(characters);
	     * deep[0] === characters[0];
	     * // => false
	     *
	     * var view = {
	     *   'label': 'docs',
	     *   'node': element
	     * };
	     *
	     * var clone = _.cloneDeep(view, function(value) {
	     *   return _.isElement(value) ? value.cloneNode(true) : undefined;
	     * });
	     *
	     * clone.node == view.node;
	     * // => false
	     */
	    function cloneDeep(value, callback, thisArg) {
	      return baseClone(value, true, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 1));
	    }
	
	    /**
	     * Creates an object that inherits from the given `prototype` object. If a
	     * `properties` object is provided its own enumerable properties are assigned
	     * to the created object.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} prototype The object to inherit from.
	     * @param {Object} [properties] The properties to assign to the object.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * function Shape() {
	     *   this.x = 0;
	     *   this.y = 0;
	     * }
	     *
	     * function Circle() {
	     *   Shape.call(this);
	     * }
	     *
	     * Circle.prototype = _.create(Shape.prototype, { 'constructor': Circle });
	     *
	     * var circle = new Circle;
	     * circle instanceof Circle;
	     * // => true
	     *
	     * circle instanceof Shape;
	     * // => true
	     */
	    function create(prototype, properties) {
	      var result = baseCreate(prototype);
	      return properties ? assign(result, properties) : result;
	    }
	
	    /**
	     * Assigns own enumerable properties of source object(s) to the destination
	     * object for all destination properties that resolve to `undefined`. Once a
	     * property is set, additional defaults of the same property will be ignored.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Objects
	     * @param {Object} object The destination object.
	     * @param {...Object} [source] The source objects.
	     * @param- {Object} [guard] Allows working with `_.reduce` without using its
	     *  `key` and `object` arguments as sources.
	     * @returns {Object} Returns the destination object.
	     * @example
	     *
	     * var object = { 'name': 'barney' };
	     * _.defaults(object, { 'name': 'fred', 'employer': 'slate' });
	     * // => { 'name': 'barney', 'employer': 'slate' }
	     */
	    var defaults = createIterator(defaultsIteratorOptions);
	
	    /**
	     * This method is like `_.findIndex` except that it returns the key of the
	     * first element that passes the callback check, instead of the element itself.
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to search.
	     * @param {Function|Object|string} [callback=identity] The function called per
	     *  iteration. If a property name or object is provided it will be used to
	     *  create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {string|undefined} Returns the key of the found element, else `undefined`.
	     * @example
	     *
	     * var characters = {
	     *   'barney': {  'age': 36, 'blocked': false },
	     *   'fred': {    'age': 40, 'blocked': true },
	     *   'pebbles': { 'age': 1,  'blocked': false }
	     * };
	     *
	     * _.findKey(characters, function(chr) {
	     *   return chr.age < 40;
	     * });
	     * // => 'barney' (property order is not guaranteed across environments)
	     *
	     * // using "_.where" callback shorthand
	     * _.findKey(characters, { 'age': 1 });
	     * // => 'pebbles'
	     *
	     * // using "_.pluck" callback shorthand
	     * _.findKey(characters, 'blocked');
	     * // => 'fred'
	     */
	    function findKey(object, callback, thisArg) {
	      var result;
	      callback = lodash.createCallback(callback, thisArg, 3);
	      forOwn(object, function(value, key, object) {
	        if (callback(value, key, object)) {
	          result = key;
	          return false;
	        }
	      });
	      return result;
	    }
	
	    /**
	     * This method is like `_.findKey` except that it iterates over elements
	     * of a `collection` in the opposite order.
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to search.
	     * @param {Function|Object|string} [callback=identity] The function called per
	     *  iteration. If a property name or object is provided it will be used to
	     *  create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {string|undefined} Returns the key of the found element, else `undefined`.
	     * @example
	     *
	     * var characters = {
	     *   'barney': {  'age': 36, 'blocked': true },
	     *   'fred': {    'age': 40, 'blocked': false },
	     *   'pebbles': { 'age': 1,  'blocked': true }
	     * };
	     *
	     * _.findLastKey(characters, function(chr) {
	     *   return chr.age < 40;
	     * });
	     * // => returns `pebbles`, assuming `_.findKey` returns `barney`
	     *
	     * // using "_.where" callback shorthand
	     * _.findLastKey(characters, { 'age': 40 });
	     * // => 'fred'
	     *
	     * // using "_.pluck" callback shorthand
	     * _.findLastKey(characters, 'blocked');
	     * // => 'pebbles'
	     */
	    function findLastKey(object, callback, thisArg) {
	      var result;
	      callback = lodash.createCallback(callback, thisArg, 3);
	      forOwnRight(object, function(value, key, object) {
	        if (callback(value, key, object)) {
	          result = key;
	          return false;
	        }
	      });
	      return result;
	    }
	
	    /**
	     * Iterates over own and inherited enumerable properties of an object,
	     * executing the callback for each property. The callback is bound to `thisArg`
	     * and invoked with three arguments; (value, key, object). Callbacks may exit
	     * iteration early by explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Objects
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * function Shape() {
	     *   this.x = 0;
	     *   this.y = 0;
	     * }
	     *
	     * Shape.prototype.move = function(x, y) {
	     *   this.x += x;
	     *   this.y += y;
	     * };
	     *
	     * _.forIn(new Shape, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'x', 'y', and 'move' (property order is not guaranteed across environments)
	     */
	    var forIn = createIterator(eachIteratorOptions, forOwnIteratorOptions, {
	      'useHas': false
	    });
	
	    /**
	     * This method is like `_.forIn` except that it iterates over elements
	     * of a `collection` in the opposite order.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * function Shape() {
	     *   this.x = 0;
	     *   this.y = 0;
	     * }
	     *
	     * Shape.prototype.move = function(x, y) {
	     *   this.x += x;
	     *   this.y += y;
	     * };
	     *
	     * _.forInRight(new Shape, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'move', 'y', and 'x' assuming `_.forIn ` logs 'x', 'y', and 'move'
	     */
	    function forInRight(object, callback, thisArg) {
	      var pairs = [];
	
	      forIn(object, function(value, key) {
	        pairs.push(key, value);
	      });
	
	      var length = pairs.length;
	      callback = baseCreateCallback(callback, thisArg, 3);
	      while (length--) {
	        if (callback(pairs[length--], pairs[length], object) === false) {
	          break;
	        }
	      }
	      return object;
	    }
	
	    /**
	     * Iterates over own enumerable properties of an object, executing the callback
	     * for each property. The callback is bound to `thisArg` and invoked with three
	     * arguments; (value, key, object). Callbacks may exit iteration early by
	     * explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Objects
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * _.forOwn({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
	     *   console.log(key);
	     * });
	     * // => logs '0', '1', and 'length' (property order is not guaranteed across environments)
	     */
	    var forOwn = createIterator(eachIteratorOptions, forOwnIteratorOptions);
	
	    /**
	     * This method is like `_.forOwn` except that it iterates over elements
	     * of a `collection` in the opposite order.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * _.forOwnRight({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'length', '1', and '0' assuming `_.forOwn` logs '0', '1', and 'length'
	     */
	    function forOwnRight(object, callback, thisArg) {
	      var props = keys(object),
	          length = props.length;
	
	      callback = baseCreateCallback(callback, thisArg, 3);
	      while (length--) {
	        var key = props[length];
	        if (callback(object[key], key, object) === false) {
	          break;
	        }
	      }
	      return object;
	    }
	
	    /**
	     * Creates a sorted array of property names of all enumerable properties,
	     * own and inherited, of `object` that have function values.
	     *
	     * @static
	     * @memberOf _
	     * @alias methods
	     * @category Objects
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns an array of property names that have function values.
	     * @example
	     *
	     * _.functions(_);
	     * // => ['all', 'any', 'bind', 'bindAll', 'clone', 'compact', 'compose', ...]
	     */
	    function functions(object) {
	      var result = [];
	      forIn(object, function(value, key) {
	        if (isFunction(value)) {
	          result.push(key);
	        }
	      });
	      return result.sort();
	    }
	
	    /**
	     * Checks if the specified property name exists as a direct property of `object`,
	     * instead of an inherited property.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to inspect.
	     * @param {string} key The name of the property to check.
	     * @returns {boolean} Returns `true` if key is a direct property, else `false`.
	     * @example
	     *
	     * _.has({ 'a': 1, 'b': 2, 'c': 3 }, 'b');
	     * // => true
	     */
	    function has(object, key) {
	      return object ? hasOwnProperty.call(object, key) : false;
	    }
	
	    /**
	     * Creates an object composed of the inverted keys and values of the given object.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to invert.
	     * @returns {Object} Returns the created inverted object.
	     * @example
	     *
	     * _.invert({ 'first': 'fred', 'second': 'barney' });
	     * // => { 'fred': 'first', 'barney': 'second' }
	     */
	    function invert(object) {
	      var index = -1,
	          props = keys(object),
	          length = props.length,
	          result = {};
	
	      while (++index < length) {
	        var key = props[index];
	        result[object[key]] = key;
	      }
	      return result;
	    }
	
	    /**
	     * Checks if `value` is a boolean value.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is a boolean value, else `false`.
	     * @example
	     *
	     * _.isBoolean(null);
	     * // => false
	     */
	    function isBoolean(value) {
	      return value === true || value === false ||
	        value && typeof value == 'object' && toString.call(value) == boolClass || false;
	    }
	
	    /**
	     * Checks if `value` is a date.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is a date, else `false`.
	     * @example
	     *
	     * _.isDate(new Date);
	     * // => true
	     */
	    function isDate(value) {
	      return value && typeof value == 'object' && toString.call(value) == dateClass || false;
	    }
	
	    /**
	     * Checks if `value` is a DOM element.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is a DOM element, else `false`.
	     * @example
	     *
	     * _.isElement(document.body);
	     * // => true
	     */
	    function isElement(value) {
	      return value && value.nodeType === 1 || false;
	    }
	
	    /**
	     * Checks if `value` is empty. Arrays, strings, or `arguments` objects with a
	     * length of `0` and objects with no own enumerable properties are considered
	     * "empty".
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Array|Object|string} value The value to inspect.
	     * @returns {boolean} Returns `true` if the `value` is empty, else `false`.
	     * @example
	     *
	     * _.isEmpty([1, 2, 3]);
	     * // => false
	     *
	     * _.isEmpty({});
	     * // => true
	     *
	     * _.isEmpty('');
	     * // => true
	     */
	    function isEmpty(value) {
	      var result = true;
	      if (!value) {
	        return result;
	      }
	      var className = toString.call(value),
	          length = value.length;
	
	      if ((className == arrayClass || className == stringClass ||
	          (support.argsClass ? className == argsClass : isArguments(value))) ||
	          (className == objectClass && typeof length == 'number' && isFunction(value.splice))) {
	        return !length;
	      }
	      forOwn(value, function() {
	        return (result = false);
	      });
	      return result;
	    }
	
	    /**
	     * Performs a deep comparison between two values to determine if they are
	     * equivalent to each other. If a callback is provided it will be executed
	     * to compare values. If the callback returns `undefined` comparisons will
	     * be handled by the method instead. The callback is bound to `thisArg` and
	     * invoked with two arguments; (a, b).
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} a The value to compare.
	     * @param {*} b The other value to compare.
	     * @param {Function} [callback] The function to customize comparing values.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	     * @example
	     *
	     * var object = { 'name': 'fred' };
	     * var copy = { 'name': 'fred' };
	     *
	     * object == copy;
	     * // => false
	     *
	     * _.isEqual(object, copy);
	     * // => true
	     *
	     * var words = ['hello', 'goodbye'];
	     * var otherWords = ['hi', 'goodbye'];
	     *
	     * _.isEqual(words, otherWords, function(a, b) {
	     *   var reGreet = /^(?:hello|hi)$/i,
	     *       aGreet = _.isString(a) && reGreet.test(a),
	     *       bGreet = _.isString(b) && reGreet.test(b);
	     *
	     *   return (aGreet || bGreet) ? (aGreet == bGreet) : undefined;
	     * });
	     * // => true
	     */
	    function isEqual(a, b, callback, thisArg) {
	      return baseIsEqual(a, b, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 2));
	    }
	
	    /**
	     * Checks if `value` is, or can be coerced to, a finite number.
	     *
	     * Note: This is not the same as native `isFinite` which will return true for
	     * booleans and empty strings. See http://es5.github.io/#x15.1.2.5.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is finite, else `false`.
	     * @example
	     *
	     * _.isFinite(-101);
	     * // => true
	     *
	     * _.isFinite('10');
	     * // => true
	     *
	     * _.isFinite(true);
	     * // => false
	     *
	     * _.isFinite('');
	     * // => false
	     *
	     * _.isFinite(Infinity);
	     * // => false
	     */
	    function isFinite(value) {
	      return nativeIsFinite(value) && !nativeIsNaN(parseFloat(value));
	    }
	
	    /**
	     * Checks if `value` is a function.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is a function, else `false`.
	     * @example
	     *
	     * _.isFunction(_);
	     * // => true
	     */
	    function isFunction(value) {
	      return typeof value == 'function';
	    }
	    // fallback for older versions of Chrome and Safari
	    if (isFunction(/x/)) {
	      isFunction = function(value) {
	        return typeof value == 'function' && toString.call(value) == funcClass;
	      };
	    }
	
	    /**
	     * Checks if `value` is the language type of Object.
	     * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is an object, else `false`.
	     * @example
	     *
	     * _.isObject({});
	     * // => true
	     *
	     * _.isObject([1, 2, 3]);
	     * // => true
	     *
	     * _.isObject(1);
	     * // => false
	     */
	    function isObject(value) {
	      // check if the value is the ECMAScript language type of Object
	      // http://es5.github.io/#x8
	      // and avoid a V8 bug
	      // http://code.google.com/p/v8/issues/detail?id=2291
	      return !!(value && objectTypes[typeof value]);
	    }
	
	    /**
	     * Checks if `value` is `NaN`.
	     *
	     * Note: This is not the same as native `isNaN` which will return `true` for
	     * `undefined` and other non-numeric values. See http://es5.github.io/#x15.1.2.4.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is `NaN`, else `false`.
	     * @example
	     *
	     * _.isNaN(NaN);
	     * // => true
	     *
	     * _.isNaN(new Number(NaN));
	     * // => true
	     *
	     * isNaN(undefined);
	     * // => true
	     *
	     * _.isNaN(undefined);
	     * // => false
	     */
	    function isNaN(value) {
	      // `NaN` as a primitive is the only value that is not equal to itself
	      // (perform the [[Class]] check first to avoid errors with some host objects in IE)
	      return isNumber(value) && value != +value;
	    }
	
	    /**
	     * Checks if `value` is `null`.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is `null`, else `false`.
	     * @example
	     *
	     * _.isNull(null);
	     * // => true
	     *
	     * _.isNull(undefined);
	     * // => false
	     */
	    function isNull(value) {
	      return value === null;
	    }
	
	    /**
	     * Checks if `value` is a number.
	     *
	     * Note: `NaN` is considered a number. See http://es5.github.io/#x8.5.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is a number, else `false`.
	     * @example
	     *
	     * _.isNumber(8.4 * 5);
	     * // => true
	     */
	    function isNumber(value) {
	      return typeof value == 'number' ||
	        value && typeof value == 'object' && toString.call(value) == numberClass || false;
	    }
	
	    /**
	     * Checks if `value` is an object created by the `Object` constructor.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	     * @example
	     *
	     * function Shape() {
	     *   this.x = 0;
	     *   this.y = 0;
	     * }
	     *
	     * _.isPlainObject(new Shape);
	     * // => false
	     *
	     * _.isPlainObject([1, 2, 3]);
	     * // => false
	     *
	     * _.isPlainObject({ 'x': 0, 'y': 0 });
	     * // => true
	     */
	    var isPlainObject = !getPrototypeOf ? shimIsPlainObject : function(value) {
	      if (!(value && toString.call(value) == objectClass) || (!support.argsClass && isArguments(value))) {
	        return false;
	      }
	      var valueOf = value.valueOf,
	          objProto = isNative(valueOf) && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);
	
	      return objProto
	        ? (value == objProto || getPrototypeOf(value) == objProto)
	        : shimIsPlainObject(value);
	    };
	
	    /**
	     * Checks if `value` is a regular expression.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is a regular expression, else `false`.
	     * @example
	     *
	     * _.isRegExp(/fred/);
	     * // => true
	     */
	    function isRegExp(value) {
	      return value && objectTypes[typeof value] && toString.call(value) == regexpClass || false;
	    }
	
	    /**
	     * Checks if `value` is a string.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is a string, else `false`.
	     * @example
	     *
	     * _.isString('fred');
	     * // => true
	     */
	    function isString(value) {
	      return typeof value == 'string' ||
	        value && typeof value == 'object' && toString.call(value) == stringClass || false;
	    }
	
	    /**
	     * Checks if `value` is `undefined`.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is `undefined`, else `false`.
	     * @example
	     *
	     * _.isUndefined(void 0);
	     * // => true
	     */
	    function isUndefined(value) {
	      return typeof value == 'undefined';
	    }
	
	    /**
	     * Creates an object with the same keys as `object` and values generated by
	     * running each own enumerable property of `object` through the callback.
	     * The callback is bound to `thisArg` and invoked with three arguments;
	     * (value, key, object).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a new object with values of the results of each `callback` execution.
	     * @example
	     *
	     * _.mapValues({ 'a': 1, 'b': 2, 'c': 3} , function(num) { return num * 3; });
	     * // => { 'a': 3, 'b': 6, 'c': 9 }
	     *
	     * var characters = {
	     *   'fred': { 'name': 'fred', 'age': 40 },
	     *   'pebbles': { 'name': 'pebbles', 'age': 1 }
	     * };
	     *
	     * // using "_.pluck" callback shorthand
	     * _.mapValues(characters, 'age');
	     * // => { 'fred': 40, 'pebbles': 1 }
	     */
	    function mapValues(object, callback, thisArg) {
	      var result = {};
	      callback = lodash.createCallback(callback, thisArg, 3);
	
	      forOwn(object, function(value, key, object) {
	        result[key] = callback(value, key, object);
	      });
	      return result;
	    }
	
	    /**
	     * Recursively merges own enumerable properties of the source object(s), that
	     * don't resolve to `undefined` into the destination object. Subsequent sources
	     * will overwrite property assignments of previous sources. If a callback is
	     * provided it will be executed to produce the merged values of the destination
	     * and source properties. If the callback returns `undefined` merging will
	     * be handled by the method instead. The callback is bound to `thisArg` and
	     * invoked with two arguments; (objectValue, sourceValue).
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The destination object.
	     * @param {...Object} [source] The source objects.
	     * @param {Function} [callback] The function to customize merging properties.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns the destination object.
	     * @example
	     *
	     * var names = {
	     *   'characters': [
	     *     { 'name': 'barney' },
	     *     { 'name': 'fred' }
	     *   ]
	     * };
	     *
	     * var ages = {
	     *   'characters': [
	     *     { 'age': 36 },
	     *     { 'age': 40 }
	     *   ]
	     * };
	     *
	     * _.merge(names, ages);
	     * // => { 'characters': [{ 'name': 'barney', 'age': 36 }, { 'name': 'fred', 'age': 40 }] }
	     *
	     * var food = {
	     *   'fruits': ['apple'],
	     *   'vegetables': ['beet']
	     * };
	     *
	     * var otherFood = {
	     *   'fruits': ['banana'],
	     *   'vegetables': ['carrot']
	     * };
	     *
	     * _.merge(food, otherFood, function(a, b) {
	     *   return _.isArray(a) ? a.concat(b) : undefined;
	     * });
	     * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot] }
	     */
	    function merge(object) {
	      var args = arguments,
	          length = 2;
	
	      if (!isObject(object)) {
	        return object;
	      }
	      // allows working with `_.reduce` and `_.reduceRight` without using
	      // their `index` and `collection` arguments
	      if (typeof args[2] != 'number') {
	        length = args.length;
	      }
	      if (length > 3 && typeof args[length - 2] == 'function') {
	        var callback = baseCreateCallback(args[--length - 1], args[length--], 2);
	      } else if (length > 2 && typeof args[length - 1] == 'function') {
	        callback = args[--length];
	      }
	      var sources = slice(arguments, 1, length),
	          index = -1,
	          stackA = getArray(),
	          stackB = getArray();
	
	      while (++index < length) {
	        baseMerge(object, sources[index], callback, stackA, stackB);
	      }
	      releaseArray(stackA);
	      releaseArray(stackB);
	      return object;
	    }
	
	    /**
	     * Creates a shallow clone of `object` excluding the specified properties.
	     * Property names may be specified as individual arguments or as arrays of
	     * property names. If a callback is provided it will be executed for each
	     * property of `object` omitting the properties the callback returns truey
	     * for. The callback is bound to `thisArg` and invoked with three arguments;
	     * (value, key, object).
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The source object.
	     * @param {Function|...string|string[]} [callback] The properties to omit or the
	     *  function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns an object without the omitted properties.
	     * @example
	     *
	     * _.omit({ 'name': 'fred', 'age': 40 }, 'age');
	     * // => { 'name': 'fred' }
	     *
	     * _.omit({ 'name': 'fred', 'age': 40 }, function(value) {
	     *   return typeof value == 'number';
	     * });
	     * // => { 'name': 'fred' }
	     */
	    function omit(object, callback, thisArg) {
	      var result = {};
	      if (typeof callback != 'function') {
	        var props = [];
	        forIn(object, function(value, key) {
	          props.push(key);
	        });
	        props = baseDifference(props, baseFlatten(arguments, true, false, 1));
	
	        var index = -1,
	            length = props.length;
	
	        while (++index < length) {
	          var key = props[index];
	          result[key] = object[key];
	        }
	      } else {
	        callback = lodash.createCallback(callback, thisArg, 3);
	        forIn(object, function(value, key, object) {
	          if (!callback(value, key, object)) {
	            result[key] = value;
	          }
	        });
	      }
	      return result;
	    }
	
	    /**
	     * Creates a two dimensional array of an object's key-value pairs,
	     * i.e. `[[key1, value1], [key2, value2]]`.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns new array of key-value pairs.
	     * @example
	     *
	     * _.pairs({ 'barney': 36, 'fred': 40 });
	     * // => [['barney', 36], ['fred', 40]] (property order is not guaranteed across environments)
	     */
	    function pairs(object) {
	      var index = -1,
	          props = keys(object),
	          length = props.length,
	          result = Array(length);
	
	      while (++index < length) {
	        var key = props[index];
	        result[index] = [key, object[key]];
	      }
	      return result;
	    }
	
	    /**
	     * Creates a shallow clone of `object` composed of the specified properties.
	     * Property names may be specified as individual arguments or as arrays of
	     * property names. If a callback is provided it will be executed for each
	     * property of `object` picking the properties the callback returns truey
	     * for. The callback is bound to `thisArg` and invoked with three arguments;
	     * (value, key, object).
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The source object.
	     * @param {Function|...string|string[]} [callback] The function called per
	     *  iteration or property names to pick, specified as individual property
	     *  names or arrays of property names.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns an object composed of the picked properties.
	     * @example
	     *
	     * _.pick({ 'name': 'fred', '_userid': 'fred1' }, 'name');
	     * // => { 'name': 'fred' }
	     *
	     * _.pick({ 'name': 'fred', '_userid': 'fred1' }, function(value, key) {
	     *   return key.charAt(0) != '_';
	     * });
	     * // => { 'name': 'fred' }
	     */
	    function pick(object, callback, thisArg) {
	      var result = {};
	      if (typeof callback != 'function') {
	        var index = -1,
	            props = baseFlatten(arguments, true, false, 1),
	            length = isObject(object) ? props.length : 0;
	
	        while (++index < length) {
	          var key = props[index];
	          if (key in object) {
	            result[key] = object[key];
	          }
	        }
	      } else {
	        callback = lodash.createCallback(callback, thisArg, 3);
	        forIn(object, function(value, key, object) {
	          if (callback(value, key, object)) {
	            result[key] = value;
	          }
	        });
	      }
	      return result;
	    }
	
	    /**
	     * An alternative to `_.reduce` this method transforms `object` to a new
	     * `accumulator` object which is the result of running each of its own
	     * enumerable properties through a callback, with each callback execution
	     * potentially mutating the `accumulator` object. The callback is bound to
	     * `thisArg` and invoked with four arguments; (accumulator, value, key, object).
	     * Callbacks may exit iteration early by explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Array|Object} object The object to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [accumulator] The custom accumulator value.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the accumulated value.
	     * @example
	     *
	     * var squares = _.transform([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], function(result, num) {
	     *   num *= num;
	     *   if (num % 2) {
	     *     return result.push(num) < 3;
	     *   }
	     * });
	     * // => [1, 9, 25]
	     *
	     * var mapped = _.transform({ 'a': 1, 'b': 2, 'c': 3 }, function(result, num, key) {
	     *   result[key] = num * 3;
	     * });
	     * // => { 'a': 3, 'b': 6, 'c': 9 }
	     */
	    function transform(object, callback, accumulator, thisArg) {
	      var isArr = isArray(object);
	      if (accumulator == null) {
	        if (isArr) {
	          accumulator = [];
	        } else {
	          var ctor = object && object.constructor,
	              proto = ctor && ctor.prototype;
	
	          accumulator = baseCreate(proto);
	        }
	      }
	      if (callback) {
	        callback = lodash.createCallback(callback, thisArg, 4);
	        (isArr ? baseEach : forOwn)(object, function(value, index, object) {
	          return callback(accumulator, value, index, object);
	        });
	      }
	      return accumulator;
	    }
	
	    /**
	     * Creates an array composed of the own enumerable property values of `object`.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns an array of property values.
	     * @example
	     *
	     * _.values({ 'one': 1, 'two': 2, 'three': 3 });
	     * // => [1, 2, 3] (property order is not guaranteed across environments)
	     */
	    function values(object) {
	      var index = -1,
	          props = keys(object),
	          length = props.length,
	          result = Array(length);
	
	      while (++index < length) {
	        result[index] = object[props[index]];
	      }
	      return result;
	    }
	
	    /*--------------------------------------------------------------------------*/
	
	    /**
	     * Creates an array of elements from the specified indexes, or keys, of the
	     * `collection`. Indexes may be specified as individual arguments or as arrays
	     * of indexes.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {...(number|number[]|string|string[])} [index] The indexes of `collection`
	     *   to retrieve, specified as individual indexes or arrays of indexes.
	     * @returns {Array} Returns a new array of elements corresponding to the
	     *  provided indexes.
	     * @example
	     *
	     * _.at(['a', 'b', 'c', 'd', 'e'], [0, 2, 4]);
	     * // => ['a', 'c', 'e']
	     *
	     * _.at(['fred', 'barney', 'pebbles'], 0, 2);
	     * // => ['fred', 'pebbles']
	     */
	    function at(collection) {
	      var args = arguments,
	          index = -1,
	          props = baseFlatten(args, true, false, 1),
	          length = (args[2] && args[2][args[1]] === collection) ? 1 : props.length,
	          result = Array(length);
	
	      if (support.unindexedChars && isString(collection)) {
	        collection = collection.split('');
	      }
	      while(++index < length) {
	        result[index] = collection[props[index]];
	      }
	      return result;
	    }
	
	    /**
	     * Checks if a given value is present in a collection using strict equality
	     * for comparisons, i.e. `===`. If `fromIndex` is negative, it is used as the
	     * offset from the end of the collection.
	     *
	     * @static
	     * @memberOf _
	     * @alias include
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {*} target The value to check for.
	     * @param {number} [fromIndex=0] The index to search from.
	     * @returns {boolean} Returns `true` if the `target` element is found, else `false`.
	     * @example
	     *
	     * _.contains([1, 2, 3], 1);
	     * // => true
	     *
	     * _.contains([1, 2, 3], 1, 2);
	     * // => false
	     *
	     * _.contains({ 'name': 'fred', 'age': 40 }, 'fred');
	     * // => true
	     *
	     * _.contains('pebbles', 'eb');
	     * // => true
	     */
	    function contains(collection, target, fromIndex) {
	      var index = -1,
	          indexOf = getIndexOf(),
	          length = collection ? collection.length : 0,
	          result = false;
	
	      fromIndex = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex) || 0;
	      if (isArray(collection)) {
	        result = indexOf(collection, target, fromIndex) > -1;
	      } else if (typeof length == 'number') {
	        result = (isString(collection) ? collection.indexOf(target, fromIndex) : indexOf(collection, target, fromIndex)) > -1;
	      } else {
	        baseEach(collection, function(value) {
	          if (++index >= fromIndex) {
	            return !(result = value === target);
	          }
	        });
	      }
	      return result;
	    }
	
	    /**
	     * Creates an object composed of keys generated from the results of running
	     * each element of `collection` through the callback. The corresponding value
	     * of each key is the number of times the key was returned by the callback.
	     * The callback is bound to `thisArg` and invoked with three arguments;
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns the composed aggregate object.
	     * @example
	     *
	     * _.countBy([4.3, 6.1, 6.4], function(num) { return Math.floor(num); });
	     * // => { '4': 1, '6': 2 }
	     *
	     * _.countBy([4.3, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
	     * // => { '4': 1, '6': 2 }
	     *
	     * _.countBy(['one', 'two', 'three'], 'length');
	     * // => { '3': 2, '5': 1 }
	     */
	    var countBy = createAggregator(function(result, value, key) {
	      (hasOwnProperty.call(result, key) ? result[key]++ : result[key] = 1);
	    });
	
	    /**
	     * Checks if the given callback returns truey value for **all** elements of
	     * a collection. The callback is bound to `thisArg` and invoked with three
	     * arguments; (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias all
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {boolean} Returns `true` if all elements passed the callback check,
	     *  else `false`.
	     * @example
	     *
	     * _.every([true, 1, null, 'yes']);
	     * // => false
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.every(characters, 'age');
	     * // => true
	     *
	     * // using "_.where" callback shorthand
	     * _.every(characters, { 'age': 36 });
	     * // => false
	     */
	    function every(collection, callback, thisArg) {
	      var result = true;
	      callback = lodash.createCallback(callback, thisArg, 3);
	
	      if (isArray(collection)) {
	        var index = -1,
	            length = collection.length;
	
	        while (++index < length) {
	          if (!(result = !!callback(collection[index], index, collection))) {
	            break;
	          }
	        }
	      } else {
	        baseEach(collection, function(value, index, collection) {
	          return (result = !!callback(value, index, collection));
	        });
	      }
	      return result;
	    }
	
	    /**
	     * Iterates over elements of a collection, returning an array of all elements
	     * the callback returns truey for. The callback is bound to `thisArg` and
	     * invoked with three arguments; (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias select
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a new array of elements that passed the callback check.
	     * @example
	     *
	     * var evens = _.filter([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
	     * // => [2, 4, 6]
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36, 'blocked': false },
	     *   { 'name': 'fred',   'age': 40, 'blocked': true }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.filter(characters, 'blocked');
	     * // => [{ 'name': 'fred', 'age': 40, 'blocked': true }]
	     *
	     * // using "_.where" callback shorthand
	     * _.filter(characters, { 'age': 36 });
	     * // => [{ 'name': 'barney', 'age': 36, 'blocked': false }]
	     */
	    function filter(collection, callback, thisArg) {
	      var result = [];
	      callback = lodash.createCallback(callback, thisArg, 3);
	
	      if (isArray(collection)) {
	        var index = -1,
	            length = collection.length;
	
	        while (++index < length) {
	          var value = collection[index];
	          if (callback(value, index, collection)) {
	            result.push(value);
	          }
	        }
	      } else {
	        baseEach(collection, function(value, index, collection) {
	          if (callback(value, index, collection)) {
	            result.push(value);
	          }
	        });
	      }
	      return result;
	    }
	
	    /**
	     * Iterates over elements of a collection, returning the first element that
	     * the callback returns truey for. The callback is bound to `thisArg` and
	     * invoked with three arguments; (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias detect, findWhere
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the found element, else `undefined`.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'age': 36, 'blocked': false },
	     *   { 'name': 'fred',    'age': 40, 'blocked': true },
	     *   { 'name': 'pebbles', 'age': 1,  'blocked': false }
	     * ];
	     *
	     * _.find(characters, function(chr) {
	     *   return chr.age < 40;
	     * });
	     * // => { 'name': 'barney', 'age': 36, 'blocked': false }
	     *
	     * // using "_.where" callback shorthand
	     * _.find(characters, { 'age': 1 });
	     * // =>  { 'name': 'pebbles', 'age': 1, 'blocked': false }
	     *
	     * // using "_.pluck" callback shorthand
	     * _.find(characters, 'blocked');
	     * // => { 'name': 'fred', 'age': 40, 'blocked': true }
	     */
	    function find(collection, callback, thisArg) {
	      callback = lodash.createCallback(callback, thisArg, 3);
	
	      if (isArray(collection)) {
	        var index = -1,
	            length = collection.length;
	
	        while (++index < length) {
	          var value = collection[index];
	          if (callback(value, index, collection)) {
	            return value;
	          }
	        }
	      } else {
	        var result;
	        baseEach(collection, function(value, index, collection) {
	          if (callback(value, index, collection)) {
	            result = value;
	            return false;
	          }
	        });
	        return result;
	      }
	    }
	
	    /**
	     * This method is like `_.find` except that it iterates over elements
	     * of a `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the found element, else `undefined`.
	     * @example
	     *
	     * _.findLast([1, 2, 3, 4], function(num) {
	     *   return num % 2 == 1;
	     * });
	     * // => 3
	     */
	    function findLast(collection, callback, thisArg) {
	      var result;
	      callback = lodash.createCallback(callback, thisArg, 3);
	      forEachRight(collection, function(value, index, collection) {
	        if (callback(value, index, collection)) {
	          result = value;
	          return false;
	        }
	      });
	      return result;
	    }
	
	    /**
	     * Iterates over elements of a collection, executing the callback for each
	     * element. The callback is bound to `thisArg` and invoked with three arguments;
	     * (value, index|key, collection). Callbacks may exit iteration early by
	     * explicitly returning `false`.
	     *
	     * Note: As with other "Collections" methods, objects with a `length` property
	     * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
	     * may be used for object iteration.
	     *
	     * @static
	     * @memberOf _
	     * @alias each
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array|Object|string} Returns `collection`.
	     * @example
	     *
	     * _([1, 2, 3]).forEach(function(num) { console.log(num); }).join(',');
	     * // => logs each number and returns '1,2,3'
	     *
	     * _.forEach({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { console.log(num); });
	     * // => logs each number and returns the object (property order is not guaranteed across environments)
	     */
	    function forEach(collection, callback, thisArg) {
	      if (callback && typeof thisArg == 'undefined' && isArray(collection)) {
	        var index = -1,
	            length = collection.length;
	
	        while (++index < length) {
	          if (callback(collection[index], index, collection) === false) {
	            break;
	          }
	        }
	      } else {
	        baseEach(collection, callback, thisArg);
	      }
	      return collection;
	    }
	
	    /**
	     * This method is like `_.forEach` except that it iterates over elements
	     * of a `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @alias eachRight
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array|Object|string} Returns `collection`.
	     * @example
	     *
	     * _([1, 2, 3]).forEachRight(function(num) { console.log(num); }).join(',');
	     * // => logs each number from right to left and returns '3,2,1'
	     */
	    function forEachRight(collection, callback, thisArg) {
	      var iterable = collection,
	          length = collection ? collection.length : 0;
	
	      callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
	      if (isArray(collection)) {
	        while (length--) {
	          if (callback(collection[length], length, collection) === false) {
	            break;
	          }
	        }
	      } else {
	        if (typeof length != 'number') {
	          var props = keys(collection);
	          length = props.length;
	        } else if (support.unindexedChars && isString(collection)) {
	          iterable = collection.split('');
	        }
	        baseEach(collection, function(value, key, collection) {
	          key = props ? props[--length] : --length;
	          return callback(iterable[key], key, collection);
	        });
	      }
	      return collection;
	    }
	
	    /**
	     * Creates an object composed of keys generated from the results of running
	     * each element of a collection through the callback. The corresponding value
	     * of each key is an array of the elements responsible for generating the key.
	     * The callback is bound to `thisArg` and invoked with three arguments;
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns the composed aggregate object.
	     * @example
	     *
	     * _.groupBy([4.2, 6.1, 6.4], function(num) { return Math.floor(num); });
	     * // => { '4': [4.2], '6': [6.1, 6.4] }
	     *
	     * _.groupBy([4.2, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
	     * // => { '4': [4.2], '6': [6.1, 6.4] }
	     *
	     * // using "_.pluck" callback shorthand
	     * _.groupBy(['one', 'two', 'three'], 'length');
	     * // => { '3': ['one', 'two'], '5': ['three'] }
	     */
	    var groupBy = createAggregator(function(result, value, key) {
	      (hasOwnProperty.call(result, key) ? result[key] : result[key] = []).push(value);
	    });
	
	    /**
	     * Creates an object composed of keys generated from the results of running
	     * each element of the collection through the given callback. The corresponding
	     * value of each key is the last element responsible for generating the key.
	     * The callback is bound to `thisArg` and invoked with three arguments;
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns the composed aggregate object.
	     * @example
	     *
	     * var keys = [
	     *   { 'dir': 'left', 'code': 97 },
	     *   { 'dir': 'right', 'code': 100 }
	     * ];
	     *
	     * _.indexBy(keys, 'dir');
	     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
	     *
	     * _.indexBy(keys, function(key) { return String.fromCharCode(key.code); });
	     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
	     *
	     * _.indexBy(characters, function(key) { this.fromCharCode(key.code); }, String);
	     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
	     */
	    var indexBy = createAggregator(function(result, value, key) {
	      result[key] = value;
	    });
	
	    /**
	     * Invokes the method named by `methodName` on each element in the `collection`
	     * returning an array of the results of each invoked method. Additional arguments
	     * will be provided to each invoked method. If `methodName` is a function it
	     * will be invoked for, and `this` bound to, each element in the `collection`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|string} methodName The name of the method to invoke or
	     *  the function invoked per iteration.
	     * @param {...*} [arg] Arguments to invoke the method with.
	     * @returns {Array} Returns a new array of the results of each invoked method.
	     * @example
	     *
	     * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
	     * // => [[1, 5, 7], [1, 2, 3]]
	     *
	     * _.invoke([123, 456], String.prototype.split, '');
	     * // => [['1', '2', '3'], ['4', '5', '6']]
	     */
	    function invoke(collection, methodName) {
	      var args = slice(arguments, 2),
	          index = -1,
	          isFunc = typeof methodName == 'function',
	          length = collection ? collection.length : 0,
	          result = Array(typeof length == 'number' ? length : 0);
	
	      forEach(collection, function(value) {
	        result[++index] = (isFunc ? methodName : value[methodName]).apply(value, args);
	      });
	      return result;
	    }
	
	    /**
	     * Creates an array of values by running each element in the collection
	     * through the callback. The callback is bound to `thisArg` and invoked with
	     * three arguments; (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias collect
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a new array of the results of each `callback` execution.
	     * @example
	     *
	     * _.map([1, 2, 3], function(num) { return num * 3; });
	     * // => [3, 6, 9]
	     *
	     * _.map({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { return num * 3; });
	     * // => [3, 6, 9] (property order is not guaranteed across environments)
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.map(characters, 'name');
	     * // => ['barney', 'fred']
	     */
	    function map(collection, callback, thisArg) {
	      var index = -1,
	          length = collection ? collection.length : 0,
	          result = Array(typeof length == 'number' ? length : 0);
	
	      callback = lodash.createCallback(callback, thisArg, 3);
	      if (isArray(collection)) {
	        while (++index < length) {
	          result[index] = callback(collection[index], index, collection);
	        }
	      } else {
	        baseEach(collection, function(value, key, collection) {
	          result[++index] = callback(value, key, collection);
	        });
	      }
	      return result;
	    }
	
	    /**
	     * Retrieves the maximum value of a collection. If the collection is empty or
	     * falsey `-Infinity` is returned. If a callback is provided it will be executed
	     * for each value in the collection to generate the criterion by which the value
	     * is ranked. The callback is bound to `thisArg` and invoked with three
	     * arguments; (value, index, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the maximum value.
	     * @example
	     *
	     * _.max([4, 2, 8, 6]);
	     * // => 8
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * _.max(characters, function(chr) { return chr.age; });
	     * // => { 'name': 'fred', 'age': 40 };
	     *
	     * // using "_.pluck" callback shorthand
	     * _.max(characters, 'age');
	     * // => { 'name': 'fred', 'age': 40 };
	     */
	    function max(collection, callback, thisArg) {
	      var computed = -Infinity,
	          result = computed;
	
	      // allows working with functions like `_.map` without using
	      // their `index` argument as a callback
	      if (typeof callback != 'function' && thisArg && thisArg[callback] === collection) {
	        callback = null;
	      }
	      if (callback == null && isArray(collection)) {
	        var index = -1,
	            length = collection.length;
	
	        while (++index < length) {
	          var value = collection[index];
	          if (value > result) {
	            result = value;
	          }
	        }
	      } else {
	        callback = (callback == null && isString(collection))
	          ? charAtCallback
	          : lodash.createCallback(callback, thisArg, 3);
	
	        baseEach(collection, function(value, index, collection) {
	          var current = callback(value, index, collection);
	          if (current > computed) {
	            computed = current;
	            result = value;
	          }
	        });
	      }
	      return result;
	    }
	
	    /**
	     * Retrieves the minimum value of a collection. If the collection is empty or
	     * falsey `Infinity` is returned. If a callback is provided it will be executed
	     * for each value in the collection to generate the criterion by which the value
	     * is ranked. The callback is bound to `thisArg` and invoked with three
	     * arguments; (value, index, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the minimum value.
	     * @example
	     *
	     * _.min([4, 2, 8, 6]);
	     * // => 2
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * _.min(characters, function(chr) { return chr.age; });
	     * // => { 'name': 'barney', 'age': 36 };
	     *
	     * // using "_.pluck" callback shorthand
	     * _.min(characters, 'age');
	     * // => { 'name': 'barney', 'age': 36 };
	     */
	    function min(collection, callback, thisArg) {
	      var computed = Infinity,
	          result = computed;
	
	      // allows working with functions like `_.map` without using
	      // their `index` argument as a callback
	      if (typeof callback != 'function' && thisArg && thisArg[callback] === collection) {
	        callback = null;
	      }
	      if (callback == null && isArray(collection)) {
	        var index = -1,
	            length = collection.length;
	
	        while (++index < length) {
	          var value = collection[index];
	          if (value < result) {
	            result = value;
	          }
	        }
	      } else {
	        callback = (callback == null && isString(collection))
	          ? charAtCallback
	          : lodash.createCallback(callback, thisArg, 3);
	
	        baseEach(collection, function(value, index, collection) {
	          var current = callback(value, index, collection);
	          if (current < computed) {
	            computed = current;
	            result = value;
	          }
	        });
	      }
	      return result;
	    }
	
	    /**
	     * Retrieves the value of a specified property from all elements in the collection.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {string} property The name of the property to pluck.
	     * @returns {Array} Returns a new array of property values.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * _.pluck(characters, 'name');
	     * // => ['barney', 'fred']
	     */
	    var pluck = map;
	
	    /**
	     * Reduces a collection to a value which is the accumulated result of running
	     * each element in the collection through the callback, where each successive
	     * callback execution consumes the return value of the previous execution. If
	     * `accumulator` is not provided the first element of the collection will be
	     * used as the initial `accumulator` value. The callback is bound to `thisArg`
	     * and invoked with four arguments; (accumulator, value, index|key, collection).
	     *
	     * @static
	     * @memberOf _
	     * @alias foldl, inject
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [accumulator] Initial value of the accumulator.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the accumulated value.
	     * @example
	     *
	     * var sum = _.reduce([1, 2, 3], function(sum, num) {
	     *   return sum + num;
	     * });
	     * // => 6
	     *
	     * var mapped = _.reduce({ 'a': 1, 'b': 2, 'c': 3 }, function(result, num, key) {
	     *   result[key] = num * 3;
	     *   return result;
	     * }, {});
	     * // => { 'a': 3, 'b': 6, 'c': 9 }
	     */
	    function reduce(collection, callback, accumulator, thisArg) {
	      var noaccum = arguments.length < 3;
	      callback = lodash.createCallback(callback, thisArg, 4);
	
	      if (isArray(collection)) {
	        var index = -1,
	            length = collection.length;
	
	        if (noaccum) {
	          accumulator = collection[++index];
	        }
	        while (++index < length) {
	          accumulator = callback(accumulator, collection[index], index, collection);
	        }
	      } else {
	        baseEach(collection, function(value, index, collection) {
	          accumulator = noaccum
	            ? (noaccum = false, value)
	            : callback(accumulator, value, index, collection)
	        });
	      }
	      return accumulator;
	    }
	
	    /**
	     * This method is like `_.reduce` except that it iterates over elements
	     * of a `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @alias foldr
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [accumulator] Initial value of the accumulator.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the accumulated value.
	     * @example
	     *
	     * var list = [[0, 1], [2, 3], [4, 5]];
	     * var flat = _.reduceRight(list, function(a, b) { return a.concat(b); }, []);
	     * // => [4, 5, 2, 3, 0, 1]
	     */
	    function reduceRight(collection, callback, accumulator, thisArg) {
	      var noaccum = arguments.length < 3;
	      callback = lodash.createCallback(callback, thisArg, 4);
	      forEachRight(collection, function(value, index, collection) {
	        accumulator = noaccum
	          ? (noaccum = false, value)
	          : callback(accumulator, value, index, collection);
	      });
	      return accumulator;
	    }
	
	    /**
	     * The opposite of `_.filter` this method returns the elements of a
	     * collection that the callback does **not** return truey for.
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a new array of elements that failed the callback check.
	     * @example
	     *
	     * var odds = _.reject([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
	     * // => [1, 3, 5]
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36, 'blocked': false },
	     *   { 'name': 'fred',   'age': 40, 'blocked': true }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.reject(characters, 'blocked');
	     * // => [{ 'name': 'barney', 'age': 36, 'blocked': false }]
	     *
	     * // using "_.where" callback shorthand
	     * _.reject(characters, { 'age': 36 });
	     * // => [{ 'name': 'fred', 'age': 40, 'blocked': true }]
	     */
	    function reject(collection, callback, thisArg) {
	      callback = lodash.createCallback(callback, thisArg, 3);
	      return filter(collection, function(value, index, collection) {
	        return !callback(value, index, collection);
	      });
	    }
	
	    /**
	     * Retrieves a random element or `n` random elements from a collection.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to sample.
	     * @param {number} [n] The number of elements to sample.
	     * @param- {Object} [guard] Allows working with functions like `_.map`
	     *  without using their `index` arguments as `n`.
	     * @returns {Array} Returns the random sample(s) of `collection`.
	     * @example
	     *
	     * _.sample([1, 2, 3, 4]);
	     * // => 2
	     *
	     * _.sample([1, 2, 3, 4], 2);
	     * // => [3, 1]
	     */
	    function sample(collection, n, guard) {
	      if (collection && typeof collection.length != 'number') {
	        collection = values(collection);
	      } else if (support.unindexedChars && isString(collection)) {
	        collection = collection.split('');
	      }
	      if (n == null || guard) {
	        return collection ? collection[baseRandom(0, collection.length - 1)] : undefined;
	      }
	      var result = shuffle(collection);
	      result.length = nativeMin(nativeMax(0, n), result.length);
	      return result;
	    }
	
	    /**
	     * Creates an array of shuffled values, using a version of the Fisher-Yates
	     * shuffle. See http://en.wikipedia.org/wiki/Fisher-Yates_shuffle.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to shuffle.
	     * @returns {Array} Returns a new shuffled collection.
	     * @example
	     *
	     * _.shuffle([1, 2, 3, 4, 5, 6]);
	     * // => [4, 1, 6, 3, 5, 2]
	     */
	    function shuffle(collection) {
	      var index = -1,
	          length = collection ? collection.length : 0,
	          result = Array(typeof length == 'number' ? length : 0);
	
	      forEach(collection, function(value) {
	        var rand = baseRandom(0, ++index);
	        result[index] = result[rand];
	        result[rand] = value;
	      });
	      return result;
	    }
	
	    /**
	     * Gets the size of the `collection` by returning `collection.length` for arrays
	     * and array-like objects or the number of own enumerable properties for objects.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to inspect.
	     * @returns {number} Returns `collection.length` or number of own enumerable properties.
	     * @example
	     *
	     * _.size([1, 2]);
	     * // => 2
	     *
	     * _.size({ 'one': 1, 'two': 2, 'three': 3 });
	     * // => 3
	     *
	     * _.size('pebbles');
	     * // => 7
	     */
	    function size(collection) {
	      var length = collection ? collection.length : 0;
	      return typeof length == 'number' ? length : keys(collection).length;
	    }
	
	    /**
	     * Checks if the callback returns a truey value for **any** element of a
	     * collection. The function returns as soon as it finds a passing value and
	     * does not iterate over the entire collection. The callback is bound to
	     * `thisArg` and invoked with three arguments; (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias any
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {boolean} Returns `true` if any element passed the callback check,
	     *  else `false`.
	     * @example
	     *
	     * _.some([null, 0, 'yes', false], Boolean);
	     * // => true
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36, 'blocked': false },
	     *   { 'name': 'fred',   'age': 40, 'blocked': true }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.some(characters, 'blocked');
	     * // => true
	     *
	     * // using "_.where" callback shorthand
	     * _.some(characters, { 'age': 1 });
	     * // => false
	     */
	    function some(collection, callback, thisArg) {
	      var result;
	      callback = lodash.createCallback(callback, thisArg, 3);
	
	      if (isArray(collection)) {
	        var index = -1,
	            length = collection.length;
	
	        while (++index < length) {
	          if ((result = callback(collection[index], index, collection))) {
	            break;
	          }
	        }
	      } else {
	        baseEach(collection, function(value, index, collection) {
	          return !(result = callback(value, index, collection));
	        });
	      }
	      return !!result;
	    }
	
	    /**
	     * Creates an array of elements, sorted in ascending order by the results of
	     * running each element in a collection through the callback. This method
	     * performs a stable sort, that is, it will preserve the original sort order
	     * of equal elements. The callback is bound to `thisArg` and invoked with
	     * three arguments; (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an array of property names is provided for `callback` the collection
	     * will be sorted by each property value.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Array|Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a new array of sorted elements.
	     * @example
	     *
	     * _.sortBy([1, 2, 3], function(num) { return Math.sin(num); });
	     * // => [3, 1, 2]
	     *
	     * _.sortBy([1, 2, 3], function(num) { return this.sin(num); }, Math);
	     * // => [3, 1, 2]
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'age': 36 },
	     *   { 'name': 'fred',    'age': 40 },
	     *   { 'name': 'barney',  'age': 26 },
	     *   { 'name': 'fred',    'age': 30 }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.map(_.sortBy(characters, 'age'), _.values);
	     * // => [['barney', 26], ['fred', 30], ['barney', 36], ['fred', 40]]
	     *
	     * // sorting by multiple properties
	     * _.map(_.sortBy(characters, ['name', 'age']), _.values);
	     * // = > [['barney', 26], ['barney', 36], ['fred', 30], ['fred', 40]]
	     */
	    function sortBy(collection, callback, thisArg) {
	      var index = -1,
	          isArr = isArray(callback),
	          length = collection ? collection.length : 0,
	          result = Array(typeof length == 'number' ? length : 0);
	
	      if (!isArr) {
	        callback = lodash.createCallback(callback, thisArg, 3);
	      }
	      forEach(collection, function(value, key, collection) {
	        var object = result[++index] = getObject();
	        if (isArr) {
	          object.criteria = map(callback, function(key) { return value[key]; });
	        } else {
	          (object.criteria = getArray())[0] = callback(value, key, collection);
	        }
	        object.index = index;
	        object.value = value;
	      });
	
	      length = result.length;
	      result.sort(compareAscending);
	      while (length--) {
	        var object = result[length];
	        result[length] = object.value;
	        if (!isArr) {
	          releaseArray(object.criteria);
	        }
	        releaseObject(object);
	      }
	      return result;
	    }
	
	    /**
	     * Converts the `collection` to an array.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to convert.
	     * @returns {Array} Returns the new converted array.
	     * @example
	     *
	     * (function() { return _.toArray(arguments).slice(1); })(1, 2, 3, 4);
	     * // => [2, 3, 4]
	     */
	    function toArray(collection) {
	      if (collection && typeof collection.length == 'number') {
	        return (support.unindexedChars && isString(collection))
	          ? collection.split('')
	          : slice(collection);
	      }
	      return values(collection);
	    }
	
	    /**
	     * Performs a deep comparison of each element in a `collection` to the given
	     * `properties` object, returning an array of all elements that have equivalent
	     * property values.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Object} props The object of property values to filter by.
	     * @returns {Array} Returns a new array of elements that have the given properties.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36, 'pets': ['hoppy'] },
	     *   { 'name': 'fred',   'age': 40, 'pets': ['baby puss', 'dino'] }
	     * ];
	     *
	     * _.where(characters, { 'age': 36 });
	     * // => [{ 'name': 'barney', 'age': 36, 'pets': ['hoppy'] }]
	     *
	     * _.where(characters, { 'pets': ['dino'] });
	     * // => [{ 'name': 'fred', 'age': 40, 'pets': ['baby puss', 'dino'] }]
	     */
	    var where = filter;
	
	    /*--------------------------------------------------------------------------*/
	
	    /**
	     * Creates an array with all falsey values removed. The values `false`, `null`,
	     * `0`, `""`, `undefined`, and `NaN` are all falsey.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to compact.
	     * @returns {Array} Returns a new array of filtered values.
	     * @example
	     *
	     * _.compact([0, 1, false, 2, '', 3]);
	     * // => [1, 2, 3]
	     */
	    function compact(array) {
	      var index = -1,
	          length = array ? array.length : 0,
	          result = [];
	
	      while (++index < length) {
	        var value = array[index];
	        if (value) {
	          result.push(value);
	        }
	      }
	      return result;
	    }
	
	    /**
	     * Creates an array excluding all values of the provided arrays using strict
	     * equality for comparisons, i.e. `===`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to process.
	     * @param {...Array} [values] The arrays of values to exclude.
	     * @returns {Array} Returns a new array of filtered values.
	     * @example
	     *
	     * _.difference([1, 2, 3, 4, 5], [5, 2, 10]);
	     * // => [1, 3, 4]
	     */
	    function difference(array) {
	      return baseDifference(array, baseFlatten(arguments, true, true, 1));
	    }
	
	    /**
	     * This method is like `_.find` except that it returns the index of the first
	     * element that passes the callback check, instead of the element itself.
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to search.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {number} Returns the index of the found element, else `-1`.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'age': 36, 'blocked': false },
	     *   { 'name': 'fred',    'age': 40, 'blocked': true },
	     *   { 'name': 'pebbles', 'age': 1,  'blocked': false }
	     * ];
	     *
	     * _.findIndex(characters, function(chr) {
	     *   return chr.age < 20;
	     * });
	     * // => 2
	     *
	     * // using "_.where" callback shorthand
	     * _.findIndex(characters, { 'age': 36 });
	     * // => 0
	     *
	     * // using "_.pluck" callback shorthand
	     * _.findIndex(characters, 'blocked');
	     * // => 1
	     */
	    function findIndex(array, callback, thisArg) {
	      var index = -1,
	          length = array ? array.length : 0;
	
	      callback = lodash.createCallback(callback, thisArg, 3);
	      while (++index < length) {
	        if (callback(array[index], index, array)) {
	          return index;
	        }
	      }
	      return -1;
	    }
	
	    /**
	     * This method is like `_.findIndex` except that it iterates over elements
	     * of a `collection` from right to left.
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to search.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {number} Returns the index of the found element, else `-1`.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'age': 36, 'blocked': true },
	     *   { 'name': 'fred',    'age': 40, 'blocked': false },
	     *   { 'name': 'pebbles', 'age': 1,  'blocked': true }
	     * ];
	     *
	     * _.findLastIndex(characters, function(chr) {
	     *   return chr.age > 30;
	     * });
	     * // => 1
	     *
	     * // using "_.where" callback shorthand
	     * _.findLastIndex(characters, { 'age': 36 });
	     * // => 0
	     *
	     * // using "_.pluck" callback shorthand
	     * _.findLastIndex(characters, 'blocked');
	     * // => 2
	     */
	    function findLastIndex(array, callback, thisArg) {
	      var length = array ? array.length : 0;
	      callback = lodash.createCallback(callback, thisArg, 3);
	      while (length--) {
	        if (callback(array[length], length, array)) {
	          return length;
	        }
	      }
	      return -1;
	    }
	
	    /**
	     * Gets the first element or first `n` elements of an array. If a callback
	     * is provided elements at the beginning of the array are returned as long
	     * as the callback returns truey. The callback is bound to `thisArg` and
	     * invoked with three arguments; (value, index, array).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias head, take
	     * @category Arrays
	     * @param {Array} array The array to query.
	     * @param {Function|Object|number|string} [callback] The function called
	     *  per element or the number of elements to return. If a property name or
	     *  object is provided it will be used to create a "_.pluck" or "_.where"
	     *  style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the first element(s) of `array`.
	     * @example
	     *
	     * _.first([1, 2, 3]);
	     * // => 1
	     *
	     * _.first([1, 2, 3], 2);
	     * // => [1, 2]
	     *
	     * _.first([1, 2, 3], function(num) {
	     *   return num < 3;
	     * });
	     * // => [1, 2]
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'blocked': true,  'employer': 'slate' },
	     *   { 'name': 'fred',    'blocked': false, 'employer': 'slate' },
	     *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.first(characters, 'blocked');
	     * // => [{ 'name': 'barney', 'blocked': true, 'employer': 'slate' }]
	     *
	     * // using "_.where" callback shorthand
	     * _.pluck(_.first(characters, { 'employer': 'slate' }), 'name');
	     * // => ['barney', 'fred']
	     */
	    function first(array, callback, thisArg) {
	      var n = 0,
	          length = array ? array.length : 0;
	
	      if (typeof callback != 'number' && callback != null) {
	        var index = -1;
	        callback = lodash.createCallback(callback, thisArg, 3);
	        while (++index < length && callback(array[index], index, array)) {
	          n++;
	        }
	      } else {
	        n = callback;
	        if (n == null || thisArg) {
	          return array ? array[0] : undefined;
	        }
	      }
	      return slice(array, 0, nativeMin(nativeMax(0, n), length));
	    }
	
	    /**
	     * Flattens a nested array (the nesting can be to any depth). If `isShallow`
	     * is truey, the array will only be flattened a single level. If a callback
	     * is provided each element of the array is passed through the callback before
	     * flattening. The callback is bound to `thisArg` and invoked with three
	     * arguments; (value, index, array).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to flatten.
	     * @param {boolean} [isShallow=false] A flag to restrict flattening to a single level.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a new flattened array.
	     * @example
	     *
	     * _.flatten([1, [2], [3, [[4]]]]);
	     * // => [1, 2, 3, 4];
	     *
	     * _.flatten([1, [2], [3, [[4]]]], true);
	     * // => [1, 2, 3, [[4]]];
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 30, 'pets': ['hoppy'] },
	     *   { 'name': 'fred',   'age': 40, 'pets': ['baby puss', 'dino'] }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.flatten(characters, 'pets');
	     * // => ['hoppy', 'baby puss', 'dino']
	     */
	    function flatten(array, isShallow, callback, thisArg) {
	      // juggle arguments
	      if (typeof isShallow != 'boolean' && isShallow != null) {
	        thisArg = callback;
	        callback = (typeof isShallow != 'function' && thisArg && thisArg[isShallow] === array) ? null : isShallow;
	        isShallow = false;
	      }
	      if (callback != null) {
	        array = map(array, callback, thisArg);
	      }
	      return baseFlatten(array, isShallow);
	    }
	
	    /**
	     * Gets the index at which the first occurrence of `value` is found using
	     * strict equality for comparisons, i.e. `===`. If the array is already sorted
	     * providing `true` for `fromIndex` will run a faster binary search.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to search.
	     * @param {*} value The value to search for.
	     * @param {boolean|number} [fromIndex=0] The index to search from or `true`
	     *  to perform a binary search on a sorted array.
	     * @returns {number} Returns the index of the matched value or `-1`.
	     * @example
	     *
	     * _.indexOf([1, 2, 3, 1, 2, 3], 2);
	     * // => 1
	     *
	     * _.indexOf([1, 2, 3, 1, 2, 3], 2, 3);
	     * // => 4
	     *
	     * _.indexOf([1, 1, 2, 2, 3, 3], 2, true);
	     * // => 2
	     */
	    function indexOf(array, value, fromIndex) {
	      if (typeof fromIndex == 'number') {
	        var length = array ? array.length : 0;
	        fromIndex = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex || 0);
	      } else if (fromIndex) {
	        var index = sortedIndex(array, value);
	        return array[index] === value ? index : -1;
	      }
	      return baseIndexOf(array, value, fromIndex);
	    }
	
	    /**
	     * Gets all but the last element or last `n` elements of an array. If a
	     * callback is provided elements at the end of the array are excluded from
	     * the result as long as the callback returns truey. The callback is bound
	     * to `thisArg` and invoked with three arguments; (value, index, array).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to query.
	     * @param {Function|Object|number|string} [callback=1] The function called
	     *  per element or the number of elements to exclude. If a property name or
	     *  object is provided it will be used to create a "_.pluck" or "_.where"
	     *  style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a slice of `array`.
	     * @example
	     *
	     * _.initial([1, 2, 3]);
	     * // => [1, 2]
	     *
	     * _.initial([1, 2, 3], 2);
	     * // => [1]
	     *
	     * _.initial([1, 2, 3], function(num) {
	     *   return num > 1;
	     * });
	     * // => [1]
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'blocked': false, 'employer': 'slate' },
	     *   { 'name': 'fred',    'blocked': true,  'employer': 'slate' },
	     *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.initial(characters, 'blocked');
	     * // => [{ 'name': 'barney',  'blocked': false, 'employer': 'slate' }]
	     *
	     * // using "_.where" callback shorthand
	     * _.pluck(_.initial(characters, { 'employer': 'na' }), 'name');
	     * // => ['barney', 'fred']
	     */
	    function initial(array, callback, thisArg) {
	      var n = 0,
	          length = array ? array.length : 0;
	
	      if (typeof callback != 'number' && callback != null) {
	        var index = length;
	        callback = lodash.createCallback(callback, thisArg, 3);
	        while (index-- && callback(array[index], index, array)) {
	          n++;
	        }
	      } else {
	        n = (callback == null || thisArg) ? 1 : callback || n;
	      }
	      return slice(array, 0, nativeMin(nativeMax(0, length - n), length));
	    }
	
	    /**
	     * Creates an array of unique values present in all provided arrays using
	     * strict equality for comparisons, i.e. `===`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {...Array} [array] The arrays to inspect.
	     * @returns {Array} Returns an array of shared values.
	     * @example
	     *
	     * _.intersection([1, 2, 3], [5, 2, 1, 4], [2, 1]);
	     * // => [1, 2]
	     */
	    function intersection() {
	      var args = [],
	          argsIndex = -1,
	          argsLength = arguments.length,
	          caches = getArray(),
	          indexOf = getIndexOf(),
	          trustIndexOf = indexOf === baseIndexOf,
	          seen = getArray();
	
	      while (++argsIndex < argsLength) {
	        var value = arguments[argsIndex];
	        if (isArray(value) || isArguments(value)) {
	          args.push(value);
	          caches.push(trustIndexOf && value.length >= largeArraySize &&
	            createCache(argsIndex ? args[argsIndex] : seen));
	        }
	      }
	      var array = args[0],
	          index = -1,
	          length = array ? array.length : 0,
	          result = [];
	
	      outer:
	      while (++index < length) {
	        var cache = caches[0];
	        value = array[index];
	
	        if ((cache ? cacheIndexOf(cache, value) : indexOf(seen, value)) < 0) {
	          argsIndex = argsLength;
	          (cache || seen).push(value);
	          while (--argsIndex) {
	            cache = caches[argsIndex];
	            if ((cache ? cacheIndexOf(cache, value) : indexOf(args[argsIndex], value)) < 0) {
	              continue outer;
	            }
	          }
	          result.push(value);
	        }
	      }
	      while (argsLength--) {
	        cache = caches[argsLength];
	        if (cache) {
	          releaseObject(cache);
	        }
	      }
	      releaseArray(caches);
	      releaseArray(seen);
	      return result;
	    }
	
	    /**
	     * Gets the last element or last `n` elements of an array. If a callback is
	     * provided elements at the end of the array are returned as long as the
	     * callback returns truey. The callback is bound to `thisArg` and invoked
	     * with three arguments; (value, index, array).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to query.
	     * @param {Function|Object|number|string} [callback] The function called
	     *  per element or the number of elements to return. If a property name or
	     *  object is provided it will be used to create a "_.pluck" or "_.where"
	     *  style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the last element(s) of `array`.
	     * @example
	     *
	     * _.last([1, 2, 3]);
	     * // => 3
	     *
	     * _.last([1, 2, 3], 2);
	     * // => [2, 3]
	     *
	     * _.last([1, 2, 3], function(num) {
	     *   return num > 1;
	     * });
	     * // => [2, 3]
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'blocked': false, 'employer': 'slate' },
	     *   { 'name': 'fred',    'blocked': true,  'employer': 'slate' },
	     *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.pluck(_.last(characters, 'blocked'), 'name');
	     * // => ['fred', 'pebbles']
	     *
	     * // using "_.where" callback shorthand
	     * _.last(characters, { 'employer': 'na' });
	     * // => [{ 'name': 'pebbles', 'blocked': true, 'employer': 'na' }]
	     */
	    function last(array, callback, thisArg) {
	      var n = 0,
	          length = array ? array.length : 0;
	
	      if (typeof callback != 'number' && callback != null) {
	        var index = length;
	        callback = lodash.createCallback(callback, thisArg, 3);
	        while (index-- && callback(array[index], index, array)) {
	          n++;
	        }
	      } else {
	        n = callback;
	        if (n == null || thisArg) {
	          return array ? array[length - 1] : undefined;
	        }
	      }
	      return slice(array, nativeMax(0, length - n));
	    }
	
	    /**
	     * Gets the index at which the last occurrence of `value` is found using strict
	     * equality for comparisons, i.e. `===`. If `fromIndex` is negative, it is used
	     * as the offset from the end of the collection.
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to search.
	     * @param {*} value The value to search for.
	     * @param {number} [fromIndex=array.length-1] The index to search from.
	     * @returns {number} Returns the index of the matched value or `-1`.
	     * @example
	     *
	     * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2);
	     * // => 4
	     *
	     * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2, 3);
	     * // => 1
	     */
	    function lastIndexOf(array, value, fromIndex) {
	      var index = array ? array.length : 0;
	      if (typeof fromIndex == 'number') {
	        index = (fromIndex < 0 ? nativeMax(0, index + fromIndex) : nativeMin(fromIndex, index - 1)) + 1;
	      }
	      while (index--) {
	        if (array[index] === value) {
	          return index;
	        }
	      }
	      return -1;
	    }
	
	    /**
	     * Removes all provided values from the given array using strict equality for
	     * comparisons, i.e. `===`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to modify.
	     * @param {...*} [value] The values to remove.
	     * @returns {Array} Returns `array`.
	     * @example
	     *
	     * var array = [1, 2, 3, 1, 2, 3];
	     * _.pull(array, 2, 3);
	     * console.log(array);
	     * // => [1, 1]
	     */
	    function pull(array) {
	      var args = arguments,
	          argsIndex = 0,
	          argsLength = args.length,
	          length = array ? array.length : 0;
	
	      while (++argsIndex < argsLength) {
	        var index = -1,
	            value = args[argsIndex];
	        while (++index < length) {
	          if (array[index] === value) {
	            splice.call(array, index--, 1);
	            length--;
	          }
	        }
	      }
	      return array;
	    }
	
	    /**
	     * Creates an array of numbers (positive and/or negative) progressing from
	     * `start` up to but not including `end`. If `start` is less than `stop` a
	     * zero-length range is created unless a negative `step` is specified.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {number} [start=0] The start of the range.
	     * @param {number} end The end of the range.
	     * @param {number} [step=1] The value to increment or decrement by.
	     * @returns {Array} Returns a new range array.
	     * @example
	     *
	     * _.range(4);
	     * // => [0, 1, 2, 3]
	     *
	     * _.range(1, 5);
	     * // => [1, 2, 3, 4]
	     *
	     * _.range(0, 20, 5);
	     * // => [0, 5, 10, 15]
	     *
	     * _.range(0, -4, -1);
	     * // => [0, -1, -2, -3]
	     *
	     * _.range(1, 4, 0);
	     * // => [1, 1, 1]
	     *
	     * _.range(0);
	     * // => []
	     */
	    function range(start, end, step) {
	      start = +start || 0;
	      step = typeof step == 'number' ? step : (+step || 1);
	
	      if (end == null) {
	        end = start;
	        start = 0;
	      }
	      // use `Array(length)` so engines like Chakra and V8 avoid slower modes
	      // http://youtu.be/XAqIpGU8ZZk#t=17m25s
	      var index = -1,
	          length = nativeMax(0, ceil((end - start) / (step || 1))),
	          result = Array(length);
	
	      while (++index < length) {
	        result[index] = start;
	        start += step;
	      }
	      return result;
	    }
	
	    /**
	     * Removes all elements from an array that the callback returns truey for
	     * and returns an array of removed elements. The callback is bound to `thisArg`
	     * and invoked with three arguments; (value, index, array).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to modify.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a new array of removed elements.
	     * @example
	     *
	     * var array = [1, 2, 3, 4, 5, 6];
	     * var evens = _.remove(array, function(num) { return num % 2 == 0; });
	     *
	     * console.log(array);
	     * // => [1, 3, 5]
	     *
	     * console.log(evens);
	     * // => [2, 4, 6]
	     */
	    function remove(array, callback, thisArg) {
	      var index = -1,
	          length = array ? array.length : 0,
	          result = [];
	
	      callback = lodash.createCallback(callback, thisArg, 3);
	      while (++index < length) {
	        var value = array[index];
	        if (callback(value, index, array)) {
	          result.push(value);
	          splice.call(array, index--, 1);
	          length--;
	        }
	      }
	      return result;
	    }
	
	    /**
	     * The opposite of `_.initial` this method gets all but the first element or
	     * first `n` elements of an array. If a callback function is provided elements
	     * at the beginning of the array are excluded from the result as long as the
	     * callback returns truey. The callback is bound to `thisArg` and invoked
	     * with three arguments; (value, index, array).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias drop, tail
	     * @category Arrays
	     * @param {Array} array The array to query.
	     * @param {Function|Object|number|string} [callback=1] The function called
	     *  per element or the number of elements to exclude. If a property name or
	     *  object is provided it will be used to create a "_.pluck" or "_.where"
	     *  style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a slice of `array`.
	     * @example
	     *
	     * _.rest([1, 2, 3]);
	     * // => [2, 3]
	     *
	     * _.rest([1, 2, 3], 2);
	     * // => [3]
	     *
	     * _.rest([1, 2, 3], function(num) {
	     *   return num < 3;
	     * });
	     * // => [3]
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'blocked': true,  'employer': 'slate' },
	     *   { 'name': 'fred',    'blocked': false,  'employer': 'slate' },
	     *   { 'name': 'pebbles', 'blocked': true, 'employer': 'na' }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.pluck(_.rest(characters, 'blocked'), 'name');
	     * // => ['fred', 'pebbles']
	     *
	     * // using "_.where" callback shorthand
	     * _.rest(characters, { 'employer': 'slate' });
	     * // => [{ 'name': 'pebbles', 'blocked': true, 'employer': 'na' }]
	     */
	    function rest(array, callback, thisArg) {
	      if (typeof callback != 'number' && callback != null) {
	        var n = 0,
	            index = -1,
	            length = array ? array.length : 0;
	
	        callback = lodash.createCallback(callback, thisArg, 3);
	        while (++index < length && callback(array[index], index, array)) {
	          n++;
	        }
	      } else {
	        n = (callback == null || thisArg) ? 1 : nativeMax(0, callback);
	      }
	      return slice(array, n);
	    }
	
	    /**
	     * Uses a binary search to determine the smallest index at which a value
	     * should be inserted into a given sorted array in order to maintain the sort
	     * order of the array. If a callback is provided it will be executed for
	     * `value` and each element of `array` to compute their sort ranking. The
	     * callback is bound to `thisArg` and invoked with one argument; (value).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     * @example
	     *
	     * _.sortedIndex([20, 30, 50], 40);
	     * // => 2
	     *
	     * // using "_.pluck" callback shorthand
	     * _.sortedIndex([{ 'x': 20 }, { 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
	     * // => 2
	     *
	     * var dict = {
	     *   'wordToNumber': { 'twenty': 20, 'thirty': 30, 'fourty': 40, 'fifty': 50 }
	     * };
	     *
	     * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {
	     *   return dict.wordToNumber[word];
	     * });
	     * // => 2
	     *
	     * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {
	     *   return this.wordToNumber[word];
	     * }, dict);
	     * // => 2
	     */
	    function sortedIndex(array, value, callback, thisArg) {
	      var low = 0,
	          high = array ? array.length : low;
	
	      // explicitly reference `identity` for better inlining in Firefox
	      callback = callback ? lodash.createCallback(callback, thisArg, 1) : identity;
	      value = callback(value);
	
	      while (low < high) {
	        var mid = (low + high) >>> 1;
	        (callback(array[mid]) < value)
	          ? low = mid + 1
	          : high = mid;
	      }
	      return low;
	    }
	
	    /**
	     * Creates an array of unique values, in order, of the provided arrays using
	     * strict equality for comparisons, i.e. `===`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {...Array} [array] The arrays to inspect.
	     * @returns {Array} Returns an array of combined values.
	     * @example
	     *
	     * _.union([1, 2, 3], [5, 2, 1, 4], [2, 1]);
	     * // => [1, 2, 3, 5, 4]
	     */
	    function union() {
	      return baseUniq(baseFlatten(arguments, true, true));
	    }
	
	    /**
	     * Creates a duplicate-value-free version of an array using strict equality
	     * for comparisons, i.e. `===`. If the array is sorted, providing
	     * `true` for `isSorted` will use a faster algorithm. If a callback is provided
	     * each element of `array` is passed through the callback before uniqueness
	     * is computed. The callback is bound to `thisArg` and invoked with three
	     * arguments; (value, index, array).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias unique
	     * @category Arrays
	     * @param {Array} array The array to process.
	     * @param {boolean} [isSorted=false] A flag to indicate that `array` is sorted.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a duplicate-value-free array.
	     * @example
	     *
	     * _.uniq([1, 2, 1, 3, 1]);
	     * // => [1, 2, 3]
	     *
	     * _.uniq([1, 1, 2, 2, 3], true);
	     * // => [1, 2, 3]
	     *
	     * _.uniq(['A', 'b', 'C', 'a', 'B', 'c'], function(letter) { return letter.toLowerCase(); });
	     * // => ['A', 'b', 'C']
	     *
	     * _.uniq([1, 2.5, 3, 1.5, 2, 3.5], function(num) { return this.floor(num); }, Math);
	     * // => [1, 2.5, 3]
	     *
	     * // using "_.pluck" callback shorthand
	     * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
	     * // => [{ 'x': 1 }, { 'x': 2 }]
	     */
	    function uniq(array, isSorted, callback, thisArg) {
	      // juggle arguments
	      if (typeof isSorted != 'boolean' && isSorted != null) {
	        thisArg = callback;
	        callback = (typeof isSorted != 'function' && thisArg && thisArg[isSorted] === array) ? null : isSorted;
	        isSorted = false;
	      }
	      if (callback != null) {
	        callback = lodash.createCallback(callback, thisArg, 3);
	      }
	      return baseUniq(array, isSorted, callback);
	    }
	
	    /**
	     * Creates an array excluding all provided values using strict equality for
	     * comparisons, i.e. `===`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to filter.
	     * @param {...*} [value] The values to exclude.
	     * @returns {Array} Returns a new array of filtered values.
	     * @example
	     *
	     * _.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
	     * // => [2, 3, 4]
	     */
	    function without(array) {
	      return baseDifference(array, slice(arguments, 1));
	    }
	
	    /**
	     * Creates an array that is the symmetric difference of the provided arrays.
	     * See http://en.wikipedia.org/wiki/Symmetric_difference.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {...Array} [array] The arrays to inspect.
	     * @returns {Array} Returns an array of values.
	     * @example
	     *
	     * _.xor([1, 2, 3], [5, 2, 1, 4]);
	     * // => [3, 5, 4]
	     *
	     * _.xor([1, 2, 5], [2, 3, 5], [3, 4, 5]);
	     * // => [1, 4, 5]
	     */
	    function xor() {
	      var index = -1,
	          length = arguments.length;
	
	      while (++index < length) {
	        var array = arguments[index];
	        if (isArray(array) || isArguments(array)) {
	          var result = result
	            ? baseUniq(baseDifference(result, array).concat(baseDifference(array, result)))
	            : array;
	        }
	      }
	      return result || [];
	    }
	
	    /**
	     * Creates an array of grouped elements, the first of which contains the first
	     * elements of the given arrays, the second of which contains the second
	     * elements of the given arrays, and so on.
	     *
	     * @static
	     * @memberOf _
	     * @alias unzip
	     * @category Arrays
	     * @param {...Array} [array] Arrays to process.
	     * @returns {Array} Returns a new array of grouped elements.
	     * @example
	     *
	     * _.zip(['fred', 'barney'], [30, 40], [true, false]);
	     * // => [['fred', 30, true], ['barney', 40, false]]
	     */
	    function zip() {
	      var array = arguments.length > 1 ? arguments : arguments[0],
	          index = -1,
	          length = array ? max(pluck(array, 'length')) : 0,
	          result = Array(length < 0 ? 0 : length);
	
	      while (++index < length) {
	        result[index] = pluck(array, index);
	      }
	      return result;
	    }
	
	    /**
	     * Creates an object composed from arrays of `keys` and `values`. Provide
	     * either a single two dimensional array, i.e. `[[key1, value1], [key2, value2]]`
	     * or two arrays, one of `keys` and one of corresponding `values`.
	     *
	     * @static
	     * @memberOf _
	     * @alias object
	     * @category Arrays
	     * @param {Array} keys The array of keys.
	     * @param {Array} [values=[]] The array of values.
	     * @returns {Object} Returns an object composed of the given keys and
	     *  corresponding values.
	     * @example
	     *
	     * _.zipObject(['fred', 'barney'], [30, 40]);
	     * // => { 'fred': 30, 'barney': 40 }
	     */
	    function zipObject(keys, values) {
	      var index = -1,
	          length = keys ? keys.length : 0,
	          result = {};
	
	      if (!values && length && !isArray(keys[0])) {
	        values = [];
	      }
	      while (++index < length) {
	        var key = keys[index];
	        if (values) {
	          result[key] = values[index];
	        } else if (key) {
	          result[key[0]] = key[1];
	        }
	      }
	      return result;
	    }
	
	    /*--------------------------------------------------------------------------*/
	
	    /**
	     * Creates a function that executes `func`, with  the `this` binding and
	     * arguments of the created function, only after being called `n` times.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {number} n The number of times the function must be called before
	     *  `func` is executed.
	     * @param {Function} func The function to restrict.
	     * @returns {Function} Returns the new restricted function.
	     * @example
	     *
	     * var saves = ['profile', 'settings'];
	     *
	     * var done = _.after(saves.length, function() {
	     *   console.log('Done saving!');
	     * });
	     *
	     * _.forEach(saves, function(type) {
	     *   asyncSave({ 'type': type, 'complete': done });
	     * });
	     * // => logs 'Done saving!', after all saves have completed
	     */
	    function after(n, func) {
	      if (!isFunction(func)) {
	        throw new TypeError;
	      }
	      return function() {
	        if (--n < 1) {
	          return func.apply(this, arguments);
	        }
	      };
	    }
	
	    /**
	     * Creates a function that, when called, invokes `func` with the `this`
	     * binding of `thisArg` and prepends any additional `bind` arguments to those
	     * provided to the bound function.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to bind.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param {...*} [arg] Arguments to be partially applied.
	     * @returns {Function} Returns the new bound function.
	     * @example
	     *
	     * var func = function(greeting) {
	     *   return greeting + ' ' + this.name;
	     * };
	     *
	     * func = _.bind(func, { 'name': 'fred' }, 'hi');
	     * func();
	     * // => 'hi fred'
	     */
	    function bind(func, thisArg) {
	      return arguments.length > 2
	        ? createWrapper(func, 17, slice(arguments, 2), null, thisArg)
	        : createWrapper(func, 1, null, null, thisArg);
	    }
	
	    /**
	     * Binds methods of an object to the object itself, overwriting the existing
	     * method. Method names may be specified as individual arguments or as arrays
	     * of method names. If no method names are provided all the function properties
	     * of `object` will be bound.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Object} object The object to bind and assign the bound methods to.
	     * @param {...string} [methodName] The object method names to
	     *  bind, specified as individual method names or arrays of method names.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * var view = {
	     *   'label': 'docs',
	     *   'onClick': function() { console.log('clicked ' + this.label); }
	     * };
	     *
	     * _.bindAll(view);
	     * jQuery('#docs').on('click', view.onClick);
	     * // => logs 'clicked docs', when the button is clicked
	     */
	    function bindAll(object) {
	      var funcs = arguments.length > 1 ? baseFlatten(arguments, true, false, 1) : functions(object),
	          index = -1,
	          length = funcs.length;
	
	      while (++index < length) {
	        var key = funcs[index];
	        object[key] = createWrapper(object[key], 1, null, null, object);
	      }
	      return object;
	    }
	
	    /**
	     * Creates a function that, when called, invokes the method at `object[key]`
	     * and prepends any additional `bindKey` arguments to those provided to the bound
	     * function. This method differs from `_.bind` by allowing bound functions to
	     * reference methods that will be redefined or don't yet exist.
	     * See http://michaux.ca/articles/lazy-function-definition-pattern.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Object} object The object the method belongs to.
	     * @param {string} key The key of the method.
	     * @param {...*} [arg] Arguments to be partially applied.
	     * @returns {Function} Returns the new bound function.
	     * @example
	     *
	     * var object = {
	     *   'name': 'fred',
	     *   'greet': function(greeting) {
	     *     return greeting + ' ' + this.name;
	     *   }
	     * };
	     *
	     * var func = _.bindKey(object, 'greet', 'hi');
	     * func();
	     * // => 'hi fred'
	     *
	     * object.greet = function(greeting) {
	     *   return greeting + 'ya ' + this.name + '!';
	     * };
	     *
	     * func();
	     * // => 'hiya fred!'
	     */
	    function bindKey(object, key) {
	      return arguments.length > 2
	        ? createWrapper(key, 19, slice(arguments, 2), null, object)
	        : createWrapper(key, 3, null, null, object);
	    }
	
	    /**
	     * Creates a function that is the composition of the provided functions,
	     * where each function consumes the return value of the function that follows.
	     * For example, composing the functions `f()`, `g()`, and `h()` produces `f(g(h()))`.
	     * Each function is executed with the `this` binding of the composed function.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {...Function} [func] Functions to compose.
	     * @returns {Function} Returns the new composed function.
	     * @example
	     *
	     * var realNameMap = {
	     *   'pebbles': 'penelope'
	     * };
	     *
	     * var format = function(name) {
	     *   name = realNameMap[name.toLowerCase()] || name;
	     *   return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
	     * };
	     *
	     * var greet = function(formatted) {
	     *   return 'Hiya ' + formatted + '!';
	     * };
	     *
	     * var welcome = _.compose(greet, format);
	     * welcome('pebbles');
	     * // => 'Hiya Penelope!'
	     */
	    function compose() {
	      var funcs = arguments,
	          length = funcs.length;
	
	      while (length--) {
	        if (!isFunction(funcs[length])) {
	          throw new TypeError;
	        }
	      }
	      return function() {
	        var args = arguments,
	            length = funcs.length;
	
	        while (length--) {
	          args = [funcs[length].apply(this, args)];
	        }
	        return args[0];
	      };
	    }
	
	    /**
	     * Creates a function which accepts one or more arguments of `func` that when
	     * invoked either executes `func` returning its result, if all `func` arguments
	     * have been provided, or returns a function that accepts one or more of the
	     * remaining `func` arguments, and so on. The arity of `func` can be specified
	     * if `func.length` is not sufficient.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to curry.
	     * @param {number} [arity=func.length] The arity of `func`.
	     * @returns {Function} Returns the new curried function.
	     * @example
	     *
	     * var curried = _.curry(function(a, b, c) {
	     *   console.log(a + b + c);
	     * });
	     *
	     * curried(1)(2)(3);
	     * // => 6
	     *
	     * curried(1, 2)(3);
	     * // => 6
	     *
	     * curried(1, 2, 3);
	     * // => 6
	     */
	    function curry(func, arity) {
	      arity = typeof arity == 'number' ? arity : (+arity || func.length);
	      return createWrapper(func, 4, null, null, null, arity);
	    }
	
	    /**
	     * Creates a function that will delay the execution of `func` until after
	     * `wait` milliseconds have elapsed since the last time it was invoked.
	     * Provide an options object to indicate that `func` should be invoked on
	     * the leading and/or trailing edge of the `wait` timeout. Subsequent calls
	     * to the debounced function will return the result of the last `func` call.
	     *
	     * Note: If `leading` and `trailing` options are `true` `func` will be called
	     * on the trailing edge of the timeout only if the the debounced function is
	     * invoked more than once during the `wait` timeout.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to debounce.
	     * @param {number} wait The number of milliseconds to delay.
	     * @param {Object} [options] The options object.
	     * @param {boolean} [options.leading=false] Specify execution on the leading edge of the timeout.
	     * @param {number} [options.maxWait] The maximum time `func` is allowed to be delayed before it's called.
	     * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.
	     * @returns {Function} Returns the new debounced function.
	     * @example
	     *
	     * // avoid costly calculations while the window size is in flux
	     * var lazyLayout = _.debounce(calculateLayout, 150);
	     * jQuery(window).on('resize', lazyLayout);
	     *
	     * // execute `sendMail` when the click event is fired, debouncing subsequent calls
	     * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
	     *   'leading': true,
	     *   'trailing': false
	     * });
	     *
	     * // ensure `batchLog` is executed once after 1 second of debounced calls
	     * var source = new EventSource('/stream');
	     * source.addEventListener('message', _.debounce(batchLog, 250, {
	     *   'maxWait': 1000
	     * }, false);
	     */
	    function debounce(func, wait, options) {
	      var args,
	          maxTimeoutId,
	          result,
	          stamp,
	          thisArg,
	          timeoutId,
	          trailingCall,
	          lastCalled = 0,
	          maxWait = false,
	          trailing = true;
	
	      if (!isFunction(func)) {
	        throw new TypeError;
	      }
	      wait = nativeMax(0, wait) || 0;
	      if (options === true) {
	        var leading = true;
	        trailing = false;
	      } else if (isObject(options)) {
	        leading = options.leading;
	        maxWait = 'maxWait' in options && (nativeMax(wait, options.maxWait) || 0);
	        trailing = 'trailing' in options ? options.trailing : trailing;
	      }
	      var delayed = function() {
	        var remaining = wait - (now() - stamp);
	        if (remaining <= 0) {
	          if (maxTimeoutId) {
	            clearTimeout(maxTimeoutId);
	          }
	          var isCalled = trailingCall;
	          maxTimeoutId = timeoutId = trailingCall = undefined;
	          if (isCalled) {
	            lastCalled = now();
	            result = func.apply(thisArg, args);
	            if (!timeoutId && !maxTimeoutId) {
	              args = thisArg = null;
	            }
	          }
	        } else {
	          timeoutId = setTimeout(delayed, remaining);
	        }
	      };
	
	      var maxDelayed = function() {
	        if (timeoutId) {
	          clearTimeout(timeoutId);
	        }
	        maxTimeoutId = timeoutId = trailingCall = undefined;
	        if (trailing || (maxWait !== wait)) {
	          lastCalled = now();
	          result = func.apply(thisArg, args);
	          if (!timeoutId && !maxTimeoutId) {
	            args = thisArg = null;
	          }
	        }
	      };
	
	      return function() {
	        args = arguments;
	        stamp = now();
	        thisArg = this;
	        trailingCall = trailing && (timeoutId || !leading);
	
	        if (maxWait === false) {
	          var leadingCall = leading && !timeoutId;
	        } else {
	          if (!maxTimeoutId && !leading) {
	            lastCalled = stamp;
	          }
	          var remaining = maxWait - (stamp - lastCalled),
	              isCalled = remaining <= 0;
	
	          if (isCalled) {
	            if (maxTimeoutId) {
	              maxTimeoutId = clearTimeout(maxTimeoutId);
	            }
	            lastCalled = stamp;
	            result = func.apply(thisArg, args);
	          }
	          else if (!maxTimeoutId) {
	            maxTimeoutId = setTimeout(maxDelayed, remaining);
	          }
	        }
	        if (isCalled && timeoutId) {
	          timeoutId = clearTimeout(timeoutId);
	        }
	        else if (!timeoutId && wait !== maxWait) {
	          timeoutId = setTimeout(delayed, wait);
	        }
	        if (leadingCall) {
	          isCalled = true;
	          result = func.apply(thisArg, args);
	        }
	        if (isCalled && !timeoutId && !maxTimeoutId) {
	          args = thisArg = null;
	        }
	        return result;
	      };
	    }
	
	    /**
	     * Defers executing the `func` function until the current call stack has cleared.
	     * Additional arguments will be provided to `func` when it is invoked.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to defer.
	     * @param {...*} [arg] Arguments to invoke the function with.
	     * @returns {number} Returns the timer id.
	     * @example
	     *
	     * _.defer(function(text) { console.log(text); }, 'deferred');
	     * // logs 'deferred' after one or more milliseconds
	     */
	    function defer(func) {
	      if (!isFunction(func)) {
	        throw new TypeError;
	      }
	      var args = slice(arguments, 1);
	      return setTimeout(function() { func.apply(undefined, args); }, 1);
	    }
	
	    /**
	     * Executes the `func` function after `wait` milliseconds. Additional arguments
	     * will be provided to `func` when it is invoked.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to delay.
	     * @param {number} wait The number of milliseconds to delay execution.
	     * @param {...*} [arg] Arguments to invoke the function with.
	     * @returns {number} Returns the timer id.
	     * @example
	     *
	     * _.delay(function(text) { console.log(text); }, 1000, 'later');
	     * // => logs 'later' after one second
	     */
	    function delay(func, wait) {
	      if (!isFunction(func)) {
	        throw new TypeError;
	      }
	      var args = slice(arguments, 2);
	      return setTimeout(function() { func.apply(undefined, args); }, wait);
	    }
	
	    /**
	     * Creates a function that memoizes the result of `func`. If `resolver` is
	     * provided it will be used to determine the cache key for storing the result
	     * based on the arguments provided to the memoized function. By default, the
	     * first argument provided to the memoized function is used as the cache key.
	     * The `func` is executed with the `this` binding of the memoized function.
	     * The result cache is exposed as the `cache` property on the memoized function.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to have its output memoized.
	     * @param {Function} [resolver] A function used to resolve the cache key.
	     * @returns {Function} Returns the new memoizing function.
	     * @example
	     *
	     * var fibonacci = _.memoize(function(n) {
	     *   return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
	     * });
	     *
	     * fibonacci(9)
	     * // => 34
	     *
	     * var data = {
	     *   'fred': { 'name': 'fred', 'age': 40 },
	     *   'pebbles': { 'name': 'pebbles', 'age': 1 }
	     * };
	     *
	     * // modifying the result cache
	     * var get = _.memoize(function(name) { return data[name]; }, _.identity);
	     * get('pebbles');
	     * // => { 'name': 'pebbles', 'age': 1 }
	     *
	     * get.cache.pebbles.name = 'penelope';
	     * get('pebbles');
	     * // => { 'name': 'penelope', 'age': 1 }
	     */
	    function memoize(func, resolver) {
	      if (!isFunction(func)) {
	        throw new TypeError;
	      }
	      var memoized = function() {
	        var cache = memoized.cache,
	            key = resolver ? resolver.apply(this, arguments) : keyPrefix + arguments[0];
	
	        return hasOwnProperty.call(cache, key)
	          ? cache[key]
	          : (cache[key] = func.apply(this, arguments));
	      }
	      memoized.cache = {};
	      return memoized;
	    }
	
	    /**
	     * Creates a function that is restricted to execute `func` once. Repeat calls to
	     * the function will return the value of the first call. The `func` is executed
	     * with the `this` binding of the created function.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to restrict.
	     * @returns {Function} Returns the new restricted function.
	     * @example
	     *
	     * var initialize = _.once(createApplication);
	     * initialize();
	     * initialize();
	     * // `initialize` executes `createApplication` once
	     */
	    function once(func) {
	      var ran,
	          result;
	
	      if (!isFunction(func)) {
	        throw new TypeError;
	      }
	      return function() {
	        if (ran) {
	          return result;
	        }
	        ran = true;
	        result = func.apply(this, arguments);
	
	        // clear the `func` variable so the function may be garbage collected
	        func = null;
	        return result;
	      };
	    }
	
	    /**
	     * Creates a function that, when called, invokes `func` with any additional
	     * `partial` arguments prepended to those provided to the new function. This
	     * method is similar to `_.bind` except it does **not** alter the `this` binding.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to partially apply arguments to.
	     * @param {...*} [arg] Arguments to be partially applied.
	     * @returns {Function} Returns the new partially applied function.
	     * @example
	     *
	     * var greet = function(greeting, name) { return greeting + ' ' + name; };
	     * var hi = _.partial(greet, 'hi');
	     * hi('fred');
	     * // => 'hi fred'
	     */
	    function partial(func) {
	      return createWrapper(func, 16, slice(arguments, 1));
	    }
	
	    /**
	     * This method is like `_.partial` except that `partial` arguments are
	     * appended to those provided to the new function.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to partially apply arguments to.
	     * @param {...*} [arg] Arguments to be partially applied.
	     * @returns {Function} Returns the new partially applied function.
	     * @example
	     *
	     * var defaultsDeep = _.partialRight(_.merge, _.defaults);
	     *
	     * var options = {
	     *   'variable': 'data',
	     *   'imports': { 'jq': $ }
	     * };
	     *
	     * defaultsDeep(options, _.templateSettings);
	     *
	     * options.variable
	     * // => 'data'
	     *
	     * options.imports
	     * // => { '_': _, 'jq': $ }
	     */
	    function partialRight(func) {
	      return createWrapper(func, 32, null, slice(arguments, 1));
	    }
	
	    /**
	     * Creates a function that, when executed, will only call the `func` function
	     * at most once per every `wait` milliseconds. Provide an options object to
	     * indicate that `func` should be invoked on the leading and/or trailing edge
	     * of the `wait` timeout. Subsequent calls to the throttled function will
	     * return the result of the last `func` call.
	     *
	     * Note: If `leading` and `trailing` options are `true` `func` will be called
	     * on the trailing edge of the timeout only if the the throttled function is
	     * invoked more than once during the `wait` timeout.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to throttle.
	     * @param {number} wait The number of milliseconds to throttle executions to.
	     * @param {Object} [options] The options object.
	     * @param {boolean} [options.leading=true] Specify execution on the leading edge of the timeout.
	     * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.
	     * @returns {Function} Returns the new throttled function.
	     * @example
	     *
	     * // avoid excessively updating the position while scrolling
	     * var throttled = _.throttle(updatePosition, 100);
	     * jQuery(window).on('scroll', throttled);
	     *
	     * // execute `renewToken` when the click event is fired, but not more than once every 5 minutes
	     * jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {
	     *   'trailing': false
	     * }));
	     */
	    function throttle(func, wait, options) {
	      var leading = true,
	          trailing = true;
	
	      if (!isFunction(func)) {
	        throw new TypeError;
	      }
	      if (options === false) {
	        leading = false;
	      } else if (isObject(options)) {
	        leading = 'leading' in options ? options.leading : leading;
	        trailing = 'trailing' in options ? options.trailing : trailing;
	      }
	      debounceOptions.leading = leading;
	      debounceOptions.maxWait = wait;
	      debounceOptions.trailing = trailing;
	
	      return debounce(func, wait, debounceOptions);
	    }
	
	    /**
	     * Creates a function that provides `value` to the wrapper function as its
	     * first argument. Additional arguments provided to the function are appended
	     * to those provided to the wrapper function. The wrapper is executed with
	     * the `this` binding of the created function.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {*} value The value to wrap.
	     * @param {Function} wrapper The wrapper function.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var p = _.wrap(_.escape, function(func, text) {
	     *   return '<p>' + func(text) + '</p>';
	     * });
	     *
	     * p('Fred, Wilma, & Pebbles');
	     * // => '<p>Fred, Wilma, &amp; Pebbles</p>'
	     */
	    function wrap(value, wrapper) {
	      return createWrapper(wrapper, 16, [value]);
	    }
	
	    /*--------------------------------------------------------------------------*/
	
	    /**
	     * Creates a function that returns `value`.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {*} value The value to return from the new function.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var object = { 'name': 'fred' };
	     * var getter = _.constant(object);
	     * getter() === object;
	     * // => true
	     */
	    function constant(value) {
	      return function() {
	        return value;
	      };
	    }
	
	    /**
	     * Produces a callback bound to an optional `thisArg`. If `func` is a property
	     * name the created callback will return the property value for a given element.
	     * If `func` is an object the created callback will return `true` for elements
	     * that contain the equivalent object properties, otherwise it will return `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {*} [func=identity] The value to convert to a callback.
	     * @param {*} [thisArg] The `this` binding of the created callback.
	     * @param {number} [argCount] The number of arguments the callback accepts.
	     * @returns {Function} Returns a callback function.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * // wrap to create custom callback shorthands
	     * _.createCallback = _.wrap(_.createCallback, function(func, callback, thisArg) {
	     *   var match = /^(.+?)__([gl]t)(.+)$/.exec(callback);
	     *   return !match ? func(callback, thisArg) : function(object) {
	     *     return match[2] == 'gt' ? object[match[1]] > match[3] : object[match[1]] < match[3];
	     *   };
	     * });
	     *
	     * _.filter(characters, 'age__gt38');
	     * // => [{ 'name': 'fred', 'age': 40 }]
	     */
	    function createCallback(func, thisArg, argCount) {
	      var type = typeof func;
	      if (func == null || type == 'function') {
	        return baseCreateCallback(func, thisArg, argCount);
	      }
	      // handle "_.pluck" style callback shorthands
	      if (type != 'object') {
	        return property(func);
	      }
	      var props = keys(func),
	          key = props[0],
	          a = func[key];
	
	      // handle "_.where" style callback shorthands
	      if (props.length == 1 && a === a && !isObject(a)) {
	        // fast path the common case of providing an object with a single
	        // property containing a primitive value
	        return function(object) {
	          var b = object[key];
	          return a === b && (a !== 0 || (1 / a == 1 / b));
	        };
	      }
	      return function(object) {
	        var length = props.length,
	            result = false;
	
	        while (length--) {
	          if (!(result = baseIsEqual(object[props[length]], func[props[length]], null, true))) {
	            break;
	          }
	        }
	        return result;
	      };
	    }
	
	    /**
	     * Converts the characters `&`, `<`, `>`, `"`, and `'` in `string` to their
	     * corresponding HTML entities.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {string} string The string to escape.
	     * @returns {string} Returns the escaped string.
	     * @example
	     *
	     * _.escape('Fred, Wilma, & Pebbles');
	     * // => 'Fred, Wilma, &amp; Pebbles'
	     */
	    function escape(string) {
	      return string == null ? '' : String(string).replace(reUnescapedHtml, escapeHtmlChar);
	    }
	
	    /**
	     * This method returns the first argument provided to it.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {*} value Any value.
	     * @returns {*} Returns `value`.
	     * @example
	     *
	     * var object = { 'name': 'fred' };
	     * _.identity(object) === object;
	     * // => true
	     */
	    function identity(value) {
	      return value;
	    }
	
	    /**
	     * Adds function properties of a source object to the destination object.
	     * If `object` is a function methods will be added to its prototype as well.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {Function|Object} [object=lodash] object The destination object.
	     * @param {Object} source The object of functions to add.
	     * @param {Object} [options] The options object.
	     * @param {boolean} [options.chain=true] Specify whether the functions added are chainable.
	     * @example
	     *
	     * function capitalize(string) {
	     *   return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	     * }
	     *
	     * _.mixin({ 'capitalize': capitalize });
	     * _.capitalize('fred');
	     * // => 'Fred'
	     *
	     * _('fred').capitalize().value();
	     * // => 'Fred'
	     *
	     * _.mixin({ 'capitalize': capitalize }, { 'chain': false });
	     * _('fred').capitalize();
	     * // => 'Fred'
	     */
	    function mixin(object, source, options) {
	      var chain = true,
	          methodNames = source && functions(source);
	
	      if (!source || (!options && !methodNames.length)) {
	        if (options == null) {
	          options = source;
	        }
	        ctor = lodashWrapper;
	        source = object;
	        object = lodash;
	        methodNames = functions(source);
	      }
	      if (options === false) {
	        chain = false;
	      } else if (isObject(options) && 'chain' in options) {
	        chain = options.chain;
	      }
	      var ctor = object,
	          isFunc = isFunction(ctor);
	
	      forEach(methodNames, function(methodName) {
	        var func = object[methodName] = source[methodName];
	        if (isFunc) {
	          ctor.prototype[methodName] = function() {
	            var chainAll = this.__chain__,
	                value = this.__wrapped__,
	                args = [value];
	
	            push.apply(args, arguments);
	            var result = func.apply(object, args);
	            if (chain || chainAll) {
	              if (value === result && isObject(result)) {
	                return this;
	              }
	              result = new ctor(result);
	              result.__chain__ = chainAll;
	            }
	            return result;
	          };
	        }
	      });
	    }
	
	    /**
	     * Reverts the '_' variable to its previous value and returns a reference to
	     * the `lodash` function.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @returns {Function} Returns the `lodash` function.
	     * @example
	     *
	     * var lodash = _.noConflict();
	     */
	    function noConflict() {
	      context._ = oldDash;
	      return this;
	    }
	
	    /**
	     * A no-operation function.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @example
	     *
	     * var object = { 'name': 'fred' };
	     * _.noop(object) === undefined;
	     * // => true
	     */
	    function noop() {
	      // no operation performed
	    }
	
	    /**
	     * Gets the number of milliseconds that have elapsed since the Unix epoch
	     * (1 January 1970 00:00:00 UTC).
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @example
	     *
	     * var stamp = _.now();
	     * _.defer(function() { console.log(_.now() - stamp); });
	     * // => logs the number of milliseconds it took for the deferred function to be called
	     */
	    var now = isNative(now = Date.now) && now || function() {
	      return new Date().getTime();
	    };
	
	    /**
	     * Converts the given value into an integer of the specified radix.
	     * If `radix` is `undefined` or `0` a `radix` of `10` is used unless the
	     * `value` is a hexadecimal, in which case a `radix` of `16` is used.
	     *
	     * Note: This method avoids differences in native ES3 and ES5 `parseInt`
	     * implementations. See http://es5.github.io/#E.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {string} value The value to parse.
	     * @param {number} [radix] The radix used to interpret the value to parse.
	     * @returns {number} Returns the new integer value.
	     * @example
	     *
	     * _.parseInt('08');
	     * // => 8
	     */
	    var parseInt = nativeParseInt(whitespace + '08') == 8 ? nativeParseInt : function(value, radix) {
	      // Firefox < 21 and Opera < 15 follow the ES3 specified implementation of `parseInt`
	      return nativeParseInt(isString(value) ? value.replace(reLeadingSpacesAndZeros, '') : value, radix || 0);
	    };
	
	    /**
	     * Creates a "_.pluck" style function, which returns the `key` value of a
	     * given object.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {string} key The name of the property to retrieve.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'fred',   'age': 40 },
	     *   { 'name': 'barney', 'age': 36 }
	     * ];
	     *
	     * var getName = _.property('name');
	     *
	     * _.map(characters, getName);
	     * // => ['barney', 'fred']
	     *
	     * _.sortBy(characters, getName);
	     * // => [{ 'name': 'barney', 'age': 36 }, { 'name': 'fred',   'age': 40 }]
	     */
	    function property(key) {
	      return function(object) {
	        return object[key];
	      };
	    }
	
	    /**
	     * Produces a random number between `min` and `max` (inclusive). If only one
	     * argument is provided a number between `0` and the given number will be
	     * returned. If `floating` is truey or either `min` or `max` are floats a
	     * floating-point number will be returned instead of an integer.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {number} [min=0] The minimum possible value.
	     * @param {number} [max=1] The maximum possible value.
	     * @param {boolean} [floating=false] Specify returning a floating-point number.
	     * @returns {number} Returns a random number.
	     * @example
	     *
	     * _.random(0, 5);
	     * // => an integer between 0 and 5
	     *
	     * _.random(5);
	     * // => also an integer between 0 and 5
	     *
	     * _.random(5, true);
	     * // => a floating-point number between 0 and 5
	     *
	     * _.random(1.2, 5.2);
	     * // => a floating-point number between 1.2 and 5.2
	     */
	    function random(min, max, floating) {
	      var noMin = min == null,
	          noMax = max == null;
	
	      if (floating == null) {
	        if (typeof min == 'boolean' && noMax) {
	          floating = min;
	          min = 1;
	        }
	        else if (!noMax && typeof max == 'boolean') {
	          floating = max;
	          noMax = true;
	        }
	      }
	      if (noMin && noMax) {
	        max = 1;
	      }
	      min = +min || 0;
	      if (noMax) {
	        max = min;
	        min = 0;
	      } else {
	        max = +max || 0;
	      }
	      if (floating || min % 1 || max % 1) {
	        var rand = nativeRandom();
	        return nativeMin(min + (rand * (max - min + parseFloat('1e-' + ((rand +'').length - 1)))), max);
	      }
	      return baseRandom(min, max);
	    }
	
	    /**
	     * Resolves the value of property `key` on `object`. If `key` is a function
	     * it will be invoked with the `this` binding of `object` and its result returned,
	     * else the property value is returned. If `object` is falsey then `undefined`
	     * is returned.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {Object} object The object to inspect.
	     * @param {string} key The name of the property to resolve.
	     * @returns {*} Returns the resolved value.
	     * @example
	     *
	     * var object = {
	     *   'cheese': 'crumpets',
	     *   'stuff': function() {
	     *     return 'nonsense';
	     *   }
	     * };
	     *
	     * _.result(object, 'cheese');
	     * // => 'crumpets'
	     *
	     * _.result(object, 'stuff');
	     * // => 'nonsense'
	     */
	    function result(object, key) {
	      if (object) {
	        var value = object[key];
	        return isFunction(value) ? object[key]() : value;
	      }
	    }
	
	    /**
	     * A micro-templating method that handles arbitrary delimiters, preserves
	     * whitespace, and correctly escapes quotes within interpolated code.
	     *
	     * Note: In the development build, `_.template` utilizes sourceURLs for easier
	     * debugging. See http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
	     *
	     * For more information on precompiling templates see:
	     * https://lodash.com/custom-builds
	     *
	     * For more information on Chrome extension sandboxes see:
	     * http://developer.chrome.com/stable/extensions/sandboxingEval.html
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {string} text The template text.
	     * @param {Object} data The data object used to populate the text.
	     * @param {Object} [options] The options object.
	     * @param {RegExp} [options.escape] The "escape" delimiter.
	     * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
	     * @param {Object} [options.imports] An object to import into the template as local variables.
	     * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
	     * @param {string} [sourceURL] The sourceURL of the template's compiled source.
	     * @param {string} [variable] The data object variable name.
	     * @returns {Function|string} Returns a compiled function when no `data` object
	     *  is given, else it returns the interpolated text.
	     * @example
	     *
	     * // using the "interpolate" delimiter to create a compiled template
	     * var compiled = _.template('hello <%= name %>');
	     * compiled({ 'name': 'fred' });
	     * // => 'hello fred'
	     *
	     * // using the "escape" delimiter to escape HTML in data property values
	     * _.template('<b><%- value %></b>', { 'value': '<script>' });
	     * // => '<b>&lt;script&gt;</b>'
	     *
	     * // using the "evaluate" delimiter to generate HTML
	     * var list = '<% _.forEach(people, function(name) { %><li><%- name %></li><% }); %>';
	     * _.template(list, { 'people': ['fred', 'barney'] });
	     * // => '<li>fred</li><li>barney</li>'
	     *
	     * // using the ES6 delimiter as an alternative to the default "interpolate" delimiter
	     * _.template('hello ${ name }', { 'name': 'pebbles' });
	     * // => 'hello pebbles'
	     *
	     * // using the internal `print` function in "evaluate" delimiters
	     * _.template('<% print("hello " + name); %>!', { 'name': 'barney' });
	     * // => 'hello barney!'
	     *
	     * // using a custom template delimiters
	     * _.templateSettings = {
	     *   'interpolate': /{{([\s\S]+?)}}/g
	     * };
	     *
	     * _.template('hello {{ name }}!', { 'name': 'mustache' });
	     * // => 'hello mustache!'
	     *
	     * // using the `imports` option to import jQuery
	     * var list = '<% jq.each(people, function(name) { %><li><%- name %></li><% }); %>';
	     * _.template(list, { 'people': ['fred', 'barney'] }, { 'imports': { 'jq': jQuery } });
	     * // => '<li>fred</li><li>barney</li>'
	     *
	     * // using the `sourceURL` option to specify a custom sourceURL for the template
	     * var compiled = _.template('hello <%= name %>', null, { 'sourceURL': '/basic/greeting.jst' });
	     * compiled(data);
	     * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
	     *
	     * // using the `variable` option to ensure a with-statement isn't used in the compiled template
	     * var compiled = _.template('hi <%= data.name %>!', null, { 'variable': 'data' });
	     * compiled.source;
	     * // => function(data) {
	     *   var __t, __p = '', __e = _.escape;
	     *   __p += 'hi ' + ((__t = ( data.name )) == null ? '' : __t) + '!';
	     *   return __p;
	     * }
	     *
	     * // using the `source` property to inline compiled templates for meaningful
	     * // line numbers in error messages and a stack trace
	     * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
	     *   var JST = {\
	     *     "main": ' + _.template(mainText).source + '\
	     *   };\
	     * ');
	     */
	    function template(text, data, options) {
	      // based on John Resig's `tmpl` implementation
	      // http://ejohn.org/blog/javascript-micro-templating/
	      // and Laura Doktorova's doT.js
	      // https://github.com/olado/doT
	      var settings = lodash.templateSettings;
	      text = String(text || '');
	
	      // avoid missing dependencies when `iteratorTemplate` is not defined
	      options = defaults({}, options, settings);
	
	      var imports = defaults({}, options.imports, settings.imports),
	          importsKeys = keys(imports),
	          importsValues = values(imports);
	
	      var isEvaluating,
	          index = 0,
	          interpolate = options.interpolate || reNoMatch,
	          source = "__p += '";
	
	      // compile the regexp to match each delimiter
	      var reDelimiters = RegExp(
	        (options.escape || reNoMatch).source + '|' +
	        interpolate.source + '|' +
	        (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
	        (options.evaluate || reNoMatch).source + '|$'
	      , 'g');
	
	      text.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
	        interpolateValue || (interpolateValue = esTemplateValue);
	
	        // escape characters that cannot be included in string literals
	        source += text.slice(index, offset).replace(reUnescapedString, escapeStringChar);
	
	        // replace delimiters with snippets
	        if (escapeValue) {
	          source += "' +\n__e(" + escapeValue + ") +\n'";
	        }
	        if (evaluateValue) {
	          isEvaluating = true;
	          source += "';\n" + evaluateValue + ";\n__p += '";
	        }
	        if (interpolateValue) {
	          source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
	        }
	        index = offset + match.length;
	
	        // the JS engine embedded in Adobe products requires returning the `match`
	        // string in order to produce the correct `offset` value
	        return match;
	      });
	
	      source += "';\n";
	
	      // if `variable` is not specified, wrap a with-statement around the generated
	      // code to add the data object to the top of the scope chain
	      var variable = options.variable,
	          hasVariable = variable;
	
	      if (!hasVariable) {
	        variable = 'obj';
	        source = 'with (' + variable + ') {\n' + source + '\n}\n';
	      }
	      // cleanup code by stripping empty strings
	      source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
	        .replace(reEmptyStringMiddle, '$1')
	        .replace(reEmptyStringTrailing, '$1;');
	
	      // frame code as the function body
	      source = 'function(' + variable + ') {\n' +
	        (hasVariable ? '' : variable + ' || (' + variable + ' = {});\n') +
	        "var __t, __p = '', __e = _.escape" +
	        (isEvaluating
	          ? ', __j = Array.prototype.join;\n' +
	            "function print() { __p += __j.call(arguments, '') }\n"
	          : ';\n'
	        ) +
	        source +
	        'return __p\n}';
	
	      // Use a sourceURL for easier debugging.
	      // http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
	      var sourceURL = '\n/*\n//# sourceURL=' + (options.sourceURL || '/lodash/template/source[' + (templateCounter++) + ']') + '\n*/';
	
	      try {
	        var result = Function(importsKeys, 'return ' + source + sourceURL).apply(undefined, importsValues);
	      } catch(e) {
	        e.source = source;
	        throw e;
	      }
	      if (data) {
	        return result(data);
	      }
	      // provide the compiled function's source by its `toString` method, in
	      // supported environments, or the `source` property as a convenience for
	      // inlining compiled templates during the build process
	      result.source = source;
	      return result;
	    }
	
	    /**
	     * Executes the callback `n` times, returning an array of the results
	     * of each callback execution. The callback is bound to `thisArg` and invoked
	     * with one argument; (index).
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {number} n The number of times to execute the callback.
	     * @param {Function} callback The function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns an array of the results of each `callback` execution.
	     * @example
	     *
	     * var diceRolls = _.times(3, _.partial(_.random, 1, 6));
	     * // => [3, 6, 4]
	     *
	     * _.times(3, function(n) { mage.castSpell(n); });
	     * // => calls `mage.castSpell(n)` three times, passing `n` of `0`, `1`, and `2` respectively
	     *
	     * _.times(3, function(n) { this.cast(n); }, mage);
	     * // => also calls `mage.castSpell(n)` three times
	     */
	    function times(n, callback, thisArg) {
	      n = (n = +n) > -1 ? n : 0;
	      var index = -1,
	          result = Array(n);
	
	      callback = baseCreateCallback(callback, thisArg, 1);
	      while (++index < n) {
	        result[index] = callback(index);
	      }
	      return result;
	    }
	
	    /**
	     * The inverse of `_.escape` this method converts the HTML entities
	     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to their
	     * corresponding characters.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {string} string The string to unescape.
	     * @returns {string} Returns the unescaped string.
	     * @example
	     *
	     * _.unescape('Fred, Barney &amp; Pebbles');
	     * // => 'Fred, Barney & Pebbles'
	     */
	    function unescape(string) {
	      return string == null ? '' : String(string).replace(reEscapedHtml, unescapeHtmlChar);
	    }
	
	    /**
	     * Generates a unique ID. If `prefix` is provided the ID will be appended to it.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {string} [prefix] The value to prefix the ID with.
	     * @returns {string} Returns the unique ID.
	     * @example
	     *
	     * _.uniqueId('contact_');
	     * // => 'contact_104'
	     *
	     * _.uniqueId();
	     * // => '105'
	     */
	    function uniqueId(prefix) {
	      var id = ++idCounter;
	      return String(prefix == null ? '' : prefix) + id;
	    }
	
	    /*--------------------------------------------------------------------------*/
	
	    /**
	     * Creates a `lodash` object that wraps the given value with explicit
	     * method chaining enabled.
	     *
	     * @static
	     * @memberOf _
	     * @category Chaining
	     * @param {*} value The value to wrap.
	     * @returns {Object} Returns the wrapper object.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'age': 36 },
	     *   { 'name': 'fred',    'age': 40 },
	     *   { 'name': 'pebbles', 'age': 1 }
	     * ];
	     *
	     * var youngest = _.chain(characters)
	     *     .sortBy('age')
	     *     .map(function(chr) { return chr.name + ' is ' + chr.age; })
	     *     .first()
	     *     .value();
	     * // => 'pebbles is 1'
	     */
	    function chain(value) {
	      value = new lodashWrapper(value);
	      value.__chain__ = true;
	      return value;
	    }
	
	    /**
	     * Invokes `interceptor` with the `value` as the first argument and then
	     * returns `value`. The purpose of this method is to "tap into" a method
	     * chain in order to perform operations on intermediate results within
	     * the chain.
	     *
	     * @static
	     * @memberOf _
	     * @category Chaining
	     * @param {*} value The value to provide to `interceptor`.
	     * @param {Function} interceptor The function to invoke.
	     * @returns {*} Returns `value`.
	     * @example
	     *
	     * _([1, 2, 3, 4])
	     *  .tap(function(array) { array.pop(); })
	     *  .reverse()
	     *  .value();
	     * // => [3, 2, 1]
	     */
	    function tap(value, interceptor) {
	      interceptor(value);
	      return value;
	    }
	
	    /**
	     * Enables explicit method chaining on the wrapper object.
	     *
	     * @name chain
	     * @memberOf _
	     * @category Chaining
	     * @returns {*} Returns the wrapper object.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * // without explicit chaining
	     * _(characters).first();
	     * // => { 'name': 'barney', 'age': 36 }
	     *
	     * // with explicit chaining
	     * _(characters).chain()
	     *   .first()
	     *   .pick('age')
	     *   .value();
	     * // => { 'age': 36 }
	     */
	    function wrapperChain() {
	      this.__chain__ = true;
	      return this;
	    }
	
	    /**
	     * Produces the `toString` result of the wrapped value.
	     *
	     * @name toString
	     * @memberOf _
	     * @category Chaining
	     * @returns {string} Returns the string result.
	     * @example
	     *
	     * _([1, 2, 3]).toString();
	     * // => '1,2,3'
	     */
	    function wrapperToString() {
	      return String(this.__wrapped__);
	    }
	
	    /**
	     * Extracts the wrapped value.
	     *
	     * @name valueOf
	     * @memberOf _
	     * @alias value
	     * @category Chaining
	     * @returns {*} Returns the wrapped value.
	     * @example
	     *
	     * _([1, 2, 3]).valueOf();
	     * // => [1, 2, 3]
	     */
	    function wrapperValueOf() {
	      return this.__wrapped__;
	    }
	
	    /*--------------------------------------------------------------------------*/
	
	    // add functions that return wrapped values when chaining
	    lodash.after = after;
	    lodash.assign = assign;
	    lodash.at = at;
	    lodash.bind = bind;
	    lodash.bindAll = bindAll;
	    lodash.bindKey = bindKey;
	    lodash.chain = chain;
	    lodash.compact = compact;
	    lodash.compose = compose;
	    lodash.constant = constant;
	    lodash.countBy = countBy;
	    lodash.create = create;
	    lodash.createCallback = createCallback;
	    lodash.curry = curry;
	    lodash.debounce = debounce;
	    lodash.defaults = defaults;
	    lodash.defer = defer;
	    lodash.delay = delay;
	    lodash.difference = difference;
	    lodash.filter = filter;
	    lodash.flatten = flatten;
	    lodash.forEach = forEach;
	    lodash.forEachRight = forEachRight;
	    lodash.forIn = forIn;
	    lodash.forInRight = forInRight;
	    lodash.forOwn = forOwn;
	    lodash.forOwnRight = forOwnRight;
	    lodash.functions = functions;
	    lodash.groupBy = groupBy;
	    lodash.indexBy = indexBy;
	    lodash.initial = initial;
	    lodash.intersection = intersection;
	    lodash.invert = invert;
	    lodash.invoke = invoke;
	    lodash.keys = keys;
	    lodash.map = map;
	    lodash.mapValues = mapValues;
	    lodash.max = max;
	    lodash.memoize = memoize;
	    lodash.merge = merge;
	    lodash.min = min;
	    lodash.omit = omit;
	    lodash.once = once;
	    lodash.pairs = pairs;
	    lodash.partial = partial;
	    lodash.partialRight = partialRight;
	    lodash.pick = pick;
	    lodash.pluck = pluck;
	    lodash.property = property;
	    lodash.pull = pull;
	    lodash.range = range;
	    lodash.reject = reject;
	    lodash.remove = remove;
	    lodash.rest = rest;
	    lodash.shuffle = shuffle;
	    lodash.sortBy = sortBy;
	    lodash.tap = tap;
	    lodash.throttle = throttle;
	    lodash.times = times;
	    lodash.toArray = toArray;
	    lodash.transform = transform;
	    lodash.union = union;
	    lodash.uniq = uniq;
	    lodash.values = values;
	    lodash.where = where;
	    lodash.without = without;
	    lodash.wrap = wrap;
	    lodash.xor = xor;
	    lodash.zip = zip;
	    lodash.zipObject = zipObject;
	
	    // add aliases
	    lodash.collect = map;
	    lodash.drop = rest;
	    lodash.each = forEach;
	    lodash.eachRight = forEachRight;
	    lodash.extend = assign;
	    lodash.methods = functions;
	    lodash.object = zipObject;
	    lodash.select = filter;
	    lodash.tail = rest;
	    lodash.unique = uniq;
	    lodash.unzip = zip;
	
	    // add functions to `lodash.prototype`
	    mixin(lodash);
	
	    /*--------------------------------------------------------------------------*/
	
	    // add functions that return unwrapped values when chaining
	    lodash.clone = clone;
	    lodash.cloneDeep = cloneDeep;
	    lodash.contains = contains;
	    lodash.escape = escape;
	    lodash.every = every;
	    lodash.find = find;
	    lodash.findIndex = findIndex;
	    lodash.findKey = findKey;
	    lodash.findLast = findLast;
	    lodash.findLastIndex = findLastIndex;
	    lodash.findLastKey = findLastKey;
	    lodash.has = has;
	    lodash.identity = identity;
	    lodash.indexOf = indexOf;
	    lodash.isArguments = isArguments;
	    lodash.isArray = isArray;
	    lodash.isBoolean = isBoolean;
	    lodash.isDate = isDate;
	    lodash.isElement = isElement;
	    lodash.isEmpty = isEmpty;
	    lodash.isEqual = isEqual;
	    lodash.isFinite = isFinite;
	    lodash.isFunction = isFunction;
	    lodash.isNaN = isNaN;
	    lodash.isNull = isNull;
	    lodash.isNumber = isNumber;
	    lodash.isObject = isObject;
	    lodash.isPlainObject = isPlainObject;
	    lodash.isRegExp = isRegExp;
	    lodash.isString = isString;
	    lodash.isUndefined = isUndefined;
	    lodash.lastIndexOf = lastIndexOf;
	    lodash.mixin = mixin;
	    lodash.noConflict = noConflict;
	    lodash.noop = noop;
	    lodash.now = now;
	    lodash.parseInt = parseInt;
	    lodash.random = random;
	    lodash.reduce = reduce;
	    lodash.reduceRight = reduceRight;
	    lodash.result = result;
	    lodash.runInContext = runInContext;
	    lodash.size = size;
	    lodash.some = some;
	    lodash.sortedIndex = sortedIndex;
	    lodash.template = template;
	    lodash.unescape = unescape;
	    lodash.uniqueId = uniqueId;
	
	    // add aliases
	    lodash.all = every;
	    lodash.any = some;
	    lodash.detect = find;
	    lodash.findWhere = find;
	    lodash.foldl = reduce;
	    lodash.foldr = reduceRight;
	    lodash.include = contains;
	    lodash.inject = reduce;
	
	    mixin(function() {
	      var source = {}
	      forOwn(lodash, function(func, methodName) {
	        if (!lodash.prototype[methodName]) {
	          source[methodName] = func;
	        }
	      });
	      return source;
	    }(), false);
	
	    /*--------------------------------------------------------------------------*/
	
	    // add functions capable of returning wrapped and unwrapped values when chaining
	    lodash.first = first;
	    lodash.last = last;
	    lodash.sample = sample;
	
	    // add aliases
	    lodash.take = first;
	    lodash.head = first;
	
	    forOwn(lodash, function(func, methodName) {
	      var callbackable = methodName !== 'sample';
	      if (!lodash.prototype[methodName]) {
	        lodash.prototype[methodName]= function(n, guard) {
	          var chainAll = this.__chain__,
	              result = func(this.__wrapped__, n, guard);
	
	          return !chainAll && (n == null || (guard && !(callbackable && typeof n == 'function')))
	            ? result
	            : new lodashWrapper(result, chainAll);
	        };
	      }
	    });
	
	    /*--------------------------------------------------------------------------*/
	
	    /**
	     * The semantic version number.
	     *
	     * @static
	     * @memberOf _
	     * @type string
	     */
	    lodash.VERSION = '2.4.2';
	
	    // add "Chaining" functions to the wrapper
	    lodash.prototype.chain = wrapperChain;
	    lodash.prototype.toString = wrapperToString;
	    lodash.prototype.value = wrapperValueOf;
	    lodash.prototype.valueOf = wrapperValueOf;
	
	    // add `Array` functions that return unwrapped values
	    baseEach(['join', 'pop', 'shift'], function(methodName) {
	      var func = arrayRef[methodName];
	      lodash.prototype[methodName] = function() {
	        var chainAll = this.__chain__,
	            result = func.apply(this.__wrapped__, arguments);
	
	        return chainAll
	          ? new lodashWrapper(result, chainAll)
	          : result;
	      };
	    });
	
	    // add `Array` functions that return the existing wrapped value
	    baseEach(['push', 'reverse', 'sort', 'unshift'], function(methodName) {
	      var func = arrayRef[methodName];
	      lodash.prototype[methodName] = function() {
	        func.apply(this.__wrapped__, arguments);
	        return this;
	      };
	    });
	
	    // add `Array` functions that return new wrapped values
	    baseEach(['concat', 'slice', 'splice'], function(methodName) {
	      var func = arrayRef[methodName];
	      lodash.prototype[methodName] = function() {
	        return new lodashWrapper(func.apply(this.__wrapped__, arguments), this.__chain__);
	      };
	    });
	
	    // avoid array-like object bugs with `Array#shift` and `Array#splice`
	    // in IE < 9, Firefox < 10, Narwhal, and RingoJS
	    if (!support.spliceObjects) {
	      baseEach(['pop', 'shift', 'splice'], function(methodName) {
	        var func = arrayRef[methodName],
	            isSplice = methodName == 'splice';
	
	        lodash.prototype[methodName] = function() {
	          var chainAll = this.__chain__,
	              value = this.__wrapped__,
	              result = func.apply(value, arguments);
	
	          if (value.length === 0) {
	            delete value[0];
	          }
	          return (chainAll || isSplice)
	            ? new lodashWrapper(result, chainAll)
	            : result;
	        };
	      });
	    }
	
	    return lodash;
	  }
	
	  /*--------------------------------------------------------------------------*/
	
	  // expose Lo-Dash
	  var _ = runInContext();
	
	  // some AMD build optimizers like r.js check for condition patterns like the following:
	  if (true) {
	    // Expose Lo-Dash to the global object even when an AMD loader is present in
	    // case Lo-Dash is loaded with a RequireJS shim config.
	    // See http://requirejs.org/docs/api.html#config-shim
	    root._ = _;
	
	    // define as an anonymous module so, through path mapping, it can be
	    // referenced as the "underscore" module
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	  // check for `exports` after `define` in case a build optimizer adds an `exports` object
	  else if (freeExports && freeModule) {
	    // in Node.js or RingoJS
	    if (moduleExports) {
	      (freeModule.exports = _)._ = _;
	    }
	    // in Narwhal or Rhino -require
	    else {
	      freeExports._ = _;
	    }
	  }
	  else {
	    // in a browser or Rhino
	    root._ = _;
	  }
	}.call(this));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)(module), (function() { return this; }())))

/***/ }),
/* 31 */
/***/ (function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }),
/* 32 */,
/* 33 */
/***/ (function(module, exports) {

	
	
	
	/*
	<a-cursor id="cursor" cursor="fuse: false" scale="1.3 1.3 1.3"
	              animation__click="property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1.3 1.3 1.3; dur: 150"
	              animation__fusing="property: fusing; startEvents: fusing; from: 1 1 1; to: 0.1 0.1 0.1; dur: 1500"
	              event-set__1="_event: mouseenter; color: #549ad5"
	              event-set__2="_event: mouseleave; color: #ededed"
	              raycaster="far: 20; objects: .clickable">
	    </a-cursor>
	 */
	/*
	
	$(document).ready(function(){
		let isMobile = AFRAME.utils.device.isMobile();
		if(!isMobile) {
			var cursor = document.createElement('a-cursor');
			cursor.setAttribute('id', 'cursor');
			cursor.setAttribute('cursor', "fuse: true; fuseTimeout: 500");
			cursor.setAttribute('scale', '1.3 1.3 1.3');
			cursor.setAttribute('animation__click', "property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1.3 1.3 1.3; dur: 150");
			cursor.setAttribute('animation__fusing', "property: fusing; startEvents: fusing; from: 1 1 1; to: 0.1 0.1 0.1; dur: 1500");
			cursor.setAttribute('animation__fusingColor', "property: color; startEvents: fusing; from: 1 1 1; to: 0.1 0.1 0.1; dur: 1500");
			cursor.setAttribute('event-set__1', "_event: mouseenter; color: #549ad5");
			cursor.setAttribute('event-set__2', "_event: mouseleave; color: #ededed");
			cursor.setAttribute('raycaster', "far: 20; objects: .clickable");
			var camera = document.querySelector('a-entity#camera');
			camera.appendChild(cursor);
		} else {
			/!*var cursor = document.createElement('a-cursor');
			cursor.setAttribute('id', 'cursor');
			cursor.setAttribute('cursor', "fuse: false");
			cursor.setAttribute('scale', '1.3 1.3 1.3');
			cursor.setAttribute('animation__click', "property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1.3 1.3 1.3; dur: 150");
			cursor.setAttribute('animation__fusing', "property: fusing; startEvents: fusing; from: 1 1 1; to: 0.1 0.1 0.1; dur: 1500");
			cursor.setAttribute('event-set__1', "_event: mouseenter; color: #549ad5");
			cursor.setAttribute('event-set__2', "_event: mouseleave; color: #ededed");
			cursor.setAttribute('raycaster', "far: 20; objects: .clickable");
			var camera = document.querySelector('a-entity#camera');
			camera.appendChild(cursor);*!/
		}
	});*/


/***/ }),
/* 34 */,
/* 35 */
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
					if(item) item.parentNode.removeChild(item);
				})
			}
			var keybrd = document.querySelector('a-keyboard');
			if(keybrd){
				console.log(keybrd);
				keybrd.parentNode.removeChild(keybrd);
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
			var str = "";
			var keyContainer = document.createElement('a-entity');
			keyContainer.setAttribute('position', "0 -0.5 0");
			var keyboard = document.createElement('a-keyboard');
			keyboard.setAttribute('class', "clickable");
			keyboard.setAttribute('physical-keyboard', "true");
			keyboard.setAttribute('position', "-1.724 -5.751 -2.52");
			keyboard.setAttribute('scale', "2.5 2.5 2.5");
			keyboard.setAttribute('rotation', "-40 0 0");
			keyboard.addEventListener('input', (e)=>{
				str += e.detail;
				console.log(str);
			});
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
/* 36 */
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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	/* global AFRAME */
	var axios = __webpack_require__(3);
	var _ = __webpack_require__(30);
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
			this.el.addEventListener('navigateTo', function(event){
				this.selectorProgMove(event.detail.newPage);
			}.bind(this));
			axios.get(window.location.origin + '/compDetails/nav')
				.then(response => {
					if (_.has(response, 'user')) {
						this.user = response.data.user;
					}
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
			if (pageSelected === 'hide-menu') {
				this.hideMenus();
			} else {
				location.hash = pageSelected;
	
				//history.pushState(pageSelected, null, window.location.origin + '/' + pageSelected);
	
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
			}
		},
	
		selectorProgMove: function (newPage) {
			console.log(window.location);
			var pageSelected = event.detail.target.getAttribute('data-page');
			if (pageSelected === 'hide-menu') {
				this.hideMenus();
			} else {
				var selected = this.el.querySelector('a-image[data-page='+ newPage +']');
	
				var position = {
					x: selected.x,
					y: selected.y,
					z: selected.z - 0.02
				};
				var highlighter = document.querySelector('a-ring#selectedhighlighter');
				highlighter.setAttribute('position', position);
			}
		},
	
		hideMenus: function (event) {
			console.log('submit click');
			var nav = document.querySelector('a-entity#nav-attach');
			nav.setAttribute('visible', 'false');
	
			var menu = document.querySelector('a-router');
			menu.setAttribute('visible', 'false');
	
			var cursor = document.querySelector('[raycaster]');
			cursor.setAttribute('raycaster', 'objects', '.showIcons');
			console.log(cursor.components);
	
			var showContainer = document.createElement('a-entity');
			showContainer.setAttribute('id', 'showAgain');
			showContainer.setAttribute('position', '0 -2.5 -3.08');
	
			var showText = document.createElement('a-text');
			showText.setAttribute('value', 'Show Menus and Icons');
			showText.setAttribute('position', '-1 -1 0');
			showText.setAttribute('text', 'height: 3;');
	
	
			var showItems = document.createElement('a-image');
			showItems.setAttribute('src', 'assets/ui/ic_visibility_black_48dp_2x.png');
			showItems.setAttribute('class', 'showIcons');
			showItems.setAttribute('position', '0 -0.5 0');
			showItems.addEventListener('click', function (evt) {
				var cursor = document.querySelector('[raycaster]');
				cursor.setAttribute('raycaster', 'objects', '.clickable');
	
				var nav = document.querySelector('a-entity#nav-attach');
				nav.setAttribute('visible', 'true');
	
				var menu = document.querySelector('a-router');
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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	/* global AFRAME */
	var axios = __webpack_require__(3);
	var _ = __webpack_require__(30);
	/**
	 * Component that builds navigation row for explore categories
	 */
	AFRAME.registerComponent('category-nav', {
		schema: {
			initialCategory: {type: 'string', default: 'mural'}
		},
	
		init: function () {
			var data = this.data;
			var el = this.el;
	
			axios.get(window.location.origin + '/compDetails/explore')
				.then((response) => {
					if (_.has(response, 'user')) {
						this.user = response.data.user;
					}
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
	
	});
	
	
	/*
	//
	for(var thing in event.target.components.position){
		console.log(thing);
	}
	 */

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	/* global AFRAME */
	var axios = __webpack_require__(3);
	var _ = __webpack_require__(30);
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
			this.builPanels(data);
	
		},
	
		remove: function () {
			document.querySelector('a-sky').setAttribute('visible', 'true');
			var vid = document.querySelector('a-videosphere');
			if (vid) {
				vid.parentNode.removeChild(vid);
			}
		},
	
		updateSchema: function (data) {
			console.log('updateSchema data: ', data);
			if (!data.initial) {
				this.tearDownDisplay();
				this.builPanels(data);
			}
	
		},
	
		// Paging should be taken care of on the back end;
		tearDownDisplay: function () {
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
	
		CleanTornDown: function () {
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
		builPanels: function (data) {
			var width = 1;
			var height = 0.5;
			var rotation = "-10 0 0";
			var classes = "clickable row-pic";
	
			var baseUrl = window.location.origin;
			var queryUrl = baseUrl + '/geoSearch/Categories/' + data.collection;
			axios.get(queryUrl)
				.then(response => {
					/*if (_.has(response, 'user')) {
						this.user = response.data.user;
					}*/
					if(data.collection !== 'video'){
						document.querySelector('a-sky').setAttribute('visible', 'true');
						var vid = document.querySelector('a-videosphere');
						if (vid) {
							vid.parentNode.removeChild(vid);
						}
					}
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
						pic.setAttribute('side', 'front');
						pic.setAttribute('class', classes);
						if (/art_/.test(img[i].src)) {
							pic.setAttribute('data-imageSrc', img[i].src.replace("thumbnail_", ""));
						} else if (data.collection === 'video') {
							pic.setAttribute('data-imageSrc', img[i].uri);
						} else {
							pic.setAttribute('data-imageSrc', img[i].src.replace("thumbnail_", "").replace(".png", ".jpg"));
						}
	
						pic.setAttribute('data-image-category', data.collection);
						pic.setAttribute('src', img[i].src);
						pic.setAttribute('width', width);
						pic.setAttribute('height', height);
						pic.setAttribute('rotation', rotation);
						if (data.collection === 'video') {
							$(pic).on('click', function () {
								var sky = document.querySelector('a-sky');
								this.emit('image-save', {shown: $(this).attr('src')});
								//sky.emit('set-image-fade');
								var actual = $(this).attr('data-imageSrc');
								this.emit('video-show', {uri: actual});
	
								/*						var actual = thumbSrc.replace("thumbnail_", "").replace(".png", ".jpg");
													var splitted = thumbSrc.slice(10, thumbSrc.length);
													var src = 'assets' + splitted;*/
								console.log(actual);
								sky.setAttribute('visible', 'false');
								/*setTimeout(function () {
									// Set image.
									sky.setAttribute('material', 'src', actual);
									//sky.setAttribute('src', src);
								}, 200);*/
	
							});
						} else {
							$(pic).on('click', function () {
								var sky = document.querySelector('a-sky');
								this.emit('image-save', {shown: $(this).attr('src')});
								sky.emit('set-image-fade');
								var actual = $(this).attr('data-imageSrc');
								/*						var actual = thumbSrc.replace("thumbnail_", "").replace(".png", ".jpg");
														var splitted = thumbSrc.slice(10, thumbSrc.length);
														var src = 'assets' + splitted;*/
								console.log(actual);
								//sky.setAttribute('material', 'src', actual);
								setTimeout(function () {
	
									// Set image.
									sky.setAttribute('material', 'src', actual);
									//sky.setAttribute('src', src);
								}.bind(this), 1500);
	
							});
						}
	
	
						pic.addEventListener('image-save', function (event) {
							console.log(event);
							this.el.setAttribute('data-image-save', event.detail.shown);
							var router = document.querySelector('a-router');
							if (router) {
								//if (this.user) {
									this.showSaveButton()
								//}
							}
						}.bind(this));
	
	
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
					this.el.addEventListener('video-show', function (event) {
						var vid = document.querySelector('a-videosphere');
						if (!vid) {
							vid = document.createElement('a-videosphere');
						}
						console.log(event);
						vid.setAttribute('src', event.detail.uri);
						vid.setAttribute('loop', 'false');
						this.el.sceneEl.appendChild(vid);
					}.bind(this));
	
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
	
		},
	
		showSaveButton: function () {
			//if (this.user) {
				if (!document.querySelector('a-image#saveButton')) {
					var saveBtn = document.createElement('a-image');
					saveBtn.setAttribute('id', 'saveButton');
					saveBtn.setAttribute('class', 'clickable');
					saveBtn.setAttribute('height', 0.5);
					saveBtn.setAttribute('width', 0.5);
					saveBtn.setAttribute('position', {x: 2.4, y: -2, z: -3.8});
					saveBtn.setAttribute('src', 'assets/ui/ic_stars_black_48dp_2x.png');
					//saveBtn.setAttribute('scale', {x: 2.0, y: 0.8, z: 0.8});
					saveBtn.addEventListener('click', this.savePic.bind(this));
					this.el.appendChild(saveBtn);
			//	}
			}
	
		},
	
		savePic: function () {
			var filename = this.el.getAttribute('data-image-save');
			var data = {filename: filename};
			console.log(data);
			axios.post(window.location.origin + '/saveCollectionImage', data)
				.then(response => {
					console.log(response);
					if (_.has(response, 'data.err')) {
						console.log('error during search or search save');
					}
					if (_.has(response, 'data.userError')) {
						this.errorMsg("Must Be Logged In to Save");
						console.log('not logged in');
					}
				})
				.catch(err => {
					console.log(err);
				})
		}
	
	
	});


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	/* global AFRAME */
	var axios = __webpack_require__(3);
	var _ = __webpack_require__(30);
	var messageDisplay = __webpack_require__(49);
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

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	/* global AFRAME */
	var axios = __webpack_require__(3);
	var _ = __webpack_require__(30);
	
	var messageDisplay = __webpack_require__(49);
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
					if (_.has(response, 'user')) {
						this.user = response.data.user;
					}
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
								//window.simpleState.update({loggedIn: true});
								//document.querySelector('a-image[data-page=profile]').addState('loggedIn');
								var router = document.querySelector('a-router');
								//router.addState('LoggedIn');
								if(router.is('redirect-profile')){
									document.querySelector('a-entity#nav-attach').emit('navigateTo', {newPage: 'profile-expanded'});
									location.hash = 'profile-expanded';
								} else {
									document.querySelector('a-entity#nav-attach').emit('navigateTo', {newPage: 'explore'});
									location.hash = 'explore';
								}
	
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
	
		errorMsg: messageDisplay
	});

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	/* global AFRAME */
	var axios = __webpack_require__(3);
	var GSVPANO = __webpack_require__(43);
	var _ = __webpack_require__(30);
	
	var messageDisplay = __webpack_require__(49);
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
			//console.log(window.simpleState);
			var data = this.data;
			var el = this.el;
			this.loggedIn = document.querySelector('a-router').is('LoggedIn');
			axios.get(window.location.origin + '/compDetails/search')
				.then((response) => {
					if (_.has(response, 'user')) {
					//	this.user = response.data.user;
						document.querySelector('a-router').addState('LoggedIn');
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
			let isMobile = AFRAME.utils.device.isMobile();
			if(!isMobile){
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
				let root = document.querySelector('a-router');
				root.appendChild(mapBtn);
			}
		},
	
		keyboardClosed: function () {
			this.el.emit("keyboardIsClosedMove");
			var mapBtn = document.querySelector('a-button#mapButton');
			this.tryRemoveElement(mapBtn);
			//if (mapBtn) mapBtn.parentNode.removeChild(mapBtn);
		},
	
	
		showMap: function (updateOnly) {
			console.log('show map');
			var root, mapEl, mapBtn;
			root = document.querySelector('a-entity#content-root');
			mapEl = document.querySelector('a-entity#mapElement');
	
			if (!mapEl) {
				console.log('make map');
				mapEl = document.createElement('a-entity');
				mapEl.setAttribute('id', 'mapElement');
				mapEl.setAttribute('map-overlay', 'nothing:nothing;');
				root.appendChild(mapEl);
				mapBtn = document.querySelector('a-button#mapButton');
				mapBtn.setAttribute('value', 'hide map');
			}
		},
	
		hideMap: function () {
			var root, mapEl, mapBtn;
			if (document.querySelector('a-entity#mapElement')) {
				mapEl = document.querySelector('a-entity#mapElement');
				mapEl.parentNode.removeChild(mapEl);
				mapBtn = document.querySelector('a-button#mapButton');
				mapBtn.setAttribute('value', 'show map');
			}
		},
	
		getMyLocation: function () {
			var el = document.getElementById('myLocationButton');
			el.addEventListener('click', function (event) {
				event.preventDefault();
				navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
			}, false);
		},
	
		geoSuccess: function (position) {
	
			var currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			var isMapPresent = document.querySelector('a-entity#mapElement');
			if(isMapPresent){
				isMapPresent.emit('goToLocation', {currentLocation: currentLocation});
				// move to position (thanks @theCole!)
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
			if (errorMsg) {
				errorMsg.parentNode.removeChild(errorMsg);
			}
	
			this.el.addState('newSearch');
			console.log(location);
			return axios.post(window.location.origin + '/search', {query: location})
				.then((response) => {
					console.log(response);
					if (response.data.ok) {
						this.getPic(response.data.details.lat, response.data.details.lng);
					} else {
						if (_.has(response, 'data.err')) {
							console.log('error during search or search save');
						}
						if (_.has(response, 'data.userError')) {
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
					//this.errorMsg(message);
					this.onGetPicError("No Result.  Here is a Random View!");
				}
			};
	
			// Invoke the load method with a LatLng point.
			loader.load(new google.maps.LatLng(lat, lng));
	
			// Set error handle.
			loader.onError = (message) => {
				this.onGetPicError(message);
				//this.errorMsg(message);
				//alert(message); // todo plug in a different means of informing user that no results exist
				return null;
			}
	
		},
	
		onGetPicError: function (message) {
			this.errorMsg(message);
			if (this.el.is('newSearch')) {
				this.el.removeState('newSearch');
				var randomPics = [
					{lat: 40.7016113, lng: -73.9890025},
					{lat: 40.7012087, lng: -73.9877161},
					{lat: 34.0419134, lng: -118.2564639},
					{lat: 40.6431476, lng: -111.4953956}
				];
	
				var randomLoc = randomPics[Math.floor(Math.random() * randomPics.length)];
				this.getPic(randomLoc.lat, randomLoc.lng);
			}
		},
	
		errorMsg: messageDisplay,
	
		showPic: function (newImage, lat, lng) {
			console.log('newImage');
			if (this.el.is('newSearch')) {
				this.el.removeState('newSearch');
			}
			if (newImage) {
				$('a-sky').attr('src', newImage);
				$('a-sky').attr('data-lat', lat);
				$('a-sky').attr('data-lng', lng);
	
				this.hideMap();
	
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
			var data = {lat: lat, lng: lng, image: image};
			console.log(data);
			axios.post(window.location.origin + '/saveSearchImage', data)
				.then(response => {
					console.log(response);
					if (_.has(response, 'data.err')) {
						console.log('error during search or search save');
					}
					if (_.has(response, 'data.userError')) {
						this.errorMsg("Must Be Logged In to Save");
						console.log('not logged in');
					}
				})
				.catch(err => {
					console.log(err);
				})
		},
	
		tryRemoveElement: function (element) {
			if (!element) {
				return;
			}
			element.parentNode.removeChild(element);
		}
	
	});

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @type {GSVPANO|*|{}}
	 */
	var GSVPANO = GSVPANO || {};
	var axios = __webpack_require__(3);
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
	    //  try{
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
					    img.addEventListener('error', function(evt){
					      console.log('error loading image', evt);
						    self.throwError( 'Could not retrieve panorama ');
	                    });
					    img.crossOrigin = '';
					    img.src = url;
	
					    console.log("tile url: ", img);
				    })( x, y );
			    }
		    }
	      /*} catch(err){
	       // console.log('err', err);
		      self.throwError( 'Could not retrieve panorama ');
	      }*/
	
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
		    console.log(http_request.status, http_request.readyState);
	      if ( http_request.readyState == 4 && http_request.status == 200 ) {
	
	        var data = JSON.parse( http_request.responseText );
	        self.loadPano( location, data.result[ 0 ].id );
	      } else {
	        console.log('threw error');
		      self.throwError( 'Could not retrieve panorama ');
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
		      try {
			      if (self.onPanoramaData) {
				      self.onPanoramaData(result);
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
		      } catch (err) {
			      self.throwError( 'Could not retrieve panorama ');
		      }
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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	/* global AFRAME */
	var axios = __webpack_require__(3);
	var _ = __webpack_require__(30);
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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	/* global AFRAME */
	var axios = __webpack_require__(3);
	var _ = __webpack_require__(30);
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

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	/* global AFRAME */
	var axios = __webpack_require__(3);
	var _ = __webpack_require__(30);
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
			});
	
			this.el.addEventListener('goToLocation', function(event) {
				this.addMarker(event.detail.currentLocation);
				map.panTo(event.detail.currentLocation);
			}.bind(this))
	
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
/* 47 */
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
				//console.log('input event: ', e);
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
					e.stopImmediatePropagation();
					e.stopPropagation();
					// console.log('physical keyboard event: ', e);
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
			el.emit('keyboardIsOpen');
			el.isOpen = true;
			el._transitioning = true;
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
			el.addEventListener('raycaster-intersected', Behaviors.keyIn);
			el.addEventListener('raycaster-intersected-cleared', Behaviors.keyOut);
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
/* 48 */
/***/ (function(module, exports) {

	AFRAME.registerComponent('hideMenus', {
		schema: {},
		init: function () {},
		update: function(){},
		remove: function(){},
		tick: function(time, timeDelta){},
		pause: function(){},
		play: function(){},
		updateSchema: function(data){}
	});
	
	AFRAME.registerSystem('hideMenus', {
		schema: {},
		init: function () {},
		hideMenus: function (event) {
			console.log('submit click');
	
			var elements = document.querySelectorAll('[hideMenus]');
			for(var i=0; i<elements.length; i++){
				elements[i].setAttribute('visible', 'false');
			}
	
	
			var cursor = document.querySelector('[raycaster]');
			cursor.setAttribute('raycaster', 'objects', '.showIcons');
			console.log(cursor.components);
	
			var showContainer = document.createElement('a-entity');
			showContainer.setAttribute('id', 'showAgain');
			showContainer.setAttribute('position', '0 -2.5 -3.08');
	
			var showText = document.createElement('a-text');
			showText.setAttribute('value', 'Show Menus and Icons');
			showText.setAttribute('position', '-1 -1 0');
			showText.setAttribute('text', 'height: 3;');
	
	
			var showItems = document.createElement('a-image');
			showItems.setAttribute('src', 'assets/ui/ic_visibility_black_48dp_2x.png');
			showItems.setAttribute('class', 'showIcons');
			showItems.setAttribute('position', '0 -0.5 0');
			showItems.addEventListener('click', function (evt) {
				var cursor = document.querySelector('[raycaster]');
				cursor.setAttribute('raycaster', 'objects', '.clickable');
	
				var nav = document.querySelector('a-entity#nav-attach');
				nav.setAttribute('visible', 'true');
	
				var menu = document.querySelector('a-router');
				menu.setAttribute('visible', 'true');
	
				var show = document.querySelector('a-entity#showAgain');
				show.parentNode.removeChild(show);
			});
			showContainer.appendChild(showText);
			showContainer.appendChild(showItems);
			this.el.appendChild(showContainer);
		},
		update: function(){},
		remove: function(){},
		tick: function(time, timeDelta){},
		pause: function(){},
		play: function(){},
		updateSchema: function(data){}
	});

/***/ }),
/* 49 */
/***/ (function(module, exports) {

	
	
	module.exports = function(errorMessages){
		var messageContainer, msgPlane;
		var router = document.querySelector('a-router');
		var priorError = document.querySelector('a-entity#errorMsg');
		if(priorError){
			priorError.parentNode.removeChild(priorError);
		}
	
		if(Array.isArray(errorMessages)){
			//function (errorArray) {
			messageContainer = document.createElement('a-entity');
			messageContainer.setAttribute('id', 'errorMsg');
	
			for (var i = 0; i < errorMessages.length; i++) {
				console.log(errorMessages[i].msg);
				msgPlane = document.createElement('a-entity');
				msgPlane.setAttribute('zOffset', '0.01');
				msgPlane.setAttribute('geometry', "primitive: plane; height: auto; width: 5");
				msgPlane.setAttribute('material', "color: red; transparent: true; opacity: 0.4");
				msgPlane.setAttribute('text', "value:" + errorMessages[i].msg + "; color: white");
				msgPlane.setAttribute('position', {x: 7, y: i, z: -4});
				msgPlane.setAttribute('rotation', {x: -10, y: -30, z: 0});
				messageContainer.appendChild(msgPlane);
			}
			router.appendChild(messageContainer);
			//}
		} else {
	
			messageContainer = document.createElement('a-entity');
			messageContainer.setAttribute('id', 'errorMsg');
	
			console.log(errorMessages);
			msgPlane = document.createElement('a-entity');
			msgPlane.setAttribute('zOffset', '0.01');
			msgPlane.setAttribute('geometry', "primitive: plane; height: auto; width: 5");
			msgPlane.setAttribute('material', "color: red; transparent: true; opacity: 0.4");
			msgPlane.setAttribute('text', "value:" + errorMessages + "; color: white");
			msgPlane.setAttribute('position', {x: 7, y: 0, z: -4});
			msgPlane.setAttribute('rotation', {x: 0, y: -30, z: 0});
			messageContainer.appendChild(msgPlane);
	
			router.appendChild(messageContainer);
		}
	
	};

/***/ })
/******/ ]);
//# sourceMappingURL=vpp-app.js.map