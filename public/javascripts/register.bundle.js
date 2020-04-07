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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/register.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/register.js":
/*!*************************!*\
  !*** ./src/register.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("$('#sign-up').click(function(){\n    let isUsernameValid, isEmailValid, isPasswordValid, isTermCondition;\n\n    isUsernameValid = !$(\"input[name=name]\").parent().hasClass(\"has-error\") && $(\"input[name=name]\").val().trim().length >= 5;\n\n    isEmailValid    =  isEmail($(\"input[name=email]\").val());\n    isPasswordValid = !$(\"input[name=password]\").parent().hasClass(\"has-error\") && $(\"input[name=password]\").val().trim().length >= 6;\n    isTermCondition = $(\"input[name=optionsCheckboxes\").prop('checked');\n\n    if (!isUsernameValid){ \n        $(\"input[name=name]\").parent().addClass(\"has-error\");\n        showNotification(\"top\", \"right\", \"danger\", \"<big>ERROR:</big>  Invalid <b>username</b>, please enter again. Minimum of 5 characters.\");\n    }\n    if (!isEmailValid){\n        $(\"input[name=email]\").parent().addClass(\"has-error\");\n        showNotification(\"top\", \"right\", \"danger\", \"<big>ERROR:</big>  Invalid <b>email</b>, please enter again.\");\n    }\n    if (!isPasswordValid){\n        $(\"input[name=password]\").parent().addClass(\"has-error\");\n        showNotification(\"top\", \"right\", \"danger\", \"<big>ERROR:</big>  Invalid <b>password</b>, please enter again. Minimum of 6 characters.\");\n    }\n\n    if (!isTermCondition){\n        showNotification(\"top\", \"right\", \"warning\", \"<big>WARNING:</big>  <b>Term & Condition</b> are not valid, please check it to continue.\");\n    }\n    \n\n    if (isUsernameValid && isEmailValid && isPasswordValid && isTermCondition ){\n        $.ajax({\n            url: \"/register\",\n            type: \"POST\",\n            data: $(\"#register-form\").serialize(),\n            success: function(result,status,xhr){\n                // to-do check is done?\n                console.log(result);\n                // sweet alert 2 of Creative Team\n                swal({ title:\"Sign Up Success\", text: \"You clicked the button to Sign In!\", type: \"success\", buttonsStyling: false, confirmButtonClass: \"btn btn-success go-login-page\"})\n                $('.go-login-page').click(function(){\n                    window.location = \"/login\";\n                });\n            },\n            error: function(xhr,status,error){\n                console.log(\"Form submit get an error!\");\n                showNotification(\"top\", \"right\", \"danger\", \"<big>ERROR:</big> Used <b>Email</b>, re-enter another email to continue.\");\n            }\n        })\n    }   \n   \n})\n\nfunction isEmail(email){\n    const regex = /^([a-zA-Z0-9_\\.\\-\\+])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$/;\n    return regex.test(email);\n}\n\n\nfunction showNotification(from, align, type, message){\n\n    $.notify({\n        icon: \"add_alert\",\n        message: message\n\n    },{\n        type: type,\n        timer: 2000,\n        placement: {\n            from: from,\n            align: align\n        }\n    });\n}\n\n//# sourceURL=webpack:///./src/register.js?");

/***/ })

/******/ });