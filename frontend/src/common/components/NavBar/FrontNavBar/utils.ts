export const setHeading = (user) => {
  let url = "/join",
    heading = "Join";
  if (user && user.isLoggedIn) {
    // user is logged in
    heading = "Panel";
    if (user && user.role === "influencer") {
      url = "/panel";
    } else if (user && user.role === "buyer") {
      // set buyer heading
      url="/panel/business"
    } else if( user && user.role === "admin") {
      url = "/admin";
    }
  }

  return { url, heading };
};
