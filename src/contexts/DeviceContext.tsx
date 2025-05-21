import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
} from 'react';

import useToast from '../hooks/useToast';
import {
  DeviceAction,
  DeviceContextType,
  DeviceState,
} from '../pages/devices/types/deviceContext';
import {
  ConversationReqBody,
  Device,
  MessageReqBody,
} from '../pages/devices/types/deviceTypes';
import {
  APIResponse,
  initialPaginationSettings,
  PaginationType,
} from '../types/apiResponse';
import {
  MessageUser,
  UserConversation,
} from '../types/sms/chat';
import { apiClient } from '../utils/axios';

export const DeviceContext = createContext<DeviceContextType | null>(null);

const initialState = {
  loading: true,
  devices: [] as Device[],
  device: {} as Device,
  userConversation: {} as UserConversation,
  devicePagination: initialPaginationSettings,
  error: "",
  searchVal: ""
};

const DeviceManagementReducer = (
  state: DeviceState,
  action: DeviceAction
): DeviceState => {
  switch (action.type) {
    case "GET_DEVICES":
      return {
        ...state,
        devices: action.payload.devices,
        devicePagination: action.payload.devicePagination
      };
    case "DELETE_DEVICE":
      return {
        ...state,
        devices: state.devices.filter((d) => d !== action.payload),
      };
    case "GET_DEVICE_ID":
      return {
        ...state,
        device: action.payload.device,
      };
    case "UPDATE_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "GET_USER_CONVERSATION": {
      const newState = { ...state.userConversation };
      const { id, userConversation, devicePagination } = action.payload
      newState[id] = userConversation;
      return {
        ...state,
        userConversation: newState,
        devicePagination,
        loading: false,
      };
    }
    case "LOAD_MORE": {
      const newState = { ...state.userConversation };
      const { id, userConversation, devicePagination } = action.payload
      newState[id] = [...userConversation]
      return {
        ...state,
        userConversation: newState,
        devicePagination
      }
    }
    case "UPDATE_USER_CONVERSATION": {
      const newState = { ...state.userConversation };
      const conversationsToUpdate = [
        ...newState[action.payload.serviceDeviceId],
      ];

      const updatedConversation = conversationsToUpdate.map((u) => {
        if (u.Id === action.payload.conversation.Id) {
          return action.payload.conversation;
        }
        return u;
      });
      newState[action.payload.serviceDeviceId] = updatedConversation;
      return {
        ...state,
        userConversation: newState,
      };
    }
    case "SET_SEARCH_VAL": {
      return {
        ...state,
        searchVal: action.payload
      }
    }
    case "RESET_PAGINATION": {
      return {
        ...state,
        devicePagination: action.payload
      }
    }
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "SEARCH_DEVICE":
      return {
        ...state,
        devices: action.payload.devices,
        devicePagination: action.payload.devicePagination,
      };

    case "CLEAR_DEVICES":
      return initialState;

    default:
      return state;
  }
};

function DeviceManagementProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(DeviceManagementReducer, initialState);
  const { showSuccessToast, showErrorToast } = useToast();

  const getDevices = async (paginationType: PaginationType, onSuccess?: () => void) => {
    try {
      const queryParam = getConversationsQueryParam(paginationType); // Assuming you have a function like this to build query parameters
      const resp = await apiClient.get<APIResponse<Device[]>>(`/Devices/?${queryParam}`);
      const { document, Pagination } = resp;
      dispatch({
        type: "GET_DEVICES",
        payload: {
          devices: document || [],
          devicePagination: Pagination || initialPaginationSettings,
        },
      });
    } catch (e) {
      showErrorToast("Error while getting devices");
      console.log("An error occurred while fetching devices", e);
    } finally {
      if (onSuccess) {
        onSuccess();
      }
    }
  };

  const getDeviceById = async (deviceId: string, callback?: () => void) => {
    try {
      const resp = await apiClient.get<APIResponse<Device>>(`/Devices/${deviceId}`);
      dispatch({ type: "GET_DEVICE_ID", payload: { device: resp.document } });
    } catch (error) {
      showErrorToast("Error while getting Device");
      console.log("An error occurred while getting Device", error);
    } finally {
      if (callback) {
        callback();
      }
    }
  };


  const deleteDevice = async (
    device: Device,
    onSuccess?: () => void
  ) => {
    try {
      const resp = await apiClient.delete(`/Devices/${device.Id}`);
      dispatch({ type: "DELETE_DEVICE", payload: device });
      showSuccessToast("Device Deleted Successfully");
    } catch (e) {
      console.log("An error occurred while deleting Device", e);
      showErrorToast("Failed To Delete Device");
    } finally {
      if (onSuccess) {
        onSuccess();
      }
    }
  };

  const addDevice = async (
    device: Device,
    onSuccess?: () => void
  ) => {
    try {
      const resp = await apiClient.post("/Devices", device);
      showSuccessToast("Device Added Successfully");
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Error while adding user";
      dispatch({ type: "SET_ERROR", payload: errorMessage });
      showErrorToast("Error while adding Device");
      console.log("An error occurred while adding Device", error);
    }
  };

  const updateDevice = async (
    device: Device,
    onSuccess?: () => void
  ) => {
    try {
      const resp = await apiClient.put(`/Devices/${device.Id}`, device);
      showSuccessToast("User Updated Successfully");
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Error while adding user";
      dispatch({ type: "SET_ERROR", payload: errorMessage });
      showErrorToast("Error while updating user");
      console.log("An error occurred while updating user", error);
    }
  };

  const getConversationByDeviceId = async (
    deviceId: string,
    paginationType: PaginationType,
    onSuccess?: () => void,
  ) => {
    try {

      const queryParam = getConversationsQueryParam(paginationType)
      const resp = await apiClient.get<APIResponse<MessageUser[]>>(
        `/Devices/Conversations/${deviceId}?${queryParam}`
      );
      const { document, Pagination } = resp;

      dispatch({
        type: "GET_USER_CONVERSATION",
        payload: {
          id: deviceId,
          userConversation: document || [],
          devicePagination: Pagination || initialPaginationSettings
        }
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (e: any) {
      console.log("error occured");
    }
  };

  const getActiveConversationByDeviceId = async (
    deviceId: string,
    campaingId: string,
    paginationType: PaginationType,
    onCallBack?: () => void
  ) => {
    try {
      const queryParam = getConversationsQueryParam(paginationType)
      const resp = await apiClient.get<APIResponse<MessageUser[]>>(
        `/Devices/Activeconversations/${deviceId}/${campaingId}?${queryParam}`
      );
      const { document, Pagination } = resp;
      dispatch({ type: "GET_USER_CONVERSATION", payload: { id: deviceId, userConversation: document || [], devicePagination: Pagination || initialPaginationSettings } });

    } catch (e: any) {
      console.log("error occured");
    } finally {

      if (onCallBack) {
        onCallBack()
      }
    }
  };

  const getInboundConversationByDeviceId = async (
    deviceId: string,
    campaignId: string,
    paginationType: PaginationType,
    onSuccess?: () => void
  ) => {
    try {
      const queryParam = getConversationsQueryParam(paginationType)
      const resp = await apiClient.get<APIResponse<MessageUser[]>>(
        `/Devices/Inboundconversations/${deviceId}/${campaignId}?${queryParam}`
      );
      const { document, Pagination } = resp;
      dispatch({
        type: "GET_USER_CONVERSATION",
        payload: {
          id: deviceId,
          userConversation: document || [],
          devicePagination: Pagination || initialPaginationSettings
        },
      });
      if (onSuccess) onSuccess();
    } catch (e: any) {
      console.log("error occured");
    }
  };

  const getConversationByCampaignId = async (
    deviceId: string,
    campaingId: string,
    paginationType: PaginationType,
    onCallBack?: () => void
  ) => {
    try {
      const queryParam = getConversationsQueryParam(paginationType)
      const resp = await apiClient.get<APIResponse<MessageUser[]>>(
        `Devices/conversations/campaigns/${deviceId}/${campaingId}?${queryParam}`
      );
      const { document, Pagination } = resp;
      dispatch({ type: "GET_USER_CONVERSATION", payload: { id: deviceId, userConversation: document || [], devicePagination: Pagination || initialPaginationSettings } });

    } catch (e: any) {
      console.log("error occured");
    } finally {

      if (onCallBack) {
        onCallBack()
      }
    }
  };

  const getConversationByConvType = async (
    deviceId: string,
    campaignId: string,
    status: string,
    type: string,
    paginationType: PaginationType,
    onSuccess?: () => void
  ) => {

    const queryParam = getConversationsQueryParam(paginationType)
    try {
      const resp = await apiClient.get<APIResponse<MessageUser[]>>(`/Devices/Conversations/${deviceId}/${campaignId}/${status}/${type}?${queryParam}`)
      console.log(resp)
      const { document, Pagination } = resp;
      dispatch({
        type: "GET_USER_CONVERSATION",
        payload: {
          id: deviceId,
          userConversation: document || [],
          devicePagination: Pagination || initialPaginationSettings
        },
      });
      if (onSuccess) onSuccess();
    } catch (e: any) {
      console.log("error occured");
    }
  }

  const getConversationBySearchFilter = async (
    deviceId: string,
    searchKey: string,
    paginationType: PaginationType,
    onSuccess?: () => void
  ) => {
    try {
      const queryParam = getConversationsQueryParam(paginationType)
      let key
      if (searchKey === "") {
        key = state.searchVal
      } else {
        key = searchKey
        dispatch({ type: "SET_SEARCH_VAL", payload: searchKey })
      }
      const resp = await apiClient.get<APIResponse<MessageUser[]>>(`/Devices/search?searchKey=${key}&${queryParam}`)
      const { document, Pagination } = resp;
      dispatch({
        type: "GET_USER_CONVERSATION",
        payload: {
          id: deviceId,
          userConversation: document || [],
          devicePagination: Pagination || initialPaginationSettings
        },
      });
      if (onSuccess) onSuccess();
    } catch (e: any) {
      console.log("error occured", e);
    }
  };

  const addConversation = async (
    conversationReqBody: ConversationReqBody,
    onSuccess?: () => void,
    onError?: (err: string) => void
  ) => {

    try {

      // Validate CampaignId
      if (!conversationReqBody.CampaignId) {
        throw new Error("Error: Campaign is required. Please add a campaign first in order to start a conversation");
      }

      const resp = await apiClient.post<any>(
        "/Conversations",
        conversationReqBody
      );
      const data = resp.document;
      dispatch({
        type: "GET_USER_CONVERSATION",
        payload: {
          id: conversationReqBody.DeviceId,
          userConversation: data,
          devicePagination: initialPaginationSettings
        },
      });
      if (onSuccess) {
        onSuccess();
      }
    } catch (e: any) {
      console.log("error occured", e);
      if (onError) {
        onError(e.response?.data?.message || e.message || "An error has occurred. Please try again");
      }
    }
  };

  const sendMessage = async (
    msgRequestBody: MessageReqBody,
    serviceDeviceId: string
  ) => {
    try {
      const resp = await apiClient.post<APIResponse<MessageUser>>("/SmsSendMsg", msgRequestBody);
      const data = resp.document;
      dispatch({
        type: "UPDATE_USER_CONVERSATION",
        payload: { conversation: data, serviceDeviceId },
      });
    } catch (e: any) {
      console.log("Error occured while sending message", e);
    }
  };

  const handleInboundMessage = (data: MessageUser, serviceDeviceId: string) => {

    if (data) {
      dispatch({
        type: 'UPDATE_USER_CONVERSATION',
        payload: { conversation: data, serviceDeviceId },
      });
    } else {
      console.log("Error occured while handling inbound message...no data found");
    }

  };


  const updateStatusType = async (
    id: string,
    Status: string,
    ConversationType: string,
    onSuccess?: () => void
  ) => {
    try {
      const resp = await apiClient.put(`/Conversations/StatusType/${id}`, {
        Status,
        ConversationType,
      });

      if (onSuccess) {
        onSuccess();
      }

      showSuccessToast("Status updated successfully");
    } catch (e) {
      console.log("Error while updating campaign status", e);
      showErrorToast("Status update failed");
    }
  };

  const searchDevices = async (paginationType: PaginationType, searchKey: string, onSuccess?: () => void) => {
    try {
      const queryParam = getConversationsQueryParam(paginationType); // Assuming you have a function like this to build query parameters
      let key;

      if (searchKey === "") {
        key = state.searchVal;
      } else {
        key = searchKey;
        dispatch({ type: "SET_SEARCH_VAL", payload: searchKey });
      }

      const resp = await apiClient.get<APIResponse<Device[]>>(
        `/Devices/search?searchKey=${key}&${queryParam}`
      );
      const { document, Pagination } = resp;
      dispatch({
        type: "SEARCH_DEVICE",
        payload: {
          devices: document || [],
          devicePagination: Pagination || initialPaginationSettings,
        },
      });
    } catch (e) {
      console.log("An error occurred while searching devices", e);
    } finally {
      if (onSuccess) {
        onSuccess();
      }
    }
  };

  const clearDevices = async () => {
    try {
      dispatch({ type: "CLEAR_DEVICES" });
    } catch (e) {
      console.error("Error occurred", e);
    }
  };


  const getConversationsQueryParam = (paginationType: PaginationType) => {
    if (paginationType === "RESET") {
      return `page=${1}&itemsPerPage=${initialPaginationSettings.ItemsPerPage}`
    } else if (paginationType === "PREV") {
      return `page=${state.devicePagination.CurrentPage - 1}&itemsPerPage=${state.devicePagination.ItemsPerPage}`
    } else if (paginationType === "NEXT") {
      return `page=${state.devicePagination.CurrentPage + 1}&itemsPerPage=${state.devicePagination.ItemsPerPage}`;
    } else {
      return `page=${state.devicePagination.CurrentPage}&itemsPerPage=${state.devicePagination.ItemsPerPage}`;
    }
  }

  useEffect(() => {
    getDevices("RESET");
  }, []);

  return (
    <DeviceContext.Provider
      value={{
        ...state,
        getDevices,
        getDeviceById,
        deleteDevice,
        addDevice,
        updateDevice,
        getConversationByDeviceId,
        addConversation,
        sendMessage,
        handleInboundMessage,
        updateStatusType,
        getActiveConversationByDeviceId,
        getInboundConversationByDeviceId,
        getConversationByCampaignId,
        getConversationByConvType,
        getConversationBySearchFilter,
        searchDevices,
        clearDevices
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
}

export default DeviceManagementProvider;
