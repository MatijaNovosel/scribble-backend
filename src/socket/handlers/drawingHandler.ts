import GameManager from "@server/gameManager";
import { LineFinishedData } from "@server/models/line";
import { Socket } from "socket.io";
import EVENT_TYPES from "../eventTypes";

export const drawingHandler = (socket: Socket, gameManager: GameManager) => {
  socket.on(EVENT_TYPES.LINE_FINISHED, ({ line, socketId }: LineFinishedData) => {
    console.log(`[${new Date().toISOString()}] ${socketId} is sending data!`);
    gameManager.activeUsers.forEach((user) => {
      if (user.userId !== socketId) {
        user.socket.emit(EVENT_TYPES.UPDATE_CANVAS, { line, socketId });
      }
    });
  });
};
