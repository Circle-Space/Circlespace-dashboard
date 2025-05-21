import {
  createContext,
  ReactNode,
  useReducer,
} from 'react';

import useToast from '../hooks/useToast';
import {
  APIResponse,
  initialPaginationSettings,
  PaginationType,
  ResponseCode,
} from '../types/apiResponse';
import {
  ContactAction,
  ContactContextType,
  ContactState,
} from '../types/contacts/contactsContext';
import { Contact } from '../types/contacts/contactsTypes';
import { apiClient } from '../utils/axios';

export const ContactContext = createContext<ContactContextType | null>(null);

const initialState: ContactState = {
  contacts: [] as Contact[],
  contact: {} as Contact,
  searchVal: "",
  pagination: initialPaginationSettings,
};

const ContactReducer = (state: ContactState, action: ContactAction): ContactState => {
  switch (action.type) {
    case "GET_CONTACTS":
      return {
        ...state,
        contacts: action.payload.contacts,
        pagination: action.payload.pagination
      };

    case "GET_CONTACT":
      return {
        ...state,
        contact: action.payload.contact,
      };

    case "ADD_CONTACT":
      return {
        ...state,
        contacts: action.payload.contacts,
        pagination: action.payload.pagination,
      };

    case "UPDATE_CONTACT":
      return {
        ...state,
        contact: action.payload.contact,
      };


    case "SEARCH_CONTACT":
      return {
        ...state,
        contacts: action.payload.contacts,
        pagination: action.payload.pagination
      };

    case "SET_SEARCH_VAL": {
      return {
        ...state,
        searchVal: action.payload
      }
    }
    case "CLEAR_CONTACTS":
      return initialState;

    default:
      return state;
  }
};

function ContactProvider({ children }: { children: ReactNode }) {

  const [state, dispatch] = useReducer(ContactReducer, initialState);
  const { showSuccessToast, showErrorToast } = useToast();

  const getContacts = async (
    paginationType: PaginationType,
    callback?: () => void
  ) => {
    try {
      const queryParam = getConversationsQueryParam(paginationType);
      const resp = await apiClient.get<APIResponse<Contact[]>>(`/contacts/?${queryParam}`);

      const { document, Pagination } = resp;
      dispatch({
        type: "GET_CONTACTS",
        payload: {
          contacts: document || [],
          pagination: Pagination || initialPaginationSettings,
        },
      });

    } catch (e) {
      showErrorToast("Error while getting contacts");
      console.log("An error occurred while fetching contacts", e);
    } finally {
      if (callback) {
        callback();
      }
    }
  };

  const getContact = async (id: string, cacllback?: () => void) => {
    try {
      const resp = await apiClient.get<APIResponse<Contact>>(`/contacts/${id}`);
      dispatch({ type: "GET_CONTACT", payload: { contact: resp.document } });
    } catch (error) {
      showErrorToast("Error while getting contact");
      console.log("An error occurred while adding contact", error);
    } finally {
      if (cacllback) {
        cacllback();
      }
    }
  };

  const addContact = async (contact: Contact, callback?: () => void) => {
    try {
      await apiClient.put<APIResponse<Contact[]>>("/contacts", contact);
      showSuccessToast("Contact Added Suceesfully");
    } catch (error) {
      showErrorToast("Error while getting contacts");
      console.log("An error occurred while adding contact", error);
    } finally {
      if (callback) {
        callback();
      }
    }
  };

  const updateContact = async (contact: Contact, callback?: () => void) => {
    try {
      const resp = await apiClient.put<APIResponse<Contact>>(
        `/contacts`,
        contact
      );
      dispatch({
        type: "UPDATE_CONTACT",
        payload: {
          contact: resp.document,
        },
      });

      showSuccessToast("Contacts Updated Suceesfully");
    } catch (error) {
      showErrorToast("Error while updating contacts");
      console.log("An error occurred while updating contact", error);
    } finally {
      if (callback) {
        callback();
      }
    }
  };


  const deleteContacts = async (ids: string[], onCallBack?: () => void) => {
    try {
      const queryString = ids.map(id => `contactIds=${id}`).join('&');
      const response = await apiClient.delete<APIResponse>(`/contacts/?${queryString}`);

      switch (response.code) {
        case ResponseCode.ERROR:
          showErrorToast(response.message);
          break;
        case ResponseCode.SUCCESS:
          await getContacts("RESET");
          showSuccessToast("Contact Deleted Successfully");
          break;
        default:
          showErrorToast("Unexpected response code");
      }

    } catch (e) {
      console.error(e); // Log the error for debugging
      showErrorToast("Failed To Delete Contact");
    }
    finally {
      if (onCallBack) {
        onCallBack();
      }
    }
  };

  const searchContacts = async (
    paginationType: PaginationType,
    searchKey: string,
    callback?: () => void
  ) => {
    try {
      const queryParam = getConversationsQueryParam(paginationType);
      let key;
      if (searchKey === "") {
        key = state.searchVal;
      } else {
        key = searchKey;
        dispatch({ type: "SET_SEARCH_VAL", payload: searchKey });
      }


      const resp = await apiClient.get<APIResponse<Contact[]>>(
        `/contacts/search?searchKey=${key}&${queryParam}`
      );

      const { document, Pagination } = resp;
      dispatch({
        type: "SEARCH_CONTACT",
        payload: {
          contacts: document || [],
          pagination: Pagination || initialPaginationSettings,
        },
      });

    } catch (e) {
      console.log("An error occured while searching contact", e);
    } finally {
      if (callback) {
        callback();
      }
    }
  };

  const addAttachment = async (attachments: File[], onCallback?: (resp: any) => void) => {
    try {
      debugger;

      const formData = new FormData();

      if (attachments && attachments.length > 0) {
        attachments.forEach(item => formData.append('files', item));
      }

      const resp = await apiClient.postcfg('/contacts/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      debugger;
      await getContacts("RESET");

      if (onCallback) {
        onCallback(resp);
      }
    } catch (e) {
      console.log('Error while adding attachment', e);
    }

  };

  const clearContacts = async () => {
    try {
      dispatch({ type: "CLEAR_CONTACTS" });
    } catch (e) {
      console.error("Error occurred", e);
    }
  };

  const getConversationsQueryParam = (paginationType: PaginationType) => {
    switch (paginationType) {
      case "RESET":
        return `page=${1}&itemsPerPage=${initialPaginationSettings.ItemsPerPage}`
      case "PREV":
        return `page=${state.pagination.CurrentPage - 1}&itemsPerPage=${state.pagination.ItemsPerPage}`
      case "NEXT":
        return `page=${state.pagination.CurrentPage + 1}&itemsPerPage=${state.pagination.ItemsPerPage}`;
      case "LAST":
        return `page=${state.pagination.TotalPages}&itemsPerPage=${state.pagination.ItemsPerPage}`;
      default:
        return `page=${state.pagination.CurrentPage}&itemsPerPage=${state.pagination.ItemsPerPage}`;
    }
  }

  return (
    <ContactContext.Provider
      value={{
        ...state,
        getContacts,
        getContact,
        addContact,
        updateContact,
        deleteContacts,
        searchContacts,
        clearContacts,
        addAttachment,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
}

export default ContactProvider;

