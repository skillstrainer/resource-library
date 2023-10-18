"use strict";

require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.weak-map.js");
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
var _func = require("../../../utils/func");
var _resources = require("../../../utils/resources");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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
  const [addressDetails, setAddressDetails] = (0, _react.useState)(false);
  const onChange = val => _onChange(_lodash.default.pick(val, fields));
  const updateDetail = detail => val => {
    if (value) value[detail] = val;
    onChange(_objectSpread({}, value || {}));
  };
  const country_iso_code = (_resources.countries.find(c => c.name === value.country) || {}).iso;
  (0, _react.useEffect)(() => {
    // Resolving keys
    let finalFields = _lodash.default.clone(mandatoryFields);
    if (keys !== null && keys !== void 0 && keys.addressDetails) {
      setAddressDetails(true);
    }
    if (keys !== null && keys !== void 0 && keys.action && keys !== null && keys !== void 0 && keys.keys && Array.isArray(keys === null || keys === void 0 ? void 0 : keys.keys)) {
      if (keys.action === "include") finalFields = finalFields.concat(optionalFields.filter(f => keys.keys.includes(f)));else if (keys.action === "exclude") finalFields = finalFields.concat(optionalFields.filter(f => !keys.keys.includes(f)));
    } else {
      finalFields = finalFields.concat(optionalFields);
    }
    fields = finalFields;
    setFields(finalFields);
  }, [JSON.stringify(keys)]);

  // Removing excess fields
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
    const existingCountry = _resources.countries.find(c => c.name === (value === null || value === void 0 ? void 0 : value.country));
    // Setting India as the default country
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
  const lastTimeRef = (0, _react.useRef)();
  const handlePincodeChange = pincode => {
    const time = new Date().getTime();
    lastTimeRef.current = time;
    updateDetail("pincode")(pincode);
    (0, _resources.getDataFromPincode)({
      country: country_iso_code,
      pincode
    }).then(res => {
      if (lastTimeRef.current === time) onChange(_objectSpread(_objectSpread({}, value), res));
    });
  };

  /*
   *
   *
   * Reusable comp
   *
   *
   */
  const genField = (fieldName, placeholder) => /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    className: "input-primary",
    placeholder: placeholder,
    onChange: (0, _func.wireEventValue)(updateDetail(fieldName)),
    value: value && value[fieldName] || ""
  });
  return /*#__PURE__*/_react.default.createElement("div", {
    className: className
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "mt-1 relative rounded-md shadow-sm"
  }, /*#__PURE__*/_react.default.createElement("select", {
    className: "input-primary",
    onChange: (0, _func.wireEventValue)(handleCountryChange),
    value: value.country
  }, _resources.countries && _resources.countries.map(country => /*#__PURE__*/_react.default.createElement("option", {
    value: country.name
  }, country.name)))), /*#__PURE__*/_react.default.createElement("div", {
    className: "mt-1 relative rounded-md shadow-sm"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    className: "input-primary",
    placeholder: "Pincode",
    value: (value === null || value === void 0 ? void 0 : value.pincode) || "",
    onChange: (0, _func.wireEventValue)(handlePincodeChange),
    autoComplete: "off"
  })), addressDetails && /*#__PURE__*/_react.default.createElement("span", {
    className: "block text-sm font-medium text-japanese_indigo my-2 "
  }, "Address Details"), fields.includes("house_number") && genField("house_number", "House number"), fields.includes("location") && genField("location", "Location"), fields.includes("city_town") && genField("city_town", "City/Town"), /*#__PURE__*/_react.default.createElement("div", {
    className: "mt-1 relative rounded-md shadow-sm"
  }, fields.includes("district") && genField("district", "District")), /*#__PURE__*/_react.default.createElement("div", {
    className: "mt-1 relative rounded-md shadow-sm"
  }, fields.includes("state") && genField("state", "State")));
}
const AddressPlugin = {
  Component: AddressField
};
var _default = AddressPlugin;
exports.default = _default;