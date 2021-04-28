"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var subject_1 = require("./subject");
var index_1 = require("../index");
var userMap_1 = require("./userMap");
var models_1 = require("../models");
var Notification = /** @class */ (function () {
    function Notification() {
        this._socket = index_1.socketCon === null || index_1.socketCon === void 0 ? void 0 : index_1.socketCon.socket;
        this._io = index_1.socketCon === null || index_1.socketCon === void 0 ? void 0 : index_1.socketCon.io;
    }
    Notification.prototype.sendNotification = function (payload) {
        var _this = this;
        var sockets = [];
        if (userMap_1.usersMap.has(payload.toUserId)) {
            console.log("is user present");
            sockets = userMap_1.usersMap.get(payload.toUserId).sockets;
        }
        sockets.forEach(function (socket) {
            var _a;
            (_a = _this._io) === null || _a === void 0 ? void 0 : _a.to(socket).emit(subject_1.Subject.receivedNotification, payload);
        });
    };
    Notification.prototype.notificationEventListener = function () {
        this.readNotification();
        this.loadOfflineNotifications();
    };
    Notification.prototype.readNotification = function () {
        var _this = this;
        var _a;
        (_a = this._socket) === null || _a === void 0 ? void 0 : _a.on(subject_1.Subject.readNotifications, function (payload) { return __awaiter(_this, void 0, void 0, function () {
            var map;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        map = payload.map(function (singleId) { return __awaiter(_this, void 0, void 0, function () {
                            var notification;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        console.log("singleId ", singleId);
                                        return [4 /*yield*/, models_1.Notification.findByIdAndUpdate(singleId.id || singleId._id, { read: true })];
                                    case 1:
                                        notification = _a.sent();
                                        return [2 /*return*/, notification];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(map)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    Notification.prototype.loadOfflineNotifications = function () {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var notifications_1, sockets;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!userMap_1.usersMap.has((_a = this._socket) === null || _a === void 0 ? void 0 : _a.user.id)) return [3 /*break*/, 2];
                        return [4 /*yield*/, models_1.Notification.find({
                                toUserId: (_b = this._socket) === null || _b === void 0 ? void 0 : _b.user.id,
                                read: false,
                            })];
                    case 1:
                        notifications_1 = _d.sent();
                        if (notifications_1.length === 0)
                            return [2 /*return*/];
                        sockets = userMap_1.usersMap.get((_c = this._socket) === null || _c === void 0 ? void 0 : _c.user.id).sockets;
                        sockets.forEach(function (socket) {
                            var _a;
                            (_a = _this._io) === null || _a === void 0 ? void 0 : _a.to(socket).emit(subject_1.Subject.receivedNotification, notifications_1);
                        });
                        _d.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    return Notification;
}());
exports.default = Notification;
