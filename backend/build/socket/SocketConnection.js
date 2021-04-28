"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = __importDefault(require("socket.io"));
var utils_1 = require("../utils");
var Room_1 = __importDefault(require("./Room"));
var Notification_1 = __importDefault(require("./Notification"));
var SocketConnection = /** @class */ (function () {
    function SocketConnection(expressServer, _allowDomain) {
        this.expressServer = expressServer;
        this._allowDomain = _allowDomain;
        //@ts-ignore
        this._io = socket_io_1.default(expressServer, {
            cors: {
                origin: _allowDomain,
                methods: ["GET", "POST"],
            },
        });
    }
    SocketConnection.prototype.startServer = function () {
        var _this = this;
        this._io.use(this.validateToken()).on("connection", function (socket) {
            var _a;
            _this._socket = socket;
            console.log(" =========== socket connected ========== " + ((_a = socket.user) === null || _a === void 0 ? void 0 : _a.id));
            if (socket.user && socket.user.id) {
                new Room_1.default(socket).createMyRoom(); // create my room
                new Notification_1.default().notificationEventListener();
            }
            socket.on("error", function (err) {
                console.log(err);
            });
            socket.on("disconnect", function () {
                if (socket.user && socket.user.id) {
                    new Room_1.default(socket).leaveMyRoom(); // leave room
                }
            });
        });
    };
    SocketConnection.prototype.validateToken = function () {
        return function (socket, next) {
            if (socket.handshake.query && socket.handshake.query.token) {
                try {
                    // @ts-ignore
                    var user = utils_1.JWT.verifyJwt(socket.handshake.query.token);
                    socket.user = user;
                }
                catch (err) {
                    console.log("socket jwt verification error =========== ", err);
                }
                next();
            }
            else {
                next(new Error("Authentication error"));
            }
        };
    };
    Object.defineProperty(SocketConnection.prototype, "io", {
        get: function () {
            return this._io;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SocketConnection.prototype, "socket", {
        get: function () {
            return this._socket;
        },
        enumerable: false,
        configurable: true
    });
    return SocketConnection;
}());
exports.default = SocketConnection;
