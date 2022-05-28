import React, { useState } from "react";
import CourseModal from "../components/course/CourseModal";
import { webappHost } from "../config";

export default function useCourseService() {
  // Course modal
  const [courseModalConfig, setCourseModalConfig] = useState();
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const toggleCourseModal = (args) => {
    if (!isCourseModalOpen) {
      const { data, goToCategoryPage, goToDetailPage } = args || {};
      setCourseModalConfig({ course: data, goToCategoryPage, goToDetailPage });
      setIsCourseModalOpen(true);
    } else {
      setCourseModalConfig({});
      setIsCourseModalOpen(false);
    }
  };

  // Misc
  const getCoursePurchaseURL = (courseId) =>
    `${webappHost}/buy-course/${courseId}`;

  const courseFormatter = (res) =>
    res.map((obj) => ({
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
      partners: obj.partners,
    }));

  const catFormatter = (res) => {
    return res.map((obj) => ({
      numOfCourses: obj.count,
      categoryName: obj.name,
      id: obj.id,
      image: obj.image_url,
    }));
  };

  module.exports = {
    courseFormatter,
    catFormatter,
  };

  return [
    {
      // Course Modal
      toggleCourseModal,
      // Misc
      getCoursePurchaseURL,
      courseFormatter,
      catFormatter,
    },
    [
      // Course modal
      <CourseModal
        isOpen={isCourseModalOpen}
        {...(courseModalConfig || {})}
        onClose={() => setIsCourseModalOpen(false)}
      />,
    ],
  ];
}
