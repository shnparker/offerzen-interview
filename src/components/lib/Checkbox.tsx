import { useField } from "formik";
import { HTMLProps } from "react";

interface Props {
  name: string;
  id: string;
}

export default function Checkbox({
  children,
  ...props
}: Props & HTMLProps<HTMLInputElement>): JSX.Element {
  const [field, meta] = useField({ ...props, type: "checkbox" });

  return (
    <div className="flex items-center">
      <input
        {...field}
        {...props}
        type="checkbox"
        className="h-4 w-4 text-scooter focus:ring-scooter border-gray-300 rounded"
      />
      <label htmlFor={props.name} className="ml-2 block text-sm text-gray-900">
        {children}
      </label>
      {meta.touched && meta.error ? (
        <p className="text-sm text-red-500 mt-1">{meta.error}</p>
      ) : null}
    </div>
  );
}
