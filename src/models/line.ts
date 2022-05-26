import { Offset } from "./offset";

export interface LineFinishedData {
  line: Line;
  socketId: string;
}

export interface Line {
  width: number;
  color: string;
  path: Offset[];
}
