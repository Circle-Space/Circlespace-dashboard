import {
    FormikHelpers,
    useFormik,
} from "formik";
import * as Yup from "yup";

import { Feature } from "../types/featuresTypes";

export const initialFeatureFormValues = {
    Id: "00000000-0000-0000-0000-000000000000",
    Name: "",
    Description: "",
    IsActive: false
} as Feature;

export const validationFeatureSchema = Yup.object({
    Name: Yup.string().required("Name is required"),
    Description: Yup.string().required("Description is required"),
});

export const useFeatureFormik = (
    handleSubmit: (
        formData: Feature,
        actions: FormikHelpers<Feature>
    ) => void,

    initialValues: Feature = initialFeatureFormValues
) => {

    const formik = useFormik<Feature>({
        initialValues,
        validationSchema: validationFeatureSchema,
        onSubmit: handleSubmit,
    });

    return formik;
};
