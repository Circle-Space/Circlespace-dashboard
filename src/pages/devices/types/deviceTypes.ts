export type Device = {
  value?: any;
  Id: string;
  DeviceType: string;
  DeviceName: string;
  SerialNumber: string;
  PhoneNumber: string;
  ConnectionString: string;
  IsActive: boolean;
};

export type ConversationReqBody = {
  UserId: string;
  DeviceId: string;
  Name: string;
  PhoneNumber: string;
  FromPhoneNumber: string;
  Language: string;
  Avatar: string;
  CampaignId: string;
};

export type MessageReqBody = {
  ConversationId: string;
  CampaignId?: string;
  UserId: string;
  DeviceName: string;
  DeviceId?: string;
  MsgTo: string;
  Message: string;
};

export type Analytics = {
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

