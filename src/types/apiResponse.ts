export interface APIResponse<T = any> {
  code: ResponseCode;
  message: string;
  document: T; // The type of 'document' can be specified when using this interface
  Pagination?: PaginationInfo;
}

export interface PaginationInfo {
  CurrentPage: number;
  ItemsPerPage: number;
  TotalItems: number;
  TotalPages: number;
}

export enum ResponseCode {
  ERROR = 0,
  SUCCESS = 1,
  WARNING = 2,
}

export type PaginationType = 'RESET' | 'PREV' | 'NEXT' | 'CURRENT' | 'LAST';

export const initialPaginationSettings: PaginationInfo = {
  CurrentPage: 0,
  ItemsPerPage: 10,
  TotalItems: 0,
  TotalPages: 0,
};
