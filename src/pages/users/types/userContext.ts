import {
  PaginationInfo,
  PaginationType,
} from "../../../types/apiResponse";
import {
  Password,
  UpdatePassword,
  User,
} from "./userTypes";

export type UserState = {
  users: User[];
  user: User;
  selectedUser: User;
  searchVal: string;
  userPagination: PaginationInfo;
  error: string | null;
};

export type UserContextType = UserState & {
  getUserById: (userId: string, onSuccess?: () => void) => void;
  getUsers: (
    paginationType: PaginationType,
    onSuccess?: () => void
  ) => Promise<void>;
  addUser: (user: User, onSuccess?: () => void) => void;
  updateUser: (user: User, onSuccess?: () => void) => void;
  deleteUser: (user: User, onSuccess?: () => void) => void;
  searchUsers: (
    paginationType: PaginationType,
    searchKey: string,
    onSuccess?: () => void
  ) => void;
  clearUsers: () => void;
  UpdatePasswordProfile: (
    password: Password,
    onSuccessCallback: () => void
  ) => void;
  UpdatePasswordUser: (password: UpdatePassword) => void;
};

export type UserAction =
  | {
    type: "GET_USER";
    payload: {
      user: User;
    };
  }
  | {
    type: "GET_USERS";
    payload: {
      users: User[];
      userPagination: PaginationInfo;
    };
  }
  | {
    type: "DELETE_USER";
    payload: User;
  }
  | {
    type: "SEARCH_USER";
    payload: {
      users: User[];
      userPagination: PaginationInfo;
    };
  }
  | {
    type: "SET_SEARCH_VAL_USER";
    payload: string;
  }
  | {
    type: "CLEAR_USERS";
  }
  | {
    type: "SET_ERROR",
    payload: string;
  };


