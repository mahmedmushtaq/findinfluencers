let setToken = "";
import fetchData from "isomorphic-fetch";

export const getCurrentUser = async (context) => {
  let response;
  if (typeof window === "undefined") {
    // on server side call api to check user is logged In
    const { req } = context;
    response = await fetchData(process.env.HOST + "/api/auth/user", {
      headers: req.headers,
    });
  } else {
    // browser will automatically pass the cookie with the request
    response = await fetchData("/api/auth/user");
  }

  const user = await response.json();
  return user;
};