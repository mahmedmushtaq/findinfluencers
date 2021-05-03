const path = require("path");

module.exports = (phase, { defaultConfig }) => {
  return {
    /* config options here */
    sassOptions: {
      includePaths: [path.join(__dirname, "styles/scss")],
    },
    env: {
      SERVER_URL: process.env.SERVER_URL,
      CHAT_APP_URL: process.env.CHAT_APP_URL,
      STRIPE_PK: process.env.STRIPE_PK,
      GRAPHQL_SERVER_HOST: process.env.GRAPHQL_SERVER_HOST,
    },
    serverRuntimeConfig: {
      // Will only be available on the server side
      GRAPHQL_SERVER_HOST: process.env.GRAPHQL_SERVER_HOST,
    },
    publicRuntimeConfig: {
      // Will be available on both server and client
      staticFolder: "/static",
    },
  };
};
