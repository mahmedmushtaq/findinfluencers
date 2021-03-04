import { Grid, Flex, Styled, Text } from "theme-ui";
import { businessStatsData } from "../../../../data";
import {
  borderBottomLeftRadiusLaptop,
  borderBottomLeftRadiusMobile,
  standardShortWidthLaptop,
  standardShortWidthMobile,
} from "../../../../../../styles/commonStyle";
import Link from "next/link";

const boxStyle: any = {
  width: [120, 200],
  height: [120, 200],
  cursor: "pointer",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  borderBottomLeftRadius: [
    borderBottomLeftRadiusMobile,
    borderBottomLeftRadiusLaptop,
  ],
};

const BusinessPanelDashboard = (props: any) => {
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
      {businessStatsData.map((singleData) => (
        <Link key={singleData.id} href={`${singleData.link}`}>
          <Flex
            color="white"
            sx={{
              ...boxStyle,
              background: singleData.background,
            }}
          >
            <Styled.h5>
              <Text>{singleData.text}</Text>
            </Styled.h5>
          </Flex>
        </Link>
      ))}
    </Grid>
  );
};

export default BusinessPanelDashboard;
