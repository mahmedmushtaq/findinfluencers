import { gql } from "apollo-server-express";

const settingsType = gql`
  input UpdateSettings {
    updatePassword: String
    updateEmail: String
    updateName: String
    updateUsername: String
  }

  extend type Mutation {
    updateUser(input: UpdateSettings!, dp: Upload): User!
  }
`;

export default settingsType;
