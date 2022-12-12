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

  
  
}
