import { gql } from "apollo-server-express";

const profileType = gql`
  type PlatformProfileInfo {
    id: ID
    platform: Platform
    profileName: String
    profileUrl: String
    profileFollowers: String
    user: User
  }

  type Profile {
    id: ID
    user: User
    platformProfileInfo: [PlatformProfileInfo]
    category: [Category]
    images: [String]
  }

  input profilePlatformInput {
    """
    platformId is used to add new platform profile
    """
    platformId: String
    profileName: String!
    profileUrl: String!
    profileFollowers: Int!
    """
    profilePlatformId is used to update profile platform data
    """
    profilePlatformId: String
  }

  input ProfileInput {
    platform: [profilePlatformInput!]!
    categoryIds: [String!]!
  }

  extend type Query {
    myProfile: Profile
  }

  input updateProfileInfo {
    platform: [profilePlatformInput!]!
    categoriesId: [String]
  }

  extend type Mutation {
    addProfileInfo(input: ProfileInput!, images: [Upload!]!): Profile
    updateProfileInfo(input: updateProfileInfo, images: [Upload]): Profile
  }
`;

export default profileType;
