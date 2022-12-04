import { Outlet } from "@remix-run/react";
import expensesStyles from "~/styles/expenses.css";

export default function ExpensesLayout() {
  return <Outlet />;
}

export function links() {
  return [{ rel: "stylesheet", href: expensesStyles }];
}
