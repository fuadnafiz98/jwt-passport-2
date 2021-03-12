import jwt from "jsonwebtoken";

import { Payload } from "../types";

function generateToken(payload: Payload) {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 30);

  console.log(`generating token for user: ${payload._id}`);
  return jwt.sign(
    {
      _id: payload._id,
      role: payload.role,
      name: payload.name,
      exp: exp.getTime() / 1000,
    },
    "passwordless" //TODO: use config/index.ts file
  );
}

export { generateToken };
