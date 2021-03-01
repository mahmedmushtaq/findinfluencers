import { gql, AuthenticationError } from "apollo-server-express";
import userType from "./userType";
import platformType from "./platformType";
import categoryType from "./categoryType";
import profileType from "./profileType";
import settingsType from "./settings";

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
];
