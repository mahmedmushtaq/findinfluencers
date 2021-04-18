import { Notification } from "../../models";
import { Notification as SocketNotification } from "../../socket";

export const sendNotification = async (
  fromUserId: string,
  toUserId: string,
  message: string,
  link: string
) => {
  const notification = Notification.build({
    fromUserId,
    toUserId,
    message,
    link,
  });

  await notification.save();
  new SocketNotification().sendNotification({
    id: notification.id,
    fromUserId,
    toUserId,
    message,
    createdAt: notification!.createdAt!,
  });
  return notification;
};
