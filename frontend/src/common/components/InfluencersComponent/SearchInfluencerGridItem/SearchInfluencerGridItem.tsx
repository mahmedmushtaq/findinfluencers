import Link from "next/link";
import { Box, Text } from "theme-ui";
import { bgImageStyle } from "../../../styles/commonStyle";

const fullWidth = {
  width: "100%",
};

interface props {
  name: string;
  slug: string;
  platform: string;
  category: string;
  title: string;
  image: string;
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
  const { name, platform, category, title, image, slug } = props;
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
        <Link href={{ pathname: "/influencers/[slug]", query: { slug } }}>
          <a>
            <Box
              style={{
                ...bgImageStyle,
                backgroundImage: `url(${image})`,
                ...fullWidth,

                height: "100%",
              }}
              sx={{
                ...commonDesign,
                borderBottomLeftRadius: [20, 20, 40],
              }}
            >
              <Text
                sx={{ fontSize: 1, borderBottomLeftRadius: [20, 50, 50] }}
                style={{
                  marginTop: "auto",

                  color: "white",
                  padding: "10px 30px",
                  ...fullWidth,

                  background: "linear-gradient(to right, #ef3b36, #ffffff)",
                }}
              >
                {name}
              </Text>
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
        {category}
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
        {title}
      </Text>
    </Box>
  );
};

export default HomeInfluencerGridItem;
