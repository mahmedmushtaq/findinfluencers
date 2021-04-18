import { gql } from "@apollo/client";

const LOAD_NOTIFICATIONS = gql`
  query notifications {
    allNotifications {
      id
      message
      createdAt
      link
      fromUser {
        id
        full_name
        username
      }
    }
  }
`;

export default LOAD_NOTIFICATIONS;
