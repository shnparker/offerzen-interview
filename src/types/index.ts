export type UserType = "COMPANY" | "CANDIDATE";

export interface SnackbarMessage {
  id: number;
  title: string;
  message: string;
  type: string;
}

export interface User {
  token: string;
  type: UserType;
  id: string;
  email: string;
}
