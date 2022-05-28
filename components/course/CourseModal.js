"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.symbol.description.js");

var _react = _interopRequireDefault(require("react"));

var _Context = _interopRequireDefault(require("../../Context"));

var _Modal = _interopRequireDefault(require("../shared/Modal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CourseModal = props => {
  const {
    isOpen,
    course,
    onClose,
    goToCategoryPage,
    goToDetailPage
  } = props;
  const {
    categoryName,
    displayName,
    courseImg,
    description,
    students_enrolled,
    digitalContentDuration,
    liveClassDuration,
    nsqf_lvl,
    cost
  } = course || {};
  return /*#__PURE__*/_react.default.createElement(_Modal.default, {
    isOpen: isOpen,
    onClose: onClose,
    innerContainer: {
      className: "w-full px-5 md:w-5/6 lg:w-3/4 font-Poppins rounded-xl shadow-xl",
      style: {
        maxWidth: "900px"
      }
    }
  }, course && /*#__PURE__*/_react.default.createElement("div", {
    className: "p-0 md:p-6 font-Poppins"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-between flex-col gap-8 md:flex-row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "w-full md:w-1/2"
  }, /*#__PURE__*/_react.default.createElement("div", {
    class: "relative"
  }, /*#__PURE__*/_react.default.createElement("img", {
    class: "w-full object-cover object-center shadow-xl rounded-xl",
    src: courseImg,
    alt: "course-img"
  }), /*#__PURE__*/_react.default.createElement("div", {
    class: "absolute top-4 left-2"
  }, /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => {
      if (goToCategoryPage) {
        onClose();
        goToCategoryPage();
      }
    }
  }, /*#__PURE__*/_react.default.createElement("span", {
    class: "bg-white text-base rounded-lg p-2 shadow-lg border font-semibold"
  }, categoryName))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "w-full md:w-1/2"
  }, /*#__PURE__*/_react.default.createElement("h2", {
    className: "text-4xl font-semibold leading-10 text-japanese_indigo mb-6"
  }, displayName), /*#__PURE__*/_react.default.createElement("div", {
    class: "flex flex-row justify-between mb-6"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    stroke: "currentColor",
    fill: "currentColor",
    strokeWidth: "0",
    viewBox: "0 0 24 24",
    class: "text-orange mx-1",
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
  })), /*#__PURE__*/_react.default.createElement("span", {
    className: "ml-2"
  }, students_enrolled, " students")), /*#__PURE__*/_react.default.createElement("a", {
    href: "https://www.youtube.com/watch?v=riE-VMMXMHI",
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "red-dark mr-2"
  }, "NSQF"), /*#__PURE__*/_react.default.createElement("span", null, nsqf_lvl || "NA"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "text-3xl mb-6"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "font-medium mr-3 text-japanese_indigo"
  }, "Course Structure:", " "), /*#__PURE__*/_react.default.createElement("span", null, liveClassDuration ? "Live Classes" : "Self Paced Digital Content")), digitalContentDuration && /*#__PURE__*/_react.default.createElement("div", {
    className: "text-3xl mb-6"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "font-medium mr-3 text-japanese_indigo"
  }, "Digital Content Duration:"), /*#__PURE__*/_react.default.createElement("span", null, digitalContentDuration, " hours")), liveClassDuration && /*#__PURE__*/_react.default.createElement("div", {
    className: "text-3xl mb-6"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "font-medium mr-3 "
  }, "Live Class Duration:"), /*#__PURE__*/_react.default.createElement("span", null, liveClassDuration)), /*#__PURE__*/_react.default.createElement("a", {
    href: _Context.default.course.getCoursePurchaseURL(course.id),
    target: "_blank"
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "bg-orange hover:opacity-90 text-white font-semibold rounded-lg p-5 mt-6 w-full md:w-auto"
  }, "Get Enrolled for ", cost ? "\u20B9".concat(cost, " Only") : "Free")))), description && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h2", {
    className: "text-4xl font-semibold leading-10 text-japanese_indigo mt-8 mb-4"
  }, "About the Course:"), /*#__PURE__*/_react.default.createElement("p", null, description)), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-col md:flex-row justify-center py-6 md:mt-3"
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "bg-japanese_indigo-light text-japanese_indigo font-semibold py-4 px-8 mx-3 my-2 rounded-lg",
    onClick: onClose
  }, "Close"), /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => {
      if (goToDetailPage) {
        goToDetailPage();
        onClose();
      }
    },
    className: "bg-japanese_indigo-light text-japanese_indigo font-semibold py-4 px-8 mx-3 my-2 rounded-lg w-full md:w-auto"
  }, "See More Details"))));
};

var _default = CourseModal;
exports.default = _default;