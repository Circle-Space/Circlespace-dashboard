import {
    FormikHelpers,
    useFormik,
} from "formik";
import * as Yup from "yup";

import { Role } from "../types/rolesTypes";
import { Feature } from "../../features/types/featuresTypes";

export const initialRoleFormValues: Role = {
    Id: "00000000-0000-0000-0000-000000000000",
    Name: "",
    Description: "",
    Features: [] as Feature[],
};


export const validationRoleSchema = Yup.object({
    Name: Yup.string().required("Name is required"),
    Description: Yup.string().required("Description is required"),
    Features: Yup.array(
        Yup.object().shape({
            value: Yup.string().required("Feature is required"),
            label: Yup.string().required("Feature is required"),
        })
    ).min(1, "At least one feature is required"),
});

export const useRoleFormik = (
    handleSubmit: (
        formData: Role,
        actions: FormikHelpers<Role>
    ) => void,

    initialValues: Role = initialRoleFormValues
) => {

    const formik = useFormik<Role>({
        initialValues,
        validationSchema: validationRoleSchema,
        onSubmit: handleSubmit,
    });

    return formik;
};