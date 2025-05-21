import { Column } from "react-table";

import { ActivityLog } from "../../../types/activityLogs/activityLogsTypes";

export const columns: Column<ActivityLog>[] = [
  {
    Header: "Subject",
    accessor: "Subject",
  },
  {
    Header: "Activity Type",
    accessor: "ActivityType",
  },
  {
    Header: "Description",
    accessor: "Description",
  },
];
