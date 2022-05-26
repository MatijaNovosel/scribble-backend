import { LineFinishedData } from "@server/models/line";
import { Socket } from "socket.io";
import EVENT_TYPES from "../eventTypes";

export const drawingHandler = (socket: Socket) => {
  socket.on(EVENT_TYPES.LINE_FINISHED, (data: LineFinishedData) => {
    if (data.socketId !== socket.id) {
      socket.emit(EVENT_TYPES.UPDATE_CANVAS, data);
    }
  });
};
