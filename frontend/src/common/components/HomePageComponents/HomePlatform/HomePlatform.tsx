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
      "https://www.flaticon.com/svg/vstatic/svg/174/174855.svg?token=exp=1620498080~hmac=ce0d378426cacb6f9b8d0273a115461b",
    slug: "influencers/searchinfluencers?category=any&platform=instagram",
  },
  {
    id: 2,
    image:
      "https://i.pinimg.com/originals/8e/1d/1c/8e1d1cee4879db1796c87f0a620afe6a.png",
    slug: "influencers/searchinfluencers?category=any&platform=tiktok",
  },
  {
    id: 3,
    image:
      "https://www.flaticon.com/svg/vstatic/svg/179/179346.svg?token=exp=1620496390~hmac=b346ae3694f98a6018f78569dade654e",
    slug: "influencers/searchinfluencers?category=any&platform=youtube",
  },
  {
    id: 4,
    image:
      "https://www.flaticon.com/svg/vstatic/svg/1312/1312139.svg?token=exp=1620496457~hmac=4744623e71529adfc7ea7d2200352eca",
    slug: "influencers/searchinfluencers?category=any&platform=facebook",
  },
  {
    id: 5,
    image:
      "https://www.flaticon.com/svg/vstatic/svg/733/733579.svg?token=exp=1620496547~hmac=4e261043dfdf0c10d5b7d740fd3b88b8",
    slug: "influencers/searchinfluencers?category=any&platform=twitter",
  },
];

const Platform = () => {
  const { isMiniLaptopScreen, isSmallLaptopScreen } = useWidthMediaQuery();
  const laptopScreenBox = isMiniLaptopScreen
    ? 140
    : isSmallLaptopScreen
    ? 190
    : 200;

  return (
    <Grid sx={{}}>
      <Box>
        <Styled.h3>Popular Platforms</Styled.h3>
      </Box>

      <Box mt={3}>
        <Flex sx={{ flexWrap: "wrap", justifyContent: "center" }}>
          {popularPlatform.map((platform, i) => (
            <Link key={platform.id} href={`${platform.slug}`}>
              <a>
                <Box
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
              </a>
            </Link>
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
