import { AuthUser, Device } from '../types/auth';

// Mock user devices
const mockDevices: Device[] = [
  {
    Id: '1',
    DeviceType: 'Mobile',
    DeviceName: 'iPhone 14',
    SerialNumber: 'IMEI123456789',
    PhoneNumber: '+1234567890'
  },
  {
    Id: '2',
    DeviceType: 'Tablet',
    DeviceName: 'iPad Pro',
    SerialNumber: 'IPAD987654321',
    PhoneNumber: '+1987654321'
  }
];

// Mock user data
export const mockUser: AuthUser = {
  Id: '12345',
  FirstName: 'Demo',
  LastName: 'User',
  Email: 'demo@example.com',
  Username: 'demouser',
  RoleName: 'User',
  PhoneNumber: '+1234567890',
  Address1: '123 Main Street',
  City: 'Anytown',
  State: 'CA',
  Country: 'USA',
  PostalCode: '12345',
  IsApproved: true,
  Devices: mockDevices,
  Features: ['SMS', 'Contacts', 'Calendar']
};

// Mock token that will be stored in localStorage
export const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRlbW8gVXNlciIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxNjgwMDAwMDAwfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

// Mock login function that simulates authentication
export const mockLogin = (username: string, password: string): Promise<{ document: { AccessToken: string } }> => {
  return new Promise((resolve, reject) => {
    // Simple validation - in a real app, this would be more secure
    if (username === 'demouser' && password === 'password') {
      resolve({
        document: {
          AccessToken: mockToken
        }
      });
    } else {
      reject(new Error('Invalid username or password'));
    }
  });
};

// Mock function to get user info
export const mockGetUserInfo = (): Promise<{ document: AuthUser }> => {
  return Promise.resolve({
    document: mockUser
  });
}; 