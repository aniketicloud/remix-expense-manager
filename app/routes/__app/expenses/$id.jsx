// /expenses/{id}

import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { updateExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";
// import { getExpense } from "~/data/expenses.server";

export default function UpdateExpensesPage() {
  const navigate = useNavigate();
  function closeHandler() {
    // navigate programatically
    navigate("..");
  }

  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  );
}

// export function loader({ params }) {
//   // id is taken from file name after $
//   const expenseId = params.id;
//   return getExpense(expenseId);
// }

export async function action({ params, request }) {
  const expenseId = params.id;
  const formData = await request.formData;
  const expenseData = Object.fromEntries(formData);
  try {
    validateExpenseInput(expenseData);
  } catch (error) {
    return error;
  }
  await updateExpense(expenseId, expenseData);
  return redirect("/expenses");
}
