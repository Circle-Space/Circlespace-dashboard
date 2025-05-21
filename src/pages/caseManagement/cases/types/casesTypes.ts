import { ActivityType } from '../../activityTypes/types/ActivityTypes';

export interface Case {
  Id: string;
  CaseNumber: string;
  Name: string;
  AssignTo: string | null;
  Description?: string;
  StatusID: string;
  PriorityID: string;
  RelatedTo?: string;
  RelatedToType?: string;
  Activities?: Activities[];
}

export interface Activities {
  Id: string;
  CaseId: string;
  ActivityTypeId: string;
  Notes?: string;
  Outcome?: string;
  ActivityType?: ActivityType[];
}
