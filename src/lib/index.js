// Basic
import Modal from "./components/shared/Modal";
import { STRLContextProvider } from "./Context";
import { Dropdown } from "./components/dropdown/Dropdown";
import Sidebar from "./components/basic/Sidebar/Sidebar";
import Table from "./components/basic/Table/Table";
import { Toast } from "./services/toast";

// Course
import CourseCard from "./components/course/CourseCard";
import CourseModal from "./components/course/CourseModal";
import CourseDetailPage from "./components/course/CourseDetailPage";
import CourseOverviewAndPurchaseFragment from "./components/course/CourseOverviewAndPurchaseFragment";

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
  Dropdown,
  Sidebar,
  Table,
  Toast,
  //
  // Course
  CourseCard,
  CourseModal,
  CourseDetailPage,
  CourseOverviewAndPurchaseFragment,
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
