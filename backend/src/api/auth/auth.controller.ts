//@ts-nocheck
import { randomBytes } from "crypto";
import argon2 from "argon2";
import Users from "../users/users.model";
import { generateToken } from "../../auth/jwt";

async function signUp({
  name,
  password,
  role,
}: {
  name: string;
  password: string;
  role: string;
}) {
  const fetcheduser = await Users.query().findOne({ name: name });
  if (fetcheduser) {
    throw new Error("user already created");
  }
  const salt = randomBytes(32);
  const hashedPassword = await argon2.hash(password, { salt });
  const user = await Users.query().insert({
    //@ts-ignore
    name: name,
    password: hashedPassword,
    role: role,
  });
  console.log("user", user);
  const token = generateToken({
    _id: user.id,
    name: user.name,
    role: user.role,
  });
  return {
    username: user.name,
    userId: user.id,
    token: token,
  };
}

async function signIn({
  name,
  password,
}: {
  name: string;
  password: string;
}): Promise<{
  name: string;
  token: string;
  role: string;
  _id: string;
}> {
  const user = await Users.query().findOne({ name: name });
  if (!user) {
    throw new Error("user not found");
  }
  const validPassword = await argon2.verify(user.password, password);
  if (validPassword) {
    const token = generateToken({
      name,
      password,
      _id: user.id,
      role: user.role,
    });
    return {
      name,
      token,
      role: user.role,
      _id: user.id,
    };
  } else {
    throw new Error("invalid password");
  }
}

export { signIn, signUp };
