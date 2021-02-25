import { useState } from "react";
import { Grid, Box, Styled, Flex, Text } from "theme-ui";
import { PanelLayout } from "../../common/layouts";

const boxStyle: any = {
  boxShadow: "0 0 1px 1px rgba(0,0,0,.4)",
  textAlign: "center",
  padding: 20,
  cursor: "pointer",
};
const Orders = (props: any) => {
  const [newOrdersList, setNewOrdersList] = useState(true);

  const setCompletedOrders = () => {
    setNewOrdersList(false);
  };

  const setNewOrdersListClick = () => {
    setNewOrdersList(true);
  };

  return (
    <PanelLayout>
      <Box sx={{}}>
        <Grid columns={2}>
          <Box sx={{ ...boxStyle }} onClick={setNewOrdersListClick}>
            <Styled.h4>New Orders</Styled.h4>
          </Box>
          <Box sx={{ ...boxStyle }} onClick={setCompletedOrders}>
            <Styled.h4>Completed</Styled.h4>
          </Box>
        </Grid>
        <Box mt={4}>
          <Styled.h5>
            {newOrdersList ? "New Orders" : "Completed Orders"}
          </Styled.h5>
          <Flex sx={{ alignItems: "center" }}>
            <Text>Order Name</Text>
            <Text color="primary" ml={2} sx={{ fontSize: 11 }}>
              Today
            </Text>
          </Flex>
        </Box>
      </Box>
    </PanelLayout>
  );
};
export default Orders;
