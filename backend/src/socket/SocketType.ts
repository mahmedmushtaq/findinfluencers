import { Socket } from "socket.io";
import { UserPayload } from "../utils";
export interface SocketTypes extends Socket {
  user?: UserPayload;
  emitSocketObject?: Function;
}
