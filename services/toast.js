"use strict";

require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toast = void 0;
exports.default = useToastService;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.symbol.description.js");
var _react = _interopRequireWildcard(require("react"));
var _Modal = _interopRequireDefault(require("../components/shared/Modal"));
var _reactToastify = require("react-toastify");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const Toast = {};
exports.Toast = Toast;
let count = 0;
const initialState = props => _objectSpread({
  id: ++count + "",
  isOpen: true,
  type: ""
}, props);
function useToastService(config) {
  const transitionTime = 0.4;
  Toast.success = function () {
    let msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Success!";
    return _reactToastify.toast.success(msg, {
      position: "top-center",
      closeOnClick: true,
      autoClose: 5000
    });
  };
  Toast.error = function () {
    let msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "An error occured";
    return _reactToastify.toast.error(msg, {
      position: "top-center",
      closeOnClick: true,
      autoClose: 5000
    });
  };
  Toast.warn = function () {
    let msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Watch out!";
    return _reactToastify.toast.warn(msg, {
      position: "top-center",
      closeOnClick: true,
      autoClose: 5000
    });
  };
  Toast.load = function () {
    let msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Loading...";
    return _reactToastify.toast.loading(msg, {
      position: "top-center",
      closeOnClick: true,
      autoClose: 5000
    });
  };
  Toast.endLoader = loaderInstance => _reactToastify.toast.dismiss(loaderInstance);
  const [stack, setStack] = (0, _react.useState)([]);
  Toast.confirm = function () {
    let msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Continue?";
    let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    setStack([...stack, initialState({
      type: "confirm",
      message: msg,
      resolve,
      reject
    })]);
    return promise;
  };
  Toast.prompt = (comp, props) => {
    if (comp) {
      let resolve, reject;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      setStack([...stack, initialState({
        type: "prompt",
        Body: {
          Component: comp,
          props
        },
        resolve,
        reject
      })]);
      return promise;
    }
    return;
  };
  const closeModal = id => {
    const modalItem = stack.find(modal => modal.id === id);
    modalItem.isOpen = false;
    setStack([...stack]);
    setTimeout(() => {
      setStack(stack.filter(modal => modal.id !== id));
      modalItem.reject();
    }, transitionTime);
  };
  return [Toast, [/*#__PURE__*/_react.default.createElement("div", {
    className: "strl-toast-container"
  }, stack.map(ModalItem => /*#__PURE__*/_react.default.createElement(_Modal.default, {
    isOpen: ModalItem.isOpen,
    onClose: () => closeModal(ModalItem.id),
    transitionTime: transitionTime,
    key: ModalItem.id
  }, ModalItem.type === "confirm" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "text-center font-semibold pb-5"
  }, ModalItem.message), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex justify-end"
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "button button-primary mr-2 w-20",
    onClick: () => {
      ModalItem.resolve(true);
      closeModal(ModalItem.id);
    }
  }, "OK"), /*#__PURE__*/_react.default.createElement("button", {
    className: "button w-20",
    onClick: () => {
      ModalItem.resolve(false);
      closeModal(ModalItem.id);
    }
  }, "Cancel"))), ModalItem.type === "prompt" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "text-center font-semibold pb-5"
  }, /*#__PURE__*/_react.default.createElement(ModalItem.Body.Component, _extends({}, ModalItem.Body.props, {
    resolveFn: function resolveFn() {
      ModalItem.resolve(...arguments);
      closeModal(ModalItem.id);
    },
    rejectFn: function rejectFn() {
      ModalItem.reject(...arguments);
      closeModal(ModalItem.id);
    }
  })))))))]];
}