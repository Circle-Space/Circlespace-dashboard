import { APIResponse, PaginationInfo, PaginationType } from "../apiResponse";
import { Contact } from "./contactsTypes";

export type ContactState = {
  contacts: Contact[];
  contact: Contact;
  searchVal: string;
  pagination: PaginationInfo;
};

export type ContactContextType = ContactState & {
  getContacts: (paginationType: PaginationType, callback?: () => void) => Promise<void>;
  getContact: (id: string, callback?: () => void) => Promise<void>;
  addContact: (contact: Contact, callback?: () => void) => void;
  updateContact: (contact: Contact, callback?: () => void) => void;
  deleteContacts: (id: string[], callback?: () => void) => void;
  searchContacts: (paginationType: PaginationType, searchKey: string, callback?: () => void) => void;
  addAttachment: (attachments: File[], onCallback?: () => void) => void;
  clearContacts: () => void;
};

export type ContactAction =
  | {
      type: "GET_CONTACTS";
      payload: {
        contacts: Contact[];
        pagination: PaginationInfo;
      };
    }
  | {
      type: "ADD_CONTACT";
      payload: {
        contacts: Contact[];
        pagination: PaginationInfo;
      };
    }
  | {
      type: "GET_CONTACT";
      payload: {
        contact: Contact;
      };
    }
  | {
      type: "UPDATE_CONTACT";
      payload: {
        contact: Contact;
      };
    }
  | {
      type: "SEARCH_CONTACT";
      payload: {
        contacts: Contact[];
        pagination: PaginationInfo;
      };
    }
  | {
      type: "SET_SEARCH_VAL";
      payload: string;
    }
  | {
      type: "CLEAR_CONTACTS";
    };


export type ContactsApiResponse = APIResponse<Contact[]>;