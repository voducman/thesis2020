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
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/register.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/register.js":
/*!******************************!*\
  !*** ./frontend/register.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("$('#sign-up').click(function(){\r\n    let isUsernameValid, isEmailValid, isPasswordValid, isTermCondition;\r\n\r\n    isUsernameValid = !$(\"input[name=name]\").parent().hasClass(\"has-error\") && $(\"input[name=name]\").val().trim().length >= 5;\r\n\r\n    isEmailValid    =  isEmail($(\"input[name=email]\").val());\r\n    isPasswordValid = !$(\"input[name=password]\").parent().hasClass(\"has-error\") && $(\"input[name=password]\").val().trim().length >= 6;\r\n    isTermCondition = $(\"input[name=optionsCheckboxes\").prop('checked');\r\n\r\n    if (!isUsernameValid){ \r\n        $(\"input[name=name]\").parent().addClass(\"has-error\");\r\n        showNotification(\"top\", \"right\", \"danger\", \"<big>ERROR:</big>  Invalid <b>username</b>, please enter again. Minimum of 5 characters.\");\r\n    }\r\n    if (!isEmailValid){\r\n        $(\"input[name=email]\").parent().addClass(\"has-error\");\r\n        showNotification(\"top\", \"right\", \"danger\", \"<big>ERROR:</big>  Invalid <b>email</b>, please enter again.\");\r\n    }\r\n    if (!isPasswordValid){\r\n        $(\"input[name=password]\").parent().addClass(\"has-error\");\r\n        showNotification(\"top\", \"right\", \"danger\", \"<big>ERROR:</big>  Invalid <b>password</b>, please enter again. Minimum of 6 characters.\");\r\n    }\r\n\r\n    if (!isTermCondition){\r\n        showNotification(\"top\", \"right\", \"warning\", \"<big>WARNING:</big>  <b>Term & Condition</b> are not valid, please check it to continue.\");\r\n    }\r\n    \r\n\r\n    if (isUsernameValid && isEmailValid && isPasswordValid && isTermCondition ){\r\n        $.ajax({\r\n            url: \"/register\",\r\n            type: \"POST\",\r\n            data: $(\"#register-form\").serialize(),\r\n            success: function(result,status,xhr){\r\n                // to-do check is done?\r\n                console.log(result);\r\n                // sweet alert 2 of Creative Team\r\n                swal({ title:\"Sign Up Success\", text: \"You clicked the button to Sign In!\", type: \"success\", buttonsStyling: false, confirmButtonClass: \"btn btn-success go-login-page\"})\r\n                $('.go-login-page').click(function(){\r\n                    window.location = \"/login\";\r\n                });\r\n            },\r\n            error: function(xhr,status,error){\r\n                console.log(\"Form submit get an error!\");\r\n                showNotification(\"top\", \"right\", \"danger\", \"<big>ERROR:</big> Used <b>Email</b>, re-enter another email to continue.\");\r\n            }\r\n        })\r\n    }   \r\n   \r\n})\r\n\r\nfunction isEmail(email){\r\n    const regex = /^([a-zA-Z0-9_\\.\\-\\+])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$/;\r\n    return regex.test(email);\r\n}\r\n\r\n\r\nfunction showNotification(from, align, type, message){\r\n\r\n    $.notify({\r\n        icon: \"add_alert\",\r\n        message: message\r\n\r\n    },{\r\n        type: type,\r\n        timer: 2000,\r\n        placement: {\r\n            from: from,\r\n            align: align\r\n        }\r\n    });\r\n}\n\n//# sourceURL=webpack:///./frontend/register.js?");

/***/ })

/******/ });