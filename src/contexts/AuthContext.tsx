import { createContext, useContext, useMemo, useCallback, ReactNode } from "react";
import { UserSignInResponse } from "../types/api";
import { authenticate, getUser, logout } from "../utils/authUtils";

interface AuthContextType {
  user: UserSignInResponse | undefined;
  setUser: (user: UserSignInResponse) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
AuthContext.displayName = "AuthContext";

function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const user: UserSignInResponse = getUser();

  const setUser = (user: UserSignInResponse): void => authenticate(user);

  const signOut = useCallback((): void => {
    logout();
    window.location.replace(window.location.origin);
  }, []);

  const value = useMemo<AuthContextType>(() => ({ user, setUser, signOut }), [
    user,
    setUser,
    signOut,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthContextProvider`);
  }

  return context;
}

export { AuthProvider, useAuth };
