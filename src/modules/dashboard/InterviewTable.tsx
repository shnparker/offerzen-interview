import { Spinner } from "../../components/lib";
import { Interview } from "../../types";
import { useMutateAsync } from "../../client/useAsync";
import { POST } from "../../client/apiClient";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { useState } from "react";
import TableHeaders from "./TableHeaders";
import TableRow from "./TableRow";

interface TableProps {
  data: Interview[];
  search: string;
  loading: boolean;
  refetch: () => void;
}

export default function InterviewTable({
  data,
  search,
  loading,
  refetch,
}: TableProps): JSX.Element {
  const { newErrorSnackbar, newSuccessSnackbar } = useSnackbar();
  const { isLoading, mutate } = useMutateAsync<Interview, Interview>(
    "archiveInterview",
    (payload: Interview) => POST<Interview, Interview>("api/interviews/archive", payload),
    {
      onError: () =>
        newErrorSnackbar({
          title: "Error",
          message: "Unable to archive interview",
        }),
      onSuccess: (interview) => {
        newSuccessSnackbar({
          title: "Success",
          message: `Interview successfully ${!interview.archived ? "unarchived" : "archived"}`,
        });
        refetch();
        setElementBeingArchived(null);
      },
    }
  );

  // Hack for determining which table row to show spinner for on archive, since no ID
  const [elementBeingArchived, setElementBeingArchived] = useState<number | null>(null);

  function handleArchiveInterview(interview: Interview, index: number) {
    setElementBeingArchived(index);
    mutate(interview);
  }

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <TableHeaders />
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {loading ? (
          <tr>
            <td colSpan={6} className="py-4">
              <Spinner className="h-10 w-10 mx-auto" />
            </td>
          </tr>
        ) : (
          data
            // Ideally the search filter would perform an as-you-type debounced call to the backend to fetch the data from the source of truth, or fetch new data on submit, but this is fine for the demo
            .filter((i) => i.candidate.toLowerCase().includes(search.toLowerCase()))
            .map((interview, index) => (
              // There is no unique identifier in the json object (name not unique), using array index as key instead, not ideal - https://reactjs.org/docs/lists-and-keys.html#keys
              <TableRow
                key={index}
                interview={interview}
                isBeingArchived={isLoading && index === elementBeingArchived}
                index={index}
                handleArchiveInterview={handleArchiveInterview}
              />
            ))
        )}
      </tbody>
    </table>
  );
}
