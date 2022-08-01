"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CourseCard;

var _react = _interopRequireWildcard(require("react"));

var _dom = require("../../utils/dom");

var _Context = require("../../Context");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function CourseCard(props) {
  const {
    course: {
      getCoursePurchaseURL,
      toggleCourseModal
    }
  } = (0, _react.useContext)(_Context.STRLContext);
  const {
    data: {
      courseId,
      displayName,
      categoryName,
      courseImg,
      cost,
      students_enrolled,
      isLive,
      nsqf_lvl,
      duration,
      isMoodleCourse,
      course_type,
      // Demo sessions
      userHasRegisteredDemo,
      onViewDemoDetails = () => {},
      isDemoAvailable,
      onBookDemo = () => {}
    },
    goToDetailPage,
    goToCategoryPage,
    payNow,
    // If course is purchased
    isPurchased,
    viewCourse = () => {}
  } = props;
  const url = getCoursePurchaseURL(courseId);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "relative flex flex-col rounded-lg shadow-lg overflow-hidden cursor-pointer mx-2",
    onClick: goToDetailPage
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "h-56 flex justify-center items-center bg-gray-200"
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "max-w-full max-h-full shadow-xl",
    src: courseImg && courseImg.url ? courseImg.url : courseImg,
    alt: displayName
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "absolute top-2 left-2"
  }, /*#__PURE__*/_react.default.createElement("button", {
    onClick: e => {
      if (goToCategoryPage) {
        (0, _dom.stopPropagation)(e);
        goToCategoryPage();
      }
    },
    className: "bg-white text-xs rounded-lg p-2 shadow-lg border font-semibold"
  }, categoryName)))), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-col justify-between h-full p-2"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "h-full"
  }, /*#__PURE__*/_react.default.createElement("h1", {
    className: "text-lg mt-1 mb-6 font-semibold text-gray-600",
    title: displayName
  }, displayName)), /*#__PURE__*/_react.default.createElement("div", {
    className: "w-full text-sm mx-auto"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-row justify-between"
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: ""
  }, isLive ? "Live Classes" : "Self Paced Digital Content"), /*#__PURE__*/_react.default.createElement("a", {
    href: "https://www.youtube.com/watch?v=riE-VMMXMHI",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "text-orange"
  }, "NSQF", " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "text-black"
  }, nsqf_lvl ? nsqf_lvl : "NA")))), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-row my-2 justify-between text-sm h-20"
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "flex flex-row justify-center"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    stroke: "currentColor",
    fill: "currentColor",
    strokeWidth: "0",
    viewBox: "0 0 24 24",
    className: "text-orange mx-1 mt-1",
    height: "1em",
    width: "1em",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"
  })), duration), /*#__PURE__*/_react.default.createElement("p", {
    className: "flex flex-row justify-center"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    stroke: "currentColor",
    fill: "currentColor",
    strokeWidth: "0",
    viewBox: "0 0 24 24",
    className: "text-orange mx-1 mt-1",
    height: "1em",
    width: "1em",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/_react.default.createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    fillRule: "evenodd",
    d: "M16.67 13.13C18.04 14.06 19 15.32 19 17v3h4v-3c0-2.18-3.57-3.47-6.33-3.87z"
  }), /*#__PURE__*/_react.default.createElement("circle", {
    cx: "9",
    cy: "8",
    r: "4",
    fillRule: "evenodd"
  }), /*#__PURE__*/_react.default.createElement("path", {
    fillRule: "evenodd",
    d: "M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24a5.98 5.98 0 010 7.52c.42.14.86.24 1.33.24zM9 13c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"
  })), students_enrolled || 0))), /*#__PURE__*/_react.default.createElement("div", {
    className: "w-full text-right"
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "text-japanese_indigo text-sm mx-2"
  }, "See More Details >", " ")), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex item-center justify-center w-full"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "mt-6 bottom-0 mb-4 flex gap-3"
  }, isPurchased ? /*#__PURE__*/_react.default.createElement("button", {
    className: "text-sm bg-red-dark hover:opacity-90 px-6 py-3 text-white rounded-lg",
    onClick: viewCourse
  }, "View course") : isMoodleCourse === false ? /*#__PURE__*/_react.default.createElement("button", {
    onClick: e => {
      (0, _dom.stopPropagation)(e);
      payNow();
    },
    className: "text-sm bg-red-dark hover:opacity-90 px-4 py-2 text-white rounded-lg"
  }, /*#__PURE__*/_react.default.createElement("span", null, "Get Enrolled for "), /*#__PURE__*/_react.default.createElement("span", {
    className: "font-bold"
  }, cost > 0 ? "\u20B9 ".concat(cost) : "Free")) : /*#__PURE__*/_react.default.createElement("a", {
    href: getCoursePurchaseURL(courseId),
    onClick: _dom.stopPropagation,
    target: "_blank"
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "text-sm bg-red-dark hover:opacity-90 px-4 py-2 text-white rounded-lg"
  }, /*#__PURE__*/_react.default.createElement("span", null, "Get Enrolled for "), /*#__PURE__*/_react.default.createElement("span", {
    className: "font-bold"
  }, cost > 0 ? "\u20B9 ".concat(cost) : "Free"))), !isPurchased && (userHasRegisteredDemo ? /*#__PURE__*/_react.default.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onViewDemoDetails();
    },
    className: "text-sm bg-red-dark hover:opacity-90 px-4 py-2 text-white rounded-lg"
  }, "Show demo class details") : isDemoAvailable && /*#__PURE__*/_react.default.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onBookDemo();
    },
    className: "text-sm bg-red-dark hover:opacity-90 px-4 py-2 text-white rounded-lg"
  }, "Book a demo")))));
}