import { Grid, Box, Flex, Styled, Text, Button } from "theme-ui";
import { standardShortWidthLaptop } from "../../../styles/commonStyle";
import SideBarItemWithIcon from "../../SideBar/SideBarItemsWithIcons";
import { BarChart2, Bell, MessageCircle, User, UserPlus } from "react-feather";
import React, { useRef, useState } from "react";
import Link from "next/link";
import useToCheckOutSideClick from "../../../hooks/useToCheckOutSideClick/useToCheckOutSideClick";

const navBarData = [
  { id: 1, icon: BarChart2, text: "Stats", link: "/panel/influencer" },
  { id: 2, icon: MessageCircle, text: "Messages", link: "/" },
  { id: 3, icon: Bell, text: "Notification", link: "/" },
  {
    id: 4,
    icon: React.Fragment, // skip icon part
    text: (
      <Button>
        <Text sx={{ cursor: "pointer" }}>Set Profile</Text>
      </Button>
    ),
    link: "/",
  },
  {
    id: 5,
    icon: React.Fragment, // skip icon part
    text: (
      <img
        src="/images/profile.png"
        width={40}
        alt="Profile"
        style={{ borderRadius: 50, cursor: "pointer" }}
      />
    ),
    link: "/",
  },
];

const PanelNavBar = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const ref = useRef();
  useToCheckOutSideClick({
    ref,
    onClick: (check) => {
      if (check) {
        setOpenSideBar(false);
      }
    },
  });
  return (
    <Box
      sx={{
        boxShadow: "0 0 1px 1px rgba(0,0,0,.2)",
      }}
    >
      <Flex
        sx={{
          width: standardShortWidthLaptop,
          margin: "auto",
          alignItems: "center",
        }}
      >
        <Styled.h2>Influencers</Styled.h2>

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
          <img src="/images/icons/menu.svg" width="30px" alt="Menu Icon" />
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
