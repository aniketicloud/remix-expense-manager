import { Outlet } from "@remix-run/react";

import StudentsHeader from "~/components/navigation/StudentsHeader";
import expensesStyles from "~/styles/expenses.css";

export default function StudentsLayout() {
  return (
    <>
      <StudentsHeader />
      <Outlet />
    </>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: expensesStyles }];
}
