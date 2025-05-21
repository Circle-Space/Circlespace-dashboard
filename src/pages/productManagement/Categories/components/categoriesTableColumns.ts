import { Column } from "react-table";
import { Category } from "../../types/ProductManagementTypes";

export const columns: Column<Category>[] = [
  {
    Header: "Name",
    accessor: "Name",
  },
  {
    Header: "Description",
    accessor: "Description",
  }
];