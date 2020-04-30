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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/design/design.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/node-libs-browser/node_modules/punycode/punycode.js":
/*!**************************************************************************!*\
  !*** ./node_modules/node-libs-browser/node_modules/punycode/punycode.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */\n;(function(root) {\n\n\t/** Detect free variables */\n\tvar freeExports =  true && exports &&\n\t\t!exports.nodeType && exports;\n\tvar freeModule =  true && module &&\n\t\t!module.nodeType && module;\n\tvar freeGlobal = typeof global == 'object' && global;\n\tif (\n\t\tfreeGlobal.global === freeGlobal ||\n\t\tfreeGlobal.window === freeGlobal ||\n\t\tfreeGlobal.self === freeGlobal\n\t) {\n\t\troot = freeGlobal;\n\t}\n\n\t/**\n\t * The `punycode` object.\n\t * @name punycode\n\t * @type Object\n\t */\n\tvar punycode,\n\n\t/** Highest positive signed 32-bit float value */\n\tmaxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1\n\n\t/** Bootstring parameters */\n\tbase = 36,\n\ttMin = 1,\n\ttMax = 26,\n\tskew = 38,\n\tdamp = 700,\n\tinitialBias = 72,\n\tinitialN = 128, // 0x80\n\tdelimiter = '-', // '\\x2D'\n\n\t/** Regular expressions */\n\tregexPunycode = /^xn--/,\n\tregexNonASCII = /[^\\x20-\\x7E]/, // unprintable ASCII chars + non-ASCII chars\n\tregexSeparators = /[\\x2E\\u3002\\uFF0E\\uFF61]/g, // RFC 3490 separators\n\n\t/** Error messages */\n\terrors = {\n\t\t'overflow': 'Overflow: input needs wider integers to process',\n\t\t'not-basic': 'Illegal input >= 0x80 (not a basic code point)',\n\t\t'invalid-input': 'Invalid input'\n\t},\n\n\t/** Convenience shortcuts */\n\tbaseMinusTMin = base - tMin,\n\tfloor = Math.floor,\n\tstringFromCharCode = String.fromCharCode,\n\n\t/** Temporary variable */\n\tkey;\n\n\t/*--------------------------------------------------------------------------*/\n\n\t/**\n\t * A generic error utility function.\n\t * @private\n\t * @param {String} type The error type.\n\t * @returns {Error} Throws a `RangeError` with the applicable error message.\n\t */\n\tfunction error(type) {\n\t\tthrow new RangeError(errors[type]);\n\t}\n\n\t/**\n\t * A generic `Array#map` utility function.\n\t * @private\n\t * @param {Array} array The array to iterate over.\n\t * @param {Function} callback The function that gets called for every array\n\t * item.\n\t * @returns {Array} A new array of values returned by the callback function.\n\t */\n\tfunction map(array, fn) {\n\t\tvar length = array.length;\n\t\tvar result = [];\n\t\twhile (length--) {\n\t\t\tresult[length] = fn(array[length]);\n\t\t}\n\t\treturn result;\n\t}\n\n\t/**\n\t * A simple `Array#map`-like wrapper to work with domain name strings or email\n\t * addresses.\n\t * @private\n\t * @param {String} domain The domain name or email address.\n\t * @param {Function} callback The function that gets called for every\n\t * character.\n\t * @returns {Array} A new string of characters returned by the callback\n\t * function.\n\t */\n\tfunction mapDomain(string, fn) {\n\t\tvar parts = string.split('@');\n\t\tvar result = '';\n\t\tif (parts.length > 1) {\n\t\t\t// In email addresses, only the domain name should be punycoded. Leave\n\t\t\t// the local part (i.e. everything up to `@`) intact.\n\t\t\tresult = parts[0] + '@';\n\t\t\tstring = parts[1];\n\t\t}\n\t\t// Avoid `split(regex)` for IE8 compatibility. See #17.\n\t\tstring = string.replace(regexSeparators, '\\x2E');\n\t\tvar labels = string.split('.');\n\t\tvar encoded = map(labels, fn).join('.');\n\t\treturn result + encoded;\n\t}\n\n\t/**\n\t * Creates an array containing the numeric code points of each Unicode\n\t * character in the string. While JavaScript uses UCS-2 internally,\n\t * this function will convert a pair of surrogate halves (each of which\n\t * UCS-2 exposes as separate characters) into a single code point,\n\t * matching UTF-16.\n\t * @see `punycode.ucs2.encode`\n\t * @see <https://mathiasbynens.be/notes/javascript-encoding>\n\t * @memberOf punycode.ucs2\n\t * @name decode\n\t * @param {String} string The Unicode input string (UCS-2).\n\t * @returns {Array} The new array of code points.\n\t */\n\tfunction ucs2decode(string) {\n\t\tvar output = [],\n\t\t    counter = 0,\n\t\t    length = string.length,\n\t\t    value,\n\t\t    extra;\n\t\twhile (counter < length) {\n\t\t\tvalue = string.charCodeAt(counter++);\n\t\t\tif (value >= 0xD800 && value <= 0xDBFF && counter < length) {\n\t\t\t\t// high surrogate, and there is a next character\n\t\t\t\textra = string.charCodeAt(counter++);\n\t\t\t\tif ((extra & 0xFC00) == 0xDC00) { // low surrogate\n\t\t\t\t\toutput.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);\n\t\t\t\t} else {\n\t\t\t\t\t// unmatched surrogate; only append this code unit, in case the next\n\t\t\t\t\t// code unit is the high surrogate of a surrogate pair\n\t\t\t\t\toutput.push(value);\n\t\t\t\t\tcounter--;\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\toutput.push(value);\n\t\t\t}\n\t\t}\n\t\treturn output;\n\t}\n\n\t/**\n\t * Creates a string based on an array of numeric code points.\n\t * @see `punycode.ucs2.decode`\n\t * @memberOf punycode.ucs2\n\t * @name encode\n\t * @param {Array} codePoints The array of numeric code points.\n\t * @returns {String} The new Unicode string (UCS-2).\n\t */\n\tfunction ucs2encode(array) {\n\t\treturn map(array, function(value) {\n\t\t\tvar output = '';\n\t\t\tif (value > 0xFFFF) {\n\t\t\t\tvalue -= 0x10000;\n\t\t\t\toutput += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);\n\t\t\t\tvalue = 0xDC00 | value & 0x3FF;\n\t\t\t}\n\t\t\toutput += stringFromCharCode(value);\n\t\t\treturn output;\n\t\t}).join('');\n\t}\n\n\t/**\n\t * Converts a basic code point into a digit/integer.\n\t * @see `digitToBasic()`\n\t * @private\n\t * @param {Number} codePoint The basic numeric code point value.\n\t * @returns {Number} The numeric value of a basic code point (for use in\n\t * representing integers) in the range `0` to `base - 1`, or `base` if\n\t * the code point does not represent a value.\n\t */\n\tfunction basicToDigit(codePoint) {\n\t\tif (codePoint - 48 < 10) {\n\t\t\treturn codePoint - 22;\n\t\t}\n\t\tif (codePoint - 65 < 26) {\n\t\t\treturn codePoint - 65;\n\t\t}\n\t\tif (codePoint - 97 < 26) {\n\t\t\treturn codePoint - 97;\n\t\t}\n\t\treturn base;\n\t}\n\n\t/**\n\t * Converts a digit/integer into a basic code point.\n\t * @see `basicToDigit()`\n\t * @private\n\t * @param {Number} digit The numeric value of a basic code point.\n\t * @returns {Number} The basic code point whose value (when used for\n\t * representing integers) is `digit`, which needs to be in the range\n\t * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is\n\t * used; else, the lowercase form is used. The behavior is undefined\n\t * if `flag` is non-zero and `digit` has no uppercase form.\n\t */\n\tfunction digitToBasic(digit, flag) {\n\t\t//  0..25 map to ASCII a..z or A..Z\n\t\t// 26..35 map to ASCII 0..9\n\t\treturn digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);\n\t}\n\n\t/**\n\t * Bias adaptation function as per section 3.4 of RFC 3492.\n\t * https://tools.ietf.org/html/rfc3492#section-3.4\n\t * @private\n\t */\n\tfunction adapt(delta, numPoints, firstTime) {\n\t\tvar k = 0;\n\t\tdelta = firstTime ? floor(delta / damp) : delta >> 1;\n\t\tdelta += floor(delta / numPoints);\n\t\tfor (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {\n\t\t\tdelta = floor(delta / baseMinusTMin);\n\t\t}\n\t\treturn floor(k + (baseMinusTMin + 1) * delta / (delta + skew));\n\t}\n\n\t/**\n\t * Converts a Punycode string of ASCII-only symbols to a string of Unicode\n\t * symbols.\n\t * @memberOf punycode\n\t * @param {String} input The Punycode string of ASCII-only symbols.\n\t * @returns {String} The resulting string of Unicode symbols.\n\t */\n\tfunction decode(input) {\n\t\t// Don't use UCS-2\n\t\tvar output = [],\n\t\t    inputLength = input.length,\n\t\t    out,\n\t\t    i = 0,\n\t\t    n = initialN,\n\t\t    bias = initialBias,\n\t\t    basic,\n\t\t    j,\n\t\t    index,\n\t\t    oldi,\n\t\t    w,\n\t\t    k,\n\t\t    digit,\n\t\t    t,\n\t\t    /** Cached calculation results */\n\t\t    baseMinusT;\n\n\t\t// Handle the basic code points: let `basic` be the number of input code\n\t\t// points before the last delimiter, or `0` if there is none, then copy\n\t\t// the first basic code points to the output.\n\n\t\tbasic = input.lastIndexOf(delimiter);\n\t\tif (basic < 0) {\n\t\t\tbasic = 0;\n\t\t}\n\n\t\tfor (j = 0; j < basic; ++j) {\n\t\t\t// if it's not a basic code point\n\t\t\tif (input.charCodeAt(j) >= 0x80) {\n\t\t\t\terror('not-basic');\n\t\t\t}\n\t\t\toutput.push(input.charCodeAt(j));\n\t\t}\n\n\t\t// Main decoding loop: start just after the last delimiter if any basic code\n\t\t// points were copied; start at the beginning otherwise.\n\n\t\tfor (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {\n\n\t\t\t// `index` is the index of the next character to be consumed.\n\t\t\t// Decode a generalized variable-length integer into `delta`,\n\t\t\t// which gets added to `i`. The overflow checking is easier\n\t\t\t// if we increase `i` as we go, then subtract off its starting\n\t\t\t// value at the end to obtain `delta`.\n\t\t\tfor (oldi = i, w = 1, k = base; /* no condition */; k += base) {\n\n\t\t\t\tif (index >= inputLength) {\n\t\t\t\t\terror('invalid-input');\n\t\t\t\t}\n\n\t\t\t\tdigit = basicToDigit(input.charCodeAt(index++));\n\n\t\t\t\tif (digit >= base || digit > floor((maxInt - i) / w)) {\n\t\t\t\t\terror('overflow');\n\t\t\t\t}\n\n\t\t\t\ti += digit * w;\n\t\t\t\tt = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);\n\n\t\t\t\tif (digit < t) {\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\n\t\t\t\tbaseMinusT = base - t;\n\t\t\t\tif (w > floor(maxInt / baseMinusT)) {\n\t\t\t\t\terror('overflow');\n\t\t\t\t}\n\n\t\t\t\tw *= baseMinusT;\n\n\t\t\t}\n\n\t\t\tout = output.length + 1;\n\t\t\tbias = adapt(i - oldi, out, oldi == 0);\n\n\t\t\t// `i` was supposed to wrap around from `out` to `0`,\n\t\t\t// incrementing `n` each time, so we'll fix that now:\n\t\t\tif (floor(i / out) > maxInt - n) {\n\t\t\t\terror('overflow');\n\t\t\t}\n\n\t\t\tn += floor(i / out);\n\t\t\ti %= out;\n\n\t\t\t// Insert `n` at position `i` of the output\n\t\t\toutput.splice(i++, 0, n);\n\n\t\t}\n\n\t\treturn ucs2encode(output);\n\t}\n\n\t/**\n\t * Converts a string of Unicode symbols (e.g. a domain name label) to a\n\t * Punycode string of ASCII-only symbols.\n\t * @memberOf punycode\n\t * @param {String} input The string of Unicode symbols.\n\t * @returns {String} The resulting Punycode string of ASCII-only symbols.\n\t */\n\tfunction encode(input) {\n\t\tvar n,\n\t\t    delta,\n\t\t    handledCPCount,\n\t\t    basicLength,\n\t\t    bias,\n\t\t    j,\n\t\t    m,\n\t\t    q,\n\t\t    k,\n\t\t    t,\n\t\t    currentValue,\n\t\t    output = [],\n\t\t    /** `inputLength` will hold the number of code points in `input`. */\n\t\t    inputLength,\n\t\t    /** Cached calculation results */\n\t\t    handledCPCountPlusOne,\n\t\t    baseMinusT,\n\t\t    qMinusT;\n\n\t\t// Convert the input in UCS-2 to Unicode\n\t\tinput = ucs2decode(input);\n\n\t\t// Cache the length\n\t\tinputLength = input.length;\n\n\t\t// Initialize the state\n\t\tn = initialN;\n\t\tdelta = 0;\n\t\tbias = initialBias;\n\n\t\t// Handle the basic code points\n\t\tfor (j = 0; j < inputLength; ++j) {\n\t\t\tcurrentValue = input[j];\n\t\t\tif (currentValue < 0x80) {\n\t\t\t\toutput.push(stringFromCharCode(currentValue));\n\t\t\t}\n\t\t}\n\n\t\thandledCPCount = basicLength = output.length;\n\n\t\t// `handledCPCount` is the number of code points that have been handled;\n\t\t// `basicLength` is the number of basic code points.\n\n\t\t// Finish the basic string - if it is not empty - with a delimiter\n\t\tif (basicLength) {\n\t\t\toutput.push(delimiter);\n\t\t}\n\n\t\t// Main encoding loop:\n\t\twhile (handledCPCount < inputLength) {\n\n\t\t\t// All non-basic code points < n have been handled already. Find the next\n\t\t\t// larger one:\n\t\t\tfor (m = maxInt, j = 0; j < inputLength; ++j) {\n\t\t\t\tcurrentValue = input[j];\n\t\t\t\tif (currentValue >= n && currentValue < m) {\n\t\t\t\t\tm = currentValue;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,\n\t\t\t// but guard against overflow\n\t\t\thandledCPCountPlusOne = handledCPCount + 1;\n\t\t\tif (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {\n\t\t\t\terror('overflow');\n\t\t\t}\n\n\t\t\tdelta += (m - n) * handledCPCountPlusOne;\n\t\t\tn = m;\n\n\t\t\tfor (j = 0; j < inputLength; ++j) {\n\t\t\t\tcurrentValue = input[j];\n\n\t\t\t\tif (currentValue < n && ++delta > maxInt) {\n\t\t\t\t\terror('overflow');\n\t\t\t\t}\n\n\t\t\t\tif (currentValue == n) {\n\t\t\t\t\t// Represent delta as a generalized variable-length integer\n\t\t\t\t\tfor (q = delta, k = base; /* no condition */; k += base) {\n\t\t\t\t\t\tt = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);\n\t\t\t\t\t\tif (q < t) {\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t}\n\t\t\t\t\t\tqMinusT = q - t;\n\t\t\t\t\t\tbaseMinusT = base - t;\n\t\t\t\t\t\toutput.push(\n\t\t\t\t\t\t\tstringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))\n\t\t\t\t\t\t);\n\t\t\t\t\t\tq = floor(qMinusT / baseMinusT);\n\t\t\t\t\t}\n\n\t\t\t\t\toutput.push(stringFromCharCode(digitToBasic(q, 0)));\n\t\t\t\t\tbias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);\n\t\t\t\t\tdelta = 0;\n\t\t\t\t\t++handledCPCount;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t++delta;\n\t\t\t++n;\n\n\t\t}\n\t\treturn output.join('');\n\t}\n\n\t/**\n\t * Converts a Punycode string representing a domain name or an email address\n\t * to Unicode. Only the Punycoded parts of the input will be converted, i.e.\n\t * it doesn't matter if you call it on a string that has already been\n\t * converted to Unicode.\n\t * @memberOf punycode\n\t * @param {String} input The Punycoded domain name or email address to\n\t * convert to Unicode.\n\t * @returns {String} The Unicode representation of the given Punycode\n\t * string.\n\t */\n\tfunction toUnicode(input) {\n\t\treturn mapDomain(input, function(string) {\n\t\t\treturn regexPunycode.test(string)\n\t\t\t\t? decode(string.slice(4).toLowerCase())\n\t\t\t\t: string;\n\t\t});\n\t}\n\n\t/**\n\t * Converts a Unicode string representing a domain name or an email address to\n\t * Punycode. Only the non-ASCII parts of the domain name will be converted,\n\t * i.e. it doesn't matter if you call it with a domain that's already in\n\t * ASCII.\n\t * @memberOf punycode\n\t * @param {String} input The domain name or email address to convert, as a\n\t * Unicode string.\n\t * @returns {String} The Punycode representation of the given domain name or\n\t * email address.\n\t */\n\tfunction toASCII(input) {\n\t\treturn mapDomain(input, function(string) {\n\t\t\treturn regexNonASCII.test(string)\n\t\t\t\t? 'xn--' + encode(string)\n\t\t\t\t: string;\n\t\t});\n\t}\n\n\t/*--------------------------------------------------------------------------*/\n\n\t/** Define the public API */\n\tpunycode = {\n\t\t/**\n\t\t * A string representing the current Punycode.js version number.\n\t\t * @memberOf punycode\n\t\t * @type String\n\t\t */\n\t\t'version': '1.4.1',\n\t\t/**\n\t\t * An object of methods to convert from JavaScript's internal character\n\t\t * representation (UCS-2) to Unicode code points, and back.\n\t\t * @see <https://mathiasbynens.be/notes/javascript-encoding>\n\t\t * @memberOf punycode\n\t\t * @type Object\n\t\t */\n\t\t'ucs2': {\n\t\t\t'decode': ucs2decode,\n\t\t\t'encode': ucs2encode\n\t\t},\n\t\t'decode': decode,\n\t\t'encode': encode,\n\t\t'toASCII': toASCII,\n\t\t'toUnicode': toUnicode\n\t};\n\n\t/** Expose `punycode` */\n\t// Some AMD build optimizers, like r.js, check for specific condition patterns\n\t// like the following:\n\tif (\n\t\ttrue\n\t) {\n\t\t!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {\n\t\t\treturn punycode;\n\t\t}).call(exports, __webpack_require__, exports, module),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\t} else {}\n\n}(this));\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module), __webpack_require__(/*! ./../../../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./node_modules/node-libs-browser/node_modules/punycode/punycode.js?");

/***/ }),

/***/ "./node_modules/on-change/index.js":
/*!*****************************************!*\
  !*** ./node_modules/on-change/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst {TARGET, UNSUBSCRIBE} = __webpack_require__(/*! ./lib/constants */ \"./node_modules/on-change/lib/constants.js\");\nconst path = __webpack_require__(/*! ./lib/path */ \"./node_modules/on-change/lib/path.js\");\nconst isArray = __webpack_require__(/*! ./lib/is-array */ \"./node_modules/on-change/lib/is-array.js\");\nconst isSymbol = __webpack_require__(/*! ./lib/is-symbol */ \"./node_modules/on-change/lib/is-symbol.js\");\n\nconst isPrimitive = value => value === null || (typeof value !== 'object' && typeof value !== 'function');\n\nconst isBuiltinWithoutMutableMethods = value => value instanceof RegExp || value instanceof Number;\n\nconst isBuiltinWithMutableMethods = value => value instanceof Date;\n\nconst isSameDescriptor = (a, b) => {\n\treturn a !== undefined && b !== undefined &&\n\t\tObject.is(a.value, b.value) &&\n\t\t(a.writable || false) === (b.writable || false) &&\n\t\t(a.enumerable || false) === (b.enumerable || false) &&\n\t\t(a.configurable || false) === (b.configurable || false);\n};\n\nconst shallowClone = value => {\n\tif (isArray(value)) {\n\t\treturn value.slice();\n\t}\n\n\treturn {...value};\n};\n\nconst onChange = (object, onChange, options = {}) => {\n\tconst proxyTarget = Symbol('ProxyTarget');\n\tlet inApply = false;\n\tlet changed = false;\n\tlet applyPath;\n\tlet applyPrevious;\n\tlet isUnsubscribed = false;\n\tconst equals = options.equals || Object.is;\n\tlet propCache = new WeakMap();\n\tlet pathCache = new WeakMap();\n\tlet proxyCache = new WeakMap();\n\n\tconst handleChange = (changePath, property, previous, value) => {\n\t\tif (isUnsubscribed) {\n\t\t\treturn;\n\t\t}\n\n\t\tif (!inApply) {\n\t\t\tonChange(path.concat(changePath, property), value, previous);\n\t\t\treturn;\n\t\t}\n\n\t\tif (inApply && applyPrevious && previous !== undefined && value !== undefined && property !== 'length') {\n\t\t\tlet item = applyPrevious;\n\n\t\t\tif (changePath !== applyPath) {\n\t\t\t\tchangePath = path.after(changePath, applyPath);\n\n\t\t\t\tpath.walk(changePath, key => {\n\t\t\t\t\titem[key] = shallowClone(item[key]);\n\t\t\t\t\titem = item[key];\n\t\t\t\t});\n\t\t\t}\n\n\t\t\titem[property] = previous;\n\t\t}\n\n\t\tchanged = true;\n\t};\n\n\tconst getOwnPropertyDescriptor = (target, property) => {\n\t\tlet props = propCache !== null && propCache.get(target);\n\n\t\tif (props) {\n\t\t\tprops = props.get(property);\n\t\t}\n\n\t\tif (props) {\n\t\t\treturn props;\n\t\t}\n\n\t\tprops = new Map();\n\t\tpropCache.set(target, props);\n\n\t\tlet prop = props.get(property);\n\n\t\tif (!prop) {\n\t\t\tprop = Reflect.getOwnPropertyDescriptor(target, property);\n\t\t\tprops.set(property, prop);\n\t\t}\n\n\t\treturn prop;\n\t};\n\n\tconst invalidateCachedDescriptor = (target, property) => {\n\t\tconst props = propCache ? propCache.get(target) : undefined;\n\n\t\tif (props) {\n\t\t\tprops.delete(property);\n\t\t}\n\t};\n\n\tconst buildProxy = (value, path) => {\n\t\tif (isUnsubscribed) {\n\t\t\treturn value;\n\t\t}\n\n\t\tpathCache.set(value, path);\n\n\t\tlet proxy = proxyCache.get(value);\n\n\t\tif (proxy === undefined) {\n\t\t\tproxy = new Proxy(value, handler);\n\t\t\tproxyCache.set(value, proxy);\n\t\t}\n\n\t\treturn proxy;\n\t};\n\n\tconst unsubscribe = target => {\n\t\tisUnsubscribed = true;\n\t\tpropCache = null;\n\t\tpathCache = null;\n\t\tproxyCache = null;\n\n\t\treturn target;\n\t};\n\n\tconst ignoreProperty = property => {\n\t\treturn isUnsubscribed ||\n\t\t\t(options.ignoreSymbols === true && isSymbol(property)) ||\n\t\t\t(options.ignoreUnderscores === true && property.charAt(0) === '_') ||\n\t\t\t(options.ignoreKeys !== undefined && options.ignoreKeys.includes(property));\n\t};\n\n\tconst handler = {\n\t\tget(target, property, receiver) {\n\t\t\tif (property === proxyTarget || property === TARGET) {\n\t\t\t\treturn target;\n\t\t\t}\n\n\t\t\tif (property === UNSUBSCRIBE &&\n\t\t\t\tpathCache !== null &&\n\t\t\t\tpathCache.get(target) === '') {\n\t\t\t\treturn unsubscribe(target);\n\t\t\t}\n\n\t\t\tconst value = Reflect.get(target, property, receiver);\n\t\t\tif (\n\t\t\t\tisPrimitive(value) ||\n\t\t\t\tisBuiltinWithoutMutableMethods(value) ||\n\t\t\t\tproperty === 'constructor' ||\n\t\t\t\toptions.isShallow === true ||\n\t\t\t\tignoreProperty(property)\n\t\t\t) {\n\t\t\t\treturn value;\n\t\t\t}\n\n\t\t\t// Preserve invariants\n\t\t\tconst descriptor = getOwnPropertyDescriptor(target, property);\n\t\t\tif (descriptor && !descriptor.configurable) {\n\t\t\t\tif (descriptor.set && !descriptor.get) {\n\t\t\t\t\treturn undefined;\n\t\t\t\t}\n\n\t\t\t\tif (descriptor.writable === false) {\n\t\t\t\t\treturn value;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn buildProxy(value, path.concat(pathCache.get(target), property));\n\t\t},\n\n\t\tset(target, property, value, receiver) {\n\t\t\tif (value && value[proxyTarget] !== undefined) {\n\t\t\t\tvalue = value[proxyTarget];\n\t\t\t}\n\n\t\t\tconst ignore = ignoreProperty(property);\n\t\t\tconst previous = ignore ? null : Reflect.get(target, property, receiver);\n\t\t\tconst isChanged = !(property in target) || !equals(previous, value);\n\t\t\tlet result = true;\n\n\t\t\tif (isChanged) {\n\t\t\t\tresult = Reflect.set(target[proxyTarget] || target, property, value);\n\n\t\t\t\tif (!ignore && result) {\n\t\t\t\t\thandleChange(pathCache.get(target), property, previous, value);\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn result;\n\t\t},\n\n\t\tdefineProperty(target, property, descriptor) {\n\t\t\tlet result = true;\n\n\t\t\tif (!isSameDescriptor(descriptor, getOwnPropertyDescriptor(target, property))) {\n\t\t\t\tresult = Reflect.defineProperty(target, property, descriptor);\n\n\t\t\t\tif (result && !ignoreProperty(property) && !isSameDescriptor()) {\n\t\t\t\t\tinvalidateCachedDescriptor(target, property);\n\n\t\t\t\t\thandleChange(pathCache.get(target), property, undefined, descriptor.value);\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn result;\n\t\t},\n\n\t\tdeleteProperty(target, property) {\n\t\t\tif (!Reflect.has(target, property)) {\n\t\t\t\treturn true;\n\t\t\t}\n\n\t\t\tconst ignore = ignoreProperty(property);\n\t\t\tconst previous = ignore ? null : Reflect.get(target, property);\n\t\t\tconst result = Reflect.deleteProperty(target, property);\n\n\t\t\tif (!ignore && result) {\n\t\t\t\tinvalidateCachedDescriptor(target, property);\n\n\t\t\t\thandleChange(pathCache.get(target), property, previous);\n\t\t\t}\n\n\t\t\treturn result;\n\t\t},\n\n\t\tapply(target, thisArg, argumentsList) {\n\t\t\tconst compare = isBuiltinWithMutableMethods(thisArg);\n\n\t\t\tif (compare) {\n\t\t\t\tthisArg = thisArg[proxyTarget];\n\t\t\t}\n\n\t\t\tif (!inApply) {\n\t\t\t\tinApply = true;\n\n\t\t\t\tif (compare) {\n\t\t\t\t\tapplyPrevious = thisArg.valueOf();\n\t\t\t\t}\n\n\t\t\t\tif (isArray(thisArg) || toString.call(thisArg) === '[object Object]') {\n\t\t\t\t\tapplyPrevious = shallowClone(thisArg[proxyTarget]);\n\t\t\t\t}\n\n\t\t\t\tapplyPath = path.initial(pathCache.get(target));\n\n\t\t\t\tconst result = Reflect.apply(target, thisArg, argumentsList);\n\n\t\t\t\tinApply = false;\n\n\t\t\t\tif (changed || (compare && !equals(applyPrevious, thisArg.valueOf()))) {\n\t\t\t\t\thandleChange(applyPath, '', applyPrevious, thisArg[proxyTarget] || thisArg);\n\t\t\t\t\tapplyPrevious = null;\n\t\t\t\t\tchanged = false;\n\t\t\t\t}\n\n\t\t\t\treturn result;\n\t\t\t}\n\n\t\t\treturn Reflect.apply(target, thisArg, argumentsList);\n\t\t}\n\t};\n\n\tconst proxy = buildProxy(object, options.pathAsArray === true ? [] : '');\n\tonChange = onChange.bind(proxy);\n\n\treturn proxy;\n};\n\nonChange.target = proxy => proxy[TARGET] || proxy;\nonChange.unsubscribe = proxy => proxy[UNSUBSCRIBE] || proxy;\n\nmodule.exports = onChange;\n\n\n//# sourceURL=webpack:///./node_modules/on-change/index.js?");

/***/ }),

/***/ "./node_modules/on-change/lib/constants.js":
/*!*************************************************!*\
  !*** ./node_modules/on-change/lib/constants.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n\tPATH_SEPARATOR: '.',\n\tTARGET: Symbol('target'),\n\tUNSUBSCRIBE: Symbol('unsubscribe')\n};\n\n\n//# sourceURL=webpack:///./node_modules/on-change/lib/constants.js?");

/***/ }),

/***/ "./node_modules/on-change/lib/is-array.js":
/*!************************************************!*\
  !*** ./node_modules/on-change/lib/is-array.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = Array.isArray;\n\n\n//# sourceURL=webpack:///./node_modules/on-change/lib/is-array.js?");

/***/ }),

/***/ "./node_modules/on-change/lib/is-symbol.js":
/*!*************************************************!*\
  !*** ./node_modules/on-change/lib/is-symbol.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = value => typeof value === 'symbol';\n\n\n//# sourceURL=webpack:///./node_modules/on-change/lib/is-symbol.js?");

/***/ }),

/***/ "./node_modules/on-change/lib/path.js":
/*!********************************************!*\
  !*** ./node_modules/on-change/lib/path.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst {PATH_SEPARATOR} = __webpack_require__(/*! ./constants */ \"./node_modules/on-change/lib/constants.js\");\nconst isArray = __webpack_require__(/*! ./is-array */ \"./node_modules/on-change/lib/is-array.js\");\nconst isSymbol = __webpack_require__(/*! ./is-symbol */ \"./node_modules/on-change/lib/is-symbol.js\");\n\nmodule.exports = {\n\tafter: (path, subPath) => {\n\t\tif (isArray(path)) {\n\t\t\treturn path.slice(subPath.length);\n\t\t}\n\n\t\tif (subPath === '') {\n\t\t\treturn path;\n\t\t}\n\n\t\treturn path.slice(subPath.length + 1);\n\t},\n\tconcat: (path, key) => {\n\t\tif (isArray(path)) {\n\t\t\tpath = path.slice();\n\n\t\t\tif (key) {\n\t\t\t\tpath.push(key);\n\t\t\t}\n\n\t\t\treturn path;\n\t\t}\n\n\t\tif (key && key.toString !== undefined) {\n\t\t\tif (path !== '') {\n\t\t\t\tpath += PATH_SEPARATOR;\n\t\t\t}\n\n\t\t\tif (isSymbol(key)) {\n\t\t\t\treturn path + 'Symbol(' + key.description + ')';\n\t\t\t}\n\n\t\t\treturn path + key;\n\t\t}\n\n\t\treturn path;\n\t},\n\tinitial: path => {\n\t\tif (isArray(path)) {\n\t\t\treturn path.slice(0, -1);\n\t\t}\n\n\t\tif (path === '') {\n\t\t\treturn path;\n\t\t}\n\n\t\tconst index = path.lastIndexOf(PATH_SEPARATOR);\n\n\t\tif (index === -1) {\n\t\t\treturn '';\n\t\t}\n\n\t\treturn path.slice(0, index);\n\t},\n\twalk: (path, callback) => {\n\t\tif (isArray(path)) {\n\t\t\tpath.forEach(callback);\n\t\t} else if (path !== '') {\n\t\t\tlet position = 0;\n\t\t\tlet index = path.indexOf(PATH_SEPARATOR);\n\n\t\t\tif (index === -1) {\n\t\t\t\tcallback(path);\n\t\t\t} else {\n\t\t\t\twhile (position < path.length) {\n\t\t\t\t\tif (index === -1) {\n\t\t\t\t\t\tindex = path.length;\n\t\t\t\t\t}\n\n\t\t\t\t\tcallback(path.slice(position, index));\n\n\t\t\t\t\tposition = index + 1;\n\t\t\t\t\tindex = path.indexOf(PATH_SEPARATOR, position);\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n};\n\n\n//# sourceURL=webpack:///./node_modules/on-change/lib/path.js?");

/***/ }),

/***/ "./node_modules/querystring-es3/decode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/decode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n\n// If obj.hasOwnProperty has been overridden, then calling\n// obj.hasOwnProperty(prop) will break.\n// See: https://github.com/joyent/node/issues/1707\nfunction hasOwnProperty(obj, prop) {\n  return Object.prototype.hasOwnProperty.call(obj, prop);\n}\n\nmodule.exports = function(qs, sep, eq, options) {\n  sep = sep || '&';\n  eq = eq || '=';\n  var obj = {};\n\n  if (typeof qs !== 'string' || qs.length === 0) {\n    return obj;\n  }\n\n  var regexp = /\\+/g;\n  qs = qs.split(sep);\n\n  var maxKeys = 1000;\n  if (options && typeof options.maxKeys === 'number') {\n    maxKeys = options.maxKeys;\n  }\n\n  var len = qs.length;\n  // maxKeys <= 0 means that we should not limit keys count\n  if (maxKeys > 0 && len > maxKeys) {\n    len = maxKeys;\n  }\n\n  for (var i = 0; i < len; ++i) {\n    var x = qs[i].replace(regexp, '%20'),\n        idx = x.indexOf(eq),\n        kstr, vstr, k, v;\n\n    if (idx >= 0) {\n      kstr = x.substr(0, idx);\n      vstr = x.substr(idx + 1);\n    } else {\n      kstr = x;\n      vstr = '';\n    }\n\n    k = decodeURIComponent(kstr);\n    v = decodeURIComponent(vstr);\n\n    if (!hasOwnProperty(obj, k)) {\n      obj[k] = v;\n    } else if (isArray(obj[k])) {\n      obj[k].push(v);\n    } else {\n      obj[k] = [obj[k], v];\n    }\n  }\n\n  return obj;\n};\n\nvar isArray = Array.isArray || function (xs) {\n  return Object.prototype.toString.call(xs) === '[object Array]';\n};\n\n\n//# sourceURL=webpack:///./node_modules/querystring-es3/decode.js?");

/***/ }),

/***/ "./node_modules/querystring-es3/encode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/encode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n\nvar stringifyPrimitive = function(v) {\n  switch (typeof v) {\n    case 'string':\n      return v;\n\n    case 'boolean':\n      return v ? 'true' : 'false';\n\n    case 'number':\n      return isFinite(v) ? v : '';\n\n    default:\n      return '';\n  }\n};\n\nmodule.exports = function(obj, sep, eq, name) {\n  sep = sep || '&';\n  eq = eq || '=';\n  if (obj === null) {\n    obj = undefined;\n  }\n\n  if (typeof obj === 'object') {\n    return map(objectKeys(obj), function(k) {\n      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;\n      if (isArray(obj[k])) {\n        return map(obj[k], function(v) {\n          return ks + encodeURIComponent(stringifyPrimitive(v));\n        }).join(sep);\n      } else {\n        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));\n      }\n    }).join(sep);\n\n  }\n\n  if (!name) return '';\n  return encodeURIComponent(stringifyPrimitive(name)) + eq +\n         encodeURIComponent(stringifyPrimitive(obj));\n};\n\nvar isArray = Array.isArray || function (xs) {\n  return Object.prototype.toString.call(xs) === '[object Array]';\n};\n\nfunction map (xs, f) {\n  if (xs.map) return xs.map(f);\n  var res = [];\n  for (var i = 0; i < xs.length; i++) {\n    res.push(f(xs[i], i));\n  }\n  return res;\n}\n\nvar objectKeys = Object.keys || function (obj) {\n  var res = [];\n  for (var key in obj) {\n    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);\n  }\n  return res;\n};\n\n\n//# sourceURL=webpack:///./node_modules/querystring-es3/encode.js?");

/***/ }),

/***/ "./node_modules/querystring-es3/index.js":
/*!***********************************************!*\
  !*** ./node_modules/querystring-es3/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.decode = exports.parse = __webpack_require__(/*! ./decode */ \"./node_modules/querystring-es3/decode.js\");\nexports.encode = exports.stringify = __webpack_require__(/*! ./encode */ \"./node_modules/querystring-es3/encode.js\");\n\n\n//# sourceURL=webpack:///./node_modules/querystring-es3/index.js?");

/***/ }),

/***/ "./node_modules/url/url.js":
/*!*********************************!*\
  !*** ./node_modules/url/url.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n\nvar punycode = __webpack_require__(/*! punycode */ \"./node_modules/node-libs-browser/node_modules/punycode/punycode.js\");\nvar util = __webpack_require__(/*! ./util */ \"./node_modules/url/util.js\");\n\nexports.parse = urlParse;\nexports.resolve = urlResolve;\nexports.resolveObject = urlResolveObject;\nexports.format = urlFormat;\n\nexports.Url = Url;\n\nfunction Url() {\n  this.protocol = null;\n  this.slashes = null;\n  this.auth = null;\n  this.host = null;\n  this.port = null;\n  this.hostname = null;\n  this.hash = null;\n  this.search = null;\n  this.query = null;\n  this.pathname = null;\n  this.path = null;\n  this.href = null;\n}\n\n// Reference: RFC 3986, RFC 1808, RFC 2396\n\n// define these here so at least they only have to be\n// compiled once on the first module load.\nvar protocolPattern = /^([a-z0-9.+-]+:)/i,\n    portPattern = /:[0-9]*$/,\n\n    // Special case for a simple path URL\n    simplePathPattern = /^(\\/\\/?(?!\\/)[^\\?\\s]*)(\\?[^\\s]*)?$/,\n\n    // RFC 2396: characters reserved for delimiting URLs.\n    // We actually just auto-escape these.\n    delims = ['<', '>', '\"', '`', ' ', '\\r', '\\n', '\\t'],\n\n    // RFC 2396: characters not allowed for various reasons.\n    unwise = ['{', '}', '|', '\\\\', '^', '`'].concat(delims),\n\n    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.\n    autoEscape = ['\\''].concat(unwise),\n    // Characters that are never ever allowed in a hostname.\n    // Note that any invalid chars are also handled, but these\n    // are the ones that are *expected* to be seen, so we fast-path\n    // them.\n    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),\n    hostEndingChars = ['/', '?', '#'],\n    hostnameMaxLen = 255,\n    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,\n    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,\n    // protocols that can allow \"unsafe\" and \"unwise\" chars.\n    unsafeProtocol = {\n      'javascript': true,\n      'javascript:': true\n    },\n    // protocols that never have a hostname.\n    hostlessProtocol = {\n      'javascript': true,\n      'javascript:': true\n    },\n    // protocols that always contain a // bit.\n    slashedProtocol = {\n      'http': true,\n      'https': true,\n      'ftp': true,\n      'gopher': true,\n      'file': true,\n      'http:': true,\n      'https:': true,\n      'ftp:': true,\n      'gopher:': true,\n      'file:': true\n    },\n    querystring = __webpack_require__(/*! querystring */ \"./node_modules/querystring-es3/index.js\");\n\nfunction urlParse(url, parseQueryString, slashesDenoteHost) {\n  if (url && util.isObject(url) && url instanceof Url) return url;\n\n  var u = new Url;\n  u.parse(url, parseQueryString, slashesDenoteHost);\n  return u;\n}\n\nUrl.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {\n  if (!util.isString(url)) {\n    throw new TypeError(\"Parameter 'url' must be a string, not \" + typeof url);\n  }\n\n  // Copy chrome, IE, opera backslash-handling behavior.\n  // Back slashes before the query string get converted to forward slashes\n  // See: https://code.google.com/p/chromium/issues/detail?id=25916\n  var queryIndex = url.indexOf('?'),\n      splitter =\n          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',\n      uSplit = url.split(splitter),\n      slashRegex = /\\\\/g;\n  uSplit[0] = uSplit[0].replace(slashRegex, '/');\n  url = uSplit.join(splitter);\n\n  var rest = url;\n\n  // trim before proceeding.\n  // This is to support parse stuff like \"  http://foo.com  \\n\"\n  rest = rest.trim();\n\n  if (!slashesDenoteHost && url.split('#').length === 1) {\n    // Try fast path regexp\n    var simplePath = simplePathPattern.exec(rest);\n    if (simplePath) {\n      this.path = rest;\n      this.href = rest;\n      this.pathname = simplePath[1];\n      if (simplePath[2]) {\n        this.search = simplePath[2];\n        if (parseQueryString) {\n          this.query = querystring.parse(this.search.substr(1));\n        } else {\n          this.query = this.search.substr(1);\n        }\n      } else if (parseQueryString) {\n        this.search = '';\n        this.query = {};\n      }\n      return this;\n    }\n  }\n\n  var proto = protocolPattern.exec(rest);\n  if (proto) {\n    proto = proto[0];\n    var lowerProto = proto.toLowerCase();\n    this.protocol = lowerProto;\n    rest = rest.substr(proto.length);\n  }\n\n  // figure out if it's got a host\n  // user@server is *always* interpreted as a hostname, and url\n  // resolution will treat //foo/bar as host=foo,path=bar because that's\n  // how the browser resolves relative URLs.\n  if (slashesDenoteHost || proto || rest.match(/^\\/\\/[^@\\/]+@[^@\\/]+/)) {\n    var slashes = rest.substr(0, 2) === '//';\n    if (slashes && !(proto && hostlessProtocol[proto])) {\n      rest = rest.substr(2);\n      this.slashes = true;\n    }\n  }\n\n  if (!hostlessProtocol[proto] &&\n      (slashes || (proto && !slashedProtocol[proto]))) {\n\n    // there's a hostname.\n    // the first instance of /, ?, ;, or # ends the host.\n    //\n    // If there is an @ in the hostname, then non-host chars *are* allowed\n    // to the left of the last @ sign, unless some host-ending character\n    // comes *before* the @-sign.\n    // URLs are obnoxious.\n    //\n    // ex:\n    // http://a@b@c/ => user:a@b host:c\n    // http://a@b?@c => user:a host:c path:/?@c\n\n    // v0.12 TODO(isaacs): This is not quite how Chrome does things.\n    // Review our test case against browsers more comprehensively.\n\n    // find the first instance of any hostEndingChars\n    var hostEnd = -1;\n    for (var i = 0; i < hostEndingChars.length; i++) {\n      var hec = rest.indexOf(hostEndingChars[i]);\n      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))\n        hostEnd = hec;\n    }\n\n    // at this point, either we have an explicit point where the\n    // auth portion cannot go past, or the last @ char is the decider.\n    var auth, atSign;\n    if (hostEnd === -1) {\n      // atSign can be anywhere.\n      atSign = rest.lastIndexOf('@');\n    } else {\n      // atSign must be in auth portion.\n      // http://a@b/c@d => host:b auth:a path:/c@d\n      atSign = rest.lastIndexOf('@', hostEnd);\n    }\n\n    // Now we have a portion which is definitely the auth.\n    // Pull that off.\n    if (atSign !== -1) {\n      auth = rest.slice(0, atSign);\n      rest = rest.slice(atSign + 1);\n      this.auth = decodeURIComponent(auth);\n    }\n\n    // the host is the remaining to the left of the first non-host char\n    hostEnd = -1;\n    for (var i = 0; i < nonHostChars.length; i++) {\n      var hec = rest.indexOf(nonHostChars[i]);\n      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))\n        hostEnd = hec;\n    }\n    // if we still have not hit it, then the entire thing is a host.\n    if (hostEnd === -1)\n      hostEnd = rest.length;\n\n    this.host = rest.slice(0, hostEnd);\n    rest = rest.slice(hostEnd);\n\n    // pull out port.\n    this.parseHost();\n\n    // we've indicated that there is a hostname,\n    // so even if it's empty, it has to be present.\n    this.hostname = this.hostname || '';\n\n    // if hostname begins with [ and ends with ]\n    // assume that it's an IPv6 address.\n    var ipv6Hostname = this.hostname[0] === '[' &&\n        this.hostname[this.hostname.length - 1] === ']';\n\n    // validate a little.\n    if (!ipv6Hostname) {\n      var hostparts = this.hostname.split(/\\./);\n      for (var i = 0, l = hostparts.length; i < l; i++) {\n        var part = hostparts[i];\n        if (!part) continue;\n        if (!part.match(hostnamePartPattern)) {\n          var newpart = '';\n          for (var j = 0, k = part.length; j < k; j++) {\n            if (part.charCodeAt(j) > 127) {\n              // we replace non-ASCII char with a temporary placeholder\n              // we need this to make sure size of hostname is not\n              // broken by replacing non-ASCII by nothing\n              newpart += 'x';\n            } else {\n              newpart += part[j];\n            }\n          }\n          // we test again with ASCII char only\n          if (!newpart.match(hostnamePartPattern)) {\n            var validParts = hostparts.slice(0, i);\n            var notHost = hostparts.slice(i + 1);\n            var bit = part.match(hostnamePartStart);\n            if (bit) {\n              validParts.push(bit[1]);\n              notHost.unshift(bit[2]);\n            }\n            if (notHost.length) {\n              rest = '/' + notHost.join('.') + rest;\n            }\n            this.hostname = validParts.join('.');\n            break;\n          }\n        }\n      }\n    }\n\n    if (this.hostname.length > hostnameMaxLen) {\n      this.hostname = '';\n    } else {\n      // hostnames are always lower case.\n      this.hostname = this.hostname.toLowerCase();\n    }\n\n    if (!ipv6Hostname) {\n      // IDNA Support: Returns a punycoded representation of \"domain\".\n      // It only converts parts of the domain name that\n      // have non-ASCII characters, i.e. it doesn't matter if\n      // you call it with a domain that already is ASCII-only.\n      this.hostname = punycode.toASCII(this.hostname);\n    }\n\n    var p = this.port ? ':' + this.port : '';\n    var h = this.hostname || '';\n    this.host = h + p;\n    this.href += this.host;\n\n    // strip [ and ] from the hostname\n    // the host field still retains them, though\n    if (ipv6Hostname) {\n      this.hostname = this.hostname.substr(1, this.hostname.length - 2);\n      if (rest[0] !== '/') {\n        rest = '/' + rest;\n      }\n    }\n  }\n\n  // now rest is set to the post-host stuff.\n  // chop off any delim chars.\n  if (!unsafeProtocol[lowerProto]) {\n\n    // First, make 100% sure that any \"autoEscape\" chars get\n    // escaped, even if encodeURIComponent doesn't think they\n    // need to be.\n    for (var i = 0, l = autoEscape.length; i < l; i++) {\n      var ae = autoEscape[i];\n      if (rest.indexOf(ae) === -1)\n        continue;\n      var esc = encodeURIComponent(ae);\n      if (esc === ae) {\n        esc = escape(ae);\n      }\n      rest = rest.split(ae).join(esc);\n    }\n  }\n\n\n  // chop off from the tail first.\n  var hash = rest.indexOf('#');\n  if (hash !== -1) {\n    // got a fragment string.\n    this.hash = rest.substr(hash);\n    rest = rest.slice(0, hash);\n  }\n  var qm = rest.indexOf('?');\n  if (qm !== -1) {\n    this.search = rest.substr(qm);\n    this.query = rest.substr(qm + 1);\n    if (parseQueryString) {\n      this.query = querystring.parse(this.query);\n    }\n    rest = rest.slice(0, qm);\n  } else if (parseQueryString) {\n    // no query string, but parseQueryString still requested\n    this.search = '';\n    this.query = {};\n  }\n  if (rest) this.pathname = rest;\n  if (slashedProtocol[lowerProto] &&\n      this.hostname && !this.pathname) {\n    this.pathname = '/';\n  }\n\n  //to support http.request\n  if (this.pathname || this.search) {\n    var p = this.pathname || '';\n    var s = this.search || '';\n    this.path = p + s;\n  }\n\n  // finally, reconstruct the href based on what has been validated.\n  this.href = this.format();\n  return this;\n};\n\n// format a parsed object into a url string\nfunction urlFormat(obj) {\n  // ensure it's an object, and not a string url.\n  // If it's an obj, this is a no-op.\n  // this way, you can call url_format() on strings\n  // to clean up potentially wonky urls.\n  if (util.isString(obj)) obj = urlParse(obj);\n  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);\n  return obj.format();\n}\n\nUrl.prototype.format = function() {\n  var auth = this.auth || '';\n  if (auth) {\n    auth = encodeURIComponent(auth);\n    auth = auth.replace(/%3A/i, ':');\n    auth += '@';\n  }\n\n  var protocol = this.protocol || '',\n      pathname = this.pathname || '',\n      hash = this.hash || '',\n      host = false,\n      query = '';\n\n  if (this.host) {\n    host = auth + this.host;\n  } else if (this.hostname) {\n    host = auth + (this.hostname.indexOf(':') === -1 ?\n        this.hostname :\n        '[' + this.hostname + ']');\n    if (this.port) {\n      host += ':' + this.port;\n    }\n  }\n\n  if (this.query &&\n      util.isObject(this.query) &&\n      Object.keys(this.query).length) {\n    query = querystring.stringify(this.query);\n  }\n\n  var search = this.search || (query && ('?' + query)) || '';\n\n  if (protocol && protocol.substr(-1) !== ':') protocol += ':';\n\n  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.\n  // unless they had them to begin with.\n  if (this.slashes ||\n      (!protocol || slashedProtocol[protocol]) && host !== false) {\n    host = '//' + (host || '');\n    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;\n  } else if (!host) {\n    host = '';\n  }\n\n  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;\n  if (search && search.charAt(0) !== '?') search = '?' + search;\n\n  pathname = pathname.replace(/[?#]/g, function(match) {\n    return encodeURIComponent(match);\n  });\n  search = search.replace('#', '%23');\n\n  return protocol + host + pathname + search + hash;\n};\n\nfunction urlResolve(source, relative) {\n  return urlParse(source, false, true).resolve(relative);\n}\n\nUrl.prototype.resolve = function(relative) {\n  return this.resolveObject(urlParse(relative, false, true)).format();\n};\n\nfunction urlResolveObject(source, relative) {\n  if (!source) return relative;\n  return urlParse(source, false, true).resolveObject(relative);\n}\n\nUrl.prototype.resolveObject = function(relative) {\n  if (util.isString(relative)) {\n    var rel = new Url();\n    rel.parse(relative, false, true);\n    relative = rel;\n  }\n\n  var result = new Url();\n  var tkeys = Object.keys(this);\n  for (var tk = 0; tk < tkeys.length; tk++) {\n    var tkey = tkeys[tk];\n    result[tkey] = this[tkey];\n  }\n\n  // hash is always overridden, no matter what.\n  // even href=\"\" will remove it.\n  result.hash = relative.hash;\n\n  // if the relative url is empty, then there's nothing left to do here.\n  if (relative.href === '') {\n    result.href = result.format();\n    return result;\n  }\n\n  // hrefs like //foo/bar always cut to the protocol.\n  if (relative.slashes && !relative.protocol) {\n    // take everything except the protocol from relative\n    var rkeys = Object.keys(relative);\n    for (var rk = 0; rk < rkeys.length; rk++) {\n      var rkey = rkeys[rk];\n      if (rkey !== 'protocol')\n        result[rkey] = relative[rkey];\n    }\n\n    //urlParse appends trailing / to urls like http://www.example.com\n    if (slashedProtocol[result.protocol] &&\n        result.hostname && !result.pathname) {\n      result.path = result.pathname = '/';\n    }\n\n    result.href = result.format();\n    return result;\n  }\n\n  if (relative.protocol && relative.protocol !== result.protocol) {\n    // if it's a known url protocol, then changing\n    // the protocol does weird things\n    // first, if it's not file:, then we MUST have a host,\n    // and if there was a path\n    // to begin with, then we MUST have a path.\n    // if it is file:, then the host is dropped,\n    // because that's known to be hostless.\n    // anything else is assumed to be absolute.\n    if (!slashedProtocol[relative.protocol]) {\n      var keys = Object.keys(relative);\n      for (var v = 0; v < keys.length; v++) {\n        var k = keys[v];\n        result[k] = relative[k];\n      }\n      result.href = result.format();\n      return result;\n    }\n\n    result.protocol = relative.protocol;\n    if (!relative.host && !hostlessProtocol[relative.protocol]) {\n      var relPath = (relative.pathname || '').split('/');\n      while (relPath.length && !(relative.host = relPath.shift()));\n      if (!relative.host) relative.host = '';\n      if (!relative.hostname) relative.hostname = '';\n      if (relPath[0] !== '') relPath.unshift('');\n      if (relPath.length < 2) relPath.unshift('');\n      result.pathname = relPath.join('/');\n    } else {\n      result.pathname = relative.pathname;\n    }\n    result.search = relative.search;\n    result.query = relative.query;\n    result.host = relative.host || '';\n    result.auth = relative.auth;\n    result.hostname = relative.hostname || relative.host;\n    result.port = relative.port;\n    // to support http.request\n    if (result.pathname || result.search) {\n      var p = result.pathname || '';\n      var s = result.search || '';\n      result.path = p + s;\n    }\n    result.slashes = result.slashes || relative.slashes;\n    result.href = result.format();\n    return result;\n  }\n\n  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),\n      isRelAbs = (\n          relative.host ||\n          relative.pathname && relative.pathname.charAt(0) === '/'\n      ),\n      mustEndAbs = (isRelAbs || isSourceAbs ||\n                    (result.host && relative.pathname)),\n      removeAllDots = mustEndAbs,\n      srcPath = result.pathname && result.pathname.split('/') || [],\n      relPath = relative.pathname && relative.pathname.split('/') || [],\n      psychotic = result.protocol && !slashedProtocol[result.protocol];\n\n  // if the url is a non-slashed url, then relative\n  // links like ../.. should be able\n  // to crawl up to the hostname, as well.  This is strange.\n  // result.protocol has already been set by now.\n  // Later on, put the first path part into the host field.\n  if (psychotic) {\n    result.hostname = '';\n    result.port = null;\n    if (result.host) {\n      if (srcPath[0] === '') srcPath[0] = result.host;\n      else srcPath.unshift(result.host);\n    }\n    result.host = '';\n    if (relative.protocol) {\n      relative.hostname = null;\n      relative.port = null;\n      if (relative.host) {\n        if (relPath[0] === '') relPath[0] = relative.host;\n        else relPath.unshift(relative.host);\n      }\n      relative.host = null;\n    }\n    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');\n  }\n\n  if (isRelAbs) {\n    // it's absolute.\n    result.host = (relative.host || relative.host === '') ?\n                  relative.host : result.host;\n    result.hostname = (relative.hostname || relative.hostname === '') ?\n                      relative.hostname : result.hostname;\n    result.search = relative.search;\n    result.query = relative.query;\n    srcPath = relPath;\n    // fall through to the dot-handling below.\n  } else if (relPath.length) {\n    // it's relative\n    // throw away the existing file, and take the new path instead.\n    if (!srcPath) srcPath = [];\n    srcPath.pop();\n    srcPath = srcPath.concat(relPath);\n    result.search = relative.search;\n    result.query = relative.query;\n  } else if (!util.isNullOrUndefined(relative.search)) {\n    // just pull out the search.\n    // like href='?foo'.\n    // Put this after the other two cases because it simplifies the booleans\n    if (psychotic) {\n      result.hostname = result.host = srcPath.shift();\n      //occationaly the auth can get stuck only in host\n      //this especially happens in cases like\n      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')\n      var authInHost = result.host && result.host.indexOf('@') > 0 ?\n                       result.host.split('@') : false;\n      if (authInHost) {\n        result.auth = authInHost.shift();\n        result.host = result.hostname = authInHost.shift();\n      }\n    }\n    result.search = relative.search;\n    result.query = relative.query;\n    //to support http.request\n    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {\n      result.path = (result.pathname ? result.pathname : '') +\n                    (result.search ? result.search : '');\n    }\n    result.href = result.format();\n    return result;\n  }\n\n  if (!srcPath.length) {\n    // no path at all.  easy.\n    // we've already handled the other stuff above.\n    result.pathname = null;\n    //to support http.request\n    if (result.search) {\n      result.path = '/' + result.search;\n    } else {\n      result.path = null;\n    }\n    result.href = result.format();\n    return result;\n  }\n\n  // if a url ENDs in . or .., then it must get a trailing slash.\n  // however, if it ends in anything else non-slashy,\n  // then it must NOT get a trailing slash.\n  var last = srcPath.slice(-1)[0];\n  var hasTrailingSlash = (\n      (result.host || relative.host || srcPath.length > 1) &&\n      (last === '.' || last === '..') || last === '');\n\n  // strip single dots, resolve double dots to parent dir\n  // if the path tries to go above the root, `up` ends up > 0\n  var up = 0;\n  for (var i = srcPath.length; i >= 0; i--) {\n    last = srcPath[i];\n    if (last === '.') {\n      srcPath.splice(i, 1);\n    } else if (last === '..') {\n      srcPath.splice(i, 1);\n      up++;\n    } else if (up) {\n      srcPath.splice(i, 1);\n      up--;\n    }\n  }\n\n  // if the path is allowed to go above the root, restore leading ..s\n  if (!mustEndAbs && !removeAllDots) {\n    for (; up--; up) {\n      srcPath.unshift('..');\n    }\n  }\n\n  if (mustEndAbs && srcPath[0] !== '' &&\n      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {\n    srcPath.unshift('');\n  }\n\n  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {\n    srcPath.push('');\n  }\n\n  var isAbsolute = srcPath[0] === '' ||\n      (srcPath[0] && srcPath[0].charAt(0) === '/');\n\n  // put the host back\n  if (psychotic) {\n    result.hostname = result.host = isAbsolute ? '' :\n                                    srcPath.length ? srcPath.shift() : '';\n    //occationaly the auth can get stuck only in host\n    //this especially happens in cases like\n    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')\n    var authInHost = result.host && result.host.indexOf('@') > 0 ?\n                     result.host.split('@') : false;\n    if (authInHost) {\n      result.auth = authInHost.shift();\n      result.host = result.hostname = authInHost.shift();\n    }\n  }\n\n  mustEndAbs = mustEndAbs || (result.host && srcPath.length);\n\n  if (mustEndAbs && !isAbsolute) {\n    srcPath.unshift('');\n  }\n\n  if (!srcPath.length) {\n    result.pathname = null;\n    result.path = null;\n  } else {\n    result.pathname = srcPath.join('/');\n  }\n\n  //to support request.http\n  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {\n    result.path = (result.pathname ? result.pathname : '') +\n                  (result.search ? result.search : '');\n  }\n  result.auth = relative.auth || result.auth;\n  result.slashes = result.slashes || relative.slashes;\n  result.href = result.format();\n  return result;\n};\n\nUrl.prototype.parseHost = function() {\n  var host = this.host;\n  var port = portPattern.exec(host);\n  if (port) {\n    port = port[0];\n    if (port !== ':') {\n      this.port = port.substr(1);\n    }\n    host = host.substr(0, host.length - port.length);\n  }\n  if (host) this.hostname = host;\n};\n\n\n//# sourceURL=webpack:///./node_modules/url/url.js?");

/***/ }),

/***/ "./node_modules/url/util.js":
/*!**********************************!*\
  !*** ./node_modules/url/util.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n  isString: function(arg) {\n    return typeof(arg) === 'string';\n  },\n  isObject: function(arg) {\n    return typeof(arg) === 'object' && arg !== null;\n  },\n  isNull: function(arg) {\n    return arg === null;\n  },\n  isNullOrUndefined: function(arg) {\n    return arg == null;\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/url/util.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(module) {\n\tif (!module.webpackPolyfill) {\n\t\tmodule.deprecate = function() {};\n\t\tmodule.paths = [];\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/module.js?");

/***/ }),

/***/ "./src/design/design.config.js":
/*!*************************************!*\
  !*** ./src/design/design.config.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("interact('.resize-drag')\n  .resizable({\n    // resize from all edges and corners\n    edges: { left: true, right: true, bottom: true, top: true },\n\n    modifiers: [\n      // keep the edges inside the parent\n      interact.modifiers.restrictEdges({\n        outer: 'parent'\n      }),\n\n      // minimum size\n      interact.modifiers.restrictSize({\n        min: { width: 10, height: 10 }\n      })\n    ],\n    autoScroll: true,\n\n    inertia: true\n  })\n  .draggable({\n    // enable inertial throwing\n    inertia: true,\n    // keep the element within the area of it's parent\n    modifiers: [\n      interact.modifiers.restrictRect({\n        restriction: 'parent',\n        endOnly: false,\n      })\n    ],\n    // enable autoScroll\n    autoScroll: true,\n\n    // call this function on every dragmove event\n    onmove: dragMoveListener,\n    // call this function on every dragend event\n    onend: function (event) {\n      var textEl = event.target.querySelector('p')\n\n      textEl && (textEl.textContent =\n        'moved a distance of ' +\n        (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +\n                   Math.pow(event.pageY - event.y0, 2) | 0))\n          .toFixed(2) + 'px')\n\n      console.log(\"on end...\")\n    }\n  })\n  .on('resizemove', function (event) {\n    var target = event.target\n    var x = (parseFloat(target.getAttribute('data-x')) || 0)\n    var y = (parseFloat(target.getAttribute('data-y')) || 0)\n\n    \n\n    if (target.nodeName.toLowerCase() === \"canvas\"){\n      target.setAttribute('data-width',  event.rect.width)\n      target.setAttribute('data-height', event.rect.height)\n    }\n    else{\n      // update the element's style\n      target.style.width = event.rect.width + 'px'\n      target.style.height = event.rect.height + 'px'\n    }\n\n\n    // translate when resizing from top or left edges\n    x += event.deltaRect.left\n    y += event.deltaRect.top\n\n    target.style.webkitTransform = target.style.transform =\n        'translate(' + x + 'px,' + y + 'px)'\n\n    target.setAttribute('data-x', x)\n    target.setAttribute('data-y', y)\n    target.textContent = Math.round(event.rect.width) + '\\u00D7' + Math.round(event.rect.height)\n  })\n\n\n  function dragMoveListener(event) {\n    var target = event.target\n    // keep the dragged position in the data-x/data-y attributes\n    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx\n    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy\n\n    // translate the element\n    target.style.webkitTransform =\n      target.style.transform =\n      'translate(' + x + 'px, ' + y + 'px)'\n\n    // update the posiion attributes\n    target.setAttribute('data-x', x)\n    target.setAttribute('data-y', y)\n  }\n\n  // this is used later in the resizing and gesture demos\n  window.dragMoveListener = dragMoveListener\n\n//# sourceURL=webpack:///./src/design/design.config.js?");

/***/ }),

/***/ "./src/design/design.js":
/*!******************************!*\
  !*** ./src/design/design.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("let Line        = __webpack_require__(/*! ./model/Line */ \"./src/design/model/Line.js\");\nlet Polyline    = __webpack_require__(/*! ./model/Polyline */ \"./src/design/model/Polyline.js\");\nlet Ellipse     = __webpack_require__(/*! ./model/Ellipse */ \"./src/design/model/Ellipse.js\");\nlet Circle      = __webpack_require__(/*! ./model/Rectangle */ \"./src/design/model/Rectangle.js\");\nlet Polygone    = __webpack_require__(/*! ./model/Polygone */ \"./src/design/model/Polygone.js\");\nlet Textblock   = __webpack_require__(/*! ./model/Textblock */ \"./src/design/model/Textblock.js\");\nlet Graphview   = __webpack_require__(/*! ./model/Graphview */ \"./src/design/model/Graphview.js\");\nlet Table       = __webpack_require__(/*! ./model/Table */ \"./src/design/model/Table.js\");\nlet Display     = __webpack_require__(/*! ./model/DisplayValue */ \"./src/design/model/DisplayValue.js\");\nlet Button      = __webpack_require__(/*! ./model/Button */ \"./src/design/model/Button.js\");\nlet Switch      = __webpack_require__(/*! ./model/Switch */ \"./src/design/model/Switch.js\");\nlet Input       = __webpack_require__(/*! ./model/Input */ \"./src/design/model/Input.js\");\nlet Slider      = __webpack_require__(/*! ./model/Slider */ \"./src/design/model/Slider.js\");\nlet Progress    = __webpack_require__(/*! ./model/ProgressBar */ \"./src/design/model/ProgressBar.js\");\nlet Checkbox    = __webpack_require__(/*! ./model/Checkbox */ \"./src/design/model/Checkbox.js\");\nlet SymbolSet   = __webpack_require__(/*! ./model/SymbolSet */ \"./src/design/model/SymbolSet.js\");\nlet LineChart   = __webpack_require__(/*! ./model/LineChart */ \"./src/design/model/LineChart.js\");\nlet BarChart    = __webpack_require__(/*! ./model/BarChart */ \"./src/design/model/BarChart.js\");\nlet PieChart    = __webpack_require__(/*! ./model/PieChart */ \"./src/design/model/PieChart.js\");\nlet GaugeChart  = __webpack_require__(/*! ./model/GaugeChart */ \"./src/design/model/GaugeChart.js\");\n\nlet url         = __webpack_require__(/*! url */ \"./node_modules/url/url.js\");\nlet onChange    = __webpack_require__(/*! on-change */ \"./node_modules/on-change/index.js\");\nlet designUtil  = __webpack_require__(/*! ./designUtil */ \"./src/design/designUtil.js\");\nlet drawingData = __webpack_require__(/*! ./drawingData */ \"./src/design/drawingData.js\");\n                  __webpack_require__(/*! ./design.config */ \"./src/design/design.config.js\");\n\n\n\nconsole.log(designUtil.getDesignId());\n\nlet dataWatched = onChange(drawingData, (path, value, previousValue)=>{\n    // Update UI of drawing page\n\n})\n\n\nmodule.exports.PieChart = function(){\n    \n}\n\n//# sourceURL=webpack:///./src/design/design.js?");

/***/ }),

/***/ "./src/design/designUtil.js":
/*!**********************************!*\
  !*** ./src/design/designUtil.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n    getDesignId: function(){\n        return location.hash.replace('#','');\n    },\n\n    \n\n    \n}\n\n//# sourceURL=webpack:///./src/design/designUtil.js?");

/***/ }),

/***/ "./src/design/drawingData.js":
/*!***********************************!*\
  !*** ./src/design/drawingData.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n    drawing: {},\n\n    initDrawingFromServer: function(designId){\n        $.get('/design/fetch/drawing/' + designId)\n        .then((data) => {\n            if (data != {}){\n                this.renderDrawing();\n            }\n        })\n        .catch((err) => {\n            console.log('Error is: ', err);\n        })\n    },\n\n    renderDrawing: function(){\n        // get from this.drawing and render\n    }\n}\n\n//# sourceURL=webpack:///./src/design/drawingData.js?");

/***/ }),

/***/ "./src/design/model/BarChart.js":
/*!**************************************!*\
  !*** ./src/design/model/BarChart.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports.BarChart = function(){\n    \n}\n\n//# sourceURL=webpack:///./src/design/model/BarChart.js?");

/***/ }),

/***/ "./src/design/model/Button.js":
/*!************************************!*\
  !*** ./src/design/model/Button.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports.Button = function(){\n    \n}\n\n//# sourceURL=webpack:///./src/design/model/Button.js?");

/***/ }),

/***/ "./src/design/model/Checkbox.js":
/*!**************************************!*\
  !*** ./src/design/model/Checkbox.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports.Checkbox = function(){\n    \n}\n\n//# sourceURL=webpack:///./src/design/model/Checkbox.js?");

/***/ }),

/***/ "./src/design/model/DisplayValue.js":
/*!******************************************!*\
  !*** ./src/design/model/DisplayValue.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports.DisplayValue = function(){\n    \n}\n\n//# sourceURL=webpack:///./src/design/model/DisplayValue.js?");

/***/ }),

/***/ "./src/design/model/Ellipse.js":
/*!*************************************!*\
  !*** ./src/design/model/Ellipse.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports.Ellipse = function(){\n    \n}\n\n//# sourceURL=webpack:///./src/design/model/Ellipse.js?");

/***/ }),

/***/ "./src/design/model/GaugeChart.js":
/*!****************************************!*\
  !*** ./src/design/model/GaugeChart.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports.GaugeChart = function(){\n    \n}\n\n//# sourceURL=webpack:///./src/design/model/GaugeChart.js?");

/***/ }),

/***/ "./src/design/model/Graphview.js":
/*!***************************************!*\
  !*** ./src/design/model/Graphview.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports.Graphview = function(){\n    \n}\n\n//# sourceURL=webpack:///./src/design/model/Graphview.js?");

/***/ }),

/***/ "./src/design/model/Input.js":
/*!***********************************!*\
  !*** ./src/design/model/Input.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports.Input = function(){\n    \n}\n\n//# sourceURL=webpack:///./src/design/model/Input.js?");

/***/ }),

/***/ "./src/design/model/Line.js":
/*!**********************************!*\
  !*** ./src/design/model/Line.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports.Line = function(){\n    \n}\n\n//# sourceURL=webpack:///./src/design/model/Line.js?");

/***/ }),

/***/ "./src/design/model/LineChart.js":
/*!***************************************!*\
  !*** ./src/design/model/LineChart.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports.LineChart = function(){\n    \n}\n\n//# sourceURL=webpack:///./src/design/model/LineChart.js?");

/***/ }),

/***/ "./src/design/model/PieChart.js":
/*!**************************************!*\
  !*** ./src/design/model/PieChart.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports.PieChart = function(){\n    \n}\n\n//# sourceURL=webpack:///./src/design/model/PieChart.js?");

/***/ }),

/***/ "./src/design/model/Polygone.js":
/*!**************************************!*\
  !*** ./src/design/model/Polygone.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports.Polygone = function(){\n    \n}\n\n//# sourceURL=webpack:///./src/design/model/Polygone.js?");

/***/ }),

/***/ "./src/design/model/Polyline.js":
/*!**************************************!*\
  !*** ./src/design/model/Polyline.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports.Polyline = function(){\n    \n}\n\n//# sourceURL=webpack:///./src/design/model/Polyline.js?");

/***/ }),

/***/ "./src/design/model/ProgressBar.js":
/*!*****************************************!*\
  !*** ./src/design/model/ProgressBar.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports.ProgressBar = function(){\n    \n}\n\n//# sourceURL=webpack:///./src/design/model/ProgressBar.js?");

/***/ }),

/***/ "./src/design/model/Rectangle.js":
/*!***************************************!*\
  !*** ./src/design/model/Rectangle.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports.Rectangle = function(){\n    \n}\n\n//# sourceURL=webpack:///./src/design/model/Rectangle.js?");

/***/ }),

/***/ "./src/design/model/Slider.js":
/*!************************************!*\
  !*** ./src/design/model/Slider.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports.Slider = function(){\n    \n}\n\n//# sourceURL=webpack:///./src/design/model/Slider.js?");

/***/ }),

/***/ "./src/design/model/Switch.js":
/*!************************************!*\
  !*** ./src/design/model/Switch.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports.Switch = function(){\n    \n}\n\n//# sourceURL=webpack:///./src/design/model/Switch.js?");

/***/ }),

/***/ "./src/design/model/SymbolSet.js":
/*!***************************************!*\
  !*** ./src/design/model/SymbolSet.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports.SymbolSet = function(){\n    \n}\n\n//# sourceURL=webpack:///./src/design/model/SymbolSet.js?");

/***/ }),

/***/ "./src/design/model/Table.js":
/*!***********************************!*\
  !*** ./src/design/model/Table.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports.Table = function(){\n    \n}\n\n//# sourceURL=webpack:///./src/design/model/Table.js?");

/***/ }),

/***/ "./src/design/model/Textblock.js":
/*!***************************************!*\
  !*** ./src/design/model/Textblock.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports.Textblock = function(){\n    \n}\n\n//# sourceURL=webpack:///./src/design/model/Textblock.js?");

/***/ })

/******/ });