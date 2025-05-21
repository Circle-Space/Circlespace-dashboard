import { Column } from "react-table";

import { Account } from "../../../types/accounts/accountTypes";
import { formatDate } from "../../../utils/dateUtils";

export const columns: Column<Account>[] = [

  {
    Header: "Name",
    accessor: "Name",
  },
];

export const phoneNumberColumns = [
  {
    Header: "Type",
    accessor: "PhoneType",
  },
  {
    Header: "Phone Number",
    accessor: "PhoneNumber",
  },
];

export const contactColumns = [
  {
    Header: "First Name",
    accessor: "FirstName",
  },
  {
    Header: "Last Name",
    accessor: "LastName",
  },
  {
    Header: "Email",
    accessor: "Email",
  },
  {
    Header: "Email2",
    accessor: "Email2",
  },
  {
    Header: "Date Of Birth",
    accessor: "DateOfBirth",
    Cell: ({ value }) => {
      if (value && typeof value === "string") {
        return formatDate(value);
      } else {
        return "";
      }
    },
  },
  {
    Header: "Gender",
    accessor: "Gender",
  },
];
