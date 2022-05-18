import createApp from "./express";
import { createServer } from "http";
import { Server } from "socket.io";
import "dotenv/config";

const port = process.env.PORT;

const startServer = () => {
  const app = createApp();
  const server = createServer(app);
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on("test", () => {
      io.emit("test-emit", {
        test: 1
      });
    });
    socket.on("line-finished", (data) => {
      console.log(data);
    });
    socket.on("disconnected", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  server.listen(port, () => {
    console.log(`Serving on address: http://127.0.0.1:${port}`);
  });
};

startServer();
