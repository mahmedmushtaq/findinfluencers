import { Grid, Flex, Styled, Text } from "theme-ui";
import InfluencerPanel from "../../../../../pages/panel/influencer";
import { statsData } from "../../../../data";
import {
  standardShortWidthLaptop,
  standardShortWidthMobile,
} from "../../../../styles/commonStyle";
import Link from "next/link";

const boxStyle: any = {
  width: [120, 200],
  height: [120, 200],
  cursor: "pointer",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
};

const InfluencerPanelStats = (props: any) => {
  return (
    <Grid
      columns={[2, 3]}
      sx={{
        alignItems: "center",
        justifyContent: "center",
        justifyItems: "center",
        pt: 4,
        width: [
          standardShortWidthMobile,
          standardShortWidthMobile,
          standardShortWidthLaptop,
        ],
        margin: "20px auto",
      }}
    >
      {statsData.map((singleData) => (
        <Flex
          key={singleData.id}
          color="white"
          sx={{
            ...boxStyle,
            background: singleData.background,
          }}
        >
          <Styled.h5>
            <Link href={`${singleData.link}`}>
              <Text>{singleData.text}</Text>
            </Link>
          </Styled.h5>
        </Flex>
      ))}
    </Grid>
  );
};

export default InfluencerPanelStats;
