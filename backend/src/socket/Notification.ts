import socket from "socket.io";
import { SocketTypes } from "./SocketType";
import { Subject } from "./subject";
import { socketCon } from "../index";
import { usersMap } from "./userMap";
import { Notification as NotificationModel } from "../models";

interface NotificationType {
  id: string;
  fromUserId: string;
  toUserId: string;
  message: string;
  createdAt: string;
}

class Notification {
  private _socket?: SocketTypes;
  private _io?: socket.Server;
  constructor() {
    this._socket = socketCon?.socket;
    this._io = socketCon?.io;
  }

  sendNotification(payload: NotificationType) {
    let sockets = [];
    if (usersMap.has(payload.toUserId)) {
      console.log("is user present");
      sockets = usersMap.get(payload.toUserId).sockets;
    }
    sockets.forEach((socket: string) => {
      this._io?.to(socket).emit(Subject.receivedNotification, payload);
    });
  }

  notificationEventListener() {
    this.readNotification();
    this.loadOfflineNotifications();
  }

  readNotification() {
    this._socket?.on(
      Subject.readNotifications,
      async (
        payload: { id: string | undefined; _id: string | undefined }[]
      ) => {
        const map = payload.map(async (singleId) => {
          console.log("singleId ", singleId);
          const notification = await NotificationModel.findByIdAndUpdate(
            singleId.id || singleId._id,
            { read: true }
          );
          return notification;
        });

        await Promise.all(map);
      }
    );
  }

  async loadOfflineNotifications() {
    if (usersMap.has(this._socket?.user!.id)) {
      const notifications = await NotificationModel.find({
        toUserId: this._socket?.user!.id,
        read: false,
      });
      if (notifications.length === 0) return;

      const sockets = usersMap.get(this._socket?.user!.id).sockets;
      sockets.forEach((socket: string) => {
        this._io?.to(socket).emit(Subject.receivedNotification, notifications);
      });
    }
  }
}

export default Notification;
