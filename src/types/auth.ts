export type AuthUser = {
  Id: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Username: string;
  RoleName: string;
  DateOfBirth?: Date;
  PhoneNumber?: string;
  Address1?: string;
  Address2?: string;
  City?: string;
  State?: string;
  Country?: string;
  PostalCode?: string;
  IsApproved?: boolean,
  Devices: Device[];
  Features: string[];
}

export type Device = {
  Id: string;
  DeviceType: string;
  DeviceName: string;
  SerialNumber: string;
  PhoneNumber: string;
}

export type AuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser | null;
  smsInjectionDone: boolean;

};

export type JWTContextType = AuthState & {
  method: "jwt";
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;
  resetPassword: (email: string) => void;
  getUserinfo: () => void;
};
