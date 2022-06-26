"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FilePreview;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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