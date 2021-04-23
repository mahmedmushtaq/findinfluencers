import { gql } from "apollo-server-express";

const withDrawlRequestType = gql`
  type WithDrawlRequest {
    id: ID  
    user: User
    amount: Int
    status: String
  }
  extend type Query {
    allWithDrawlRequest: [WithDrawlRequest!]!
  }
  extend type Mutation {
    approved(id: String): WithDrawlRequest
  }
`;

export default withDrawlRequestType;
