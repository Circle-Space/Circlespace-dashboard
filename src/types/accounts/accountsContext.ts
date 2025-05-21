import {
  APIResponse,
  PaginationInfo,
  PaginationType,
} from "../apiResponse";
import { Account } from "./accountTypes";

export type AccountState = {
    accounts: Account[];
    account: Account;
    searchVal: string;
    pagination: PaginationInfo;
};

export type AccountContextType = AccountState & {
    getAccounts: (paginationType: PaginationType, callback?: () => void) => Promise<void>;
    getAccount: (id: string, callback?: () => void) => Promise<void>;
    addAccount: (account: Account, callback?: () => void) => void;
    updateAccount: (account: Account, callback?: () => void) => void;
    deleteAccount: (id: string, callback?: () => void) => void;
    searchAccounts: (paginationType: PaginationType, searchKey: string, callback?: () => void) => void;
    clearAccounts: () => void;
};

export type AccountAction =
    | {
        type: "GET_ACCOUNTS";
        payload: {
            accounts: Account[];
            pagination: PaginationInfo;
        };
    }
    | {
        type: "ADD_ACCOUNT";
        payload: {
            accounts: Account[];
            pagination: PaginationInfo;
        };
    }
    | {
        type: "GET_ACCOUNT";
        payload: {
            account: Account;
        };
    }
    | {
        type: "UPDATE_ACCOUNT";
        payload: {
            account: Account;
        };
    }
    | {
        type: "DELETE_ACCOUNT";
        payload: string;
    }
    | {
        type: "SEARCH_ACCOUNT";
        payload: {
            accounts: Account[];
            pagination: PaginationInfo;
        };
    }
    | {
        type: "SET_SEARCH_VAL";
        payload: string;
    }
    | {
        type: "CLEAR_ACCOUNTS";
    };

export type AccountsApiResponse = APIResponse<Account[]>;
