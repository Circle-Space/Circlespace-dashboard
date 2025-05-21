import { Column } from "react-table";

import { Opportunities } from "../../../types/oppurtunities/opportunitiesTypes";

export const columns: Column<Opportunities>[] = [

  {
    Header: "Name",
    accessor: "Name",
  },
  {
    Header: "Title",
    accessor: "Title",
  },
  {
    Header: "Category",
    accessor: "Category",
  },
  {
    Header: "Status",
    accessor: "Status",
  },
  {
    Header: "Description",
    accessor: "Description",
  },

];
