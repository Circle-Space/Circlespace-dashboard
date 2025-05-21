export type DeviceAnalytics = {
  Active: number;
  DoNotCall: number;
  Interested: number;
  Quoted: number;
  FollowUp: number;
  Appointments: number;
  AppointmentSent: number;
  AppointmentSet: number;
  WaitingForAgent: number;
};

export type CampaignAnalytics = {
  CampaignId: string;
  CampaignName: string;
  TotalMessagesSent: number;
  SuccessfulMessages: number;
  UniqueUsers: number;
  UniqueContacts: number;
};

export type ContactsUnsubscriptionRateAnalytics = {
  CampaignId: string;
  CampaignName: string;
  TotalContacts: number;
  UnsubscribedContacts: number;
};

export type DeviceUsageAndEngagementAnalytics = {
  DeviceName: string;
  ConversationsCount: number;
};

export type UserActivityReport = {
  UserId: string;
  Username: string;
  MessagesSent: number;
  ConversationsStarted: number;
};

export type ConversationStatusSummary = {
  Status: string;
  NumberOfConversations: number;
};

export type ChartData = {
  id: string;
  title: string;
  chartType: string;
  data: any[]
}