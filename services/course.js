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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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