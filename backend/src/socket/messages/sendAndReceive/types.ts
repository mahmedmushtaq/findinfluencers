export interface MessageType {
  fromId: string;
  toId: string;
  messageUniqueId: string; // this will be generated on the client side
  date: number;
  body: string;
}
