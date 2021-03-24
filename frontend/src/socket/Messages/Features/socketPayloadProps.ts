import { Subjects } from "../../Subjects";

export interface CheckListenerProps {
  subject: Subjects;
}

export interface isUserLivePayload extends CheckListenerProps {
  username: string;
  status: string;
}

export interface LoadConversationsListPayloadType {
  id: string;
  fromId: {
    email: string;
    username: string;
    full_name: string;
    id: string;
  };

  toId: {
    email: string;
    username: string;
    full_name: string;
    id: string;
  };
}
