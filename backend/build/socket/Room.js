"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var userMap_1 = require("./userMap");
var Room = /** @class */ (function () {
    function Room(_socket) {
        this._socket = _socket;
    }
    Room.prototype.createMyRoom = function () {
        if (userMap_1.usersMap.has(this._socket.user.id)) {
            var existingUser = userMap_1.usersMap.get(this._socket.user.id);
            existingUser.sockets = __spreadArrays(existingUser.sockets, [this._socket.id]);
            userMap_1.usersMap.set(this._socket.user.id, existingUser);
        }
        else {
            userMap_1.usersMap.set(this._socket.user.id, {
                id: this._socket.user.id,
                sockets: [this._socket.id],
            });
        }
    };
    Room.prototype.leaveMyRoom = function () {
        userMap_1.usersMap.delete(this._socket.user.id);
    };
    return Room;
}());
exports.default = Room;
