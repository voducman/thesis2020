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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/header.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/header.js":
/*!***********************!*\
  !*** ./src/header.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let sessionUser;\n\n$(document).ready(function(){\n    $.get(\"/user/infor\", function(data, status){\n\n            console.log(data);\n            sessionUser = data;\n            addLockScreen2Page(data.username, data.avatarLink);\n    \n        $(\"#btn-unlock\").click(function(event){\n\n            event.preventDefault();\n            const dataSend = {\n                email: sessionUser.email,\n                password: $(\"input[name=password]\").val()\n            };\n        \n            console.log(\"datasend: \", dataSend);\n            $.post(\"/unlockscreen\", dataSend,\n                function (data, status, xhr) {\n                    console.log(\"data\", data);\n                    console.log(\"status\", status);\n                    $(\"#main-view\").removeClass(\"hidden\");\n                    $(\"#lock-view\").addClass(\"hidden\");\n\n                }).fail(function () {\n                    window.location = \"/logout\";\n                })\n        })\n    }).fail(function(){\n        addLockScreen2Page(\"username\",\"/static/assets/img/faces/avatar.jpg\");\n    })\n})\n\n\n$(\"#lockscreen\").click(function(){\n    $(\"#main-view\").addClass(\"hidden\");\n    $(\"#lock-view\").removeClass(\"hidden\");\n    \n    // Add background image to screen\n    demo.checkFullPageBackgroundImage();\n\n    // Show card after 1s\n    setTimeout(function () {\n        // after 1000 ms we add the class animated to the login/register card\n        $('.card').removeClass('card-hidden');\n    }, 1000);\n})\n\n\nfunction addLockScreen2Page(username, avatarLink){\n    $(\"body\").append($.parseHTML(`\n        <div class=\"wrapper wrapper-full-page hidden\" id=\"lock-view\">\n            <div class=\"full-page lock-page\" filter-color=\"black\" data-image=\"/static/assets/img/lock.jpeg\">\n                <!--   you can change the color of the filter page using: data-color=\"blue | green | orange | red | purple\" -->\n                <div class=\"content\">\n                    <form method=\"POST\" action=\"#\">\n                        <div class=\"card card-profile card-hidden\">\n                            <div class=\"card-avatar\">\n                                <a href=\"#\">\n                                    <img class=\"avatar\" src=${avatarLink} alt=\"User's Avatar\">\n                                </a>\n                            </div>\n                            <div class=\"card-content\">\n                                <h4 class=\"card-title\">${username}</h4>\n                                <div class=\"form-group label-floating is-empty\">\n                                    <label class=\"control-label\">Enter Password</label>\n                                    <input type=\"password\" name=\"password\" class=\"form-control\">\n                                </div>\n                            </div>\n                            <div class=\"card-footer\">\n                                <button id=\"btn-unlock\" class=\"btn btn-rose btn-round\">Unlock</button>\n                            </div>\n                        </div>\n                    </form>\n                </div>\n            </div>\n        </div>`));\n\n}\n\n$(\"#check-connection\").click(function(event){\n    let connected = false;\n    // TO-DO list\n    // call function to Check if A is connecting or not\n\n    if (connected){\n        showNotification(\"top\", \"right\", \"success\", \"<big>STATUS</big>: <b>Web-socket</b> is connecting.\");\n    }else{\n        showNotification(\"top\", \"right\", \"danger\",  \"<big>ERROR</big>: <b>Web-socket</b> was disconnected.\");\n    }\n})\n\n\n//# sourceURL=webpack:///./src/header.js?");

/***/ })

/******/ });