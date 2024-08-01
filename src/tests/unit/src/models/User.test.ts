import User from "../../../../models/User";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

describe("user.generateAuthToken", () => {
  it("should return valid JWT", () => {
    const paylod = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true,
      name: "nikola",
    };
    const user = new User(paylod);
    const token = user.generateAuthToken();
    const jwtPrivateKey = process.env.JWT_PRIVATE_KEY?.toString() || 'defaultPrivateKey';
    const decoded = jwt.verify(token, jwtPrivateKey);
    expect(decoded).toMatchObject(paylod);
  });
});
