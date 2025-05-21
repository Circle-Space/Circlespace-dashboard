import {
    createContext,
    ReactNode,
    useReducer,
} from 'react';

import useToast from '../hooks/useToast';
import {
    ActivityLogAction,
    ActivityLogContextType,
    ActivityLogState,
} from '../types/activityLogs/activityLogsContext';
import {
    ActivityLog,
    ActivityLogFormValues,
} from '../types/activityLogs/activityLogsTypes';
import {
    APIResponse,
    initialPaginationSettings,
    PaginationType,
} from '../types/apiResponse';
import { apiClient } from '../utils/axios';

export const ActivityLogContext = createContext<ActivityLogContextType | null>(null);

const initialState: ActivityLogState = {
    activityLogs: [] as ActivityLog[],
    selectedActivityLog: {} as ActivityLog,
    searchVal: "",
    activityLogPagination: initialPaginationSettings,
};

const ActivityLogReducer = (
    state: ActivityLogState,
    action: ActivityLogAction
): ActivityLogState => {
    switch (action.type) {
        case "GET_ACTIVITY_LOGS":
            return {
                ...state,
                activityLogs: action.payload.activityLogs,
                activityLogPagination: action.payload.activityLogPagination,
            };
        case "DELETE_ACTIVITY_LOG":
            return {
                ...state,
                activityLogs: state.activityLogs.filter((log) => log.Id !== action.payload.Id),
            };
        case "SEARCH_ACTIVITY_LOG":
            return {
                ...state,
                activityLogs: action.payload.activityLogs,
                activityLogPagination: action.payload.activityLogPagination,
            };
        case "SET_SEARCH_VAL_ACTIVITY_LOG":
            return {
                ...state,
                searchVal: action.payload,
            };
        case "CLEAR_ACTIVITY_LOGS":
            return initialState;
        default:
            return state;
    }
};

function ActivityLogProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(ActivityLogReducer, initialState);
    const { showSuccessToast, showErrorToast } = useToast();

    const getActivityLogs = async (
        paginationType: PaginationType,
        onSuccess?: () => void
    ) => {
        try {
            const queryParam = getActivityLogQueryParam(paginationType);
            const resp = await apiClient.get<APIResponse<ActivityLog[]>>(
                `/ActivityLogs/?${queryParam}`
            );
            const { document, Pagination } = resp;
            dispatch({
                type: "GET_ACTIVITY_LOGS",
                payload: {
                    activityLogs: document || [],
                    activityLogPagination: Pagination || initialPaginationSettings,
                },
            });
        } catch (e) {
            showErrorToast("Error while getting activity logs");
            console.log("An error occurred while fetching activity logs", e);
        } finally {
            if (onSuccess) {
                onSuccess();
            }
        }
    };

    const addActivityLog = async (
        activityLog: ActivityLogFormValues,
        onSuccess?: () => void
    ) => {
        try {
            const resp = await apiClient.post("/ActivityLogs", activityLog);
            showSuccessToast("Activity Log Added Successfully");
        } catch (error) {
            showErrorToast("Error while adding activity log");
            console.log("An error occurred while adding activity log", error);
        } finally {
            if (onSuccess) {
                onSuccess();
            }
        }
    };

    const updateActivityLog = async (
        activityLog: ActivityLog,
        onSuccess?: () => void
    ) => {
        try {
            const resp = await apiClient.put(`/ActivityLogs/${activityLog.Id}`, activityLog);
            showSuccessToast("Activity Log Updated Successfully");
        } catch (error) {
            showErrorToast("Error while updating activity log");
            console.log("An error occurred while updating activity log", error);
        } finally {
            if (onSuccess) {
                onSuccess();
            }
        }
    };

    const deleteActivityLog = async (
        activityLog: ActivityLog,
        onSuccess?: () => void
    ) => {
        try {
            const resp = await apiClient.delete(`/ActivityLogs/${activityLog.Id}`);
            dispatch({ type: "DELETE_ACTIVITY_LOG", payload: activityLog });
            showSuccessToast("Activity Log Deleted Successfully");
        } catch (e) {
            console.log("An error occurred while deleting activity log", e);
            showErrorToast("Failed To Delete Activity Log");
        } finally {
            if (onSuccess) {
                onSuccess();
            }
        }
    };

    const searchActivityLogs = async (
        paginationType: PaginationType,
        searchKey: string,
        onSuccess?: () => void
    ) => {
        try {
            const queryParam = getActivityLogQueryParam(paginationType);
            let key;
            if (searchKey === "") {
                key = state.searchVal;
            } else {
                key = searchKey;
                dispatch({ type: "SET_SEARCH_VAL_ACTIVITY_LOG", payload: searchKey });
            }
            const resp = await apiClient.get<APIResponse<ActivityLog[]>>(
                `/ActivityLogs/search?searchKey=${key}&${queryParam}`
            );
            const { document, Pagination } = resp;
            dispatch({
                type: "SEARCH_ACTIVITY_LOG",
                payload: {
                    activityLogs: document || [],
                    activityLogPagination: Pagination || initialPaginationSettings,
                },
            });
        } catch (e) {
            console.log("An error occurred while searching activity logs", e);
        } finally {
            if (onSuccess) {
                onSuccess();
            }
        }
    };

    const clearActivityLogs = async () => {
        try {
            dispatch({ type: "CLEAR_ACTIVITY_LOGS" });
        } catch (e) {
            console.error("Error occurred", e);
        }
    };

    const getActivityLogQueryParam = (paginationType: PaginationType) => {
        switch (paginationType) {
            case "RESET":
                return `page=${1}&itemsPerPage=${initialPaginationSettings.ItemsPerPage}`;
            case "PREV":
                return `page=${state.activityLogPagination.CurrentPage - 1}&itemsPerPage=${state.activityLogPagination.ItemsPerPage}`;
            case "NEXT":
                return `page=${state.activityLogPagination.CurrentPage + 1}&itemsPerPage=${state.activityLogPagination.ItemsPerPage}`;
            case "LAST":
                return `page=${state.activityLogPagination.TotalPages}&itemsPerPage=${state.activityLogPagination.ItemsPerPage}`;
            default:
                return `page=${state.activityLogPagination.CurrentPage}&itemsPerPage=${state.activityLogPagination.ItemsPerPage}`;
        }
    };

    return (
        <ActivityLogContext.Provider
            value={{
                ...state,
                getActivityLogs,
                addActivityLog,
                updateActivityLog,
                deleteActivityLog,
                searchActivityLogs,
                clearActivityLogs,
            }}
        >
            {children}
        </ActivityLogContext.Provider>
    );
}

export default ActivityLogProvider;
