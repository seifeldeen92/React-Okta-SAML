import express from "express";
import http from "http";
import { EXPRESS_PORT } from "./config/constants";
import logging from "./config/logging";

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

  app.get("/ping", (_req, res) => {
    return res.status(200).send({ message: "pong" });
  });

  app.use((_req, res, _next) => {
    const error = new Error("Not found");

    res.status(404).json({
      message: error.message,
    });
  });

  httpServer.listen(EXPRESS_PORT, () =>
    logging.info(`Server is running on port ${EXPRESS_PORT}`)
  );
};

main();
