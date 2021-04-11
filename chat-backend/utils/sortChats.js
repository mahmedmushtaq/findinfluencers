exports.chatsSelectionSort = (chats) => {
  const chatsWithoutMessage = [];
  // skip those chats without Message and move toward end of the list
  let localChats = chats.filter((chat) => {
    if (chat.Messages.length === 0) {
      chatsWithoutMessage.push(chat);
      return false;
    }
    return true;
  });

  //   [{ Messages: [{ updatedAt }] }];
  // for (let i = 0; i < localChats.length; i++) {
  //   let currentChat = chats[i];

  //   for (let j = i + 1; j < localChats.length; j++) {
  //     if (
  //       new Date(localChats[j].Messages[0].updatedAt).getTime() >
  //       new Date(currentChat.Messages[0].updatedAt).getTime()
  //     ) {
  //       swap(localChats, j, i);
  //     } else {
  //       currentChat = localChats[j];
  //     }
  //   }
  // }
  const length = localChats.length;
  for (var i = 0; i < length; i++) {
    var min = {
      value: localChats[i],
      index: i,
    };
    for (var j = i + 1; j < length; j++) {
      if (
        localChats[j].Messages[0].updatedAt > min.value.Messages[0].updatedAt
      ) {
        min.value = localChats[j];
        min.index = j;
      }
    }
    if (min.value != localChats[i]) {
      var k = localChats[i];
      localChats[i] = min.value;
      localChats[min.index] = k;
    }
  }

  //return arr;

  return [...localChats, ...chatsWithoutMessage];
};

const swap = (list, x, y) => {
  var b = list[y];
  list[y] = list[x];
  list[x] = b;
};
