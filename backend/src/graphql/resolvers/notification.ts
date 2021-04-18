import { IResolvers } from "apollo-server-express";
import { authenticated, authorized } from "../../middlewares/auth";
import { Notification } from "../../models";
import { contextType } from "../../types/apolloContextType";

const AmountResolver: IResolvers = {
  Query: {
    allNotifications: authenticated(
      async (_: void, _1: void, context: contextType) => {
        const id = context.user.id;
        console.log("id is = ", id);
        const notifications = await Notification.find({
          toUserId: id,
          opened: false,
        })
          .populate("fromUserId", "id full_name username")
          .sort([["createdAt", -1]]);

        return notifications;
      }
    ),
  },
  Mutation: {
    notificationOpened: authenticated(
      async (_: void, { id }: any, context: contextType) => {
        const notification = await Notification.findByIdAndUpdate(id, {
          opened: true,
        });
        return notification;
      }
    ),
  },

  Notification: {
    fromUser: async (parent) => {
      return parent.fromUserId;
    },
  },
};

export default AmountResolver;
