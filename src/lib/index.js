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

// Form
import Form, {
  getFormGlobalPlugins,
  setFormGlobalPlugins,
  getFormGlobalPreprocessors,
  setFormGlobalPreprocessors,
  getFormGlobalPostprocessors,
  setFormGlobalPostprocessors,
} from "./components/form-core";

import * as CoreFormFields from "./components/form-core/field-list";
import * as ExtFormFields from "./components/form-ext/field-list";
import { defaultPlugins as CoreFormPlugins } from "./components/form-core/config";
import * as ExtFormPlugins from "./components/form-ext/plugin-list";

const FormFields = { ...CoreFormFields, ...ExtFormFields };
const FormPlugins = { ...CoreFormPlugins, ...ExtFormPlugins };

export {
  // Context
  STRLContextProvider,
  //
  // Basic
  Modal,
  //
  // Course
  CourseCard,
  CourseModal,
  CourseDetailPage,
  //
  // Multi Lang
  MultiLangContextProvider,
  MultiLangContext,
  MultiLangBody,
  MultiLangField,
  MultiLangFieldMd,
  MultiLangFieldImage,
  //
  // Form
  Form,
  FormFields,
  FormPlugins,
  getFormGlobalPlugins,
  setFormGlobalPlugins,
  getFormGlobalPreprocessors,
  setFormGlobalPreprocessors,
  getFormGlobalPostprocessors,
  setFormGlobalPostprocessors,
};
