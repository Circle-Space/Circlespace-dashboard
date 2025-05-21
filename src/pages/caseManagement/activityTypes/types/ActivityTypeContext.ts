import { APIResponse, PaginationInfo, PaginationType } from "../../../types/apiResponse";
import { ActivityType } from "./ActivityTypes"; // Adjust as per your activity type definition

export type ActivityTypeState = {
  activityTypes: ActivityType[];
  activityType: ActivityType;
  error: string;
  searchVal: string;
  pagination: PaginationInfo;
};

export type ActivityTypeContextType = ActivityTypeState & {
  getActivityTypes: (paginationType: PaginationType, callback?: () => void) => Promise<void>;
  getActivityType: (id: string, callback?: () => void) => Promise<void>;
  addActivityType: (at: ActivityType, onSuccess?: () => void) => void;
  updateActivityType: (it: ActivityType, onSuccess?: () => void) => void;
  deleteActivityType: (id: string, callback?: () => void) => void;
  searchActivityTypes: (paginationType: PaginationType, searchKey: string, onSuccess?: () => void) => void;
  clearActivityTypes: () => void;
};

export type ActivityTypeAction =
  | {
    type: "GET_ACTIVITY_TYPES";
    payload: {
      activityTypes: ActivityType[];
      pagination: PaginationInfo;
    };
  }
  | {
    type: "ADD_ACTIVITY_TYPE";
    payload: {
      activityTypes: ActivityType[];
      pagination: PaginationInfo;
    };
  }
  | {
    type: "GET_ACTIVITY_TYPE";
    payload: {
      activityType: ActivityType;
    };
  }
  | {
    type: "UPDATE_ACTIVITY_TYPE";
    payload: {
      activityType: ActivityType;
    };
  }
  | {
    type: "SEARCH_ACTIVITY_TYPES";
    payload: {
      activityTypes: ActivityType[];
      pagination: PaginationInfo;
    };
  }
  | {
    type: "SET_ACTIVITY_TYPE_ERROR";
    payload: string;
  }
  | {
    type: "SET_ACTIVITY_TYPE_SEARCH_VAL";
    payload: string;
  }
  | {
    type: "CLEAR_ACTIVITY_TYPES";
  }
  |
  {
    type: "SET_ERROR";
    payload: string;
  }
  |
  {
    type: "SET_SEARCH_VAL";
    payload: string;
  };

export type ActivityTypesApiResponse = APIResponse<ActivityType[]>; // Adjust as per your API response structure
