import { Socket } from "socket.io";
import GameManager from "@server/gameManager";
import EVENT_TYPES from "../eventTypes";
import { CustomizeUserData } from "@server/models/user";

export const socketHandler = (socket: Socket, gameManager: GameManager) => {
  socket.on(EVENT_TYPES.DISCONNECTED, () => {
    gameManager.disconnect(socket.id);
  });
  socket.on(EVENT_TYPES.USER_CUSTOMIZED, (data: CustomizeUserData) => {
    gameManager.customizeUser(data);
  });
};
