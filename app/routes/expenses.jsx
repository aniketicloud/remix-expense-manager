// /expenses => shared layout

import { Outlet } from "@remix-run/react";

// const Expensespage = () => <h1>Expenses Page</h1>;
export default function ExpensesLayout() {
  return (
    <div>
      <p>Shared content!</p>
      <Outlet />
    </div>
  );
}
