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
  setPaymentIntent,
} from "../controllers/escrowController";
import {
  orderStatusControllerBuyer,
  orderStatusControllerInfluencer,
} from "../controllers/orderController/orderStatusControllerBuyer";

const EscrowResolver: IResolvers = {
  Query: {
    myEscrow: authenticated(async (_: void, _1: any, context: contextType) => {
      const res = await escrowController(context);
      console.log("res is = ", res);
      return res;
    }),
  },
  Mutation: {
    createPaymentIntent: authenticated(
      async (_: void, { input }: any, context: contextType) => {
        console.log(input);
        const { orderId } = input;
        // const order = await Order.findById(orderId);
        // if (!order) {
        //   throw new ApolloError("Order Is Not Found");
        // }
        try {
          const data = setPaymentIntent(context, 5 * 100);
          return data;
        } catch (err) {
          throw new ApolloError(err);
        }
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