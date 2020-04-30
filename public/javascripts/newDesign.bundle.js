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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/design/newDesign.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/design/designListData.js":
/*!**************************************!*\
  !*** ./src/design/designListData.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Design List data for create new Design action\nlet designList = {\n    data: [],\n\n    initProjectFromServer: function(){\n        return new Promise((resolve, reject) => {\n            $.get('/design/fetch/projects')\n                .then((result) => {\n                    if (result) this.data = result;\n                    resolve(true);\n                })\n                .catch((err) => {\n                    console.log('Fetch Project list get error')\n                    reject(false);\n                })\n        })\n    },\n\n    createNewProject: function(project){\n        this.data.push(project);\n    },\n\n    deleteProject: function(id){\n        return new Promise((resolve, reject) => {\n            $.get('/design/delete/' + id)\n                .then((result) => {\n                    if (result) this.data = result;\n                    resolve(true);\n                })\n                .catch((err) => {\n                    console.log('Delete Project get error')\n                    reject(false);\n                })\n        })\n\n    }\n}\n\nmodule.exports = designList;\n\n//# sourceURL=webpack:///./src/design/designListData.js?");

/***/ }),

/***/ "./src/design/newDesign.js":
/*!*********************************!*\
  !*** ./src/design/newDesign.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Utils = __webpack_require__(/*! ../utils */ \"./src/utils.js\");\n\nconst Message          = Utils.Message;\nconst fortmatTime      = Utils.fortmatTime;\nconst showNotification = Utils.showNotification;\n\nlet designList = __webpack_require__(/*! ./designListData */ \"./src/design/designListData.js\");\ndesignList.initProjectFromServer()\n.then(function(){\n    console.log(designList.data);\n    renderDesignTable();\n})\n.catch((err) => console.log('Fetch error: ', err));\n\n\n$('#create-design').click(function(){\n    // Show create new form popup modal\n    $('#showModal').click();\n})\n\n$('#save-design').click(function(){\n    let name        = $('input[name=name]').val();\n    if (name.length < 1) {\n        $('input[name=name]').parent().addClass('has-error');\n        return;\n    }\n    let description = $('input[name=description]').val();\n    let resolution  = $('#revolution').val();\n    console.log({name, description, resolution})\n    //const status = designList.createNewDesign(name, description, resolution);\n    $.post('/design/create', {\n        name, description, resolution\n    })\n    .then((result) => {\n        if (result.status == 'success'){\n            console.log('New project: ', result.newProject);\n            designList.createNewProject(result.newProject);\n            showNotification('top', 'right', 'success', \"<b>SUCCESS</b>: New Project is created successfully\");\n            renderDesignTable();\n        }else if (result.status == 'fail'){\n            console.log('Create new fail: ', result.reason);\n            showNotification('top', 'right', 'warning', \"<b>Duplicated ERROR</b>: Cannot create new Project.\");\n        }else{\n            console.log('Get an error: ', result.error);\n            showNotification('top', 'right', 'danger', \"<b>Duplicated ERROR</b>: Cannot create new Project. Server return Error code\");\n        }\n        //showNotification('top', 'right', 'success', \"<b>SUCCESS</b>: New Project is created successfully\");\n    })\n    .catch((err) => {\n        console.log(\"PORT request error: \", err);\n        showNotification('top', 'right', 'danger', \"<b>Duplicated ERROR</b>: Cannot create new Project. Server response with ERROR code.\");\n    })\n           \n})\n\n\nfunction deleteDesign(_designId){\n  const status = designList.deleteProject(_designId)\n  .then((result) => {\n    renderDesignTable();\n    alert(_designId + ' was deleted')\n    return\n  })\n  .catch((err) => {\n    alert(_designId + ' not found')\n  })\n}\n\n\n\nfunction renderDesignTable() {\n\n    $('#render-table').empty();\n    designList.data.forEach((ds, index) => {\n\n        let isCompile = (ds.compiled)? 'compiled' : 'notcompiled';\n\n        let isRunable = (ds.compiled)? \n        `'class=\"btn btn-success\" href=\"${ds.runLink}\" target=\"_blank\"'`:\n         'class=\"btn btn-black\"';\n\n        let row = `\n        <tr class=\"focus-table\" id=\"${ds.designID}\">\n            <td class=\"text-center\">${(index<10 ? '0'+ ++index : index++)}</td>\n            <td class=\"text-center\">${ds.name}</td>\n            <td class=\"text-center\">${fortmatTime(ds.createTime)}</td>\n            <td class=\"text-center\">${fortmatTime(ds.modified)}</td>\n            <td class=\"td-actions text-center\">\n                <i class=\"material-icons ${isCompile}\"\n                rel=\"tooltip\" data-original-title=\"${ds.compiled? 'Compiled': 'Not Compiled'}\"\n                >info</i>\n            </td>\n            <td class=\"td-actions text-center\">\n                <button type=\"button\" rel=\"tooltip\" class=\"btn btn-facebook\"\n                    data-original-title=\"Description\" title=\"\"\n                    data-toggle=\"collapse\" data-target=\"#row-${index+1}\">\n                    <i class=\"material-icons\">description</i>\n                </button>\n            </td>\n            <td class=\"td-actions text-center\">\n                <a type=\"button\" rel=\"tooltip\" ${isRunable} \n                    data-original-title=\"${ds.compiled? 'Run the Design': 'Unavailable'}\" title=\"\">\n                    <i class=\"material-icons\">play_circle_filled</i>\n                </a>\n            </td>\n            <td class=\"td-actions text-center\">\n                <a rel=\"tooltip\" class=\"btn btn-google\" href=\"/design/drawing/#${ds.designID}\" target=\"_blank\"\n                    data-original-title=\"Go to Design Page\">\n                    <i class=\"material-icons\">launch</i>\n                </a>\n            </td>\n            \n            </tr>\n            <tr id=\"row-${index+1}\" class=\"collapse\" style=\"background-color: #dddfd4;\">\n                <td colspan=\"8\" rowspan=\"1\">                                                      \n                    <div class=\"row\">\n                        <div class=\"col-md-12\"><b>Resolution</b>: ${Message(ds.resolution)}</div>\n                    </div> \n                    <div class=\"row\">\n                        <div class=\"col-md-12\"><b>Description</b>: ${ds.description}</div>\n                    </div>                                                      \n                </td>\n            </tr>\n        `\n        $('#render-table').append(row);\n        $('[rel=tooltip]').tooltip();\n        addContextMenuDeleteDesign(ds.designID);\n    })\n}\n\nfunction addContextMenuDeleteDesign(id){\n    let menu = new ContextMenu({\n        'theme': 'default', // or 'blue'\n        'items': [\n            { 'icon': 'trash', 'name': 'Delete this Design', 'action': () => deleteDesign(id) },\n        ]\n    });\n    \n    \n    let openContextMenu = function(evt) {\n    \n            // prevent default event\n            evt.preventDefault();\n            // open the menu with a delay\n            const time = menu.isOpen() ? 100 : 0;\n            // hide the current menu (if any)\n            menu.hide();\n            // display menu at mouse click position\n            setTimeout(() => { menu.show(evt.pageX, evt.pageY) }, time);\n            // close the menu if the user clicks anywhere on the screen\n            document.addEventListener('click', hideContextMenu, false);\n    }\n    \n    let hideContextMenu = function(evt) {\n    \n        // hide the menu\n        menu.hide();\n        // remove the listener from the document\n        document.removeEventListener('click', hideContextMenu);\n    \n    }\n    \n    document.getElementById(id).addEventListener('contextmenu', openContextMenu, false);\n}\n\n//# sourceURL=webpack:///./src/design/newDesign.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nfunction showNotification(from, align, type, message){\n\n    $.notify({\n        icon: \"add_alert\",\n        message: message\n\n    },{\n        type: type,\n        timer: 2000,\n        placement: {\n            from: from,\n            align: align\n        },\n        z_index: 2000,\n    });\n};\n\nfunction fortmatTime(time){\n    let date = new Date(time);\n    let year = date.getFullYear();\n    let month = date.getMonth();\n    let date_ = date.getDate();\n    let hour  = date.getHours();\n    let min   = date.getMinutes();\n    let second = date.getSeconds();\n    return `${hour}:${min}:${second} ${date_}/${month}/${year}`;\n}\n\n\n/** \n * @summary to look-up a beautiful text from rough text\n * @example Message(\"s7\") return: \"ETHERNET S7\" | Message(\"modbus\") return \"MODBUS TCP\"\n */\n\n function Message(text){\n    const table = {\n        \"s7\": \"ETHERNET S7\",\n        \"modbus\": \"MODBUS TCP\",\n        \"opcua\": \"OPC UA\",\n        \"siemens\": \"SIEMENS\",\n        \"schneider\": \"SCHNEIDER\",\n        \"mitsubishi\": \"MITSUBISHI\",\n        \"s7-300\": \"S7-300\",\n        \"s7-1200\": \"S7-1200\",\n        \"s7-1500\": \"S7-1500\",\n\n        \"1\": \"TRUE\",\n        \"true\": \"TRUE\",\n        \"0\": \"FALSE\",\n        \"false\": \"FALSE\",\n\n        \"hd\": \"HD Ready [1280 x 720]\",\n        'fhd': \"FHD [1920 x 1080]\",\n        \"qhd\": \"QHD [2560 x 1440]\"\n    }\n\n    let result = table[text] || String(text).toUpperCase();\n    return result;\n }\n\n\n module.exports = {\n    showNotification, \n    fortmatTime,\n    Message\n }\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ })

/******/ });