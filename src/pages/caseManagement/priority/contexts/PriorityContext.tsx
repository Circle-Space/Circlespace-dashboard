import React, { createContext, ReactNode, useReducer } from 'react';
import { PriorityAction, PriorityContextType, PriorityState } from '../types/priorityContext';
import { Priority } from '../types/priorityTypes';
import { APIResponse, initialPaginationSettings, PaginationType } from '../../../../types/apiResponse';
import { apiClient } from '../../../../utils/axios';
import useToast from '../../../../hooks/useToast';

export const PriorityContext = createContext<PriorityContextType | null>(null);

const initialState: PriorityState = {
    priorities: [] as Priority[],
    priority: {} as Priority,
    error: "",
    searchVal: '',
    pagination: initialPaginationSettings,
};

const priorityReducer = (state: PriorityState, action: PriorityAction): PriorityState => {
    switch (action.type) {
        case 'GET_PRIORITIES':
            return {
                ...state,
                priorities: action.payload.priorities,
                pagination: action.payload.pagination,
            };
        case 'GET_PRIORITY_BY_ID':
            return {
                ...state,
                priority: action.payload.priority,
            };
        case 'ADD_PRIORITY':
            return {
                ...state,
                priorities: action.payload.priorities,
                pagination: action.payload.pagination,
            };
        case 'UPDATE_PRIORITY':
            return {
                ...state,
                priority: action.payload.priority,
            };
        case 'SEARCH_PRIORITIES':
            return {
                ...state,
                priorities: action.payload.priorities,
                pagination: action.payload.pagination,
            };
        case 'SET_SEARCH_VAL':
            return {
                ...state,
                searchVal: action.payload,
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload,
            };
        case 'CLEAR_PRIORITIES':
            return initialState;
        default:
            return state;
    }
};

const PriorityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(priorityReducer, initialState);
    const { showSuccessToast, showErrorToast } = useToast();

    const getPriorities = async (paginationType: PaginationType, callback?: () => void) => {
        try {
            const queryParam = getPrioritiesQueryParam(paginationType);
            const resp = await apiClient.get<APIResponse<Priority[]>>(`/CasePriorities?${queryParam}`);

            const { document, Pagination } = resp;
            dispatch({
                type: 'GET_PRIORITIES',
                payload: {
                    priorities: document || [],
                    pagination: Pagination || initialPaginationSettings,
                },
            });
        } catch (error) {
            showErrorToast('Error while getting Priority');
            console.error('An error occurred while fetching Priority', error);
        } finally {
            if (callback) {
                callback();
            }
        }
    };

    const getPriorityById = async (id: string, callback?: () => void) => {
        try {
            const resp = await apiClient.get<APIResponse<Priority>>(`/CasePriorities/${id}`);
            dispatch({ type: 'GET_PRIORITY_BY_ID', payload: { priority: resp.document } });
        } catch (error) {
            showErrorToast('Error while getting priority');
            console.error('An error occurred while fetching priority', error);
        } finally {
            if (callback) {
                callback();
            }
        }
    };

    const addPriority = async (priority: Priority, onSuccess?: () => void) => {
        try {
            await apiClient.post<APIResponse<Priority>>('/CasePriorities', priority);
            showSuccessToast('Priority added successfully');
            if (onSuccess) {
                onSuccess();
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Error while adding priority";
            dispatch({ type: "SET_ERROR", payload: errorMessage });
            showErrorToast('Error while adding priority');
            console.error('An error occurred while adding priority', error);
        }
    };

    const updatePriority = async (priority: Priority, onSuccess?: () => void) => {
        try {
            const resp = await apiClient.put<APIResponse<Priority>>(`/CasePriorities/${priority.Id}`, priority);
            dispatch({
                type: 'UPDATE_PRIORITY',
                payload: { priority: resp.document },
            });
            showSuccessToast('Priority updated successfully');
            if (onSuccess) {
                onSuccess();
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Error while updating priority";
            dispatch({ type: "SET_ERROR", payload: errorMessage });
            showErrorToast('Error while updating priority');
            console.error('An error occurred while updating priority', error);
        }
    };

    const deletePriority = async (id: string, callback?: () => void) => {
        try {
            await apiClient.delete<APIResponse>(`/CasePriorities/${id}`);
            await getPriorities('RESET');
            showSuccessToast('Priority deleted successfully');
        } catch (error) {
            showErrorToast('Error while deleting priority');
            console.error('An error occurred while deleting priority', error);
        } finally {
            if (callback) {
                callback();
            }
        }
    };

    const searchPriorities = async (paginationType: PaginationType, searchKey: string, onSuccess?: () => void) => {
        try {
            const queryParam = getPrioritiesQueryParam(paginationType);
            let key;
            if (searchKey === "") {
                key = state.searchVal;
            } else {
                key = searchKey;
                dispatch({ type: "SET_SEARCH_VAL", payload: searchKey });
            }

            const resp = await apiClient.get<APIResponse<Priority[]>>(`/CasePriorities/search?searchKey=${key}&${queryParam}`);

            const { document, Pagination } = resp;
            dispatch({
                type: 'SEARCH_PRIORITIES',
                payload: {
                    priorities: document || [],
                    pagination: Pagination || initialPaginationSettings,
                },
            });
        } catch (error) {
            console.error('An error occurred while searching priorities', error);
        } finally {
            if (onSuccess) {
                onSuccess();
            }
        }
    };

    const clearPriorities = () => {
        dispatch({ type: 'CLEAR_PRIORITIES' });
    };

    const getPrioritiesQueryParam = (paginationType: PaginationType) => {
        switch (paginationType) {
            case "RESET":
                return `page=${1}&itemsPerPage=${initialPaginationSettings.ItemsPerPage}`;
            case "PREV":
                return `page=${state.pagination.CurrentPage - 1}&itemsPerPage=${state.pagination.ItemsPerPage}`;
            case "NEXT":
                return `page=${state.pagination.CurrentPage + 1}&itemsPerPage=${state.pagination.ItemsPerPage}`;
            case "LAST":
                return `page=${state.pagination.TotalPages}&itemsPerPage=${state.pagination.ItemsPerPage}`;
            default:
                return `page=${state.pagination.CurrentPage}&itemsPerPage=${state.pagination.ItemsPerPage}`;
        }
    };

    return (
        <PriorityContext.Provider
            value={{
                ...state,
                getPriorities,
                getPriorityById,
                addPriority,
                updatePriority,
                deletePriority,
                searchPriorities,
                clearPriorities,
            }}
        >
            {children}
        </PriorityContext.Provider>
    );
};

export default PriorityProvider;
