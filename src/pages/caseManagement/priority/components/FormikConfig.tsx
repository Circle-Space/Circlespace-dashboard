import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { Priority } from "../types/priorityTypes";

// Initial values for Status
export const initialPriorityValues: Priority = {
    Id: "00000000-0000-0000-0000-000000000000",
    Name: "",
    Description: ""
};

export const priorityValidationSchema = Yup.object().shape({
    Name: Yup.string().required("Name is required"),
    Description: Yup.string().required("Description is required"),
});

export const usePriorityFormik = (
    handleSubmit: (formData: Priority, actions: FormikHelpers<Priority>) => void,
    initialValues: Priority = initialPriorityValues
) => {
    const formik = useFormik<Priority>({
        initialValues,
        validationSchema: priorityValidationSchema,
        onSubmit: handleSubmit,
    });

    return formik;
};
