import socket from "socket.io";
import { UserPayload, JWT } from "../utils";
import Room from "./Room";
import { SocketTypes } from "./SocketType";
import Notification from "./notification";

class SocketConnection {
  private _io?: socket.Server;
  private _socket?: SocketTypes;
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
    this._io!.use(this.validateToken()).on(
      "connection",
      (socket: SocketTypes) => {
        this._socket = socket;
        console.log(
          ` =========== socket connected ========== ${socket.user?.id}`
        );

        if (socket.user && socket.user.id) {
          new Room(socket).createMyRoom(); // create my room
          new Notification().notificationEventListener();
        }

        socket.on("error", (err) => {
          console.log(err);
        });

        socket.on("disconnect", () => {
          if (socket.user && socket.user.id) {
            new Room(socket).leaveMyRoom(); // leave room
          }
        });
      }
    );
  }
  validateToken() {
    return function (socket: SocketTypes, next: Function) {
      if (socket.handshake.query && socket.handshake.query.token) {
        try {
          // @ts-ignore
          const user = JWT.verifyJwt(socket.handshake.query.token);
          socket.user = user as UserPayload;
        } catch (err) {
          console.log("socket jwt verification error =========== ", err);
        }
        next();
      } else {
        next(new Error("Authentication error"));
      }
    };
  }

  get io() {
    return this._io;
  }

  get socket() {
    return this._socket;
  }
}

export default SocketConnection;
