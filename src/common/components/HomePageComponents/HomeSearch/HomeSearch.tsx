import { DropDown } from "../../index";
import { useRef, useState } from "react";
import { Grid, Styled, Flex, Box, Text } from "theme-ui";
import PlatformDropDown from "./PlatformDropDown";
import CategoryDropDown from "./CategoryDropDown";
import { useToCheckOutSideClick } from "../../../hooks";
import { borderBottomLeftRadiusLaptop } from "../../../styles/commonStyle";

const initialState = {
  platform: false,
  category: false,
  price: false,
};

const Search = () => {
  const [showDropDown, setShowDropDown] = useState(initialState);
  const ref = useRef();
  useToCheckOutSideClick({
    ref,
    onClick: (check: boolean) => {
      if (check) setShowDropDown({ ...initialState });
    },
  });
  const setDropDownVisibility = (key) => {
    setShowDropDown({
      ...initialState,
      [key]: !showDropDown[key],
    });
  };
  return (
    <Grid
      columns={1}
      mt={5}
      sx={{
        justifyItems: "center",
        alignItems: "center",
        ml: "auto",
        mr: "auto",
      }}
    >
      <Styled.h2>
        <Text sx={{ color: "white" }}>Find Influencers For Your Business</Text>
      </Styled.h2>
      <Grid
        ref={ref}
        columns={["1fr 1fr .5fr", "1fr 1fr 1fr .2fr"]}
        sx={{
          width: "100%",
          minHeight: 100,
          padding: [3, 0],
          boxShadow: "0 0 5px 1px rgba(0,0,0,.2)",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: borderBottomLeftRadiusLaptop,
          borderBottomRightRadius: 10,
          border: "none",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Box
          style={{
            textAlign: "center",
            borderRight: "1px solid black",
          }}
        >
          <Box
            style={{
              cursor: "pointer",
              //position: "relative",
            }}
            onClick={() => setDropDownVisibility("platform")}
          >
            <Text as={"h3"} sx={{ fontFamily: "gilroyBold" }}>
              Platform
            </Text>
            <Text sx={{ display: ["none", "block"] }}>Chose a platform</Text>

            <PlatformDropDown showDropDown={showDropDown.platform} />
          </Box>
        </Box>
        <Box
          style={{
            textAlign: "center",
            borderRight: "1px solid black",
          }}
        >
          <Box
            style={{ cursor: "pointer" }}
            onClick={() => setDropDownVisibility("category")}
          >
            <Text as={"h3"} sx={{ fontFamily: "gilroyBold" }}>
              Category
            </Text>
            <Text sx={{ display: ["none", "block"] }}>Chose a category</Text>
            <CategoryDropDown showDropDown={showDropDown.category} />
          </Box>
        </Box>

        <Box
          style={{
            textAlign: "center",
          }}
          sx={{ display: ["none", "block"] }}
        >
          <Box style={{ cursor: "pointer" }}>
            <Text as={"h3"} sx={{ fontFamily: "gilroyBold" }}>
              Price
            </Text>
            <Text>Select your budget</Text>
          </Box>
        </Box>

        {/* search icon */}
        <Box style={{ marginLeft: "auto" }} sx={{ marginRight: [0, 0, 50] }}>
          <img width={30} src="/images/icons/search.svg" alt="Search icon" />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Search;
