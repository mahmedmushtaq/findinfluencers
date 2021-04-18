import { Grid, Box, Flex, Styled, Spinner } from "theme-ui";
import {
  borderBottomLeftRadiusMobile,
  borderBottomLeftRadiusLaptop,
} from "../../../../../styles/commonStyle";

const boxStyle: any = {
  boxShadow: "0 0 1px 1px rgba(0,0,0,.4)",
  textAlign: "center",
  padding: 20,
  cursor: "pointer",
  width: "100%",
  borderBottomLeftRadius: [
    borderBottomLeftRadiusMobile,
    borderBottomLeftRadiusLaptop,
  ],
};
const OrderHeaders = (props: {
  setOrderStatus;
  statusLists: { text: string; key: string }[];
}) => {
  const { statusLists, setOrderStatus } = props;
  const setOrderStatusBtn = (status) => {
    setOrderStatus(status);
  };

  return (
    <Box>
      <Grid columns={3}>
        {statusLists.map((status) => (
          <Box
            key={status.key}
            sx={{ ...boxStyle }}
            onClick={() => setOrderStatusBtn(status)}
          >
            <Styled.h4>{status.text} Orders</Styled.h4>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default OrderHeaders;

{
  /* <Flex style={{ width: "100%" }}>
<Box
  sx={{ ...boxStyle }}
  onClick={() => setOrderStatusBtn("submit_for_payment")}
>
  <Styled.h4>Submit For Payment</Styled.h4>
</Box>
</Flex>

<Box
sx={{ ...boxStyle }}
onClick={() => setOrderStatusBtn("completed")}
>
<Styled.h4>Completed</Styled.h4>
</Box> */
}
