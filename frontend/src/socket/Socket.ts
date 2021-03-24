import io from "socket.io-client";
import { Subjects } from "./Subjects";

class Socket {
  private _con?;
  connect = (user: { token: string }) => {
    if (this._con) return this._con;
    // set new socket connection
    this._con = io(process.env.SERVER_URL, { query: { token: user.token } });
    return this._con;
  };

  get socket() {
    return this._con;
  }

  ack(data) {
    this.socket?.emit(Subjects.Ack, data);
  }

  disconnect = () => {
    if (this.socket) {
      //disconnect socket on page refresh or when user leave panel
      this.socket.disconnect();
    }
  };
}

const socket = new Socket();

export default socket;
