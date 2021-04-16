import { EXPRESS_PORT } from "./constants";
const config = {
  saml: {
    cert: "./src/config/saml.pem",
    entryPoint:
      "https://dev-27121687.okta.com/app/dev-27121687_reactsaml_1/exkla36xuusmmbk6e5d6/sso/saml",
    issuer: "http://localhost:5000",
    options: {
      faliureFlash: true,
      failureRedirect: "/login",
    },
  },
  server: {
    port: EXPRESS_PORT,
  },
  session: {
    saveUninitialized: true,
    resave: false,
    secret: "secret",
  },
};

export default config;
