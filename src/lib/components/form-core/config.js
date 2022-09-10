import BooleanPlugin from "./fields/Boolean";
import DatePlugin from "./fields/Date";
import DateTimePlugin from "./fields/DateTime";
import InputPlugin from "./fields/Input";
import MultiSelectPlugin from "./fields/MultiSelect";
import SelectPlugin from "./fields/Select";
import TextareaPlugin from "./fields/Textarea";

import AddressPlugin from "../form-ext/Address";
import { FileUploaderPlugin } from "../form-ext/FileUploader";

export const defaultPreprocessors = [];
export const defaultPostprocessors = [];
export const defaultPlugins = {
  // Core fields
  select: SelectPlugin,
  textarea: TextareaPlugin,
  date: DatePlugin,
  "date-time": DateTimePlugin,
  boolean: BooleanPlugin,
  "multi-select": MultiSelectPlugin,
  input: InputPlugin,

  // Ext fields
  file: FileUploaderPlugin,
  address: AddressPlugin,
};
