import { Box, Grid, Styled, Flex, Link as LinkStyle } from "theme-ui";
import Link from "next/link";
import {
  bgImageStyle,
  borderBottomLeftRadiusLaptop,
  borderBottomLeftRadiusMobile,
} from "../../../../../styles/commonStyle";
import useWidthMediaQuery from "../../../hooks/useWidthMediaQuery";
import { useState } from "react";

const popularPlatform = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1595039838779-f3780873afdd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    slug: "",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1597075095400-fb3f0de70140?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=335&q=80",
    slug: "",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1567443024551-f3e3cc2be870?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    slug: "",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1596526131158-52be64dcc208?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=667&q=80",
    slug: "",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1600783245998-945baf9626bc?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=667&q=80",
    slug: "",
  },
];

const Platform = () => {
  const { isSmallLaptopScreen, isMediumLaptopScreen } = useWidthMediaQuery();
  const laptopScreenBox = isSmallLaptopScreen
    ? 160
    : isMediumLaptopScreen
    ? 190
    : 200;
  return (
    <Grid sx={{}}>
      <Box>
        <Styled.h3>Popular Platform Influencers</Styled.h3>
      </Box>

      <Box mt={3}>
        <Flex sx={{ flexWrap: "wrap", justifyContent: "center" }}>
          {popularPlatform.map((platform) => (
            <Box
              key={platform.id}
              style={{
                ...bgImageStyle,
                backgroundImage: `url(${platform.image})`,
              }}
              sx={{
                borderBottomLeftRadius: [
                  borderBottomLeftRadiusMobile,
                  borderBottomLeftRadiusLaptop,
                ],
                mr: 4,
                mb: 4,
                height: [100, 110, laptopScreenBox],
                width: [100, 110, laptopScreenBox],
                minWidth: [100, 110, laptopScreenBox],
              }}
            ></Box>
          ))}
        </Flex>
      </Box>
      <Box>
        <Link href="/">
          <LinkStyle>
            <Styled.h4 style={{ cursor: "pointer" }}>
              All Platforms &rarr;
            </Styled.h4>
          </LinkStyle>
        </Link>
      </Box>
    </Grid>
  );
};

export default Platform;
