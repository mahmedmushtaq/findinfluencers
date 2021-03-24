import socket from "socket.io";
import { UserPayload, JWT } from "../utils";
import { Messages } from "./messages";
import { User } from "./messages/User";
import Room from "./Room";
import { SocketTypes } from "./SocketType";
import Status from "./Status";

class SocketConnection {
  private _io;
  private numConnections: number = 0;
  constructor(private expressServer: any, private _allowDomain: string) {
    //@ts-ignore
    this._io = socket(expressServer, {
      cors: {
        origin: _allowDomain,
        methods: ["GET", "POST"],
      },
    });
  }

  startServer() {
    this._io
      .use(this.validateToken())
      .on("connection", (socket: SocketTypes) => {
        this.numConnections++;
        console.log(
          ` =========== socket connected ========== ${socket.user?.id}`
        );
        console.log(
          ` =========== number of connections ========== ${this.numConnections}`
        );

        if (socket.user && socket.user.id) {
          // require authentication
          new Status(socket).live(); // set status
          new Room(socket).createMyRoom(); // create my room
          new Messages(socket);
          new User(socket);
        }

        socket.on("error", (err) => {
          console.log(err);
        });

        socket.on("disconnect", () => {
          this.numConnections--;
          console.log("user disconnected");
          if (socket.user && socket.user.id) {
            // require authentication
            new Status(socket).offline(); // set status
            new Room(socket).leaveMyRoom(); // leave room
          }
        });
      });
  }

  validateToken() {
    return function (socket: SocketTypes, next: Function) {
      if (socket.handshake.query && socket.handshake.query.token) {
        try {
          // @ts-ignore
          const user = JWT.verifyJwt(socket.handshake.query.token);
          socket.user = user as UserPayload;
        } catch (err) {
          console.log("socket jwt verification error =========== ", socket);
        }
        next();
      } else {
        next(new Error("Authentication error"));
      }
    };
  }
}

export default SocketConnection;
