import { Grid, Box, Flex, Styled, Text, Button } from "theme-ui";
import MobileNavBar from "./MobileNavBar";
import NavBarData from "./NavBarData";
import Link from "next/link";
import SubmitProjectBtn from "../SubmitProjectBtn/SubmitProjectBtn";

const mobileContainerSXStyle = {
  display: ["flex", "none"],
  justifyContent: "flex-end",
  alignItems: "center",
};

const NavBar = () => {
  const memberBtn = (
    <Button sx={{ display: [null, "block", "none"] }}>
      <Text
        sx={{
          fontFamily: "gilroyBold",
          mr: 2,
        }}
      >
        Member
      </Text>
    </Button>
  );
  return (
    <Grid
      columns={[2, ".5fr 2fr", ".5fr 2fr 1fr"]}
      style={{ marginLeft: "auto", marginRight: "auto" }}
      sx={{
        mt: 4,
        ml: 4,
        alignItems: "center",
        // display: ["none", "none", "grid"],
      }}
    >
      <Box>
        <Flex sx={{ alignItems: "center" }}>
          <Link href="/">
            <img
              style={{ width: 70 }}
              src={
                "https://alanferrandiz.files.wordpress.com/2020/09/github_logo.png"
              }
              alt="Check My Skills Logo"
            />
          </Link>
        </Flex>
      </Box>
      {/* for tablet and small desktop */}
      <Box sx={{ display: ["none", "block"] }}>
        <Flex sx={{ alignItems: "center" }}>
          {NavBarData.map((data) => (
            <Text
              style={{ whiteSpace: "nowrap" }}
              key={data.id}
              sx={{ fontFamily: "gilroyBold", mr: 4 }}
            >
              {data.name}
            </Text>
          ))}
          {memberBtn}
        </Flex>
      </Box>
      {/* for large desktop */}
      <Box sx={{ display: ["none", "none", "block"] }}>
        <Flex sx={{ alignItems: "center", justifyContent: "flex-end" }}>
          <Text sx={{ fontFamily: "gilroyBold", mr: 3 }}>Member</Text>
          <SubmitProjectBtn />
        </Flex>
      </Box>

      <Box sx={mobileContainerSXStyle}>
        {/* {mySkillBtn} */}
        <span style={{ marginRight: 5 }}>{memberBtn}</span>
        <MobileNavBar />
      </Box>
    </Grid>
  );
};

export default NavBar;
