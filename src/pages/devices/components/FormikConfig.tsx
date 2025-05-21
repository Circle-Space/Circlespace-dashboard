import * as Yup from "yup";

import { Device } from "../../devices/types/deviceTypes";

export const initialDevice: Device = {
    Id: "00000000-0000-0000-0000-000000000000",
    DeviceType: "",
    DeviceName: "",
    SerialNumber: "",
    ConnectionString: "",
    IsActive: false,
    PhoneNumber: "",
};


export const deviceValidationSchema = Yup.object({
    DeviceType: Yup.string().required("Device Type is required"),
    DeviceName: Yup.string().required("Device Name is required"),
    SerialNumber: Yup.string().required("Serial Number is required"),
    PhoneNumber: Yup.string().required("Phone Number is required"),
    ConnectionString: Yup.string().required("Connection String is required"),
});


