import { IResolvers } from "apollo-server-express";
import { authenticated, authorized } from "../../middlewares/auth";
import { Profile } from "../../models";
import { Category } from "../../models/category";
import { UserRole } from "../../models/user";

const AmountResolver: IResolvers = {
  Query: {},
  Mutation: {},
};

export default AmountResolver;
