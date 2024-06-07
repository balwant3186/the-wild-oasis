import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function GuestTableOperations() {
  return (
    <TableOperations>
      <SortBy
        options={[
          {
            value: "created_at-desc",
            label: "Sort by created date (recent first)",
          },
          {
            value: "created_at-asc",
            label: "Sort by created date (earlier first)",
          },
          {
            value: "fullName-desc",
            label: "Sort by full name (high first)",
          },
          { value: "fullName-asc", label: "Sort by full name (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default GuestTableOperations;
