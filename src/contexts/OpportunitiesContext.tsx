import {
    createContext,
    ReactNode,
    useReducer,
} from "react";

import useToast from "../hooks/useToast";
import {
    APIResponse,
    initialPaginationSettings,
    PaginationType,
} from "../types/apiResponse";
import {
    OpportunityAction,
    OpportunityContextType,
    OpportunityState,
} from "../types/oppurtunities/opportunitiesContext";
import {
    Opportunities,
    OpportunitiesFormValues,
} from "../types/oppurtunities/opportunitiesTypes";
import { apiClient } from "../utils/axios";

export const OpportunityContext = createContext<OpportunityContextType | null>(null);

const initialState: OpportunityState = {
    opportunities: [] as Opportunities[],
    selectedOpportunity: {} as Opportunities,
    searchVal: "",
    opportunityPagination: initialPaginationSettings,
};

const OpportunityReducer = (
    state: OpportunityState,
    action: OpportunityAction
): OpportunityState => {
    switch (action.type) {
        case "GET_OPPORTUNITIES":
            return {
                ...state,
                opportunities: action.payload.opportunities,
                opportunityPagination: action.payload.opportunityPagination,
            };
        case "DELETE_OPPORTUNITY":
            return {
                ...state,
                opportunities: state.opportunities.filter((u) => u.Id !== action.payload.Id),
            };
        case "SEARCH_OPPORTUNITY":
            return {
                ...state,
                opportunities: action.payload.opportunities,
                opportunityPagination: action.payload.opportunityPagination,
            };
        case "SET_SEARCH_VAL_OPPORTUNITY":
            return {
                ...state,
                searchVal: action.payload,
            };
        case "CLEAR_OPPORTUNITIES":
            return initialState;
        default:
            return state;
    }
};

function OpportunityProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(OpportunityReducer, initialState);
    const { showSuccessToast, showErrorToast } = useToast();

    const getOpportunities = async (
        paginationType: PaginationType,
        onSuccess?: () => void
    ) => {
        try {
            const queryParam = getOpportunitiesQueryParam(paginationType);
            const resp = await apiClient.get<APIResponse<Opportunities[]>>(
                `/Opportunities/?${queryParam}`
            );
            const { document, Pagination } = resp;
            dispatch({
                type: "GET_OPPORTUNITIES",
                payload: {
                    opportunities: document || [],
                    opportunityPagination: Pagination || initialPaginationSettings,
                },
            });
        } catch (e) {
            showErrorToast("Error while getting opportunities");
            console.log("An error occurred while fetching opportunities", e);
        } finally {
            if (onSuccess) {
                onSuccess();
            }
        }
    };

    const addOpportunity = async (
        opportunity: OpportunitiesFormValues,
        onSuccess?: () => void
    ) => {
        try {
            const resp = await apiClient.post("/Opportunities", opportunity);
            showSuccessToast("Opportunity Added Successfully");
        } catch (error) {
            showErrorToast("Error while adding opportunity");
            console.log("An error occurred while adding opportunity", error);
        } finally {
            if (onSuccess) {
                onSuccess();
            }
        }
    };

    const updateOpportunity = async (
        opportunity: Opportunities,
        onSuccess?: () => void
    ) => {
        try {
            const resp = await apiClient.put(`/Opportunities/${opportunity.Id}`, opportunity);
            showSuccessToast("Opportunity Updated Successfully");
        } catch (error) {
            showErrorToast("Error while updating opportunity");
            console.log("An error occurred while updating opportunity", error);
        } finally {
            if (onSuccess) {
                onSuccess();
            }
        }
    };

    const deleteOpportunity = async (
        opportunity: Opportunities,
        onSuccess?: () => void
    ) => {
        try {
            const resp = await apiClient.delete(`/Opportunities/${opportunity.Id}`);
            dispatch({ type: "DELETE_OPPORTUNITY", payload: opportunity });
            showSuccessToast("Opportunity Deleted Successfully");
        } catch (e) {
            console.log("An error occurred while deleting opportunity", e);
            showErrorToast("Failed To Delete Opportunity");
        } finally {
            if (onSuccess) {
                onSuccess();
            }
        }
    };

    const searchOpportunities = async (
        paginationType: PaginationType,
        searchKey: string,
        onSuccess?: () => void
    ) => {
        try {
            const queryParam = getOpportunitiesQueryParam(paginationType);
            let key;
            if (searchKey === "") {
                key = state.searchVal;
            } else {
                key = searchKey;
                dispatch({ type: "SET_SEARCH_VAL_OPPORTUNITY", payload: searchKey });
            }
            const resp = await apiClient.get<APIResponse<Opportunities[]>>(
                `/Opportunities/search?searchKey=${key}&${queryParam}`
            );
            const { document, Pagination } = resp;
            dispatch({
                type: "SEARCH_OPPORTUNITY",
                payload: {
                    opportunities: document || [],
                    opportunityPagination: Pagination || initialPaginationSettings,
                },
            });
        } catch (e) {
            console.log("An error occurred while searching opportunity", e);
        } finally {
            if (onSuccess) {
                onSuccess();
            }
        }
    };

    const clearOpportunities = async () => {
        try {
            dispatch({ type: "CLEAR_OPPORTUNITIES" });
        } catch (e) {
            console.error("Error occurred", e);
        }
    };

    const getOpportunitiesQueryParam = (paginationType: PaginationType) => {
        switch (paginationType) {
            case "RESET":
                return `page=${1}&itemsPerPage=${initialPaginationSettings.ItemsPerPage}`;
            case "PREV":
                return `page=${state.opportunityPagination.CurrentPage - 1}&itemsPerPage=${state.opportunityPagination.ItemsPerPage}`;
            case "NEXT":
                return `page=${state.opportunityPagination.CurrentPage + 1}&itemsPerPage=${state.opportunityPagination.ItemsPerPage}`;
            case "LAST":
                return `page=${state.opportunityPagination.TotalPages}&itemsPerPage=${state.opportunityPagination.ItemsPerPage}`;
            default:
                return `page=${state.opportunityPagination.CurrentPage}&itemsPerPage=${state.opportunityPagination.ItemsPerPage}`;
        }
    };

    return (
        <OpportunityContext.Provider
            value={{
                ...state,
                getOpportunities,
                addOpportunity,
                updateOpportunity,
                deleteOpportunity,
                searchOpportunities,
                clearOpportunities,
            }}
        >
            {children}
        </OpportunityContext.Provider>
    );
}

export default OpportunityProvider;
