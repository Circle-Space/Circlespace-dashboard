import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
} from 'react';

import useToast from '../hooks/useToast';
import {
  AnalyticsAction,
  AnalyticsContextType,
  AnalyticsState,
} from '../types/analytics/analyticsContext';
import {
  CampaignAnalytics,
  ContactsUnsubscriptionRateAnalytics,
  ConversationStatusSummary,
  DeviceAnalytics,
  DeviceUsageAndEngagementAnalytics,
  UserActivityReport,
} from '../types/analytics/analyticsTypes';
import {
  APIResponse,
  initialPaginationSettings,
  PaginationType,
} from '../types/apiResponse';
import { apiClient } from '../utils/axios';

export const AnalyticsContext =
  createContext<AnalyticsContextType | null>(null);

const initialState: AnalyticsState = {
  deviceAnalytics: {} as DeviceAnalytics,
  campaignAnalytics: [] as CampaignAnalytics[],
  deviceUsageAndEngagementAnalytics: [] as DeviceUsageAndEngagementAnalytics[],
  contactsUnsubscriptionRateAnalytics: [] as ContactsUnsubscriptionRateAnalytics[],
  userActivityReport: [] as UserActivityReport[],
  conversationStatusSummary: [] as ConversationStatusSummary[],
  error: "",
  pagination: initialPaginationSettings, // Include the campaignAnalyticsPagination property
};


const AnalyticsReducer = (
  state: AnalyticsState,
  action: AnalyticsAction
): AnalyticsState => {
  switch (action.type) {
    case 'GET_DEVICE_ANALYTICS': {
      return {
        ...state,
        deviceAnalytics: action.payload
      };
    }
    case 'GET_CAMPAIGN_ANALYTICS':
      return {
        ...state,
        campaignAnalytics: action.payload.campaignAnalytics,
        pagination: action.payload.campaignAnalyticsPagination,
      };
    case 'GET_DEVICE_USAGE_ENAGEMENT_ANALYTICS':
      return {
        ...state,
        deviceUsageAndEngagementAnalytics: action.payload.deviceUsageAndEngagementAnalytics,
        pagination: action.payload.deviceUsageAndEngagementAnalyticsPagination
      };
    case 'GET_CONTACTS_UNSUBSCRIPTION_RATE_ANALYTICS':
      return {
        ...state,
        contactsUnsubscriptionRateAnalytics: action.payload.contactsUnsubscriptionRateAnalytics,
        pagination: action.payload.contactsUnsubscriptionRateAnalyticsPagination,
      };
    case 'GET_USER_ACTIVITY_REPORT':
      return {
        ...state,
        userActivityReport: action.payload.userActivityReport,
        pagination: action.payload.userActivityReportPagination,
      };
    case 'GET_COVERSATION_STATUS_SUMMARY':
      return {
        ...state,
        conversationStatusSummary: action.payload.conversationStatusSummary,
        pagination: action.payload.conversationStatusSummaryPagination,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};


function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(AnalyticsReducer, initialState);
  const { showSuccessToast, showErrorToast } = useToast();

  useEffect(() => {
    getCampaignAnalytics("RESET");
    getContactsUnsubscriptionRateAnalytics("RESET")
    getDeviceUsageEnagementAnalytics("RESET")
    getUserActivityReport("RESET")
    getConversationStatusSummary("RESET")
  }, []);

  const getDeviceAnalytics = async (deviceId: string, onSuccess?: () => void) => {
    try {
      const resp = await apiClient.get<APIResponse<DeviceAnalytics>>(`Analytics/Device/${deviceId}`)
      dispatch({ type: "GET_DEVICE_ANALYTICS", payload: resp.document })
      if (onSuccess) {
        onSuccess()
      }
    } catch (e: any) {
      console.log("Error occured while fetching device analytics", e)
    }
  }

  const getCampaignAnalytics = async (
    paginationType: PaginationType,
    callback?: () => void
  ) => {
    try {
      const queryParam = getConversationsQueryParam(paginationType);
      const resp = await apiClient.get<APIResponse<CampaignAnalytics[]>>(
        `Analytics/Campaign/?${queryParam}`
      );

      const { document, Pagination } = resp;
      dispatch({
        type: "GET_CAMPAIGN_ANALYTICS",
        payload: {
          campaignAnalytics: document || [],
          campaignAnalyticsPagination: Pagination || initialPaginationSettings,
        },
      });
    } catch (e) {
      showErrorToast("Error while getting accounts");
      console.log("An error occurred while fetching accounts", e);
    } finally {
      if (callback) {
        callback();
      }
    }
  };

  const getContactsUnsubscriptionRateAnalytics = async (
    paginationType: PaginationType,
    callback?: () => void
  ) => {
    try {
      const queryParam = getConversationsQueryParam(paginationType);
      const resp = await apiClient.get<APIResponse<ContactsUnsubscriptionRateAnalytics[]>>(
        `Analytics/ContactsUnsubscriptionRate/?${queryParam}`
      );

      const { document, Pagination } = resp;
      dispatch({
        type: "GET_CONTACTS_UNSUBSCRIPTION_RATE_ANALYTICS",
        payload: {
          contactsUnsubscriptionRateAnalytics: document || [],
          contactsUnsubscriptionRateAnalyticsPagination: Pagination || initialPaginationSettings,
        },
      });
    } catch (e) {
      showErrorToast("Error while getting accounts");
      console.log("An error occurred while fetching accounts", e);
    } finally {
      if (callback) {
        callback();
      }
    }
  };

  const getDeviceUsageEnagementAnalytics = async (
    paginationType: PaginationType,
    callback?: () => void
  ) => {
    try {
      const queryParam = getConversationsQueryParam(paginationType);
      const resp = await apiClient.get<APIResponse<DeviceUsageAndEngagementAnalytics[]>>(
        `Analytics/DeviceUsageAndEngagement/?${queryParam}`
      );

      const { document, Pagination } = resp;
      dispatch({
        type: "GET_DEVICE_USAGE_ENAGEMENT_ANALYTICS",
        payload: {
          deviceUsageAndEngagementAnalytics: document || [],
          deviceUsageAndEngagementAnalyticsPagination: Pagination || initialPaginationSettings,
        },
      });
    } catch (e) {
      showErrorToast("Error while getting accounts");
      console.log("An error occurred while fetching accounts", e);
    } finally {
      if (callback) {
        callback();
      }
    }
  };

  const getUserActivityReport = async (
    paginationType: PaginationType,
    callback?: () => void
  ) => {
    try {
      const queryParam = getConversationsQueryParam(paginationType);
      const resp = await apiClient.get<APIResponse<UserActivityReport[]>>(
        `Analytics/UserActivityReport/?${queryParam}`
      );

      const { document, Pagination } = resp;
      dispatch({
        type: "GET_USER_ACTIVITY_REPORT",
        payload: {
          userActivityReport: document || [],
          userActivityReportPagination: Pagination || initialPaginationSettings,
        },
      });
    } catch (e) {
      showErrorToast("Error while getting accounts");
      console.log("An error occurred while fetching accounts", e);
    } finally {
      if (callback) {
        callback();
      }
    }
  };

  const getConversationStatusSummary = async (
    paginationType: PaginationType,
    callback?: () => void
  ) => {
    try {
      const queryParam = getConversationsQueryParam(paginationType);
      const resp = await apiClient.get<APIResponse<ConversationStatusSummary[]>>(
        `Analytics/ConversationStatusSummary/?${queryParam}`
      );

      const { document, Pagination } = resp;
      dispatch({
        type: "GET_COVERSATION_STATUS_SUMMARY",
        payload: {
          conversationStatusSummary: document || [],
          conversationStatusSummaryPagination: Pagination || initialPaginationSettings,
        },
      });
    } catch (e) {
      showErrorToast("Error while getting accounts");
      console.log("An error occurred while fetching accounts", e);
    } finally {
      if (callback) {
        callback();
      }
    }
  };

  const getConversationsQueryParam = (paginationType: PaginationType) => {
    switch (paginationType) {
      case "RESET":
        return `page=${1}&itemsPerPage=${initialPaginationSettings.ItemsPerPage}`;
      case "PREV":
        return `page=${state.pagination.CurrentPage - 1}&itemsPerPage=${state.pagination.ItemsPerPage
          }`;
      case "NEXT":
        return `page=${state.pagination.CurrentPage + 1}&itemsPerPage=${state.pagination.ItemsPerPage
          }`;
      case "LAST":
        return `page=${state.pagination.TotalPages}&itemsPerPage=${state.pagination.ItemsPerPage
          }`;
      default:
        return `page=${state.pagination.CurrentPage}&itemsPerPage=${state.pagination.ItemsPerPage
          }`;
    }
  };

  return (
    <AnalyticsContext.Provider
      value={{
        ...state,
        getDeviceAnalytics,
        getCampaignAnalytics,
        getContactsUnsubscriptionRateAnalytics,
        getDeviceUsageEnagementAnalytics,
        getUserActivityReport,
        getConversationStatusSummary
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
}

export default AnalyticsProvider;
