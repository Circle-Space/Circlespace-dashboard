import {
  createContext,
  ReactNode,
  useReducer,
} from 'react';

import useToast from '../hooks/useToast';
import {
  APIResponse,
  ResponseCode,
} from '../types/apiResponse';
import {
  CampaignManagementAction,
  CampaignManagementContextType,
  CampaignManagementState,
} from '../types/campaigns/campaignContextTypes';
import {
  Campaign,
  CampaignFormValues,
  CampaignList,
} from '../types/campaigns/campaignTypes';
import { apiClient } from '../utils/axios';
import { apiClientUploadFile } from '../utils/axiosUploadFile';

export const CampaignManagementContext =
  createContext<CampaignManagementContextType | null>(null);

const FETCH_CAMPAIGNS = "FETCH_CAMPAIGNS";
const FETCH_CAMPAIGN_LIST = "FETCH_CAMPAIGN_LIST";
const DELETE_CAMPAIGN = "DELETE_CAMPAIGN";
const UPDATE_CAMPAIGN = "UPDATE_CAMPAIGN";
const FETCH_CAMPAIGNS_STATUS = "FETCH_CAMPAIGNS_STATUS"
const SEARCH_CAMPAIGNS = "SEARCH_CAMPAIGNS"



const initialState = {
  loading: true,
  campaigns: [],
  campaignList: [],
};

const CampaignManagementReducer = (
  state: CampaignManagementState,
  action: CampaignManagementAction
): CampaignManagementState => {
  switch (action.type) {
    case FETCH_CAMPAIGNS:
      return {
        ...state,
        campaigns: action.payload
      }
    case DELETE_CAMPAIGN:
      return {
        ...state,
        campaigns: state.campaigns.filter(c => c.id !== action.payload)
      }
    case FETCH_CAMPAIGN_LIST:
      return {
        ...state,
        campaignList: action.payload
      }
    case FETCH_CAMPAIGNS_STATUS:
      return {
        ...state,
        campaigns: action.payload
      }
    case SEARCH_CAMPAIGNS:
      return {
        ...state,
        campaigns: action.payload,
      };
    default:
      return state;
  }
};

function CampaignManagementProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(CampaignManagementReducer, initialState);
  const { showSuccessToast, showErrorToast } = useToast();

  const fetchCampaigns = async () => {
    try {
      const resp = await apiClient.get<APIResponse<Campaign[]>>("/Campaigns");
      const data = resp.document || []
      dispatch({ type: FETCH_CAMPAIGNS, payload: data })
    } catch (e) {
      console.log("Erorr while fetching campaigns", e)
    }
  }

  const addCampaign = async (campaign: CampaignFormValues): Promise<APIResponse | undefined> => {
    try {
      const formData = new FormData();

      // Iterate over the keys of the campaign object
      Object.entries(campaign).forEach(([key, value]) => {
        if (key !== 'files' && value) {
          if (key === 'templates' && Array.isArray(value) && value.length > 0) {
            value.forEach(item => {
              formData.append(key, item);
            });
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      // Append file to formData
      if (campaign.files && campaign.files.length > 0) {
        formData.append('files', campaign.files[0], campaign.files[0].name);
      }

      const resp = await apiClient.post<APIResponse>('/Campaigns', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          timeout: 1800000,
        },
      });

      if (resp.code === ResponseCode.SUCCESS || resp.code === ResponseCode.WARNING || resp.code === ResponseCode.ERROR) {
        const toastFunc = resp.code === ResponseCode.SUCCESS ? showSuccessToast : showErrorToast;
        toastFunc(resp.message);
      }

      return resp;
    } catch (error: any) {
      console.error('Error while adding campaign', error);
      return undefined;
    }
  };



  const updateCampaign = async (campaign: Campaign, onCallback?: () => void) => {
    try {
      const formData = new FormData();

      // Iterate over the keys of the campaign object
      Object.keys(campaign).forEach((key) => {
        const value = campaign[key as keyof Campaign];
        if (key !== "files" && value) {
          if (key === "templates" && Array.isArray(value) && value.length > 0) {
            value.forEach((item) => {
              formData.append(key, item);
            });
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      const resp = await apiClient.put(`/Campaigns/${campaign.id}`, formData);

      showSuccessToast("Campaign updated successfully");
    } catch (e) {
      console.log("Error while adding campaign", e)
    } finally {
      if (onCallback) {
        onCallback()
      }
    }
  }

  const deleteCampaign = async (campaignId: string) => {
    try {
      const resp = await apiClient.delete(`/Campaigns/${campaignId}`);
      dispatch({ type: DELETE_CAMPAIGN, payload: campaignId })
      showSuccessToast("Campaign Deleted Successfully");
    } catch (e) {
      console.log("Error while adding campaign", e)
      showErrorToast("Failed To Delete Campaign")
    }
  };

  const campaignstatus = async (id: string, status: string, onSuccess?: () => void) => {
    try {
      const resp = await apiClient.put(`/Campaigns/Status/`, { id, status });
      if (onSuccess) {
        onSuccess();
      }
      showSuccessToast("Campaign Status updated successfully");
    } catch (e) {
      console.log("Error while updating campaign status", e);
      showErrorToast("Campaign Status update failed");
    }
  };

  const campaignupload = async (file: File, onSuccess?: () => void) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const resp = await apiClientUploadFile.post(`/Campaigns/upload`, file);

      if (onSuccess) {
        onSuccess();
      }
      showSuccessToast("File uploaded successfully");
    } catch (e) {
      console.log("Error while uploading the file", e);
      showErrorToast("File upload failed");
    }
  };

  const getCampaignList = async () => {
    try {
      const resp = await apiClient.get<APIResponse<CampaignList[]>>(`/Campaigns/ListCampaigns`);
      dispatch({
        type: FETCH_CAMPAIGN_LIST,
        payload: resp.document
      })
    } catch (e) {
      console.log("Error while uploading the file", e);
    }
  }

  const getCampaignStatus = async (status: string) => {
    try {
      const resp = await apiClient.get<APIResponse<Campaign[]>>(`/Campaigns/status/${status}?page=1&itemsPerPage=100`);
      const data = resp.document || [];
      dispatch({ type: FETCH_CAMPAIGNS_STATUS, payload: data });
    } catch (e) {
      console.log("Error while uploading the file", e);
    }
  }

  const searchCampaign = async (searchKey: string, onSuccess?: () => void) => {
    try {
      const resp = await apiClient.get<any>(`/Campaigns/search?searchKey=${searchKey}&page=1&itemsPerPage=100`);
      const data = resp.document || [];
      dispatch({ type: SEARCH_CAMPAIGNS, payload: data });
    } catch (e) {
      console.log("An error occured while searching contact", e);
    } finally {
      if (onSuccess) {
        onSuccess();
      }
    }
  };


  return (
    <CampaignManagementContext.Provider
      value={{
        ...state,
        addCampaign,
        fetchCampaigns,
        deleteCampaign,
        updateCampaign,
        campaignstatus,
        campaignupload,
        getCampaignList,
        getCampaignStatus,
        searchCampaign
      }}
    >
      {children}
    </CampaignManagementContext.Provider>
  );
}

export default CampaignManagementProvider;