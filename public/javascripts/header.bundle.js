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
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/header.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/header.js":
/*!****************************!*\
  !*** ./frontend/header.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\r\n$(document).ready(function(){\r\n    $.get(\"/user/infor\", function(data, status){\r\n\r\n            console.log(data);\r\n            window.sessionUser = data;\r\n            addLockScreen2Page(data.username, data.avatarLink);\r\n    \r\n        $(\"#btn-unlock\").click(function(event){\r\n\r\n            event.preventDefault();\r\n            const dataSend = {\r\n                email: sessionUser.email,\r\n                password: $(\"input[name=password]\").val()\r\n            };\r\n        \r\n            console.log(\"datasend: \", dataSend);\r\n            $.post(\"/unlockscreen\", dataSend,\r\n                function (data, status, xhr) {\r\n                    console.log(\"data\", data);\r\n                    console.log(\"status\", status);\r\n                    $(\"#main-view\").removeClass(\"hidden\");\r\n                    $(\"#lock-view\").addClass(\"hidden\");\r\n\r\n                }).fail(function () {\r\n                    window.location = \"/logout\";\r\n                })\r\n        })\r\n    }).fail(function(){\r\n        addLockScreen2Page(\"username\",\"/static/assets/img/faces/avatar.jpg\");\r\n    })\r\n})\r\n\r\n\r\n$(\"#lockscreen\").click(function(){\r\n    $(\"#main-view\").addClass(\"hidden\");\r\n    $(\"#lock-view\").removeClass(\"hidden\");\r\n    \r\n    // Add background image to screen\r\n    demo.checkFullPageBackgroundImage();\r\n\r\n    // Show card after 1s\r\n    setTimeout(function () {\r\n        // after 1000 ms we add the class animated to the login/register card\r\n        $('.card').removeClass('card-hidden');\r\n    }, 1000);\r\n})\r\n\r\n\r\nfunction addLockScreen2Page(username, avatarLink){\r\n    $(\"body\").append($.parseHTML(`\r\n        <div class=\"wrapper wrapper-full-page hidden\" id=\"lock-view\">\r\n            <div class=\"full-page lock-page\" filter-color=\"black\" data-image=\"/static/assets/img/lock.jpeg\">\r\n                <!--   you can change the color of the filter page using: data-color=\"blue | green | orange | red | purple\" -->\r\n                <div class=\"content\">\r\n                    <form method=\"POST\" action=\"#\">\r\n                        <div class=\"card card-profile card-hidden\">\r\n                            <div class=\"card-avatar\">\r\n                                <a href=\"#\">\r\n                                    <img class=\"avatar\" src=${avatarLink} alt=\"User's Avatar\">\r\n                                </a>\r\n                            </div>\r\n                            <div class=\"card-content\">\r\n                                <h4 class=\"card-title\">${username}</h4>\r\n                                <div class=\"form-group label-floating is-empty\">\r\n                                    <label class=\"control-label\">Enter Password</label>\r\n                                    <input type=\"password\" name=\"password\" class=\"form-control\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"card-footer\">\r\n                                <button id=\"btn-unlock\" class=\"btn btn-rose btn-round\">Unlock</button>\r\n                            </div>\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </div>`));\r\n\r\n}\r\n\r\n$(\"#check-connection\").click(function(event){\r\n    let connected;\r\n    connected = document.getElementById('check-connection').querySelector('i').classList.contains('connected');\r\n\r\n    if (connected){\r\n        showNotification(\"top\", \"right\", \"success\", \"<big>STATUS</big>: <b>Web-socket</b> is connecting.\");\r\n    }else{\r\n        showNotification(\"top\", \"right\", \"danger\",  \"<big>ERROR</big>: <b>Web-socket</b> was disconnected.\");\r\n    }\r\n})\r\n\n\n//# sourceURL=webpack:///./frontend/header.js?");

/***/ })

/******/ });