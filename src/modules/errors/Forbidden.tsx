import ErrorLayout from "../../components/layout/ErrorLayout";

import { HandIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/lib";

export default function Forbidden(): JSX.Element {
  const navigate = useNavigate();

  return (
    <ErrorLayout>
      <HandIcon className="h-36 w-36 text-scooter m-auto mb-2" />
      <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
        Stop! This page is forbidden
      </h2>
      <p className="mt-2">The page you&apos;re trying to reach has restricted access.</p>
      <p className="mt-2">
        If you think this is a mistake, please contact{" "}
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
