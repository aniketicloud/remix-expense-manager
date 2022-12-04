import authStyles from "~/styles/auth.css";

export default function AuthPage() {
  return (
    <div>
      <h1>Auth Page</h1>
    </div>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: authStyles }];
}
