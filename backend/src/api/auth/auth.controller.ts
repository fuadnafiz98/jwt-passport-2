import { randomBytes } from "crypto";
import prisma from "../../loaders/prisma";
import argon2 from "argon2";
import Users from "../users/users.model";
import { generateToken, validateToken } from "../../auth/jwt";

async function signUp({
  name,
  email,
  password,
  role,
}: {
  name: string;
  email: string;
  password: string;
  role: string;
}) {
  const fetchedUser = await prisma.user.findFirst({
    where: {
      name: name,
    },
  });

  if (fetchedUser) {
    throw new Error("user already created");
  }

  const salt = randomBytes(32);
  const hashedPassword = await argon2.hash(password, { salt });

  // const user = await Users.query().insert({
  //   name: name,
  //   password: hashedPassword,
  //   role: role,
  //   refreshToken: refreshToken,
  // });

  const user = await prisma.user.create({
    data: {
      email: email,
      name: name,
      role: role,
      refresh_token: "",
      password: hashedPassword,
    },
  });

  const token = generateToken(
    {
      _id: user.id.toString(),
      name: user.name,
      role: user.role,
    },
    false
  );

  const refreshToken = generateToken(
    {
      _id: user.id.toString(),
      name: user.name,
      role: user.role,
    },
    true
  );

  // const updatedUser = await Users.query()
  //   .patch({ refreshToken: refreshToken })
  //   .where("name", "=", name);
  // console.log("updated User", updatedUser);

  const updatedUser = await prisma.user.update({
    where: { email: email },
    data: {
      refresh_token: refreshToken,
    },
  });

  console.log("[auth-controller], updated user: ", updatedUser);

  return {
    username: user.name,
    userId: user.id,
    role: user.role,
    token: token,
    refreshToken,
  };
}

async function signIn({
  name,
  password,
  email,
}: {
  name: string;
  email: string;
  password: string;
}): Promise<{
  name: string;
  email: string;
  token: string;
  refreshToken: string;
  role: string;
  _id: string;
}> {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    throw new Error("user not found");
  }

  const validPassword = await argon2.verify(user.password, password);
  if (validPassword) {
    const token = generateToken(
      {
        name,
        _id: user.id.toString(),
        role: user.role,
      },
      false
    );
    const refreshToken = generateToken(
      {
        _id: user.id.toString(),
        name: user.name,
        role: user.role,
      },
      true
    );

    const updatedUser = await prisma.user.update({
      where: { email: email },
      data: {
        refresh_token: refreshToken,
      },
    });

    console.log("[auth-controller], updated user: ", updatedUser);

    return {
      name,
      email: user.email,
      token,
      refreshToken,
      role: user.role,
      _id: user.id.toString(),
    };
  } else {
    throw new Error("invalid password");
  }
}

//@ts-ignore
async function signOut({ userInfo }) {
  if (userInfo === null || userInfo.name === null) return;

  const updatedUser = await prisma.user.update({
    where: { email: userInfo.email },
    data: {
      refresh_token: "",
    },
  });

  console.log("[auth-controller], updated user: ", updatedUser);
}

async function checkToken(
  //@ts-ignore
  cookies
): Promise<{
  name: string;
  token: string;
  refreshToken: string;
  role: string;
  _id: string;
} | null> {
  if (cookies === null) return null;
  const refreshToken = cookies["refreshToken"];
  if (refreshToken === null) return null;

  const user = validateToken(refreshToken, true);
  if (user === null) return null;

  const result = await prisma.user.findFirst({
    where: {
      refresh_token: refreshToken,
    },
  });

  if (result === null) return null;
  const token = generateToken(
    {
      _id: result.id.toString(),
      name: result.name,
      role: result.role,
    },
    false
  );
  return {
    _id: result.id.toString(),
    token,
    refreshToken,
    role: result.role,
    name: result.name,
  };
}

export { checkToken, signIn, signUp, signOut };
