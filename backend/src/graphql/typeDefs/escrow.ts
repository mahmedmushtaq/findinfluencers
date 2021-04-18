import { gql } from "apollo-server-express";

const escrowType = gql`
  enum EscrowStatus {
    company_holds
    company_holds_for_five_days
    dispute
    paid
  }

  type Escrow {
    id: ID!
    order: Order
    status: String
    owner: User
    workingUser: User
  }

  type MyEscrow {
    escrows: [Escrow!]!
    amount: Int
    billed: Int
  }

  extend type Query {
    myEscrow: MyEscrow!
  }
`;

export default escrowType;
