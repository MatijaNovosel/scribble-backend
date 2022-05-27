import GameManager from "@server/gameManager";
import { LineFinishedData } from "@server/models/line";
import { log } from "@server/utils/helpers";
import { Socket } from "socket.io";
import EVENT_TYPES from "../eventTypes";

export const drawingHandler = (socket: Socket, gameManager: GameManager) => {
  socket.on(EVENT_TYPES.LINE_FINISHED, ({ line, socketId }: LineFinishedData) => {
    log(`${socketId} is sending data!`);
    gameManager.activeUsers.forEach((user) => {
      if (user.userId !== socketId) {
        user.socket.emit(EVENT_TYPES.UPDATE_CANVAS, { line, socketId });
      }
    });
  });
};
