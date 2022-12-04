// /expenses => shared layout

import { Outlet } from "@remix-run/react";

import expensesStyles from "~/styles/expenses.css";

// const Expensespage = () => <h1>Expenses Page</h1>;
export default function ExpensesLayout() {
  return (
    <div>
      <p>Shared content!</p>
      <Outlet />
    </div>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: expensesStyles }];
}
