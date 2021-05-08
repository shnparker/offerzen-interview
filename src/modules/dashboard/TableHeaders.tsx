import { SortAscendingIcon } from "@heroicons/react/outline";
import { SortDescendingIcon } from "@heroicons/react/solid";

const tableHeaders = [
  { header: "Candiate", sortable: false },
  { header: "Role", sortable: false },
  { header: "Last Communication", sortable: true },
  { header: "Salary", sortable: false },
  { header: "Sent By", sortable: false },
];

export default function TableHeaders(): JSX.Element {
  // Purposely made this an ES6 function for demonstration, ignore inconsistency with the rest of the apps function declarations
  const handleSortChange = () => {
    return;
  };

  return (
    <tr>
      {tableHeaders.map((theader) => {
        return (
          <th
            key={theader.header}
            scope="col"
            className="px-6 py-3 text-left text-xs font-bold text-gray-600 tracking-wide"
          >
            {theader.header}

            {/* // Sorting was not part of the requested spec, but I tried to match the design at least */}
            {theader.sortable && (
              <button onClick={handleSortChange}>
                <SortAscendingIcon className="ml-2 h-3 w-3 inline" />
                <SortDescendingIcon className="h-3 w-3 inline" />
              </button>
            )}
          </th>
        );
      })}
      <th />
      {/* blank th for archive action */}
    </tr>
  );
}
