import Router from "next/router";
import { useRef, useState } from "react";
import { Grid, Styled, Flex, Box, Text } from "theme-ui";
import PlatformDropDown from "./PlatformDropDown";
import CategoryDropDown from "./CategoryDropDown";
import RateDropDown from "./RateDropDown";
import { useToCheckOutSideClick } from "../../../hooks";
import { borderBottomLeftRadiusLaptop } from "../../../../../styles/commonStyle";
import { useQuery } from "@apollo/client";
import { LOAD_SEARCH_FILTERS } from "../../../../lib/graphql";

const initialState = {
  platform: false,
  category: false,
  price: false,
};

const Search = () => {
  const [showDropDown, setShowDropDown] = useState(initialState);
  const ref = useRef();
  const [selectedCategory, setSelectedCategory] = useState<any>();
  const [selectedPlatform, setSelectedPlatform] = useState<any>();
  const [selectedRate, setSelectedRate] = useState<number[]>();
  const { data, error } = useQuery(LOAD_SEARCH_FILTERS, { errorPolicy: "all" });

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

  const searchBtn = () => {
    let category = "any",
      platform = "any",
      rate = [];
    if (selectedPlatform) {
      platform = selectedPlatform.name;
    }
    if (selectedCategory) {
      category = selectedCategory.name;
    }
    if (selectedRate) {
      rate = selectedRate;
    }

    Router.push({
      pathname: "/influencers/searchinfluencers",
      query: { category, platform, rate },
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
            <Text
              as={"h3"}
              sx={{ fontFamily: "gilroyBold", textTransform: "capitalize" }}
            >
              {selectedPlatform ? selectedPlatform.name : "Platform"}
            </Text>
            <Text sx={{ display: ["none", "block"] }}>Chose a platform</Text>

            <PlatformDropDown
              setSelectedPlatform={setSelectedPlatform}
              showDropDown={showDropDown.platform}
              platformsList={data ? data.platforms : []}
            />
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
            <Text
              as={"h3"}
              sx={{ fontFamily: "gilroyBold", textTransform: "capitalize" }}
            >
              {selectedCategory ? selectedCategory.name : "Category"}
            </Text>
            <Text sx={{ display: ["none", "block"] }}>Chose a category</Text>
            <CategoryDropDown
              setSelectedCategory={setSelectedCategory}
              showDropDown={showDropDown.category}
              categoriesList={data ? data.categories : []}
            />
          </Box>
        </Box>

        <Box
          style={{
            textAlign: "center",
          }}
          sx={{ display: ["none", "block"] }}
          onClick={() => setDropDownVisibility("price")}
        >
          <Box style={{ cursor: "pointer" }}>
            <Text as={"h3"} sx={{ fontFamily: "gilroyBold" }}>
              {selectedRate
                ? "From $" +
                  selectedRate[0] +
                  "/hr to $" +
                  selectedRate[1] +
                  "/hr"
                : "Rate/Price"}
            </Text>
            <Text>Select your budget</Text>
            <RateDropDown
              showDropDown={showDropDown.price}
              rateRange={data ? data.profileRates.rateRange : [0, 0]}
              setSelectedRate={setSelectedRate}
            />
          </Box>
        </Box>

        {/* search icon */}
        <Box
          style={{ marginLeft: "auto" }}
          sx={{ marginRight: [0, 0, 50], cursor: "pointer" }}
          onClick={searchBtn}
        >
          <img width={30} src="/images/icons/search.svg" alt="Search icon" />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Search;
