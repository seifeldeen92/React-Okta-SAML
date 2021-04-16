import fs from "fs";
import passport from "passport";
import { Strategy } from "passport-saml";
import config from "./config";
import logging from "./logging";

const users: Express.User[] = [];

passport.serializeUser<Express.User>((user, done) => {
  logging.info(user, "serializeUser");
  done(null, user);
});

passport.deserializeUser<Express.User>((user, done) => {
  logging.info(user, "DeserializeUser");
  done(null, user);
});

passport.use(
  new Strategy(
    {
      issuer: config.saml.issuer,
      protocol: "http://",
      path: "/login/callback",
      entryPoint: config.saml.entryPoint,
      cert: fs.readFileSync(config.saml.cert, "utf-8"),
    },
    (user: any, done: any) => {
      if (!users.includes(user)) {
        users.push(user);
      }

      return done(null, user);
    }
  )
);
