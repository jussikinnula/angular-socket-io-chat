/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {var path = __webpack_require__(1);
	var http = __webpack_require__(2);
	var express = __webpack_require__(3);
	var serveStatic = __webpack_require__(4);
	var socketIo = __webpack_require__(5);
	var port = process.env.PORT || 3000;
	var app = express();
	var server = http["Server"](app);
	var root = path.join(path.resolve(__dirname, "../public/"));
	var router = express.Router();
	var io = socketIo(server);
	router.get("/", function (request, result) {
	    result.sendFile(path.join(root, "index.html"));
	});
	app.use("/styles.css", serveStatic(path.resolve(root, "styles.css")));
	app.use("/client.js", serveStatic(path.resolve(root, "client.js")));
	app.use("/vendor.js", serveStatic(path.resolve(root, "vendor.js")));
	app.use("*", router);
	server.listen(port, function (error) {
	    if (error) {
	        console.log(error);
	    }
	    console.log("==> Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
	});
	io.on("connection", function (socket) {
	    console.log("*** Client connected");
	    var nickname = "unknown";
	    socket.on("disconnect", function () {
	        console.log("*** Client disconnected");
	        io.emit("message", "* " + nickname + " left channel");
	    });
	    socket.on("register", function (newNickname) {
	        nickname = newNickname;
	        io.emit("message", "* " + nickname + " joined channel");
	    });
	    socket.on("message", function (message) {
	        io.emit("message", message);
	        console.log(message);
	    });
	});

	/* WEBPACK VAR INJECTION */}.call(exports, "src"))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("serve-static");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("socket.io");

/***/ }
/******/ ]);