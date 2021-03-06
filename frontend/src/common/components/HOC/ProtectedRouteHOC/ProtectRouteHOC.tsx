import Router from "next/router";

const ProtectedRoutes = (
  Component: any,
  role: "admin" | "influencer" | "buyer" = "influencer"
) => {
  const ProtectedComponent = ({ ...props }) => <Component {...props} />;

  // HOC getInitialProps Function
  ProtectedComponent.getInitialProps = async (ctx, user) => {
    // return user to signIn page if user is not logged In
    if (ctx.req && (!user.isLoggedIn || user.role !== role)) {
      // on server side,
      ctx.res.writeHead(302, { Location: "/join" });
      ctx.res.end();
      return;
    }

    // We already checked for server. This should only happen on client.
    if (!user.isLoggedIn || user.role !== role) {
      Router.push("/join");
      return;
    }
    // Call Inner Component InitialProps Function and return the innerComponent InitialValue From HOC initialPropsFunction
    const innerComponentProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx, user)
      : {};
    return { ...innerComponentProps };
  };

  return ProtectedComponent;
};

export default ProtectedRoutes;
