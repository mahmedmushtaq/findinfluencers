const { check } = require("express-validator");
const { Op } = require("sequelize");
const { sequelize } = require("../models");
const model = require("../models");
const { chatsSelectionSort } = require("../utils/sortChats");
const { User, Chat, ChatUser, Message, MessageSeen } = model;

exports.Index = async (req, res) => {
  // retreive all chats, to whom he was chatting (not include himself) and messages

  const user = await User.findOne({
    where: {
      id: req.user.id,
    },
    include: [
      {
        model: Chat,
        include: [
          {
            model: User,
            where: {
              [Op.not]: {
                id: req.user.id,
              },
            },
          },
          {
            model: Message,
            include: [
              // {
              //   model: User,
              //   order: [[sequelize.literal('"id"'), "DESC"]],
              // },
            ],

            order: [[sequelize.literal('"id"'), "DESC"]], // [["id", "DESC"]],
            offset: 0,
            limit: 15,
          },
        ],
      },
    ],
  });

  console.log(user.toJSON().Chats[0]);
  const chatsSort = chatsSelectionSort(user.toJSON().Chats);

  const attachMessageSeenAttachmentMap = chatsSort.map(async (chat) => {
    // if last message is seen then it's meen all message has been seen

    const lastMsg = chat.Messages[0];

    if (!lastMsg) return chat;
    // check if this message is seen
    const isMessageSeen = await MessageSeen.findOne({
      where: { userId: req.user.id, messageId: lastMsg.id, chatId: chat.id },
    });
    lastMsg.seen = !!isMessageSeen;

    chat.Messages.splice(0, 1);
    chat.Messages = [lastMsg, ...chat.Messages];

    return chat;
  });

  const chatsArray = await Promise.all(attachMessageSeenAttachmentMap);

  // console.log(user.toJSON().Chats[2]);

  //return res.send(user.Chats);
  return res.send(chatsArray);
};

// exports.Index = async (req, res) => {
//   // retreive all chats, to whom he was chatting (not include himself) and messages

//   // const [results,metadata] = await sequelize.query(`SELECT "Message".*, "MessageSeens"."id" AS "MessageSeens.id", "MessageSeens"."messageId" AS "MessageSeens.messageId", "MessageSeens"."userId" AS "MessageSeens.userId", "MessageSeens"."createdAt" AS "MessageSeens.createdAt", "MessageSeens"."updatedAt" AS "MessageSeens.updatedAt", "User"."id" AS "User.id", "User"."firstName" AS "User.firstName", "User"."lastName" AS "User.lastName", "User"."email" AS "User.email", "User"."password" AS "User.password", "User"."gender" AS "User.gender", "User"."avatar" AS "User.avatar", "User"."createdAt" AS "User.createdAt", "User"."updatedAt" AS "User.updatedAt" FROM (SELECT * FROM (SELECT "id", "type", "message", "chatId", "fromUserId", "createdAt", "updatedAt" FROM "Messages" AS "Message" WHERE "Message"."chatId" =
//   // 1 ORDER BY "Message"."id" DESC LIMIT 15) AS sub UNION ALL SELECT * FROM (SELECT "id", "type", "message", "chatId", "fromUserId", "createdAt", "updatedAt" FROM "Messages" AS "Message" WHERE "Message"."chatId" = 2 ) AS sub) AS "Message" LEFT OUTER JOIN "MessageSeens" AS "MessageSeens" ON "Message"."id" = "MessageSeens"."messageId" LEFT OUTER JOIN "Users" AS "User" ON "Message"."fromUserId" = "User"."id"; ORDER BY "Message"."id" DESC LIMIT 15`)
//   // SELECT "Message".*, "User"."id" AS "User.id", "User"."firstName" AS "User.firstName", "User"."lastName" AS "User.lastName", "User"."email" AS "User.email", "User"."password" AS "User.password", "User"."gender" AS "User.gender", "User"."avatar" AS "User.avatar", "User"."createdAt" AS "User.createdAt", "User"."updatedAt" AS "User.updatedAt" FROM (SELECT * FROM (SELECT "id", "type", "message", "chatId", "fromUserId", "createdAt", "updatedAt" FROM "Messages" AS "Message" WHERE "Message"."chatId" = 1 ORDER BY "Message"."id" DESC LIMIT 15) AS sub UNION ALL SELECT * FROM (SELECT "id", "type", "message", "chatId", "fromUserId", "createdAt", "updatedAt" FROM "Messages" AS "Message" WHERE "Message"."chatId" = 2 ORDER BY "Message"."id" DESC LIMIT 15) AS sub) AS "Message" LEFT OUTER JOIN "Users" AS "User" ON "Message"."fromUserId" = "User"."id"
//   const user = await User.findOne({
//     where: {
//       id: req.user.id,
//     },
//     include: [
//       {
//         model: Chat,
//         include: [
//           {
//             model: User,
//             where: {
//               [Op.not]: {
//                 id: req.user.id,
//               },
//             },
//           },
//           {
//             model: Message,
//             include: [
//               // {
//               //   model: MessageSeen,
//               // },
//               {
//                 model: User,
//               },
//             ],

//             limit: 15,
//             order: [["id", "DESC"]],
//           },
//         ],
//       },
//     ],
//   });

// const chatsSort = chatsSelectionSort(user.toJSON().Chats);
// console.log(chatsSort[0].Messages);

// console.log(chatsSort);

// const attachMessageSeenAttachmentMap = chatsSort.map(async (chat) => {
//   // if last message is seen then it's meen all message has been seen

//   const lastMsg = chat.Messages[0];

//   if (!lastMsg) return chat;
//   // check if this message is seen
//   const isMessageSeen = await MessageSeen.findOne({
//     where: { userId: req.user.id, messageId: lastMsg.id, chatId: chat.id },
//   });
//   lastMsg.seen = !!isMessageSeen;

//   chat.Messages.splice(0, 1);
//   chat.Messages = [lastMsg, ...chat.Messages];

//   return chat;
// });

// const chatsArray = await Promise.all(attachMessageSeenAttachmentMap);

// add message seenArray inside Message

//   return res.send(chatsSort);
// };

exports.create = async (req, res) => {
  const { partnerId } = req.body;
  const t = await sequelize.transaction();
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
      include: [
        {
          model: Chat,
          where: { type: "dual" },
          include: [{ model: ChatUser, where: { userId: partnerId } }],
        },
      ],
    });

    if (user && user.Chats.length > 0) {
      return res.status(403).send({
        status: "error",
        message: "Chat with this user is already present",
      });
    }

    const chat = await Chat.create({ type: "dual" }, { transaction: t });

    await ChatUser.bulkCreate(
      [
        {
          chatId: chat.id,
          userId: req.user.id,
        },
        {
          chatId: chat.id,
          userId: partnerId,
        },
      ],
      { transaction: t }
    );

    await t.commit();

    const creator = await User.findOne({ where: { id: req.user.id } });
    const partner = await User.findOne({ where: { id: partnerId } });
    const forCreator = {
      id: chat.id,
      type: "dual",
      Users: [partner],
      Messages: [],
    };
    const forReceiver = {
      ...forCreator,
      Users: [creator],
    };

    return res.send([forCreator, forReceiver]);
  } catch (err) {
    await t.rollback();
    return res.status(500).send({ status: "Error", message: err.message });
  }
};

exports.messages = async (req, res) => {
  const limit = 10;
  const page = req.query.page || 1;
  const offset = page > 1 ? page * limit : 0; // how many records needs to skip

  const messages = await Message.findAndCountAll({
    where: {
      chatId: req.query.id,
    },
    include: [
      {
        model: User,
      },
    ],
    limit,
    offset,
    order: [["id", "DESC"]],
  });

  const totalPages = Math.ceil(messages.count / limit);

  if (page > totalPages) return res.json({ data: { messages: [] } });

  const result = {
    messages: messages.rows,
    pagination: {
      page,
      totalPages,
    },
  };

  return res.json(result);
};

exports.deleteChat = async (req, res) => {
  const { id } = req.params;

  try {
    const chat = await Chat.findOne({
      where: {
        id,
      },
      include: [
        {
          model: User,
        },
      ],
    });

    const notifyUsers = chat.Users.map((user) => user.id);

    await chat.destroy();
    return res.json({ chatId: id, notifyUsers });
  } catch (e) {
    return res.status(500).json({ status: "Error", message: e.message });
  }
};

exports.imageUpload = (req, res) => {
  if (req.file) {
    return res.send({ url: req.file.filename });
  }

  return res.status(500).send({ error: "No image is uploaded" });
};

exports.addUserToGroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body;

    const chat = await Chat.findOne({
      where: { id: chatId },
      include: [
        { model: User },
        {
          model: Message,
          include: [{ model: User }],
          limit: 20,
          order: [["id", "DESC"]],
        },
      ],
    });

    chat.Messages.reverse();
    // check user is already in the group

    chat.Users.forEach((user) => {
      if (user.id === userId) {
        return res
          .status(403)
          .send({ message: "User already is present in the chat" });
      }
    });

    await ChatUser.create({ chatId, userId });

    const newChatter = await User.findOne({ where: { id: userId } });

    if (chat.type === "dual") {
      chat.type = "group";
      await chat.save();
    }

    return res.send({ chat, newChatter });
  } catch (err) {
    return res.status(500).json({ status: "Error", message: err.message });
  }
};

exports.leaveCurrentChat = async (req, res) => {
  try {
    const { chatId } = req.body;
    const chat = await Chat.findOne({
      where: {
        id: chatId,
      },
      include: [
        {
          model: User,
        },
      ],
    });

    if (chat.Users.length === 2) {
      return res
        .status(403)
        .json({ status: "Error", message: "You cannot leave this chat" });
    }

    if (chat.Users.length === 3) {
      chat.type = "dual";
      chat.save();
    }

    await ChatUser.destroy({
      where: {
        chatId,
        userId: req.user.id,
      },
    });

    await Message.destroy({
      where: {
        chatId,
        fromUserId: req.user.id,
      },
    });

    const notifyUsers = chat.Users.map((user) => user.id);

    return res.json({
      chatId: chat.id,
      userId: req.user.id,
      currentUserId: req.user.id,
      notifyUsers,
    });
  } catch (e) {
    return res.status(500).json({ status: "Error", message: e.message });
  }
};

exports.messageSeen = async (req, res) => {
  try {
    const { messageId, chatId } = req.body;
    const userId = req.user.id;
    const checkMessageIsAlreadySeen = await MessageSeen.findOne({
      where: { userId, messageId, chatId },
    });
    if (!checkMessageIsAlreadySeen) {
      await MessageSeen.create({ userId, messageId, chatId });
      return res.send({ message: "Message Has Been Seen Successfully" });
    }
    return res.send({ message: "Message was already seen" });
  } catch (e) {
    return res.status(500).json({ status: "Error", message: e.message });
  }
};
