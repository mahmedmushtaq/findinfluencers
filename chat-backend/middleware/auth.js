const jwt = require("jsonwebtoken");
const config = require("../config/app");
const User = require("../models/").User;

exports.auth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Authentication is required" });
  }

  try {
    const userData = await jwt.verify(token, config.appKey);

    try {
      const user = await User.findOne({ where: { id: userData.id } });
      console.log("user is = ", user);

      console.log(user.get({ raw: true }));

      req.user = user.get({ raw: true });
      next();
    } catch (err) {
      return res.status(401).json({ error: err });
    }
    //
  } catch (err) {
    return res.status(401).json({ error: err });
  }
};
