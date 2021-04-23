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

  type PaymentIntent {
    client_secret: String
    id: String
    paymentIsAlreadyDone: Boolean
  }

  type MyEscrow {
    escrows: [Escrow!]!
    amount: Int
    billed: Int
  }

  extend type Query {
    myEscrow: MyEscrow!
  }

  input createPaymentIntentInput {
    orderId: String
  }

  input savePaymentIntentInput{
    stripe_payment_intent_id: String
    orderId: String
  }

  extend type Mutation {
    createPaymentIntent(input: createPaymentIntentInput): PaymentIntent!
    savePaymentIntent(input: savePaymentIntentInput): Order
    addAmount: MyEscrow!
  }
`;

export default escrowType;
