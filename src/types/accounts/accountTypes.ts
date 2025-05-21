import { Contact } from "../contacts/contactsTypes";
import { PhoneDirectory } from "../phoneDirectories/phoneDirectoryTypes";

export interface Account {
  Id: string;
  Name: string;
  PhoneDirectories?: PhoneDirectory[];
  ContactList?: Contact[];
}
