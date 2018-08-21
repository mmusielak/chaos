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
eval("__webpack_require__.r(__webpack_exports__);\n// barnsley fern (black spleenwort)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  init: function (canvas) {\n    this.cursor = { x: 0, y: 0 };\n    this.internal = { x: 0, y: 0 };\n\n    this.matrices = [\n      [0.0000, 0.0000, 0.0000, 0.1600, 0.0000, 0.0000, 1],\n      [0.8500, 0.0400, -0.0400, 0.8500, 0.0000, 1.6000, 85],\n      [0.2000, -0.2600, 0.2300, 0.2200, 0.0000, 1.6000, 7],\n      [-0.1500, 0.2800, 0.2600, 0.2400, 0.0000, 0.4400, 7]\n    ];\n  },\n\n  iterate: function (canvas) {\n    var random = Math.random() * 100 | 0;\n\n    // select random transformation based on their probabilities\n    for (var total = 0, i = 0; i < this.matrices.length; i++) {\n      total += this.matrices[i][6];\n      if (total >= random) {\n        break;\n      }\n    }\n\n    // apply affine transformation\n    this.internal = transform(this.internal, this.matrices[i]);\n\n    // map internal point to the screen space\n    //  we know it's oscilating between \n    //   (-2.1818, 2.6556) in x axis \n    //   and (0, 9.958510) in y axis  \n    this.cursor.x = canvas.width / 2 + this.internal.x * canvas.width / 5.5 | 0;\n    this.cursor.y = canvas.height - this.internal.y * canvas.height / 10 | 0;\n\n    return this.cursor;\n  }\n});\n\nfunction transform(point, matrix) {\n  return {\n    x: point.x * matrix[0] + point.y * matrix[1] + matrix[4],\n    y: point.x * matrix[2] + point.y * matrix[3] + matrix[5]\n  };\n}\n\n//# sourceURL=webpack:///./src/fractals/fern.js?");

/***/ }),

/***/ "./src/fractals/ngon.js":
/*!******************************!*\
  !*** ./src/fractals/ngon.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// ngon\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  init: function (canvas, sides) {\n    this.nodes = [];\n\n    this.cursor = {\n      x: canvas.width / 2, y: canvas.height / 2\n    };\n\n    var radius = Math.min(canvas.width, canvas.height) / 2 - 40;\n    var theta = -Math.PI / 2;\n\n    for (var i = 0; i <= sides; i++) {\n      this.nodes[i] = {\n        x: radius * Math.cos(2 * Math.PI * i / sides + theta) + this.cursor.x,\n        y: radius * Math.sin(2 * Math.PI * i / sides + theta) + this.cursor.y\n      };\n    }\n  },\n\n  iterate: function (canvas) {\n    do {\n      var next = Math.random() * this.nodes.length | 0;\n\n      if (!this.skip_neighbours) {\n        break; // this means we're done here\n      }\n    } while (\n      (this.must_be_different && this.last == next) ||\n      (next + 3 + this.nodes.length) % this.nodes.length == this.last ||\n      (next - 3 + this.nodes.length) % this.nodes.length == this.last)\n\n    var node = this.nodes[this.last = next];\n\n    this.cursor.x += (node.x - this.cursor.x) >> 1;\n    this.cursor.y += (node.y - this.cursor.y) >> 1;\n\n    return this.cursor;\n  }\n});\n\n//# sourceURL=webpack:///./src/fractals/ngon.js?");

/***/ }),

/***/ "./src/fractals/square.js":
/*!********************************!*\
  !*** ./src/fractals/square.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// sierpiński triangle\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  init: function (canvas) {\n    this.nodes = [\n      { x: 20, y: 20},\n      //{ x: canvas.width / 2, y: 20 },\n      { x: canvas.width - 20, y: 20 },\n      //{ x: canvas.width - 20, y: canvas.height / 2 },\n      { x: canvas.width - 20, y: canvas.height - 20 },\n      //{ x: canvas.width / 2, y: canvas.height - 20 },\n      { x: 20, y: canvas.height - 20 }\n      //{ x: 20, y: canvas.height / 2 }\n    ];\n    this.cursor = {\n      x: canvas.width / 2, y: canvas.height / 2\n    };\n  },\n  iterate: function (canvas) {\n\n    do {\n      var next = Math.random() * this.nodes.length | 0;\n    } while (\n      (next + 2 + this.nodes.length) % this.nodes.length == this.last ||\n      (next - 2 + this.nodes.length) % this.nodes.length == this.last)\n\n    var node = this.nodes[this.last = next];\n\n    this.cursor.x += (node.x - this.cursor.x) >> 1;\n    this.cursor.y += (node.y - this.cursor.y) >> 1;\n\n    return this.cursor;\n  }\n});\n\n\n//# sourceURL=webpack:///./src/fractals/square.js?");

/***/ }),

/***/ "./src/fractals/triangle.js":
/*!**********************************!*\
  !*** ./src/fractals/triangle.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// sierpiński triangle\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  init: function (canvas) {\n    this.nodes = [\n      { x: canvas.width / 2, y: 20 },\n      { x: 20, y: canvas.height - 20 },\n      { x: canvas.width - 20, y: canvas.height - 20 }\n    ];\n    this.cursor = {\n      x: canvas.width / 2, y: canvas.height / 2\n    };\n  },\n  iterate: function (canvas) {\n    var node = this.nodes[Math.random() * this.nodes.length | 0];\n\n    this.cursor.x += (node.x - this.cursor.x) >> 1;\n    this.cursor.y += (node.y - this.cursor.y) >> 1;\n\n    return this.cursor;\n  }\n});\n\n\n//# sourceURL=webpack:///./src/fractals/triangle.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _fractals_triangle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fractals/triangle */ \"./src/fractals/triangle.js\");\n/* harmony import */ var _fractals_square__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fractals/square */ \"./src/fractals/square.js\");\n/* harmony import */ var _fractals_fern__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fractals/fern */ \"./src/fractals/fern.js\");\n/* harmony import */ var _fractals_ngon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fractals/ngon */ \"./src/fractals/ngon.js\");\nvar counter = 0;\nvar limiter = 5000000;\nvar iterations = 10000;\nvar resolution = 2;\n\nvar canvas = document.querySelector('canvas');\nvar context = canvas.getContext('2d');\n\ncanvas.width = 360 * resolution;\ncanvas.height = 240 * resolution;\ncontext.imageSmoothingEnabled = true;\n\nvar image = context.getImageData(0, 0, canvas.width, canvas.height);\nvar buffer = new ArrayBuffer(image.data.length);\nvar uint8 = new Uint8Array(buffer);\nvar uint32 = new Uint32Array(buffer);\n\n// paint it black (good for screenshots)\nfor (var i = 0; i < uint32.length; i++) {\n  uint32[i] = 0xFF000000;\n}\n\n\n_fractals_triangle__WEBPACK_IMPORTED_MODULE_0__[\"default\"].init(canvas);\n\n_fractals_square__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init(canvas);\n\n_fractals_fern__WEBPACK_IMPORTED_MODULE_2__[\"default\"].init(canvas);\n\n_fractals_ngon__WEBPACK_IMPORTED_MODULE_3__[\"default\"].init(canvas, 5);\n\nvar fractal = _fractals_square__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n\nfunction animationFrame() {\n  for (var i = 0; i < iterations; i++) {\n    var cursor = fractal.iterate(canvas);\n    var color = HSVtoRGB(cursor.x / canvas.width, cursor.y / canvas.height, 0.75);\n\n    uint32[cursor.x + cursor.y * canvas.width] = color;\n  }\n\n  // update canvas\n  image.data.set(uint8);\n  context.putImageData(image, 0, 0);\n\n  // if limit was reached stop iterating\n  if ((counter += iterations) < limiter) {\n    requestAnimationFrame(animationFrame);\n  } else {\n    console.info(`${counter} pixels were drawn.`);\n  }\n}\n\nanimationFrame();\n\n// -- HELPERS --\n\nfunction HSVtoRGB(h, s, v) {\n  var i = h * 6 | 0;\n  var f = h * 6 - i;\n  var p = v * (1 - s);\n  var q = v * (1 - f * s);\n  var t = v * (1 - (1 - f) * s);\n  switch (i % 6) {\n  case 0: return 0xFF << 24 | v * 0xFF << 16 | t * 0xFF << 8 | p * 0xFF;\n  case 1: return 0xFF << 24 | q * 0xFF << 16 | v * 0xFF << 8 | p * 0xFF;\n  case 2: return 0xFF << 24 | p * 0xFF << 16 | v * 0xFF << 8 | t * 0xFF;\n  case 3: return 0xFF << 24 | p * 0xFF << 16 | q * 0xFF << 8 | v * 0xFF;\n  case 4: return 0xFF << 24 | t * 0xFF << 16 | p * 0xFF << 8 | v * 0xFF;\n  case 5: return 0xFF << 24 | v * 0xFF << 16 | p * 0xFF << 8 | q * 0xFF;\n  }\n}\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });