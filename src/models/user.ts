import { Socket } from "socket.io";

export interface User {
  socket: Socket;
  userId: string;
  username: string | null;
}
