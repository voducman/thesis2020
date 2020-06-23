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
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/utils.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/utils.js":
/*!***************************!*\
  !*** ./frontend/utils.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const ReceiveForm = __webpack_require__(/*! ../models/form/CommonReceiveForm */ \"./models/form/CommonReceiveForm.js\");\r\nconst validate    = __webpack_require__(/*! ip-validator */ \"./node_modules/ip-validator/lib/validator.js\");\r\n\r\nfunction showNotification(from, align, type, message){\r\n\r\n    $.notify({\r\n        icon: \"add_alert\",\r\n        message: message\r\n\r\n    },{\r\n        type: type,\r\n        timer: 100,\r\n        placement: {\r\n            from: from,\r\n            align: align\r\n        },\r\n        z_index: 2000,\r\n    });\r\n};\r\n\r\n/**\r\n * Show a fail notification about response of request\r\n * @param {string} message\r\n * @param {number} code\r\n */\r\nfunction showFailNotification(message, code = 406){\r\n\r\n    $.notify({\r\n        icon: \"add_alert\",\r\n        message: `<b>FAIL</b>: ${message} [HTTP Code: ${code}]`\r\n\r\n    },{\r\n        type: 'warning',\r\n        timer: 100,\r\n        placement: {\r\n            from: 'top',\r\n            align: 'right'\r\n        },\r\n        z_index: 2000,\r\n    });\r\n};\r\n\r\n/**\r\n * Show a error notification about response of request\r\n * @param {string} message\r\n * @param {number} code\r\n */\r\nfunction showErrorNotification(message, code = 500){\r\n\r\n    $.notify({\r\n        icon: \"add_alert\",\r\n        message: `<b>ERROR</b>: ${message} [HTTP Code: ${code}]`\r\n\r\n    },{\r\n        type: 'danger',\r\n        timer: 100,\r\n        placement: {\r\n            from: 'top',\r\n            align: 'right'\r\n        },\r\n        z_index: 2000,\r\n    });\r\n};\r\n\r\n/**\r\n * Show a success notification about response of request\r\n * @param {string} message\r\n * @param {number} code\r\n */\r\nfunction showSuccessNotification(message, code = 200){\r\n\r\n    $.notify({\r\n        icon: \"add_alert\",\r\n        message: `<b>SUCCESS</b>: ${message} [HTTP Code: ${code}]`\r\n\r\n    },{\r\n        type: 'success',\r\n        timer: 100,\r\n        placement: {\r\n            from: 'top',\r\n            align: 'right'\r\n        },\r\n        z_index: 2000,\r\n    });\r\n};\r\n\r\nfunction fortmatTime(time){\r\n    let date = new Date(time);\r\n    let year = date.getFullYear();\r\n    let month = date.getMonth();\r\n    let date_ = date.getDate();\r\n    let hour  = date.getHours();\r\n    let min   = date.getMinutes();\r\n    let second = date.getSeconds();\r\n    return `${hour}:${min}:${second} ${date_}/${month}/${year}`;\r\n}\r\n\r\nfunction parseResponse(responseObj, textStatus){\r\n    \r\n}\r\n\r\n/**\r\n * Send Ajax request to server, \r\n * then show notification about status of response\r\n * @param {string} requestURL\r\n * @param {string} method\r\n * @param {object} [data={}]\r\n * @returns {Promise<ReceiveForm>}\r\n */\r\nfunction sendAjaxToServer(requestURL, method = \"GET\", data = {}) {\r\n    console.debug({requestURL, method, data})\r\n    let receiveForm, code;\r\n\r\n    const parseResponse = function(responseObj, httpCode){\r\n\r\n        if (receiveForm){\r\n            code = httpCode;\r\n        }else{\r\n            receiveForm = new ReceiveForm(JSON.parse(responseObj));\r\n            code = httpCode;\r\n        }\r\n    }\r\n\r\n    return new Promise((resolve, reject) => {\r\n        $.ajax({\r\n            url: requestURL,\r\n            method: method,\r\n            data: data,\r\n            contentType: \"application/json\",\r\n            statusCode: {\r\n                200: function(responseObj, textStatus){\r\n                    parseResponse(responseObj, 200);\r\n                    showSuccessNotification(receiveForm.getMessage(), code);\r\n                },\r\n\r\n                404: function(responseXHR, textStatus){\r\n                    parseResponse(responseXHR.responseText, 404);\r\n                    showFailNotification(receiveForm.getMessage(), code);\r\n                },\r\n\r\n                406: function(responseXHR, textStatus){\r\n                    parseResponse(responseXHR.responseText, 406);\r\n                    showFailNotification(receiveForm.getMessage(), code);\r\n                },\r\n\r\n                500: function(responseXHR, textStatus){\r\n                    parseResponse(responseXHR.responseText, 500);\r\n                    showErrorNotification(receiveForm.getMessage(), code);\r\n                },\r\n            }\r\n        })\r\n            .done(function (response) {\r\n                if (!receiveForm){\r\n                    receiveForm = new ReceiveForm(JSON.parse(response));\r\n                }\r\n\r\n                return resolve(receiveForm);\r\n            })\r\n            .fail(function (e) {\r\n                if (!e.responseText){\r\n                    showErrorNotification(\"SERVER OR NETWORK GET ERROR\", e.status);\r\n                }\r\n\r\n                return reject(null);\r\n            })\r\n    })\r\n}\r\n\r\n/**\r\n * Upload image to server, then receive a response\r\n * with URL of this image\r\n * @param {object} image - image raw data \r\n */\r\nfunction uploadCustomImage(image){\r\n    let form = new FormData();\r\n    form.append('image', image);\r\n    return new Promise((resolve, reject) => {\r\n\r\n        $.ajax({\r\n            url: '/drawing/upload/symbol',\r\n            method: 'POST',\r\n            processData: false,\r\n            contentType: false,\r\n            enctype: 'multipart/form-data',\r\n            data: form\r\n        })\r\n        .done(function(response){\r\n            let receiveForm = new ReceiveForm(JSON.parse(response));\r\n            console.log(receiveForm)\r\n            if (!receiveForm.success){\r\n                return reject(receiveForm.getMessage());\r\n            }\r\n            return resolve(receiveForm.getData());\r\n        })\r\n        .fail(function(error){\r\n            console.log(error);\r\n            return reject(null);\r\n        })\r\n    })\r\n}\r\n\r\n\r\n/** \r\n * @summary to look-up a beautiful text from rough text\r\n * @example Message(\"s7\") return: \"ETHERNET S7\" | Message(\"modbus\") return \"MODBUS TCP\"\r\n */\r\n\r\n function Message(text){\r\n    const table = {\r\n        \"s7\": \"ETHERNET S7\",\r\n        \"modbus\": \"MODBUS TCP\",\r\n        \"opcua\": \"OPC UA\",\r\n        \"siemens\": \"SIEMENS\",\r\n        \"schneider\": \"SCHNEIDER\",\r\n        \"mitsubishi\": \"MITSUBISHI\",\r\n        \"s7-300\": \"S7-300\",\r\n        \"s7-1200\": \"S7-1200\",\r\n        \"s7-1500\": \"S7-1500\",\r\n\r\n        \"1\": \"TRUE\",\r\n        \"true\": \"TRUE\",\r\n        \"0\": \"FALSE\",\r\n        \"false\": \"FALSE\",\r\n\r\n        \"hd\": \"HD Ready [1280 x 720]\",\r\n        'fhd': \"FHD [1920 x 1080]\",\r\n        \"qhd\": \"QHD [2560 x 1440]\"\r\n    }\r\n\r\n    let result = table[text] || String(text).toUpperCase();\r\n    return result;\r\n }\r\n\r\n function showErrorOnField(selector){\r\n    $(selector).parent().addClass('has-error');\r\n}\r\n\r\nfunction isValidString(value, minLength){\r\n    if (typeof value !== 'string') return false;\r\n    if (!value.length) return false;\r\n\r\n    if (!minLength || minLength < 1) {\r\n        return true;\r\n    }else if (value.length < minLength){\r\n        return false;\r\n    }else{\r\n        return true;\r\n    }\r\n    \r\n}\r\n\r\nfunction isValidNumber(value, minValue){\r\n    if (isNaN(parseFloat(value))) return false;\r\n    if (typeof minValue !== 'undefined'){\r\n        if (parseFloat(value) >= parseFloat(minValue)) return true;\r\n        else  return false;\r\n    }\r\n    return true;\r\n}\r\n\r\nfunction isValidIP(ipAddress){\r\n    return validate.ipv4(ipAddress);\r\n}\r\n\r\n\r\n module.exports = {\r\n    showNotification, \r\n    fortmatTime,\r\n    Message,\r\n    showFailNotification,\r\n    showErrorNotification,\r\n    showSuccessNotification,\r\n    sendAjaxToServer,\r\n    uploadCustomImage,\r\n    showErrorOnField,\r\n    isValidNumber,\r\n    isValidString,\r\n    isValidIP\r\n }\n\n//# sourceURL=webpack:///./frontend/utils.js?");

/***/ }),

/***/ "./models/form/CommonReceiveForm.js":
/*!******************************************!*\
  !*** ./models/form/CommonReceiveForm.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const CommonResponseForm = __webpack_require__(/*! ../form/CommonResponseForm */ \"./models/form/CommonResponseForm.js\");\r\n\r\nmodule.exports = class CommonReceiveForm{\r\n    /**\r\n     * Creates an instance of CommonReceiveForm.\r\n     * @param {CommonResponseForm} responseForm\r\n     */\r\n    constructor(responseForm){\r\n        this.success = responseForm.success;\r\n        this.message = responseForm.message;\r\n        this.data    = responseForm.data;\r\n    }\r\n\r\n    isSuccess(){\r\n        return this.success;\r\n    }\r\n\r\n    getMessage(){\r\n        return this.message;\r\n    }\r\n\r\n    getData(){\r\n        return this.data;\r\n    }\r\n}\n\n//# sourceURL=webpack:///./models/form/CommonReceiveForm.js?");

/***/ }),

/***/ "./models/form/CommonResponseForm.js":
/*!*******************************************!*\
  !*** ./models/form/CommonResponseForm.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = class CommonResponseForm{\r\n\r\n    /**\r\n     *Creates an instance of CommonResponseForm.\r\n     * @param {boolean} success\r\n     * @param {string} message\r\n     * @param {object} data\r\n     */\r\n    constructor(success, message, data){\r\n        this.success = success;\r\n        this.message = message || null;\r\n        this.data = data || null;\r\n    }\r\n\r\n    setSuccess(success){\r\n        this.success = success;\r\n    }\r\n\r\n    setMessage(message){\r\n        this.message = message;\r\n    }\r\n\r\n    setData(data){\r\n        this.data = data;\r\n    }\r\n\r\n    isSuccess(){\r\n        return this.success;\r\n    }\r\n\r\n    getMessage(){\r\n        return this.message;\r\n    }\r\n\r\n    getData(){\r\n        return this.data;\r\n    }\r\n}\n\n//# sourceURL=webpack:///./models/form/CommonResponseForm.js?");

/***/ }),

/***/ "./node_modules/ip-validator/lib/validator.js":
/*!****************************************************!*\
  !*** ./node_modules/ip-validator/lib/validator.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Generated by CoffeeScript 1.8.0\r\n(function() {\r\n  var Validator;\r\n\r\n  Validator = (function() {\r\n    function Validator() {}\r\n\r\n    Validator.prototype.ipv4 = function(ip) {\r\n      var regex;\r\n      regex = /(([0-1]?[0-9]{1,2}\\.)|(2[0-4][0-9]\\.)|(25[0-5]\\.)){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))/;\r\n      return regex.test(ip);\r\n    };\r\n\r\n    Validator.prototype.ipv6 = function(ip) {\r\n      var regex;\r\n      regex = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/;\r\n      return regex.test(ip);\r\n    };\r\n\r\n    Validator.prototype.ip = function(ip) {\r\n      var regex;\r\n      regex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\\-]*[a-zA-Z0-9])\\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\\-]*[A-Za-z0-9])$|^\\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:)))(%.+)?\\s*$/;\r\n      return regex.test(ip);\r\n    };\r\n\r\n    return Validator;\r\n\r\n  })();\r\n\r\n  module.exports = new Validator();\r\n\r\n}).call(this);\r\n\n\n//# sourceURL=webpack:///./node_modules/ip-validator/lib/validator.js?");

/***/ })

/******/ });