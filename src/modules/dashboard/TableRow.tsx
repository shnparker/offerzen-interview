import { ReactElement } from "react";
import { Spinner } from "../../components/lib";
import { Interview } from "../../types";
import { formatLastCommunicated } from "../../utils/dateUtils";
import { classNames, formatCurrency } from "../../utils/domUtils";
import TableCell from "./TableCell";

interface TableRowProps {
  interview: Interview;
  index: number;
  isBeingArchived: boolean;
  handleArchiveInterview: (interview: Interview, index: number) => void;
}

export default function TableRow({
  interview,
  index,
  isBeingArchived,
  handleArchiveInterview,
}: TableRowProps): ReactElement {
  return (
    <tr className={interview.archived ? "bg-gray-50" : ""}>
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
        {isBeingArchived ? (
          <Spinner className="text-scooter h-3 w-3" />
        ) : (
          <button onClick={() => handleArchiveInterview(interview, index)}>
            {interview.archived ? "Unarchive" : "Archive"}
          </button>
        )}
      </td>
    </tr>
  );
}
