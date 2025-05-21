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
    RolesAction,
    RolesContextType,
    RolesState,
} from "../pages/roles/types/rolesContext";
import { Role } from "../pages/roles/types/rolesTypes";
import { apiClient } from "../utils/axios";

export const RolesContext = createContext<RolesContextType | null>(null);

const initialState: RolesState = {
    roles: [] as Role[],
    role: {} as Role,
    error: "",
    searchVal: "",
    rolePagination: initialPaginationSettings,
};

const RolesReducer = (
    state: RolesState,
    action: RolesAction
): RolesState => {
    switch (action.type) {
        case "GET_ROLES":
            return {
                ...state,
                roles: action.payload.roles,
                rolePagination: action.payload.rolePagination,
            };
        case "GET_ROLES_ID":
            return {
                ...state,
                role: action.payload.roles,
            };
        case "DELETE_ROLE":
            return {
                ...state,
                roles: state.roles.filter((role) => role !== action.payload),
            };
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload,
            };
        case "SET_SEARCH_VAL_ROLE":
            return {
                ...state,
                searchVal: action.payload,
            };
        case "CLEAR_ROLES":
            return initialState;
        default:
            return state;
    }
};

function RolesProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(RolesReducer, initialState);
    const { showSuccessToast, showErrorToast } = useToast();

    const getRoles = async (
        paginationType: PaginationType,
        onSuccess?: () => void
    ) => {
        try {
            const queryParam = getRolesQueryParam(paginationType, state);
            const resp = await apiClient.get<APIResponse<Role[]>>(
                `/Roles/?${queryParam}`
            );
            const { document, Pagination } = resp;
            dispatch({
                type: "GET_ROLES",
                payload: {
                    roles: document || [],
                    rolePagination: Pagination || initialPaginationSettings,
                },
            });
        } catch (e) {
            dispatch({ type: "SET_ERROR", payload: "Error while getting roles" });
            showErrorToast("Error while getting roles");
            console.log("An error occurred while fetching roles", e);
        } finally {
            if (onSuccess) {
                onSuccess();
            }
        }
    };

    const getRolesbyId = async (id: string, callback?: () => void) => {
        try {
            const resp = await apiClient.get<APIResponse<Role>>(`/Roles/${id}`);
            dispatch({ type: "GET_ROLES_ID", payload: { roles: resp.document } });
        } catch (error) {
            showErrorToast("Error while getting contact");
            console.log("An error occurred while adding contact", error);
        } finally {
            if (callback) {
                callback();
            }
        }
    };

    const deleteRole = async (role: Role, onSuccess?: () => void) => {
        try {
            const resp = await apiClient.delete(`/Roles/${role.Id}`);
            dispatch({ type: "DELETE_ROLE", payload: role });
            showSuccessToast("Role Deleted Successfully");
        } catch (e) {
            console.log("An error occurred while deleting role", e);
            showErrorToast("Failed To Delete Role");
        } finally {
            if (onSuccess) {
                onSuccess();
            }
        }
    };

    const addRole = async (role: Role, onSuccess?: () => void) => {
        try {
            const resp = await apiClient.post("/Roles/Features", role);
            showSuccessToast("Role Added Successfully");
            if (onSuccess) {
                onSuccess();
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Error while adding user";
            dispatch({ type: "SET_ERROR", payload: errorMessage });
            showErrorToast(errorMessage);
            console.log("An error occurred while adding user", error);
        }
    };

    const updateRole = async (role: Role, onSuccess?: () => void) => {
        try {
            const resp = await apiClient.put(`/Roles/Features/${role.Id}`, role);
            showSuccessToast("Role Updated Successfully");
            if (onSuccess) {
                onSuccess();
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Error while adding user";
            dispatch({ type: "SET_ERROR", payload: errorMessage });
            showErrorToast(errorMessage);
            console.log("An error occurred while updating user", error);
        }
    };

    const searchRoles = async (
        paginationType: PaginationType,
        searchKey: string,
        onSuccess?: () => void
    ) => {
        try {
            const queryParam = getRolesQueryParam(paginationType, state);
            let key;
            if (searchKey === "") {
                key = state.searchVal;
            } else {
                key = searchKey;
                dispatch({ type: "SET_SEARCH_VAL_ROLE", payload: searchKey });
            }
            const resp = await apiClient.get<APIResponse<Role[]>>(
                `/Roles/search?searchKey=${key}&${queryParam}`
            );
            const { document, Pagination } = resp;
            dispatch({
                type: "GET_ROLES",
                payload: {
                    roles: document || [],
                    rolePagination: Pagination || initialPaginationSettings,
                },
            });
        } catch (e) {
            console.log("An error occurred while searching role", e);
        } finally {
            if (onSuccess) {
                onSuccess();
            }
        }
    };

    const clearRoles = async () => {
        try {
            dispatch({ type: "CLEAR_ROLES" });
        } catch (e) {
            console.error("Error occurred", e);
        }
    };

    const getRolesQueryParam = (
        paginationType: PaginationType,
        state: RolesState
    ) => {
        switch (paginationType) {
            case "RESET":
                return `page=${1}&itemsPerPage=${state.rolePagination.ItemsPerPage}`;
            case "PREV":
                return `page=${state.rolePagination.CurrentPage - 1}&itemsPerPage=${state.rolePagination.ItemsPerPage}`;
            case "NEXT":
                return `page=${state.rolePagination.CurrentPage + 1}&itemsPerPage=${state.rolePagination.ItemsPerPage}`;
            case "LAST":
                return `page=${state.rolePagination.TotalPages}&itemsPerPage=${state.rolePagination.ItemsPerPage}`;
            default:
                return `page=${state.rolePagination.CurrentPage}&itemsPerPage=${state.rolePagination.ItemsPerPage}`;
        }
    };

    return (
        <RolesContext.Provider
            value={{
                ...state,
                getRoles,
                deleteRole,
                addRole,
                updateRole,
                searchRoles,
                clearRoles,
                getRolesbyId
            }}
        >
            {children}
        </RolesContext.Provider>
    );
}

export default RolesProvider;
