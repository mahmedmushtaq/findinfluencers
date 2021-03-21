import { SocketTypes } from "./SocketType";

class Room {
  constructor(private _socket: SocketTypes) {}
  createMyRoom() {
    this._socket.join(this._socket.user!.id);
  }
  leaveMyRoom() {
    this._socket.leave(this._socket.user!.id);
  }
}

export default Room;
