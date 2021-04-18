import { gql } from "apollo-server-express";

const notificationType = gql`
  type Notification {
    id: ID!
    fromUser: User!
    toUser: User!
    message: String!
    read: Boolean!
    createdAt: String!
    link: String!
  }

  extend type Query {
    allNotifications: [Notification]!
  }

  extend type Mutation {
    notificationOpened(id: String): Notification
  }
`;

export default notificationType;
