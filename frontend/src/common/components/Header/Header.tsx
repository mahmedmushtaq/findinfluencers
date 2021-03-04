import { Flex, Box } from "theme-ui";
import Search from "../HomePageComponents/HomeSearch/HomeSearch";
import NavBar from "../NavBar/FrontNavBar/NavBar";
import {
  bgImageStyle,
  standardShortWidthLaptop,
  standardShortWidthMobile,
} from "../../../../styles/commonStyle";
const Header = () => {
  return (
    <Flex
      style={{
        position: "relative",
        height: "60vh",
        width: "100%",
      }}
      sx={{ justifyContent: "center" }}
    >
      <Box
        style={{
          width: "100vw",
          height: "100%",
          ...bgImageStyle,
          backgroundImage:
            "url('https://images.unsplash.com/photo-1592329347810-258afdd206bb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80')",
        }}
        sx={{ borderBottomLeftRadius: [50, 100, 150] }}
      >
        <NavBar />
      </Box>

      {/* <img
        src="https://images.unsplash.com/photo-1592329347810-258afdd206bb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80"
        style={{ width: "100%", backgroundPosition: "center center" }}
        alt=""
      /> */}

      <Box
        style={{ position: "absolute", margin: "auto", bottom: -50 }}
        sx={{
          width: [
            standardShortWidthMobile,
            standardShortWidthMobile,
            standardShortWidthLaptop,
          ],
        }}
      >
        <Search />
      </Box>
    </Flex>
  );
};
export default Header;
