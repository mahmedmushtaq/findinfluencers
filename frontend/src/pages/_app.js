import "../common/styles/globals.css";
import { ThemeProvider } from "theme-ui";
import theme from "../common/styles/theme";
import NextNprogress from "nextjs-progressbar";

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
  return (
    <ThemeProvider theme={theme}>
      <NextNprogress
        color="hsl(10, 80%, 50%)"
        startPosition={0.3}
        stopDelayMs={200}
        height="3"
      />
      <Component {...pageProps} key={router.route} />
    </ThemeProvider>
  );
}

export default MyApp;
