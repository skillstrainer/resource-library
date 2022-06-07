import React from "react";

export default function useMultiLangService(config) {
  const { jwtToken, accessToken, adminApi, adminApiUrl } = config.request;

  const services = {
    publishMarketingWebsite: () => {
      if (!jwtToken || !accessToken)
        alert(
          "Couldn't perform request. One of the tokens (JWT or Access Token) is missing"
        );
      else {
        // return console.log(adminApiUrl);
        return adminApi
          .makeGetRequest(`/publish_changes`)
          .then(
            ({ data }) =>
              data &&
              alert(
                "Change publishing triggered. It may take a few minutes for the changes to reflect."
              )
          )
          .catch(
            (err) =>
              console.log(err) ||
              alert("An error occured while publishing changes")
          );
      }
    },
  };

  return [services, [], {}];
}
