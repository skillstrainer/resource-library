import { AiOutlinePlus, AiTwotoneSetting } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { MdSettingsApplications } from "react-icons/md";
import { AiFillPlusSquare } from "react-icons/ai";

export default {
  active: 0,
  items: [
    {
      name: "Manage Course",
      key: "manage_course",
      url: "manage_course",
      Component: <h1>This is a sample component</h1>,
      icon: MdSettingsApplications,
    },
    {
      name: "Create Course",
      key: "create_course",
      url: "create_course",
      Component: <h1>This is a sample component</h1>,
      icon: AiFillPlusSquare,
    },
    {
      name: "Update Course",
      key: "update_course",
      url: "update_course",
      Component: <h1>This is a sample component</h1>,
      icon: AiFillPlusSquare,
    },
    {
      name: "Course Categories",
      key: "course_categories",
      url: "course_categories",
      Component: <h1>This is a sample component</h1>,
      icon: BiCategoryAlt,
    },
    {
      name: "Edit Moodle Configuration",
      key: "moodle_manage",
      url: "moodle_manage",
      Component: <h1>This is a sample component</h1>,
      icon: FiEdit,
    },
  ],
};
