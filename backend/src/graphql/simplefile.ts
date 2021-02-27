import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    name: String
    age: Int
  }

  type Query {
    user: User
  }
`;

const resolvers = {
  Query: {
    user() {
      return {
        name: "M Ahmed Mushtaq",
        age: 20,
      };
    },
  },
};

export { resolvers, typeDefs };
