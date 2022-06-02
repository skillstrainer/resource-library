"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.consts = void 0;
const consts = {
  production: {
    webappUrl: "https://webapp.skillstrainer.in",
    adminPanelUrl: "https://admin.skillstrainer.in",
    marketingUrl: "https://skillstrainer.in",
    apiUrl: "https://webappapi.skillstrainer.in/api",
    adminApiUrl: "https://adminapi.skillstrainer.in/api"
  },
  staging: {
    webappUrl: "https://develop.dbloj6z6ud8hu.amplifyapp.com/",
    adminPanelUrl: "https://stageadmin.skillsscale.in",
    marketingUrl: "https://skillstrainer.in",
    apiUrl: "https://webapp.skillsscale.in/api",
    adminApiUrl: "https://admin.skillsscale.in/api"
  },
  dev: {
    webappUrl: "http://localhost:3000",
    adminPanelUrl: "https://localhost:3000",
    marketingUrl: "https://localhost:4000",
    apiUrl: "https://webapp.skillsscale.in/api",
    adminApiUrl: "https://admin.skillsscale.in/api"
  }
};
exports.consts = consts;