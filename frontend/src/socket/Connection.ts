import { useState } from "react";
import io, { Socket } from "socket.io-client";

class Connection {
  private _con: any;
  
  connect(){
    this._con = io(process.env.SERVER_URL);
  }

  get con() {
    return this._con;
  }
  disconnect() {
    if (this.con) {
      this.con.disconnect();
    }
  }
}

const con = new Connection();

export default con;

// const useToSocketConnection = () => {
//   const [socket, setSocket] = useState(null);
//   const connection = () => {
//     setSocket(io(process.env.SERVER_URL));
//   };
//   const disconnect = () => {
//     console.log("socket disconnected");
//     if (!!socket) socket.disconnect();
//   };
//   return { connection, disconnect, socket };
// };

// export default useToSocketConnection;
