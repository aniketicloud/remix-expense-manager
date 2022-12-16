import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";

import sharedStyles from "~/styles/shared.css";
import Error from "~/components/util/Error";

export const meta = () => ({
  charset: "utf-8",
  title: "Remix Expenses App",
  viewport: "width=device-width,initial-scale=1",
});

function Document({ title, children }) {
  return (
    <html lang="en">
      <head>
        {title && <title>{title}</title>}
        <Meta />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function CatchBoundary() {
  const caughtResponse = useCatch();

  return (
    <Document title={caughtResponse.statusText}>
      <Error title={caughtResponse.statusText}>
        <p>
          {caughtResponse.data?.message ||
            "Something went wrong. Please try again later."}
        </p>
        <p>
          Back to <Link to="/">Back to Safety</Link>
        </p>
      </Error>
    </Document>
  );
}

// ErrorBoundary is rendered by `Remix`
// when application gets some application error not error response
// so we will not get error response but error object
export function ErrorBoundary({ error }) {
  const title = "An error occured";
  return (
    <Document title={title}>
      <Error title={title}>
        <p>
          {error.message || "Something went wrong. Please try again later."}
        </p>
        <p>
          Back to <Link to="/">Back to Safety</Link>
        </p>
      </Error>
    </Document>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: sharedStyles }];
}
