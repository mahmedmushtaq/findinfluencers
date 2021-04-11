"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "MessageSeens",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        chatId: {
          type: Sequelize.INTEGER,
          references: {
            model: "Chats",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        messageId: {
          type: Sequelize.INTEGER,
          references: {
            model: "Messages",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        userId: {
          type: Sequelize.STRING,
          references: {
            model: "Users",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("NOW()"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("NOW()"),
        },
      },
      {
        indexes: [
          {
            unique: true,
            fields: ["chatId", "messageId", "userId"],
          },
        ],
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("MessageSeens");
  },
};
