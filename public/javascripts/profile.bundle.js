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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/profile.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/profile.js":
/*!************************!*\
  !*** ./src/profile.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n// Submit user's data to server\n$(\"#updateProfile\").submit(function(e){\n    e.preventDefault();\n\n    $.ajax({\n        url: \"/profile/updateInfo\",\n        type: \"PUT\",\n        data:  $(\"#updateProfile\").serialize(),\n        success: function(result){\n           \n            swal({\n                title: 'Update information success',\n                text: \"You clicked the button to reload Profile Page\",\n                type: 'success',\n                showCancelButton: true,\n                confirmButtonClass: 'btn btn-success',\n                cancelButtonClass: 'btn btn-danger',\n                buttonsStyling: false\n            }).then(function() {\n              location.reload();\n            });\n        },\n        \n        error: function(error){\n            showNotification(\"top\", \"right\", \"danger\", \"<b>Update</b> profile unsuccess. View log to see the error.\")\n            console.log(\"Get an error here: \", error);\n        }\n    })\n\n})\n\n// Support for load avatar image\ndocument.getElementById(\"file-input\").onchange = function(e) {\n    loadImage(\n      e.target.files[0],\n      function(image) {  \n        console.log(image);\n        let blobData;\n        // image is a canvas element\n        // let [image, data] = convertCanvasToImage(img);\n        image.toBlob(function(blob){\n            console.log(\"blob: \", blob);\n            showImageOnModal(image, blob);\n        }, 'image/png');\n\n      },\n      { maxWidth:  300,\n        maxHeight: 300,\n        // when set \"canvas: false\" - library not working - result still is canvas, so...\n        canvas: true,\n        crop: true, }\n    );\n  };\n\n\nfunction showImageOnModal(img, data){\n    appendContent = `\n        <div id=\"modal\">\n            <button id=\"preview-avatar\" class=\"btn btn-raised btn-round btn-info hidden\" data-toggle=\"modal\" data-target=\"#noticeModal\">\n                Notice modal\n            </button>\n            <div class=\"modal fade\" id=\"noticeModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n            <div class=\"modal-dialog modal-notice\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\"><i class=\"material-icons\">clear</i></button>\n                        <h5 class=\"modal-title text-danger\" id=\"myModalLabel\">Check the uploaded photos. Click <b>Upload</b> to change the avatar</h5>\n                    </div>\n                    <div class=\"modal-body\">\n                        <div class=\"instruction\">\n                            <div class=\"row\">\n                                <div class=\"col-md-3\"></div>\n                                <div class=\"col-md-6 picture\" id=\"preview-holder\">\n                                   \n                                </div>\n                                <div class=\"col-md-3\"></div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"modal-footer text-center\">\n                        <button id=\"btn-upload\" type=\"button\" class=\"btn btn-rose btn-round\" data-dismiss=\"modal\">Upload</button>\n                    </div>\n                </div>\n            </div>\n        </div>`\n\n    // Remove old modal\n    $(\"#modal\" ).remove();    \n    // Add new modal to DOM\n    $(\"body\").append(appendContent);\n    // Clear old image\n    $(\"#preview-holder\").html(\"\");\n    // Add current image to modal\n    $(\"#preview-holder\").append(img);\n\n    $(\"#preview-avatar\").click();\n\n    $(\"#btn-upload\").click(function(){\n        let formdata = new FormData();\n        formdata.append(\"avatarImage\", data, \"avatar.png\");\n        console.log('get here')\n\n        $.ajax({    \n            url: \"/profile/updateAvatar\",\n            type: \"PUT\",\n            processData: false,\n            contentType: false,\n            data:  formdata,\n            success: function(result){\n        \n                swal({\n                    title: 'Update avatar success',\n                    text: \"You clicked the button to reload Profile Page\",\n                    type: 'success',\n                    showCancelButton: true,\n                    confirmButtonClass: 'btn btn-success',\n                    cancelButtonClass: 'btn btn-danger',\n                    buttonsStyling: false\n                }).then(function() {\n                  location.reload();\n                });\n            },\n            \n            error: function(error){\n                showNotification(\"top\", \"right\", \"danger\", \"<b>Update</b> avatar unsuccess. View log to see the error.\")\n                console.log(\"Get an error here: \", error);\n            }\n        })\n    })\n}\n\nfunction convertCanvasToImage(canvas) {\n    let image = new Image();\n    let data  = canvas.toDataURL(\"image/png\");\n\timage.src = data;\n\treturn [image, data];\n}\n\n//# sourceURL=webpack:///./src/profile.js?");

/***/ })

/******/ });