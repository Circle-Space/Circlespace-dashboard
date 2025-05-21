import { Column } from "react-table";

import { Device } from "../types/deviceTypes";

export const deviceColumns: Column<Device>[] = [
  {
    Header: "Device Type",
    accessor: "DeviceType",
  },
  {
    Header: "Device Name",
    accessor: "DeviceName",
  },
  {
    Header: "Serial Number",
    accessor: "SerialNumber",
  },
  {
    Header: "Phone Number",
    // Define a custom accessor function
    accessor: (row) => row.PhoneNumber || row.DevicePhoneNumber,
  }
];

export default deviceColumns;
