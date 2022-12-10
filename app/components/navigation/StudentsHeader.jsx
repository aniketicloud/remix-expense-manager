import { NavLink } from "@remix-run/react";

import Logo from "../util/Logo";

export default function StudentsHeader() {
  return (
    <header id="main-header">
      <Logo link="/students" label="Fee Management" />
      <nav id="main-nav">
        <ul>
          <li>
            <NavLink to="/students">Manage Students</NavLink>
          </li>
          <li>
            <NavLink to="/students/analysis">Analyze Student</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
