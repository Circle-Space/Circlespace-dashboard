export interface Address {
  AddressBookLinkID: string | null;
  AddressType: string;
  AddressLine1: string | null;
  AddressLine2: string | null;
  AddressLine3: string | null;
  City: string;
  State: string | null;
  PostalCode: string | null;
  Country: string;
  Notes: string | null;
  VerifiedStatus: boolean | null;
  VerificationDate: string | null; // ISO date string or null
}
