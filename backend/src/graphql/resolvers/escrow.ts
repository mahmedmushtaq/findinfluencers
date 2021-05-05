import { ApolloError, IResolvers } from "apollo-server-express";
import { authenticated, authorized } from "../../middlewares/auth";
import { Amount, Escrow, Order, Profile } from "../../models";
import { Category } from "../../models/category";
import { EscrowStatus } from "../../models/escrow";
import { OrderStatus } from "../../models/order";
import { User, UserRole } from "../../models/user";
import { contextType } from "../../types/apolloContextType";
import { currentDateDifference } from "../../utils/utils";
import {
  escrowController,
  savePaymentIntent as savePaymentIntentController,
  setPaymentIntent,
} from "../controllers/escrowController";
import {
  orderStatusControllerBuyer,
  orderStatusControllerInfluencer,
} from "../controllers/orderController/orderStatusController";

const EscrowResolver: IResolvers = {
  Query: {
    myEscrow: authenticated(async (_: void, _1: any, context: contextType) => {
      const res = await escrowController(context);

      return res;
    }),
  },
  Mutation: {
    createPaymentIntent: authenticated(
      async (_: void, { input }: any, context: contextType) => {
        const { orderId } = input;
        const order = await Order.findById(orderId);
        if (!order) {
          throw new ApolloError("Order Is Not Found");
        }
        try {
          const data = setPaymentIntent(context, order);
          return data;
        } catch (err) {
          throw new ApolloError(err);
        }
      }
    ),
    savePaymentIntent: authenticated(
      async (_: void, { input }: any, context: contextType) => {
        const order = await savePaymentIntentController(input, context);
        return order;
      }
    ),
  },

  Escrow: {
    order: (parent) => {
      return parent.orderId;
    },
    owner: (parent) => {
      return parent.ownerId;
    },
    workingUser: (parent) => {
      return parent.workingUserId;
    },
  },
};

export default EscrowResolver;
