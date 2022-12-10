// /students/add
import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import StudentForm from "~/components/students/StudentForm";
import Modal from "~/components/util/Modal";
import { addExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";

export default function AddStudentsPage() {
  const navigate = useNavigate();
  function closeHandler() {
    // navigate programatically
    navigate("..");
  }

  return (
    <Modal onClose={closeHandler}>
      <StudentForm />
    </Modal>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const studentData = Object.fromEntries(formData);

  try {
    validateExpenseInput(studentData);
  } catch (error) {
    return error;
  }

  await addExpense(studentData);
  return redirect("/students");
}
