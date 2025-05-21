import { PaginationInfo, PaginationType } from '../../../types/apiResponse';
import { MessageUser, UserConversation } from '../../../types/sms/chat';
import { ConversationReqBody, Device, MessageReqBody } from './deviceTypes';

export type DeviceState = {
  loading: boolean;
  devices: Device[];
  device: Device;
  error: string;
  userConversation: UserConversation;
  devicePagination: PaginationInfo;
  searchVal: string;
};

export type DeviceContextType = DeviceState & {
  getDevices: (paginationType: PaginationType, onSuccess?: () => void) => Promise<void>;
  getDeviceById: (deviceId: string, onSuccess?: () => void) => void;
  deleteDevice: (device: Device, onSuccess?: () => void) => void;
  addDevice: (device: Device, onSuccess?: () => void) => void;
  updateDevice: (device: Device, onSuccess?: () => void) => void;
  getConversationByDeviceId: (deviceId: string, paginationType: PaginationType, onSuccess?: () => void) => void;
  getActiveConversationByDeviceId: (deviceId: string, campaignId: string, paginationType: PaginationType, onSuccess?: () => void) => void;
  getInboundConversationByDeviceId: (deviceId: string, campaignId: string, paginationType: PaginationType, onSuccess?: () => void) => void;
  getConversationByCampaignId: (deviceId: string, campaignId: string, paginationType: PaginationType, onSuccess?: () => void) => void;
  addConversation: (reqBody: ConversationReqBody, onSuccess?: () => void, onError?: (err: string) => void) => void;
  sendMessage: (reqBody: MessageReqBody, serviceDeviceId: string) => void;
  handleInboundMessage: (data: MessageUser, serviceDeviceId: string) => void;
  updateStatusType: (id: string, Status: string, ConversationType: string, onSuccess?: () => void) => void;
  getConversationByConvType: (
    deviceId: string,
    campaignId: string,
    status: string,
    type: string,
    paginationType: PaginationType,
    onSuccess?: () => void,
  ) => void;
  getConversationBySearchFilter: (deviceId: string, searchKey: string, paginationType: PaginationType, onSuccess?: () => void) => void;
  searchDevices: (paginationType: PaginationType, searchKey: string, onSuccess?: () => void) => void;
  clearDevices: () => void;
};

export type DeviceAction =
  | {
      type: 'GET_DEVICES';
      payload: {
        devices: Device[];
        devicePagination: PaginationInfo;
      };
    }
  | {
      type: 'GET_DEVICE_ID';
      payload: {
        device: Device;
      };
    }
  | {
      type: 'UPDATE_LOADING';
      payload: boolean;
    }
  | {
      type: 'DELETE_DEVICE';
      payload: Device;
    }
  | {
      type: 'GET_USER_CONVERSATION';
      payload: {
        userConversation: MessageUser[];
        id: string;
        devicePagination: PaginationInfo;
      };
    }
  | {
      type: 'UPDATE_USER_CONVERSATION';
      payload: {
        conversation: MessageUser;
        serviceDeviceId: string;
      };
    }
  | {
      type: 'LOAD_MORE';
      payload: {
        userConversation: MessageUser[];
        id: string;
        devicePagination: PaginationInfo;
      };
    }
  | {
      type: 'RESET_PAGINATION';
      payload: PaginationInfo;
    }
  | {
      type: 'SET_SEARCH_VAL';
      payload: string;
    }
  | {
      type: 'SET_ERROR';
      payload: string;
    }
  | {
      type: 'SEARCH_DEVICE';
      payload: {
        devices: Device[];
        devicePagination: PaginationInfo;
      };
    }
  | {
      type: 'CLEAR_DEVICES';
    };
