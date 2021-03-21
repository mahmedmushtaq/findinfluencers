export enum Subjects {
  SendMessage = "SendMessage",
  ReceivedMessage = "ReceivedMessage",
  // to check other user is live, then emit request with IsUserLive Subject
  IsUserLive = "IsUserLive",
  // front End will listen this subject to check whether other user is live or not
  IsUserLiveListener = "IsUserLiveListener",
}
