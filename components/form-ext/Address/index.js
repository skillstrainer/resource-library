"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddressField = AddressField;
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.json.stringify.js");

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireWildcard(require("react"));

var _func = require("utils/func");

var _resources = require("utils/resources");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const mandatoryFields = ["country", "pincode"];
const optionalFields = ["id", "house_number", "location", "district", "city_town", "state"];

function AddressField(props) {
  const {
    label,
    value = {},
    onChange: _onChange,
    className,
    keys
  } = props;
  let [fields, setFields] = (0, _react.useState)(mandatoryFields);

  const onChange = val => _onChange(_lodash.default.pick(val, fields));

  const updateDetail = detail => val => onChange(_objectSpread(_objectSpread({}, value || {}), {}, {
    [detail]: val
  }));

  const country_iso_code = (_resources.countries.find(c => c.name === value.country) || {}).iso;
  (0, _react.useEffect)(() => {
    // Resolving keys
    let finalFields = _lodash.default.clone(mandatoryFields);

    if (keys !== null && keys !== void 0 && keys.action && keys !== null && keys !== void 0 && keys.keys && Array.isArray(keys === null || keys === void 0 ? void 0 : keys.keys)) {
      if (keys.action === "include") finalFields = finalFields.concat(optionalFields.filter(f => keys.keys.includes(f)));else if (keys.action === "exclude") finalFields = finalFields.concat(optionalFields.filter(f => !keys.keys.includes(f)));
    } else {
      finalFields = finalFields.concat(optionalFields);
    }

    fields = finalFields;
    setFields(finalFields);
  }, [JSON.stringify(keys)]); // Removing excess fields

  (0, _react.useEffect)(() => onChange(value), [fields]);
  /*
  *
  *
  Countries
  *
  *
  */

  const handleCountryChange = function handleCountryChange(countryName) {
    let countryList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _resources.countries;
    const country = countryList.find(c => c.name === countryName);
    onChange(_objectSpread(_objectSpread({}, value || {}), {}, {
      country: country.name
    }));
  };

  (0, _react.useEffect)(() => {
    // fetching country by name, if any
    const existingCountry = _resources.countries.find(c => c.name === (value === null || value === void 0 ? void 0 : value.country)); // Setting India as the default country


    const india = _resources.countries.find(c => c.name.toLowerCase() === "india");

    if (india && !existingCountry) handleCountryChange(india.name, _resources.countries);else if (existingCountry) handleCountryChange(existingCountry.name, _resources.countries);
  }, [value.country]);
  /*
  *
  *
  Pincode
  *
  *
  */

  const [pincodeRes, setPincodeRes] = (0, _react.useState)();
  const [isPincodeOpen, setIsPincodeOpen] = (0, _react.useState)();
  const lastTimeRef = (0, _react.useRef)();

  const handlePincodeChange = pincode => {
    const time = new Date().getTime();
    lastTimeRef.current = time;
    (0, _resources.getDataFromPincode)({
      country: country_iso_code,
      pincode
    }).then(res => {
      if (lastTimeRef.current === time) setPincodeRes(res);
    }).catch(() => setPincodeRes(null));
    updateDetail("pincode")(pincode);
  };

  const applyPincodeRes = () => onChange(_objectSpread(_objectSpread({}, value), pincodeRes));
  /*
   *
   *
   * Reusable comp
   *
   *
   */


  const genField = (fieldName, placeholder) => /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    className: "mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md",
    placeholder: placeholder,
    onChange: (0, _func.wireEventValue)(updateDetail(fieldName)),
    value: value && value[fieldName] || ""
  });

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("label", {
    className: "mx-4 block text-sm font-medium text-gray-700"
  }, label), /*#__PURE__*/_react.default.createElement("div", {
    className: "mx-4 ".concat(className)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "mt-1 relative rounded-md shadow-sm"
  }, /*#__PURE__*/_react.default.createElement("select", {
    className: "mt-1 block w-full py-2 px-7 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm",
    onChange: (0, _func.wireEventValue)(handleCountryChange),
    value: value.country
  }, _resources.countries && _resources.countries.map(country => /*#__PURE__*/_react.default.createElement("option", {
    value: country.name
  }, country.name)))), /*#__PURE__*/_react.default.createElement("div", {
    className: "mt-1 relative rounded-md shadow-sm"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    className: "mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 group-hover:pr-12 text-sm border-gray-300 rounded-md",
    placeholder: "Pincode",
    value: (value === null || value === void 0 ? void 0 : value.pincode) || "",
    onChange: (0, _func.wireEventValue)(handlePincodeChange),
    onFocus: () => setIsPincodeOpen(true),
    onBlur: () => setIsPincodeOpen(false),
    autoComplete: "off"
  }), isPincodeOpen && pincodeRes && /*#__PURE__*/_react.default.createElement("div", {
    className: "absolute top-full w-full left-0 bg-white shadow-md rounded-md hover:bg-gray-200 p-2 z-10 cursor-pointer",
    onPointerDown: applyPincodeRes
  }, pincodeRes.city_town, ", ", pincodeRes.district, ", ", pincodeRes.state), /*#__PURE__*/_react.default.createElement("div", {
    className: "hidden"
  }, isPincodeOpen && pincodeRes && setTimeout(() => applyPincodeRes(), 500))), fields.includes("house_number") && genField("house_number"), fields.includes("location") && genField("location"), fields.includes("city_town") && genField("city_town"), /*#__PURE__*/_react.default.createElement("div", {
    className: "mt-1 relative rounded-md shadow-sm"
  }, fields.includes("district") && genField("district")), /*#__PURE__*/_react.default.createElement("div", {
    className: "mt-1 relative rounded-md shadow-sm"
  }, fields.includes("state") && genField("state"))));
}

const AddressPlugin = {
  Component: AddressField
};
var _default = AddressPlugin;
exports.default = _default;