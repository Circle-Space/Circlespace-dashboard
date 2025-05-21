import { Column } from "react-table";
import { Category, Product } from "../../types/ProductManagementTypes";

export const columns: Column<Product>[] = [
  {
    Header: "Name",
    accessor: "Name",
  },
  {
    Header: "Description",
    accessor: "Description",
  },
  {
    Header: "Price",
    accessor: "Price",
  },
  {
    Header: "SKU",
    accessor: "SKU",
  },
  {
    Header: "Is Available",
    accessor: row => {
      return row.IsAvailable ? "Yes" : "No"
    },
  }
];

