import { SelectOption } from "../SelectOption";

export type ActivityLog = {
    Id: string;
    Subject: string;
    ActivityDate?: Date; // Assuming it's a string representation of a date, you might want to use a Date type if needed.
    ActivityType: string;
    AccountId: string;
    ContactId: string;
    Description: string;
};

export type ActivityLogFormValues = {
    subject: string;
    activityDate?: Date;
    activityType: string;
    accountId: SelectOption;
    contactId: SelectOption;
    description: string;
};
