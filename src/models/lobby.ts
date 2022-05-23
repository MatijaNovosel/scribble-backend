import { Socket } from "socket.io";

export interface LobbyCreate {
  name: string;
  creatorId: string;
  password: string;
  createdAt: Date;
  socket: Socket;
  playerCapacity: number;
  roundTime: number; // Seconds
}

export interface LobbyCreateStart {
  name: string;
  creatorId: string;
  password: string;
  createdAt: Date;
  playerCapacity: number;
  roundTime: number; // Seconds
}

export interface LobbyJoin {
  lobbyId: string;
  entryTime: Date;
  socket: Socket;
  password: string;
}

export interface LobbyLeave {
  lobbyId: string;
  leaveTime: Date;
  socket: Socket;
}

export interface Lobby {
  id: string;
  name: string;
  password: string;
  createdAt: Date;
  creatorId: string;
  sockets: Socket[];
  playerCapacity: number;
  roundTime: number; // Seconds
}
