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
