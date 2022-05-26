import { LineFinishedData } from "@server/models/line";
import { Socket } from "socket.io";
import EVENT_TYPES from "../eventTypes";

export const drawingHandler = (socket: Socket) => {
  socket.on(EVENT_TYPES.LINE_FINISHED, ({ line, socketId }: LineFinishedData) => {
    console.log(`[${new Date().toISOString()}] ${socketId} is sending data!`);
    socket.emit(EVENT_TYPES.UPDATE_CANVAS, { line, socketId });
  });
};
