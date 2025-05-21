import { Column } from "react-table";
import { User } from "../types/userTypes";

export const columns: Column<User>[] = [
  {
    Header: "First Name",
    accessor: "FirstName",
  },
  {
    Header: "Last Name",
    accessor: "LastName",
  },
  {
    Header: "UserName",
    accessor: "Username",
  },
  {
    Header: "Role",
    accessor: "RolesString",
  },
  {
    Header: "Features",
    accessor: "FeaturesString",
  },
  {
    Header: "Email",
    accessor: "Email",
  },
  {
    Header: "Phone Number",
    accessor: "PhoneNumber",
  },
  {
    Header: "City",
    accessor: "City",
  },

  {
    Header: "State",
    accessor: "State",
  },

  {
    Header: "Postal Code",
    accessor: "PostalCode",
  },
  {
    Header: "Country",
    accessor: "Country",
  },
  {
    Header: "Approved",
    accessor: "IsApproved",
    Cell: ({ value }: { value: boolean }) => (
      <span>{value ? "Yes" : "No"}</span>
    ),
  },
];
