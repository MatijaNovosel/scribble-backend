import { LineFinishedData } from "@server/models/line";
import { Socket } from "socket.io";
import eventTypes from "./eventTypes";

export const drawingHandler = (socket: Socket) => {
  socket.on(eventTypes.lineFinished, (data: LineFinishedData) => {
    if (data.socketId !== socket.id) {
      socket.emit(eventTypes.updateCanvas, data);
    }
  });
};
