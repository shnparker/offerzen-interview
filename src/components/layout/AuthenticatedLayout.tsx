import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "@sentry/react";
import SomethingWentWrong from "../../modules/errors/SomethingWentWrong";
import Navbar from "./Navbar";

export default function AuthenticatedLayout(): JSX.Element {
  return (
    <div className="h-screen flex overflow-hidden bg-catskill-white">
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Use sentry error boundary that auto-reports errors */}
        <ErrorBoundary
          fallback={({ resetError }) => <SomethingWentWrong resetError={resetError} />}
        >
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
            <Navbar />
            {/* React router 6 version of "current routes element" */}
            <Outlet />
          </main>
        </ErrorBoundary>
      </div>
    </div>
  );
}
