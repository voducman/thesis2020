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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/manager/list.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/gateway/Gateway.js":
/*!********************************!*\
  !*** ./src/gateway/Gateway.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function Gateway(id, name, long, lat, pos, des, scanTime){\n    this.id = id;\n    this.name = name;\n    this.longitude = long;\n    this.latitude = lat;\n    this.position = pos;\n    this.description = des;\n    this.scanTime = scanTime;\n    this.PLCnum = 0;\n    this.Tagnum = 0;\n    this.createdTime = Date.now();\n    this.modified = Date.now();\n    this.status = false;\n    this.PLCs = [];\n\n}\n\nGateway.prototype.updatePLCnTag = function(){\n    let tagCount = 0;\n\n    this.PLCnum = this.PLCs.length;\n\n    if (this.PLCs.length > 0){\n        this.PLCs.forEach(function(plc, index){\n            tagCount += plc.Tags.length;\n        });\n    }\n    this.Tagnum = tagCount;\n}\n\nGateway.prototype.getPLCByName = function(name){\n    let index = this.PLCs.findIndex(function(plc){\n        return plc.name == name;\n    })\n\n    return this.PLCs[index];\n}\n\nGateway.prototype.getPLCList = function(){\n    return this.PLCs.map((plc)=> plc.name);\n}\n\nGateway.prototype.updateModifyTime = function(){\n    this.modified = Date.now();\n}\n\nGateway.prototype.updateName = function(name){\n    this.name = name;\n}\n\nGateway.prototype.updateLongitude = function(long){\n    this.longitude = long;\n}\n\nGateway.prototype.updateLatitude = function(lat){\n    this.latitude = lat;\n}\n\nGateway.prototype.updatePosition = function(address){\n    this.position = address;\n}\n\nGateway.prototype.updateDescription = function(des){\n    this.description = des;\n}\n\nGateway.prototype.updateScantime = function(scantime){\n    this.scanTime = scantime;\n}\n\nmodule.exports = Gateway;\n\n//# sourceURL=webpack:///./src/gateway/Gateway.js?");

/***/ }),

/***/ "./src/gateway/PLC.js":
/*!****************************!*\
  !*** ./src/gateway/PLC.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nfunction PLC(producer, type, name, IPaddrr, protocol, des){\n    this.producer = producer;\n    this.type = type;\n    this.name = name;\n    this.IPaddrress = IPaddrr;\n    this.protocol = protocol;\n    this.description = des;\n    this.Tags = [];\n    this.modified = Date.now();\n    this.createdTime = Date.now();\n}\n\nPLC.prototype.getTagByName = function(tagName){\n    let index = this.Tags.findIndex((tag) => tag.name == tagName);\n    if (index == -1) return false;\n    return this.Tags[index];\n}\n\nmodule.exports = PLC;\n\n//# sourceURL=webpack:///./src/gateway/PLC.js?");

/***/ }),

/***/ "./src/gateway/Tag.js":
/*!****************************!*\
  !*** ./src/gateway/Tag.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nfunction Tag(name, scale, offset, min, max, des, unit, memAddrr, dataType, dband, trend, log, alarm){\n    this.name = name;\n    this.scale = scale;\n    this.offset = offset;\n    this.minimum = min;\n    this.maximum = max;\n    this.description = des;\n    this.unit = unit; \n    this.memoryAdd = memAddrr;\n    this.dataType = dataType;\n    this.deadband = (!isNaN(dband))? dband:0;\n    this.createdTime = Date.now();\n\n    this.trend = trend;\n    this.log = log;\n    // Put alarm object here\n    this.alarm = alarm;\n\n    this.value = 0;\n    this.timeStamp = null;\n    // UNCERTAIN, GOOD or BAD\n    this.quality = null;\n\n}\n\nmodule.exports = Tag;\n\n//# sourceURL=webpack:///./src/gateway/Tag.js?");

/***/ }),

/***/ "./src/manager/initData.js":
/*!*********************************!*\
  !*** ./src/manager/initData.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nconst Gateway = __webpack_require__(/*! ../gateway/Gateway */ \"./src/gateway/Gateway.js\");\nconst PLC     = __webpack_require__(/*! ../gateway/PLC */ \"./src/gateway/PLC.js\");\nconst Tag     = __webpack_require__(/*! ../gateway/Tag */ \"./src/gateway/Tag.js\");\n\n/**\n * @summary function will self-call when render page\n */\nmodule.exports = function(){\n\n    let data = {\n        external: [],\n        internal: []\n    }\n\n    return new Promise((resolve, reject) => {\n        $.get({\n            url: '/gateway/fetch',\n        }).done(function(result){\n            console.log('Fetch Success: ', result);\n            if (result == false){\n                console.log('Fetch error at server');\n                return;\n            }\n    \n            // Update remote data to current data structure\n            result.data.external.forEach(function(gw){\n    \n                let gateway = new Gateway(gw.id, gw.name, gw.longitude, gw.latitude, gw.position, gw.description, gw.scanTime);\n                gateway.createdTime = gw.createdTime;\n                gateway.modified    = gw.modified;\n    \n                gw.PLCs.forEach(function(plc){\n                    let plc_ = new PLC(plc.producer, plc.type, plc.name, plc.IPaddrress, plc.protocol, plc.description);\n                    plc_.createdTime = plc.createdTime;\n                    plc_.modified    = plc.modified;\n    \n                    plc.Tags.forEach(function(tg){\n                        let tag = new Tag(tg.name, tg.scale, tg.offset, tg.minimum, \n                            tg.maximum, tg.description, tg.unit, tg.memoryAdd,\n                            tg.dataType, tg.deadband, tg.trend, tg.log, tg.alarm);\n                        tag.createdTime = tg.createdTime;\n    \n                        plc_.Tags.push(tag);\n                    })\n    \n                    gateway.PLCs.push(plc_);\n                })\n                data.external.push(gateway);\n            })\n    \n            result.data.internal.forEach(function(internalTag, index){\n                data.internal.push(internalTag);\n            })\n    \n            console.log('Data is: ', data);\n            resolve(data)\n            \n        }).fail(function(error){\n            console.log('Fetch Fail: ', error);\n            reject(error);\n        })\n    })\n\n}\n\n\n//# sourceURL=webpack:///./src/manager/initData.js?");

/***/ }),

/***/ "./src/manager/list.js":
/*!*****************************!*\
  !*** ./src/manager/list.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// const initDataFromServer = require('./initData');\nconst initDataFromDB = __webpack_require__(/*! ./initData */ \"./src/manager/initData.js\");\nconst Table          = __webpack_require__(/*! ./renderTable */ \"./src/manager/renderTable.js\");\n\nlet numRow;\nlet start = 1;\n\n// Init data from server\ninitDataFromDB()\n.then((data) => {\n    numRow = Table.renderGatewayTable(data);\n    if (numRow < 10){\n        $('#first').parent().hide();\n        $('#back').parent().hide();\n        $('#current').parent().hide();\n        $('#next').parent().hide();\n        $('#last').parent().hide();\n        $('#pagination p').text(`Showing 1 to ${numRow} of ${numRow} entries`);\n    }else{\n        $('#pagination p').text(`Showing 1 to 10 of ${numRow} entries`);\n        if (numRow <= 20){\n            $('#back').parent().show();\n            $('#back').html('1');\n            $('#current').parent().show();\n            $('#current').html('2');\n            $('#next').parent().hide();\n            $('#back').parent().addClass('active');\n            $('#current').parent().removeClass('active');\n        }else{\n            $('#back').parent().show();\n            $('#back').html('1');\n            $('#current').parent().show();\n            $('#current').html('2');\n            $('#next').parent().show();\n            $('#next').html('3');\n            $('#back').parent().addClass('active');\n            $('#current').parent().removeClass('active');\n            $('#next').parent().removeClass('active');\n        }\n    }\n})\n.catch((err) => console.log('Error: ', err))\n\n$('#first').click(function(){\n    for (let i = 1; i<= numRow; i++){\n        if (i <= 10) $(`#gateway-${i}`).show();\n        else         $(`#gateway-${i}`).hide();\n    }\n\n    if (numRow <= 20) {\n        $('#back').html('1');\n        $('#current').html('2');\n        $('#next').parent().hide();\n        $('#back').parent().addClass('active');\n        $('#current').parent().removeClass('active');\n    }else{\n        $('#back').html('1');\n        $('#current').html('2');\n        $('#next').parent().show();\n        $('#next').html('3');\n        $('#back').parent().addClass('active');\n        $('#current').parent().removeClass('active');\n        $('#next').parent().removeClass('active');\n    }\n    $('#pagination p').text(`Showing 1 to 10 of ${numRow} entries`);\n})\n\n$('#back').click(function(){    \n    if (numRow <= 20) {\n        for (let i = 1; i<= numRow; i++){\n            if (i <= 10) $(`#gateway-${i}`).show();\n            else         $(`#gateway-${i}`).hide();\n        }\n\n        $('#back').parent().show();\n        $('#current').parent().show();\n        $('#back').parent().addClass('active');\n        $('#current').parent().removeClass('active');\n        $('#pagination p').text(`Showing 1 to 10 of ${numRow} entries`);\n    }else{\n        let current = parseInt( $('#back').html());\n\n        for (let i = 1; i<= numRow; i++){\n            if (i <= current*10 && i > current*10-10) $(`#gateway-${i}`).show();\n            else         $(`#gateway-${i}`).hide();\n        }\n\n        if (current > 1){ // Rotate pagination\n            $('#back').html(current-1);\n            $('#current').html(current);\n            $('#next').html(current+1);\n            $('#back').parent().removeClass('active');\n            $('#current').parent().addClass('active');\n            $('#next').parent().removeClass('active');\n            $('#pagination p').text(`Showing ${current*10-9} to ${current*10} of ${numRow} entries`);\n        }else{         // Don't rotate pagination\n            $('#back').parent().addClass('active');\n            $('#current').parent().removeClass('active');\n            $('#next').parent().removeClass('active');\n            $('#pagination p').text(`Showing 1 to 10 of ${numRow} entries`);\n        }\n        \n    }\n    \n})\n\n$('#current').click(function(){\n    let current = parseInt($('#current').html());\n    if (current == 2){\n        for (let i = 1; i<= numRow; i++){\n            if ( i > 10 && i <= 20) $(`#gateway-${i}`).show();\n            else         $(`#gateway-${i}`).hide();\n        }\n\n        $('#back').parent().removeClass('active');\n        $('#current').parent().addClass('active');\n        $('#next').parent().removeClass('active');\n        $('#pagination p').text(`Showing 11 to ${(numRow>20)? '20': numRow} of ${numRow} entries`);\n    }else if(current == Math.ceil(numRow/10)-1){\n        for (let i = 1; i<= numRow; i++){\n            if (i <= current*10 && i > current*10-10) $(`#gateway-${i}`).show();\n            else         $(`#gateway-${i}`).hide();\n        }\n\n        $('#back').parent().removeClass('active');\n        $('#current').parent().addClass('active');\n        $('#next').parent().removeClass('active');\n        $('#pagination p').text(`Showing ${current*10-9} to ${current*10} of ${numRow} entries`);\n    }\n})\n\n$('#next').click(function(){\n    let current = parseInt($('#next').html());\n\n    for (let i = 1; i <= numRow; i++) {\n        if (i <= current * 10 && i > current * 10 - 10) $(`#gateway-${i}`).show();\n        else $(`#gateway-${i}`).hide();\n    }\n\n    if (current == 3 && numRow <= 30) { // Don't rotate pagination\n        $('#back').parent().removeClass('active');\n        $('#current').parent().removeClass('active');\n        $('#next').parent().addClass('active');\n        $('#pagination p').text(`Showing ${current*10-9} to ${numRow} of ${numRow} entries`);\n    } else if (current >= 3 && current < Math.ceil(numRow/10)){         // Rotate pagination\n        $('#back').html(current - 1);\n        $('#current').html(current);\n        $('#next').html(current + 1);\n        $('#back').parent().removeClass('active');\n        $('#current').parent().addClass('active');\n        $('#next').parent().removeClass('active');\n        $('#pagination p').text(`Showing ${current*10-9} to ${current*10} of ${numRow} entries`);\n    }else{\n        $('#back').parent().removeClass('active');\n        $('#current').parent().removeClass('active');\n        $('#next').parent().addClass('active');\n        $('#pagination p').text(`Showing ${current*10-9} to ${numRow} of ${numRow} entries`);\n    }\n    \n})\n\n$('#last').click(function(){\n    for (let i = 1; i<= numRow; i++){\n        if (i > 10*Math.floor(numRow/10)) $(`#gateway-${i}`).show();\n        else         $(`#gateway-${i}`).hide();\n    }\n\n    if (numRow <= 20) {\n        $('#back').parent().show();\n        $('#back').html('1');\n        $('#current').parent().show();\n        $('#current').html('2');\n        $('#next').parent().hide();\n        $('#back').parent().removeClass('active');\n        $('#current').parent().addClass('active');\n    }else{\n        $('#back').parent().show();\n        $('#back').html(Math.ceil(numRow/10)-2);\n        $('#current').parent().show();\n        $('#current').html(Math.ceil(numRow/10)-1);\n        $('#next').parent().show();\n        $('#next').html(Math.ceil(numRow/10));\n        $('#back').parent().removeClass('active');\n        $('#current').parent().removeClass('active');\n        $('#next').parent().addClass('active');\n    }\n    $('#pagination p').text(`Showing ${10*Math.floor(numRow/10)+1} to ${numRow} of ${numRow} entries`);\n})\n\n\n\n\n//# sourceURL=webpack:///./src/manager/list.js?");

/***/ }),

/***/ "./src/manager/renderTable.js":
/*!************************************!*\
  !*** ./src/manager/renderTable.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Utils       = __webpack_require__(/*! ../utils */ \"./src/utils.js\");\nconst Message     = Utils.Message;\nconst fortmatTime = Utils.fortmatTime;\nlet tagStorage = [];\n\nfunction renderGatewayTable(data){\n    \n    $('#render-table').empty();\n\n    data.external.forEach(function(gw, index){\n\n        gw.updatePLCnTag();\n        const isFirstRender = (index < 10)? '' : 'display: none;';\n        const bgColor = (index% 2 == 1)? 'background-color: #e7e497;' : '';\n        let rows = `\n            <tr  style=\"${bgColor} ${isFirstRender}\" id=\"gateway-${index+1}\">\n                <td class=\"text-center\">${(index < 9) ? \"0\" + ++index : index+1}</td>\n                <td class=\"text-center\">${gw.id}</td>\n                <td class=\"text-center\">${gw.name}</td>\n                <td class=\"text-center\">${gw.latitude}</td>\n                <td class=\"text-center\">${gw.longitude}</td>\n                <td class=\"text-center\">${gw.PLCnum}</td>\n                <td class=\"text-center\">${gw.Tagnum}</td>\n                <td class=\"text-center\">${fortmatTime(gw.createdTime)}</td>\n                <td class=\"text-center\">${fortmatTime(gw.modified)}</td>\n                <td class=\"text-center\"><i class=\"material-icons ${(gw.status) ? \"connected\" : \"disconnected\"}\">lens</i></td>\n                <td class=\"td-actions text-center\">\n                    <button type=\"button\" rel=\"tooltip\" class=\"btn btn-info\"\n                        data-original-title=\"Gateway Info\" title=\"Show Description/Position\"\n                        data-toggle=\"collapse\" data-target=\"#row-${index+1}\">\n                        <i class=\"material-icons\">info</i>\n                    </button>\n                </td>\n            </tr>\n            <tr id=\"row-${index+1}\" class=\"collapse\" style=\"background-color: #dddfd4;\">\n                <td></td>\n                <td colspan=\"11\" rowspan=\"2\">                                                      \n                    <div class=\"row\">\n                        <div class=\"col-md-12\"><b>Position</b>:  ${gw.position}</div>\n                    </div> \n                    <div class=\"row\">\n                        <div class=\"col-md-12\"><b>Description</b>:  ${gw.description}</div>\n                    </div>                                                       \n                </td>\n            </tr>\n            <tr></tr>\n            `\n            \n            $('#render-table').append(rows);\n    })\n\n    return data.external.length;\n}\n\nfunction renderPLCTable(data){\n    let index = 0;\n    $('#render-table').empty();\n\n    data.external.forEach(function(gw){\n\n        gw.PLCs.forEach(function(plc){\n            index++;\n            const numTag = plc.Tags.length;\n            const isFirstRender = (index < 11)? '' : 'display: none;';\n            const bgColor = (index% 2 == 0)? 'background-color: #e7e497;' : '';\n\n            let rows = `\n            <tr  style=\"${bgColor} ${isFirstRender}\" id=\"plc-${index}\">\n                <td class=\"text-center\">${(index < 10) ? (\"0\" + index) : index}</td>\n                <td class=\"text-center\">${plc.name}</td>\n                <td class=\"text-center\">${Message(plc.type)}</td>\n                <td class=\"text-center\">${Message(plc.producer)}</td>\n                <td class=\"text-center\">${plc.IPaddrress}</td>\n                <td class=\"text-center\" style=\"font-size: x-small\">${Message(plc.protocol)}</td>\n                <td class=\"text-center\">${numTag}</td>\n                <td class=\"text-center\" >${fortmatTime(plc.createdTime)}</td>\n                <td class=\"text-center\">${fortmatTime(plc.modified)}</td>\n                <td class=\"text-center\">${gw.name}</td>\n                <td class=\"text-center\"><i class=\"material-icons ${(false) ? undefined : \"disconnected\"}\">lens</i></td>\n                <td class=\"td-actions text-center\">\n                    <button type=\"button\" rel=\"tooltip\" class=\"btn btn-info\"\n                        data-original-title=\"Gateway Info\" title=\"Show Description/Position\"\n                        data-toggle=\"collapse\" data-target=\"#row-${index}\">\n                        <i class=\"material-icons\">info</i>\n                    </button>\n                </td>\n            </tr>\n            <tr id=\"row-${index}\" class=\"collapse\" style=\"background-color: #dddfd4;\">\n                <td></td>\n                <td colspan=\"11\" rowspan=\"2\">                                                      \n                    <div class=\"row\">\n                        <div class=\"col-md-12\"><b>Position</b>:  ${gw.position}</div>\n                    </div> \n                    <div class=\"row\">\n                        <div class=\"col-md-12\"><b>Description</b>:  ${plc.description}</div>\n                    </div>                                                       \n                </td>\n            </tr>\n            <tr></tr>`\n\n            $('#render-table').append(rows);\n        })\n    })\n\n    return index;\n\n}\n\nfunction renderTagTable(data){\n    let tagArray = [];\n\n    $('#render-table').empty();\n    \n    data.external.forEach(function(gw){\n        gw.PLCs.forEach(function(plc, index){      \n            plc.Tags.forEach(function(tag){\n\n                tagArray.push({\n                    name: tag.name,\n                    type: 'EXTERNAL',\n                    scale: tag.scale,\n                    offset: tag.offset,\n                    minimum: tag.minimum,\n                    maximum: tag.maximum,\n                    unit: tag.unit,\n                    memoryAdd: tag.memoryAdd,\n                    dataType: tag.dataType,\n                    deadband: tag.deadband,\n                    trend: tag.trend,\n                    log: tag.log,\n                    alarm: tag.alarm,\n                    plc: plc.name,\n                    gateway: gw.name,\n                    protocol: plc.protocol,\n                    producer: plc.producer,\n                    plcType: plc.type,\n                    description: tag.description,\n                })\n            })\n        })\n    })\n\n    data.internal.forEach((tag) => {\n        tagArray.push({\n            name: tag.name,\n            type: 'INTERNAL',\n            scale: tag.scale,\n            offset: tag.offset,\n            minimum: '---',\n            maximum: '---',\n            unit: tag.unit,\n            memoryAdd: '---',\n            dataType: tag.dataType,\n            deadband: '---',\n            trend: 'FLASE',\n            log: 'FALSE',\n            alarm: 'FALSE',\n            plc: '---',\n            gateway: '---',\n            protocol: '---',\n            producer: '---',\n            plcType: '---',\n            description: tag.description,\n        })\n    })\n    tagStorage = tagArray;\n    renderTag(tagStorage);\n    \n    let [gwList, plcList] = getInfoFromTagArray(tagStorage);\n    gwList.forEach((gwName) => {\n        $('#gateway-filter').append(`\n            <option value=\"${gwName}\">${gwName}</option>\n        `)\n    })\n\n    plcList.forEach((plcName) => {\n        $('#plc-filter').append(`\n            <option value=\"${plcName}\">${plcName}</option>\n        `)\n    })\n\n    $('.selectpicker').selectpicker('refresh');\n    // Select all \n    $('#gateway-filter').selectpicker('selectAll');\n    $('#plc-filter').selectpicker('selectAll');\n    $('#tag-filter').selectpicker('selectAll');\n    \n\n    console.log(tagArray)\n    return tagArray.length || 0;\n}\n\n\nfunction renderTag(tagArray){\n    let index = 0;\n    \n    $('#render-table').empty();\n    tagArray.forEach((tag) => {\n        index++;\n        const isFirstRender = (index < 11) ? '' : 'display: none;';\n        const bgColor = (index % 2 == 0) ? 'background-color: #e7e497;' : '';\n\n        let rows = `\n            <tr  style=\"${bgColor} ${isFirstRender}\" id=\"tag-${index}\">\n                <td class=\"text-center\">${(index < 10) ? (\"0\" + index) : index}</td>\n                <td class=\"text-center\">${tag.name}</td>\n                <td class=\"text-center\">${tag.type}</td>\n                <td class=\"text-center\">${tag.scale}</td>\n                <td class=\"text-center\">${tag.offset}</td>\n                <td class=\"text-center\">${tag.minimum}</td>\n                <td class=\"text-center\">${tag.maximum}</td>\n                <td class=\"text-center\" >${tag.unit}</td>\n                <td class=\"text-center\">${tag.memoryAdd}</td>\n                <td class=\"text-center\">${Message(tag.dataType)}</td>\n                <td class=\"text-center\" >${tag.deadband}</td>\n                <td class=\"text-center\" style=\"font-weight: 400;\">${Message(tag.trend)}</td>\n                <td class=\"text-center\" style=\"font-weight: 400;\">${Message(tag.log)}</td>\n                <td class=\"text-center\" style=\"font-weight: 400;\">${(tag.alarm && tag.alarm != 'FALSE')? 'TRUE' : 'FALSE'}</td>\n                <td class=\"td-actions text-center\">\n                    <button type=\"button\" rel=\"tooltip\" class=\"btn btn-info\"\n                        data-original-title=\"Gateway Info\" title=\"Show Tag Details\"\n                        data-toggle=\"collapse\" data-target=\"#row-${index}\">\n                        <i class=\"material-icons\">info</i>\n                    </button>\n                </td>\n            </tr>\n            <tr id=\"row-${index}\" class=\"collapse\" style=\"background-color: #dddfd4;\">\n                <td></td>\n                <td colspan=\"14\" rowspan=\"2\">                                                      \n                    <div class=\"row\">\n                        <div class=\"col-md-3\"><b>PLC Name</b>:  ${tag.plc}</div>\n                        <div class=\"col-md-3\"><b>Protocol</b>:  ${Message(tag.protocol)}</div>\n                        <div class=\"col-md-3\"><b>Producer</b>:  ${Message(tag.producer)}</div>\n                    </div>\n                    <div class=\"row\">                       \n                        <div class=\"col-md-3\"><b>Gateway</b>:   ${tag.gateway}</div>\n                        <div class=\"col-md-3\"><b>PLC Type</b>:  ${Message(tag.plcType)}</div>\n                        <div class=\"col-md-3\"><b>Alarm</b>:     ${(tag.alarm && tag.alarm != 'FALSE') ? 'TRUE' : 'FALSE'}</div>\n                    </div>\n                    <div class=\"row\">              \n                        <div class=\"col-md-3\"><b>Alarm</b></div> \n                        <div class=\"col-md-9\">\n                        [\n                            <b>HIHI</b>:  ${(tag.alarm && tag.alarm != 'FALSE')? tag.alarm.hihi: ''}\n                            <b>&nbsp;&nbsp;HI</b>:  ${(tag.alarm && tag.alarm != 'FALSE')? tag.alarm.hi: ''}\n                            <b>&nbsp;&nbsp;LOW</b>:  ${(tag.alarm && tag.alarm != 'FALSE')? tag.alarm.low: ''}\n                            <b>&nbsp;&nbsp;LOWLOW</b>:  ${(tag.alarm && tag.alarm != 'FALSE')? tag.alarm.lowlow: ''}\n                        ] </div> \n                       \n                    </div> \n                    <div class=\"row\">\n                        <div class=\"col-md-12\"><b>Description</b>:  ${tag.description}</div>\n                    </div>                                                       \n                </td>\n            </tr>\n            <tr></tr>`\n\n        $('#render-table').append(rows);\n    })\n}\n\nfunction getInfoFromTagArray(tagArray){\n    let gatewayList = [];\n    let plcList = [];\n\n    tagArray.forEach((tag) => {\n        if (tag.gateway != '---' && !gatewayList.includes(tag.gateway)){\n            gatewayList.push(tag.gateway);\n        }\n\n        if (tag.plc != '---' && !plcList.includes(tag.plc)){\n            plcList.push(tag.plc);\n        }\n    })\n    return [gatewayList, plcList];\n}\n\nfunction updateTagTable(){\n    // to-do list\n    let newTagStorage;\n    // B1. Handle tagStorage by [gatewayList, plcList, type]\n    let newTagList;\n    let gatewayFilter = $('#gateway-filter').val();\n    let plcFilter     = $('#plc-filter').val();\n    let tagFilter    = $('#tag-filter').val();\n\n    console.log(gatewayFilter, plcFilter, tagFilter)\n    // B2. call renderTag(updated tagStorage)\n    newTagList = tagStorage.filter((tag) => {\n        if (gatewayFilter.includes(tag.gateway) && plcFilter.includes(tag.plc) && tagFilter.includes('EXTERNAL')){\n            return true;\n        }else if (tag.type == 'INTERNAL' && tagFilter.includes('INTERNAL')){\n            return true;\n        }\n        return false;\n    })\n\n    console.log('new storage: ', newTagList);\n    renderTag(newTagList);\n    return newTagList.length || 0;\n\n}\n\n\n\nmodule.exports = {\n    renderGatewayTable,\n    renderPLCTable,\n    renderTagTable,\n    updateTagTable\n}\n\n//# sourceURL=webpack:///./src/manager/renderTable.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nfunction showNotification(from, align, type, message){\n\n    $.notify({\n        icon: \"add_alert\",\n        message: message\n\n    },{\n        type: type,\n        timer: 2000,\n        placement: {\n            from: from,\n            align: align\n        },\n        z_index: 2000,\n    });\n};\n\nfunction fortmatTime(time){\n    let date = new Date(time);\n    let year = date.getFullYear();\n    let month = date.getMonth();\n    let date_ = date.getDate();\n    let hour  = date.getHours();\n    let min   = date.getMinutes();\n    let second = date.getSeconds();\n    return `${hour}:${min}:${second} ${date_}/${month}/${year}`;\n}\n\n\n/** \n * @summary to look-up a beautiful text from rough text\n * @example Message(\"s7\") return: \"ETHERNET S7\" | Message(\"modbus\") return \"MODBUS TCP\"\n */\n\n function Message(text){\n    const table = {\n        \"s7\": \"ETHERNET S7\",\n        \"modbus\": \"MODBUS TCP\",\n        \"opcua\": \"OPC UA\",\n        \"siemens\": \"SIEMENS\",\n        \"schneider\": \"SCHNEIDER\",\n        \"mitsubishi\": \"MITSUBISHI\",\n        \"s7-300\": \"S7-300\",\n        \"s7-1200\": \"S7-1200\",\n        \"s7-1500\": \"S7-1500\",\n\n        \"1\": \"TRUE\",\n        \"true\": \"TRUE\",\n        \"0\": \"FALSE\",\n        \"false\": \"FALSE\"\n\n    }\n\n    let result = table[text] || text;\n    return result;\n }\n\n\n module.exports = {\n    showNotification, \n    fortmatTime,\n    Message\n }\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ })

/******/ });