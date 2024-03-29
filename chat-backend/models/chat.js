"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // indirect relation to user
      this.belongsToMany(models.User, {
        through: "ChatUser",
        foreignKey: "chatId",
      });

      // inverse relation to chatUser
      this.hasMany(models.ChatUser, {
        foreignKey: "chatId",
      });

      this.hasMany(models.Message, {
        foreignKey: "chatId",
      });
      this.hasMany(models.MessageSeen, {
        foreignKey: "chatId",
      });
    }
  }
  Chat.init(
    {
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Chat",
    }
  );
  return Chat;
};
