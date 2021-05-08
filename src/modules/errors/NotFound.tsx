import ErrorLayout from "../../components/layout/ErrorLayout";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/lib";
import { QuestionMarkCircleIcon } from "@heroicons/react/solid";

export default function NotFound(): JSX.Element {
  const navigate = useNavigate();

  return (
    <ErrorLayout>
      <QuestionMarkCircleIcon className="h-36 w-36 text-scooter m-auto mb-2" />
      <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
        Oops! Not found
      </h2>
      <p className="mt-2">
        The page or resource you are looking for doesn&apos;t exist. It may have been removed, or
        you may have mistyped the url.
      </p>
      <p className="mt-2">
        If you think something is broken, please contact{" "}
        <a className="text-scooter hover:text-scooter-darker" href="mailto:support@offerzen.com">
          support@offerzen.com
        </a>
      </p>

      <div className="mt-8 flex justify-center">
        <Button variant="primary" onClick={() => navigate("/", { replace: true })}>
          Return home
        </Button>
      </div>
    </ErrorLayout>
  );
}
