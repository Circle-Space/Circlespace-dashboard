import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { Product } from "../../types/ProductManagementTypes";


export const initialProductValues: Product = {
    Id: "00000000-0000-0000-0000-000000000000",
    Name: "",
    Description: "",
    Price: 0,
    SKU: "",
    CategoryId: "",
    ParentProductId: "",
    IsAvailable: true,
}

// Validation for Address objects
export const productValidationSchema = Yup.object().shape({
    ID: Yup.string().nullable(),
    Name: Yup.string().required("Name is required"),
    Price: Yup.number()
        .typeError('Must be a number')
        .positive('Must be positive')
        .max(999999999.99, 'Max value exceeded')
        .test('is-decimal', 'Must have at most 2 decimal places', value => {
        if (value != undefined) {
            return /^\d+(\.\d{1,2})?$/.test(value.toString());
        }
        return true;
        })
        .required('Required'),
    SKU: Yup.string().required("SKU is required")
});

export const useProductFormik = (
    handleSubmit: (
        formData: Product,
        actions: FormikHelpers<Product>
    ) => void,
    initialValues: Product = initialProductValues
) => {

    const formik = useFormik<Product>({
        initialValues,
        validationSchema: productValidationSchema,
        onSubmit: handleSubmit,
    });

    return formik;
};