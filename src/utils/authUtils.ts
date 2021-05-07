import { UserSignInResponse } from "../types/api";

const sessionKey = "_offerzen_session_";

// This should all be done with httpOnly cookies but localstorage is fine for demo purposes
// In the case of JWT authentication, the token should come in an HTTP cookie, and the signed in user can be done in localstorage as long as it has no sensitive information

const getUser = (): UserSignInResponse => {
  const rememberMe = localStorage.getItem("rememberMe") === "true";

  if (rememberMe) {
    return JSON.parse(localStorage.getItem(sessionKey)!);
  } else {
    return JSON.parse(sessionStorage.getItem(sessionKey)!);
  }
};

const authenticate = (user: UserSignInResponse): void => {
  const rememberMe = localStorage.getItem("rememberMe") === "true";

  if (rememberMe) {
    localStorage.setItem(sessionKey, JSON.stringify(user));
  } else {
    sessionStorage.setItem(sessionKey, JSON.stringify(user));
  }
};

const logout = (): void => {
  localStorage.removeItem("rememberMe");
  localStorage.removeItem(sessionKey);
  sessionStorage.removeItem(sessionKey);
};

export { getUser, authenticate, logout };
