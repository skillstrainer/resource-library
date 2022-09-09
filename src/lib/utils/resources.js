import { resolvers } from "./resources/pincode-resolvers";
import countriesJson from "./resources/countries.json";

// Address
export const countries = countriesJson.map((c) => ({
  id: c["alpha-3"],
  name: c.name,
  iso: c["alpha-3"],
}));

export const getDataFromPincode = async ({ country, pincode }) => {
  return resolvers[country] && (await resolvers[country](pincode));
};
