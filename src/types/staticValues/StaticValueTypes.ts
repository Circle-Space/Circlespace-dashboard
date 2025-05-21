import { Device } from '../../pages/devices/types/deviceTypes';
import { Feature } from '../../pages/features/types/featuresTypes';
import { Role } from '../../pages/roles/types/rolesTypes';
import { SelectOption } from '../SelectOption';

export interface StaticValue {
  Devices: Device[];
  Features: Feature[];
  Roles: Role[];
  Users: SelectOption[];
  DeviceTypes: SelectOption[];
  CaseActivityTypes: SelectOption[];
  CasePriorities: SelectOption[];
  CaseStatuses: SelectOption[];
  ProductCategories: SelectOption[];
}
