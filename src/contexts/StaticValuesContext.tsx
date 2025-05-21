import { createContext, ReactNode, useEffect, useReducer } from "react";
import useToast from "../hooks/useToast";
import { APIResponse } from "../types/apiResponse";
import {
    StaticValueContextType, StaticValuesAction, StaticValueState,
} from "../types/staticValues/StaticValueContext";
import { StaticValue } from "../types/staticValues/StaticValueTypes";
import { apiClient } from "../utils/axios";

export const StaticValueContext = createContext<StaticValueContextType | null>(null);

const initialStaticValueState: StaticValueState = {
    staticValues: {} as StaticValue,
};


const staticValueReducer = (
    state: StaticValueState,
    action: StaticValuesAction
): StaticValueState => {
    switch (action.type) {
        case "GET_STATIC_VALUE":
            return {
                ...state,
                staticValues: action.payload.staticValues,
            };
        default:
            return state;
    }
};

function StaticValueProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(
        staticValueReducer,
        initialStaticValueState
    );


    useEffect(() => {
        getStaticValues();
    }, []);


    const { showErrorToast } = useToast();
    const getStaticValues = async (
        onSuccess?: () => void
    ) => {
        try {
            const resp = await apiClient.get<APIResponse<StaticValue>>("/StaticValues");
            dispatch({ type: "GET_STATIC_VALUE", payload: { staticValues: resp.document || {} } });
        } catch (error) {
            showErrorToast("Failed to fetch static values");
            console.error("Error occurred while fetching static values:", error);
        } finally {
            if (onSuccess) {
                onSuccess();
            }
        }
    };

    return (
        <StaticValueContext.Provider
            value={{
                ...state,
                getStaticValues
            }}
        >
            {children}
        </StaticValueContext.Provider>
    );
}

export default StaticValueProvider;
