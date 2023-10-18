"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileToBase64 = exports.defaultUploadFn = void 0;
require("core-js/modules/es.promise.js");
const fileToBase64 = async file => new Promise((res, rej) => {
  const fr = new FileReader();
  fr.onloadend = () => res(fr.result);
  fr.onerror = () => rej(fr.error);
  fr.readAsDataURL(file);
});
exports.fileToBase64 = fileToBase64;
const defaultUploadFn = file => {
  const formData = new FormData();
  formData.append("files", file);
  return file.makePostRequest("/upload", formData).then(res => Array.isArray(res) ? res[0].url : res.url).catch(console.error);
};
exports.defaultUploadFn = defaultUploadFn;