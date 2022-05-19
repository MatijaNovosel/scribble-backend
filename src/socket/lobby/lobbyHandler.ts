import { UserSocketData } from "../../models/userData";
import { Socket } from "socket.io";
import eventTypes from "./eventTypes";

export const lobbyHandler = (socket: Socket) => {
  socket.on(eventTypes.lobbyJoined, (userData: UserSocketData) => {
    console.log(userData);
  });
  socket.on(eventTypes.lobbyLeft, (userData: UserSocketData) => {
    console.log(userData);
  });
};
