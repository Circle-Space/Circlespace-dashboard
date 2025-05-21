import { PaginationInfo, PaginationType } from '../../../types/apiResponse';
import { EmailTemplate } from './emailTemplatestype';

export type EmailTemplateState = {
  emailTemplates: EmailTemplate[];
  emailTemplate: EmailTemplate;
  selectedEmailTemplate: EmailTemplate;
  searchVal: string;
  emailTemplatePagination: PaginationInfo;
};

export type EmailTemplateContextType = EmailTemplateState & {
  getEmailTemplates: (paginationType: PaginationType, onSuccess?: () => void) => Promise<void>;
  getEmailTemplateById: (id: string, callback?: () => void) => Promise<void>;
  addEmailTemplate: (emailTemplate: EmailTemplate, onSuccess?: (newId: string) => void) => void;
  updateEmailTemplate: (emailTemplate: EmailTemplate, onSuccess?: () => void) => void;
  deleteEmailTemplate: (emailTemplate: EmailTemplate, onSuccess?: () => void) => void;
  searchEmailTemplates: (paginationType: PaginationType, searchKey: string, onSuccess?: () => void) => void;
  clearEmailTemplates: () => void;
};

export type EmailTemplateAction =
  | {
      type: 'GET_EMAIL_TEMPLATES';
      payload: {
        emailTemplates: EmailTemplate[];
        emailTemplatePagination: PaginationInfo;
      };
    }
  | {
      type: 'GET_EMAIL_TEMPLATE_BY_ID';
      payload: {
        emailTemplate: EmailTemplate;
      };
    }
  | {
      type: "ADD_EMAIL_TEMPLATE";
      payload: EmailTemplate[];
    }
  | {
      type: 'DELETE_EMAIL_TEMPLATE';
      payload: EmailTemplate;
    }
  | {
      type: 'UPDATE_EMAIL_TEMPLATE';
      payload: EmailTemplate;
    }
  | {
      type: 'SEARCH_EMAIL_TEMPLATE';
      payload: {
        emailTemplates: EmailTemplate[];
        emailTemplatePagination: PaginationInfo;
      };
    }
  | {
      type: 'SET_SEARCH_VAL_EMAIL_TEMPLATE';
      payload: string;
    }
  | {
      type: 'CLEAR_EMAIL_TEMPLATES';
    };
