// /expenses/add
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";

export default function AddExpensesPage() {
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

export function action(){
  
}