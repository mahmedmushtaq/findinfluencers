import { gql } from "@apollo/client";

const NOTIFICATION_OPENED = gql`
  mutation notificationOpened($id: String) {
    notificationOpened(id: $id) {
      id
    }
  }
`;

export default NOTIFICATION_OPENED;
