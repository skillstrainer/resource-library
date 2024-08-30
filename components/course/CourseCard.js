"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CourseCard;
var _react = _interopRequireWildcard(require("react"));
var _dom = require("../../utils/dom");
var _Context = require("../../Context");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function CourseCard(props) {
  const {
    data: {
      courseId,
      displayName,
      categoryName,
      courseImg,
      cost,
      students_enrolled,
      discount,
      partners,
      nsqf_lvl,
      duration,
      isMoodleCourse,
      course_type,
      is_subscription,
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
  const {
    request: {
      s3Url
    }
  } = (0, _react.useContext)(_Context.STRLContext);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "relative flex flex-col rounded-lg shadow-lg overflow-hidden cursor-pointer mx-2",
    onClick: goToDetailPage
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "h-56 flex justify-center items-center bg-gray-200"
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "max-w-full max-h-full shadow-xl",
    src: courseImg && courseImg ? isMoodleCourse ? courseImg : s3Url + "/" + courseImg : courseImg,
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
    className: "w-full text-sm mx-auto "
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-row justify-between"
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
  })), students_enrolled || 0), /*#__PURE__*/_react.default.createElement("a", {
    href: "https://www.youtube.com/watch?v=riE-VMMXMHI",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "text-orange"
  }, "NSQF", " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "text-black"
  }, nsqf_lvl ? nsqf_lvl : "NA")))), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-row mt-2 justify-between text-sm h-8 "
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
  })), course_type == 3 ? "Physical Classes + Live Online Classes + Digital Content" : course_type == 2 ? "Live Online Classes + Digital Content" : course_type == 1 ? "Digital Content (Self Paced)" : "Self Paced Digital Content")), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-row  justify-between text-sm h-8 "
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "flex flex-row justify-center"
  }, duration && /*#__PURE__*/_react.default.createElement("svg", {
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
  })), duration))), /*#__PURE__*/_react.default.createElement("div", {
    className: "w-full text-right"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-row ml-2 -mb-5 mt-4"
  }, partners && partners.map(partner => /*#__PURE__*/_react.default.createElement("img", {
    src: partner.logo,
    className: "h-10 mr-4",
    alt: "Partner Text"
  })), " "), " ", /*#__PURE__*/_react.default.createElement("p", {
    className: "text-japanese_indigo text-sm mx-2"
  }, "See More Details >", " ")), /*#__PURE__*/_react.default.createElement("div", {
    className: "w-full text-right"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-row ml-2 -mb-5 mt-4"
  }, is_subscription && /*#__PURE__*/_react.default.createElement("p", {
    className: "text-japanese_indigo text-sm mx-2"
  }, "EMI Is Available"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex item-center justify-center w-full"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "mt-6 bottom-0 mb-4 flex gap-3"
  }, isPurchased ? /*#__PURE__*/_react.default.createElement("button", {
    className: "text-sm bg-red-dark hover:opacity-90 px-6 py-3 text-white rounded-lg",
    onClick: viewCourse
  }, "View course") : /*#__PURE__*/_react.default.createElement("button", {
    onClick: e => {
      (0, _dom.stopPropagation)(e);
      payNow();
    },
    className: "text-sm bg-red-dark hover:opacity-90 px-4 py-2 text-white rounded-lg"
  }, /*#__PURE__*/_react.default.createElement("span", null, "Get Enrolled for "), /*#__PURE__*/_react.default.createElement("span", {
    className: "font-bold ".concat(discount ? "line-through mr-2" : "")
  }, cost > 0 ? "\u20B9 ".concat(cost) : "Free", cost > 0 && !discount ? " + 18% GST " : ""), Boolean(discount) && /*#__PURE__*/_react.default.createElement("span", {
    className: "font-bold"
  }, "\u20B9 ", Number(cost) - Number(discount), Number(cost) - Number(discount) > 0 ? " + 18% GST" : ""))

  // : (
  //   <a
  //     href={getCoursePurchaseURL(courseId)}
  //     onClick={stopPropagation}
  //     target="_blank"
  //   >
  //     <button className="text-sm bg-red-dark hover:opacity-90 px-4 py-2 text-white rounded-lg">
  //       <span>Get Enrolled for </span>
  //       <span
  //         className={`font-bold ${discount ? "line-through mr-2" : ""}`}
  //       >
  //         {cost > 0 ? `₹ ${cost}` : "Free"}
  //       </span>
  //       {discount && (
  //         <span className="font-bold">
  //           ₹ {Number(cost) - Number(discount)}
  //         </span>
  //       )}
  //     </button>
  //   </a>
  // )
  , !isPurchased && (userHasRegisteredDemo ? /*#__PURE__*/_react.default.createElement("button", {
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
  }, "Book A Free Demo")))));
}