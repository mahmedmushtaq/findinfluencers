import { gql } from "apollo-server-express";

const orderType = gql`
  enum OrderStatus {
    needs_approval
    working
    rejected
    submit_for_payment
    completed
    cancelled
    require_payment
  }

  type Order {
    id: ID!
    name: String!
    description: String
    status: OrderStatus!
    owner: User!
    workingUser: User!
    amount: Int!
    platformProfile: PlatformProfileInfo!
    createdAt: String
    escrow: Escrow
    
  }

  input OrderInput {
    name: String!
    description: String
    status: OrderStatus!
    workingUserId: String!
    amount: Int!
    platformProfileId: String!
  }

  input OrderInformationInput {
    orderId: String
  }

  input OfferStatusInput {
    orderId: String
    status: String
  }

  extend type Query {
    myPendingOrders: [Order!]
    orderInformation(input: OrderInformationInput!): Order!
    orderByStatus(status: OrderStatus): [Order]!
  }

  extend type Mutation {
    createOffer(input: OrderInput!): Order!
    # acceptOffer(orderId: String): Order!
    # rejectOffer(orderId: String): Order!
    setOfferStatus(input: OfferStatusInput!): Order!
  }
`;

export default orderType;
