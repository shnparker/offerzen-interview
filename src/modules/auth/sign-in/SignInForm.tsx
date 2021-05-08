import { Formik, Form } from "formik";
import { Button, EmailInput, PasswordInput, Checkbox } from "../../../components/lib";
import { initialState, validationSchema, State, serverify } from "./signIn.model";
import { ErrorAlert } from "../../../components/lib/Alert";
import { authenticate } from "../../../utils/authUtils";
import { POST } from "../../../client/apiClient";
import { useMutateAsync } from "../../../client/useAsync";
import { SignInRequest, UserSignInResponse } from "../../../types/api";
import { useSnackbar } from "../../../contexts/SnackbarContext";

export default function SignInForm(): JSX.Element {
  const { newSuccessSnackbar } = useSnackbar();
  const { isLoading, error, isError, mutate, reset } = useMutateAsync<
    SignInRequest,
    UserSignInResponse
  >("signIn", (payload: SignInRequest) =>
    POST<SignInRequest, UserSignInResponse>("api/login", serverify(payload))
  );

  function handleSubmit(values: State) {
    mutate(values, {
      onSuccess: (user) => {
        localStorage.setItem("rememberMe", values.rememberMe.toString());
        authenticate(user);
        window.location.reload();
      },
    });
  }

  return (
    <Formik
      initialValues={initialState}
      validationSchema={validationSchema}
      validateOnChange={false}
      onSubmit={handleSubmit}
    >
      <Form className="space-y-6">
        {isError && error && <ErrorAlert onDismiss={() => reset()}>{error}</ErrorAlert>}
        <EmailInput label="Email address" id="email" name="email" />
        <PasswordInput label="Password" id="password" name="password" />
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Checkbox id="rememberMe" name="rememberMe">
              Remember me
            </Checkbox>
          </div>
          <div className="text-sm">
            <button
              type="button"
              onClick={() =>
                newSuccessSnackbar({ title: "demo@offerzen.com", message: "password" })
              }
              className="font-medium text-scooter hover:text-scooter-darker"
            >
              Need login details?
            </button>
          </div>
        </div>
        <Button type="submit" variant="primary" className="w-full" loading={isLoading}>
          <div className="flex">Sign in</div>
        </Button>
      </Form>
    </Formik>
  );
}
