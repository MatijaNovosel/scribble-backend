import { randomUUID } from "crypto";
import { Lobby, LobbyCreate, LobbyJoin, LobbyLeave } from "./models/lobby";
import { User } from "./models/user";

class GameManager {
  activeLobbies: Lobby[];
  activeUsers: User[];

  connect(user: User) {
    this.activeUsers.push(user);
  }

  disconnect(userId: string) {
    this.activeUsers = this.activeUsers.filter((user) => user.userId !== userId);
  }

  joinLobby({ lobbyId, socket }: LobbyJoin): void {
    const lobby = this.activeLobbies.find((lobby) => lobby.id === lobbyId);
    if (lobby) {
      lobby.sockets.push(socket);
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
    this.activeLobbies.push({
      name,
      creatorId,
      createdAt,
      playerCapacity,
      roundTime,
      sockets: [socket],
      id: randomUUID()
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
