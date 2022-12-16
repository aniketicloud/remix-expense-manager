// /expenses => shared layout

import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import { FaDownload, FaPlus } from "react-icons/fa";

import ExpensesList from "~/components/expenses/ExpensesList";

import { requireUserSession } from "~/data/auth.server";
import { getExpenses } from "~/data/expenses.server";

export default function ExpensesLayout() {
  const expenses = useLoaderData();

  const hasExpenses = expenses && expenses.length > 0;

  return (
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Expense</span>
          </Link>
          <a href="/expenses/raw">
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
        {hasExpenses ? (
          <ExpensesList expenses={expenses} />
        ) : (
          <section id="no-expenses">
            <h1>No expenses found</h1>
            <p>
              Start <Link to="add">adding some today</Link>
            </p>
          </section>
        )}
      </main>
    </>
  );
}

export async function loader({ request }) {
  const userId = await requireUserSession(request);
  const expenses = await getExpenses(userId);

  // json is remix utility funtion
  // here we can't throw an error response, as it will ...
  // ...render closest CatchBoundary
  // So, we will return expenses as it is and manage it on frontend
  // if (!expenses || expenses.length === 0) {
  //   throw json(
  //     { message: "Could not find any expenses." },
  //     {
  //       status: 404,
  //       statusText: "No expenses found!",
  //     }
  //   );
  // } else {
  //   return expenses;
  // }

  // return expenses;

  // !! this is to add headers in all requests.
  // !! like then page is client side and next expenses are fetched
  return json(expenses, {
    headers: {
      "Cache-Control": "max-age=3",
    },
  });
}

// instead of getting the root catch boundary we can define our own.
// but in our case we can't show Add Expense button. Application breaks
// export function CatchBoundary({ error }) {
//   return <p>Error</p>;
// }

// !! this is page reload headers
export function headers({ parentHeaders, loaderHeaders, actionHeaders }) {
  return {
    "Cache-Control": loaderHeaders.get("Cache-Control"), // 3 seconds
  };
}
