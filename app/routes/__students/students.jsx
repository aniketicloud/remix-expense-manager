// /students => shared layout

import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";
import StudentsList from "~/components/students/StudentsList";
import { getExpenses } from "~/data/expenses.server";

export default function StudentsLayout() {
  const students = useLoaderData();

  return (
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Student</span>
          </Link>
          <a href="/students/raw">
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
        <StudentsList students={students} />
      </main>
    </>
  );
}

export function loader({ request }) {
  return getExpenses();
}
