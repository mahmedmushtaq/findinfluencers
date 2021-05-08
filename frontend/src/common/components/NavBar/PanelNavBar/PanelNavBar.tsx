import { Grid, Box, Flex, Styled, Text, Button } from "theme-ui";
import {
  borderBottomLeftRadiusMobile,
  standardShortWidthLaptop,
  standardShortWidthMobile,
  standardShortWidthTablet,
} from "../../../../../styles/commonStyle";
import SideBarItemWithIcon from "../../SideBar/SideBarItemsWithIcons";
import {
  influencerPanelNavBarData,
  businessPanelNavBarData,
} from "./panelNavbarData";
import React, { useRef, useState } from "react";
import Link from "next/link";
import useToCheckOutSideClick from "../../../hooks/useToCheckOutSideClick/useToCheckOutSideClick";
import useWidthMediaQuery from "../../../hooks/useWidthMediaQuery";

const PanelNavBar = (props: { businessNavBar?: boolean }) => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const ref = useRef();
  const navBarData = props.businessNavBar
    ? businessPanelNavBarData
    : influencerPanelNavBarData;
  useToCheckOutSideClick({
    ref,
    onClick: (check) => {
      if (check) {
        setOpenSideBar(false);
      }
    },
  });
  const { isMiniToSmallLaptopScreen } = useWidthMediaQuery();
  return (
    <Box
      sx={{
        boxShadow: "0 0 1px 1px rgba(0,0,0,.2)",
      }}
    >
      <Flex
        sx={{
          width: [
            standardShortWidthMobile,
            "99%",
            isMiniToSmallLaptopScreen ? "90%" : standardShortWidthLaptop,
          ],
          margin: "auto",
          alignItems: "center",
        }}
      >
        <Text
          sx={{ fontFamily: "gilroyBold", fontSize: [22, 34], padding: 20 }}
        >
          <Link href="/">HireInfluencerss</Link>
        </Text>

        {/*  ======================== FOR LAPTOP AND TABLET ======================================  */}

        <Box style={{ marginLeft: "auto" }} sx={{ display: ["none", "block"] }}>
          <Flex sx={{ alignItems: "center" }}>
            {navBarData.map((singleData) => (
              <Box key={singleData.id} ml={2} mr={2}>
                <Link href={singleData.link}>
                  <a>
                    <Text sx={{ fontWeight: 500, cursor: "pointer" }}>
                      {singleData.text}
                    </Text>
                  </a>
                </Link>
              </Box>
            ))}
          </Flex>
        </Box>

        {/*  ========================= FOR MOBILE ================================================= */}
        <Box
          ml="auto"
          ref={ref}
          sx={{ display: ["block", "none"] }}
          onClick={() => {
            setOpenSideBar(!openSideBar);
          }}
        >
          <img src="/images/icons/menu.svg" width="20px" alt="Menu Icon" />
        </Box>
        <Box sx={{}}>
          <SideBarItemWithIcon
            openSideBar={openSideBar}
            setOpenSideBar={setOpenSideBar}
            data={navBarData}
          />
        </Box>
      </Flex>
    </Box>
  );
};
export default PanelNavBar;
