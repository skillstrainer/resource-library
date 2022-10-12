"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.symbol.description.js");

var _react = _interopRequireDefault(require("react"));

var _MultiLangBody = _interopRequireDefault(require("../multi-lang/MultiLangBody"));

var _MultiLangFieldMd = _interopRequireDefault(require("../multi-lang/MultiLangFieldMd"));

var _MultiLangFieldImage = _interopRequireDefault(require("../multi-lang/MultiLangFieldImage"));

var _MultiLangField = _interopRequireDefault(require("../multi-lang/MultiLangField"));

var _CourseOverviewAndPurchaseFragment = _interopRequireDefault(require("./CourseOverviewAndPurchaseFragment"));

var _react2 = require("@headlessui/react");

var _solid = require("@heroicons/react/solid");

var _pageTopBg = _interopRequireDefault(require("../../assets/image/page-top-bg.png"));

var _certificate = _interopRequireDefault(require("../../assets/image/certificate.jpg"));

var _jobs = _interopRequireDefault(require("../../assets/image/jobs.jpg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Icons
// Images
function CourseDetailPage(props) {
  const {
    courseData,
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
    videoUrl,
    certificateImageUrl,
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
  }, /*#__PURE__*/_react.default.createElement(_CourseOverviewAndPurchaseFragment.default, {
    courseData: courseData,
    onPaymentStarted: payNow,
    viewCourse: viewCourse,
    goToCategoryPage: goToCategoryPage,
    isPurchased: isPurchased
  })))), /*#__PURE__*/_react.default.createElement("section", {
    className: "mt-12"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "content mx-auto grid grid-cols-1 lg:grid-cols-2"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "mr-5"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "text-3xl blue-dark2 font-semibold leading-10 text-center mt-3"
  }, "About the Course"), /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement(_MultiLangField.default, {
    name: "description"
  }, description))), /*#__PURE__*/_react.default.createElement("div", {
    className: "ml-5"
  }, /*#__PURE__*/_react.default.createElement("video", {
    autoPlay: true,
    controls: true,
    width: "100%"
  }, /*#__PURE__*/_react.default.createElement("source", {
    src: videoUrl
  }))))), /*#__PURE__*/_react.default.createElement("section", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "content mx-auto bg-blue-grad px-4 py-10 md:px-10 mt-20"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "grid grid-cols-1 gap-8 md:grid-cols-2"
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h2", {
    className: "text-3xl text-center mb-8 blue-dark2 font-semibold"
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
  })))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h2", {
    className: "text-3xl text-center mb-8 blue-dark2 font-semibold"
  }, "Certificate You Will Get"), /*#__PURE__*/_react.default.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: certificateImageUrl ? certificateImageUrl : _certificate.default,
    className: "w-full h-full"
  })))))), /*#__PURE__*/_react.default.createElement("section", null, /*#__PURE__*/_react.default.createElement("div", {
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