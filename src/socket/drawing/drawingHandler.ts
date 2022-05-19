import { Line } from "@server/models/line";
import { Socket } from "socket.io";
import eventTypes from "./eventTypes";

export const drawingHandler = (socket: Socket) => {
  socket.on(eventTypes.eventFinished, (data: Line[]) => {
    socket.emit(eventTypes.updateCanvas, data);
  });
};
