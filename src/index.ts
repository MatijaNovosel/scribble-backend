import createApp from "./express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { drawingHandler } from "./socket/drawing/drawingHandler";
import { socketHandler } from "./socket/general/socketHandler";
import "dotenv/config";

const port = process.env.PORT;
let activeUserSockets: Socket[] = [];

const startServer = () => {
  const app = createApp();
  const server = createServer(app);
  const io = new Server(server);

  io.on("connection", (socket) => {
    activeUserSockets.push(socket);
    socketHandler(socket, () => {
      activeUserSockets = activeUserSockets.filter((socket) => socket.id !== socket.id);
    });
    drawingHandler(socket);
  });

  server.listen(port, () => {
    console.log(`Serving on address: http://127.0.0.1:${port}`);
  });
};

startServer();
