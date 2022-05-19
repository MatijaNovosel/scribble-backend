import createApp from "./express";
import { createServer } from "http";
import { Server } from "socket.io";
import { drawingHandler } from "./socket/drawing/drawingHandler";
import { socketHandler } from "./socket/general/socketHandler";
import { lobbyHandler } from "./socket/lobby/lobbyHandler";
import { UserSocketData } from "./models/userData";
import { randomUUID } from "crypto";
import "dotenv/config";

const port = process.env.PORT;
let activeConnections: UserSocketData[] = [];

const startServer = () => {
  const app = createApp();
  const server = createServer(app);
  const io = new Server(server);

  io.on("connection", (socket) => {
    activeConnections.push({
      socket,
      userId: randomUUID(),
      username: null
    });
    socketHandler(socket, () => {
      activeConnections = activeConnections.filter((connection) => connection.socket.id !== socket.id);
    });
    drawingHandler(socket);
    lobbyHandler(socket);
  });

  server.listen(port, () => {
    console.log(`Serving on address: http://127.0.0.1:${port}`);
  });
};

startServer();
