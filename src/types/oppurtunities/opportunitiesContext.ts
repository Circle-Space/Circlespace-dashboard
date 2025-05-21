import {
  PaginationInfo,
  PaginationType,
} from "../apiResponse";
import {
  Opportunities,
  OpportunitiesFormValues,
} from "./opportunitiesTypes";

export type OpportunityState = {
  opportunities: Opportunities[];
  selectedOpportunity: Opportunities;
  searchVal: string;
  opportunityPagination: PaginationInfo;
}

export type OpportunityContextType = OpportunityState & {
  getOpportunities: (paginationType: PaginationType, onSuccess?: () => void) => Promise<void>;
  addOpportunity: (opportunity: OpportunitiesFormValues, onSuccess?: () => void) => void;
  updateOpportunity: (opportunity: Opportunities, onSuccess?: () => void) => void;
  deleteOpportunity: (opportunity: Opportunities, onSuccess?: () => void) => void;
  searchOpportunities: (paginationType: PaginationType, searchKey: string, onSuccess?: () => void) => void;
  clearOpportunities: () => void;
};

export type OpportunityAction =
  | {
    type: "GET_OPPORTUNITIES";
    payload: {
      opportunities: Opportunities[];
      opportunityPagination: PaginationInfo;
    };
  }
  | {
    type: "DELETE_OPPORTUNITY";
    payload: Opportunities;
  }
  | {
    type: "SEARCH_OPPORTUNITY";
    payload: {
      opportunities: Opportunities[];
      opportunityPagination: PaginationInfo;
    };
  }
  | {
    type: "SET_SEARCH_VAL_OPPORTUNITY";
    payload: string;
  }
  | {
    type: "CLEAR_OPPORTUNITIES";
  };
