// this component is used to show images when user want to update the profile again

import { Box, Flex } from "theme-ui";

// In imagesProps, image url is present
const SelectedImages = ({ images }) => {
  return (
    <Box>
      <Flex sx={{ alignItems: "center" }}>
        {images.map((img, index) => (
          <Box key={index} ml={2} mr={2}>
            <img
              width={100}
              src={process.env.SERVER_URL + img}
              alt="Selected"
            />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default SelectedImages;
