import { UserSocketData } from "../../models/userData";
import { Socket } from "socket.io";
import eventTypes from "./eventTypes";
import GameManager from "@server/gameManager";

export const lobbyHandler = (socket: Socket, gameManager: GameManager) => {
  socket.on(eventTypes.lobbyJoined, ({ lobbyId }: UserSocketData) => {
    gameManager.joinLobby({
      entryTime: new Date(),
      lobbyId,
      socket
    });
  });
  socket.on(eventTypes.lobbyLeft, ({ lobbyId }: UserSocketData) => {
    gameManager.leaveLobby({
      leaveTime: new Date(),
      lobbyId,
      socket
    });
  });
};
