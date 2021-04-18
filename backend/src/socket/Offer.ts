import { SocketTypes } from "./SocketType";
import socket from "socket.io";
import { Subject } from "./subject";

interface DataPayload {
  id: string;
}

class Offer {
  constructor(private _io: socket.Socket, private _socket: SocketTypes) {}
}

export default Offer;
