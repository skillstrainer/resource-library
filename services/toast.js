"use strict";

require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toast = void 0;
exports.default = useToastService;
require("core-js/modules/es.promise.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _Modal = _interopRequireDefault(require("../components/shared/Modal"));
var _reactToastify = require("react-toastify");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const Toast = exports.Toast = {};
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