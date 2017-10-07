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