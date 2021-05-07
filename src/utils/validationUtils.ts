import { string } from "yup";

const email = string().email("Please enter a valid email").trim();
const password = string().min(8, "Your password must be more than 8 characters");

export default {
  email,
  password,
};
