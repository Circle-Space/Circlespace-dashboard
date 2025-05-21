import { PaginationInfo, PaginationType } from '../apiResponse';
import {
  CampaignAnalytics,
  ContactsUnsubscriptionRateAnalytics,
  ConversationStatusSummary,
  DeviceAnalytics,
  DeviceUsageAndEngagementAnalytics,
  UserActivityReport,
} from './analyticsTypes';

export type AnalyticsState = {
  deviceAnalytics: DeviceAnalytics;
  campaignAnalytics: CampaignAnalytics[];
  deviceUsageAndEngagementAnalytics: DeviceUsageAndEngagementAnalytics[];
  contactsUnsubscriptionRateAnalytics: ContactsUnsubscriptionRateAnalytics[];
  conversationStatusSummary: ConversationStatusSummary[];
  userActivityReport: UserActivityReport[];
  error: string;
  pagination: PaginationInfo;
};

export type AnalyticsContextType = AnalyticsState & {
  getDeviceAnalytics: (deviceId: string, onSuccess: () => void) => void;
  getCampaignAnalytics: (paginationType: PaginationType, onSuccess?: () => void) => Promise<void>;
  getDeviceUsageEnagementAnalytics: (paginationType: PaginationType, onSuccess?: () => void) => Promise<void>;
  getContactsUnsubscriptionRateAnalytics: (paginationType: PaginationType, onSuccess?: () => void) => Promise<void>;
  getUserActivityReport: (paginationType: PaginationType, onSuccess?: () => void) => Promise<void>;
  getConversationStatusSummary: (paginationType: PaginationType, onSuccess?: () => void) => Promise<void>;
};

export type AnalyticsAction =
  | {
      type: 'GET_DEVICE_ANALYTICS';
      payload: DeviceAnalytics;
    }
  | {
      type: 'GET_CAMPAIGN_ANALYTICS';
      payload: {
        campaignAnalytics: CampaignAnalytics[];
        campaignAnalyticsPagination: PaginationInfo;
      };
    }
  | {
      type: 'GET_DEVICE_USAGE_ENAGEMENT_ANALYTICS';
      payload: {
        deviceUsageAndEngagementAnalytics: DeviceUsageAndEngagementAnalytics[];
        deviceUsageAndEngagementAnalyticsPagination: PaginationInfo;
      };
    }
  | {
      type: 'GET_CONTACTS_UNSUBSCRIPTION_RATE_ANALYTICS';
      payload: {
        contactsUnsubscriptionRateAnalytics: ContactsUnsubscriptionRateAnalytics[];
        contactsUnsubscriptionRateAnalyticsPagination: PaginationInfo;
      };
    }
  | {
      type: 'GET_USER_ACTIVITY_REPORT';
      payload: {
        userActivityReport: UserActivityReport[];
        userActivityReportPagination: PaginationInfo;
      };
    }
  | {
      type: 'GET_COVERSATION_STATUS_SUMMARY';
      payload: {
        conversationStatusSummary: ConversationStatusSummary[];
        conversationStatusSummaryPagination: PaginationInfo;
      };
    }
  | {
      type: 'SET_ERROR';
      payload: string;
    };
