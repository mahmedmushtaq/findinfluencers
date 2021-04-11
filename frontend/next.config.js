const path = require("path");

module.exports = (phase, { defaultConfig }) => {
  return {
    /* config options here */
    sassOptions: {
      includePaths: [path.join(__dirname, "styles/scss")],
    },
    env: {
      SERVER_URL: "http://localhost:4000",
    },
  };
};
