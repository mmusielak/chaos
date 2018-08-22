/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/fractals/fern.js":
/*!******************************!*\
  !*** ./src/fractals/fern.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// barnsley fern (black spleenwort)\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\r\n  init: function (canvas) {\r\n    this.cursor = { x: 0, y: 0 };\r\n    this.internal = { x: 0, y: 0 };\r\n\r\n    // a c b d tx ty\r\n    this.matrices = [\r\n      [0.0000, 0.0000, 0.0000, 0.1600, 0.0000, 0.0000, 1],\r\n      [0.8500, 0.0400, -0.0400, 0.8500, 0.0000, 1.6000, 85],\r\n      [0.2000, -0.2600, 0.2300, 0.2200, 0.0000, 1.6000, 7],\r\n      [-0.1500, 0.2800, 0.2600, 0.2400, 0.0000, 0.4400, 7]\r\n    ];\r\n  },\r\n\r\n  iterate: function (canvas) {\r\n    var random = Math.random() * 100 | 0;\r\n\r\n    // select random transformation based on their probabilities\r\n    for (var total = 0, i = 0; i < this.matrices.length; i++) {\r\n      total += this.matrices[i][6];\r\n      if (total >= random) {\r\n        break;\r\n      }\r\n    }\r\n\r\n    // apply affine transformation\r\n    this.internal = transform(this.internal, this.matrices[i]);\r\n\r\n    // map internal point to the screen space\r\n    //  we know it's oscilating between \r\n    //   (-2.1818, 2.6556) in x axis \r\n    //   and (0, 9.958510) in y axis  \r\n    this.cursor.x = canvas.width / 2 + this.internal.x * canvas.width / 5.5 | 0;\r\n    this.cursor.y = canvas.height - this.internal.y * canvas.height / 10 | 0;\r\n\r\n    return this.cursor;\r\n  }\r\n});\r\n\r\nfunction transform(point, matrix) {\r\n  return {\r\n    x: point.x * matrix[0] + point.y * matrix[1] + matrix[4],\r\n    y: point.x * matrix[2] + point.y * matrix[3] + matrix[5]\r\n  };\r\n}\n\n//# sourceURL=webpack:///./src/fractals/fern.js?");

/***/ }),

/***/ "./src/fractals/ngon.js":
/*!******************************!*\
  !*** ./src/fractals/ngon.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// ngon\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\r\n  init: function (canvas) {\r\n    this.sides = 5;\r\n\r\n    this.nodes = [];\r\n\r\n    this.cursor = {\r\n      x: canvas.width / 2, y: canvas.height / 2\r\n    };\r\n\r\n    var radius = Math.min(canvas.width, canvas.height) / 2 - 40;\r\n    var theta = -Math.PI / 2;\r\n\r\n    for (var i = 0; i <= this.sides; i++) {\r\n      this.nodes[i] = {\r\n        x: radius * Math.cos(2 * Math.PI * i / this.sides + theta) + this.cursor.x,\r\n        y: radius * Math.sin(2 * Math.PI * i / this.sides + theta) + this.cursor.y\r\n      };\r\n    }\r\n  },\r\n\r\n  iterate: function (canvas) {\r\n    do {\r\n      var next = Math.random() * this.nodes.length | 0;\r\n    } while (\r\n      (next + 4 + this.nodes.length) % this.nodes.length == this.last ||\r\n      (next - 4 + this.nodes.length) % this.nodes.length == this.last ||\r\n      (next - 0 + this.nodes.length) % this.nodes.length == this.last ||\r\n      (next + 0 + this.nodes.length) % this.nodes.length == this.last ||\r\n      (next + 2 + this.nodes.length) % this.nodes.length == this.last ||\r\n      (next - 2 + this.nodes.length) % this.nodes.length == this.last)\r\n\r\n    var node = this.nodes[this.last = next];\r\n\r\n    this.cursor.x += (node.x - this.cursor.x) >> 1;\r\n    this.cursor.y += (node.y - this.cursor.y) >> 1;\r\n\r\n    return this.cursor;\r\n  }\r\n});\n\n//# sourceURL=webpack:///./src/fractals/ngon.js?");

/***/ }),

/***/ "./src/fractals/square.js":
/*!********************************!*\
  !*** ./src/fractals/square.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// square - no neigbours\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\r\n  init: function (canvas) {\r\n    this.nodes = [\r\n      { x: 20, y: 20 },\r\n      { x: canvas.width - 20, y: 20 },\r\n      { x: canvas.width - 20, y: canvas.height - 20 },\r\n      { x: 20, y: canvas.height - 20 }\r\n    ];\r\n    this.cursor = {\r\n      x: canvas.width / 2, y: canvas.height / 2\r\n    };\r\n  },\r\n  iterate: function (canvas) {\r\n    do {\r\n      var next = Math.random() * this.nodes.length | 0;\r\n    } while (\r\n      (next + 2 + this.nodes.length) % this.nodes.length == this.last ||\r\n      (next - 2 + this.nodes.length) % this.nodes.length == this.last)\r\n\r\n    var node = this.nodes[this.last = next];\r\n\r\n    this.cursor.x += (node.x - this.cursor.x) >> 1;\r\n    this.cursor.y += (node.y - this.cursor.y) >> 1;\r\n\r\n    return this.cursor;\r\n  }\r\n});\r\n\n\n//# sourceURL=webpack:///./src/fractals/square.js?");

/***/ }),

/***/ "./src/fractals/triangle.js":
/*!**********************************!*\
  !*** ./src/fractals/triangle.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// sierpiński triangle\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\r\n  init: function (canvas) {\r\n    this.nodes = [\r\n      { x: canvas.width / 2, y: 20 },\r\n      { x: 20, y: canvas.height - 20 },\r\n      { x: canvas.width - 20, y: canvas.height - 20 }\r\n    ];\r\n    this.cursor = {\r\n      x: canvas.width / 2, y: canvas.height / 2\r\n    };\r\n  },\r\n  iterate: function (canvas) {\r\n    var node = this.nodes[Math.random() * this.nodes.length | 0];\r\n\r\n    this.cursor.x += (node.x - this.cursor.x) >> 1;\r\n    this.cursor.y += (node.y - this.cursor.y) >> 1;\r\n\r\n    return this.cursor;\r\n  }\r\n});\r\n\n\n//# sourceURL=webpack:///./src/fractals/triangle.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _fractals_triangle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fractals/triangle */ \"./src/fractals/triangle.js\");\n/* harmony import */ var _fractals_square__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fractals/square */ \"./src/fractals/square.js\");\n/* harmony import */ var _fractals_fern__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fractals/fern */ \"./src/fractals/fern.js\");\n/* harmony import */ var _fractals_ngon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fractals/ngon */ \"./src/fractals/ngon.js\");\n// -- CONFIGURATION --\r\n\r\nvar counter = 0;\r\nvar limiter = 5000000;\r\nvar iterations = 10000;\r\nvar resolution = 10;\r\n\r\n// -- PIXEL BUFFER --\r\n\r\nvar canvas = document.querySelector('canvas');\r\nvar context = canvas.getContext('2d');\r\n\r\ncanvas.width = 360 * resolution;\r\ncanvas.height = 240 * resolution;\r\ncontext.imageSmoothingEnabled = true;\r\n\r\nvar image = context.getImageData(0, 0, canvas.width, canvas.height);\r\nvar buffer = new ArrayBuffer(image.data.length);\r\nvar uint8 = new Uint8Array(buffer);\r\nvar uint32 = new Uint32Array(buffer);\r\n\r\n// paint it black (good for screenshots)\r\nfor (var i = 0; i < uint32.length; i++) {\r\n  uint32[i] = 0xFF000000;\r\n}\r\n\r\n// -- MODES --\r\n\r\n\r\n_fractals_triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"].init(canvas);\r\n\r\n_fractals_square__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init(canvas);\r\n\r\n_fractals_fern__WEBPACK_IMPORTED_MODULE_2__[\"default\"].init(canvas);\r\n\r\n_fractals_ngon__WEBPACK_IMPORTED_MODULE_3__[\"default\"].sides = 7;\r\n_fractals_ngon__WEBPACK_IMPORTED_MODULE_3__[\"default\"].init(canvas);\r\n\r\nvar mode = 0;\r\nvar fractal = _fractals_triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\r\nvar fractals = [_fractals_triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"], _fractals_square__WEBPACK_IMPORTED_MODULE_1__[\"default\"], _fractals_fern__WEBPACK_IMPORTED_MODULE_2__[\"default\"], _fractals_ngon__WEBPACK_IMPORTED_MODULE_3__[\"default\"]];\r\n\r\nwindow.addEventListener('keydown', (e) => {\r\n  var delta = 0;\r\n  if (event.keyCode == 37) {\r\n    delta = -1;\r\n  }\r\n  if (event.keyCode == 39) {\r\n    delta = 1;\r\n  }\r\n  if (delta) {\r\n    mode = (fractals.length + mode + delta) % fractals.length;\r\n    fractal = fractals[mode];\r\n    fractal.init(canvas);\r\n    counter = 0;\r\n    for (var i = 0; i < uint32.length; i++) {\r\n      uint32[i] = 0xFF000000;\r\n    }\r\n  }\r\n});\r\n\r\n// -- LOOP --\r\n\r\nfunction animationFrame() {\r\n  for (var i = 0; i < iterations; i++) {\r\n    var cursor = fractal.iterate(canvas);\r\n    var color = HSVtoRGB(cursor.x / canvas.width, cursor.y / canvas.height, 0.75);\r\n\r\n    uint32[cursor.x + cursor.y * canvas.width] = color;\r\n  }\r\n\r\n  // update canvas\r\n  image.data.set(uint8);\r\n  context.putImageData(image, 0, 0);\r\n\r\n  // if limit was reached stop iterating\r\n  if ((counter += iterations) < limiter) {\r\n    requestAnimationFrame(animationFrame);\r\n  } else {\r\n    console.info(`${counter} pixels were drawn.`);\r\n  }\r\n}\r\n\r\nanimationFrame();\r\n\r\n// -- HELPERS --\r\n\r\nfunction HSVtoRGB(h, s, v) {\r\n  var i = h * 6 | 0;\r\n  var f = h * 6 - i;\r\n  var p = v * (1 - s);\r\n  var q = v * (1 - f * s);\r\n  var t = v * (1 - (1 - f) * s);\r\n  switch (i % 6) {\r\n    case 0: return 0xFF << 24 | v * 0xFF << 16 | t * 0xFF << 8 | p * 0xFF;\r\n    case 1: return 0xFF << 24 | q * 0xFF << 16 | v * 0xFF << 8 | p * 0xFF;\r\n    case 2: return 0xFF << 24 | p * 0xFF << 16 | v * 0xFF << 8 | t * 0xFF;\r\n    case 3: return 0xFF << 24 | p * 0xFF << 16 | q * 0xFF << 8 | v * 0xFF;\r\n    case 4: return 0xFF << 24 | t * 0xFF << 16 | p * 0xFF << 8 | v * 0xFF;\r\n    case 5: return 0xFF << 24 | v * 0xFF << 16 | p * 0xFF << 8 | q * 0xFF;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });