import { Offset } from "./offset";

export interface LineFinishedData {
  lines: Line[];
  socketId: string;
}

export interface Line {
  width: number;
  color: string;
  path: Offset[];
}
