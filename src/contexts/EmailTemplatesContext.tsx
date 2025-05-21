import React, {
    createContext,
    ReactNode,
    useReducer,
} from 'react';

import useToast from '../hooks/useToast';
import {
    EmailTemplateAction,
    EmailTemplateContextType,
    EmailTemplateState,
} from '../pages/Configurations/types/emailTemplatescontext';
import { AddEmailResp, EmailTemplate } from '../pages/Configurations/types/emailTemplatestype';
import {
    APIResponse,
    initialPaginationSettings,
    PaginationType,
} from '../types/apiResponse';
import { apiClient } from '../utils/axios';

export const EmailTemplateContext = createContext<EmailTemplateContextType | null>(null);

const initialEmailTemplateState: EmailTemplateState = {
    emailTemplates: [] as EmailTemplate[],
    emailTemplate: {} as EmailTemplate,
    selectedEmailTemplate: {} as EmailTemplate,
    searchVal: "",
    emailTemplatePagination: initialPaginationSettings,
};

const emailTemplateReducer = (
    state: EmailTemplateState,
    action: EmailTemplateAction
): EmailTemplateState => {
    switch (action.type) {
        case "GET_EMAIL_TEMPLATES":
            return {
                ...state,
                emailTemplates: action.payload.emailTemplates,
                emailTemplatePagination: action.payload.emailTemplatePagination,
            };
        case "GET_EMAIL_TEMPLATE_BY_ID":
            return {
                ...state,
                emailTemplate: action.payload.emailTemplate,
            };
        case "ADD_EMAIL_TEMPLATE": 
            return {
                ...state,
                emailTemplates: action.payload
            }
        case "DELETE_EMAIL_TEMPLATE":
            return {
                ...state,
                emailTemplates: state.emailTemplates.filter((et) => et.Id !== action.payload.Id),
            };
        case "UPDATE_EMAIL_TEMPLATE":
            return {
                ...state,
                emailTemplates: state.emailTemplates.map(e => {
                    if(e.Id === action.payload.Id) {
                        return action.payload
                    } else {
                        return e
                    }
                })
            }
        case "SEARCH_EMAIL_TEMPLATE":
            return {
                ...state,
                emailTemplates: action.payload.emailTemplates,
                emailTemplatePagination: action.payload.emailTemplatePagination,
            };
        case "SET_SEARCH_VAL_EMAIL_TEMPLATE":
            return {
                ...state,
                searchVal: action.payload,
            };
        case "CLEAR_EMAIL_TEMPLATES":
            return initialEmailTemplateState;
        default:
            return state;
    }
};

function EmailTemplateProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(emailTemplateReducer, initialEmailTemplateState);
    const { showSuccessToast, showErrorToast } = useToast();

    const getEmailTemplates = async (
        paginationType: PaginationType,
        onSuccess?: () => void
    ) => {
        try {
            const queryParam = getEmailTemplatesQueryParam(paginationType);
            const resp = await apiClient.get<APIResponse<EmailTemplate[]>>(
                `/Emailtemplates/?${queryParam}`
            );
            const { document, Pagination } = resp;
            dispatch({
                type: "GET_EMAIL_TEMPLATES",
                payload: {
                    emailTemplates: document || [],
                    emailTemplatePagination: Pagination || initialPaginationSettings,
                },
            });
        } catch (e) {
            showErrorToast("Error while getting email templates");
            console.log("An error occurred while fetching email templates", e);
        } finally {
            if (onSuccess) {
                onSuccess();
            }
        }
    };

    const getEmailTemplateById = async (id: string, callback?: () => void) => {
        try {
            const resp = await apiClient.get<APIResponse<EmailTemplate>>(`/EmailTemplates/${id}`);
            dispatch({ type: "GET_EMAIL_TEMPLATE_BY_ID", payload: { emailTemplate: resp.document } });
        } catch (error) {
            showErrorToast("Error while getting email template");
            console.log("An error occurred while getting email template", error);
        } finally {
            if (callback) {
                callback();
            }
        }
    };

    const addEmailTemplate = async (
        emailTemplate: EmailTemplate,
        onSuccess?: (newId: string) => void
    ) => {
        try {
            const resp = await apiClient.post<APIResponse<AddEmailResp>>("/Emailtemplates", emailTemplate);
            dispatch({type: "ADD_EMAIL_TEMPLATE", payload: resp.document.EmailTemplates })
            if(onSuccess) {
                onSuccess(resp.document.RecentAddedRecordId)
            }
            showSuccessToast("Email Template Added Successfully");
        } catch (error) {
            showErrorToast("Error while adding email template");
            console.log("An error occurred while adding email template", error);
        } 
    };

    const updateEmailTemplate = async (
        emailTemplate: EmailTemplate,
        onSuccess?: () => void
    ) => {
        try {
            const resp = await apiClient.put("/EmailTemplates", emailTemplate);
            showSuccessToast("Email Template Updated Successfully");
            dispatch({ type: "UPDATE_EMAIL_TEMPLATE", payload: emailTemplate})
        } catch (error) {
            showErrorToast("Error while updating email template");
            console.log("An error occurred while updating email template", error);
        } finally {
            if (onSuccess) {
                onSuccess();
            }
        }
    };

    const deleteEmailTemplate = async (
        emailTemplate: EmailTemplate,
        onSuccess?: () => void
    ) => {
        try {
            const resp = await apiClient.delete(`/EmailTemplates/${emailTemplate.Id}`);
            dispatch({ type: "DELETE_EMAIL_TEMPLATE", payload: emailTemplate });
            showSuccessToast("Email Template Deleted Successfully");
        } catch (e) {
            console.log("An error occurred while deleting email template", e);
            showErrorToast("Failed To Delete Email Template");
        } finally {
            if (onSuccess) {
                onSuccess();
            }
        }
    };

    const searchEmailTemplates = async (
        paginationType: PaginationType,
        searchKey: string,
        onSuccess?: () => void
    ) => {
        try {
            const queryParam = getEmailTemplatesQueryParam(paginationType);
            let key;
            if (searchKey === "") {
                key = state.searchVal;
            } else {
                key = searchKey;
                dispatch({ type: "SET_SEARCH_VAL_EMAIL_TEMPLATE", payload: searchKey });
            }
            const resp = await apiClient.get<APIResponse<EmailTemplate[]>>(
                `/EmailTemplates/search?searchKey=${key}&${queryParam}`
            );
            const { document, Pagination } = resp;
            dispatch({
                type: "SEARCH_EMAIL_TEMPLATE",
                payload: {
                    emailTemplates: document || [],
                    emailTemplatePagination: Pagination || initialPaginationSettings,
                },
            });
        } catch (e) {
            console.log("An error occurred while searching email templates", e);
        } finally {
            if (onSuccess) {
                onSuccess();
            }
        }
    };

    const clearEmailTemplates = async () => {
        try {
            dispatch({ type: "CLEAR_EMAIL_TEMPLATES" });
        } catch (e) {
            console.error("Error occurred", e);
        }
    };

    const getEmailTemplatesQueryParam = (paginationType: PaginationType) => {
        switch (paginationType) {
            case "RESET":
                return `page=${1}&itemsPerPage=${initialPaginationSettings.ItemsPerPage}`;
            case "PREV":
                return `page=${state.emailTemplatePagination.CurrentPage - 1}&itemsPerPage=${state.emailTemplatePagination.ItemsPerPage}`;
            case "NEXT":
                return `page=${state.emailTemplatePagination.CurrentPage + 1}&itemsPerPage=${state.emailTemplatePagination.ItemsPerPage}`;
            case "LAST":
                return `page=${state.emailTemplatePagination.TotalPages}&itemsPerPage=${state.emailTemplatePagination.ItemsPerPage}`;
            default:
                return `page=${state.emailTemplatePagination.CurrentPage}&itemsPerPage=${state.emailTemplatePagination.ItemsPerPage}`;
        }
    };

    return (
        <EmailTemplateContext.Provider
            value={{
                ...state,
                getEmailTemplates,
                addEmailTemplate,
                updateEmailTemplate,
                deleteEmailTemplate,
                searchEmailTemplates,
                clearEmailTemplates,
                getEmailTemplateById,
            }}
        >
            {children}
        </EmailTemplateContext.Provider>
    );
}

export default EmailTemplateProvider;
