export interface PhoneDirectory {
  PhoneDirectoryLinkID: string | null;
  AreaCode: string | null;
  PhoneNumber: string;
  CountryCode: string;
  Extension: string | null;
  PhoneType: string;
  IsPrimary: boolean;
  VerifiedStatus: boolean | null;
  VerificationDate: string | null;
  Region: string | null;
  FormattedNumber: string | null;
  Label: string | null;
  Notes: string | null;
}
