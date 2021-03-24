export interface MessageType {
  fromId: string;
  toId: string;
  // messageUniqueId: string; // this will be generated on the client side
  date: number;
  body: string;
  id?: string;
  conversationId?: string | any;
}

export interface LoadMoreMessagePayload {
  lastDateMsgDate?: number;
  conversationId: string;
}

// export interface MessageReceivedType extends MessageType {
//   id: string; //unique mongoDb id to send message back to update mongo that this message has been read
// }

// export interface SendMessageType extends MessageType {
//   id?: string;
//   conversationId?: string;
// }
