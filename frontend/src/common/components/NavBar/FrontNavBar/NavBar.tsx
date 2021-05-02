import { Grid, Box, Flex, Styled, Text, Button } from "theme-ui";
import Link from "next/link";
import {
  standardShortWidthLaptop,
  standardShortWidthMobile,
  borderBottomLeftRadiusMobile,
} from "../../../../../styles/commonStyle";
import { setHeading } from "./utils";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../../../lib/currentUser";
import { useEffect, useState, useCallback } from "react";

const NavBar = () => {
  const isUserPresentInStore = useSelector(
    (store: RootStateOrAny) => store.user
  );
  const [user, setUser] = useState<any>(isUserPresentInStore); //useSelector((store: RootStateOrAny) => store.user);
  const { url, heading } = setHeading(user);
  const dispatch = useDispatch();

  const loadUser = useCallback(async () => {
    if (!isUserPresentInStore.token) {
      // when page is refresh then no user will present on store therefore we need to check
      const res = await getCurrentUser({});

      setUser(res);
    } else {
      console.log("user is already present");
    }
  }, [dispatch]);

  useEffect(() => {
    console.log("use effect is called");
    loadUser();
  }, [loadUser]);

  return (
    <Grid
      columns={2}
      color="background"
      sx={{
        width: [standardShortWidthMobile, "100%", standardShortWidthLaptop],
        justifyItems: "center",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <Box>
        <Styled.h1>
          <Text>
            <Link href="/">
              <a>HireInfluencerss</a>
            </Link>
          </Text>
        </Styled.h1>
      </Box>

      <Flex sx={{ alignItems: "center" }}>
        {/* <Styled.h4>
          <Text mr={4}>
            <Link href="/whyus">
              <a>Why Us</a>
            </Link>
          </Text>
        </Styled.h4> */}
        <Button sx={{ borderBottomLeftRadius: borderBottomLeftRadiusMobile }}>
          <Styled.h4>
            <Text
              sx={{
                padding: "0 20px",
              }}
            >
              <Link href={url}>
                <a> {heading}</a>
              </Link>
            </Text>
          </Styled.h4>
        </Button>
      </Flex>
    </Grid>
  );
};

export default NavBar;
