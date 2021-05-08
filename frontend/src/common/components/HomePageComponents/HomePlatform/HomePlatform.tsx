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
      "https://images.unsplash.com/photo-1611162618758-2a29a995354b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=282&q=80",
    slug: "",
  },
  {
    id: 2,
    image: "https://campaignme.com/wp-content/uploads/2020/10/loog-1200.png",
    slug: "",
  },
  {
    id: 3,
    image:
      "https://simg.nicepng.com/png/small/2-21830_-youtube-youtube-party-youtube-youtube-youtube.png",
    slug: "",
  },
  {
    id: 4,
    image:
      "https://www.seekpng.com/png/detail/19-191539_facebook-f-logo-png-transparent-background-logo-facebook.png",
    slug: "",
  },
  {
    id: 5,
    image:
      "https://cdn.pixabay.com/photo/2015/10/21/08/22/media-998990_1280.jpg",
    slug: "",
  },
];

const Platform = () => {
  const { isMiniLaptopScreen, isSmallLaptopScreen } = useWidthMediaQuery();
  const laptopScreenBox = isMiniLaptopScreen
    ? 160
    : isSmallLaptopScreen
    ? 190
    : 200;
  return (
    <Grid sx={{}}>
      <Box>
        <Styled.h3>Popular Platform Influencers</Styled.h3>
      </Box>

      <Box mt={3}>
        <Flex sx={{ flexWrap: "wrap", justifyContent: "center" }}>
          {popularPlatform.map((platform, i) => (
            <Box
              key={platform.id}
              style={{
                ...bgImageStyle,
                backgroundImage: `url(${platform.image})`,
              }}
              sx={{
                borderBottomLeftRadius: [
                  i == 0 || i == popularPlatform.length - 1
                    ? borderBottomLeftRadiusMobile
                    : 0,
                  i == 0 || i == popularPlatform.length - 1
                    ? borderBottomLeftRadiusLaptop
                    : 0,
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
