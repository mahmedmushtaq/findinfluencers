import { ApolloError, IResolvers } from "apollo-server-express";
import { authenticated, authorized } from "../../middlewares/auth";
import { Escrow, Order, Profile } from "../../models";
import { OrderStatus } from "../../models/order";
import { UserRole } from "../../models/user";
import { contextType } from "../../types/apolloContextType";
import {
  orderStatusControllerBuyer,
  orderStatusControllerInfluencer,
} from "../controllers/orderController/orderStatusControllerBuyer";
import { socketCon } from "../../index";
import { Notification } from "../../models/notification";
import { Notification as SocketNotification } from "../../socket";
import { sendNotification } from "../controllers/notification";

const OrderResolver: IResolvers = {
  Query: {
    myPendingOrders: authenticated(
      authorized(
        UserRole.influencer,
        async (_: void, { input }: any, context: contextType) => {
          const orders = await Order.find({
            workingUserId: context.user.id,
            status: OrderStatus.needs_approval,
          })
            .populate("ownerId", "-password -__v")
            .populate("workingUserId", "-password -__v")
            .populate("platformProfileId");
          return orders;
        }
      )
    ),
    orderInformation: async (_: void, { input }) => {
      const { orderId } = input;

      const order = await Order.findById(orderId)
        .populate("ownerId", "-password -__v")
        .populate("workingUserId", "-password -__v")
        .populate("platformProfileId");
      return order;
    },
    orderByStatus: authenticated(
      async (_: void, { status }: any, context: contextType) => {
        const orders = await Order.find({
          $or: [
            { workingUserId: context.user.id },
            { ownerId: context.user.id },
          ],
          status,
        })
          .populate("ownerId", "-password -__v")
          .populate("workingUserId", "-password -__v")
          .populate("platformProfileId")
          .sort([["createdAt", -1]]);

        return orders;
      }
    ),
  },
  Mutation: {
    createOffer: authenticated(
      authorized(
        UserRole.buyer,
        async (_: void, { input }: any, context: contextType) => {
          const {
            name,
            status,
            description,
            amount,
            platformProfileId,
            workingUserId,
          } = input;
          const order = Order.build({
            name,
            status,
            description,
            ownerId: context.user.id,
            workingUserId,
            amount,
            platformProfileId,
          });
          await order.save();

          await sendNotification(
            context.user.id,
            workingUserId,
            "New Order Has Been Received",
            `orders/${order.id}`
          );

          return order;
        }
      )
    ),

    setOfferStatus: authenticated(
      async (_: void, { input }: any, context: contextType) => {
        let order;
        if (context.user.role === "influencer")
          order = await orderStatusControllerInfluencer(input, context);
        else order = await orderStatusControllerBuyer(input, context);
        return order;
      }
    ),
  },

  Order: {
    owner: async (parent) => {
      return parent.ownerId;
    },
    workingUser: async (parent) => {
      return parent.workingUserId;
    },
    platformProfile: async (parent) => {
      return parent.platformProfileId;
    },
    escrow: async (parent) => {
      const escrow = await Escrow.findOne({ orderId: parent.id });
      return escrow;
    },
  },
};

export default OrderResolver;
