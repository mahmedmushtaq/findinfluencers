import jwt from "jsonwebtoken";

export interface UserPayload {
  id: string;
  email: string;
  userType?: "connected_player";
}

class JWT {
  constructor() {}

  async generateJWt({ id, email }: UserPayload) {
    const signJWT = await jwt.sign(
      {
        id,
        email,
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
