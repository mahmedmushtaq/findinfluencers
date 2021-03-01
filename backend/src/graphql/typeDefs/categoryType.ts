import { gql } from "apollo-server-express";

const categoryType = gql`
  type Category {
    name: String
    id: ID!
    profile: [Profile]
  }

  input CategoryInput {
    name: String!
  }

  extend type Query {
    categories: [Category]!
  }

  extend type Mutation {
    addCategory(input: CategoryInput!): Category!
  }
`;

export default categoryType;
