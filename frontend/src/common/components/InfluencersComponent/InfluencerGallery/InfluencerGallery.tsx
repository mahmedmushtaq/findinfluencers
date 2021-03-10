import { Grid, Box } from "theme-ui";
import { borderBottomLeftRadiusLaptop } from "../../../../../styles/commonStyle";

// https://d5ik1gor6xydq.cloudfront.net/sellers/4396/16055009251396651.jpg
// https://d5ik1gor6xydq.cloudfront.net/sellers/4396/1605500925461345.jpg
// https://d5ik1gor6xydq.cloudfront.net/sellers/4396/16075687496884186.jpg
// https://d5ik1gor6xydq.cloudfront.net/sellers/4396/16075687496884186.jpg

const InfluencerGallery = (props: { images }) => {
  const iconImagePath = "/";
  const { images } = props;
  let img1 = process.env.SERVER_URL + (images[0] || "/");
  let img2 = process.env.SERVER_URL + (images[1] || "/");
  let img3 = process.env.SERVER_URL + (images[2] || "/");
  let img4 = process.env.SERVER_URL + (images[3] || "/");
  return (
    <Grid columns={[1, "2.4fr 1fr"]}>
      <Box style={{ height: "400px" }} sx={{ borderBottomLeftRadius: [] }}>
        <img
          src={img1}
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
              src={img2}
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
              src={img3}
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
            src={img4}
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
