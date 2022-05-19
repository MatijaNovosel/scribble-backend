import { Socket } from "socket.io";
import eventTypes from "./eventTypes";

export const socketHandler = (socket: Socket, disconnectCallback: Function) => {
  socket.on(eventTypes.disconnected, () => {
    disconnectCallback();
  });
};
