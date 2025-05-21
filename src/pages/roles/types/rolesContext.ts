import { PaginationInfo, PaginationType } from "../../../types/apiResponse";
import { Role } from "./rolesTypes";

export type RolesState = {
  roles: Role[];
  role: Role;
  error: string;
  searchVal: string;
  rolePagination: PaginationInfo;
};

export type RolesContextType = RolesState & {
  getRoles: (paginationType: PaginationType, onSuccess?: () => void) => void;
  getRolesbyId: (id: string, callback?: () => void) => Promise<void>;
  deleteRole: (Id: string, onSuccess?: () => void) => void;
  addRole: (role: Role, onSuccess?: () => void) => void;
  updateRole: (role: Role, onSuccess?: () => void) => void;
  searchRoles: (
    paginationType: PaginationType,
    searchKey: string,
    onSuccess?: () => void
  ) => void;
  clearRoles: () => void;
};

export type RolesAction =
  | {
      type: "GET_ROLES";
      payload: {
        roles: Role[];
        rolePagination: PaginationInfo;
      };
    }
  | {
      type: "GET_ROLES_ID";
      payload: {
        roles: Role;
      };
    }
  | {
      type: "DELETE_ROLE";
      payload: string;
    }
  | {
      type: "SET_ERROR";
      payload: string;
    }
  | {
      type: "SET_SEARCH_VAL_ROLE";
      payload: string;
    }
  | {
      type: "CLEAR_ROLES";
    };
