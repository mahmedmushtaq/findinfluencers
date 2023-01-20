require("dotenv").config();
module.exports = {
  port: process.env.PORT,
  appUrl: process.env.APP_URL,
  jwtSecret: process.env.JWT_SECRET,
  imageUrl: process.env.IMAGE_URL,
};
