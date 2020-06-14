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
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/design/design.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/design/design.js":
/*!***********************************!*\
  !*** ./frontend/design/design.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util       = __webpack_require__(/*! ../utils */ \"./frontend/utils.js\");\nconst designList = __webpack_require__(/*! ./designListData */ \"./frontend/design/designListData.js\");\nconst designUtil = __webpack_require__(/*! ./designUtil */ \"./frontend/design/designUtil.js\");\nconst AddDesignForm  = __webpack_require__(/*! ../../models/form/AddDesignForm */ \"./models/form/AddDesignForm.js\");\n\n\ndesignList.initProjectFromServer()\n    .then(() => {\n\n        designUtil.renderDesignTable(designList);\n    })\n    .catch((e) => console.error(e));\n\n\ndesignUtil.setupEventCreateNewBtn();\n\n\n$('#save-design').click(function () {\n    let newDesignForm = designUtil.parseDataCreateForm();\n    if (newDesignForm == null) {\n        return false;\n    }\n\n    const sendData = JSON.stringify(newDesignForm);\n    Util.sendAjaxToServer(\"/design/json/create\", \"POST\", sendData)\n        .then(function (receiveForm) {\n         \n            if (receiveForm.isSuccess()) {\n\n                designList.createNewProject(receiveForm.getData());\n                designUtil.renderDesignTable(designList);\n            }\n        })\n        .catch((e) => console.error(e));\n})\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./frontend/design/design.js?");

/***/ }),

/***/ "./frontend/design/designListData.js":
/*!*******************************************!*\
  !*** ./frontend/design/designListData.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util        = __webpack_require__(/*! ../utils */ \"./frontend/utils.js\");\nconst designUtil  = __webpack_require__(/*! ./designUtil */ \"./frontend/design/designUtil.js\");\nconst ReceiveForm = __webpack_require__(/*! ../../models/form/CommonReceiveForm */ \"./models/form/CommonReceiveForm.js\");\nconst AddDesignForm  = __webpack_require__(/*! ../../models/form/AddDesignForm */ \"./models/form/AddDesignForm.js\");\n\n\n\n// Design List data for create new Design action\nlet designList = {\n    data: [],\n\n    getData: function(){\n        return this.data;\n    },\n\n    setData: function(data){\n        this.data = data;\n    },\n\n    initProjectFromServer: function(){\n        let receiveForm;\n\n        return new Promise((resolve, reject) => {\n\n            Util.sendAjaxToServer(\"/design/json/fetch/designList\", \"GET\")\n                .then(function (receiveForm) {\n                   \n                    if (receiveForm.isSuccess()) {\n        \n                        designList.setData(receiveForm.getData());\n                        console.log(\"Data: \", designList.getData());\n                        return resolve(true);\n                    } else {\n\n                        this.data = [];\n                        return reject(false);\n                    }\n                })\n                .catch(function (error) {\n                    return reject(false);\n                })\n\n        })\n\n    },\n\n    createNewProject: function(project){\n        this.data.push(project);\n    },\n\n    deleteDesign: function(designId){\n\n        return new Promise((resolve, reject) => {\n            \n            Util.sendAjaxToServer(\"/design/json/delete/\" + designId, \"DELETE\")\n                .then(function(receiveForm){\n                   \n                    if (receiveForm.isSuccess()){\n                        designList.setData(receiveForm.getData());\n                        designUtil.renderDesignTable(designList);\n                    }\n                })\n                .catch((e) => console.error(e));\n        })\n\n    }\n}\n\nmodule.exports = designList;\n\n//# sourceURL=webpack:///./frontend/design/designListData.js?");

/***/ }),

/***/ "./frontend/design/designUtil.js":
/*!***************************************!*\
  !*** ./frontend/design/designUtil.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util           = __webpack_require__(/*! ../utils */ \"./frontend/utils.js\");\nconst designListData = __webpack_require__(/*! ./designListData */ \"./frontend/design/designListData.js\");\nconst AddDesignForm  = __webpack_require__(/*! ../../models/form/AddDesignForm */ \"./models/form/AddDesignForm.js\");\n\n\nmodule.exports = (function(){\n    \n    function _initCreateNewBtn(){\n        $('#create-design').click(function () {\n            // Show create new form popup modal\n            $('#showModal').click();\n        })\n    }\n\n    /**\n     *\n     * @param {string} designId\n     * @param {Promise<designListData} designListObj\n     */\n    async function _deleteDesign(designId, designListObj) {\n        const status = await designListObj.deleteDesign(designId);\n        \n    }\n\n    function _addContextMenuDeleteDesign(id, designListObj) {\n        let menu = new ContextMenu({\n            'theme': 'default', // or 'blue'\n            'items': [\n                { 'icon': 'trash', 'name': 'Delete this Design', 'action': () => _deleteDesign(id, designListObj) },\n            ]\n        });\n    \n    \n        let openContextMenu = function (evt) {\n    \n            // prevent default event\n            evt.preventDefault();\n            // open the menu with a delay\n            const time = menu.isOpen() ? 100 : 0;\n            // hide the current menu (if any)\n            menu.hide();\n            // display menu at mouse click position\n            setTimeout(() => { menu.show(evt.pageX, evt.pageY) }, time);\n            // close the menu if the user clicks anywhere on the screen\n            document.addEventListener('click', hideContextMenu, false);\n        }\n    \n        let hideContextMenu = function (evt) {\n    \n            // hide the menu\n            menu.hide();\n            // remove the listener from the document\n            document.removeEventListener('click', hideContextMenu);\n    \n        }\n    \n        document.getElementById(id).addEventListener('contextmenu', openContextMenu, false);\n    }\n\n\n    function _renderDesignTable(designListObj) {\n\n        $('#render-table').empty();\n        let data = designListObj.getData();\n\n        if (!Array.isArray(data)){\n            console.debug(\"DesignList not an Array. Bug here!\")\n            return false;\n        }\n\n        data.forEach((ds, index) => {\n    \n            let isCompile = (ds.compiled) ? 'compiled' : 'notcompiled';\n    \n            let isRunable = (ds.compiled) ?\n                `'class=\"btn btn-success\" href=\"${ds.runLink}\" target=\"_blank\"'` :\n                'class=\"btn btn-black\"';\n    \n            let row = `\n            <tr class=\"focus-table\" id=\"${ds.designId}\">\n                <td class=\"text-center\">${(index < 10 ? '0' + ++index : index++)}</td>\n                <td class=\"text-center\">${ds.name}</td>\n                <td class=\"text-center\">${Util.fortmatTime(ds.createdTime)}</td>\n                <td class=\"text-center\">${Util.fortmatTime(ds.lastModified)}</td>\n                <td class=\"td-actions text-center\">\n                    <i class=\"material-icons ${isCompile}\"\n                    rel=\"tooltip\" data-original-title=\"${ds.compiled ? 'Compiled' : 'Not Compiled'}\"\n                    >info</i>\n                </td>\n                <td class=\"td-actions text-center\">\n                    <button type=\"button\" rel=\"tooltip\" class=\"btn btn-facebook\"\n                        data-original-title=\"Description\" title=\"\"\n                        data-toggle=\"collapse\" data-target=\"#row-${index + 1}\">\n                        <i class=\"material-icons\">description</i>\n                    </button>\n                </td>\n                <td class=\"td-actions text-center\">\n                    <a type=\"button\" rel=\"tooltip\" ${isRunable} \n                        data-original-title=\"${ds.compiled ? 'Run the Design' : 'Unavailable'}\" title=\"\">\n                        <i class=\"material-icons\">play_circle_filled</i>\n                    </a>\n                </td>\n                <td class=\"td-actions text-center\">\n                    <a rel=\"tooltip\" class=\"btn btn-google\" href=\"/drawing/${ds.name}/${ds.designId}\" target=\"_blank\"\n                        data-original-title=\"Go to Design Page\">\n                        <i class=\"material-icons\">launch</i>\n                    </a>\n                </td>\n                \n                </tr>\n                <tr id=\"row-${index + 1}\" class=\"collapse\" style=\"background-color: #dddfd4;\">\n                    <td colspan=\"8\" rowspan=\"1\">                                                      \n                        <div class=\"row\">\n                            <div class=\"col-md-12\"><b>Resolution</b>: ${Util.Message(ds.resolution)}</div>\n                        </div> \n                        <div class=\"row\">\n                            <div class=\"col-md-12\"><b>Description</b>: ${ds.description}</div>\n                        </div>                                                      \n                    </td>\n                </tr>\n            `\n            $('#render-table').append(row);\n            $('[rel=tooltip]').tooltip();\n            _addContextMenuDeleteDesign(ds.designId, designListObj);\n        })\n    }\n\n\n    \n    return {\n\n        setupEventCreateNewBtn: function(){\n            _initCreateNewBtn();\n        },\n\n        /**\n         * Render table on design page\n         * @param {designListData} data - a list of design\n         */\n        renderDesignTable: function(designListObj){\n            _renderDesignTable(designListObj);\n        },\n\n         /**\n         * Get new design data from create new popup modal\n         * @returns {AddDesignForm} - a Data form of new design\n         */\n        parseDataCreateForm: function () {\n\n            let name = $('input[name=name]').val();\n            if (name.length < 1) {\n                $('input[name=name]').parent().addClass('has-error');\n                return null;\n            }\n\n            let description = $('input[name=description]').val();\n            let resolution = $('#revolution').val();\n\n            return new AddDesignForm(name, description, resolution);\n        }\n\n    }\n\n})()\n\n//# sourceURL=webpack:///./frontend/design/designUtil.js?");

/***/ }),

/***/ "./frontend/utils.js":
/*!***************************!*\
  !*** ./frontend/utils.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const ReceiveForm = __webpack_require__(/*! ../models/form/CommonReceiveForm */ \"./models/form/CommonReceiveForm.js\");\nconst validate    = __webpack_require__(/*! ip-validator */ \"./node_modules/ip-validator/lib/validator.js\");\n\nfunction showNotification(from, align, type, message){\n\n    $.notify({\n        icon: \"add_alert\",\n        message: message\n\n    },{\n        type: type,\n        timer: 100,\n        placement: {\n            from: from,\n            align: align\n        },\n        z_index: 2000,\n    });\n};\n\n/**\n * Show a fail notification about response of request\n * @param {string} message\n * @param {number} code\n */\nfunction showFailNotification(message, code = 406){\n\n    $.notify({\n        icon: \"add_alert\",\n        message: `<b>FAIL</b>: ${message} [HTTP Code: ${code}]`\n\n    },{\n        type: 'warning',\n        timer: 100,\n        placement: {\n            from: 'top',\n            align: 'right'\n        },\n        z_index: 2000,\n    });\n};\n\n/**\n * Show a error notification about response of request\n * @param {string} message\n * @param {number} code\n */\nfunction showErrorNotification(message, code = 500){\n\n    $.notify({\n        icon: \"add_alert\",\n        message: `<b>ERROR</b>: ${message} [HTTP Code: ${code}]`\n\n    },{\n        type: 'danger',\n        timer: 100,\n        placement: {\n            from: 'top',\n            align: 'right'\n        },\n        z_index: 2000,\n    });\n};\n\n/**\n * Show a success notification about response of request\n * @param {string} message\n * @param {number} code\n */\nfunction showSuccessNotification(message, code = 200){\n\n    $.notify({\n        icon: \"add_alert\",\n        message: `<b>SUCCESS</b>: ${message} [HTTP Code: ${code}]`\n\n    },{\n        type: 'success',\n        timer: 100,\n        placement: {\n            from: 'top',\n            align: 'right'\n        },\n        z_index: 2000,\n    });\n};\n\nfunction fortmatTime(time){\n    let date = new Date(time);\n    let year = date.getFullYear();\n    let month = date.getMonth();\n    let date_ = date.getDate();\n    let hour  = date.getHours();\n    let min   = date.getMinutes();\n    let second = date.getSeconds();\n    return `${hour}:${min}:${second} ${date_}/${month}/${year}`;\n}\n\nfunction parseResponse(responseObj, textStatus){\n    \n}\n\n/**\n * Send Ajax request to server, \n * then show notification about status of response\n * @param {string} requestURL\n * @param {string} method\n * @param {object} [data={}]\n * @returns {Promise<ReceiveForm>}\n */\nfunction sendAjaxToServer(requestURL, method = \"GET\", data = {}) {\n    console.debug({requestURL, method, data})\n    let receiveForm, code;\n\n    const parseResponse = function(responseObj, httpCode){\n\n        if (receiveForm){\n            code = httpCode;\n        }else{\n            receiveForm = new ReceiveForm(JSON.parse(responseObj));\n            code = httpCode;\n        }\n    }\n\n    return new Promise((resolve, reject) => {\n        $.ajax({\n            url: requestURL,\n            method: method,\n            data: data,\n            contentType: \"application/json\",\n            statusCode: {\n                200: function(responseObj, textStatus){\n                    parseResponse(responseObj, 200);\n                    showSuccessNotification(receiveForm.getMessage(), code);\n                },\n\n                404: function(responseXHR, textStatus){\n                    parseResponse(responseXHR.responseText, 404);\n                    showFailNotification(receiveForm.getMessage(), code);\n                },\n\n                406: function(responseXHR, textStatus){\n                    parseResponse(responseXHR.responseText, 406);\n                    showFailNotification(receiveForm.getMessage(), code);\n                },\n\n                500: function(responseXHR, textStatus){\n                    parseResponse(responseXHR.responseText, 500);\n                    showErrorNotification(receiveForm.getMessage(), code);\n                },\n            }\n        })\n            .done(function (response) {\n                if (!receiveForm){\n                    receiveForm = new ReceiveForm(JSON.parse(response));\n                }\n\n                return resolve(receiveForm);\n            })\n            .fail(function (e) {\n                if (!e.responseText){\n                    showErrorNotification(\"SERVER OR NETWORK GET ERROR\", e.status);\n                }\n\n                return reject(null);\n            })\n    })\n}\n\n/**\n * Upload image to server, then receive a response\n * with URL of this image\n * @param {object} image - image raw data \n */\nfunction uploadCustomImage(image){\n    let form = new FormData();\n    form.append('image', image);\n    return new Promise((resolve, reject) => {\n\n        $.ajax({\n            url: '/drawing/upload/symbol',\n            method: 'POST',\n            processData: false,\n            contentType: false,\n            enctype: 'multipart/form-data',\n            data: form\n        })\n        .done(function(response){\n            let receiveForm = new ReceiveForm(JSON.parse(response));\n            console.log(receiveForm)\n            if (!receiveForm.success){\n                return reject(receiveForm.getMessage());\n            }\n            return resolve(receiveForm.getData());\n        })\n        .fail(function(error){\n            console.log(error);\n            return reject(null);\n        })\n    })\n}\n\n\n/** \n * @summary to look-up a beautiful text from rough text\n * @example Message(\"s7\") return: \"ETHERNET S7\" | Message(\"modbus\") return \"MODBUS TCP\"\n */\n\n function Message(text){\n    const table = {\n        \"s7\": \"ETHERNET S7\",\n        \"modbus\": \"MODBUS TCP\",\n        \"opcua\": \"OPC UA\",\n        \"siemens\": \"SIEMENS\",\n        \"schneider\": \"SCHNEIDER\",\n        \"mitsubishi\": \"MITSUBISHI\",\n        \"s7-300\": \"S7-300\",\n        \"s7-1200\": \"S7-1200\",\n        \"s7-1500\": \"S7-1500\",\n\n        \"1\": \"TRUE\",\n        \"true\": \"TRUE\",\n        \"0\": \"FALSE\",\n        \"false\": \"FALSE\",\n\n        \"hd\": \"HD Ready [1280 x 720]\",\n        'fhd': \"FHD [1920 x 1080]\",\n        \"qhd\": \"QHD [2560 x 1440]\"\n    }\n\n    let result = table[text] || String(text).toUpperCase();\n    return result;\n }\n\n function showErrorOnField(selector){\n    $(selector).parent().addClass('has-error');\n}\n\nfunction isValidString(value, minLength){\n    if (typeof value !== 'string') return false;\n    if (!value.length) return false;\n\n    if (!minLength || minLength < 1) {\n        return true;\n    }else if (value.length < minLength){\n        return false;\n    }else{\n        return true;\n    }\n    \n}\n\nfunction isValidNumber(value, minValue){\n    if (isNaN(parseFloat(value))) return false;\n    if (typeof minValue !== 'undefined'){\n        if (parseFloat(value) >= parseFloat(minValue)) return true;\n        else  return false;\n    }\n    return true;\n}\n\nfunction isValidIP(ipAddress){\n    return validate.ipv4(ipAddress);\n}\n\n\n module.exports = {\n    showNotification, \n    fortmatTime,\n    Message,\n    showFailNotification,\n    showErrorNotification,\n    showSuccessNotification,\n    sendAjaxToServer,\n    uploadCustomImage,\n    showErrorOnField,\n    isValidNumber,\n    isValidString,\n    isValidIP\n }\n\n//# sourceURL=webpack:///./frontend/utils.js?");

/***/ }),

/***/ "./models/form/AddDesignForm.js":
/*!**************************************!*\
  !*** ./models/form/AddDesignForm.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = class AddDesignForm{\n\n    /**\n     *Creates an instance of AddDesignForm.\n     * @param {string} name\n     * @param {string} description\n     * @param {string} resolution\n     */\n    constructor(name, description, resolution){\n        this.name = name;\n        this.description = description;\n        this.resolution = resolution;\n    }\n\n    /**\n     * Pars form and create new instance of AddDesignForm\n     * @static\n     * @param {AddDesignForm} addDesignForm\n     */\n    static parseDesignForm(addDesignForm){\n        console.debug(addDesignForm)\n        let {name, description, resolution} = addDesignForm;\n        return new AddDesignForm(name, description, resolution);\n    }\n\n    getName(){\n        return this.name;\n    }\n\n    getDescription(){\n        return this.description;\n    }\n\n    getResolution(){\n        return this.resolution;\n    }\n}\n\n//# sourceURL=webpack:///./models/form/AddDesignForm.js?");

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