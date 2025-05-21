import React, {
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
    FeatureAction,
    FeatureContextType,
    FeatureState,
} from "../pages/features/types/featuresContext";
import { Feature } from "../pages/features/types/featuresTypes";
import { apiClient } from "../utils/axios";

export const FeatureContext = createContext<FeatureContextType | null>(null);

const initialFeatureState: FeatureState = {
    features: [] as Feature[],
    feature: {} as Feature,
    selectedFeature: {} as Feature,
    searchVal: "",
    featurePagination: initialPaginationSettings,
};

const featureReducer = (
    state: FeatureState,
    action: FeatureAction
): FeatureState => {
    switch (action.type) {
        case "GET_FEATURES":
            return {
                ...state,
                features: action.payload.features,
                featurePagination: action.payload.featurePagination,
            };
        case "GET_FEATURES_ID":
            return {
                ...state,
                feature: action.payload.features,
            };
        case "DELETE_FEATURE":
            return {
                ...state,
                features: state.features.filter((f) => f.Id !== action.payload.Id),
            };
        case "SEARCH_FEATURE":
            return {
                ...state,
                features: action.payload.features,
                featurePagination: action.payload.featurePagination,
            };
        case "SET_SEARCH_VAL_FEATURE":
            return {
                ...state,
                searchVal: action.payload,
            };
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload,
            };
        case "CLEAR_FEATURES":
            return initialFeatureState;
        default:
            return state;
    }
};

function FeatureProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(featureReducer, initialFeatureState);
    const { showSuccessToast, showErrorToast } = useToast();

    const getFeatures = async (
        paginationType: PaginationType,
        onSuccess?: () => void
    ) => {
        try {
            const queryParam = getFeaturesQueryParam(paginationType);
            const resp = await apiClient.get<APIResponse<Feature[]>>(
                `/Features/?${queryParam}`
            );
            const { document, Pagination } = resp;
            dispatch({
                type: "GET_FEATURES",
                payload: {
                    features: document || [],
                    featurePagination: Pagination || initialPaginationSettings,
                },
            });
        } catch (e) {
            showErrorToast("Error while getting features");
            console.log("An error occurred while fetching features", e);
        } finally {
            if (onSuccess) {
                onSuccess();
            }
        }
    };

    const getFeaturesbyId = async (id: string, callback?: () => void) => {
        try {
            const resp = await apiClient.get<APIResponse<Feature>>(`/Features/${id}`);
            dispatch({ type: "GET_FEATURES_ID", payload: { features: resp.document } });
        } catch (error) {
            showErrorToast("Error while getting feature");
            console.log("An error occurred while getting feature", error);
        } finally {
            if (callback) {
                callback();
            }
        }
    };


    const addFeature = async (
        feature: Feature,
        onSuccess?: () => void
    ) => {
        try {
            const resp = await apiClient.post("/Features", feature);
            showSuccessToast("Feature Added Successfully");
            if (onSuccess) {
                onSuccess();
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Error while adding feature";
            dispatch({ type: "SET_ERROR", payload: errorMessage });
            showErrorToast(errorMessage);
            console.log("An error occurred while adding feature", error);
        }
    };

    const updateFeature = async (
        feature: Feature,
        onSuccess?: () => void
    ) => {
        try {
            const resp = await apiClient.put(`/Features/${feature.Id}`, feature);
            showSuccessToast("Feature Updated Successfully");
            if (onSuccess) {
                onSuccess();
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Error while updating feature";
            dispatch({ type: "SET_ERROR", payload: errorMessage });
            showErrorToast(errorMessage);
            console.log("An error occurred while updating feature", error);
        }

    };

    const deleteFeature = async (
        feature: Feature,
        onSuccess?: () => void
    ) => {
        try {
            const resp = await apiClient.delete(`/Features/${feature.Id}`);
            dispatch({ type: "DELETE_FEATURE", payload: feature });
            showSuccessToast("Feature Deleted Successfully");
        } catch (e) {
            console.log("An error occurred while deleting feature", e);
            showErrorToast("Failed To Delete Feature");
        } finally {
            if (onSuccess) {
                onSuccess();
            }
        }
    };

    const searchFeatures = async (
        paginationType: PaginationType,
        searchKey: string,
        onSuccess?: () => void
    ) => {
        try {
            const queryParam = getFeaturesQueryParam(paginationType);
            let key;
            if (searchKey === "") {
                key = state.searchVal;
            } else {
                key = searchKey;
                dispatch({ type: "SET_SEARCH_VAL_FEATURE", payload: searchKey });
            }
            const resp = await apiClient.get<APIResponse<Feature[]>>(
                `/Features/search?searchKey=${key}&${queryParam}`
            );
            const { document, Pagination } = resp;
            dispatch({
                type: "SEARCH_FEATURE",
                payload: {
                    features: document || [],
                    featurePagination: Pagination || initialPaginationSettings,
                },
            });
        } catch (e) {
            console.log("An error occurred while searching feature", e);
        } finally {
            if (onSuccess) {
                onSuccess();
            }
        }
    };

    const clearFeatures = async () => {
        try {
            dispatch({ type: "CLEAR_FEATURES" });
        } catch (e) {
            console.error("Error occurred", e);
        }
    };

    const getFeaturesQueryParam = (paginationType: PaginationType) => {
        switch (paginationType) {
            case "RESET":
                return `page=${1}&itemsPerPage=${initialPaginationSettings.ItemsPerPage}`;
            case "PREV":
                return `page=${state.featurePagination.CurrentPage - 1}&itemsPerPage=${state.featurePagination.ItemsPerPage}`;
            case "NEXT":
                return `page=${state.featurePagination.CurrentPage + 1}&itemsPerPage=${state.featurePagination.ItemsPerPage}`;
            case "LAST":
                return `page=${state.featurePagination.TotalPages}&itemsPerPage=${state.featurePagination.ItemsPerPage}`;
            default:
                return `page=${state.featurePagination.CurrentPage}&itemsPerPage=${state.featurePagination.ItemsPerPage}`;
        }
    };

    return (
        <FeatureContext.Provider
            value={{
                ...state,
                getFeatures,
                addFeature,
                updateFeature,
                deleteFeature,
                searchFeatures,
                clearFeatures,
                getFeaturesbyId,
            }}
        >
            {children}
        </FeatureContext.Provider>
    );
}

export default FeatureProvider;
