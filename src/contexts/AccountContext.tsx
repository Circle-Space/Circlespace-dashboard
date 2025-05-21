import {
    createContext,
    ReactNode,
    useReducer,
} from 'react';

import useToast from '../hooks/useToast';
import {
    AccountAction,
    AccountContextType,
    AccountState,
} from '../types/accounts/accountsContext';
import { Account } from '../types/accounts/accountTypes';
import {
    APIResponse,
    initialPaginationSettings,
    PaginationType,
} from '../types/apiResponse';
import { apiClient } from '../utils/axios';

export const AccountContext = createContext<AccountContextType | null>(null);

const initialState: AccountState = {
    accounts: [] as Account[],
    account: {} as Account,
    searchVal: "",
    pagination: initialPaginationSettings,
};

const AccountReducer = (state: AccountState, action: AccountAction): AccountState => {
    switch (action.type) {
        case "GET_ACCOUNTS":
            return {
                ...state,
                accounts: action.payload.accounts,
                pagination: action.payload.pagination,
            };
        case "GET_ACCOUNT":
            return {
                ...state,
                account: action.payload.account,
            };
        case "ADD_ACCOUNT":
            return {
                ...state,
                accounts: action.payload.accounts,
                pagination: action.payload.pagination,
            };
        case "UPDATE_ACCOUNT":
            return {
                ...state,
                account: action.payload.account,
            };
        case "DELETE_ACCOUNT":
            return {
                ...state,
                accounts: state.accounts.filter((account) => account.Id !== action.payload),
            };
        case "SEARCH_ACCOUNT":
            return {
                ...state,
                accounts: action.payload.accounts,
                pagination: action.payload.pagination,
            };
        case "SET_SEARCH_VAL":
            return {
                ...state,
                searchVal: action.payload,
            };
        case "CLEAR_ACCOUNTS":
            return initialState;
        default:
            return state;
    }
};

function AccountProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(AccountReducer, initialState);
    const { showSuccessToast, showErrorToast } = useToast();

    const getAccounts = async (
        paginationType: PaginationType,
        callback?: () => void
    ) => {
        try {
            const queryParam = getConversationsQueryParam(paginationType);
            const resp = await apiClient.get<APIResponse<Account[]>>(
                `/accounts/?${queryParam}`
            );

            const { document, Pagination } = resp;
            dispatch({
                type: "GET_ACCOUNTS",
                payload: {
                    accounts: document || [],
                    pagination: Pagination || initialPaginationSettings,
                },
            });
        } catch (e) {
            showErrorToast("Error while getting accounts");
            console.log("An error occurred while fetching accounts", e);
        } finally {
            if (callback) {
                callback();
            }
        }
    };

    const getAccount = async (id: string, cacllback?: () => void) => {
        try {
            const resp = await apiClient.get<APIResponse<Account>>(
                `/accounts/${id}`
            );
            dispatch({ type: "GET_ACCOUNT", payload: { account: resp.document } });

            showSuccessToast("Account Added Successfully");
        } catch (error) {
            showErrorToast("Error while getting account");
            console.log("An error occurred while adding account", error);
        } finally {
            if (cacllback) {
                cacllback();
            }
        }
    };

    const addAccount = async (account: Account, callback?: () => void) => {
        try {
            const resp = await apiClient.post<APIResponse<Account[]>>(
                "/accounts",
                account
            );
            const { document, Pagination } = resp;
            dispatch({
                type: "ADD_ACCOUNT",
                payload: {
                    accounts: document,
                    pagination: Pagination || initialPaginationSettings,
                },
            });

            showSuccessToast("Account Added Successfully");
        } catch (error) {
            showErrorToast("Error while getting accounts");
            console.log("An error occurred while adding account", error);
        } finally {
            if (callback) {
                callback();
            }
        }
    };

    const updateAccount = async (account: Account, callback?: () => void) => {
        try {
            const resp = await apiClient.put<APIResponse<Account>>(
                `/accounts`,
                account
            );
            dispatch({
                type: "UPDATE_ACCOUNT",
                payload: {
                    account: resp.document,
                },
            });

            showSuccessToast("Account Updated Successfully");
        } catch (error) {
            showErrorToast("Error while updating accounts");
            console.log("An error occurred while updating account", error);
        } finally {
            if (callback) {
                callback();
            }
        }
    };

    const deleteAccount = async (id: string, onSuccess?: () => void) => {
        try {
            await apiClient.delete(`/accounts/${id}`);
            dispatch({ type: "DELETE_ACCOUNT", payload: id });
            showSuccessToast("Account Deleted Successfully");
        } catch (e) {
            console.log("An error occurred while deleting account", e);
            showErrorToast("Failed To Delete Account");
        } finally {
            if (onSuccess) {
                onSuccess();
            }
        }
    };

    const searchAccounts = async (
        paginationType: PaginationType,
        searchKey: string,
        callback?: () => void
    ) => {
        try {
            const queryParam = getConversationsQueryParam(paginationType);
            let key;
            if (searchKey === "") {
                key = state.searchVal;
            } else {
                key = searchKey;
                dispatch({ type: "SET_SEARCH_VAL", payload: searchKey });
            }

            const resp = await apiClient.get<APIResponse<Account[]>>(
                `/accounts/search?searchKey=${key}&${queryParam}`
            );

            const { document, Pagination } = resp;
            dispatch({
                type: "SEARCH_ACCOUNT",
                payload: {
                    accounts: document || [],
                    pagination: Pagination || initialPaginationSettings,
                },
            });
        } catch (e) {
            console.log("An error occurred while searching account", e);
        } finally {
            if (callback) {
                callback();
            }
        }
    };

    const clearAccounts = async () => {
        try {
            dispatch({ type: "CLEAR_ACCOUNTS" });
        } catch (e) {
            console.error("Error occurred", e);
        }
    };

    const getConversationsQueryParam = (paginationType: PaginationType) => {
        switch (paginationType) {
            case "RESET":
                return `page=${1}&itemsPerPage=${initialPaginationSettings.ItemsPerPage}`;
            case "PREV":
                return `page=${state.pagination.CurrentPage - 1}&itemsPerPage=${state.pagination.ItemsPerPage
                    }`;
            case "NEXT":
                return `page=${state.pagination.CurrentPage + 1}&itemsPerPage=${state.pagination.ItemsPerPage
                    }`;
            case "LAST":
                return `page=${state.pagination.TotalPages}&itemsPerPage=${state.pagination.ItemsPerPage
                    }`;
            default:
                return `page=${state.pagination.CurrentPage}&itemsPerPage=${state.pagination.ItemsPerPage
                    }`;
        }
    };

    return (
        <AccountContext.Provider
            value={{
                ...state,
                getAccounts,
                getAccount,
                addAccount,
                updateAccount,
                deleteAccount,
                searchAccounts,
                clearAccounts,
            }}
        >
            {children}
        </AccountContext.Provider>
    );
}

export default AccountProvider;
