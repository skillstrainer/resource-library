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

  return [
    {
      // Course Modal
      toggleCourseModal,
      // Misc
      getCoursePurchaseURL,
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
