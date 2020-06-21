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
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/profile.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/profile.js":
/*!*****************************!*\
  !*** ./frontend/profile.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\r\n// Submit user's data to server\r\n$(\"#updateProfile\").submit(function(e){\r\n    e.preventDefault();\r\n\r\n    $.ajax({\r\n        url: \"/profile/updateInfo\",\r\n        type: \"PUT\",\r\n        data:  $(\"#updateProfile\").serialize(),\r\n        success: function(result){\r\n           \r\n            swal({\r\n                title: 'Update information success',\r\n                text: \"You clicked the button to reload Profile Page\",\r\n                type: 'success',\r\n                showCancelButton: true,\r\n                confirmButtonClass: 'btn btn-success',\r\n                cancelButtonClass: 'btn btn-danger',\r\n                buttonsStyling: false\r\n            }).then(function() {\r\n              location.reload();\r\n            });\r\n        },\r\n        \r\n        error: function(error){\r\n            showNotification(\"top\", \"right\", \"danger\", \"<b>Update</b> profile unsuccess. View log to see the error.\")\r\n            console.log(\"Get an error here: \", error);\r\n        }\r\n    })\r\n\r\n})\r\n\r\n// Support for load avatar image\r\ndocument.getElementById(\"file-input\").onchange = function(e) {\r\n    loadImage(\r\n      e.target.files[0],\r\n      function(image) {  \r\n        console.log(image);\r\n        let blobData;\r\n        // image is a canvas element\r\n        // let [image, data] = convertCanvasToImage(img);\r\n        image.toBlob(function(blob){\r\n            console.log(\"blob: \", blob);\r\n            showImageOnModal(image, blob);\r\n        }, 'image/png');\r\n\r\n      },\r\n      { maxWidth:  300,\r\n        maxHeight: 300,\r\n        // when set \"canvas: false\" - library not working - result still is canvas, so...\r\n        canvas: true,\r\n        crop: true, }\r\n    );\r\n  };\r\n\r\n\r\nfunction showImageOnModal(img, data){\r\n    appendContent = `\r\n        <div id=\"modal\">\r\n            <button id=\"preview-avatar\" class=\"btn btn-raised btn-round btn-info hidden\" data-toggle=\"modal\" data-target=\"#noticeModal\">\r\n                Notice modal\r\n            </button>\r\n            <div class=\"modal fade\" id=\"noticeModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n            <div class=\"modal-dialog modal-notice\">\r\n                <div class=\"modal-content\">\r\n                    <div class=\"modal-header\">\r\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\"><i class=\"material-icons\">clear</i></button>\r\n                        <h5 class=\"modal-title text-danger\" id=\"myModalLabel\">Check the uploaded photos. Click <b>Upload</b> to change the avatar</h5>\r\n                    </div>\r\n                    <div class=\"modal-body\">\r\n                        <div class=\"instruction\">\r\n                            <div class=\"row\">\r\n                                <div class=\"col-md-3\"></div>\r\n                                <div class=\"col-md-6 picture\" id=\"preview-holder\">\r\n                                   \r\n                                </div>\r\n                                <div class=\"col-md-3\"></div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"modal-footer text-center\">\r\n                        <button id=\"btn-upload\" type=\"button\" class=\"btn btn-rose btn-round\" data-dismiss=\"modal\">Upload</button>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>`\r\n\r\n    // Remove old modal\r\n    $(\"#modal\" ).remove();    \r\n    // Add new modal to DOM\r\n    $(\"body\").append(appendContent);\r\n    // Clear old image\r\n    $(\"#preview-holder\").html(\"\");\r\n    // Add current image to modal\r\n    $(\"#preview-holder\").append(img);\r\n\r\n    $(\"#preview-avatar\").click();\r\n\r\n    $(\"#btn-upload\").click(function(){\r\n        let formdata = new FormData();\r\n        formdata.append(\"avatarImage\", data, \"avatar.png\");\r\n        console.log('get here')\r\n\r\n        $.ajax({    \r\n            url: \"/profile/updateAvatar\",\r\n            type: \"PUT\",\r\n            processData: false,\r\n            contentType: false,\r\n            data:  formdata,\r\n            success: function(result){\r\n        \r\n                swal({\r\n                    title: 'Update avatar success',\r\n                    text: \"You clicked the button to reload Profile Page\",\r\n                    type: 'success',\r\n                    showCancelButton: true,\r\n                    confirmButtonClass: 'btn btn-success',\r\n                    cancelButtonClass: 'btn btn-danger',\r\n                    buttonsStyling: false\r\n                }).then(function() {\r\n                  location.reload();\r\n                });\r\n            },\r\n            \r\n            error: function(error){\r\n                showNotification(\"top\", \"right\", \"danger\", \"<b>Update</b> avatar unsuccess. View log to see the error.\")\r\n                console.log(\"Get an error here: \", error);\r\n            }\r\n        })\r\n    })\r\n}\r\n\r\nfunction convertCanvasToImage(canvas) {\r\n    let image = new Image();\r\n    let data  = canvas.toDataURL(\"image/png\");\r\n\timage.src = data;\r\n\treturn [image, data];\r\n}\n\n//# sourceURL=webpack:///./frontend/profile.js?");

/***/ })

/******/ });