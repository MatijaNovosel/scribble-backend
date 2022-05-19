import { Socket } from "socket.io";

export interface UserSocketData {
  socket: Socket;
  userId: string;
  username: string | null;
}
