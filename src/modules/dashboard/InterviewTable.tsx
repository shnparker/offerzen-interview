import { formatLastCommunicated } from "../../utils/dateUtils";
import { classNames, formatCurrency } from "../../utils/domUtils";
import { Spinner } from "../../components/lib";
import { Interview } from "../../types";
import { useMutateAsync } from "../../client/useAsync";
import { POST } from "../../client/apiClient";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { useState } from "react";

const tableHeaders = ["Candiate", "Role", "Last Communication", "Salary", "Sent By"];

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
        <tr>
          {tableHeaders.map((theader) => {
            return (
              <th
                key={theader}
                scope="col"
                className="px-6 py-3 text-left text-xs font-bold text-gray-600 tracking-wide"
              >
                {theader}
              </th>
            );
          })}
          <th />
          {/* blank td for archive */}
        </tr>
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
            .filter((i) => i.candidate.toLowerCase().includes(search.toLowerCase())) //Ideally the search filter would perform a debounced call to the backend to fetch the data, but this is fine for the demo
            .map((interview, index) => (
              // There is no unique identifier in the json object (name not unique), using array index as key instead, not ideal - https://reactjs.org/docs/lists-and-keys.html#keys
              <tr key={index}>
                <TableCell unread={interview.last_comms.unread}>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={interview.image}
                        alt={interview.candidate + " avatar"}
                      />
                    </div>
                    <div className="ml-4">{interview.candidate}</div>
                  </div>
                </TableCell>
                <TableCell unread={interview.last_comms.unread}>{interview.role || "-"}</TableCell>
                <TableCell unread={interview.last_comms.unread}>
                  {interview.last_comms.unread && (
                    <span
                      className="inline-flex items-center px-1 py-1 rounded-full text-xs font-medium bg-jungle-green"
                      aria-hidden="true"
                    />
                  )}
                  <span className={classNames(interview.last_comms.unread ? "ml-3" : "ml-5")}>
                    {interview.last_comms.description}
                  </span>
                  <span className="text-xs text-gray-300 ml-2">
                    {formatLastCommunicated(interview.last_comms.date_time)}
                  </span>
                </TableCell>
                <TableCell unread={interview.last_comms.unread}>
                  {formatCurrency("ZAR", interview.salary)}
                </TableCell>
                <TableCell unread={interview.last_comms.unread}>{interview.sent_by}</TableCell>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-scooter">
                  {isLoading && index === elementBeingArchived ? (
                    <Spinner className="text-scooter h-3 w-3" />
                  ) : (
                    <button onClick={() => handleArchiveInterview(interview, index)}>
                      {interview.archived ? "Unarchive" : "Archive"}
                    </button>
                  )}
                </td>
              </tr>
            ))
        )}
      </tbody>
    </table>
  );
}

interface TableCellProps {
  children: React.ReactNode;
  unread: boolean;
}

function TableCell({ children, unread }: TableCellProps): JSX.Element {
  return (
    <td
      className={classNames(
        unread ? "text-gray-900 font-medium" : "text-gray-500",
        "px-6 py-4 whitespace-nowrap text-sm"
      )}
    >
      {children}
    </td>
  );
}
