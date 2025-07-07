"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.courseFormatter = exports.catFormatter = void 0;
require("core-js/modules/es.symbol.description.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const courseFormatter = obj => {
  var _obj$course_category, _obj$course_category2, _obj$course_subscript, _obj$course_subscript2, _obj$course_subscript3;
  return _objectSpread({
    categoryName: (_obj$course_category = obj.course_category) === null || _obj$course_category === void 0 ? void 0 : _obj$course_category.name,
    categoryId: (_obj$course_category2 = obj.course_category) === null || _obj$course_category2 === void 0 ? void 0 : _obj$course_category2.id,
    category: obj.course_category,
    categoryImg: "",
    courseId: obj.id,
    shortName: obj.full_name,
    displayName: obj.full_name,
    description: obj.description,
    courseImg: obj.image_url,
    students_enrolled: obj.students_enrolled || 0,
    isLive: obj.is_live_course,
    duration: obj.duration,
    nsqf_lvl: obj.nsqf_level,
    redirection_url: obj.moodle_course_url,
    cost: obj.cost,
    discount: obj.discount,
    modules: obj.modules,
    partners: obj.partners,
    videoUrl: obj.video_url,
    has_certificate: obj.has_certificate,
    certificateImageUrl: obj.certificate_image_url,
    isMoodleCourse: obj.is_moodle_course,
    is_subscription: obj.is_subscription,
    is_taxable: obj.is_subscription,
    moodleCourseId: obj.moodle_course_id,
    course_type: obj.course_type,
    modulesWithGrades: obj.modulesWithGrades || [],
    isNocnCourse: obj.isNocnCourse || false
  }, obj.course_subscription_relation_array ? {
    plan_id: (_obj$course_subscript = obj.course_subscription_relation_array[0]) === null || _obj$course_subscript === void 0 ? void 0 : _obj$course_subscript.razorpay_plan_id,
    subscription_cost: (_obj$course_subscript2 = obj.course_subscription_relation_array[0]) === null || _obj$course_subscript2 === void 0 ? void 0 : _obj$course_subscript2.subscription_cost,
    interval: (_obj$course_subscript3 = obj.course_subscription_relation_array[0]) === null || _obj$course_subscript3 === void 0 ? void 0 : _obj$course_subscript3.interval
  } : {});
};
exports.courseFormatter = courseFormatter;
const catFormatter = obj => ({
  numOfCourses: obj.count,
  categoryName: obj.name,
  id: obj.id,
  image: obj.image_url
});
exports.catFormatter = catFormatter;