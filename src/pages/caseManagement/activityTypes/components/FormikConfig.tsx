import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { ActivityType } from "../types/ActivityTypes";

// Initial values for Case
export const initialActivityTypeValues: ActivityType = {
    Id: "00000000-0000-0000-0000-000000000000",
    Name: "",
    Description: ""
};


export const activityTypeValidationSchema = Yup.object().shape({
    Name: Yup.string().required("Name is required"),
    Description: Yup.string().required("Description is required"),

});

export const useActivityTypeFormik = (
    handleSubmit: (formData: ActivityType, actions: FormikHelpers<ActivityType>) => void,
    initialValues: ActivityType = initialActivityTypeValues
) => {
    const formik = useFormik<ActivityType>({
        initialValues,
        validationSchema: activityTypeValidationSchema,
        onSubmit: handleSubmit,
    });

    return formik;
};
