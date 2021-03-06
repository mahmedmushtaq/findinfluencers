import { gql } from "apollo-server-express";

const userType = gql`
  enum Role {
    admin
    influencer
    buyer
  }
  type User {
    id: ID!
    full_name: String
    email: String
    role: Role
    token: String
  }

  input SignUpInput {
    full_name: String!
    email: String!
    password: String!
    role: Role!
  }

  input SignInInput {
    email: String
    password: String
  }

  extend type Query {
    me: User!
  }
  extend type Mutation {
    signUp(input: SignUpInput!): User!
    signIn(input: SignInInput!): User!
  }
`;

export default userType;
