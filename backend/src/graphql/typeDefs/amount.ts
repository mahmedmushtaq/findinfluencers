import { gql } from "apollo-server-express";

const amountType = gql`
  type Amount {
    id: ID!
    userId: User
    amount: Int
    billed: Int
  }
  extend type Query {
    amount: String
  }

  input paymentWithdrawlInput{
    amount: Int
  }

  extend type Mutation{
    paymentWithdrawl(input: paymentWithdrawlInput): Amount
  }
`;

export default amountType;
