import { HTMLProps, MouseEventHandler, PropsWithChildren } from "react";
import { CheckCircleIcon, XCircleIcon, XIcon } from "@heroicons/react/solid";
import { classNames } from "../../utils/domUtils";

interface Props {
  onDismiss?: MouseEventHandler<HTMLButtonElement>;
  variant: "success" | "error";
}

function Alert({ children, onDismiss, variant, ...props }: HTMLProps<HTMLDivElement> & Props) {
  const isSuccessAlert = variant === "success";

  return (
    <div
      className={classNames(isSuccessAlert ? "bg-green-50" : "bg-red-50", "rounded-md p-4")}
      {...props}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          {isSuccessAlert ? (
            <CheckCircleIcon className="h-5 w-5 text-jungle-green" />
          ) : (
            <XCircleIcon className="h-5 w-5 text-mandy" />
          )}
        </div>
        <div className="ml-3">
          <div
            className={classNames(
              isSuccessAlert ? "text-green-800" : "text-red-800",
              "text-sm font-medium"
            )}
          >
            {children}
          </div>
        </div>
        {onDismiss && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onDismiss}
                className={classNames(
                  isSuccessAlert
                    ? "bg-green-50 text-green-500 hover:bg-green-100 focus:ring-offset-green-50 focus:ring-green-600"
                    : "bg-red-50 text-red-500 hover:bg-red-100 focus:ring-offset-red-50 focus:ring-red-600",
                  "inline-flex rounded-md p-1.5  focus:outline-none focus:ring-2 focus:ring-offset-2"
                )}
              >
                <span className="sr-only">Dismiss</span>
                <XIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SuccessAlert(props: PropsWithChildren<Omit<Props, "variant">>): JSX.Element {
  return <Alert variant="success" {...props} />;
}

function ErrorAlert(props: PropsWithChildren<Omit<Props, "variant">>): JSX.Element {
  return <Alert variant="error" {...props} />;
}

export { SuccessAlert, ErrorAlert };
