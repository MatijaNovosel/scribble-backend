import moduleAlias from "module-alias";
import constants from "./constants";

const sourcePath = constants.sourcePath;

moduleAlias.addAliases({
  "@middleware": `${sourcePath}/middleware`,
  "@config": `${sourcePath}/config`
});

import createServer from "@config/express";
import http from "http";
import "dotenv/config";

const host = process.env.HOST;
const port = process.env.PORT;

const startServer = async () => {
  const app = createServer();
  const server = http.createServer(app).listen({ host, port }, () => {
    console.log(`Serving at: http://${host}:${port}`);
  });
  const signalTraps: NodeJS.Signals[] = ["SIGTERM", "SIGINT", "SIGUSR2"];
  signalTraps.forEach((type) => {
    process.once(type, async () => {
      console.log(`process.once ${type}`);
      server.close(() => {
        console.log("HTTP server closed!");
      });
    });
  });
};

startServer();
