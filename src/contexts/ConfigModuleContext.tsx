import React, { createContext, ReactNode, useEffect, useReducer } from 'react';
import useToast from '../hooks/useToast';
import { ConfigModuleAction, ConfigModuleContextType, ConfigModuleState } from '../types/configModule/configModuleContext';
import { ConfigModule } from '../types/configModule/configModuleTypes';
import { APIResponse } from '../types/apiResponse';
import { apiClient } from '../utils/axios';

export const ConfigModuleContext = createContext<ConfigModuleContextType | null>(null);

const initialConfigModuleState: ConfigModuleState = {
    configModule: [],
    loading: false,
    error: '',
};

const ConfigModuleReducer = (state: ConfigModuleState, action: ConfigModuleAction): ConfigModuleState => {
    switch (action.type) {
        case "GET_CONFIGMODULE":
            return {
                ...state,
                configModule: action.payload.configModule,
                loading: false,
                error: '',
            };
        case "SET_LOADING":
            return {
                ...state,
                loading: action.payload,
            };
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

const ConfigModuleProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(ConfigModuleReducer, initialConfigModuleState);
    const { showErrorToast } = useToast();

    useEffect(() => {
        getConfigModule();
    }, []);

    const getConfigModule = async () => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            const resp = await apiClient.get<APIResponse<ConfigModule[]>>('/ConfigModule');
            dispatch({
                type: 'GET_CONFIGMODULE', payload: {
                    configModule: resp.document.modules || [],

                },
            });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Error fetching config modules' });
            showErrorToast("Error fetching config modules");
            console.error('Error fetching config modules:', error);
        }
    };

    return (
        <ConfigModuleContext.Provider
            value={{
                ...state,
                getConfigModule,
            }}
        >
            {children}
        </ConfigModuleContext.Provider>
    );
};

export default ConfigModuleProvider;
