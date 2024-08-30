"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddressField = AddressField;
exports.default = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _lodash = _interopRequireDefault(require("lodash"));
var _react = _interopRequireWildcard(require("react"));
var _func = require("../../../utils/func");
var _resources = require("../../../utils/resources");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
var _default = exports.default = AddressPlugin;