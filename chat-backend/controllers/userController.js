const User = require("../models").User;
const sequelize = require("sequelize");

exports.me = async (req,res)=>{
  return res.send(req.user);
}

exports.update = async (req, res) => {
  if (req.file && req.file.filename) {
    req.body.avatar = req.file.filename;
  }

  try {
    const [rows, result] = await User.update(req.body, {
      where: {
        id: req.user.id,
      },
      returning: true, // return update rows result
      idividualHooks: true, // will execute hooks
    });

    const user = result[0].get({ raw: true });
    user.avatar = result[0].avatar;
    delete user.password;
    return res.send(user);
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }

  return res.send(req.body);
};

exports.search = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        [sequelize.Op.or]: {
          namesConcated: sequelize.where(
            sequelize.fn(
              "concat",
              sequelize.col("firstName"),
              " ",
              sequelize.col("lastName")
            ),
            {
              [sequelize.Op.iLike]: `%${req.query.term}%`,
            }
          ),
          email: {
            [sequelize.Op.iLike]: `%${req.query.term}%`,
          },
        },
        [sequelize.Op.not]: {
          id: req.user.id,
        },
      },
      limit: 10,
    });

    return res.json(users);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
