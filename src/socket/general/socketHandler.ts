import { Socket } from "socket.io";
import eventTypes from "./eventTypes";

export const socketHandler = (socket: Socket, callback: Function) => {
  socket.on(eventTypes.disconnected, () => {
    callback();
  });
};
