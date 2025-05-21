import { APIResponse, PaginationInfo, PaginationType } from '../../../../types/apiResponse';
import { Status } from './statusTypes'; // Adjust as per your status type definition

export type StatusState = {
  statuses: Status[];
  status: Status;
  error: string;
  searchVal: string;
  pagination: PaginationInfo;
};

export type StatusContextType = StatusState & {
  getStatus: (paginationType: PaginationType, callback?: () => void) => Promise<void>;
  getStatusbyId: (id: string, callback?: () => void) => Promise<void>;
  addStatus: (status: Status, onSuccess?: () => void) => void;
  updateStatus: (status: Status, onSuccess?: () => void) => void;
  deleteStatus: (id: string, callback?: () => void) => void;
  searchStatus: (paginationType: PaginationType, searchKey: string, onSuccess?: () => void) => void;
  clearStatus: () => void;
};

export type StatusAction =
  | {
      type: 'GET_STATUS';
      payload: {
        statuses: Status[];
        pagination: PaginationInfo;
      };
    }
  | {
      type: 'ADD_STATUS';
      payload: {
        statuses: Status[];
        pagination: PaginationInfo;
      };
    }
  | {
      type: 'GET_STATUS_BY_ID';
      payload: {
        status: Status;
      };
    }
  | {
      type: 'UPDATE_STATUS';
      payload: {
        status: Status;
      };
    }
  | {
      type: 'SEARCH_STATUS';
      payload: {
        statuses: Status[];
        pagination: PaginationInfo;
      };
    }
  | {
      type: 'SET_STATUS_ERROR';
      payload: string;
    }
  | {
      type: 'SET_STATUS_SEARCH_VAL';
      payload: string;
    }
  | {
      type: 'CLEAR_STATUS';
    }
  | {
      type: 'SET_ERROR';
      payload: string;
    }
  | {
      type: 'SET_SEARCH_VAL';
      payload: string;
    };

export type StatusApiResponse = APIResponse<Status[]>; // Adjust as per your API response structure
