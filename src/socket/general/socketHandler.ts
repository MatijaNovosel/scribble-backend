import { Socket } from "socket.io";
import GameManager from "@server/gameManager";
import eventTypes from "./eventTypes";
import { CustomizeUserData } from "@server/models/user";

export const socketHandler = (socket: Socket, gameManager: GameManager) => {
  socket.on(eventTypes.disconnected, (socket) => {
    gameManager.disconnect(socket.id);
  });
  socket.on(eventTypes.userCustomized, (data: CustomizeUserData) => {
    gameManager.customizeUser(data);
  });
};
