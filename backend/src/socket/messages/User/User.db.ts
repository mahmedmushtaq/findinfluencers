import { User } from "../../../models";

class UserDB {
  async userInfoByUsername(username: string) {
    const res = await User.findOne({ username }).select("-password");
    return res;
  }
}

export default UserDB;
