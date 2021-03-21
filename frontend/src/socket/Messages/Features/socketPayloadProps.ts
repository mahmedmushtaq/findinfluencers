import { Subjects } from "../../Subjects";

export interface CheckListenerProps {
  subject: Subjects;
}

export interface isUserLivePayload extends CheckListenerProps {
  username: string;
  status: string;
}
