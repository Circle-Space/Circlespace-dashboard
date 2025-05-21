import { Account } from "../accounts/accountTypes";
import { Address } from "../addresses/addressTypes";
import { APIResponse } from "../apiResponse";
import { PhoneDirectory } from "../phoneDirectories/phoneDirectoryTypes";
import { SocialMedia } from "../socialmedias/socialmediaTypes";

export interface Contact {
  Id: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Email: string;
  Email2: string | null;
  DateOfBirth: string;
  Gender: "Male" | "Female" | "";
  CreatedBy?: string;
  AddressList: Address[];
  PhoneDirectories: PhoneDirectory[];
  SocialMedias: SocialMedia[];
  AccountList: Account[];
}


export type ContactsApiResponse = APIResponse<Contact[]>;