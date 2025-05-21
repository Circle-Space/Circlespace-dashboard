import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { Category } from "../../types/ProductManagementTypes";

export const initialCategoryValues: Category = {
    Id: "00000000-0000-0000-0000-000000000000",
    Name: "",
    Description: "",
}

// Validation for Address objects
export const categoryValidationSchema = Yup.object().shape({
    ID: Yup.string().nullable(),
    Name: Yup.string().required("Name is required"),
    Description: Yup.string().required("Description is required")
});

export const useCategoryFormik = (
    handleSubmit: (
        formData: Category,
        actions: FormikHelpers<Category>
    ) => void,
    initialValues: Category = initialCategoryValues
) => {

    const formik = useFormik<Category>({
        initialValues,
        validationSchema: categoryValidationSchema,
        onSubmit: handleSubmit,
    });

    return formik;
};