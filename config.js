"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.consts = void 0;
const consts = {
  production: {
    s3Url: "https://adminskillstrainerprod.s3.ap-south-1.amazonaws.com",
    webappUrl: "https://www.webapp.skillstrainer.in",
    adminPanelUrl: "https://admin.skillstrainer.in",
    marketingUrl: "https://skillstrainer.in",
    apiUrl: "https://webappapi.skillstrainer.in/api",
    adminApiUrl: "https://adminapi.skillstrainer.in/api"
  },
  staging: {
    s3Url: "https://adminskillstrainer.s3.ap-south-1.amazonaws.com",
    webappUrl: "https://webapp2.skillsscale.in",
    adminPanelUrl: "https://stageadmin.skillsscale.in",
    marketingUrl: "https://skillstrainer.in",
    apiUrl: "https://webapp.skillsscale.in/api",
    adminApiUrl: "https://admin.skillsscale.in/api"
  },
  dev: {
    s3Url: "https://adminskillstrainer.s3.ap-south-1.amazonaws.com",
    webappUrl: "http://localhost:3000",
    adminPanelUrl: "https://localhost:3000",
    marketingUrl: "https://localhost:4000",
    apiUrl: "https://webapp.skillsscale.in/api",
    adminApiUrl: "https://admin.skillsscale.in/api"
  }
};
exports.consts = consts;