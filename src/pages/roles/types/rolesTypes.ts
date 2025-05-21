import { Feature } from "../../features/types/featuresTypes";

export type Role = {
  Id: string;
  Name: string;
  Description: string;
  IsActive: boolean;
  Features: Feature[];
};
