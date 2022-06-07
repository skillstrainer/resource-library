import "./App.css";
import "./lib/styles.css";
import CourseCard from "./lib/components/course/CourseCard";
import { courseFormatter } from "./lib/utils/course";

function App() {
  const courseData1 = {
    id: 31,
    full_name:
      "English Star - Certificate Program in English for Employability",
    description:
      "English Star - Certificate Program in English for Employability, is first of its kind program in the world which ensures that you learn Spoken English in 3 months and 36 hours. You get 36 live classes by SkillsTrainer certified English Star National Experts and unlimited access to Digital Content. ",
    start_date: "2021-12-29T00:00:00+00:00",
    end_date: "2031-01-29T00:00:00+00:00",
    moodle_config_id: 6,
    moodle_course_url:
      "https://lms.skillstrainer.in/moodle/course/view.php?id=19",
    course_category: {
      id: 5,
      name: "Career",
      description: "",
      visible: true,
      created_at: "2021-12-29T08:05:47.922152+00:00",
      updated_at: "2022-01-23T14:10:18.632737+00:00",
      slug: "career",
      image_url:
        "https://skillstrainer-api.s3.amazonaws.com/medium_Career_Counselling_6a6597e81f.png",
      moodle_category_id: null,
    },
    publish: true,
    is_moodle_course: true,
    created_at: "2021-12-29T09:01:34.922092+00:00",
    updated_at: "2022-05-25T11:22:39.181469+00:00",
    identifier:
      "english-star---certificate-program-in-english-for-employability",
    cost: 3600,
    nsqf_level: null,
    discount: null,
    multilang: null,
    image_url:
      "https://lms.skillstrainer.in/moodle/pluginfile.php/565/course/overviewfiles/english%20star%20logo-final.jpg",
    short_name: "English Star - CPEE",
    moodle_course_id: "19",
    duration: "36",
    is_live_course: true,
    course_partners: [],
  };

  const courseData2 = {
    id: 12,
    full_name: "Social Media Management (For Trainers)",
    description: "Social Media Management (For Trainers)",
    start_date: "2021-12-29T00:00:00+00:00",
    end_date: "2031-01-01T00:00:00+00:00",
    moodle_config_id: 6,
    moodle_course_url:
      "https://lms.skillstrainer.in/moodle/course/view.php?id=124",
    course_category: {
      id: 4,
      name: "Automobile",
      description: "",
      visible: true,
      created_at: "2021-12-29T08:05:42.200725+00:00",
      updated_at: "2022-01-23T14:10:34.528223+00:00",
      slug: "automobile",
      image_url:
        "https://skillstrainer-api.s3.amazonaws.com/medium_Automobile_5b204d6968.png",
      moodle_category_id: null,
    },
    publish: true,
    is_moodle_course: true,
    created_at: "2021-12-29T08:39:03.535125+00:00",
    updated_at: "2022-04-27T11:56:24.758142+00:00",
    identifier: "social-media-management-(for-trainers)",
    cost: 4999,
    nsqf_level: "6",
    discount: null,
    multilang: null,
    image_url:
      "https://lms.skillstrainer.in/moodle/pluginfile.php/585710/course/overviewfiles/SMM.png",
    short_name: "Social Media Management (For Trainers)",
    moodle_course_id: "124",
    duration: "12",
    is_live_course: null,
    course_partners: [],
  };

  return (
    <>
      <CourseCard data={courseFormatter(courseData1)} />
      <CourseCard data={courseFormatter(courseData2)} />
    </>
  );
}

export default App;
