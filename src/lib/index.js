// Basic
import Modal from "./components/shared/Modal";
import { STRLContextProvider } from "./Context";

// Course
import CourseCard from "./components/course/CourseCard";
import CourseModal from "./components/course/CourseModal";
import CourseDetailPage from "./components/course/CourseDetailPage";

// Multi lang
import MultiLangContextProvider, {
  MultiLangContext,
} from "./components/multi-lang/MultiLangContext";
import MultiLangBody from "./components/multi-lang/MultiLangBody";
import MultiLangField from "./components/multi-lang/MultiLangField";
import MultiLangFieldMd from "./components/multi-lang/MultiLangFieldMd";
import MultiLangFieldImage from "./components/multi-lang/MultiLangFieldImage";

export {
  // Context
  STRLContextProvider,
  //
  // Basic
  Modal,
  // Course
  CourseCard,
  CourseModal,
  CourseDetailPage,
  // Multi Lang
  MultiLangContextProvider,
  MultiLangContext,
  MultiLangBody,
  MultiLangField,
  MultiLangFieldMd,
  MultiLangFieldImage,
};
