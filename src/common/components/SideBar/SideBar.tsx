import { Box } from "theme-ui";
import { useRef } from "react";
import useSideBarHook from "./useSideBarHook";
import { SideBarPropsType } from "./sideBarProps";

const sideBarStyleContainer: any = {
  position: "absolute",
  transition: "all 1.4s ease",
  height: "100vh",
  boxShadow: "0 0 1px rgba(0,0,0,.5)",
};

const SideBar = (props: SideBarPropsType) => {
  const { openSideBar, setOpenSideBar, direction, width } = props;
  const sidebarDirection = direction || "left";
  const defaultWidth = width || 150;
  const wrapperRef = useRef(null);
  const background = props.bg || "background";

  const { translation } = useSideBarHook({
    ref: wrapperRef,
    openSideBar,
    setOpenSideBar,
  });

  const translateX = sidebarDirection === "left" ? "-100%" : "100%";

  return (
    <Box>
      <Box
        ref={wrapperRef}
        onMouseLeave={() => console.log("mouse leave")}
        style={{
          ...sideBarStyleContainer,
          width: defaultWidth,
          zIndex: 10000,
          overflow: "hidden",
          transform: `translateX(${!translation ? translateX : "0"})`,
          right: sidebarDirection === "right" ? 0 : undefined,
          top: 0,
          left: sidebarDirection === "left" ? 0 : undefined,
        }}
        sx={{ bg: "background" }}
      >
        <div style={{}}>{props.children}</div>
      </Box>
    </Box>
  );
};

export default SideBar;
