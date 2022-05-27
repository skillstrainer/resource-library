import "./styles.css";

// Basic
import Modal from "./components/shared/Modal";

// Course
import CourseCard from "./components/course/CourseCard";
import CourseModal from "./components/course/CourseModal";
import STRLService, { STRLContextProvider } from "./Context";

export {
  // Context
  STRLContextProvider,
  // Service
  STRLService,
  //
  // Basic
  Modal,
  // Course
  CourseCard,
  CourseModal,
};
