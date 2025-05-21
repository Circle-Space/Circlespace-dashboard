import { Column } from "react-table";

import { Feature } from "../types/featuresTypes";

export const columns: Column<Feature>[] = [
  {
    Header: "Name",
    accessor: "Name",
  },
  {
    Header: "Description",
    accessor: "Description",
  },
  {
    Header: "Active",
    accessor: "IsActive",
    Cell: ({ value }: { value: boolean }) => (
      <span>{value ? "Yes" : "No"}</span>
    ),
  },
];
