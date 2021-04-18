export interface ReceivedNotificationType {
  fromUser: {
    fullName: string;
    username: string;
    id: string;
  };
  toUserId: string;
  message: string;
  createdAt: string;
}
