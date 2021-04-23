import { ApolloError, IResolvers } from "apollo-server-express";
import { authenticated, authorized } from "../../middlewares/auth";
import { Amount, Profile, WithDrawlRequest } from "../../models";
import { Category } from "../../models/category";
import { UserRole } from "../../models/user";
import { contextType } from "../../types/apolloContextType";

const AmountResolver: IResolvers = {
  Query: {
    allWithDrawlRequest: authenticated(
      authorized(
        UserRole.admin,
        async (_: void, _1: void, context: contextType) => {
          const allWithDrawlRequest = await WithDrawlRequest.find({
            $or: [{ status: "pending" }, { status: "dispute" }],
          }).populate("userId", "full_name email username");

          return allWithDrawlRequest;
        }
      )
    ),
  },
  Mutation: {
    approved: authenticated(
      authorized(UserRole.admin, async (_: void, { id }: any) => {
        const withDrawlRequest = await WithDrawlRequest.findByIdAndUpdate(id, {
          status: "paid",
        });
        return withDrawlRequest;
      })
    ),
  },
  WithDrawlRequest: {
    user: (parent) => parent.userId,
  },
};

export default AmountResolver;
