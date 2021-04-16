import express from "express";
import http from "http";
import { EXPRESS_PORT } from "./config/constants";
import logging from "./config/logging";
import config from "./config/config";
import "./config/passport";
import session from "express-session";
import passport from "passport";

const main = () => {
  const app = express();

  const httpServer = http.createServer(app);

  app.use((req, res, next) => {
    logging.info(
      `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      logging.info(
        `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
      );
    });

    next();
  });

  /** API Rules (Options, CORS etc...) */
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.header("origin"));
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Credentials", "true");

    if (req.method == "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }

    next();
  });

  /** Parse request body */
  app.use(session(config.session));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  /** Endpoint to authenticate by Okta using Passport */
  app.get(
    "/login",
    passport.authenticate("saml", config.saml.options),
    (_req, res, _next) => {
      return res.redirect("http://localhost:3000");
    }
  );

  /** Endpoint called by Okta using Passport */
  app.post(
    "/login/callback",
    passport.authenticate("saml", config.saml.options),
    (_req, res, _next) => {
      return res.redirect("http://localhost:3000");
    }
  );

  /** Check for user authentication
   * If user authenticated return user
   */
  app.get("/me", (req, res, _next) => {
    if (!req.isAuthenticated()) {
      logging.info("User is not authenticated");

      return res.status(401).json({
        message: "Unauthorized",
      });
    } else {
      logging.info("User is authenticated");
      const { user } = req;
      logging.info(user);

      return res.status(200).json({ user });
    }
  });

  app.use((_req, res, _next) => {
    const error = new Error("404 Not found");

    res.status(404).json({
      message: error.message,
    });
  });

  httpServer.listen(EXPRESS_PORT, () =>
    logging.info(`Server is running on port ${EXPRESS_PORT}`)
  );
};

main();
