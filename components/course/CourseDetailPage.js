"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
var _react = _interopRequireWildcard(require("react"));
var _MultiLangBody = _interopRequireDefault(require("../multi-lang/MultiLangBody"));
var _MultiLangFieldMd = _interopRequireDefault(require("../multi-lang/MultiLangFieldMd"));
var _MultiLangFieldImage = _interopRequireDefault(require("../multi-lang/MultiLangFieldImage"));
var _MultiLangField = _interopRequireDefault(require("../multi-lang/MultiLangField"));
var _CourseOverviewAndPurchaseFragment = _interopRequireDefault(require("./CourseOverviewAndPurchaseFragment"));
var _react2 = require("@headlessui/react");
var _solid = require("@heroicons/react/solid");
var _pageTopBg = _interopRequireDefault(require("../../assets/image/page-top-bg.png"));
var _commonCertificate = _interopRequireDefault(require("../../assets/image/common-certificate.png"));
var _jobs = _interopRequireDefault(require("../../assets/image/jobs.jpg"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Icons

// Images

function CourseDetailPage(props) {
  const {
    courseData,
    data,
    multiLangData,
    multiLangKey = "",
    goToCategoryPage = () => {},
    payNow,
    courseModuleTopic,
    // If course is purchased
    isPurchased,
    viewCourse = () => {}
  } = props;
  const {
    description,
    modules,
    certificateImageUrl,
    isMoodleCourse,
    partners
  } = courseData || {};
  const videoURL = (0, _react.useMemo)(() => {
    let {
      videoUrl
    } = courseData;
    if (!videoUrl) return "";
    return "https://www.youtube.com/embed/" + videoUrl.split("watch?v=")[1];
  }, [courseData.videoUrl]);
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
    className: "bg-white",
    style: {
      zIndex: "1"
    }
  }, /*#__PURE__*/_react.default.createElement(_CourseOverviewAndPurchaseFragment.default, {
    courseData: courseData,
    onPaymentStarted: payNow,
    viewCourse: viewCourse,
    goToCategoryPage: goToCategoryPage,
    isPurchased: isPurchased
  })))), /*#__PURE__*/_react.default.createElement("section", {
    className: "mt-12"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "content mx-auto grid grid-cols-1 lg:grid-cols-2",
    style: {
      gridTemplateColumns: videoURL ? "repeat(2, minmax(0, 1fr))" : "repeat(1, minmax(0, 1fr)"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "mr-5"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "text-3xl blue-dark2 font-semibold leading-10  mt-3"
  }, "About the Course"), /*#__PURE__*/_react.default.createElement(_MultiLangField.default, {
    name: "description"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "list-wrapper mt-4",
    dangerouslySetInnerHTML: {
      __html: description === null || description === void 0 ? void 0 : description.replace(/\n/g, "<br />")
    }
  }))), videoURL && /*#__PURE__*/_react.default.createElement("div", {
    className: "ml-5"
  }, /*#__PURE__*/_react.default.createElement("iframe", {
    width: "560",
    height: "315",
    src: videoURL,
    title: "YouTube video player",
    frameborder: "0",
    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    allowFullScreen: true
  })))), /*#__PURE__*/_react.default.createElement("section", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "content mx-auto bg-blue-grad px-4 py-10 md:px-10 mt-20"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "grid grid-cols-1 gap-8 md:grid-cols-2"
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h2", {
    className: "text-3xl mb-8 blue-dark2 font-semibold"
  }, "Course Modules"), isMoodleCourse == false ? courseModuleTopic && /*#__PURE__*/_react.default.createElement("div", {
    className: "w-full p-2 mx-auto rounded-lg"
  }, courseModuleTopic.length > 0 && courseModuleTopic.map(module => /*#__PURE__*/_react.default.createElement(_react2.Disclosure, {
    as: "div"
  }, _ref => {
    var _module$coursesec, _module$coursesec2;
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
    }), ((_module$coursesec = module.coursesec) === null || _module$coursesec === void 0 ? void 0 : _module$coursesec.length) > 0 && /*#__PURE__*/_react.default.createElement(_solid.ChevronUpIcon, {
      className: "".concat(open ? "transform rotate-180" : "", " w-5 h-5")
    })), ((_module$coursesec2 = module.coursesec) === null || _module$coursesec2 === void 0 ? void 0 : _module$coursesec2.length) > 0 && /*#__PURE__*/_react.default.createElement(_react2.Disclosure.Panel, {
      className: "px-2 pt-2 pb-1 text-sm text-gray-500 pr-0"
    }, /*#__PURE__*/_react.default.createElement("ul", {
      className: "ml-3"
    }, module.coursesec.map(item => /*#__PURE__*/_react.default.createElement("li", {
      className: "bg-white rounded-lg p-3 mb-1 text-black",
      style: {
        listStyle: "disc"
      },
      dangerouslySetInnerHTML: {
        __html: item.name
      }
    })))));
  }))) : modules && /*#__PURE__*/_react.default.createElement("div", {
    className: "w-full p-2 mx-auto rounded-lg"
  }, modules.length > 0 && modules.map(module => /*#__PURE__*/_react.default.createElement(_react2.Disclosure, {
    as: "div"
  }, _ref2 => {
    var _module$modules, _module$modules2;
    let {
      open
    } = _ref2;
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
  })))), courseData.has_certificate === true && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h2", {
    className: "text-3xl text-center mb-8 blue-dark2 font-semibold"
  }, "Certificate You Will Get"), /*#__PURE__*/_react.default.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: certificateImageUrl ? certificateImageUrl : _commonCertificate.default,
    className: "w-full h-full"
  })))))), partners.map(partnerId => {
    if (partnerId.id !== 59) {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("section", null, /*#__PURE__*/_react.default.createElement("div", {
        className: "content mx-auto px-3 py-12 pt-20 md:px-16 flex justify-content w-full"
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
  }));
}
var _default = exports.default = CourseDetailPage;