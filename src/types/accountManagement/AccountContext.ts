import {
  PaginationInfo,
  PaginationType,
} from "../apiResponse";
import {
  Account,
  AccountFormValues,
} from "./AccountTypes";

export type AccountState = {
  accounts: Account[];
  selectedAccount: Account;
  searchVal: string;
  accountPagination: PaginationInfo
}

export type AccountContextType = AccountState & {
  getAccounts: (paginationType: PaginationType, onSuccess?: () => void) => Promise<void>;
  addAccount: (account: AccountFormValues, onSuccess?: () => void) => void;
  updateAccount: (account: Account, onSuccess?: () => void) => void;
  deleteAccount: (account: Account, onSuccess?: () => void) => void;
  searchAccounts: (paginationType: PaginationType, searchKey: string, onSuccess?: () => void) => void;
  clearAccounts: () => void;
};

export type AccountAction =
  | {
    type: "GET_ACCOUNTS";
    payload: {
      accounts: Account[];
      accountPagination: PaginationInfo;
    };
  }
  | {
    type: "DELETE_ACCOUNT";
    payload: Account;
  }
  | {
    type: "SEARCH_ACCOUNT";
    payload: {
      accounts: Account[];
      accountPagination: PaginationInfo;
    };
  }
  | {
    type: "SET_SEARCH_VAL";
    payload: string
  }
  | {
    type: "CLEAR_ACCOUNTS";
  };
