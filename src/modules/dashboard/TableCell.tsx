import { classNames } from "../../utils/domUtils";

interface TableCellProps {
  children: React.ReactNode;
  unread: boolean;
}

export default function TableCell({ children, unread }: TableCellProps): JSX.Element {
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
