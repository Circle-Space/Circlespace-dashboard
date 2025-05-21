import _ from "lodash";
import { Deviceoption, SelectOption } from "../../../types/SelectOption";
import { Device } from "../../devices/types/deviceTypes";

export const formatSelectedDevice = (selectedOption: Deviceoption | null) => {
    if (!selectedOption) return [];

    return [
        {
            Id: selectedOption.Id,
            DeviceName: selectedOption.DeviceName,
            DeviceType: selectedOption.DeviceType,
            ConnectionString: selectedOption.ConnectionString,
            PhoneNumber: selectedOption.PhoneNumber,
            SerialNumber: selectedOption.SerialNumber,
            IsActive: selectedOption.IsActive
        }
    ];
};
