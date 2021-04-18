import { SocketTypes } from "./SocketType";
import { usersMap, userSocketsMap } from "./userMap";

class Room {
  constructor(private _socket: SocketTypes) {}
  createMyRoom() {
    if (usersMap.has(this._socket.user!.id)) {
      const existingUser = usersMap.get(this._socket.user!.id);
      existingUser.sockets = [...existingUser.sockets, ...[this._socket.id]];
      usersMap.set(this._socket.user!.id, existingUser);
    } else {
      usersMap.set(this._socket.user!.id, {
        id: this._socket.user!.id,
        sockets: [this._socket.id],
      });
    }
  }
  leaveMyRoom() {
    usersMap.delete(this._socket.user!.id);
  }

  
}

export default Room;
