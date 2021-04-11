const model = require("../models");
const { chatsSelectionSort } = require("../utils/sortChats");
const { User, Chat, ChatUser, Message, MessageSeen } = model;
const { Op } = require("sequelize");

exports.chatsList = async (userId) => {
  console.log("user Id is = ", userId);
  const user = await User.findOne({
    where: {
      id: userId.toString(),
    },
    include: [
      {
        model: Chat,
        include: [
          {
            model: User,
            where: {
              [Op.not]: {
                id: userId.toString(),
              },
            },
          },
          {
            model: Message,
            include: [
              // {
              //   model: MessageSeen,
              // },
              {
                model: User,
              },
            ],
            limit: 15,
            order: [["id", "DESC"]],
          },
        ],
      },
    ],
  });

  if (!user) return [];

  const chatsSort = chatsSelectionSort(user.toJSON().Chats);

  // console.log(chatsSort);

  const attachMessageSeenAttachmentMap = chatsSort.map(async (chat) => {
    // if last message is seen then it's meen all message has been seen

    const lastMsg = chat.Messages[0];

    if (!lastMsg) return chat;
    // check if this message is seen
    const isMessageSeen = await MessageSeen.findOne({
      where: { userId, messageId: lastMsg.id, chatId: chat.id },
    });
    lastMsg.seen = !!isMessageSeen;

    chat.Messages.splice(0, 1);
    chat.Messages = [lastMsg, ...chat.Messages];

    return chat;
  });

 // const chatsArray = user.toJSON().Chats; //chatsSort; //await Promise.all(attachMessageSeenAttachmentMap);

  // add message seenArray inside Message

  return user.Chats;
};
