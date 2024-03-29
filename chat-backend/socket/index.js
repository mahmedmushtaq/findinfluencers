const { Server } = require("socket.io");
const { sequelize } = require("../models");
const { chatsList } = require("./chats");
const Message = require("../models").Message;
const MessageSeen = require("../models").MessageSeen;
const users = new Map();
const userSockets = new Map();

const SocketServer = (server) => {
  const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });
  io.on("connect", (socket) => {
    console.log("new connection setup ", socket)
    socket.on("chats", async (user) => {
      // console.log("chats = ", chats);
      const userId = user.id;
      const chats = await chatsList(userId);
      // setTimeout(() => {
      let sockets = [];
      if (users.has(user.id)) {
        const existingUser = users.get(user.id);
        existingUser.sockets = [...existingUser.sockets, ...[socket.id]];
        users.set(user.id, existingUser);
        sockets = [...existingUser.sockets, ...[socket.id]];
        userSockets.set(socket.id, user.id);
      }

      sockets.forEach((socket) => {
        try {
          io.to(socket).emit("chats", chats);
        } catch (e) {}
      });
      // }, 100);
    });
    socket.on("join", async (user) => {
      let sockets = [];

      if (users.has(user.id)) {
        const existingUser = users.get(user.id);
        existingUser.sockets = [...existingUser.sockets, ...[socket.id]];
        users.set(user.id, existingUser);
        sockets = [...existingUser.sockets, ...[socket.id]];
        userSockets.set(socket.id, user.id);
      } else {
        users.set(user.id, { id: user.id, sockets: [socket.id] });
        sockets.push(socket.id);
        userSockets.set(socket.id, user.id);
      }

      const onlineFriends = []; // ids

      const chatters = await getChatters(user.id); // query

      // notify his friends that user is now online
      for (let i = 0; i < chatters.length; i++) {
        if (users.has(chatters[i])) {
          const chatter = users.get(chatters[i]);
          chatter.sockets.forEach((socket) => {
            try {
              io.to(socket).emit("online", user);
            } catch (e) {}
          });
          onlineFriends.push(chatter.id);
        }
      }

      // send to user sockets which of his friends are online
      sockets.forEach((socket) => {
        try {
          io.to(socket).emit("friends", onlineFriends);
        } catch (e) {}
      });

      console.log("users is = ", users);
    });

    socket.on("message", async (message) => {
      let sockets = [];

      console.log("on message ", message);

      if (users.has(message.fromUser.id)) {
        sockets = users.get(message.fromUser.id).sockets;
      }

      message.toUserId.forEach((id) => {
        if (users.has(id)) {
          //if user is online
          sockets = [...sockets, users.get(id).sockets];
        }
      });

      try {
        const msg = {
          type: message.type,
          fromUserId: message.fromUser.id,
          chatId: message.chatId,
          message: message.message,
        };

        const saveMessage = await Message.create(msg);
        console.log("received");
        console.table(sockets);

        message.User = message.fromUser;
        message.fromUserId = message.fromUser.id;
        message.id = saveMessage.id;
        message.message = saveMessage.message;
        message.updatedAt = saveMessage.updatedAt;
        message.seen = false;
        delete message.fromUser;

        sockets.forEach((socket) => {
          io.to(socket).emit("received", message);
        });
      } catch (err) {
        console.log("err is occured", err);
      }
    });

    socket.on("message-seen", async (payload) => {
      const { chatId, userId, messageId } = payload;

      console.log("data is comming ", { chatId, userId, messageId });
      try {
        // only one message is seen
        const isMessageSeenAlreadyPresent = await MessageSeen.findOne({
          where: {
            userId,
            chatId,
            messageId,
          },
        });

        if (!isMessageSeenAlreadyPresent) {
          console.log("save seen ");
          await MessageSeen.create({ chatId, userId, messageId });
        }
      } catch (err) {}
    });

    socket.on("typing", (message) => {
      message.toUserId.forEach((id) => {
        if (users.has(id)) {
          users.get(id).sockets.forEach((socket) => {
            io.to(socket).emit("typing", message);
          });
        }
      });
    });

    socket.on("add-friend", (chats) => {
      try {
        let online = "offline";
        if (users.has(chats[1].Users[0].id)) {
          online = "online"; // second user is online
          chats[0].Users[0].status = "online";

          users.get(chats[1].Users[0].id).sockets.forEach((socket) => {
            io.to(socket).emit("new-chat", chats[0]);
          });
        }

        if (users.has(chats[0].Users[0].id)) {
          chats[1].Users[0].status = online;

          users.get(chats[0].Users[0].id).sockets.forEach((socket) => {
            io.to(socket).emit("new-chat", chats[1]);
          });
        }
      } catch (err) {}
    });

    socket.on("add-user-to-group", ({ chat, newChatter }) => {
      if (users.has(newChatter.id)) {
        newChatter.status = "online";
      }

      // old users
      chat.Users.forEach((user, index) => {
        if (users.has(user.id)) {
          chat.Users[index].status = "online";
          users.get(user.id).sockets.forEach((socket) => {
            io.to(socket).emit("added-user-to-group", {
              chat,
              chatters: [newChatter],
            });
          });
        }
      });

      //new users

      if (users.has(newChatter.id)) {
        users.get(newChatter.id).sockets.forEach((socket) => {
          io.to(socket).emit("added-user-to-group", {
            chat,
            chatters: chat.Users,
          });
        });
      }
    });

    socket.on("leave-current-chat", (data) => {
      const { chatId, userId, currentUserId, notifyUsers } = data;
      notifyUsers.forEach((id) => {
        if (users.has(id)) {
          users.get(id).sockets.forEach((socket) => {
            try {
              io.to(socket).emit("remove-user-from-chat", {
                chatId,
                userId,
                currentUserId,
              });
            } catch (err) {}
          });
        }
      });
    });

    socket.on("delete-chat", (data) => {
      const { chatId, notifyUsers } = data;
      notifyUsers.forEach((id) => {
        if (users.has(id)) {
          users.get(id).sockets.forEach((socket) => {
            try {
              io.to(socket).emit("delete-chat", +chatId);
            } catch (err) {}
          });
        }
      });
    });

    socket.on("disconnect", async () => {
      if (userSockets.has(socket.id)) {
        const user = users.get(userSockets.get(socket.id));

        if (user.sockets.length > 1) {
          user.sockets = user.sockets.filter((sock) => {
            if (sock !== socket.id) return true;

            userSockets.delete(sock);
            return false;
          });

          users.set(user.id, user);
        } else {
          const chatters = await getChatters(user.id);

          for (let i = 0; i < chatters.length; i++) {
            if (users.has(chatters[i])) {
              users.get(chatters[i]).sockets.forEach((socket) => {
                try {
                  io.to(socket).emit("offline", user);
                } catch (e) {}
              });
            }
          }

          userSockets.delete(socket.id);
          users.delete(user.id);
        }
      }
    });
  });
};

const getChatters = async (userId) => {
  // inner join give those chat in which current user is chatting with someone
  try {
    const [results, metadata] = await sequelize.query(`
      select "cu"."userId" from "ChatUsers" as cu
      inner join (
          select "c"."id" from "Chats" as c
          where exists (
              select "u"."id" from "Users" as u
              inner join "ChatUsers" on u.id = "ChatUsers"."userId"
              where u.id = \'${userId}\' and c.id = "ChatUsers"."chatId"
          )
      ) as cjoin on cjoin.id = "cu"."chatId"
      where "cu"."userId" != \'${userId}\'
  `);

    return results.length > 0 ? results.map((el) => el.userId) : [];
  } catch (e) {
    console.log(e);
    return [];
  }
};

module.exports = SocketServer;
