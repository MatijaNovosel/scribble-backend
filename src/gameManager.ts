import { randomUUID } from "crypto";
import { Lobby, LobbyCreate, LobbyJoin, LobbyLeave } from "./models/lobby";
import { CustomizeUserData, User } from "./models/user";

class GameManager {
  activeLobbies: Lobby[];
  activeUsers: User[];

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
      console.log(`Username for user with id ${socket.id} changed!`);
    } else {
      socket.emit("invalid-user-id");
    }
  }

  joinLobby({ lobbyId, socket }: LobbyJoin): void {
    const lobby = this.activeLobbies.find((lobby) => lobby.id === lobbyId);
    if (lobby) {
      lobby.sockets.push(socket);
      console.log(`User with id ${socket.id} joined lobbby ${lobbyId}!`);
    } else {
      socket.emit("invalid-lobby-id", {
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
    roundTime
  }: LobbyCreate): void {
    const id = randomUUID();
    this.activeLobbies.push({
      name,
      creatorId,
      createdAt,
      playerCapacity,
      roundTime,
      sockets: [socket],
      id
    });
    console.log(`Lobby with id ${id} created!`);
  }

  leaveLobby({ lobbyId, socket }: LobbyLeave) {
    const lobby = this.activeLobbies.find((lobby) => lobby.id === lobbyId);
    if (lobby) {
      lobby.sockets = lobby.sockets.filter((socket) => socket.id !== socket.id);
      lobby.sockets.forEach((socket) => {
        socket.emit("player-left", {
          socketId: socket.id
        });
      });
    } else {
      socket.emit("invalid-lobby-id", {
        lobbyId
      });
    }
  }
}

export default GameManager;
