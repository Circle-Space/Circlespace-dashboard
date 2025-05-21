import { Device } from "../../devices/types/deviceTypes";
import { Feature } from "../../features/types/featuresTypes";
import { Role } from "../../roles/types/rolesTypes";

export type User = {
  Id: string;
  IsApproved?: boolean;
  FirstName: string;
  LastName: string;
  Email: string;
  Username: string;
  CreatedAt?: Date;
  DateOfBirth?: Date;
  PhoneNumber?: string;
  Address1?: string;
  Address2?: string;
  City?: string;
  State?: string;
  Country?: string;
  PostalCode?: string;
  AvatarUrl?: string;
  PasswordHash?: string;
  ConfirmPasswordHash?: string;
  Roles?: Role[];
  Devices?: Device[];
  Features?: Feature[];
};


export type Password = {
  Id: string;
  oldPassword: string;
  newPassword: string;
};

export type UpdatePassword = {
  Id: string;
  Password: string;
};
