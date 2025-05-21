import React, { createContext, ReactNode, useReducer } from 'react';
import { CaseAction, CaseContextType, CaseState } from '../types/casesContext';
import { Activities, Case } from '../types/casesTypes';
import { APIResponse, initialPaginationSettings, PaginationType } from '../../../../types/apiResponse';
import { apiClient } from '../../../../utils/axios';
import useToast from '../../../../hooks/useToast';
import { ApiFilterParameter } from '../../../../types/apiFilterParameter/apiFilterParameter';
import { GuidUtils } from '../../../../utils/guid';

export const CaseContext = createContext<CaseContextType | null>(null);

const initialState: CaseState = {
    cases: [],
    case: {} as Case,
    error: "",
    searchVal: '',
    pagination: initialPaginationSettings,
    caseActivities: [],
};

const caseReducer = (state: CaseState, action: CaseAction): CaseState => {
    switch (action.type) {
        case 'GET_CASES':
            return {
                ...state,
                cases: action.payload.cases,
                pagination: action.payload.pagination,
            };
        case 'GET_OPEN_CASES':
            return {
                ...state,
                cases: action.payload.cases,
                pagination: action.payload.pagination,
            };
        case 'GET_MY_CASES':
            return {
                ...state,
                cases: action.payload.cases,
                pagination: action.payload.pagination,
            };

        case 'GET_ACTIVITIES_BY_CASE_ID':
            return {
                ...state,
                caseActivities: action.payload.caseActivities,
                pagination: action.payload.pagination,
            };
        case 'GET_CASE':
            return {
                ...state,
                case: action.payload.case,
            };
        case 'ADD_CASE':
            return {
                ...state,
                cases: action.payload.cases,
                pagination: action.payload.pagination,
            };
        case 'UPDATE_CASE':
            return {
                ...state,
                case: action.payload.case,
            };
        case 'SEARCH_CASE':
            return {
                ...state,
                cases: action.payload.cases,
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
        case 'CLEAR_CASES':
            return initialState;
        default:
            return state;
    }
};

const CaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(caseReducer, initialState);
    const { showSuccessToast, showErrorToast } = useToast();

    const getCases = async (paginationType: PaginationType, callback?: () => void) => {
        try {
            const queryParam = getCasesQueryParam(paginationType);
            const resp = await apiClient.get<APIResponse<Case[]>>(`/Case/?${queryParam}`);

            const { document, Pagination } = resp;
            dispatch({
                type: 'GET_CASES',
                payload: {
                    cases: document || [],
                    pagination: Pagination || initialPaginationSettings,
                },
            });
        } catch (error) {
            showErrorToast('Error while getting cases');
            console.error('An error occurred while fetching cases', error);
        } finally {
            if (callback) {
                callback();
            }
        }
    };

    const getActivitiesByCaseId = async (filter: ApiFilterParameter, paginationType: PaginationType, callback?: () => void) => {
        try {
            const queryParam = getCasesQueryParam(paginationType);
            const resp = await apiClient.post<APIResponse<Activities[]>>(`/CaseActivities/filter?andOr=AND&${queryParam}`, [filter]);

            const { document, Pagination } = resp;
            dispatch({
                type: 'GET_ACTIVITIES_BY_CASE_ID',
                payload: {
                    caseActivities: document || [],
                    pagination: Pagination || initialPaginationSettings,
                },
            });
        } catch (error) {
            showErrorToast('Error while getting case activities');
            console.error('An error occurred while fetching case activities', error);
        } finally {
            if (callback) {
                callback();
            }
        }
    };

    const getOpenCases = async (filter: ApiFilterParameter, paginationType: PaginationType, callback?: () => void) => {
        try {
            const queryParam = getCasesQueryParam(paginationType);
            const resp = await apiClient.post<APIResponse<Activities[]>>(`/Case/filter?andOr=AND&${queryParam}`, [filter]);

            const { document, Pagination } = resp;
            dispatch({
                type: 'GET_OPEN_CASES',
                payload: {
                    cases: document || [],
                    pagination: Pagination || initialPaginationSettings,
                },
            });
        } catch (error) {
            showErrorToast('Error while getting case activities');
            console.error('An error occurred while fetching case activities', error);
        } finally {
            if (callback) {
                callback();
            }
        }
    };

    const getMyCases = async (filter: ApiFilterParameter, paginationType: PaginationType, callback?: () => void) => {
        try {
            const queryParam = getCasesQueryParam(paginationType);
            const resp = await apiClient.post<APIResponse<Activities[]>>(`/Case/filter?andOr=AND&${queryParam}`, [filter]);

            const { document, Pagination } = resp;
            dispatch({
                type: 'GET_MY_CASES',
                payload: {
                    cases: document || [],
                    pagination: Pagination || initialPaginationSettings,
                },
            });
        } catch (error) {
            showErrorToast('Error while getting case activities');
            console.error('An error occurred while fetching case activities', error);
        } finally {
            if (callback) {
                callback();
            }
        }
    };



    const getCase = async (id: string, callback?: () => void) => {
        try {
            const resp = await apiClient.get<APIResponse<Case>>(`/Case/${id}`);
            dispatch({ type: 'GET_CASE', payload: { case: resp.document } });
        } catch (error) {
            showErrorToast('Error while getting case');
            console.error('An error occurred while fetching case', error);
        } finally {
            if (callback) {
                callback();
            }
        }
    };

    const addCase = async (c: Case, onSuccess?: () => void) => {
        try {

            c.AssignTo = GuidUtils.ensureValidGuid(c.AssignTo);
            await apiClient.post<APIResponse<Case>>('/Case', c);
            showSuccessToast('Case added successfully');
            if (onSuccess) {
                onSuccess();
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Error while adding case";
            dispatch({ type: "SET_ERROR", payload: errorMessage });
            showErrorToast('Error while adding case');
            console.error('An error occurred while adding case', error);
        }
    };

    const addCaseActivities = async (caseActivities: Activities, onSuccess?: () => void) => {
        try {
            await apiClient.post<APIResponse<Activities>>('/CaseActivities', caseActivities);
            showSuccessToast('Activities added successfully');
            if (onSuccess) {
                onSuccess();
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Error while adding activities";
            dispatch({ type: "SET_ERROR", payload: errorMessage });
            showErrorToast('Error while adding activities');
            console.error('An error occurred while adding activities', error);
        }
    };

    const updateCaseActivities = async (activity: Activities, onSuccess?: () => void) => {
        try {
            await apiClient.put<APIResponse<Activities>>(`/CaseActivities/${activity.Id}`, activity);
            showSuccessToast('Activities updated successfully');
            if (onSuccess) {
                onSuccess();
            }
            await getCases('RESET');
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Error while updating activities";
            dispatch({ type: "SET_ERROR", payload: errorMessage });
            showErrorToast('Error while updating activities');
            console.error('An error occurred while updating activities', error);
        }
    };

    const deleteCaseActivities = async (Id: string, onSuccess?: () => void) => {
        try {
            await apiClient.delete<APIResponse>(`/CaseActivities/${Id}`);
            if (onSuccess) {
                onSuccess();
            }
            await getCases('RESET');
            showSuccessToast('Activities deleted successfully');
        } catch (error) {
            showErrorToast('Error while deleting activities');
            console.error('An error occurred while deleting activities', error);
        }
    };

    const updateCase = async (c: Case, onSuccess?: () => void) => {
        try {
            const resp = await apiClient.put<APIResponse<Case>>(`/Case/${c.Id}`, c);
            showSuccessToast('Case updated successfully');
            if (onSuccess) {
                onSuccess();
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Error while updating case";
            dispatch({ type: "SET_ERROR", payload: errorMessage });
            showErrorToast('Error while updating case');
            console.error('An error occurred while updating case', error);
        }
    };

    const deleteCases = async (Id: string, callback?: () => void) => {
        try {
            await apiClient.delete<APIResponse>(`/Case/${Id}`);
            showSuccessToast('Cases deleted successfully');
        } catch (error) {
            showErrorToast('Error while deleting cases');
            console.error('An error occurred while deleting cases', error);
        } finally {
            if (callback) {
                callback();
            }
        }
    };

    const searchCases = async (paginationType: PaginationType, searchKey: string, onSuccess?: () => void) => {
        try {
            const queryParam = getCasesQueryParam(paginationType);
            let key = searchKey === "" ? state.searchVal : searchKey;

            if (searchKey !== "") {
                dispatch({ type: "SET_SEARCH_VAL", payload: searchKey });
            }

            const resp = await apiClient.get<APIResponse<Case[]>>(`/Case/search?searchKey=${key}&${queryParam}`);

            const { document, Pagination } = resp;
            dispatch({
                type: 'SEARCH_CASE',
                payload: {
                    cases: document || [],
                    pagination: Pagination || initialPaginationSettings,
                },
            });
        } catch (error) {
            showErrorToast('Error while searching cases');
            console.error('An error occurred while searching cases', error);
        } finally {
            if (onSuccess) {
                onSuccess();
            }
        }
    };

    const clearCases = () => {
        dispatch({ type: 'CLEAR_CASES' });
    };

    const getCasesQueryParam = (paginationType: PaginationType) => {
        switch (paginationType) {
            case "RESET":
                return `page=1&itemsPerPage=${initialPaginationSettings.ItemsPerPage}`;
            case "PREV":
                return `page=${Math.max(1, state.pagination.CurrentPage - 1)}&itemsPerPage=${state.pagination.ItemsPerPage}`;
            case "NEXT":
                return `page=${Math.min(state.pagination.TotalPages, state.pagination.CurrentPage + 1)}&itemsPerPage=${state.pagination.ItemsPerPage}`;
            case "LAST":
                return `page=${state.pagination.TotalPages}&itemsPerPage=${state.pagination.ItemsPerPage}`;
            default:
                return `page=${state.pagination.CurrentPage}&itemsPerPage=${state.pagination.ItemsPerPage}`;
        }
    };

    return (
        <CaseContext.Provider
            value={{
                ...state,
                getCases,
                getActivitiesByCaseId,
                getCase,
                addCase,
                updateCase,
                deleteCases,
                searchCases,
                clearCases,
                addCaseActivities,
                updateCaseActivities,
                deleteCaseActivities,
                getOpenCases,
                getMyCases
            }}
        >
            {children}
        </CaseContext.Provider>
    );
};

export default CaseProvider;
