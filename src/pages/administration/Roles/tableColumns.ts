import { Column } from "react-table";

import { Role } from "../../roles/types/rolesTypes";

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
    accessor: "Features",
  },
];
