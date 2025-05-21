import {
  PaginationInfo,
  PaginationType,
} from "../apiResponse";
import {
  ActivityLog,
  ActivityLogFormValues,
} from "./activityLogsTypes";

export type ActivityLogState = {
  activityLogs: ActivityLog[];
  selectedActivityLog: ActivityLog;
  searchVal: string;
  activityLogPagination: PaginationInfo;
}

export type ActivityLogContextType = ActivityLogState & {
  getActivityLogs: (paginationType: PaginationType, onSuccess?: () => void) => Promise<void>;
  addActivityLog: (activityLog: ActivityLogFormValues, onSuccess?: () => void) => void;
  updateActivityLog: (activityLog: ActivityLog, onSuccess?: () => void) => void;
  deleteActivityLog: (activityLog: ActivityLog, onSuccess?: () => void) => void;
  searchActivityLogs: (paginationType: PaginationType, searchKey: string, onSuccess?: () => void) => void;
  clearActivityLogs: () => void;
};

export type ActivityLogAction =
  | {
    type: "GET_ACTIVITY_LOGS";
    payload: {
      activityLogs: ActivityLog[];
      activityLogPagination: PaginationInfo;
    };
  }
  | {
    type: "DELETE_ACTIVITY_LOG";
    payload: ActivityLog;
  }
  | {
    type: "SEARCH_ACTIVITY_LOG";
    payload: {
      activityLogs: ActivityLog[];
      activityLogPagination: PaginationInfo;
    };
  }
  | {
    type: "SET_SEARCH_VAL_ACTIVITY_LOG";
    payload: string
  }
  | {
    type: "CLEAR_ACTIVITY_LOGS";
  };
