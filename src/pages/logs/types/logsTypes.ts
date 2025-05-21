export type Logs = {
    Id: string;
    Message: string;
    FromDevicePhoneNumber: string;
    ContactName: string;
    Language: string;
    MsgFrom: string;
    MsgTo: string;
    Direction: string;
    Successful: boolean;
    ErrorMessage?: string;
    CreatedAt: string;
};
