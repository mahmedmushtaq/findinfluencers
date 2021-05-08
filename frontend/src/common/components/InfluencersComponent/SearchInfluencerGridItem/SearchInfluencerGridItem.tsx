import Link from "next/link";
import { Box, Text, Image } from "theme-ui";
import {
  bgImageStyle,
  textOverflowEllipseStyle,
} from "../../../../../styles/commonStyle";

const fullWidth = {
  width: "100%",
};

interface props {
  data: {
    id: string;
    images: string[];
    category: {
      name: string;
    }[];
    platformProfileInfo: {
      profileName: string;
      profileUrl: string;
      rate: number[];
      platform: {
        name;
      };
    }[];
    user: {
      full_name: string;
      username: string;
    };
  };
}

const commonDesign = {
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  borderBottomLeftRadius: 50,
  borderBottomRightRadius: 10,
};

const HomeInfluencerGridItem = (props: props) => {
  const MAX_WIDTH = 210;
  const MAX_HEIGHT = 210;
  const { data } = props;

  let image = process.env.SERVER_URL + data.images[0];
  return (
    <Box style={{ cursor: "pointer" }}>
      <Box
        // style={{
        //   position: "relative",
        // }}
        sx={{
          width: [MAX_WIDTH - 100, MAX_WIDTH - 40, MAX_WIDTH],
          height: [MAX_HEIGHT - 100, MAX_HEIGHT - 40, MAX_HEIGHT],
        }}
      >
        <Link
          href={{
            pathname: "/influencers/[slug]",
            query: { slug: data.user.username },
          }}
        >
          <a>
            <Box
              style={{
                // ...bgImageStyle,
                // backgroundImage: `url(${})`,
                ...fullWidth,
                position: "relative",

                height: "100%",
              }}
              sx={{
                ...commonDesign,
              }}
            >
              <Text
                sx={{ fontSize: 1, borderBottomLeftRadius: [20, 50, 50] }}
                style={{
                  marginTop: "auto",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  color: "white",
                  padding: "10px 30px",
                  ...fullWidth,
                  ...textOverflowEllipseStyle,
                  background: "linear-gradient(to right, #ef3b36, #ffffff)",
                }}
              >
                {data.user.full_name}
              </Text>
              <Image
                src={image}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center center",
                }}
                sx={{ borderBottomLeftRadius: [20, 20, 40] }}
              />
            </Box>
          </a>
        </Link>
      </Box>
      <Text
        as="h4"
        sx={{ fontFamily: "gilroyBold" }}
        mt={3}
        style={{ fontSize: 10 }}
      >
        {data.category[0].name}
      </Text>
      <Text
        sx={{
          fontSize: 2,
          width: [MAX_WIDTH - 100, MAX_WIDTH - 40, MAX_WIDTH],
          fontFamily: "gilroyBold",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {data.platformProfileInfo[0].platform.name}
      </Text>
    </Box>
  );
};

export default HomeInfluencerGridItem;
