import { gql } from "apollo-server-express";

const platformType = gql`
  type Platform {
    name: String
    id: ID!
    icon: String
    platformProfileInfo: [PlatformProfileInfo]
  }

  input PlatformInput {
    name: String!
    icon: String
  }

  extend type Query {
    platforms: [Platform]!
    platform(name: String!): Platform!
  }

  extend type Mutation {
    addPlatform(input: PlatformInput!): Platform
    addPlatformWithIcon(input: PlatformInput!, file: Upload!): Platform
  }
`;

export default platformType;
