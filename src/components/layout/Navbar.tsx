import { Button } from "../lib";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation } from "react-router";
import { classNames } from "../../utils/domUtils";

export default function Navbar(): JSX.Element {
  const { user, signOut } = useAuth();
  const location = useLocation();

  return (
    <nav
      className={classNames(
        //   This is needed so that the vh height of the layout on the sign in does not cause an overscroll, by using fixed's floating layout
        location.pathname === "/sign-in" ? " fixed w-full" : "",
        `bg-oxford-blue`
      )}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center sm:items-stretch justify-between">
            <div className="flex-shrink-0 flex items-center">
              <img className="block h-8 w-auto" src="/logo.png" alt="Offerzen Logo" />
            </div>
            {user?.token && (
              <Button variant="primary" onClick={() => signOut()}>
                Sign out
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
