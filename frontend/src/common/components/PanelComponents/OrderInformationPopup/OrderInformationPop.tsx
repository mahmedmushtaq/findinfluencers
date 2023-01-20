import { Box, Styled, Text } from "theme-ui";
import { Modal } from "../../index";

const OrderInformationPopup = (props: { modelRef; orderData }) => {
  const { modelRef, orderData } = props;
  return (
    <Modal ref={modelRef} height={100}>
      {orderData && (
        <Box style={{ textAlign: "center" }}>
          <Styled.h5>{orderData.name}</Styled.h5>
          <Text>Ordered By {orderData.owner.full_name}</Text>
          <Text>Work(ing/ed) By {orderData.workingUser.full_name}</Text>
        </Box>
      )}
    </Modal>
  );
};

export default OrderInformationPopup;
