import { APIResponse, PaginationInfo, PaginationType } from '../../../../types/apiResponse';
import { Priority } from './priorityTypes'; // Adjust as per your priority type definition

export type PriorityState = {
  priorities: Priority[];
  priority: Priority;
  error: string;
  searchVal: string;
  pagination: PaginationInfo;
};

export type PriorityContextType = PriorityState & {
  getPriorities: (paginationType: PaginationType, callback?: () => void) => Promise<void>;
  getPriorityById: (id: string, callback?: () => void) => Promise<void>;
  addPriority: (priority: Priority, onSuccess?: () => void) => void;
  updatePriority: (priority: Priority, onSuccess?: () => void) => void;
  deletePriority: (id: string, callback?: () => void) => void;
  searchPriorities: (paginationType: PaginationType, searchKey: string, onSuccess?: () => void) => void;
  clearPriorities: () => void;
};

export type PriorityAction =
  | {
      type: 'GET_PRIORITIES';
      payload: {
        priorities: Priority[];
        pagination: PaginationInfo;
      };
    }
  | {
      type: 'ADD_PRIORITY';
      payload: {
        priorities: Priority[];
        pagination: PaginationInfo;
      };
    }
  | {
      type: 'GET_PRIORITY_BY_ID';
      payload: {
        priority: Priority;
      };
    }
  | {
      type: 'UPDATE_PRIORITY';
      payload: {
        priority: Priority;
      };
    }
  | {
      type: 'SEARCH_PRIORITIES';
      payload: {
        priorities: Priority[];
        pagination: PaginationInfo;
      };
    }
  | {
      type: 'SET_PRIORITY_ERROR';
      payload: string;
    }
  | {
      type: 'SET_PRIORITY_SEARCH_VAL';
      payload: string;
    }
  | {
      type: 'CLEAR_PRIORITIES';
    }
  | {
      type: 'SET_ERROR';
      payload: string;
    }
  | {
      type: 'SET_SEARCH_VAL';
      payload: string;
    };

export type PriorityApiResponse = APIResponse<Priority[]>; // Adjust as per your API response structure
