import { randomUUID } from "crypto";
import { Lobby, LobbyCreate, LobbyJoin, LobbyLeave } from "./models/lobby";
import { CustomizeUserData, User } from "./models/user";
import EVENT_TYPES from "./socket/eventTypes";
import { log } from "./utils/helpers";

class GameManager {
  activeLobbies: Lobby[] = [];
  activeUsers: User[] = [];

  connect(user: User) {
    this.activeUsers.push(user);
  }

  disconnect(userId: string) {
    this.activeUsers = this.activeUsers.filter((user) => user.userId !== userId);
  }

  customizeUser({ username, socket }: CustomizeUserData) {
    const user = this.activeUsers.find((user) => user.userId === socket.id);
    if (user) {
      user.username = username;
      log(`Username for user with id ${socket.id} changed!`);
    } else {
      socket.emit(EVENT_TYPES.INVALID_USER_ID);
    }
  }

  joinLobby({ lobbyId, socket, password }: LobbyJoin): void {
    const socketId = socket.id;
    const lobby = this.activeLobbies.find(
      (lobby) => lobby.id === lobbyId && lobby.password === password
    );
    if (lobby) {
      lobby.sockets.push(socket);
      lobby.sockets
        .filter((socket) => socket.id !== socketId)
        .forEach((socket) => {
          socket.emit(EVENT_TYPES.LOBBY_JOINED, {
            socketId: socket.id,
            lobbyId: lobbyId,
            allSocketIds: lobby.sockets.map((s) => s.id)
          });
        });
      log(`User with id ${socket.id} joined lobbby ${lobbyId}!`);
    } else {
      socket.emit(EVENT_TYPES.LOBBY_JOIN_FAILURE, {
        lobbyId
      });
    }
  }

  createLobby({
    socket,
    creatorId,
    createdAt,
    name,
    playerCapacity,
    roundTime,
    password
  }: LobbyCreate): void {
    const id = randomUUID();
    this.activeLobbies.push({
      name,
      creatorId,
      createdAt,
      playerCapacity,
      roundTime,
      sockets: [socket],
      id,
      password
    });
    log(`Lobby with id ${id} created!`);
    socket.emit(EVENT_TYPES.LOBBY_CREATED_SUCCESS, {
      socketId: socket.id,
      lobbyId: id
    });
  }

  leaveLobby({ lobbyId, socket }: LobbyLeave) {
    const lobby = this.activeLobbies.find((lobby) => lobby.id === lobbyId);
    if (lobby) {
      lobby.sockets = lobby.sockets.filter((socket) => socket.id !== socket.id);
      lobby.sockets.forEach((socket) => {
        socket.emit(EVENT_TYPES.PLAYER_LEFT, {
          socketId: socket.id
        });
      });
    } else {
      socket.emit(EVENT_TYPES.INVALID_LOBBY_ID, {
        lobbyId
      });
    }
  }
}

export default GameManager;
