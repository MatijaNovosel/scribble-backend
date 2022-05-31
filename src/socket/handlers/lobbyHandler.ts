import { LobbyCreateStart, LobbyDisband, LobbyLeave } from "../../models/lobby";
import { Socket } from "socket.io";
import EVENT_TYPES from "../eventTypes";
import GameManager from "@server/gameManager";
import { LobbyJoin } from "@server/models/lobby";

export const lobbyHandler = (socket: Socket, gameManager: GameManager) => {
  socket.on(EVENT_TYPES.LOBBY_JOINED, ({ lobbyId, password }: LobbyJoin) => {
    gameManager.joinLobby({
      entryTime: new Date(),
      lobbyId,
      socket,
      password
    });
  });
  socket.on(EVENT_TYPES.LOBBY_LEFT, ({ lobbyId }: LobbyLeave) => {
    gameManager.leaveLobby({
      leaveTime: new Date(),
      lobbyId,
      socket
    });
  });
  socket.on(
    EVENT_TYPES.CREATE_LOBBY,
    ({ creatorId, name, password, playerCapacity, roundTime }: LobbyCreateStart) => {
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
  socket.on(EVENT_TYPES.DISBAND_LOBBY, ({ lobbyId }: LobbyDisband) => {
    gameManager.disbandLobby({
      lobbyId,
      socket
    });
  });
};
