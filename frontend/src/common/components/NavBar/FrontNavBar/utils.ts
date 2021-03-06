export const setHeading = (user) => {
  let url = "/join",
    heading = "Join";
  if (user.isLoggedIn) {
    // user is logged in
    heading = "Panel";
    if (user.role === "influencer") {
      url = "/panel";
    } else if (user.role === "buyer") {
      // set buyer heading
    } else {
      url = "/admin";
    }
  }

  return { url, heading };
};
