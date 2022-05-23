import { LobbyCreate } from "./../../models/lobby";
import { UserSocketData } from "../../models/userData";
import { Socket } from "socket.io";
import eventTypes from "./eventTypes";
import GameManager from "@server/gameManager";
import { LobbyJoin } from "@server/models/lobby";

export const lobbyHandler = (socket: Socket, gameManager: GameManager) => {
  socket.on(eventTypes.lobbyJoined, ({ lobbyId, password, socket }: LobbyJoin) => {
    gameManager.joinLobby({
      entryTime: new Date(),
      lobbyId,
      socket,
      password
    });
  });
  socket.on(eventTypes.lobbyLeft, ({ lobbyId }: UserSocketData) => {
    gameManager.leaveLobby({
      leaveTime: new Date(),
      lobbyId,
      socket
    });
  });
  socket.on(
    eventTypes.lobbyCreated,
    ({ creatorId, name, password, playerCapacity, roundTime, socket }: LobbyCreate) => {
      gameManager.createLobby({
        createdAt: new Date(),
        creatorId,
        name,
        password,
        playerCapacity,
        roundTime,
        socket
      });
    }
  );
};
