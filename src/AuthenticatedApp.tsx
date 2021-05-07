import { Routes, Route, Navigate } from "react-router-dom";
import AuthenticatedLayout from "./components/layout/AuthenticatedLayout";
import Dashboard from "./modules/dashboard/Dashboard";
import NotFound from "./modules/errors/NotFound";

export default function AuthenticatedApp(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<AuthenticatedLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sign-in" element={<Navigate to="/dashboard" />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
