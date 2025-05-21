import { Device, DeviceTypes } from '../pages/devices/types/deviceTypes';
import { Feature } from '../pages/features/types/featuresTypes';
import { Role } from '../pages/roles/types/rolesTypes';
import { User } from '../pages/users/types/userTypes';
import { Account } from '../types/accountManagement/accountTypes';
import { EmailTemplate } from '../types/campaigns/campaignTypes';
import { SelectOption } from '../types/SelectOption';

/* Common select option utility functions */
export const findSelectOptionByValue = (value: any, selectOptions: SelectOption[]) => {
  return selectOptions.find(o => o.value === value);
};

export const findSelectOptionByLabel = (label: string, selectOptions: SelectOption[]) => {
  return selectOptions.find(o => o.label === label);
};

/* Select Utilities for select options specific to roles */
export const mapRolesToOptions = (config?: Role[]): SelectOption[] => {
  if (!config) return [];

  return config.map(role => ({
    value: role.Id,
    label: role.Name,
    description: role.Description,
  }));
};

export const mapDeviceTypesToOptions = (deviceTypes: DeviceTypes[]): SelectOption[] => {
  if (!deviceTypes) return [];

  return deviceTypes.map(deviceType => ({
    value: deviceType.Name,
    label: deviceType.Name,
  }));
};

/* Select Utilities for select options specific to Devices */
export const mapDevicesToOptions = (devices: Device[]): SelectOption[] => {
  if (!devices) return [];

  return devices
    .filter(d => d.DeviceType === 'Virtual Phone')
    .map(d => ({
      value: d.Id,
      label: `${d.DeviceType} - ${d.DeviceName} - ${d.PhoneNumber}`,
    }));
};

export const mapTemplateNameToOptions = (emailTemplates: EmailTemplate[]): SelectOption[] => {
  if (!emailTemplates) return [];

  return emailTemplates.map(template => ({
    value: template.Id,
    label: template.TemplateName,
  }));
};

export const findOptionLabelById = <T extends SelectOption>(id: string, options: T[]): string | null => {
  const foundOption = options.find(option => option.value === id);
  return foundOption ? foundOption.label : null;
};

/* Select Utilities for select options specific to Features */
export const findSelectOptionFeatureById = (values: string, selectOptions: SelectOption[]) => {
  return selectOptions.filter(o => values.includes(o.label));
};

export const mapFeaturesToOptions = (features: Feature[]): SelectOption[] => {
  if (!features) return [];

  return features
    .filter(feature => feature.IsActive)
    .map(feature => ({
      value: feature.Id,
      label: feature.Name,
    }));
};

/* Select Utilities for select options specific to Users */
export const mapUsersToOptions = (config: User[]): SelectOption[] => {
  return config.map((user: User) => {
    return {
      value: user.Id,
      label: `${user.FirstName} ${user.LastName} - ${user.Email}`,
    };
  });
};

export const mapAccountToOptions = (account: Account[]): SelectOption[] => {
  return account.map(account => ({
    value: account.Id,
    label: `${account.Name} `,
  }));
};

export const mapContactToOptions = (contact: Contact[]): SelectOption[] => {
  return contact.map(contact => ({
    value: contact.Id,
    label: `${contact.FirstName} ${contact.LastName} - ${contact.Email} `,
  }));
};
