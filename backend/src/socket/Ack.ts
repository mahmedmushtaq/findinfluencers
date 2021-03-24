import { SocketTypes } from "./SocketType";
import { Subjects } from "./Subjects";

class Ack {
  constructor(private _socket: SocketTypes) {}
  listen(subject: Subjects, cb: Function) {
    this._socket.on(Subjects.Ack, (data) => {
      if (data.subject === subject) {
        cb(data.payload);
      }
      //console.log("ack message ", data);
    });
  }
}

export default Ack;
