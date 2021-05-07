import { HTMLProps, MouseEventHandler } from "react";
import Spinner from "./Spinner";

interface Props {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: "submit" | "button";
  variant?: "primary" | "default" | "flat" | "link";
  loading?: boolean;
}

export default function Button({
  type = "button",
  variant = "default",
  disabled,
  loading,
  onClick,
  className,
  ...props
}: Props & HTMLProps<HTMLButtonElement>): JSX.Element {
  let styles: string;

  switch (variant) {
    case "primary":
      styles = "border border-transparent shadow-sm text-white bg-scooter hover:bg-scooter-darker";
      break;
    case "flat":
      styles = "text-gray-700 hover:bg-gray-50";
      break;
    case "default":
    default:
      styles = "border shadow-sm border-gray-300 bg-white text-gray-700 hover:bg-gray-50";
      break;
  }

  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      className={`flex justify-center py-2 px-4 rounded-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-scooter
      ${styles && ` ${styles}`}
      ${(disabled || loading) && ` opacity-75`}
      ${className && ` ${className}`}`}
      {...props}
    >
      <>
        {props.children}
        {loading && (
          <>
            <span className="sr-only">Loading...</span>
            <Spinner className="ml-2 h-5 w-5" />
          </>
        )}
      </>
    </button>
  );
}
