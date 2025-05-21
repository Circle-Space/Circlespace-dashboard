import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { Status } from "../types/statusTypes"; // Adjust path as per your status type definition

// Initial values for Status
export const initialStatusValues: Status = {
    Id: "00000000-0000-0000-0000-000000000000",
    Name: "",
    Description: ""
};

export const statusValidationSchema = Yup.object().shape({
    Name: Yup.string().required("Name is required"),
    Description: Yup.string().required("Description is required"),
});

export const useStatusFormik = (
    handleSubmit: (formData: Status, actions: FormikHelpers<Status>) => void,
    initialValues: Status = initialStatusValues
) => {
    const formik = useFormik<Status>({
        initialValues,
        validationSchema: statusValidationSchema,
        onSubmit: handleSubmit,
    });

    return formik;
};
