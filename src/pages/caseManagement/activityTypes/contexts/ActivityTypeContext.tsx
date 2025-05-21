import React, { createContext, ReactNode, useReducer } from 'react';
import { ActivityTypeAction, ActivityTypeContextType, ActivityTypeState } from '../types/ActivityTypeContext';
import { ActivityType } from '../types/ActivityTypes';
import { APIResponse, initialPaginationSettings, PaginationType } from '../../../../types/apiResponse';
import { apiClient } from '../../../../utils/axios';
import useToast from '../../../../hooks/useToast';

export const ActivityTypeContext = createContext<ActivityTypeContextType | null>(null);

const initialState: ActivityTypeState = {
    activityTypes: [] as ActivityType[],
    activityType: {} as ActivityType,
    error: "",
    searchVal: '',
    pagination: initialPaginationSettings,
};

const activityTypeReducer = (state: ActivityTypeState, action: ActivityTypeAction): ActivityTypeState => {
    switch (action.type) {
        case 'GET_ACTIVITY_TYPES':
            return {
                ...state,
                activityTypes: action.payload.activityTypes,
                pagination: action.payload.pagination,
            };
        case 'GET_ACTIVITY_TYPE':
            return {
                ...state,
                activityType: action.payload.activityType,
            };
        case 'ADD_ACTIVITY_TYPE':
            return {
                ...state,
                activityTypes: action.payload.activityTypes,
                pagination: action.payload.pagination,
            };
        case 'UPDATE_ACTIVITY_TYPE':
            return {
                ...state,
                activityType: action.payload.activityType,
            };
        case 'SEARCH_ACTIVITY_TYPES':
            return {
                ...state,
                activityTypes: action.payload.activityTypes,
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
        case 'CLEAR_ACTIVITY_TYPES':
            return initialState;
        default:
            return state;
    }
};

const ActivityTypeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(activityTypeReducer, initialState);
    const { showSuccessToast, showErrorToast } = useToast();

    const getActivityTypes = async (paginationType: PaginationType, callback?: () => void) => {
        try {
            const queryParam = getActivityTypesQueryParam(paginationType);
            const resp = await apiClient.get<APIResponse<ActivityType[]>>(`/CaseActivitytypes/?${queryParam}`);

            const { document, Pagination } = resp;
            dispatch({
                type: 'GET_ACTIVITY_TYPES',
                payload: {
                    activityTypes: document || [],
                    pagination: Pagination || initialPaginationSettings,
                },
            });
        } catch (error) {
            showErrorToast('Error while getting activity types');
            console.error('An error occurred while fetching activity types', error);
        } finally {
            if (callback) {
                callback();
            }
        }
    };

    const getActivityType = async (id: string, callback?: () => void) => {
        try {
            const resp = await apiClient.get<APIResponse<ActivityType>>(`/CaseActivitytypes/${id}`);
            dispatch({ type: 'GET_ACTIVITY_TYPE', payload: { activityType: resp.document } });
        } catch (error) {
            showErrorToast('Error while getting activity type');
            console.error('An error occurred while fetching activity type', error);
        } finally {
            if (callback) {
                callback();
            }
        }
    };

    const addActivityType = async (activityType: ActivityType, onSuccess?: () => void) => {
        try {
            await apiClient.post<APIResponse<ActivityType>>('/CaseActivitytypes', activityType);
            showSuccessToast('Activity type added successfully');
            if (onSuccess) {
                onSuccess();
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Error while adding activity type";
            dispatch({ type: "SET_ERROR", payload: errorMessage });
            showErrorToast('Error while adding activity type');
            console.error('An error occurred while adding activity type', error);
        }
    };

    const updateActivityType = async (activityType: ActivityType, onSuccess?: () => void) => {
        try {
            const resp = await apiClient.put<APIResponse<ActivityType>>(`/CaseActivitytypes/${activityType.Id}`, activityType);
            dispatch({
                type: 'UPDATE_ACTIVITY_TYPE',
                payload: { activityType: resp.document },
            });
            showSuccessToast('Activity type updated successfully');
            if (onSuccess) {
                onSuccess();
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Error while updating activity type";
            dispatch({ type: "SET_ERROR", payload: errorMessage });
            showErrorToast('Error while updating activity type');
            console.error('An error occurred while updating activity type', error);
        }
    };

    const deleteActivityType = async (id: string, callback?: () => void) => {
        try {
            await apiClient.delete<APIResponse>(`/CaseActivitytypes/${id}`);
            await getActivityTypes('RESET');
            showSuccessToast('Activity type deleted successfully');
        } catch (error) {
            showErrorToast('Error while deleting activity type');
            console.error('An error occurred while deleting activity type', error);
        } finally {
            if (callback) {
                callback();
            }
        }
    };

    const searchActivityTypes = async (paginationType: PaginationType, searchKey: string, onSuccess?: () => void) => {
        try {
            const queryParam = getActivityTypesQueryParam(paginationType);
            let key;
            if (searchKey === "") {
                key = state.searchVal;
            } else {
                key = searchKey;
                dispatch({ type: "SET_SEARCH_VAL", payload: searchKey });
            }

            const resp = await apiClient.get<APIResponse<ActivityType[]>>(`/CaseActivitytypes/search?searchKey=${key}&${queryParam}`);

            const { document, Pagination } = resp;
            dispatch({
                type: 'SEARCH_ACTIVITY_TYPES',
                payload: {
                    activityTypes: document || [],
                    pagination: Pagination || initialPaginationSettings,
                },
            });
        } catch (error) {
            console.error('An error occurred while searching activity types', error);
        } finally {
            if (onSuccess) {
                onSuccess();
            }
        }
    };

    const clearActivityTypes = () => {
        dispatch({ type: 'CLEAR_ACTIVITY_TYPES' });
    };

    const getActivityTypesQueryParam = (paginationType: PaginationType) => {
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
        <ActivityTypeContext.Provider
            value={{
                ...state,
                getActivityTypes,
                getActivityType,
                addActivityType,
                updateActivityType,
                deleteActivityType,
                searchActivityTypes,
                clearActivityTypes,
            }}
        >
            {children}
        </ActivityTypeContext.Provider>
    );
};

export default ActivityTypeProvider;
