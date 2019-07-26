"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = nonenumerable;

var _lib = require("./lib");

function handleDescriptor(target, key, descriptor) {
  descriptor.enumerable = false;
  return descriptor;
}

function nonenumerable() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0, _lib.decorate)(handleDescriptor, args);
}