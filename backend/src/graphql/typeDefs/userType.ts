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
    username: String
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

  input SearchUserInput {
    userId: String
    username: String
  }

  extend type Query {
    me: User!
    searchUser(input: SearchUserInput): User!
  }
  extend type Mutation {
    signUp(input: SignUpInput!): User!
    signIn(input: SignInInput!): User!
  }
`;

export default userType;
