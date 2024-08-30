"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToggleListItem = exports.ToggleListContext = void 0;
exports.default = ToggleList;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ToggleListContext = exports.ToggleListContext = /*#__PURE__*/(0, _react.createContext)();
function ToggleList(props) {
  const {
    multiple,
    className,
    style
  } = props;
  const [items, setItems] = (0, _react.useState)([]);
  const itemsCount = (0, _react.useRef)(0);
  const [currentItems, setCurrentItems] = (0, _react.useState)([]);
  let bufferItems = [...items];
  const registerItem = () => {
    const id = itemsCount.current++ + "";
    bufferItems.push({
      id
    });
    setItems(bufferItems);
    return id;
  };
  const unregisterItem = id => {
    const item = bufferItems.find(e => e.id === id);
    bufferItems.splice(bufferItems.indexOf(item), 1);
    setItems(bufferItems);
  };
  const toggleItem = itemId => {
    let current = [...currentItems];
    const existingEntry = current.find(c => c.id === itemId);
    if (existingEntry) current.splice(current.indexOf(existingEntry), 1);else {
      const item = items.find(e => e.id === itemId);
      if (multiple) current.push(item);else current = [item];
    }
    setCurrentItems(current);
  };
  return /*#__PURE__*/_react.default.createElement(ToggleListContext.Provider, {
    value: {
      items: currentItems,
      registerItem,
      unregisterItem,
      toggleItem
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: className,
    style: style
  }, props.children));
}
const ToggleListItem = props => {
  const toggleListCtx = (0, _react.useContext)(ToggleListContext);
  const {
    items,
    unregisterItem,
    registerItem,
    toggleItem
  } = toggleListCtx;
  const {
    children
  } = props;
  const [id, setId] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    const id = registerItem();
    setId(id);
    return () => unregisterItem(id);
  }, []);
  const isActive = items.find(i => i.id === id);
  const toggle = () => toggleItem(id);
  return children({
    toggle,
    isActive
  });
};
exports.ToggleListItem = ToggleListItem;