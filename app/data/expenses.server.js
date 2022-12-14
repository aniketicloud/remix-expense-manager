import { prisma } from "./database.server";

export async function addExpense(expenseData, userId) {
  try {
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
        User: { connect: { id: userId } },
      },
    });
  } catch (error) {
    throw new Error("Failed to add the expense");
  }
}

export async function getExpenses(userId) {
  if (!userId) {
    throw new Error("Failed to get the expenses");
  }

  try {
    const expenses = await prisma.expense.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });

    return expenses;
  } catch (error) {
    throw new Error("Failed to get the expenses");
  }
}

// currently, we are not using async operation to get particular single expense data
// we use useMatches to get get all expenses data & extract one single expense
// but if required in future add userId in where object
export async function getExpense(id) {
  try {
    const expense = await prisma.expense.findFirst({ where: { id } });
    return expense;
  } catch (error) {
    throw new Error("Failed to get the expenses");
  }
}

export async function updateExpense(id, expenseData) {
  try {
    await prisma.expense.update({
      where: { id },
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      },
    });
  } catch (error) {
    throw new Error("Failed to update the expense");
  }
}

export async function deleteExpense(id) {
  try {
    await prisma.expense.delete({ where: { id } });
  } catch (error) {
    // sometimes we don't want to get the user to get error details
    // as it might contain some data
    throw new Error("Failed to delete the expense");
  }
}
