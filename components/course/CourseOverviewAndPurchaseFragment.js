"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CourseOverviewAndPurchaseFragment;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _MultiLangField = _interopRequireDefault(require("../multi-lang/MultiLangField"));

var _newLogo = _interopRequireDefault(require("../../assets/image/newLogo.svg"));

var _dom = require("../../utils/dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function CourseOverviewAndPurchaseFragment(props) {
  const {
    courseData,
    onPaymentStarted,
    viewCourse,
    goToCategoryPage,
    isPurchased
  } = props;
  const {
    displayName,
    categoryName,
    courseImg,
    cost,
    discount,
    students_enrolled,
    nsqf_lvl,
    partners,
    subscription_cost,
    is_subscription,
    interval,
    course_type,
    duration,
    // Demo class
    userHasRegisteredDemo,
    onViewDemoDetails = () => {},
    isDemoAvailable,
    onBookDemo = () => {}
  } = courseData || {};
  const [payingBySubscription, setPayingBySubscription] = (0, _react.useState)(false);
  const [paymentStarted, setPaymentStarted] = (0, _react.useState)(false);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "flex justify-center"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "px-4 py-10 md:px-10 shadow-xl w-full"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-between flex-col gap-5 md:flex-row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "w-full md:w-2/5"
  }, /*#__PURE__*/_react.default.createElement("div", {
    class: "relative"
  }, /*#__PURE__*/_react.default.createElement("img", {
    class: "w-full object-cover object-center shadow-xl rounded-xl",
    src: courseImg,
    alt: "course-img"
  }), /*#__PURE__*/_react.default.createElement("div", {
    class: "absolute top-4 left-2 font-semibold"
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "bg-white text-xs font-semibold rounded-md p-1 shadow-lg border",
    onClick: goToCategoryPage
  }, categoryName)))), /*#__PURE__*/_react.default.createElement("div", {
    className: "w-full md:w-3/5"
  }, /*#__PURE__*/_react.default.createElement("h2", {
    className: "text-2xl font-semibold leading-10 text-japanese_indigo mb-3"
  }, /*#__PURE__*/_react.default.createElement(_MultiLangField.default, {
    name: "display_name"
  }, displayName)), /*#__PURE__*/_react.default.createElement("div", {
    className: "mb-6 text-sm"
  }, /*#__PURE__*/_react.default.createElement("div", {
    class: "flex flex-row justify-between"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    stroke: "currentColor",
    fill: "currentColor",
    "stroke-width": "0",
    viewBox: "0 0 24 24",
    class: "text-orange mx-1",
    height: "1.4em",
    width: "1.4em",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/_react.default.createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    "fill-rule": "evenodd",
    d: "M16.67 13.13C18.04 14.06 19 15.32 19 17v3h4v-3c0-2.18-3.57-3.47-6.33-3.87z"
  }), /*#__PURE__*/_react.default.createElement("circle", {
    cx: "9",
    cy: "8",
    r: "4",
    "fill-rule": "evenodd"
  }), /*#__PURE__*/_react.default.createElement("path", {
    "fill-rule": "evenodd",
    d: "M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24a5.98 5.98 0 010 7.52c.42.14.86.24 1.33.24zM9 13c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"
  })), /*#__PURE__*/_react.default.createElement("span", {
    className: "ml-2"
  }, students_enrolled, " students")), /*#__PURE__*/_react.default.createElement("a", {
    href: "https://www.youtube.com/watch?v=riE-VMMXMHI",
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "red-dark mr-2"
  }, "NSQF"), /*#__PURE__*/_react.default.createElement("span", null, nsqf_lvl || "NA")))), /*#__PURE__*/_react.default.createElement("div", {
    className: "text-md mb-3"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "font-semibold text-japanese_indigo mr-3 "
  }, "Course Structure:"), /*#__PURE__*/_react.default.createElement("span", null, course_type == 3 ? "Physical Classes + Live Online Classes + Digital Content" : course_type == 2 ? "Live Online Classes + Digital Content" : course_type == 1 ? "Digital Content (Self Paced)" : "Self Paced Digital Content")), is_subscription && !isPurchased && /*#__PURE__*/_react.default.createElement("div", {
    className: "text-md mb-3"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "font-semibold text-japanese_indigo mr-3 "
  }, "Course Payment type:"), /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(RadioButton, {
    label: "One Time",
    value: !payingBySubscription,
    onChange: () => setPayingBySubscription(false)
  }), /*#__PURE__*/_react.default.createElement(RadioButton, {
    label: "Installment",
    value: payingBySubscription,
    onChange: () => setPayingBySubscription(true)
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "text-md mb-3"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "font-semibold text-japanese_indigo mr-3 "
  }, !payingBySubscription ? "Price:" : "Installment Price:"), /*#__PURE__*/_react.default.createElement("span", null, !payingBySubscription ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
    className: discount ? "line-through mr-2" : ""
  }, cost > 0 ? "\u20B9 ".concat(cost) : "Free"), discount && discount > 0 && /*#__PURE__*/_react.default.createElement("span", null, "\u20B9 ", Number(cost) - Number(discount))) : payingBySubscription ? "\u20B9".concat(subscription_cost, "/Month Upto ").concat(interval, " Months") : "")), duration && /*#__PURE__*/_react.default.createElement("div", {
    className: "text-md mb-3"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "font-semibold text-japanese_indigo mr-3 "
  }, "Course Duration:"), /*#__PURE__*/_react.default.createElement("span", null, duration)), partners && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("span", {
    className: "font-semibold text-japanese_indigo mr-3 text-md"
  }, "Certification Partners:"), /*#__PURE__*/_react.default.createElement("div", {
    className: "mx-2 flex flex-wrap mt-3 mb-3"
  }, partners.concat([{
    logo: _newLogo.default
  }]).map(p => p && p.logo && /*#__PURE__*/_react.default.createElement("img", {
    src: p.logo,
    className: "mr-3 h-9"
  }) || null))), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex gap-3 mt-4"
  }, isPurchased ? /*#__PURE__*/_react.default.createElement("button", {
    className: "w-full text-sm bg-red-dark hover:opacity-90 px-6 py-3 text-white rounded-lg md:w-auto",
    onClick: viewCourse
  }, "View course") : /*#__PURE__*/_react.default.createElement("button", {
    onClick: e => {
      (0, _dom.stopPropagation)(e);
      setPaymentStarted(true);
      onPaymentStarted({
        payingBySubscription
      }).catch(() => {}).then(setPaymentStarted);
    },
    className: "w-full text-sm bg-red-dark hover:opacity-90 px-4 py-2 text-white rounded-lg md:w-auto",
    disabled: paymentStarted
  }, paymentStarted ? "Please wait..." : !payingBySubscription ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", null, "Get Enrolled for "), /*#__PURE__*/_react.default.createElement("span", {
    className: "font-bold ".concat(discount ? "line-through mr-2" : "")
  }, cost > 0 ? "\u20B9 ".concat(cost) : "Free"), discount && discount > 0 && /*#__PURE__*/_react.default.createElement("span", {
    className: "font-bold"
  }, "\u20B9 ", Number(cost) - Number(discount))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", null, "Get Enrolled for "), /*#__PURE__*/_react.default.createElement("span", {
    className: "font-bold"
  }, "\u20B9 ", subscription_cost))), !isPurchased && (userHasRegisteredDemo ? /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => onViewDemoDetails(),
    className: "text-sm bg-red-dark hover:opacity-90 px-4 py-2 text-white rounded-lg"
  }, "Show Demo Class Details") : isDemoAvailable && /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => onBookDemo(),
    className: "text-sm bg-red-dark hover:opacity-90 px-4 py-2 text-white rounded-lg"
  }, "Book A Free Demo")))))));
}

const RadioButton = _ref => {
  let {
    label,
    value,
    onChange
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("label", {
    className: "mr-5"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "radio",
    className: "mr-1",
    checked: value,
    onChange: onChange
  }), label);
};