import { Box, Grid, Styled, Flex, Link as LinkStyle, Image } from "theme-ui";
import Link from "next/link";
import {
  bgImageStyle,
  borderBottomLeftRadiusLaptop,
  borderBottomLeftRadiusMobile,
} from "../../../../../styles/commonStyle";
import useWidthMediaQuery from "../../../hooks/useWidthMediaQuery";
import { useEffect, useState } from "react";

const popularPlatform = [
  {
    id: 1,
    image: "/images/icons/insta_vector.svg",
    slug: "/influencers/searchinfluencers?category=any&platform=instagram",
  },
  {
    id: 2,
    image:
      "https://i.pinimg.com/originals/8e/1d/1c/8e1d1cee4879db1796c87f0a620afe6a.png",
    slug: "/influencers/searchinfluencers?category=any&platform=tiktok",
  },
  {
    id: 3,
    image: "/images/icons/youtube_vector.svg",
    slug: "/influencers/searchinfluencers?category=any&platform=youtube",
  },
  {
    id: 4,
    image: "/images/icons/facebook_vector.svg",
    slug: "/influencers/searchinfluencers?category=any&platform=facebook",
  },
  {
    id: 5,
    image: "/images/icons/twitter_vector.svg",
    slug: "/influencers/searchinfluencers?category=any&platform=twitter",
  },
];

const Platform = () => {
  const {
    isMiniLaptopScreen,
    isSmallLaptopScreen,
    isSmallTabletScreen,
  } = useWidthMediaQuery();

  const [screenWidth, setScreenWidth] = useState({
    laptopScreenBox: 200,
    tabletScreen: 110,
  });

  useEffect(() => {
    const laptopScreenBox = isMiniLaptopScreen
      ? 140
      : isSmallLaptopScreen
      ? 190
      : 200;
    const tabletScreen = isSmallTabletScreen ? 80 : 110;

    setScreenWidth({ laptopScreenBox, tabletScreen });
  }, [isMiniLaptopScreen, isSmallLaptopScreen, isSmallTabletScreen]);

  return (
    <Grid sx={{}}>
      <Box>
        <Styled.h3>Popular Platforms</Styled.h3>
      </Box>

      <Box mt={3}>
        <Flex sx={{ flexWrap: "wrap", justifyContent: "center" }}>
          {popularPlatform.map((platform, i) => (
            <Link key={platform.id} href={{ pathname: platform.slug }}>
              <a>
                <Box
                  style={
                    {
                      // ...bgImageStyle,
                      // backgroundImage: `url(${platform.image})`,
                    }
                  }
                  sx={{
                    mr: 4,
                    mb: 4,
                    height: [
                      100,
                      screenWidth.tabletScreen,
                      screenWidth.laptopScreenBox,
                    ],
                    width: [
                      100,
                      screenWidth.tabletScreen,
                      screenWidth.laptopScreenBox,
                    ],
                    minWidth: [
                      100,
                      screenWidth.tabletScreen,
                      screenWidth.laptopScreenBox,
                    ],
                  }}
                >
                  <Image
                    sx={{
                      width: "100%",
                      height: "100%",
                    }}
                    src={platform.image}
                    alt="Platform Image"
                  />
                </Box>
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
