import { Column } from "react-table";

import { Feature } from "../../features/types/featuresTypes";

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
    Header: "IsActive",
    accessor: "IsActive",
  },
];
