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

eval("const Util       = __webpack_require__(/*! ../utils */ \"./frontend/utils.js\");\r\nconst designList = __webpack_require__(/*! ./designListData */ \"./frontend/design/designListData.js\");\r\nconst designUtil = __webpack_require__(/*! ./designUtil */ \"./frontend/design/designUtil.js\");\r\nconst AddDesignForm  = __webpack_require__(/*! ../../models/form/AddDesignForm */ \"./models/form/AddDesignForm.js\");\r\n\r\n\r\ndesignList.initProjectFromServer()\r\n    .then(() => {\r\n\r\n        designUtil.renderDesignTable(designList);\r\n    })\r\n    .catch((e) => console.error(e));\r\n\r\n\r\ndesignUtil.setupEventCreateNewBtn();\r\n\r\n\r\n$('#save-design').click(function () {\r\n    let newDesignForm = designUtil.parseDataCreateForm();\r\n    if (newDesignForm == null) {\r\n        return false;\r\n    }\r\n\r\n    const sendData = JSON.stringify(newDesignForm);\r\n    Util.sendAjaxToServer(\"/design/json/create\", \"POST\", sendData)\r\n        .then(function (receiveForm) {\r\n         \r\n            if (receiveForm.isSuccess()) {\r\n\r\n                designList.createNewProject(receiveForm.getData());\r\n                designUtil.renderDesignTable(designList);\r\n            }\r\n        })\r\n        .catch((e) => console.error(e));\r\n})\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./frontend/design/design.js?");

/***/ }),

/***/ "./frontend/design/designListData.js":
/*!*******************************************!*\
  !*** ./frontend/design/designListData.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util        = __webpack_require__(/*! ../utils */ \"./frontend/utils.js\");\r\nconst designUtil  = __webpack_require__(/*! ./designUtil */ \"./frontend/design/designUtil.js\");\r\nconst ReceiveForm = __webpack_require__(/*! ../../models/form/CommonReceiveForm */ \"./models/form/CommonReceiveForm.js\");\r\nconst AddDesignForm  = __webpack_require__(/*! ../../models/form/AddDesignForm */ \"./models/form/AddDesignForm.js\");\r\n\r\n\r\n\r\n// Design List data for create new Design action\r\nlet designList = {\r\n    data: [],\r\n\r\n    getData: function(){\r\n        return this.data;\r\n    },\r\n\r\n    setData: function(data){\r\n        this.data = data;\r\n    },\r\n\r\n    initProjectFromServer: function(){\r\n        let receiveForm;\r\n\r\n        return new Promise((resolve, reject) => {\r\n\r\n            Util.sendAjaxToServer(\"/design/json/fetch/designList\", \"GET\")\r\n                .then(function (receiveForm) {\r\n                   \r\n                    if (receiveForm.isSuccess()) {\r\n        \r\n                        designList.setData(receiveForm.getData());\r\n                        console.log(\"Data: \", designList.getData());\r\n                        return resolve(true);\r\n                    } else {\r\n\r\n                        this.data = [];\r\n                        return reject(false);\r\n                    }\r\n                })\r\n                .catch(function (error) {\r\n                    return reject(false);\r\n                })\r\n\r\n        })\r\n\r\n    },\r\n\r\n    createNewProject: function(project){\r\n        this.data.push(project);\r\n    },\r\n\r\n    deleteDesign: function(designId){\r\n\r\n        return new Promise((resolve, reject) => {\r\n            \r\n            Util.sendAjaxToServer(\"/design/json/delete/\" + designId, \"DELETE\")\r\n                .then(function(receiveForm){\r\n                   \r\n                    if (receiveForm.isSuccess()){\r\n                        designList.setData(receiveForm.getData());\r\n                        designUtil.renderDesignTable(designList);\r\n                    }\r\n                })\r\n                .catch((e) => console.error(e));\r\n        })\r\n\r\n    }\r\n}\r\n\r\nmodule.exports = designList;\n\n//# sourceURL=webpack:///./frontend/design/designListData.js?");

/***/ }),

/***/ "./frontend/design/designUtil.js":
/*!***************************************!*\
  !*** ./frontend/design/designUtil.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util           = __webpack_require__(/*! ../utils */ \"./frontend/utils.js\");\r\nconst designListData = __webpack_require__(/*! ./designListData */ \"./frontend/design/designListData.js\");\r\nconst AddDesignForm  = __webpack_require__(/*! ../../models/form/AddDesignForm */ \"./models/form/AddDesignForm.js\");\r\n\r\n\r\nmodule.exports = (function(){\r\n    \r\n    function _initCreateNewBtn(){\r\n        $('#create-design').click(function () {\r\n            // Show create new form popup modal\r\n            $('#showModal').click();\r\n        })\r\n    }\r\n\r\n    /**\r\n     *\r\n     * @param {string} designId\r\n     * @param {Promise<designListData} designListObj\r\n     */\r\n    async function _deleteDesign(designId, designListObj) {\r\n        const status = await designListObj.deleteDesign(designId);\r\n        \r\n    }\r\n\r\n    function _addContextMenuDeleteDesign(id, designListObj) {\r\n        let menu = new ContextMenu({\r\n            'theme': 'default', // or 'blue'\r\n            'items': [\r\n                { 'icon': 'trash', 'name': 'Delete this Design', 'action': () => _deleteDesign(id, designListObj) },\r\n            ]\r\n        });\r\n    \r\n    \r\n        let openContextMenu = function (evt) {\r\n    \r\n            // prevent default event\r\n            evt.preventDefault();\r\n            // open the menu with a delay\r\n            const time = menu.isOpen() ? 100 : 0;\r\n            // hide the current menu (if any)\r\n            menu.hide();\r\n            // display menu at mouse click position\r\n            setTimeout(() => { menu.show(evt.pageX, evt.pageY) }, time);\r\n            // close the menu if the user clicks anywhere on the screen\r\n            document.addEventListener('click', hideContextMenu, false);\r\n        }\r\n    \r\n        let hideContextMenu = function (evt) {\r\n    \r\n            // hide the menu\r\n            menu.hide();\r\n            // remove the listener from the document\r\n            document.removeEventListener('click', hideContextMenu);\r\n    \r\n        }\r\n    \r\n        document.getElementById(id).addEventListener('contextmenu', openContextMenu, false);\r\n    }\r\n\r\n\r\n    function _renderDesignTable(designListObj) {\r\n\r\n        $('#render-table').empty();\r\n        let data = designListObj.getData();\r\n\r\n        if (!Array.isArray(data)){\r\n            console.debug(\"DesignList not an Array. Bug here!\")\r\n            return false;\r\n        }\r\n\r\n        data.forEach((ds, index) => {\r\n    \r\n            let isCompile = (ds.compiled) ? 'compiled' : 'notcompiled';\r\n    \r\n            let isRunable = (ds.compiled) ?\r\n                `'class=\"btn btn-success\" href=\"${ds.runLink}\" target=\"_blank\"'` :\r\n                'class=\"btn btn-black\"';\r\n    \r\n            let row = `\r\n            <tr class=\"focus-table\" id=\"${ds.designId}\">\r\n                <td class=\"text-center\">${(index < 10 ? '0' + ++index : index++)}</td>\r\n                <td class=\"text-center\">${ds.name}</td>\r\n                <td class=\"text-center\">${Util.fortmatTime(ds.createdTime)}</td>\r\n                <td class=\"text-center\">${Util.fortmatTime(ds.lastModified)}</td>\r\n                <td class=\"td-actions text-center\">\r\n                    <i class=\"material-icons ${isCompile}\"\r\n                    rel=\"tooltip\" data-original-title=\"${ds.compiled ? 'Compiled' : 'Not Compiled'}\"\r\n                    >info</i>\r\n                </td>\r\n                <td class=\"td-actions text-center\">\r\n                    <button type=\"button\" rel=\"tooltip\" class=\"btn btn-facebook\"\r\n                        data-original-title=\"Description\" title=\"\"\r\n                        data-toggle=\"collapse\" data-target=\"#row-${index + 1}\">\r\n                        <i class=\"material-icons\">description</i>\r\n                    </button>\r\n                </td>\r\n                <td class=\"td-actions text-center\">\r\n                    <a type=\"button\" rel=\"tooltip\" ${isRunable} \r\n                        data-original-title=\"${ds.compiled ? 'Run the Design' : 'Unavailable'}\" title=\"\">\r\n                        <i class=\"material-icons\">play_circle_filled</i>\r\n                    </a>\r\n                </td>\r\n                <td class=\"td-actions text-center\">\r\n                    <a rel=\"tooltip\" class=\"btn btn-google\" href=\"/drawing/${ds.name}/${ds.designId}\" target=\"_blank\"\r\n                        data-original-title=\"Go to Design Page\">\r\n                        <i class=\"material-icons\">launch</i>\r\n                    </a>\r\n                </td>\r\n                \r\n                </tr>\r\n                <tr id=\"row-${index + 1}\" class=\"collapse\" style=\"background-color: #dddfd4;\">\r\n                    <td colspan=\"8\" rowspan=\"1\">                                                      \r\n                        <div class=\"row\">\r\n                            <div class=\"col-md-12\"><b>Resolution</b>: ${Util.Message(ds.resolution)}</div>\r\n                        </div> \r\n                        <div class=\"row\">\r\n                            <div class=\"col-md-12\"><b>Description</b>: ${ds.description}</div>\r\n                        </div>                                                      \r\n                    </td>\r\n                </tr>\r\n            `\r\n            $('#render-table').append(row);\r\n            $('[rel=tooltip]').tooltip();\r\n            _addContextMenuDeleteDesign(ds.designId, designListObj);\r\n        })\r\n    }\r\n\r\n\r\n    \r\n    return {\r\n\r\n        setupEventCreateNewBtn: function(){\r\n            _initCreateNewBtn();\r\n        },\r\n\r\n        /**\r\n         * Render table on design page\r\n         * @param {designListData} data - a list of design\r\n         */\r\n        renderDesignTable: function(designListObj){\r\n            _renderDesignTable(designListObj);\r\n        },\r\n\r\n         /**\r\n         * Get new design data from create new popup modal\r\n         * @returns {AddDesignForm} - a Data form of new design\r\n         */\r\n        parseDataCreateForm: function () {\r\n\r\n            let name = $('input[name=name]').val();\r\n            if (name.length < 1) {\r\n                $('input[name=name]').parent().addClass('has-error');\r\n                return null;\r\n            }\r\n\r\n            let description = $('input[name=description]').val();\r\n            let resolution = $('#revolution').val();\r\n\r\n            return new AddDesignForm(name, description, resolution);\r\n        }\r\n\r\n    }\r\n\r\n})()\n\n//# sourceURL=webpack:///./frontend/design/designUtil.js?");

/***/ }),

/***/ "./frontend/utils.js":
/*!***************************!*\
  !*** ./frontend/utils.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const ReceiveForm = __webpack_require__(/*! ../models/form/CommonReceiveForm */ \"./models/form/CommonReceiveForm.js\");\r\nconst validate    = __webpack_require__(/*! ip-validator */ \"./node_modules/ip-validator/lib/validator.js\");\r\n\r\nfunction showNotification(from, align, type, message){\r\n\r\n    $.notify({\r\n        icon: \"add_alert\",\r\n        message: message\r\n\r\n    },{\r\n        type: type,\r\n        timer: 100,\r\n        placement: {\r\n            from: from,\r\n            align: align\r\n        },\r\n        z_index: 2000,\r\n    });\r\n};\r\n\r\n/**\r\n * Show a fail notification about response of request\r\n * @param {string} message\r\n * @param {number} code\r\n */\r\nfunction showFailNotification(message, code = 406){\r\n\r\n    $.notify({\r\n        icon: \"add_alert\",\r\n        message: `<b>FAIL</b>: ${message} [HTTP Code: ${code}]`\r\n\r\n    },{\r\n        type: 'warning',\r\n        timer: 100,\r\n        placement: {\r\n            from: 'top',\r\n            align: 'right'\r\n        },\r\n        z_index: 2000,\r\n    });\r\n};\r\n\r\n/**\r\n * Show a error notification about response of request\r\n * @param {string} message\r\n * @param {number} code\r\n */\r\nfunction showErrorNotification(message, code = 500){\r\n\r\n    $.notify({\r\n        icon: \"add_alert\",\r\n        message: `<b>ERROR</b>: ${message} [HTTP Code: ${code}]`\r\n\r\n    },{\r\n        type: 'danger',\r\n        timer: 100,\r\n        placement: {\r\n            from: 'top',\r\n            align: 'right'\r\n        },\r\n        z_index: 2000,\r\n    });\r\n};\r\n\r\n/**\r\n * Show a success notification about response of request\r\n * @param {string} message\r\n * @param {number} code\r\n */\r\nfunction showSuccessNotification(message, code = 200){\r\n\r\n    $.notify({\r\n        icon: \"add_alert\",\r\n        message: `<b>SUCCESS</b>: ${message} [HTTP Code: ${code}]`\r\n\r\n    },{\r\n        type: 'success',\r\n        timer: 100,\r\n        placement: {\r\n            from: 'top',\r\n            align: 'right'\r\n        },\r\n        z_index: 2000,\r\n    });\r\n};\r\n\r\nfunction fortmatTime(time){\r\n    let date = new Date(time);\r\n    let year = date.getFullYear();\r\n    let month = date.getMonth();\r\n    let date_ = date.getDate();\r\n    let hour  = date.getHours();\r\n    let min   = date.getMinutes();\r\n    let second = date.getSeconds();\r\n    return `${hour}:${min}:${second} ${date_}/${month}/${year}`;\r\n}\r\n\r\nfunction parseResponse(responseObj, textStatus){\r\n    \r\n}\r\n\r\n/**\r\n * Send Ajax request to server, \r\n * then show notification about status of response\r\n * @param {string} requestURL\r\n * @param {string} method\r\n * @param {object} [data={}]\r\n * @returns {Promise<ReceiveForm>}\r\n */\r\nfunction sendAjaxToServer(requestURL, method = \"GET\", data = {}) {\r\n    console.debug({requestURL, method, data})\r\n    let receiveForm, code;\r\n\r\n    const parseResponse = function(responseObj, httpCode){\r\n\r\n        if (receiveForm){\r\n            code = httpCode;\r\n        }else{\r\n            receiveForm = new ReceiveForm(JSON.parse(responseObj));\r\n            code = httpCode;\r\n        }\r\n    }\r\n\r\n    return new Promise((resolve, reject) => {\r\n        $.ajax({\r\n            url: requestURL,\r\n            method: method,\r\n            data: data,\r\n            contentType: \"application/json\",\r\n            statusCode: {\r\n                200: function(responseObj, textStatus){\r\n                    parseResponse(responseObj, 200);\r\n                    showSuccessNotification(receiveForm.getMessage(), code);\r\n                },\r\n\r\n                404: function(responseXHR, textStatus){\r\n                    parseResponse(responseXHR.responseText, 404);\r\n                    showFailNotification(receiveForm.getMessage(), code);\r\n                },\r\n\r\n                406: function(responseXHR, textStatus){\r\n                    parseResponse(responseXHR.responseText, 406);\r\n                    showFailNotification(receiveForm.getMessage(), code);\r\n                },\r\n\r\n                500: function(responseXHR, textStatus){\r\n                    parseResponse(responseXHR.responseText, 500);\r\n                    showErrorNotification(receiveForm.getMessage(), code);\r\n                },\r\n            }\r\n        })\r\n            .done(function (response) {\r\n                if (!receiveForm){\r\n                    receiveForm = new ReceiveForm(JSON.parse(response));\r\n                }\r\n\r\n                return resolve(receiveForm);\r\n            })\r\n            .fail(function (e) {\r\n                if (!e.responseText){\r\n                    showErrorNotification(\"SERVER OR NETWORK GET ERROR\", e.status);\r\n                }\r\n\r\n                return reject(null);\r\n            })\r\n    })\r\n}\r\n\r\n/**\r\n * Upload image to server, then receive a response\r\n * with URL of this image\r\n * @param {object} image - image raw data \r\n */\r\nfunction uploadCustomImage(image){\r\n    let form = new FormData();\r\n    form.append('image', image);\r\n    return new Promise((resolve, reject) => {\r\n\r\n        $.ajax({\r\n            url: '/drawing/upload/symbol',\r\n            method: 'POST',\r\n            processData: false,\r\n            contentType: false,\r\n            enctype: 'multipart/form-data',\r\n            data: form\r\n        })\r\n        .done(function(response){\r\n            let receiveForm = new ReceiveForm(JSON.parse(response));\r\n            console.log(receiveForm)\r\n            if (!receiveForm.success){\r\n                return reject(receiveForm.getMessage());\r\n            }\r\n            return resolve(receiveForm.getData());\r\n        })\r\n        .fail(function(error){\r\n            console.log(error);\r\n            return reject(null);\r\n        })\r\n    })\r\n}\r\n\r\n\r\n/** \r\n * @summary to look-up a beautiful text from rough text\r\n * @example Message(\"s7\") return: \"ETHERNET S7\" | Message(\"modbus\") return \"MODBUS TCP\"\r\n */\r\n\r\n function Message(text){\r\n    const table = {\r\n        \"s7\": \"ETHERNET S7\",\r\n        \"modbus\": \"MODBUS TCP\",\r\n        \"opcua\": \"OPC UA\",\r\n        \"siemens\": \"SIEMENS\",\r\n        \"schneider\": \"SCHNEIDER\",\r\n        \"mitsubishi\": \"MITSUBISHI\",\r\n        \"s7-300\": \"S7-300\",\r\n        \"s7-1200\": \"S7-1200\",\r\n        \"s7-1500\": \"S7-1500\",\r\n\r\n        \"1\": \"TRUE\",\r\n        \"true\": \"TRUE\",\r\n        \"0\": \"FALSE\",\r\n        \"false\": \"FALSE\",\r\n\r\n        \"hd\": \"HD Ready [1280 x 720]\",\r\n        'fhd': \"FHD [1920 x 1080]\",\r\n        \"qhd\": \"QHD [2560 x 1440]\"\r\n    }\r\n\r\n    let result = table[text] || String(text).toUpperCase();\r\n    return result;\r\n }\r\n\r\n function showErrorOnField(selector){\r\n    $(selector).parent().addClass('has-error');\r\n}\r\n\r\nfunction isValidString(value, minLength){\r\n    if (typeof value !== 'string') return false;\r\n    if (!value.length) return false;\r\n\r\n    if (!minLength || minLength < 1) {\r\n        return true;\r\n    }else if (value.length < minLength){\r\n        return false;\r\n    }else{\r\n        return true;\r\n    }\r\n    \r\n}\r\n\r\nfunction isValidNumber(value, minValue){\r\n    if (isNaN(parseFloat(value))) return false;\r\n    if (typeof minValue !== 'undefined'){\r\n        if (parseFloat(value) >= parseFloat(minValue)) return true;\r\n        else  return false;\r\n    }\r\n    return true;\r\n}\r\n\r\nfunction isValidIP(ipAddress){\r\n    return validate.ipv4(ipAddress);\r\n}\r\n\r\n\r\n module.exports = {\r\n    showNotification, \r\n    fortmatTime,\r\n    Message,\r\n    showFailNotification,\r\n    showErrorNotification,\r\n    showSuccessNotification,\r\n    sendAjaxToServer,\r\n    uploadCustomImage,\r\n    showErrorOnField,\r\n    isValidNumber,\r\n    isValidString,\r\n    isValidIP\r\n }\n\n//# sourceURL=webpack:///./frontend/utils.js?");

/***/ }),

/***/ "./models/form/AddDesignForm.js":
/*!**************************************!*\
  !*** ./models/form/AddDesignForm.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = class AddDesignForm{\r\n\r\n    /**\r\n     *Creates an instance of AddDesignForm.\r\n     * @param {string} name\r\n     * @param {string} description\r\n     * @param {string} resolution\r\n     */\r\n    constructor(name, description, resolution){\r\n        this.name = name;\r\n        this.description = description;\r\n        this.resolution = resolution;\r\n    }\r\n\r\n    /**\r\n     * Pars form and create new instance of AddDesignForm\r\n     * @static\r\n     * @param {AddDesignForm} addDesignForm\r\n     */\r\n    static parseDesignForm(addDesignForm){\r\n        console.debug(addDesignForm)\r\n        let {name, description, resolution} = addDesignForm;\r\n        return new AddDesignForm(name, description, resolution);\r\n    }\r\n\r\n    getName(){\r\n        return this.name;\r\n    }\r\n\r\n    getDescription(){\r\n        return this.description;\r\n    }\r\n\r\n    getResolution(){\r\n        return this.resolution;\r\n    }\r\n}\n\n//# sourceURL=webpack:///./models/form/AddDesignForm.js?");

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

eval("// Generated by CoffeeScript 1.8.0\n(function() {\n  var Validator;\n\n  Validator = (function() {\n    function Validator() {}\n\n    Validator.prototype.ipv4 = function(ip) {\n      var regex;\n      regex = /(([0-1]?[0-9]{1,2}\\.)|(2[0-4][0-9]\\.)|(25[0-5]\\.)){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))/;\n      return regex.test(ip);\n    };\n\n    Validator.prototype.ipv6 = function(ip) {\n      var regex;\n      regex = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/;\n      return regex.test(ip);\n    };\n\n    Validator.prototype.ip = function(ip) {\n      var regex;\n      regex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\\-]*[a-zA-Z0-9])\\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\\-]*[A-Za-z0-9])$|^\\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:)))(%.+)?\\s*$/;\n      return regex.test(ip);\n    };\n\n    return Validator;\n\n  })();\n\n  module.exports = new Validator();\n\n}).call(this);\n\n\n//# sourceURL=webpack:///./node_modules/ip-validator/lib/validator.js?");

/***/ })

/******/ });