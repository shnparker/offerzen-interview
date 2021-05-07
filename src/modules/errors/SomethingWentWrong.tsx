import ErrorLayout from "../../components/layout/ErrorLayout";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { Button } from "../../components/lib";
import { showReportDialog } from "@sentry/react";

interface Props {
  resetError?: () => void;
}

export default function SomethingWentWrong({ resetError }: Props): JSX.Element {
  return (
    <ErrorLayout>
      <ExclamationCircleIcon className="h-36 w-36 text-orange-600 m-auto mb-2" />
      <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
        We&apos;re sorry - something went wrong.
      </h2>
      <p className="mt-2">
        Our engineers have been notified of the issue and we will get a fix out as soon as possible.
      </p>
      <p className="mt-2">Please try refreshing your browser or tell us more about this error.</p>

      <div className="mt-8 flex justify-center">
        {resetError && (
          <Button variant="primary" onClick={() => resetError()}>
            Try again
          </Button>
        )}
        <Button className="ml-2" variant="default" onClick={() => showReportDialog()}>
          Send error feedback
        </Button>
      </div>
    </ErrorLayout>
  );
}
