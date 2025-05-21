import * as Yup from "yup";
import { PASSWORD_PATTERN } from "../../../constants";
import { User } from "../types/userTypes";
import { Role } from "../../roles/types/rolesTypes";
import { Device } from "../../devices/types/deviceTypes";

export const initialUserForm = {
    FirstName: "",
    LastName: "",
    Email: "",
    Username: "",
    PhoneNumber: "",
    Address1: "",
    Address2: "",
    City: "",
    State: "",
    Country: "",
    PostalCode: "",
    Roles: [] as Role[],
    Devices: [] as Device[],
    PasswordHash: "",
    ConfirmPasswordHash: "",
    IsApproved: false,
} as User;


export const validationUserSchema = Yup.object({
    FirstName: Yup.string().required("First Name is required"),
    LastName: Yup.string().required("Last Name is required"),
    Username: Yup.string().required("Username is required"),
    Email: Yup.string().email("Invalid email").required("Email is required"),
    PasswordHash: Yup.string()
        .required("Password is required")
        .matches(PASSWORD_PATTERN, "Password must meet the requirements")
        .min(8, "Password must be at least 8 characters")
        .max(16, "Password must not exceed 16 characters"),
    ConfirmPasswordHash: Yup.string()
        .oneOf([Yup.ref("PasswordHash"), ""], "Passwords must match")
        .required("Confirm Password is required"),

});

export const validationUpdateUserSchema = Yup.object({
    FirstName: Yup.string().required("First Name is required"),
    LastName: Yup.string().required("Last Name is required"),
    Username: Yup.string().required("Username is required"),
    Email: Yup.string().email("Invalid email").required("Email is required")

});
