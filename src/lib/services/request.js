import axios from "axios";
import React, { useEffect, useState } from "react";
import { consts } from "../config";

export default function useRequestService(config, setConfig) {
  const [env, setEnvironment] = useState("");
  const [jwtToken, setJwtToken] = useState();
  const [accessToken, setAccessToken] = useState();

  const defaultHeaders = {
    "access-token": accessToken,
    "jwt-token": jwtToken,
    Authorization: `Bearer ${jwtToken || ""}`,
  };

  const [vars, setVars] = useState({});
  const { apiUrl, adminApiUrl } = consts;

  useEffect(() => setVars(consts[env]), [env]);

  const services = {
    // Config updater
    setEnvironment,
    setJwtToken,
    setAccessToken,

    // consts
    env,
    jwtToken,
    accessToken,
    ...vars,

    // Network Requests
    ...[
      {
        key: "api",
        baseURL: apiUrl,
      },
      {
        key: "adminApi",
        baseURL: adminApiUrl,
      },
    ].reduce((acc, { key, baseURL }) => {
      const networkRequests = {
        makeGetRequest: (endPoint, headers) => {
          return axios
            .get(baseURL + endPoint, {
              headers: { ...defaultHeaders, ...headers },
            })
            .then(({ data }) => data);
        },
        makePostRequest: (endPoint, data, headers) => {
          return axios
            .post(baseURL + endPoint, data, {
              headers: { ...defaultHeaders, ...headers },
            })
            .then(({ data }) => data);
        },
        makePutRequest: (endPoint, data, headers) => {
          return axios
            .put(baseURL + endPoint, data, {
              headers: { ...defaultHeaders, ...headers },
            })
            .then(({ data }) => data);
        },
        makeDeleteRequest: (endPoint, data, headers) => {
          return axios
            .delete(baseURL + endPoint, data, {
              headers: { ...defaultHeaders, ...headers },
            })
            .then(({ data }) => data);
        },
        makeGraphRequest: (endPoint, data, headers) => {
          return axios
            .delete(baseURL + endPoint, data, {
              headers: {
                ...defaultHeaders,
                ...headers,
              },
            })
            .then(({ data }) => data);
        },
      };
      return { ...acc, [key]: networkRequests };
    }, {}),
  };

  return [services];
}