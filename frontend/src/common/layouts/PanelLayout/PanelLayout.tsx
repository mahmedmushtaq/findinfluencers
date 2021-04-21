import { Box, Styled, Card } from "theme-ui";
import { PanelGlobalState, SocketContext } from "../../../context";
import { Footer, PanelNavBar, OfferBar } from "../../components";
import { usePanel } from "../../hooks";
import { motion } from "framer-motion";
import { PropsType } from "./panelLayoutTypes";
import { Bell } from "react-feather";

const newNotificationDiv: any = {
  position: "fixed",
  zIndex: 999999,
  bottom: 20,
  right: 10,
  padding: 10,
  cursor: "pointer",
  background: "white",
};

const PanelLayout = (props: PropsType) => {
  const { showHeader, children, fullWidth, layoutFullHeight } = props;
  const isHeaderShow = showHeader === undefined ? true : showHeader;
  const bodyTopMargin =
    props.bodyTopMargin === undefined ? 50 : props.bodyTopMargin;

  const root = {
    width: !fullWidth ? ["85%", "95%", "85%"] : "100%",
  };

  const { showNotification, openNotificationAlert } = usePanel();

  return (
    // <SocketContext.Provider value={socket}>
    // {/* <PanelGlobalState.Provider value={{ state, dispatch }}> */}
    <div
      style={{
        backgroundColor: "white",
        height: layoutFullHeight ? "100vh" : undefined,
        overflow: layoutFullHeight ? "hidden" : undefined,
      }}
    >
      {/* <Box>
        <OfferBar />
      </Box> */}
      <Box>
        {isHeaderShow && <PanelNavBar businessNavBar={props.businessPanel} />}
      </Box>
      <Box
        sx={{
          height: "100%",
          marginTop: bodyTopMargin,
          ...root,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {children}
      </Box>
      {!!showNotification && (
        <motion.div
          initial={{ x: 750 }}
          animate={{ x: 0 }}
          transition={{ delay: 1.5, type: "tween" }}
          style={{ ...newNotificationDiv }}
          onClick={openNotificationAlert}
        >
          {" "}
          <Card>
            {/* <Bell size={54} /> */}
            <Box mt={1}>{showNotification}</Box>
          </Card>
        </motion.div>
      )}
    </div>
    //   {/* </PanelGlobalState.Provider> */}
    // </SocketContext.Provider>
  );
};

export default PanelLayout;
