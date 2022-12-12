import { hash } from "bcryptjs";

import { prisma } from "./database.server";

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
  await prisma.user.create({ data: { email, password: passwordHash } });
}

export async function login({ email, password }) {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (!existingUser) {
    const error = new Error(
      "Could not log you in. Please check the provided credentials."
    );

    // http status code 401 is common indication of invalid authentication
    error.status = 401;
    throw error;
  }

  // todo: create session cookie
}
