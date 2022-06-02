"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.courseFormatter = exports.catFormatter = void 0;

require("core-js/modules/es.symbol.description.js");

const courseFormatter = obj => ({
  categoryName: obj.course_category.name,
  categoryId: obj.course_category.id,
  category: obj.course_category,
  categoryImg: "",
  courseId: obj.id,
  shortName: obj.full_name,
  displayName: obj.full_name,
  description: obj.description,
  courseImg: obj.image_url,
  students_enrolled: obj.students_enrolled || 0,
  digitalContentDuration: obj.duration,
  liveClassDuration: obj.live_class_duration,
  nsqf_lvl: obj.nsqf_level,
  redirection_url: obj.moodle_course_url,
  cost: obj.cost,
  discount: obj.discount,
  modules: obj.modules,
  partners: obj.partners
});

exports.courseFormatter = courseFormatter;

const catFormatter = obj => ({
  numOfCourses: obj.count,
  categoryName: obj.name,
  id: obj.id,
  image: obj.image_url
});

exports.catFormatter = catFormatter;