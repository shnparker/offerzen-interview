import { User } from ".";

export type SignInRequest = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type UserSignInResponse = User;
