import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Box, Flex, Grid, Spinner, Styled, Text } from "theme-ui";
import { PanelLayout } from "../../src/common/layouts";
import LOAD_NOTIFICATIONS from "../../src/lib/graphql/queries/LOAD_NOTIFICATIONS";
import timeAgo from "../../src/lib/timeAgo";
import {
  standardShortWidthLaptop,
  standardShortWidthMobile,
} from "../../styles/commonStyle";
import router from "next/router";
import { NOTIFICATION_OPENED } from "../../src/lib/graphql";

const Notification = (props: { isBusinessPanel?: boolean }) => {
  const { data, error, loading } = useQuery(LOAD_NOTIFICATIONS, {
    fetchPolicy: "network-only",
  });
  const [notificationOpened, {}] = useMutation(NOTIFICATION_OPENED);

  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    if (!data) return;
    setNotificationList(data.allNotifications);
    console.log(data.allNotifications);
  }, [data]);

  const openNotification = (notification) => {
    const link = `/panel/${notification.link}`;
    notificationOpened({ variables: { id: notification.id } });
    router.push(link);
  };

  return (
    <PanelLayout businessPanel={props.isBusinessPanel} bodyTopMargin={40}>
      <Box
        sx={{
          width: [
            standardShortWidthMobile,
            standardShortWidthMobile,
            standardShortWidthLaptop,
          ],
          margin: "auto",
        }}
      >
        <Box mt={3}>
          <Styled.h5>Notifications</Styled.h5>
          {!loading ? (
            <Box>
              {notificationList.map((notification) => (
                <Flex
                  mt={3}
                  key={notification.id}
                  sx={{ alignItems: "center" }}
                >
                  <Styled.h4
                    style={{ cursor: "pointer" }}
                    onClick={() => openNotification(notification)}
                  >
                    {notification.message}
                  </Styled.h4>

                  <Text color="primary" ml={3}>
                    {timeAgo.ago(+notification.createdAt)}
                  </Text>
                </Flex>
              ))}
            </Box>
          ) : (
            <Spinner />
          )}
        </Box>
      </Box>
    </PanelLayout>
  );
};

export default Notification;
