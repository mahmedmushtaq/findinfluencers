import { Box, Styled } from "theme-ui";

const logoContainerStyleCSS: any = {
  padding: "8px 0",
  textAlign: "center",
  color: "white",
  marginLeft: 10,
};

const logoStyle = { margin: 0 };

const Logo = () => {
  return (
    <Box
      css={{ ...logoContainerStyleCSS }}
      sx={{ bg: "primary", width: [50, 60, 80] }}
    >
      <Styled.h1 style={logoStyle}>C</Styled.h1>
    </Box>
  );
};

export default Logo;
