import "dotenv/config";
import createApp from "./express";
import { createServer } from "http";
import { Server } from "socket.io";
import { drawingHandler } from "./socket/drawing/drawingHandler";
import { socketHandler } from "./socket/general/socketHandler";
import { lobbyHandler } from "./socket/lobby/lobbyHandler";
import GameManager from "./gameManager";

const port = process.env.PORT;

const startServer = () => {
  const app = createApp();
  const server = createServer(app);
  const io = new Server(server);

  const gameManager = new GameManager();

  io.on("connection", (socket) => {
    socketHandler(socket, () => {
      // Remove player from lobbies when socket disconnects
    });
    drawingHandler(socket);
    lobbyHandler(socket, gameManager);
  });

  server.listen(port, () => {
    console.log(`Serving on address: http://127.0.0.1:${port}`);
  });
};

startServer();
