import { Socket } from "socket.io-client";
import { Subjects } from "../Subjects";
import { CheckListenerProps } from "./Features/socketPayloadProps";

// this class use case can explain with the help of the example

// e.g if we want to check other user either online or offline then we emit event
// and in response server sent back message again to those user who emit this event with the help of id
// so this class will tackle this, subject will determine what we want to check e.g isUserliveStatus

class CheckListener {
  constructor(
    private _socket: typeof Socket,
    private loginUser: { id: string }
  ) {}

  listen(subject: Subjects, cb: Function) {
    this._socket.on(this.loginUser.id, (payload: CheckListenerProps) => {
      // this function will only listen
      if (payload.subject === subject) {
        cb(payload);
      }
    });
  }
}

export default CheckListener;
