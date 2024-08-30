"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FilePreview;
require("core-js/modules/es.promise.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function FilePreview(props) {
  const {
    source,
    data,
    onError
  } = props;
  const [frameData, setFrameData] = (0, _react.useState)(data);
  (0, _react.useEffect)(() => {
    (async function () {
      let frameData = data;
      if (source === "file") {
        frameData = await new Promise((res, rej) => {
          const fr = new FileReader();
          fr.onloadend = () => res(fr.result);
          fr.onerror = () => rej(false);
          fr.readAsDataURL(data);
        });
      }
      if (frameData) setFrameData(frameData);else {
        if (source && onError) onError("There was an error opening the file");
      }
    })();
  }, [source, data]);
  return (source === "file" && frameData || source !== "file") && /*#__PURE__*/_react.default.createElement("iframe", {
    src: frameData,
    style: {
      height: "calc(100vh - 15rem)",
      width: "80vw"
    }
  });
}