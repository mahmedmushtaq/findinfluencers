import { gql } from "apollo-server-express";

const amountType = gql`
  type Amount {
    userId: User
    amount: Int
    billed: Int
  }
  extend type Query {
    amount: String
  }
`;

export default amountType;
