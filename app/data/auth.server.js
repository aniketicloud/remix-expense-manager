import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { compare, hash } from "bcryptjs";

import { prisma } from "./database.server";

const SESSION_SECRET = process.env.SESSION_SECRET;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    httpOnly: true,
  },
});

async function createUserSession(userId, redirectPath) {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);
  return redirect(redirectPath, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export async function getUserFromSession(request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const userId = session.get("userId");

  if (!userId) {
    return null;
  }
  return userId;
}

export async function signup({ email, password }) {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser) {
    const error = new Error(
      "A user with the provided email address exists already"
    );
    // http status code 422 is common indication of incorrect user input
    error.status = 422;
    throw error;
  }

  // never store password as plain text, it should be hashed first.
  // prisma.user.create({ data: { email, password } }); // NOT GOOD

  const passwordHash = await hash(password, 12);
  const user = await prisma.user.create({
    data: { email, password: passwordHash },
  });
  return createUserSession(user.id, "/expenses");
}

export async function login({ email, password }) {
  // email verification
  const existingUser = await prisma.user.findFirst({ where: { email } });
  !existingUser && throwCredentialsError();

  // password verification using bcryptjs.compare()
  const passwordCorrect = await compare(password, existingUser.password);
  !passwordCorrect && throwCredentialsError();

  return createUserSession(existingUser.id, "/expenses");
}

function throwCredentialsError() {
  const error = new Error(
    "Could not log you in. Please check the provided credentials."
  );

  // http status code 401 is common indication of invalid authentication
  error.status = 401;
  throw error;
}
