import {
  createContext,
  ReactNode,
  useReducer,
} from 'react';

import useToast from '../hooks/useToast';
import {
  UserAction,
  UserContextType,
  UserState,
} from '../pages/users/types/userContext';
import {
  Password,
  UpdatePassword,
  User,
} from '../pages/users/types/userTypes';
import {
  APIResponse,
  initialPaginationSettings,
  PaginationType,
} from '../types/apiResponse';
import { apiClient } from '../utils/axios';

export const UserContext = createContext<UserContextType | null>(null);

const initialState: UserState = {
  users: [] as User[],
  user: {} as User,
  selectedUser: {} as User,
  searchVal: "",
  userPagination: initialPaginationSettings,
  error: "",
};

const UserReducer = (
  state: UserState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case "GET_USER":
      return {
        ...state,
        user: action.payload.user
      }
    case "GET_USERS":
      return {
        ...state,
        users: action.payload.users,
        userPagination: action.payload.userPagination,
      };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((u) => u.Id !== action.payload.Id),
      };
    case "SEARCH_USER":
      return {
        ...state,
        users: action.payload.users,
        userPagination: action.payload.userPagination,
      };
    case "SET_SEARCH_VAL_USER":
      return {
        ...state,
        searchVal: action.payload,
      };
    case
      "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "CLEAR_USERS":
      return initialState;
    default:
      return state;
  }
};

function UserProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(UserReducer, initialState);
  const { showSuccessToast, showErrorToast } = useToast();

  const getUserById = async (userId: string, onSuccess?: () => void) => {
    try {
      const resp = await apiClient.get<APIResponse<User>>(`/Users/${userId}`)
      const { document } = resp;
      dispatch({
        type: "GET_USER",
        payload: {
          user: document || []
        }
      })
    } catch (e) {
      showErrorToast("Error occured while getting user")
    } finally {
      if (onSuccess) {
        onSuccess();
      }
    }
  }
  const getUsers = async (
    paginationType: PaginationType,
    onSuccess?: () => void
  ) => {
    try {

      const queryParam = getUsersQueryParam(paginationType);
      const resp = await apiClient.get<APIResponse<User[]>>(
        `/Users`
      );
      const { document, Pagination } = resp;
      dispatch({
        type: "GET_USERS",
        payload: {
          users: document || [],
          userPagination: Pagination || initialPaginationSettings,
        },
      });
    } catch (e) {
      showErrorToast("Error while getting users");
      console.log("An error occurred while fetching users", e);
    } finally {
      if (onSuccess) {
        onSuccess();
      }
    }
  };

  const addUser = async (
    user: User,
    onSuccess?: () => void
  ) => {
    try {

      const resp = await apiClient.post("/users", user);
      showSuccessToast("User Added Successfully");
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Error while adding user";
      dispatch({ type: "SET_ERROR", payload: errorMessage });
      console.log("An error occurred while adding user", error);
    }
  };

  const updateUser = async (
    user: User,
    onSuccess?: () => void
  ) => {
    try {
      const resp = await apiClient.post("/users/", user);
      showSuccessToast("User Updated Successfully");
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Error while adding user";
      dispatch({ type: "SET_ERROR", payload: errorMessage });
      console.log("An error occurred while updating user", error);
    }
  };

  const deleteUser = async (
    user: User,
    onSuccess?: () => void
  ) => {
    try {
      const resp = await apiClient.delete(`/Users/${user.Id}`);
      dispatch({ type: "DELETE_USER", payload: user });
      showSuccessToast("User Deleted Successfully");
    } catch (e) {
      console.log("An error occurred while deleting user", e);
      showErrorToast("Failed To Delete User");
    } finally {
      if (onSuccess) {
        onSuccess();
      }
    }
  };

  const searchUsers = async (
    paginationType: PaginationType,
    searchKey: string,
    onSuccess?: () => void
  ) => {
    try {
      const queryParam = getUsersQueryParam(paginationType);
      let key;
      if (searchKey === "") {
        key = state.searchVal;
      } else {
        key = searchKey;
        dispatch({ type: "SET_SEARCH_VAL_USER", payload: searchKey });
      }
      const resp = await apiClient.get<APIResponse<User[]>>(
        `/Users/search?searchKey=${key}&${queryParam}`
      );
      const { document, Pagination } = resp;
      dispatch({
        type: "SEARCH_USER",
        payload: {
          users: document || [],
          userPagination: Pagination || initialPaginationSettings,
        },
      });
    } catch (e) {
      console.log("An error occurred while searching user", e);
    } finally {
      if (onSuccess) {
        onSuccess();
      }
    }
  };

  const clearUsers = async () => {
    try {
      dispatch({ type: "CLEAR_USERS" });
    } catch (e) {
      console.error("Error occurred", e);
    }
  };

  const UpdatePasswordProfile = async (password: Password, onSuccessCallback: () => void) => {
    const resp = await apiClient.put(`/Users/Profile/Password/${password.Id}`, password)
    onSuccessCallback()
  }

  const UpdatePasswordUser = async (password: UpdatePassword) => {
    try {
      const resp = await apiClient.put(`Users/Password/${password.Id}`, password)
      showSuccessToast("User Password updated successfully");
    } catch (e) {
      showErrorToast("User Password Failed");
      console.log("An error occured while deleting user", e)
    }
  }

  const getUsersQueryParam = (paginationType: PaginationType) => {
    switch (paginationType) {
      case "RESET":
        return `page=${1}&itemsPerPage=${initialPaginationSettings.ItemsPerPage}`;
      case "PREV":
        return `page=${state.userPagination.CurrentPage - 1}&itemsPerPage=${state.userPagination.ItemsPerPage}`;
      case "NEXT":
        return `page=${state.userPagination.CurrentPage + 1}&itemsPerPage=${state.userPagination.ItemsPerPage}`;
      case "LAST":
        return `page=${state.userPagination.TotalPages}&itemsPerPage=${state.userPagination.ItemsPerPage}`;
      default:
        return `page=${state.userPagination.CurrentPage}&itemsPerPage=${state.userPagination.ItemsPerPage}`;
    }
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        getUserById,
        getUsers,
        addUser,
        updateUser,
        deleteUser,
        searchUsers,
        clearUsers,
        UpdatePasswordProfile,
        UpdatePasswordUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
