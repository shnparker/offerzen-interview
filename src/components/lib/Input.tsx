import { useField } from "formik";
import { HTMLProps } from "react";

interface Props {
  label: string;
  name: string;
  id: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  error?: string;
}

function Input(props: Props & HTMLProps<HTMLInputElement>): JSX.Element {
  const [field, meta] = useField(props);

  return (
    <div className={props.className}>
      <label htmlFor={props.name} className="block text-sm font-medium text-gray-700">
        {props.label}
      </label>
      <div className="mt-1 relative">
        <input
          {...field}
          {...props}
          className={`appearance-none block w-full px-3 py-2 border ${
            meta.touched && meta.error ? "border-red-300" : "border-gray-300"
          } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-scooter focus:border-scooter text-sm`}
          placeholder={props.placeholder}
        />
        {(meta.touched && meta.error) || props.error ? (
          <p className="text-sm text-red-600 mt-1" id={`${props.name}-error`}>
            {meta.error || props.error}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function TextInput(props: Props & HTMLProps<HTMLInputElement>): JSX.Element {
  return <Input type="text" {...props} />;
}

export function PasswordInput(props: Props & HTMLProps<HTMLInputElement>): JSX.Element {
  return <Input type="password" {...props} />;
}

export function EmailInput(props: Props & HTMLProps<HTMLInputElement>): JSX.Element {
  return <Input type="email" {...props} />;
}
