export const courseFormatter = (obj) => ({
  categoryName: obj.course_category?.name,
  categoryId: obj.course_category?.id,
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
  isNocnCourse: obj.isNocnCourse || false,

  ...(obj.course_subscription_relation_array
    ? {
        plan_id: obj.course_subscription_relation_array[0]?.razorpay_plan_id,
        subscription_cost:
          obj.course_subscription_relation_array[0]?.subscription_cost,
        interval: obj.course_subscription_relation_array[0]?.interval,
      }
    : {}),
});

export const catFormatter = (obj) => ({
  numOfCourses: obj.count,
  categoryName: obj.name,
  id: obj.id,
  image: obj.image_url,
});
