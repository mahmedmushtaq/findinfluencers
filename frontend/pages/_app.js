import "../styles/globals.css";
import { ThemeProvider } from "theme-ui";
import theme from "../styles/theme";
import NextNprogress from "nextjs-progressbar";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../src/lib/apollo";
import { wrapper } from "../src/store";
import "../styles/scss/App.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSmile, faImage } from "@fortawesome/free-regular-svg-icons";
import {
  faSpinner,
  faEllipsisV,
  faUserPlus,
  faSignOutAlt,
  faTrash,
  faCaretDown,
  faUpload,
  faTimes,
  faBell,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faSmile,
  faImage,
  faSpinner,
  faEllipsisV,
  faUserPlus,
  faSignOutAlt,
  faTrash,
  faCaretDown,
  faUpload,
  faTimes,
  faBell
);

// export function reportWebVitals(metric) {
//   switch (metric.name) {
//     case 'FCP':
//       // handle FCP results
//       console.log("First Content Full Paint = ", metric)
//       break
//     case 'LCP':
//       // handle LCP results
//       console.log("Largest Content Full Paint = ", metric)
//       break
//     case 'CLS':
//       // handle CLS results
//       console.log("Cumulative Layout = ", metric)
//       break
//     case 'FID':
//       // handle FID results
//       console.log("First Input Display = ", metric)
//       break
//     case 'TTFB':
//       // handle TTFB results
//       break
//     default:
//       break
//   }
// }

const initialState = {
  token: "",
  email: "",
  id: "",
  role: "",
  username: "",
};

function MyApp({ Component, pageProps, router }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  // useEffect(() => {
  //   (async () => {
  //     // fetch user data on the client side
  //     const res = await getCurrentUser({});
  //     con.connect(res.token);
  //     dispatch({ type: "ADD_USER", payload: res });
  //     setUser(res);
  //   })();
  // }, []);
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={apolloClient}>
        <NextNprogress
          color="hsl(10, 80%, 50%)"
          startPosition={0.3}
          stopDelayMs={200}
          height="3"
        />
        <Component {...pageProps} key={router.route} />
      </ApolloProvider>
    </ThemeProvider>
  );
}

// I have not used getInitialProps due to this reason
// https://stackoverflow.com/questions/59130305/does-using-getinitialprops-in-custom-app-component-in-next-js-disable-client
// if you have any suggestions, suggest me

// remove this because it effect on static site generateion
// MyApp.getInitialProps = async (appContext) => {
//   let pageProps = {};
//   // const token = await getToken(appContext.ctx);
//   let user = await getCurrentUser(appContext.ctx);

//   appContext.ctx.store.dispatch({ type: TYPES.ADD_USER, payload: user });

//   if (appContext.Component.getInitialProps) {
//     // if initialProps calls on other Component
//     pageProps = await appContext.Component.getInitialProps(
//       appContext.ctx,
//       user
//     );
//   }

//   return {
//     pageProps,
//     user,
//   };
// };

export default wrapper.withRedux(MyApp);
