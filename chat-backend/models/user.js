"use strict";

const config = require("../config/app");

const { Model } = require("sequelize");
const Password = require("../utils/password");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Chat, {
        through: "ChatUser",
        foreignKey: "userId",
      });

      this.hasMany(models.ChatUser, { foreignKey: "userId" });
      this.hasMany(models.MessageSeen, { foreignKey: "userId" });
      // this.belongsToMany(models.MessageSeen, {
      //   foreignKey: "userId",
      // });

      // this.belongsToMany(models.MessageSeen, {
      //   foreignKey: "userId",
      // });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      gender: DataTypes.STRING,
      avatar: {
        type: DataTypes.STRING,
        get() {
          const avatar = this.getDataValue("avatar");
          const url = config.host || `${config.appUrl}:${config.port}`;
          if (!avatar) {
            return `${url}/${this.getDataValue("gender") || "male"}.svg`;
          }

          const id = this.getDataValue("id");
          return `${url}/user/${id}/${avatar}`;
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword,
      },
    }
  );
  return User;
};

const hashPassword = async (user) => {
  if (user.changed("password")) {
    user.password = await Password.toHash(user.password);
  }

  return user;
};
