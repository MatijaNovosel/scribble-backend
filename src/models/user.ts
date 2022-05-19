import { Socket } from "socket.io";

export interface CustomizeUserData {
  username: string;
  socket: Socket;
}

export interface User {
  socket: Socket;
  userId: string;
  username: string | null;
}
