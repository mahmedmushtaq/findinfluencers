import CheckListener from "../Messages/CheckListener";
import socketCon from "../Socket";
import { Subjects } from "../Subjects";

class User {
  userInfoByUsername(loggedInUserId: string, username: string, cb: Function) {
    socketCon.socket?.emit(Subjects.UserInfoByUsername, { username });
    new CheckListener(socketCon.socket, { id: loggedInUserId }).listen(
      Subjects.UserInfoByUsernameListener,
      cb
    );
  }
}

const user = new User();

export default user;
