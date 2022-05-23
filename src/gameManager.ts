import { randomUUID } from "crypto";
import { Lobby, LobbyCreate, LobbyJoin, LobbyLeave } from "./models/lobby";
import { CustomizeUserData, User } from "./models/user";

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
      console.log(`Username for user with id ${socket.id} changed!`);
    } else {
      socket.emit("invalid-user-id");
    }
  }

  joinLobby({ lobbyId, socket, password }: LobbyJoin): void {
    const lobby = this.activeLobbies.find(
      (lobby) => lobby.id === lobbyId && lobby.password === password
    );
    if (lobby) {
      lobby.sockets.push(socket);
      socket.emit("lobby-joined", {
        socketId: socket.id
      });
      console.log(`User with id ${socket.id} joined lobbby ${lobbyId}!`);
    } else {
      socket.emit("lobby-join-failure", {
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
    console.log(`Lobby with id ${id} created!`);
    socket.emit("lobby-created-success", {
      socketId: socket.id
    });
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
