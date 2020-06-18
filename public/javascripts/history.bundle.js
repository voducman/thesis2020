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
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/history/controller.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/history/controller.js":
/*!****************************************!*\
  !*** ./frontend/history/controller.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _historyUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./historyUtil */ \"./frontend/history/historyUtil.js\");\n\n\n\nObject(_historyUtil__WEBPACK_IMPORTED_MODULE_0__[\"showHistoryOnSidebar\"])();\nObject(_historyUtil__WEBPACK_IMPORTED_MODULE_0__[\"setEventForSaveBtn\"])();\n\n//# sourceURL=webpack:///./frontend/history/controller.js?");

/***/ }),

/***/ "./frontend/history/historyUtil.js":
/*!*****************************************!*\
  !*** ./frontend/history/historyUtil.js ***!
  \*****************************************/
/*! exports provided: showHistoryOnSidebar, setEventForSaveBtn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"showHistoryOnSidebar\", function() { return showHistoryOnSidebar; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setEventForSaveBtn\", function() { return setEventForSaveBtn; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./frontend/utils.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst textarea = $('#history-text');\nconst saveBtn  = $('#history-save');\n\nconst showHistoryOnSidebar = function(){\n    $('.history').show();\n    $('.history').addClass('active');\n}\n\nconst setEventForSaveBtn = function(){\n    \n    saveBtn.click(function(e){\n        let history   = textarea.val();\n        let gatewayId = location.pathname.split('/').pop();\n        let data = { history, gatewayId };\n        Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"sendAjaxToServer\"])(\"/history/setup/log\", \"POST\", JSON.stringify(data))\n        .then(function(responseForm){\n            console.log(\"Setup log success.\");\n        })\n        .catch(function(e){\n            console.log(e + '');\n        })\n    })\n}\n\n//# sourceURL=webpack:///./frontend/history/historyUtil.js?");

/***/ }),

/***/ "./frontend/utils.js":
/*!***************************!*\
  !*** ./frontend/utils.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const ReceiveForm = __webpack_require__(/*! ../models/form/CommonReceiveForm */ \"./models/form/CommonReceiveForm.js\");\nconst validate    = __webpack_require__(/*! ip-validator */ \"./node_modules/ip-validator/lib/validator.js\");\n\nfunction showNotification(from, align, type, message){\n\n    $.notify({\n        icon: \"add_alert\",\n        message: message\n\n    },{\n        type: type,\n        timer: 100,\n        placement: {\n            from: from,\n            align: align\n        },\n        z_index: 2000,\n    });\n};\n\n/**\n * Show a fail notification about response of request\n * @param {string} message\n * @param {number} code\n */\nfunction showFailNotification(message, code = 406){\n\n    $.notify({\n        icon: \"add_alert\",\n        message: `<b>FAIL</b>: ${message} [HTTP Code: ${code}]`\n\n    },{\n        type: 'warning',\n        timer: 100,\n        placement: {\n            from: 'top',\n            align: 'right'\n        },\n        z_index: 2000,\n    });\n};\n\n/**\n * Show a error notification about response of request\n * @param {string} message\n * @param {number} code\n */\nfunction showErrorNotification(message, code = 500){\n\n    $.notify({\n        icon: \"add_alert\",\n        message: `<b>ERROR</b>: ${message} [HTTP Code: ${code}]`\n\n    },{\n        type: 'danger',\n        timer: 100,\n        placement: {\n            from: 'top',\n            align: 'right'\n        },\n        z_index: 2000,\n    });\n};\n\n/**\n * Show a success notification about response of request\n * @param {string} message\n * @param {number} code\n */\nfunction showSuccessNotification(message, code = 200){\n\n    $.notify({\n        icon: \"add_alert\",\n        message: `<b>SUCCESS</b>: ${message} [HTTP Code: ${code}]`\n\n    },{\n        type: 'success',\n        timer: 100,\n        placement: {\n            from: 'top',\n            align: 'right'\n        },\n        z_index: 2000,\n    });\n};\n\nfunction fortmatTime(time){\n    let date = new Date(time);\n    let year = date.getFullYear();\n    let month = date.getMonth();\n    let date_ = date.getDate();\n    let hour  = date.getHours();\n    let min   = date.getMinutes();\n    let second = date.getSeconds();\n    return `${hour}:${min}:${second} ${date_}/${month}/${year}`;\n}\n\nfunction parseResponse(responseObj, textStatus){\n    \n}\n\n/**\n * Send Ajax request to server, \n * then show notification about status of response\n * @param {string} requestURL\n * @param {string} method\n * @param {object} [data={}]\n * @returns {Promise<ReceiveForm>}\n */\nfunction sendAjaxToServer(requestURL, method = \"GET\", data = {}) {\n    console.debug({requestURL, method, data})\n    let receiveForm, code;\n\n    const parseResponse = function(responseObj, httpCode){\n\n        if (receiveForm){\n            code = httpCode;\n        }else{\n            receiveForm = new ReceiveForm(JSON.parse(responseObj));\n            code = httpCode;\n        }\n    }\n\n    return new Promise((resolve, reject) => {\n        $.ajax({\n            url: requestURL,\n            method: method,\n            data: data,\n            contentType: \"application/json\",\n            statusCode: {\n                200: function(responseObj, textStatus){\n                    parseResponse(responseObj, 200);\n                    showSuccessNotification(receiveForm.getMessage(), code);\n                },\n\n                404: function(responseXHR, textStatus){\n                    parseResponse(responseXHR.responseText, 404);\n                    showFailNotification(receiveForm.getMessage(), code);\n                },\n\n                406: function(responseXHR, textStatus){\n                    parseResponse(responseXHR.responseText, 406);\n                    showFailNotification(receiveForm.getMessage(), code);\n                },\n\n                500: function(responseXHR, textStatus){\n                    parseResponse(responseXHR.responseText, 500);\n                    showErrorNotification(receiveForm.getMessage(), code);\n                },\n            }\n        })\n            .done(function (response) {\n                if (!receiveForm){\n                    receiveForm = new ReceiveForm(JSON.parse(response));\n                }\n\n                return resolve(receiveForm);\n            })\n            .fail(function (e) {\n                if (!e.responseText){\n                    showErrorNotification(\"SERVER OR NETWORK GET ERROR\", e.status);\n                }\n\n                return reject(null);\n            })\n    })\n}\n\n/**\n * Upload image to server, then receive a response\n * with URL of this image\n * @param {object} image - image raw data \n */\nfunction uploadCustomImage(image){\n    let form = new FormData();\n    form.append('image', image);\n    return new Promise((resolve, reject) => {\n\n        $.ajax({\n            url: '/drawing/upload/symbol',\n            method: 'POST',\n            processData: false,\n            contentType: false,\n            enctype: 'multipart/form-data',\n            data: form\n        })\n        .done(function(response){\n            let receiveForm = new ReceiveForm(JSON.parse(response));\n            console.log(receiveForm)\n            if (!receiveForm.success){\n                return reject(receiveForm.getMessage());\n            }\n            return resolve(receiveForm.getData());\n        })\n        .fail(function(error){\n            console.log(error);\n            return reject(null);\n        })\n    })\n}\n\n\n/** \n * @summary to look-up a beautiful text from rough text\n * @example Message(\"s7\") return: \"ETHERNET S7\" | Message(\"modbus\") return \"MODBUS TCP\"\n */\n\n function Message(text){\n    const table = {\n        \"s7\": \"ETHERNET S7\",\n        \"modbus\": \"MODBUS TCP\",\n        \"opcua\": \"OPC UA\",\n        \"siemens\": \"SIEMENS\",\n        \"schneider\": \"SCHNEIDER\",\n        \"mitsubishi\": \"MITSUBISHI\",\n        \"s7-300\": \"S7-300\",\n        \"s7-1200\": \"S7-1200\",\n        \"s7-1500\": \"S7-1500\",\n\n        \"1\": \"TRUE\",\n        \"true\": \"TRUE\",\n        \"0\": \"FALSE\",\n        \"false\": \"FALSE\",\n\n        \"hd\": \"HD Ready [1280 x 720]\",\n        'fhd': \"FHD [1920 x 1080]\",\n        \"qhd\": \"QHD [2560 x 1440]\"\n    }\n\n    let result = table[text] || String(text).toUpperCase();\n    return result;\n }\n\n function showErrorOnField(selector){\n    $(selector).parent().addClass('has-error');\n}\n\nfunction isValidString(value, minLength){\n    if (typeof value !== 'string') return false;\n    if (!value.length) return false;\n\n    if (!minLength || minLength < 1) {\n        return true;\n    }else if (value.length < minLength){\n        return false;\n    }else{\n        return true;\n    }\n    \n}\n\nfunction isValidNumber(value, minValue){\n    if (isNaN(parseFloat(value))) return false;\n    if (typeof minValue !== 'undefined'){\n        if (parseFloat(value) >= parseFloat(minValue)) return true;\n        else  return false;\n    }\n    return true;\n}\n\nfunction isValidIP(ipAddress){\n    return validate.ipv4(ipAddress);\n}\n\n\n module.exports = {\n    showNotification, \n    fortmatTime,\n    Message,\n    showFailNotification,\n    showErrorNotification,\n    showSuccessNotification,\n    sendAjaxToServer,\n    uploadCustomImage,\n    showErrorOnField,\n    isValidNumber,\n    isValidString,\n    isValidIP\n }\n\n//# sourceURL=webpack:///./frontend/utils.js?");

/***/ }),

/***/ "./models/form/CommonReceiveForm.js":
/*!******************************************!*\
  !*** ./models/form/CommonReceiveForm.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const CommonResponseForm = __webpack_require__(/*! ../form/CommonResponseForm */ \"./models/form/CommonResponseForm.js\");\n\nmodule.exports = class CommonReceiveForm{\n    /**\n     * Creates an instance of CommonReceiveForm.\n     * @param {CommonResponseForm} responseForm\n     */\n    constructor(responseForm){\n        this.success = responseForm.success;\n        this.message = responseForm.message;\n        this.data    = responseForm.data;\n    }\n\n    isSuccess(){\n        return this.success;\n    }\n\n    getMessage(){\n        return this.message;\n    }\n\n    getData(){\n        return this.data;\n    }\n}\n\n//# sourceURL=webpack:///./models/form/CommonReceiveForm.js?");

/***/ }),

/***/ "./models/form/CommonResponseForm.js":
/*!*******************************************!*\
  !*** ./models/form/CommonResponseForm.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = class CommonResponseForm{\n\n    /**\n     *Creates an instance of CommonResponseForm.\n     * @param {boolean} success\n     * @param {string} message\n     * @param {object} data\n     */\n    constructor(success, message, data){\n        this.success = success;\n        this.message = message || null;\n        this.data = data || null;\n    }\n\n    setSuccess(success){\n        this.success = success;\n    }\n\n    setMessage(message){\n        this.message = message;\n    }\n\n    setData(data){\n        this.data = data;\n    }\n\n    isSuccess(){\n        return this.success;\n    }\n\n    getMessage(){\n        return this.message;\n    }\n\n    getData(){\n        return this.data;\n    }\n}\n\n//# sourceURL=webpack:///./models/form/CommonResponseForm.js?");

/***/ }),

/***/ "./node_modules/ip-validator/lib/validator.js":
/*!****************************************************!*\
  !*** ./node_modules/ip-validator/lib/validator.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Generated by CoffeeScript 1.8.0\n(function() {\n  var Validator;\n\n  Validator = (function() {\n    function Validator() {}\n\n    Validator.prototype.ipv4 = function(ip) {\n      var regex;\n      regex = /(([0-1]?[0-9]{1,2}\\.)|(2[0-4][0-9]\\.)|(25[0-5]\\.)){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))/;\n      return regex.test(ip);\n    };\n\n    Validator.prototype.ipv6 = function(ip) {\n      var regex;\n      regex = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/;\n      return regex.test(ip);\n    };\n\n    Validator.prototype.ip = function(ip) {\n      var regex;\n      regex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\\-]*[a-zA-Z0-9])\\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\\-]*[A-Za-z0-9])$|^\\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:)))(%.+)?\\s*$/;\n      return regex.test(ip);\n    };\n\n    return Validator;\n\n  })();\n\n  module.exports = new Validator();\n\n}).call(this);\n\n\n//# sourceURL=webpack:///./node_modules/ip-validator/lib/validator.js?");

/***/ })

/******/ });