const path = require("path");

module.exports = (phase, { defaultConfig }) => {
  return {
    /* config options here */
    sassOptions: {
      includePaths: [path.join(__dirname, "styles/scss")],
    },
    env: {
      SERVER_URL: "http://localhost:4000",
      CHAT_APP_URL: "http://localhost:4001",
      STRIPE_PK : "pk_test_rjZwSW567Ub2Phf3etwK4UIw00VC3Leu0w",
    },
  };
};
