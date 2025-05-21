import React, { createContext, ReactNode, useReducer } from 'react';
import { StatusAction, StatusContextType, StatusState } from '../types/statusContext';
import { Status } from '../types/statusTypes';
import { APIResponse, initialPaginationSettings, PaginationType } from '../../../../types/apiResponse';
import { apiClient } from '../../../../utils/axios';
import useToast from '../../../../hooks/useToast';

export const StatusContext = createContext<StatusContextType | null>(null);

const initialState: StatusState = {
    statuses: [] as Status[],
    status: {} as Status,
    error: "",
    searchVal: '',
    pagination: initialPaginationSettings,
};

const statusReducer = (state: StatusState, action: StatusAction): StatusState => {
    switch (action.type) {
        case 'GET_STATUS':
            return {
                ...state,
                statuses: action.payload.statuses,
                pagination: action.payload.pagination,
            };
        case 'GET_STATUS_BY_ID':
            return {
                ...state,
                status: action.payload.status,
            };
        case 'ADD_STATUS':
            return {
                ...state,
                statuses: action.payload.statuses,
                pagination: action.payload.pagination,
            };
        case 'UPDATE_STATUS':
            return {
                ...state,
                status: action.payload.status,
            };
        case 'SEARCH_STATUS':
            return {
                ...state,
                statuses: action.payload.statuses,
                pagination: action.payload.pagination,
            };
        case 'SET_SEARCH_VAL':
            return {
                ...state,
                searchVal: action.payload,
            };
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload,
            };
        case 'CLEAR_STATUS':
            return initialState;
        default:
            return state;
    }
};

const StatusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(statusReducer, initialState);
    const { showSuccessToast, showErrorToast } = useToast();

    const getStatus = async (paginationType: PaginationType, callback?: () => void) => {
        try {
            const queryParam = getStatusesQueryParam(paginationType);
            const resp = await apiClient.get<APIResponse<Status[]>>(`/CaseStatuses/?${queryParam}`);

            const { document, Pagination } = resp;
            dispatch({
                type: 'GET_STATUS',
                payload: {
                    statuses: document || [],
                    pagination: Pagination || initialPaginationSettings,
                },
            });
        } catch (error) {
            showErrorToast('Error while getting Status');
            console.error('An error occurred while fetching Status', error);
        } finally {
            if (callback) {
                callback();
            }
        }
    };

    const getStatusbyId = async (id: string, callback?: () => void) => {
        try {
            const resp = await apiClient.get<APIResponse<Status>>(`/CaseStatuses/${id}`);
            dispatch({ type: 'GET_STATUS_BY_ID', payload: { status: resp.document } });
        } catch (error) {
            showErrorToast('Error while getting status');
            console.error('An error occurred while fetching status', error);
        } finally {
            if (callback) {
                callback();
            }
        }
    };

    const addStatus = async (status: Status, onSuccess?: () => void) => {
        try {
            await apiClient.post<APIResponse<Status>>('/CaseStatuses', status);
            showSuccessToast('Status added successfully');
            if (onSuccess) {
                onSuccess();
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Error while adding status";
            dispatch({ type: "SET_ERROR", payload: errorMessage });
            showErrorToast('Error while adding status');
            console.error('An error occurred while adding status', error);
        }
    };

    const updateStatus = async (status: Status, onSuccess?: () => void) => {
        try {
            const resp = await apiClient.put<APIResponse<Status>>(`/CaseStatuses/${status.Id}`, status);
            dispatch({
                type: 'UPDATE_STATUS',
                payload: { status: resp.document },
            });
            showSuccessToast('Status updated successfully');
            if (onSuccess) {
                onSuccess();
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Error while updating status";
            dispatch({ type: "SET_ERROR", payload: errorMessage });
            showErrorToast('Error while updating status');
            console.error('An error occurred while updating status', error);
        }
    };

    const deleteStatus = async (id: string, callback?: () => void) => {
        try {
            await apiClient.delete<APIResponse>(`/CaseStatuses/${id}`);
            await getStatus('RESET');
            showSuccessToast('Status deleted successfully');
        } catch (error) {
            showErrorToast('Error while deleting status');
            console.error('An error occurred while deleting status', error);
        } finally {
            if (callback) {
                callback();
            }
        }
    };

    const searchStatus = async (paginationType: PaginationType, searchKey: string, onSuccess?: () => void) => {
        try {
            const queryParam = getStatusesQueryParam(paginationType);
            let key;
            if (searchKey === "") {
                key = state.searchVal;
            } else {
                key = searchKey;
                dispatch({ type: "SET_SEARCH_VAL", payload: searchKey });
            }

            const resp = await apiClient.get<APIResponse<Status[]>>(`/CaseStatuses/search?searchKey=${key}&${queryParam}`);

            const { document, Pagination } = resp;
            dispatch({
                type: 'SEARCH_STATUS',
                payload: {
                    statuses: document || [],
                    pagination: Pagination || initialPaginationSettings,
                },
            });
        } catch (error) {
            console.error('An error occurred while searching statuses', error);
        } finally {
            if (onSuccess) {
                onSuccess();
            }
        }
    };

    const clearStatus = () => {
        dispatch({ type: 'CLEAR_STATUS' });
    };

    const getStatusesQueryParam = (paginationType: PaginationType) => {
        switch (paginationType) {
            case "RESET":
                return `page=${1}&itemsPerPage=${initialPaginationSettings.ItemsPerPage}`
            case "PREV":
                return `page=${state.pagination.CurrentPage - 1}&itemsPerPage=${state.pagination.ItemsPerPage}`
            case "NEXT":
                return `page=${state.pagination.CurrentPage + 1}&itemsPerPage=${state.pagination.ItemsPerPage}`;
            case "LAST":
                return `page=${state.pagination.TotalPages}&itemsPerPage=${state.pagination.ItemsPerPage}`;
            default:
                return `page=${state.pagination.CurrentPage}&itemsPerPage=${state.pagination.ItemsPerPage}`;
        }
    };

    return (
        <StatusContext.Provider
            value={{
                ...state,
                getStatus,
                getStatusbyId,
                addStatus,
                updateStatus,
                deleteStatus,
                searchStatus,
                clearStatus,
            }}
        >
            {children}
        </StatusContext.Provider>
    );
};

export default StatusProvider;
