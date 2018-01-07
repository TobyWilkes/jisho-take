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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Definition {
    constructor(_left = [], _right = []) {
        this.left = [];
        this.right = [];
        this.toString = function () {
            return `${this.left.toString()} | ${this.right.toString()}`;
        };
        this.left = _left;
        this.right = _right;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Definition;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Definition__ = __webpack_require__(0);

class WordList {
    constructor() {
        this.words = [];
        this.load();
    }
    addWord(newWord) {
        this.words.push(newWord);
        console.log(`${this.words.length} words`);
        this.save();
    }
    load(callback = () => { }) {
        browser.storage.local.get((items) => {
            this.words = items.words.map((e) => {
                return new __WEBPACK_IMPORTED_MODULE_0__Definition__["a" /* Definition */](e.l, e.r);
            });
            callback();
            console.log("Loaded", items);
        });
    }
    save() {
        browser.storage.local.set({
            words: this.words.map((e) => {
                return {
                    l: e.left,
                    r: e.right,
                };
            })
        });
    }
    removeByIndex(index) {
        this.words.splice(index, 1);
    }
    removeAll() {
        this.words = [];
    }
    toString() {
        return this.words.map((e) => {
            return e.toString();
        }).toString();
    }
    toCsv() {
        return this.words.map((e, i) => {
            let out = `"<span>${e.left[0].replace(';', '%3B')}</span>";"<p><ruby>${e.left[0].replace(';', '%3B')}<rt>${e.left[1].replace(';', '%3B')}</rt></ruby></p>`;
            out += `<p>${e.right.map(rightEl => { return `<p>${rightEl.trim().replace(';', '%3B')}</p>`; })}</p>"`;
            return out;
        }).join("\n");
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WordList;



/***/ }),
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Definition__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__WordList__ = __webpack_require__(1);


let list = new __WEBPACK_IMPORTED_MODULE_1__WordList__["a" /* WordList */]();
list.load();
var clients = [];
function broadcast(m) {
    console.log("Broadcasting", m, `to ${clients.length} clients`, clients);
    clients.forEach(client => {
        console.log(client);
        client.postMessage(m);
    });
}
function connected(p) {
    clients.push(p);
    p.name = `test${clients.length}`;
    p.onMessage.addListener(m => {
        switch (m.type) {
            case "add": {
                let def = new __WEBPACK_IMPORTED_MODULE_0__Definition__["a" /* Definition */]();
                def.left = m.l;
                def.right = m.r;
                list.addWord(def);
                broadcast({ type: "refresh" });
                console.log("Ordered refresh");
                break;
            }
            case "refresh": {
                broadcast({ type: "refresh" });
                list.load();
                console.log("Ordered refresh");
                break;
            }
        }
    });
    p.onDisconnect.addListener(event => {
        clients.splice(clients.findIndex(e => {
            return e.name == p.name;
        }), 1);
        console.log("Removed client");
    });
}
browser.runtime.onConnect.addListener(connected);


/***/ })
/******/ ]);
//# sourceMappingURL=background.js.map