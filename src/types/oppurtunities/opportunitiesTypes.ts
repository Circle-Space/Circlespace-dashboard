import { SelectOption } from "../SelectOption";

export type Opportunities = {
    Id: string;
    Name: string;
    AccountId: string;
    ContactId: string;
    Title: string;
    Category: string;
    Status: string;
    Description: string;
    Rating: string;
    Probability: string;
    HowFound: string;
    ExpectedRevenue: string;
    OpenDate?: string;
    CloseDate?: string;
    StageName: string;
};

export type OpportunitiesFormValues = {
    name: string;
    accountId: SelectOption;
    contactId: SelectOption;
    title: string;
    category: string;
    status: string;
    description: string;
    rating: string;
    probability: string;
    howFound: string;
    expectedRevenue: string;
    openDate?: Date;
    closeDate?: Date;
    stageName: string;
};
