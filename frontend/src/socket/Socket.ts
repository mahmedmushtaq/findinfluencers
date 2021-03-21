import io from "socket.io-client";

class Socket {
  private _con?;
  connect = (user: { token: string }) => {
    // set new socket connection
    this._con = io(process.env.SERVER_URL, { query: { token: user.token } });
    return this._con;
  };

  get socket() {
    return this._con;
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
