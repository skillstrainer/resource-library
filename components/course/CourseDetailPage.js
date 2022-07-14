"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.symbol.description.js");

var _react = _interopRequireWildcard(require("react"));

var _Context = require("../../Context");

var _MultiLangBody = _interopRequireDefault(require("../multi-lang/MultiLangBody"));

var _MultiLangFieldMd = _interopRequireDefault(require("../multi-lang/MultiLangFieldMd"));

var _MultiLangFieldImage = _interopRequireDefault(require("../multi-lang/MultiLangFieldImage"));

var _MultiLangField = _interopRequireDefault(require("../multi-lang/MultiLangField"));

var _react2 = require("@headlessui/react");

var _solid = require("@heroicons/react/solid");

var _pageTopBg = _interopRequireDefault(require("../../assets/image/page-top-bg.png"));

var _certificate = _interopRequireDefault(require("../../assets/image/certificate.jpg"));

var _jobs = _interopRequireDefault(require("../../assets/image/jobs.jpg"));

var _newLogo = _interopRequireDefault(require("../../assets/image/newLogo.svg"));

var _CourseDetailPageStaging = _interopRequireDefault(require("./CourseDetailPageStaging"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Icons
// Images
function CourseDetailPage(props) {
  const {
    request: {
      env
    },
    course: {
      getCoursePurchaseURL
    }
  } = (0, _react.useContext)(_Context.STRLContext); // To prevent new course detailing page from appearing in production

  if (env !== "production") return /*#__PURE__*/_react.default.createElement(_CourseDetailPageStaging.default, props);
  const {
    courseData,
    multiLangData,
    multiLangKey = "",
    goToCategoryPage = () => {},
    isPurchased,
    viewCourse,
    payNow
  } = props;
  const {
    courseId,
    displayName,
    categoryName,
    description,
    courseImg,
    cost,
    students_enrolled,
    duration,
    isLive,
    nsqf_lvl,
    modules,
    partners,
    isMoodleCourse
  } = courseData || {};
  return /*#__PURE__*/_react.default.createElement(_MultiLangBody.default, {
    _key: multiLangKey,
    data: multiLangData
  }, /*#__PURE__*/_react.default.createElement("section", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "relative pt-32"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: _pageTopBg.default,
    className: "absolute top-0",
    alt: "",
    style: {
      zIndex: "-1"
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "content mx-auto bg-white",
    style: {
      zIndex: "1"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
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
  }, "Course structure:"), /*#__PURE__*/_react.default.createElement("span", null, isLive ? "Live Classes" : "Self Paced Digital Content")), /*#__PURE__*/_react.default.createElement("div", {
    className: "text-md mb-3"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "font-semibold text-japanese_indigo mr-3 "
  }, "Duration:"), /*#__PURE__*/_react.default.createElement("span", null, duration)), partners && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("span", {
    className: "font-semibold text-japanese_indigo mr-3 text-md"
  }, "Certification Partners:"), /*#__PURE__*/_react.default.createElement("div", {
    className: "mx-2 flex flex-wrap mt-3 mb-3"
  }, partners.concat([{
    logo: _newLogo.default
  }]).map(p => p && p.logo && /*#__PURE__*/_react.default.createElement("img", {
    src: p.logo,
    className: "h-6"
  }) || null))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "text-md font-semibold leading-10 text-japanese_indigo mt-3"
  }, "About the Course:"), /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement(_MultiLangField.default, {
    name: "description"
  }, description))), isPurchased ? /*#__PURE__*/_react.default.createElement("button", {
    className: "w-full text-sm bg-red-dark hover:opacity-90 px-6 py-3 text-white rounded-lg",
    onClick: viewCourse
  }, "View course") : isMoodleCourse == false ? /*#__PURE__*/_react.default.createElement("button", {
    onClick: e => {
      stopPropagation(e);
      payNow();
    },
    className: "w-full text-sm bg-red-dark hover:opacity-90 px-4 py-2 text-white rounded-lg"
  }, /*#__PURE__*/_react.default.createElement("span", null, "Get Enrolled for "), /*#__PURE__*/_react.default.createElement("span", {
    className: "font-bold"
  }, cost > 0 ? "\u20B9 ".concat(cost) : "Free")) : /*#__PURE__*/_react.default.createElement("a", {
    href: getCoursePurchaseURL(courseId),
    onClick: stopPropagation,
    target: "_blank"
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "w-full text-sm bg-red-dark hover:opacity-90 px-4 py-2 text-white rounded-lg"
  }, /*#__PURE__*/_react.default.createElement("span", null, "Get Enrolled for "), /*#__PURE__*/_react.default.createElement("span", {
    className: "font-bold"
  }, cost > 0 ? "\u20B9 ".concat(cost) : "Free")))))))))), /*#__PURE__*/_react.default.createElement("section", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "content mx-auto bg-blue-grad px-4 py-10 md:px-10 mt-20"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "grid grid-cols-1 gap-8 md:grid-cols-2"
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h2", {
    className: "text-3xl text-center mb-8 blue-dark2 font-semibold"
  }, "Course Modules"), modules && /*#__PURE__*/_react.default.createElement("div", {
    className: "w-full p-2 mx-auto rounded-lg"
  }, modules.length > 0 && modules.map(module => /*#__PURE__*/_react.default.createElement(_react2.Disclosure, {
    as: "div"
  }, _ref => {
    var _module$modules, _module$modules2;

    let {
      open
    } = _ref;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react2.Disclosure.Button, {
      className: "flex justify-between w-full p-3 text-sm font-medium text-left blue-dark2 bg-white rounded-lg focus:outline-none"
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "text-japanese_indigo font-semibold",
      dangerouslySetInnerHTML: {
        __html: module.name
      }
    }), ((_module$modules = module.modules) === null || _module$modules === void 0 ? void 0 : _module$modules.length) > 0 && /*#__PURE__*/_react.default.createElement(_solid.ChevronUpIcon, {
      className: "".concat(open ? "transform rotate-180" : "", " w-5 h-5")
    })), ((_module$modules2 = module.modules) === null || _module$modules2 === void 0 ? void 0 : _module$modules2.length) > 0 && /*#__PURE__*/_react.default.createElement(_react2.Disclosure.Panel, {
      className: "px-2 pt-2 pb-1 text-sm text-gray-500 pr-0"
    }, /*#__PURE__*/_react.default.createElement("ul", {
      className: "ml-3"
    }, module.modules.map(item => /*#__PURE__*/_react.default.createElement("li", {
      className: "bg-white rounded-lg p-3 mb-1 text-black",
      style: {
        listStyle: "disc"
      },
      dangerouslySetInnerHTML: {
        __html: item.name
      }
    })))));
  })))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h2", {
    className: "text-3xl text-center mb-8 blue-dark2 font-semibold"
  }, "Certificate You Will Get"), /*#__PURE__*/_react.default.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: _certificate.default,
    className: "w-full h-full"
  }), /*#__PURE__*/_react.default.createElement("p", {
    className: "absolute w-full h-full top-0 left-0 text-center text-gray-600",
    style: {
      transform: "scale(0.6) translateY(50%)"
    }
  }, "student of ", /*#__PURE__*/_react.default.createElement("b", null, "XYZ Institute"), " has successfully", /*#__PURE__*/_react.default.createElement("br", null), "cleared the assessment for the job role of", /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("b", null, displayName), /*#__PURE__*/_react.default.createElement("br", null), "conforming to National Skills Qualifications Framework Level -", " ", nsqf_lvl || "X")))))), /*#__PURE__*/_react.default.createElement("section", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "content mx-auto px-3 py-12 pt-20 md:px-16 shadow-2xl flex justify-content w-full"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "w-full md:w-1/2"
  }, /*#__PURE__*/_react.default.createElement("h2", {
    className: "text-3xl font-semibold text-gray-800 blue-dark2 mb-5"
  }, "Job / Work Opportunities:"), /*#__PURE__*/_react.default.createElement("div", {
    className: "text-sm"
  }, /*#__PURE__*/_react.default.createElement(_MultiLangFieldMd.default, {
    name: "job_opportunities",
    defaultValue: "Jobs and Opportunities are coming your way very soon. Stay tuned!\n",
    editor: {
      dims: {
        width: "calc(100% - 20px)",
        height: "calc(100% - 150px)"
      }
    }
  })), /*#__PURE__*/_react.default.createElement("button", {
    disabled: true,
    className: "bg-orange opacity-60 text-white font-semibold rounded-md text-sm p-3 mt-10 w-full md:w-auto"
  }, "View Jobs")), /*#__PURE__*/_react.default.createElement("div", {
    className: "w-full md:w-1/2"
  }, /*#__PURE__*/_react.default.createElement("div", {
    class: "relative"
  }, /*#__PURE__*/_react.default.createElement(_MultiLangFieldImage.default, {
    className: "w-full object-cover object-center shadow-xl",
    src: _jobs.default,
    name: "jobs",
    alt: "course-img"
  }))))));
}

var _default = CourseDetailPage;
exports.default = _default;