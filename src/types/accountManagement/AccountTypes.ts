import { SelectOption } from "../SelectOption";

export type Account = {
    Id: string,
    Name: string,
    WebsiteUrl: string,
    PhoneNumber: string,
    PrimaryContactId: string,
    Address1: string,
    Address2: string,
    Address3: string,
    City: string,
    State: string,
    Country: string,
    PostalCode: string,
};

export type AccountFormValues = {
    Name: string,
    WebsiteUrl: string,
    PhoneNumber: string,
    PrimaryContactId: SelectOption | "",
    Address1: string,
    Address2: string,
    Address3: string,
    City: string,
    State: string,
    Country: string,
    PostalCode: string,
};

