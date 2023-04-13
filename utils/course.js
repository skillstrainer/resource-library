"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.courseFormatter = exports.catFormatter = void 0;
require("core-js/modules/es.symbol.description.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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
    certificateImageUrl: obj.certificate_image_url,
    isMoodleCourse: obj.is_moodle_course,
    is_subscription: obj.is_subscription,
    is_taxable: obj.is_subscription,
    moodleCourseId: obj.moodle_course_id,
    course_type: obj.course_type
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