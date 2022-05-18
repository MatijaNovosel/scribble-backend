import express from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";

const createApp = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(express.json());

  app.get("/test", (_req, res) => {
    res.send({
      test: 1
    });
  });

  app.get("/", (_req, res) => {
    res.send("Hello!");
  });

  app.use(errorHandler);

  return app;
};

export default createApp;
