import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { wireEventValue } from "utils/func";
import { countries, getDataFromPincode } from "utils/resources";

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
  const { label, value = {}, onChange: _onChange, className, keys } = props;
  let [fields, setFields] = useState(mandatoryFields);
  const onChange = (val) => _onChange(_.pick(val, fields));

  const updateDetail = (detail) => (val) =>
    onChange({ ...(value || {}), [detail]: val });

  const country_iso_code = (
    countries.find((c) => c.name === value.country) || {}
  ).iso;

  useEffect(() => {
    // Resolving keys
    let finalFields = _.clone(mandatoryFields);

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
  const [pincodeRes, setPincodeRes] = useState();
  const [isPincodeOpen, setIsPincodeOpen] = useState();
  const lastTimeRef = useRef();
  const handlePincodeChange = (pincode) => {
    const time = new Date().getTime();
    lastTimeRef.current = time;
    getDataFromPincode({ country: country_iso_code, pincode })
      .then((res) => {
        if (lastTimeRef.current === time) setPincodeRes(res);
      })
      .catch(() => setPincodeRes(null));
    updateDetail("pincode")(pincode);
  };
  const applyPincodeRes = () => onChange({ ...value, ...pincodeRes });

  /*
   *
   *
   * Reusable comp
   *
   *
   */
  const genField = (fieldName, placeholder) => (
    <input
      type="text"
      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
      placeholder={placeholder}
      onChange={wireEventValue(updateDetail(fieldName))}
      value={(value && value[fieldName]) || ""}
    />
  );

  return (
    <>
      <label className="mx-4 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className={`mx-4 ${className}`}>
        <div className="mt-1 relative rounded-md shadow-sm">
          <select
            className="mt-1 block w-full py-2 px-7 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
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
            type="text"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 group-hover:pr-12 text-sm border-gray-300 rounded-md"
            placeholder="Pincode"
            value={value?.pincode || ""}
            onChange={wireEventValue(handlePincodeChange)}
            onFocus={() => setIsPincodeOpen(true)}
            onBlur={() => setIsPincodeOpen(false)}
            autoComplete="off"
          />
          {isPincodeOpen && pincodeRes && (
            <div
              className="absolute top-full w-full left-0 bg-white shadow-md rounded-md hover:bg-gray-200 p-2 z-10 cursor-pointer"
              onPointerDown={applyPincodeRes}
            >
              {pincodeRes.city_town}, {pincodeRes.district}, {pincodeRes.state}
            </div>
          )}
          <div className="hidden">
            {isPincodeOpen &&
              pincodeRes &&
              setTimeout(() => applyPincodeRes(), 500)}
          </div>
        </div>
        {fields.includes("house_number") && genField("house_number")}
        {fields.includes("location") && genField("location")}
        {fields.includes("city_town") && genField("city_town")}
        <div className="mt-1 relative rounded-md shadow-sm">
          {fields.includes("district") && genField("district")}
        </div>
        <div className="mt-1 relative rounded-md shadow-sm">
          {fields.includes("state") && genField("state")}
        </div>
      </div>
    </>
  );
}

const AddressPlugin = {
  Component: AddressField,
};

export default AddressPlugin;
