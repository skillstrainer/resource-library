const initialConfig = {
  routing: {
    navigateFunction: () => {},
    LinkComponent: () => null,
  },
};

let config = initialConfig;

export const getConfig = () => config;

export const setConfig = (newConfig = {}) => {
  config = {
    ...initialConfig,
    ...newConfig,
  };
};

export let webappHost = `https://webapp.skillstrainer.in`;
