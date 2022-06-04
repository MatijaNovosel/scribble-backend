import { Socket } from "socket.io";
import {
  Lobby,
  LobbyCreate,
  LobbyDisband,
  LobbyJoinAttemptModel,
  LobbyLeave
} from "./models/lobby";
import { CustomizeUserData, User } from "./models/user";
import EVENT_TYPES from "./socket/eventTypes";
import { generateRandomString, log } from "./utils/helpers";

class GameManager {
  activeLobbies: Lobby[] = [];
  activeUsers: User[] = [];

  /**
   * Emits an event to all connected users (and optionally not to the sender).
   * @param {EVENT_TYPES} eventType - Event type.
   * @param {any} data - Data to emit.
   * @param {string} senderId - Id of the sender.
   */
  emitToAllUsers(eventType: EVENT_TYPES, data: any, senderId?: string) {
    this.activeUsers
      .filter((user) => {
        if (senderId) {
          return user.userId !== senderId;
        }
        return true;
      })
      .forEach((user) => user.socket.emit(eventType, data));
  }

  /**
   * Attempt to find a connected socket with a specific id.
   * @param {string} id - Id of the socket.
   * @returns {Socket | undefined} The specified socket.
   */
  findSocket(id: string): Socket | undefined {
    return this.activeUsers.map((user) => user.socket).find((socket) => socket.id === id);
  }

  /**
   * Connects the user to the Scribble game manager instance.
   * @param {User} user - Information about the connecting user.
   */
  connect(user: User) {
    this.activeUsers.push(user);
  }

  /**
   * Disconnects the user from the Scribble game manager instance.
   * @param {string} userId - User id.
   */
  disconnect(userId: string) {
    this.activeUsers = this.activeUsers.filter((user) => user.userId !== userId);
  }

  /**
   * Changes information about a specific user.
   * @param {CustomizeUserData} data - Customization information.
   * @param {string} data.username - Username to change.
   * @param {Socket} data.socket - Socket requesting the changes.
   */
  customizeUser({ username, socket }: CustomizeUserData) {
    const user = this.activeUsers.find((user) => user.userId === socket.id);
    if (user) {
      user.username = username;
      log(`Username for user with id ${socket.id} changed!`);
    } else {
      socket.emit(EVENT_TYPES.INVALID_USER_ID);
    }
  }

  /**
   * Attempts to connect a user to a specific lobby.
   * @param {LobbyJoinAttemptModel} data - Lobby join data.
   * @param {string} data.lobbyId - Lobby id.
   * @param {Socket} data.socket - Socket requesting to join.
   * @param {string} data.password - Lobby password.
   */
  joinLobbyAttempt({ lobbyId, socket, password }: LobbyJoinAttemptModel): void {
    const socketId = socket.id;
    const lobby = this.activeLobbies.find(
      (lobby) => lobby.id === lobbyId && lobby.password === password
    );

    if (lobby) {
      lobby.sockets.push(socket);
      socket.emit(EVENT_TYPES.LOBBY_JOIN_SUCCESS, {
        socketId: socket.id,
        lobbyId: lobbyId,
        allSocketIds: lobby.sockets.map((s) => s.id)
      });
      lobby.sockets
        .filter((socket) => socket.id !== socketId)
        .forEach((socket) => {
          socket.emit(EVENT_TYPES.LOBBY_JOINED, {});
        });
      log(`User with id ${socket.id} joined lobbby ${lobbyId}!`);
    } else {
      socket.emit(EVENT_TYPES.LOBBY_JOIN_FAILURE, lobbyId);
    }
  }

  /**
   * Attempts to create a lobby.
   * @param {LobbyCreate} data - Lobby create data.
   * @param {Socket} data.socket - Socket requesting to create a lobby.
   * @param {string} data.creatorId - Id of the user trying to create the lobby.
   * @param {Date} data.createdAt - Date of the lobby creation attempt.
   * @param {string} data.name - Lobby name.
   * @param {number} data.playerCapacity - Lobby player capacity.
   * @param {number} data.roundTime - Duration of a round (in seconds).
   * @param {string} data.password - Lobby password.
   */
  createLobby({
    socket,
    creatorId,
    createdAt,
    name,
    playerCapacity,
    roundTime,
    password
  }: LobbyCreate) {
    const id = generateRandomString(6);
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

  /**
   * Attempts to leave a lobby.
   * @param {LobbyLeave} data - Lobby leave data.
   * @param {string} data.lobbyId - Lobby id.
   * @param {Socket} data.socket - Socket requesting to leave.
   */
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

  /**
   * Attempts to disband a lobby.
   * @param {LobbyDisband} data - Lobby leave data.
   * @param {string} data.lobbyId - Lobby id.
   * @param {Socket} data.socket - Socket requesting to leave.
   */
  disbandLobby({ lobbyId, socket }: LobbyDisband) {
    const lobby = this.activeLobbies.find((lobby) => lobby.id === lobbyId);
    if (lobby) {
      lobby.sockets = lobby.sockets.filter((socket) => socket.id !== socket.id);
      lobby.sockets.forEach((socket) => {
        socket.emit(EVENT_TYPES.LOBBY_DISBANDED, {
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
