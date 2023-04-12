"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToggleListItem = exports.ToggleListContext = void 0;
exports.default = ToggleList;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const ToggleListContext = /*#__PURE__*/(0, _react.createContext)();
exports.ToggleListContext = ToggleListContext;
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