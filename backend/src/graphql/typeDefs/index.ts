import { gql } from "apollo-server-express";
import userType from "./userType";
import platformType from "./platformType";
import categoryType from "./categoryType";
import profileType from "./profileType";
import settingsType from "./settings";
import orderType from "./order";
import escrowType from "./escrow";
import amountType from "./amount";
import notificationType from "./notification";
import withDrawlRequestType from "./withdrawl";

const rootType = gql`
  type Query {
    AuthenticationError: String
  }
  type Mutation {
    rootType: String
  }
`;

export default [
  rootType,
  userType,
  platformType,
  categoryType,
  profileType,
  settingsType,
  orderType,
  escrowType,
  amountType,
  notificationType,
  withDrawlRequestType,
];
