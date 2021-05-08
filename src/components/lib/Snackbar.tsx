import { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import { SnackbarMessage } from "../../types";

interface Props {
  alert: SnackbarMessage;
  onDismiss: () => void;
}

export default function Snackbar({ alert, onDismiss }: Props): JSX.Element {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Transition
      key={alert.id}
      appear={true}
      unmount={true}
      show={show}
      as={Fragment}
      afterLeave={() => onDismiss()}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden mb-4">
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {alert.type === "error" ? (
                <XCircleIcon className="h-6 w-6 text-mandy" aria-hidden="true" />
              ) : (
                <CheckCircleIcon className="h-6 w-6 text-jungle-green" aria-hidden="true" />
              )}
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              {alert.title ? (
                <>
                  <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                  <p className="mt-1 text-sm text-gray-500">{alert.message}</p>
                </>
              ) : (
                <p className="text-sm text-gray-500">{alert.message}</p>
              )}
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-scooter"
                onClick={() => {
                  setShow(false);
                }}
              >
                <span className="sr-only">Close</span>
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}
