import { Box } from "theme-ui";
import { useRef } from "react";
import useSideBarHook from "./useSideBarHook";
import { SideBarPropsType } from "./sideBarProps";
import { motion, AnimatePresence } from "framer-motion";

const sideBarStyleContainer: any = {
  position: "absolute",
  transition: "all 1.4s ease",
  height: "100%",
  backgroundColor: "red",
  boxShadow: "0 0 1px rgba(0,0,0,.5)",
};

/**
 *
 * @param props
 * direction,width and background props is not working
 *
 *
 */
const SideBar = (props: SideBarPropsType) => {
  const { openSideBar, setOpenSideBar, direction, width } = props;

  //const translateX = sidebarDirection === "left" ? "-100%" : "100%";

  const initialHideStyle = { x: "100%" };
  const finalStyle = { x: "-58%", display: "block" };
  return (
    <Box sx={{}}>
      <AnimatePresence>
        {openSideBar && (
          <motion.div
            style={{
              position: "fixed",
              top: 0,
              backgroundColor: "white",
              height: "100vh",
              zIndex: 10000,
              padding: "0 10px",
              width,
            }}
            initial={initialHideStyle}
            animate={finalStyle}
            transition={{ duration: 1.2 }}
            exit={{ x: "100%" }}
          >
            {props.children}
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default SideBar;
