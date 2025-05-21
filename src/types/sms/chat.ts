export type ChatUser = {
  id: number;
  name: string;
  avatar: string;
  isOnline: boolean;
  unreadMessages: number;
  content: ChatMessage[];
};

export type ChatMessage = {
  id: number;
  position: 'left' | 'right';
  name: string;
  avatar: string;
  time: string;
  content: string;
};

export type Message = {
  Id: string;
  ConversationId: string | null;
  AgentName: string;
  UserId: string | null;
  CampaignId: string | null;
  DeviceId: string | null;
  MsgUrl: string;
  MsgFrom: string;
  MsgTo: string;
  Content: string;
  Direction: string | null;
  MessageId: string | null;
  HttpStatusCode: number;
  Successful: boolean;
  ErrorMessage: string | null;
  CreatedAt: string | null;
  CreatedTime: string;
};

export type MessageUser = {
  Id: string;
  Name: string;
  UserId: string | null;
  CampaignId: string | null;
  DeviceId: string | null;
  Status: string | null;
  PhoneNumber: string;
  FromPhoneNumber: string;
  Language: string;
  Avatar: string;
  IsOnline: boolean;
  IsInbound: boolean;
  UnreadMessages: number;
  CreatedAt: string | null;
  UpdatedAt: string | null;
  Messages: Message[];
};

export type UserConversation = {
  [id: string]: MessageUser[];
};
