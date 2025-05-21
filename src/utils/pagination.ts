import { PaginationInfo, PaginationType, initialPaginationSettings } from "../types/apiResponse";

export const getConversationsQueryParam = (paginationInfo: PaginationInfo, paginationType: PaginationType) => {
  switch (paginationType) {
    case "RESET":
      return `page=${1}&itemsPerPage=${initialPaginationSettings.ItemsPerPage}`
    case "PREV":
      return `page=${paginationInfo.CurrentPage - 1}&itemsPerPage=${paginationInfo.ItemsPerPage}`
    case "NEXT":
      return `page=${paginationInfo.CurrentPage + 1}&itemsPerPage=${paginationInfo.ItemsPerPage}`;
    case "LAST":
      return `page=${paginationInfo.TotalPages}&itemsPerPage=${paginationInfo.ItemsPerPage}`;
    default:
      return `page=${paginationInfo.CurrentPage}&itemsPerPage=${paginationInfo.ItemsPerPage}`;
  }
}