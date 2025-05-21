export interface EmailTemplate {
  Id: string;
  TemplateName?: string;
  Description?: string;
  HtmlContent?: string;
  PlainTextContent?: string;
  Subject: string;
  SenderAddress?: string;
  RecipientAddresses?: string;
  CCAddresses?: string;
  BCCAddresses?: string;
  Status?: string;
  Language?: string;
  Category?: string;
  PermissionGroupID?: string;
  Attachments?: string;
  RelatedTo?: string;
  RelatedToType?: string;
}

export interface AddEmailResp {
  EmailTemplates: EmailTemplate[];
  RecentAddedRecordId: string;
}