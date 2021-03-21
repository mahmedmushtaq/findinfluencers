import jwt from "jsonwebtoken";
import { UserRole } from "../models/user";

export interface UserPayload {
  id: string;
  email: string;
  role: UserRole;
}

class JWT {
  constructor() {}

  async generateJWt({ id, email, role }: UserPayload) {
    const signJWT = await jwt.sign(
      {
        id,
        email,
        role,
      },
      process.env!.JWT_SECRET!
    );

    return signJWT;
  }

  verifyJwt(jwtToken: string) {
    try {
      const payload = jwt.verify(
        jwtToken,
        process.env!.JWT_SECRET!
      ) as UserPayload;

      return payload;
    } catch (err) {}
    return "";
  }
}

const jwtReference = new JWT();

export default jwtReference;
