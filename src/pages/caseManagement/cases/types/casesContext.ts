import { ApiFilterParameter } from '../../../../types/apiFilterParameter/apiFilterParameter';
import { APIResponse, PaginationInfo, PaginationType } from '../../../../types/apiResponse';
import { Activities, Case } from './casesTypes';

export type CaseState = {
  cases: Case[];
  case: Case;
  error: string;
  searchVal: string;
  pagination: PaginationInfo;
  caseActivities: Activities[];
};

export type CaseContextType = CaseState & {
  getCases: (paginationType: PaginationType, callback?: () => void) => Promise<void>;
  getCase: (id: string, callback?: () => void) => Promise<void>;
  getActivitiesByCaseId: (filter: ApiFilterParameter, paginationType: PaginationType, callback?: () => void) => Promise<void>;
  getOpenCases: (filter: ApiFilterParameter, paginationType: PaginationType, callback?: () => void) => Promise<void>;
  getMyCases: (filter: ApiFilterParameter, paginationType: PaginationType, callback?: () => void) => Promise<void>;
  addCase: (c: Case, onSuccess?: () => void) => void;
  updateCase: (c: Case, onSuccess?: () => void) => void;
  deleteCases: (id: string, onSuccess?: () => void) => void;
  searchCases: (paginationType: PaginationType, searchKey: string, onSuccess?: () => void) => void;
  addCaseActivities: (caseactivities: Activities, onSuccess?: () => void) => void;
  deleteCaseActivities: (activityId: string, onSuccess?: () => void) => void;
  updateCaseActivities: (activity: Activities, onSuccess?: () => void) => void;
  clearCases: () => void;
};

export type CaseAction =
  | {
      type: 'GET_CASES';
      payload: {
        cases: Case[];
        pagination: PaginationInfo;
      };
    }
  | {
      type: 'GET_ACTIVITIES_BY_CASE_ID';
      payload: {
        caseActivities: Activities[];
        pagination: PaginationInfo;
      };
    }
  | {
      type: 'GET_OPEN_CASES';
      payload: {
        cases: Case[];
        pagination: PaginationInfo;
      };
    }
  | {
      type: 'GET_MY_CASES';
      payload: {
        cases: Case[];
        pagination: PaginationInfo;
      };
    }
  | {
      type: 'ADD_CASE';
      payload: {
        cases: Case[];
        pagination: PaginationInfo;
      };
    }
  | {
      type: 'ADD_CASEACTIVITIES';
      payload: {
        caseactivities: Activities[];
        pagination: PaginationInfo;
      };
    }
  | {
      type: 'UPDATE_CASEACTIVITIES'; // New action type for update
      payload: {
        activity: Activities;
      };
    }
  | {
      type: 'GET_CASE';
      payload: {
        case: Case;
      };
    }
  | {
      type: 'UPDATE_CASE';
      payload: {
        case: Case;
      };
    }
  | {
      type: 'SEARCH_CASE';
      payload: {
        cases: Case[];
        pagination: PaginationInfo;
      };
    }
  | {
      type: 'SET_ERROR';
      payload: string;
    }
  | {
      type: 'SET_SEARCH_VAL';
      payload: string;
    }
  | {
      type: 'CLEAR_CASES';
    };

export type CasesApiResponse = APIResponse<Case[]>; // Adjust as per your API response structure
