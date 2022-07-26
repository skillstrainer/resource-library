"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CapturePhoto;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function CapturePhoto(props) {
  const {
    onFinish
  } = props;
  const videoRef = (0, _react.useRef)();
  const streamRef = (0, _react.useRef)();
  const [cameraError, setCameraError] = (0, _react.useState)();
  const [imageData, setImageData] = (0, _react.useState)();

  const clearImageData = () => setImageData();

  const attachUserMediaToVideo = async () => {
    let stream;

    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      });
    } catch (err) {
      console.log(err);
    }

    if (stream) {
      videoRef.current.srcObject = stream;
    } else setCameraError({
      msg: "Can not access camera"
    });

    streamRef.current = stream;
  };

  const capture = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 720;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    let imageData = canvas.toDataURL("image/jpeg");
    setImageData(imageData);
  };

  const finish = () => {
    if (onFinish) onFinish([imageData]);
  };

  (0, _react.useEffect)(() => {
    attachUserMediaToVideo(); // shutting down camera

    return () => {
      if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop());
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "capture-video flex-center mb-5"
  }, /*#__PURE__*/_react.default.createElement("video", {
    className: "w-full h-full md:h-unset",
    style: {
      display: imageData ? "none" : "block"
    },
    ref: videoRef,
    autoPlay: true
  }), /*#__PURE__*/_react.default.createElement("img", {
    src: imageData,
    style: {
      maxHeight: "100%",
      maxWidth: "100%",
      display: imageData ? "block" : "none"
    }
  })), imageData ? /*#__PURE__*/_react.default.createElement("div", {
    className: "flex"
  }, /*#__PURE__*/_react.default.createElement("button", {
    onClick: clearImageData,
    className: "button w-1/2"
  }, "Take another"), /*#__PURE__*/_react.default.createElement("button", {
    onClick: finish,
    className: "button w-1/2 ml-3"
  }, "Finish")) : /*#__PURE__*/_react.default.createElement("button", {
    onClick: capture,
    className: "button w-full"
  }, "Capture")));
}