import { BarChart2, Bell, MessageCircle } from "react-feather";
import React from "react";
import { Button, Text } from "theme-ui";
import { borderBottomLeftRadiusMobile } from "../../../../../styles/commonStyle";

export const influencerPanelNavBarData = [
  { id: 1, icon: BarChart2, text: "Stats", link: "/panel" },
  { id: 2, icon: MessageCircle, text: "Messages", link: "/panel/messages" },
  { id: 3, icon: Bell, text: "Notification", link: "/panel/notifications" },
  {
    id: 4,
    icon: React.Fragment, // skip icon part
    text: (
      <Button
        sx={{
          borderBottomLeftRadius: borderBottomLeftRadiusMobile,
          ":focus": { outline: "none" },
        }}
      >
        <Text sx={{ cursor: "pointer" }}>Set Profile</Text>
      </Button>
    ),
    link: "/panel/profile",
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
    link: "/panel/settings",
  },
];

export const businessPanelNavBarData = [
  { id: 1, icon: BarChart2, text: "Dashboard", link: "/panel/business" },
  {
    id: 2,
    icon: MessageCircle,
    text: "Messages",
    link: "/panel/business/messages",
  },
  {
    id: 3,
    icon: Bell,
    text: "Notification",
    link: "/panel/business/notifications",
  },
  {
    id: 4,
    icon: <></>,
    text: (
      <Button
        sx={{
          borderBottomLeftRadius: borderBottomLeftRadiusMobile,
          ":focus": { outline: "none" },
        }}
      >
        <Text sx={{ cursor: "pointer" }}>Search Influencers</Text>
      </Button>
    ),
    link: "/influencers/searchinfluencers",
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
    link: "/panel/business/settings",
  },
];
