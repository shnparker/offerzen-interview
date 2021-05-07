import { Suspense, lazy } from "react";
import FullPageSpinner from "./components/layout/FullPageSpinner";
import { useAuth } from "./contexts/AuthContext";

const UnauthenticatedApp = lazy(() => import("./UnauthenticatedApp"));
// No point in loading the authenticated screens and routes if the user is not logged in
// Can save some network data and performance by chunking this via lazy import
const AuthenticatedApp = lazy(() => import(/* webpackPrefetch: true */ "./AuthenticatedApp"));

export default function App(): JSX.Element {
  const { user } = useAuth();

  return (
    <Suspense fallback={<FullPageSpinner />}>
      {user?.token ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </Suspense>
  );
}
