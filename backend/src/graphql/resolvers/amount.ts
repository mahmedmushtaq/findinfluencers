import { ApolloError, IResolvers } from "apollo-server-express";
import { authenticated, authorized } from "../../middlewares/auth";
import { Amount, Profile, WithDrawlRequest } from "../../models";
import { Category } from "../../models/category";
import { UserRole } from "../../models/user";
import { contextType } from "../../types/apolloContextType";

const AmountResolver: IResolvers = {
  Query: {},
  Mutation: {
    paymentWithdrawl: authenticated(
      authorized(
        UserRole.influencer,
        async (_: void, { input }: any, context: contextType) => {
          const { amount } = input;
          const amountDoc = await Amount.findOne({ userId: context.user.id });
          if (!amountDoc) {
            throw new ApolloError(
              "No amount is present. Contact to support team for this issue"
            );
          }
          if (amount > amountDoc.amount) {
            throw new ApolloError(
              "Not enough balance. Contact to support team for this issue"
            );
          }

          const isWithDrawlRequestIsPresent = await WithDrawlRequest.findOne({
            status: "pending",
            userId: context.user.id,
          });

          if (isWithDrawlRequestIsPresent) {
            throw new ApolloError(
              "Please wait unitll your previous payment will not released"
            );
          }

          amountDoc.amount = amountDoc.amount - amount;
          amountDoc.billed = amountDoc.billed + amount;
          await amountDoc.save();

          await WithDrawlRequest.build({
            userId: context.user.id,
            status: "pending",
            amount,
          }).save();

          return amountDoc;
        }
      )
    ),
  },
};

export default AmountResolver;
