import Router from "next/router";
import { getCurrentUser } from "../../../../lib/currentUser";

// role = skip mean check only user authentication not authorization
const ProtectedRoutes = (
  Component: any,
  role: "admin" | "influencer" | "buyer" | "skip" = "influencer"
) => {
  const ProtectedComponent = ({ ...props }) => <Component {...props} />;

  // HOC getInitialProps Function
  ProtectedComponent.getInitialProps = async (ctx) => {
    // return user to signIn page if user is not logged In
    const user = await getCurrentUser(ctx);
    if (
      ctx.req &&
      (!user.isLoggedIn || (role !== "skip" && user.role !== role))
    ) {
      // on server side,
      ctx.res.writeHead(302, { Location: "/join" });
      ctx.res.end();
      return {};
    }

    // We already checked for server. This should only happen on client.
    if (role !== "skip" && (!user.isLoggedIn || user.role !== role)) {
      Router.push("/join");
      return {};
    }

    // Call Inner Component InitialProps Function and return the innerComponent InitialValue From HOC initialPropsFunction
    const innerComponentProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx, user)
      : { user };
    return { ...innerComponentProps };
  };

  return ProtectedComponent;
};

export default ProtectedRoutes;
