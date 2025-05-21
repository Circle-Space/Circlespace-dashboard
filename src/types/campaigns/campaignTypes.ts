import { SelectOption } from '../SelectOption';

export type Campaign = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: string;
  FileName: string;
  filePath: string;
  cloudProvider: string;
  createdAt: Date;
  updatedAt: Date;
  manualStart: boolean;
  description: string;
  deviceId: string;
  campaignType: string;
  Queued: number;
  Fulfilled: number;
  Unsuccessful: number;
  templates: string[];
  devicePhoneNumber: string;
  selectedCampaing: SelectOption;
};

export type CampaignList = {
  CampaignId: string;
  CampaignName: string;
};

export interface CampaignFormValues {
  name: string;
  UserId: string;
  Useremail: string;
  startDate: string;
  endDate: string;
  description: string;
  manualStart: boolean;
  templates: string[];
  FileName: string;
  filePath: string;
  deviceId: SelectOption;
  cloudProvider: string;
  campaignType: string;
  devicePhoneNumber: string;
  files?: File[];
  emailTemplateId: string;
  emailHtmlContent: string;
  subject: string;
}

export const campaignTypes: SelectOption[] = [
  {
    value: 'CLOUD',
    label: 'CLOUD',
  },
  {
    value: 'LOCAL_DAEMON',
    label: 'LOCAL DAEMON',
  },
];

export const cloudProvider: SelectOption[] = [
  {
    value: 'Azure',
    label: 'Azure',
  },
];
