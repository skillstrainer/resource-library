"use strict";

require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useCourseService;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _CourseModal = _interopRequireDefault(require("../components/course/CourseModal"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function useCourseService(config) {
  const {
    webappUrl
  } = config.request;

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
  };

  // Misc
  const getCoursePurchaseURL = courseId => "".concat(webappUrl, "/buy-course/").concat(courseId);
  return [{
    // Course Modal
    toggleCourseModal,
    // Misc
    getCoursePurchaseURL
  }, [
  /*#__PURE__*/
  // Course modal
  _react.default.createElement(_CourseModal.default, _extends({
    isOpen: isCourseModalOpen
  }, courseModalConfig || {}, {
    onClose: () => setIsCourseModalOpen(false)
  }))]];
}