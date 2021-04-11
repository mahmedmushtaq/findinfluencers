"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MessageSeen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Message, { foreignKey: "messageId" });
      this.belongsTo(models.User, { foreignKey: "userId" });
      this.belongsTo(models.Chat, { foreignKey: "chatId" });
    }
  }
  MessageSeen.init(
    {
      chatId: DataTypes.INTEGER,
      messageId: DataTypes.INTEGER,
      userId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "MessageSeen",
    }
  );
  return MessageSeen;
};
