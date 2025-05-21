import { APIResponse } from '../../types/apiResponse';
import { Campaign, CampaignFormValues, CampaignList } from './campaignTypes';

export type CampaignManagementState = {
  loading: boolean;
  campaigns: Campaign[];
  campaignList: CampaignList[];
};

export type CampaignManagementContextType = CampaignManagementState & {
  addCampaign: (campaign: CampaignFormValues) => Promise<APIResponse | undefined>;
  updateCampaign: (campaign: Campaign, onCallback?: () => void) => void;
  fetchCampaigns: () => void;
  deleteCampaign: (campaignId: string) => void;
  campaignstatus: (id: string, status: string, onSuccess?: () => void) => void;
  campaignupload: (file: File, onSuccess?: () => void) => void;
  getCampaignList: () => void;
  getCampaignStatus: (status: string) => void;
  searchCampaign: (searchKey: string, onSuccess?: () => void) => void;
};

export type CampaignManagementAction =
  | {
      type: 'FETCH_CAMPAIGNS';
      payload: Campaign[];
    }
  | {
      type: 'DELETE_CAMPAIGN';
      payload: string;
    }
  | {
      type: 'FETCH_CAMPAIGN_LIST';
      payload: CampaignList[];
    }
  | {
      type: 'FETCH_CAMPAIGNS_STATUS';
      payload: Campaign[];
    }
  | {
      type: 'SEARCH_CAMPAIGNS';
      payload: Campaign[];
    };
