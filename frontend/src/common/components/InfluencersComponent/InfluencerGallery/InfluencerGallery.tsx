import { Grid, Box } from "theme-ui";
import { borderBottomLeftRadiusLaptop } from "../../../../../styles/commonStyle";

const InfluencerGallery = (props: any) => {
  return (
    <Grid columns={[1, "2.4fr 1fr"]}>
      <Box style={{ height: "400px" }} sx={{ borderBottomLeftRadius: [] }}>
        <img
          src="https://d5ik1gor6xydq.cloudfront.net/sellers/4396/16055009251396651.jpg"
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderBottomLeftRadius: borderBottomLeftRadiusLaptop,
          }}
        />
      </Box>
      <Box>
        <Grid columns={2}>
          <Box sx={{ height: 200 }}>
            <img
              src="https://d5ik1gor6xydq.cloudfront.net/sellers/4396/1605500925461345.jpg"
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
          <Box sx={{ height: 200 }}>
            <img
              src="https://d5ik1gor6xydq.cloudfront.net/sellers/4396/16075687496884186.jpg"
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        </Grid>

        <Box mt={3} sx={{ height: 180 }}>
          <img
            src="https://d5ik1gor6xydq.cloudfront.net/sellers/4396/16075687496884186.jpg"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
    </Grid>
  );
};

export default InfluencerGallery;
