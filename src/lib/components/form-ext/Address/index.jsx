import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { wireEventValue } from "../../../utils/func";
import { countries, getDataFromPincode } from "../../../utils/resources";

const mandatoryFields = ["country", "pincode"];
const optionalFields = [
  "id",
  "house_number",
  "location",
  "district",
  "city_town",
  "state",
];

export function AddressField(props) {
  const {
    label,
    value = {},
    onChange: _onChange,
    className,
    keys,
    disabled,
  } = props;
  let [fields, setFields] = useState(mandatoryFields);
  const [addressDetails, setAddressDetails] = useState(false);
  const onChange = (val) => _onChange(_.pick(val, fields));

  const updateDetail = (detail) => (val) => {
    if (value) value[detail] = val;
    onChange({ ...(value || {}) });
  };

  const country_iso_code = (
    countries.find((c) => c.name === value.country) || {}
  ).iso;

  useEffect(() => {
    // Resolving keys
    let finalFields = _.clone(mandatoryFields);

    if (keys?.addressDetails) {
      setAddressDetails(true);
    }
    if (keys?.action && keys?.keys && Array.isArray(keys?.keys)) {
      if (keys.action === "include")
        finalFields = finalFields.concat(
          optionalFields.filter((f) => keys.keys.includes(f))
        );
      else if (keys.action === "exclude")
        finalFields = finalFields.concat(
          optionalFields.filter((f) => !keys.keys.includes(f))
        );
    } else {
      finalFields = finalFields.concat(optionalFields);
    }

    fields = finalFields;
    setFields(finalFields);
  }, [JSON.stringify(keys)]);

  // Removing excess fields
  useEffect(() => onChange(value), [fields]);

  /*
  *
  *
  Countries
  *
  *
  */
  const handleCountryChange = (countryName, countryList = countries) => {
    const country = countryList.find((c) => c.name === countryName);
    onChange({
      ...(value || {}),
      country: country.name,
    });
  };

  useEffect(() => {
    // fetching country by name, if any
    const existingCountry = countries.find((c) => c.name === value?.country);
    // Setting India as the default country
    const india = countries.find((c) => c.name.toLowerCase() === "india");
    if (india && !existingCountry) handleCountryChange(india.name, countries);
    else if (existingCountry)
      handleCountryChange(existingCountry.name, countries);
  }, [value.country]);

  /*
  *
  *
  Pincode
  *
  *
  */
  const lastTimeRef = useRef();
  const handlePincodeChange = (pincode) => {
    const time = new Date().getTime();
    lastTimeRef.current = time;
    updateDetail("pincode")(pincode);
    getDataFromPincode({ country: country_iso_code, pincode }).then((res) => {
      if (lastTimeRef.current === time) onChange({ ...value, ...res });
    });
  };

  /*
   *
   *
   * Reusable comp
   *
   *
   */
  const genField = (fieldName, placeholder) => (
    <input
      disabled={disabled}
      type="text"
      className="input-primary"
      placeholder={placeholder}
      onChange={wireEventValue(updateDetail(fieldName))}
      value={(value && value[fieldName]) || ""}
    />
  );

  return (
    <div className={className}>
      <div className="mt-1 relative rounded-md shadow-sm">
        <select
          disabled={disabled}
          className="input-primary"
          onChange={wireEventValue(handleCountryChange)}
          value={value.country}
        >
          {countries &&
            countries.map((country) => (
              <option value={country.name}>{country.name}</option>
            ))}
        </select>
      </div>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          disabled={disabled}
          type="text"
          className="input-primary"
          placeholder="Pincode"
          value={value?.pincode || ""}
          onChange={wireEventValue(handlePincodeChange)}
          autoComplete="off"
        />
      </div>
      {addressDetails && (
        <span className="block text-sm font-medium text-japanese_indigo my-2 ">
          Address Details
        </span>
      )}
      {fields.includes("house_number") &&
        genField("house_number", "House number")}
      {fields.includes("location") && genField("location", "Location")}
      {fields.includes("city_town") && genField("city_town", "City/Town")}
      <div className="mt-1 relative rounded-md shadow-sm">
        {fields.includes("district") && genField("district", "District")}
      </div>
      <div className="mt-1 relative rounded-md shadow-sm">
        {fields.includes("state") && genField("state", "State")}
      </div>
    </div>
  );
}

const AddressPlugin = {
  Component: AddressField,
};

export default AddressPlugin;
