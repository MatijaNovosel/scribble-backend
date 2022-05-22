import "dotenv/config";
import createApp from "./express";
import GameManager from "./gameManager";
import { createServer } from "http";
import { Server } from "socket.io";
import { drawingHandler } from "./socket/drawing/drawingHandler";
import { socketHandler } from "./socket/general/socketHandler";
import { lobbyHandler } from "./socket/lobby/lobbyHandler";

const port = process.env.PORT;

const startServer = () => {
  const gameManager = new GameManager();

  const app = createApp();
  const server = createServer(app);
  const io = new Server(server);

  io.on("connection", (socket) => {
    gameManager.connect({
      socket,
      userId: socket.id,
      username: null
    });
    socketHandler(socket, gameManager);
    lobbyHandler(socket, gameManager);
    drawingHandler(socket);
  });

  server.listen(port, () => {
    console.log(`Serving on address: http://127.0.0.1:${port}`);
  });
};

startServer();
