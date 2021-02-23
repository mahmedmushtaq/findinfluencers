import React, { useState } from "react";
import { Box, Button } from "theme-ui";
import { Menu } from "react-feather";
import navBarData from "./NavBarData";
import SideBarItemWithIcon from "../SideBar/SideBarItemsWithIcons";

const MobileNavBar = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <Box>
      <div
        style={{
          marginRight: 5,
        }}
      >
        <Menu
          onClick={() => {
            setShowSideBar(!showSideBar);
          }}
        />
        <SideBarItemWithIcon
          openSideBar={showSideBar}
          setOpenSideBar={setShowSideBar}
          data={navBarData}
        />
      </div>
    </Box>
  );
};

export default MobileNavBar;
