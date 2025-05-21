import { Column } from 'react-table';

import { Logs } from '../types/logsTypes';

export const columns: Column<Logs>[] = [
  {
    Header: "Message",
    accessor: "Message",
  },
  {
    Header: "FromDevicePhoneNumber",
    accessor: "FromDevicePhoneNumber",
  },
  {
    Header: "ContactName",
    accessor: "ContactName",
  },
  {
    Header: "Language",
    accessor: "Language",
  },
  {
    Header: "MsgFrom",
    accessor: "MsgFrom",
  },
  {
    Header: "MsgTo",
    accessor: "MsgTo",
  },
  {
    Header: "Direction",
    accessor: "Direction",
  },
  {
    Header: "Successful",
    accessor: "Successful",
  },


];
