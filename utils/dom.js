"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopPropagation = exports.setAppContainer = exports.clickByPriority = exports.appContainer = void 0;
let _id = 0;
let registeredElements = {};
const clickByPriority = (callback, priority) => element => {
  if (element) {
    if (!element.dataset.clickId) {
      const id = _id++ + "";
      element.dataset.clickId = id;
      registeredElements[id] = callback;
    }
    element.dataset.clickPriority = priority + "";
  }
};
exports.clickByPriority = clickByPriority;
const stopPropagation = e => e.stopPropagation();
exports.stopPropagation = stopPropagation;
let appContainer;
exports.appContainer = appContainer;
const setAppContainer = e => exports.appContainer = appContainer = e;
exports.setAppContainer = setAppContainer;