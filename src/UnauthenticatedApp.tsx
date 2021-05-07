import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./modules/auth/sign-in/SignIn";
import CenteredLayout from "./components/layout/CenteredLayout";
import NotFound from "./modules/errors/NotFound";

export default function UnauthenticatedApp(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<CenteredLayout />}>
        <Route path="/" element={<Navigate to="/sign-in" />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
