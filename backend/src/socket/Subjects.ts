export enum Subjects {
  SendMessage = "SendMessage",
  ReceivedMessage = "ReceivedMessage",
  LoadOfflineMessages = "LoadOfflineMessages",
  LoadConversationsList = "LoadConversationsList",
  LoadConversationsListListener = "LoadConversationsListListener",
  GetConversationId = "GetConversationId",
  GetConversationIdListener = "GetConversationIdListener",
  LoadMessages = "LoadMessages",
  LoadMessagesListener = "LoadMessagesListener",
  UserInfoByUsername = "UserInfoByUsername",
  UserInfoByUsernameListener = "UserInfoByUsernameListener",
  // to check other user is live, then emit request with IsUserLive Subject
  IsUserLive = "IsUserLive",
  // front End will listen this subject to check whether other user is live or not
  IsUserLiveListener = "IsUserLiveListener",
  Ack = "Ack",
}
