import { Suspense, lazy } from "react";
import FullPageSpinner from "./components/layout/FullPageSpinner";
import { useAuth } from "./contexts/AuthContext";

// There is no point in loading the authenticated screens and routes if the user is not logged in, or vice versa
// Can save some network data and performance by chunking these separate layouts and routes via lazy import
const UnauthenticatedApp = lazy(() => import("./UnauthenticatedApp"));
const AuthenticatedApp = lazy(() => import(/* webpackPrefetch: true */ "./AuthenticatedApp"));

export default function App(): JSX.Element {
  const { user } = useAuth();

  return (
    <Suspense fallback={<FullPageSpinner />}>
      {user?.token ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </Suspense>
  );
}
