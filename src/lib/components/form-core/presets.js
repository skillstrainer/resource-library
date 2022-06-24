import * as yup from "yup";

export const rStringField = (label, opts) => {
  let schema = yup.string();
  if (opts?.required) schema = schema.required(label + " is required");
  else schema = schema.nullable();
  return {
    label,
    schema,
    ...opts,
  };
};

export const rNumField = (label, opts) => ({
  label,
  schema: yup.number("Please enter a valid number").nullable(),
  // .required(`${label} is required`),
  type: "number",
});

export const rPhoneField = (label, opts) => ({
  label,
  schema: yup
    .string()
    .matches(
      /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      "Please enter a valid input"
    )
    .nullable(),
  // .required(`${label} cannot be empty`),
  type: "tel",
});

export const rEmailField = (label, opts) => ({
  label,
  schema: yup.string().email("Please enter a valid input").nullable(),
  // .required(`${label} is required`),
  type: "email",
  ...opts,
});

export const rFileField = (label, buttonText, opts) => {
  let schema = yup.array().of(
    yup.object().shape({
      url: yup.string(),
      name: yup.string(),
      id: yup.string().nullable(),
    })
  );
  if (opts?.required) {
    schema = schema.min(1).required(`${label} is required`);
  }
  return {
    label,
    buttonText,
    type: "file",
    showCaptureButton: true,
    schema,
    ...opts,
  };
};

export const rBoolField = (label, { yes = "Yes", no = "No" }, opts) => ({
  label,
  schema: opts?.required
    ? yup.bool().required(`${label} is required`)
    : yup.bool().nullable(),
  type: "select",
  options: [
    { label: yes, value: true },
    { label: no, value: false },
  ],
  ...opts,
});

export const idField = () => ({
  type: "hidden",
  schema: yup.string().nullable(),
});

export const occupationField = (label, opts) => ({
  type: "select",
  schema: yup.string().nullable(),
  label,
  options: [
    { value: "Unemployed", label: "Unemployed" },
    { value: "Farmer", label: "Farmer" },
    { value: "Govt. Job", label: "Govt. Job" },
    { value: "Private Job", label: "Private Job" },
    { value: "Self employed", label: "Self employed" },
    { value: "Working Professionals", label: "Working Professionals" },
    { value: "Retired", label: "Retired" },
    { value: "Homemaker", label: "Homemaker" },
  ],
  ...opts,
});

export const annualIncomeField = (label, opts) => ({
  type: "select",
  schema: yup.string().nullable(),
  label,
  options: [
    { label: "Less than 1L", value: "Less than 1L" },
    { label: "1L - 2.5L", value: "1L - 2.5L" },
    { label: "2.5L - 5L", value: "2.5L - 5L" },
    { label: "5L and above", value: "5L and above" },
  ],
  ...opts,
});

export const addressField = (label, opts) => ({
  label,
  type: "address",
  schema: yup.object(),
  ...opts,
});
