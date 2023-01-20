import { withIronSessionApiRoute } from "iron-session/next";

export default function withSession(handler) {
  console.log(" process.env.SECRET_COOKIE_PASSWORD ", process.env.SECRET_COOKIE_PASSWORD)
  return withIronSessionApiRoute(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: process.env.COOKIE_NAME,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });
}
