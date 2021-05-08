import { SearchIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";
import { GET } from "../../client/apiClient";
import { useAsync } from "../../client/useAsync";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { Interview } from "../../types";
import InterviewTable from "./InterviewTable";

export default function Dashboard(): JSX.Element {
  const { newErrorSnackbar } = useSnackbar();
  const [search, setSearch] = useState("");
  const [showArchived, setShowArchived] = useState(false);
  // isLoading keeps the last cached value before updating, isFetching is for loading ANYTHING. Will trigger spinner the entire time.
  // react-query clears cache fetches new data on mount on page focus, on internet reconnect, etc... that's a lot of spinners, can get annoying
  // so I've disabled the most annoying one with refetchOnWindowFocus: false, and kept at least some of the defaults to keep data fresh
  const { isFetching, isError, data, refetch } = useAsync<Interview[]>(
    "interviews",
    () => GET<Interview[]>(`api/interviews?archived=${showArchived}`),
    {
      onError: () =>
        newErrorSnackbar({
          title: "Error",
          message: "Something went wrong fetching your interviews",
        }),
      refetchOnWindowFocus: false,
    }
  );

  // Refetch data when checkbox value changes
  useEffect(() => {
    refetch();
  }, [showArchived]);

  return (
    <>
      <div className="bg-white">
        <div className="relative flex items-center justify-between h-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="relative shadow-sm">
            <input
              className="focus:ring-scooter focus:border-scooter block w-full pr-16 pl-3 placeholder-gray-300 py-3 sm:text-sm border border-gray-300"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              disabled={isFetching || isError}
              placeholder="Search"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-5 w-5 text-scooter focus:ring-scooter border-gray-300 rounded"
              checked={showArchived}
              onChange={() => setShowArchived(!showArchived)}
            />
            <label htmlFor="showArchived" className="ml-2 block text-sm text-gray-900">
              Show Archived
            </label>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col">
          <p className="text-gray-500 text-sm py-4 text-right">
            {data?.length ?? "0"} Interview Requests
          </p>

          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <InterviewTable
                  data={data!}
                  search={search}
                  loading={isFetching}
                  refetch={refetch}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
