import { Column, Cell } from "react-table";

import { Role } from "../types/rolesTypes";

export const columns: Column<Role>[] = [
  {
    Header: "Name",
    accessor: "Name",
  },
  {
    Header: "Description",
    accessor: "Description",
  },
  {
    Header: "Feature",
    accessor: (row: Role) =>
      row.Features && row.Features.length > 0
        ? row.Features.map((feature) => feature.Name).join(", ")
        : "",
  },
  {
    Header: "Active",
    accessor: "IsActive",
    Cell: ({ value }: { value: boolean }) => (
      <span>{value ? "Yes" : "No"}</span>
    ),
  }
];
