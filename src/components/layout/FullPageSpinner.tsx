import { Spinner } from "../lib";

export default function FullPageSpinner(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <Spinner className="h-16 w-16 animate-spin" />
    </div>
  );
}
