import React, {
  createContext,
  ReactNode,
  useReducer,
} from 'react';

import useToast from '../hooks/useToast';
import {
  LogsAction,
  LogsContextType,
  LogsState,
} from '../pages/logs/types/logsContext';
import { Logs } from '../pages/logs/types/logsTypes';
import {
  APIResponse,
  initialPaginationSettings,
  PaginationType,
} from '../types/apiResponse';
import { apiClient } from '../utils/axios';

export const LogsContext = createContext<LogsContextType | null>(null);

const initialLogsState: LogsState = {
  logs: [] as Logs[],
  selectedLogs: {} as Logs,
  searchVal: "",
  logsPagination: initialPaginationSettings,
};

const LogsReducer = (
  state: LogsState,
  action: LogsAction
): LogsState => {
  switch (action.type) {
    case "GET_LOGS":
      return {
        ...state,
        logs: action.payload.logs,
        logsPagination: action.payload.logsPagination,
      };

    case "SEARCH_LOGS":
      return {
        ...state,
        logs: action.payload.logs,
        logsPagination: action.payload.logsPagination,
      };

    case "CLEAR_LOGS":
      return initialLogsState;
    default:
      return state;
  }
};

function LogsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(LogsReducer, initialLogsState);
  const { showSuccessToast, showErrorToast } = useToast();

  const getLogs = async (
    paginationType: PaginationType,
    onSuccess?: () => void
  ) => {
    try {
      const queryParam = getLogsQueryParam(paginationType);
      const resp = await apiClient.get<APIResponse<Logs[]>>(
        `/Logs/?${queryParam}`
      );
      const { document, Pagination } = resp;
      dispatch({
        type: "GET_LOGS",
        payload: {
          logs: document || [],
          logsPagination: Pagination || initialPaginationSettings,
        },
      });
    } catch (e) {
      showErrorToast("Error while getting Logs");
      console.log("An error occurred while fetching Logs", e);
    } finally {
      if (onSuccess) {
        onSuccess();
      }
    }
  };


  const searchLogs = async (
    paginationType: PaginationType,
    searchKey: string,
    onSuccess?: () => void
  ) => {
    try {
      const queryParam = getLogsQueryParam(paginationType);
      let key;
      if (searchKey === "") {
        key = state.searchVal;
      } else {
        key = searchKey;
        dispatch({ type: "SET_SEARCH_VAL_LOGS", payload: searchKey });
      }
      const resp = await apiClient.get<APIResponse<Logs[]>>(
        `/Logs/search?searchKey=${key}&${queryParam}`
      );
      const { document, Pagination } = resp;
      dispatch({
        type: "SEARCH_LOGS",
        payload: {
          logs: document || [],
          logsPagination: Pagination || initialPaginationSettings,
        },
      });
    } catch (e) {
      console.log("An error occurred while searching Logs", e);
    } finally {
      if (onSuccess) {
        onSuccess();
      }
    }
  };

  const clearLogs = async () => {
    try {
      dispatch({ type: "CLEAR_LOGS" });
    } catch (e) {
      console.error("Error occurred", e);
    }
  };

  const getLogsQueryParam = (paginationType: PaginationType) => {
    switch (paginationType) {
      case "RESET":
        return `page=${1}&itemsPerPage=${initialPaginationSettings.ItemsPerPage}`;
      case "PREV":
        return `page=${state.logsPagination.CurrentPage - 1}&itemsPerPage=${state.logsPagination.ItemsPerPage}`;
      case "NEXT":
        return `page=${state.logsPagination.CurrentPage + 1}&itemsPerPage=${state.logsPagination.ItemsPerPage}`;
      case "LAST":
        return `page=${state.logsPagination.TotalPages}&itemsPerPage=${state.logsPagination.ItemsPerPage}`;
      default:
        return `page=${state.logsPagination.CurrentPage}&itemsPerPage=${state.logsPagination.ItemsPerPage}`;
    }
  };

  return (
    <LogsContext.Provider
      value={{
        ...state,
        getLogs,
        searchLogs,
        clearLogs
      }}
    >
      {children}
    </LogsContext.Provider>
  );
}

export default LogsProvider;
