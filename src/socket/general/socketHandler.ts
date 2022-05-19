import { Socket } from "socket.io";
import GameManager from "@server/gameManager";
import eventTypes from "./eventTypes";
import { CustomizeUserData } from "@server/models/user";

export const socketHandler = (
  socket: Socket,
  disconnectCallback: Function,
  gameManager: GameManager
) => {
  socket.on(eventTypes.disconnected, () => {
    disconnectCallback();
  });
  socket.on(eventTypes.userCustomized, (data: CustomizeUserData) => {
    gameManager.customizeUser(data);
  });
};
