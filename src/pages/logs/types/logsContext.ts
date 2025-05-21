import {
    PaginationInfo,
    PaginationType,
} from '../../../types/apiResponse';
import { Logs } from './logsTypes';

export type LogsState = {
    logs: Logs[];
    selectedLogs: Logs;
    searchVal: string;
    logsPagination: PaginationInfo;
};

export type LogsContextType = LogsState & {
    getLogs: (paginationType: PaginationType,
        onSuccess?: () => void
    ) => Promise<void>;
    searchLogs: (
        paginationType: PaginationType,
        searchKey: string,
        onSuccess?: () => void
    ) => void;
    clearLogs: () => void;
};

export type LogsAction =
    | {
        type: "GET_LOGS";
        payload: {
            logs: Logs[];
            logsPagination: PaginationInfo;
        };
    }
    | {
        type: "SEARCH_LOGS";
        payload: {
            logs: Logs[];
            logsPagination: PaginationInfo;
        };
    }
    | {
        type: "SET_SEARCH_VAL_LOGS";
        payload: string;
    }
    | {
        type: "CLEAR_LOGS";
    };
