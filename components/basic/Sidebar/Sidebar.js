"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Context = require("../../../Context");
var _locationHooks = require("../../../utils/hooks/locationHooks");
var _SidebarItem = _interopRequireDefault(require("./SidebarItem"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const Sidebar = _ref => {
  let {
    className,
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
    className: "hidden xl:block lg:w-64 shadow-xl left-0 h-screen " + className
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-col justify-between space-y-0 w-full "
  }, sidebarItems.items.map((item, index) => !item.hidden ? /*#__PURE__*/_react.default.createElement(_SidebarItem.default, {
    name: item.name,
    Icon: item.icon,
    key: index,
    selected: index === sidebarItems.active,
    className: "",
    linkTo: "".concat(baseurl, "/").concat(item.url),
    onClick: () => {
      changeCurrentItem(index);
    }
  }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null))));
};
var _default = exports.default = Sidebar;