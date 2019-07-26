"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = persistence;

var _lib = require("./lib");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function handleDescriptor(target, key, descriptor, _ref) {
  var _ref2 = _slicedToArray(_ref, 1),
      type = _ref2[0];

  if (type == "singlePage") {
    if (!target.__persistencePair__) {
      // 将这个隐藏属性定义成 not enumerable，遍历的时候是取不到的。
      Object.defineProperty(target, "__persistencePair__", {
        value: [],
        enumerable: false,
        writeable: true,
        configurable: true
      });
    }

    target.__persistencePair__.push(key);
  } else if (type == "global") {
    if (!target.__persistenceAppPair__) {
      Object.defineProperties(target, "__persistenceAppPair__", {
        value: [],
        enumerable: false,
        writeable: true,
        configurable: true
      });
    }

    target.__persistenceAppPair__.push(key);
  }

  return descriptor;
}

function persistence() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "singlePage";
  return (0, _lib.decorate)(handleDescriptor, [type]);
}