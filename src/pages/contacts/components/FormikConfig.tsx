import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { Account } from "../../../types/accounts/accountTypes";
import { Address } from "../../../types/addresses/addressTypes";
import { Contact } from "../../../types/contacts/contactsTypes";
import {
  PhoneDirectory,
} from "../../../types/phoneDirectories/phoneDirectoryTypes";
import { SocialMedia } from "../../../types/socialmedias/socialmediaTypes";

export const initialContactValues: Contact = {
    Id: "00000000-0000-0000-0000-000000000000",
    FirstName: "",
    MiddleName: "",
    LastName: "",
    Email: "",
    Email2: "",
    DateOfBirth: "",
    Gender: "",
    AddressList: [] as Address[],
    PhoneDirectories: [] as PhoneDirectory[],
    SocialMedias: [] as SocialMedia[],
    AccountList: [] as Account[],
}

// Validation for Address objects
export const addressValidationSchema = Yup.object().shape({
    AddressBookLinkID: Yup.string().nullable(),
    AddressType: Yup.string().required("Address type is required"),
    AddressLine1: Yup.string().nullable(),
    AddressLine2: Yup.string().nullable(),
    AddressLine3: Yup.string().nullable(),
    City: Yup.string().required("City is required"),
    State: Yup.string().nullable(),
    PostalCode: Yup.string().nullable(),
    Country: Yup.string().required("Country is required"),
    Notes: Yup.string().nullable(),
    VerifiedStatus: Yup.boolean().nullable(),
    VerificationDate: Yup.string().nullable(), // You might want to add more specific validation for the date format
});

export const phoneDirectoryValidationSchema = Yup.object().shape({
    PhoneDirectoryLinkID: Yup.string().nullable(),
    AreaCode: Yup.string().required("area code is required")
        .matches(/^[0-9]+$/, "Area code must be numeric")
        .length(3, "Area code must be exactly 3 digits"),
    PhoneNumber: Yup.string().required("phone number is required")
        .matches(/^[0-9]+$/, "Area code must be numeric")
        .length(7, "Phone Number must be exactly 7 digits"),
    CountryCode: Yup.string().required("Country code is required"),
    Extension: Yup.string().nullable(),
    PhoneType: Yup.string().required("Phone type is required"),
    IsPrimary: Yup.boolean(),
    VerifiedStatus: Yup.boolean().nullable(),
    VerificationDate: Yup.string().nullable(), // Consider date format validation
    Region: Yup.string().nullable(),
    FormattedNumber: Yup.string().nullable(),
    Label: Yup.string().nullable(),
    Notes: Yup.string().nullable(),
});


// Validation for SocialMedia objects
const socialMediaValidationSchema = Yup.object().shape({
    SocialMediaLinkID: Yup.string().required("Social media link ID is required"),
    SocialMediaType: Yup.string().required("Social media type is required"),
    SocialMediaURL: Yup.string().url("Invalid URL").required("Social media URL is required"),
});

// Validation for Account objects
export const accountValidationSchema = Yup.object().shape({
    Id: Yup.string().required("Account ID is required"),
    Name: Yup.string().required("Account name is required"),
});

// Contact for Account objects
export const contactValidationSchema = Yup.object().shape({
    Id: Yup.string().required("ID is required"),
    FirstName: Yup.string().required("First name is required"),
    MiddleName: Yup.string().nullable(),
    LastName: Yup.string().required("Last name is required"),
    Email: Yup.string().email("Invalid email address").required("Email is required"),
    Email2: Yup.string().email("Invalid email address").nullable(),
    DateOfBirth: Yup.string().nullable(),
    Gender: Yup.string().oneOf(["Male", "Female", ""], "Invalid gender"),
    AddressList: Yup.array().of(addressValidationSchema),
    PhoneDirectories: Yup.array().of(phoneDirectoryValidationSchema),
    SocialMedias: Yup.array().of(socialMediaValidationSchema),
    AccountList: Yup.array().of(accountValidationSchema),
});

export const useContactFormik = (
    handleSubmit: (
        formData: Contact,
        actions: FormikHelpers<Contact>
    ) => void,

    initialValues: Contact = initialContactValues
) => {

    const formik = useFormik<Contact>({
        initialValues,
        validationSchema: contactValidationSchema,
        onSubmit: handleSubmit,
    });

    return formik;
};