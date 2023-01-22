require("dotenv").config();
module.exports = {
  port: process.env.PORT || 8080,
  host: process.env.HOST,
  appUrl: process.env.APP_URL,
  jwtSecret: process.env.JWT_SECRET,
  imageUrl: process.env.IMAGE_URL,
};
