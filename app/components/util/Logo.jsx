import { Link } from "@remix-run/react";

function Logo({ label, link }) {
  return (
    <h1 id="logo">
      <Link to={link || "/"}>{label || "RemixExpenses"}</Link>
    </h1>
  );
}

export default Logo;
