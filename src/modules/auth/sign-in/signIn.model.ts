import { boolean, object } from "yup";
import { SignInRequest } from "../../../types/api";
import validation from "../../../utils/validationUtils";

export interface State {
  email: string;
  password: string;
  rememberMe: boolean;
}

const initialState: State = {
  email: "",
  password: "",
  rememberMe: false,
};

const validationSchema = object().shape({
  email: validation.email.required("This is required"),
  password: validation.password.required("This is required"),
  rememberMe: boolean().required("This is required"),
});

function serverify(data: State): SignInRequest {
  return {
    email: data.email.trim().toLowerCase(),
    password: data.password,
    rememberMe: data.rememberMe,
  };
}

export { validationSchema, initialState, serverify };
