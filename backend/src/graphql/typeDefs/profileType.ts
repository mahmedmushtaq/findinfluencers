import { gql } from "apollo-server-express";

const profileType = gql`
  type PlatformProfileInfo {
    id: ID
    platform: Platform
    profileName: String
    profileUrl: String
    profileFollowers: String
    user: User
    rate: Int
  }

  type Profile {
    id: ID
    user: User
    platformProfileInfo: [PlatformProfileInfo]
    category: [Category]
    images: [String]
    description: String
  }

  type Rate {
    """
    rateRange return [minRate, maxRate]
    """
    # used to filter profile on the basis of the rate
    rateRange: [Int]
  }

  input PlatformProfileInput {
    """
    platformId is used to add new platform profile
    """
    platformId: String
    profileName: String!
    profileUrl: String!
    profileFollowers: Int!
    rate: Int!
    """
    id is used to update platformProfile data
    """
    id: String
  }

  input ProfileInput {
    platforms: [PlatformProfileInput!]!
    categoryIds: [String!]!
    description: String!
  }

  input SearchProfile {
    platformName: String
    categoryName: String
    rateRange: [Int]
  }

  input userProfileInput {
    username: String
    userId: String
  }

  extend type Query {
    myProfile: Profile
    profileRates: Rate
    searchProfile(input: SearchProfile, pageNum: Int): [Profile]
    userProfile(input: userProfileInput): Profile
  }

  # input updateProfileInfo {
  #   platform: [profilePlatformInput!]!
  #   categoriesId: [String]
  # }

  extend type Mutation {
    addProfileInfo(input: ProfileInput!, images: [Upload!]!): Profile
    updateProfileInfo(input: ProfileInput, images: [Upload]): Profile
    deletePlatformProfile(id: String): Profile
  }
`;

export default profileType;
