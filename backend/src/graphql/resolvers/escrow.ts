import { ApolloError, IResolvers } from "apollo-server-express";
import { authenticated, authorized } from "../../middlewares/auth";
import { Amount, Escrow, Order, Profile } from "../../models";
import { Category } from "../../models/category";
import { EscrowStatus } from "../../models/escrow";
import { OrderStatus } from "../../models/order";
import { User, UserRole } from "../../models/user";
import { contextType } from "../../types/apolloContextType";
import { currentDateDifference } from "../../utils/utils";
import { escrowController } from "../controllers/escrowController";
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
