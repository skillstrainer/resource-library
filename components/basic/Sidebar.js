"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Context = require("../../Context");

var _locationHooks = require("../../utils/hooks/locationHooks");

var _SidebarItem = _interopRequireDefault(require("./Sidebar/SidebarItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const Sidebar = _ref => {
  let {
    setSidebarItems,
    sidebarItems = {
      items: [],
      active: 0
    }
  } = _ref;

  /*
   *
   * Loading dependencies
   */
  const strlContext = (0, _react.useContext)(_Context.STRLContext);
  const {
    dependency: {
      dependencies
    }
  } = strlContext;
  const {
    useHistory,
    useParams
  } = dependencies || {};
  if (typeof useHistory !== "function") throw Error({
    msg: "Missing required dependencies: useHistory, useParams"
  });
  /*
   * Main
   */

  const changeCurrentItem = index => setSidebarItems(_objectSpread(_objectSpread({}, sidebarItems), {}, {
    active: index
  }));

  const {
    sidebarActive
  } = useParams();
  const baseurl = (0, _locationHooks.useBasePath)();
  const history = useHistory();
  (0, _react.useEffect)(() => {
    var changed = false;

    for (var i = 0; i < sidebarItems.items.length; i++) {
      if (sidebarItems.items[i].url === sidebarActive) {
        changeCurrentItem(i);
        changed = true;
        break;
      }
    }

    if (!changed) changeCurrentItem(0);
  }, [sidebarActive, sidebarItems.items, history]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "w-80"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "mt-4"
  }, sidebarItems.items.map((item, index) => !item.hidden ? /*#__PURE__*/_react.default.createElement(_SidebarItem.default, {
    name: item.name,
    Icon: item.icon,
    key: index,
    selected: index === sidebarItems.active,
    className: "m-4",
    linkTo: "".concat(baseurl, "/").concat(item.url),
    onClick: () => {
      changeCurrentItem(index);
    }
  }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null))));
};

var _default = Sidebar;
exports.default = _default;