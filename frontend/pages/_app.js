import "../styles/globals.css";
import { ThemeProvider } from "theme-ui";
import theme from "../styles/theme";
import NextNprogress from "nextjs-progressbar";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../src/lib/apollo";
import { wrapper } from "../src/store";
import { con } from "../src/socket";
import { useEffect } from "react";

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

function MyApp({ Component, pageProps, router }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  useEffect(() => {
    con.connect();
  }, []);
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
