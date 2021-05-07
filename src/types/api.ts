import { User } from ".";

// SIGN IN
export type SignInRequest = {
  email: string;
  password: string;
  rememberMe: boolean;
};
export type UserSignInResponse = User;

export type Interview = {
  image: string;
  candidate: string;
  role: string;
  salary: number;
  last_comms: {
    unread: boolean;
    description: string;
    date_time: string;
  };
  sent_by: string;
  status: string;
  archived: boolean;
};
