import { Socket } from "socket.io";

export interface LobbyCreate {
  name: string;
  creatorId: string;
  createdAt: Date;
  socket: Socket;
  playerCapacity: number;
  roundTime: number; // Seconds
}

export interface LobbyJoin {
  lobbyId: string;
  entryTime: Date;
  socket: Socket;
}

export interface LobbyLeave {
  lobbyId: string;
  leaveTime: Date;
  socket: Socket;
}

export interface Lobby {
  id: string;
  name: string;
  createdAt: Date;
  creatorId: string;
  sockets: Socket[];
  playerCapacity: number;
  roundTime: number; // Seconds
}
