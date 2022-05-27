"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useCourseService;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = require("react");

var _CourseModal = _interopRequireDefault(require("../components/course/CourseModal"));

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function useCourseService() {
  // Course modal
  const [courseModalConfig, setCourseModalConfig] = (0, _react.useState)();
  const [isCourseModalOpen, setIsCourseModalOpen] = (0, _react.useState)(false);

  const toggleCourseModal = args => {
    if (!isCourseModalOpen) {
      const {
        data,
        goToCategoryPage,
        goToDetailPage
      } = args || {};
      setCourseModalConfig({
        course: data,
        goToCategoryPage,
        goToDetailPage
      });
      setIsCourseModalOpen(true);
    } else {
      setCourseModalConfig({});
      setIsCourseModalOpen(false);
    }
  }; // Misc


  const getCoursePurchaseURL = courseId => "".concat(_config.webappHost, "/buy-course/").concat(courseId);

  return [{
    // Course Modal
    toggleCourseModal,
    // Misc
    getCoursePurchaseURL
  }, [
  /*#__PURE__*/
  // Course modal
  React.createElement(_CourseModal.default, _extends({
    isOpen: isCourseModalOpen
  }, courseModalConfig || {}, {
    onClose: () => setIsCourseModalOpen(false)
  }))]];
}