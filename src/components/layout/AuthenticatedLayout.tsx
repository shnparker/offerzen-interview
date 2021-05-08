import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "@sentry/react";
import SomethingWentWrong from "../../modules/errors/SomethingWentWrong";
import Navbar from "./Navbar";

export default function AuthenticatedLayout(): JSX.Element {
  return (
    <div className="h-screen flex overflow-hidden bg-catskill-white">
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Use another sentry error boundary here, useful to have multiple error boundaries */}
        {/* Not so useful in this app as it's one screen but in general it can be useful */}
        {/* Example: if content section crashes, the sidebar could still remain operational */}
        <ErrorBoundary
          fallback={({ resetError }) => <SomethingWentWrong resetError={resetError} />}
        >
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
            <Navbar />
            <Outlet />
          </main>
        </ErrorBoundary>
      </div>
    </div>
  );
}
