import express from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";

const createApp = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));

  app.all("*", function (_req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

  app.use(cors());
  app.use(express.json());

  app.get("/", (_req, res) => {
    res.send("Hello!");
  });

  app.use(errorHandler);

  return app;
};

export default createApp;
