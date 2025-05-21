import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { Case } from "../types/casesTypes";

// Initial values for Case
export const initialCaseValues: Case = {
    Id: "00000000-0000-0000-0000-000000000000",
    CaseNumber: "0",
    AssignTo: "",
    StatusID: "",
    Description: "",
    PriorityID: "",
    Name: "",
};


// Validation schema for Case itself
export const caseValidationSchema = Yup.object().shape({
    CaseNumber: Yup.string().required("Case number is required"),
    StatusID: Yup.string().required("Status is required"),
    Name: Yup.string().required("Case Name is required"),
    Description: Yup.string().required("Description is required"),
    PriorityID: Yup.string().required("Priority is required"),

});

export const activityValidationSchema = Yup.object().shape({
    ActivityTypeId: Yup.string().required("Activity Type is required"),
    Notes: Yup.string().required("Notes are required"),
    Outcome: Yup.string().required("Outcome is required"),
});

// Custom hook to use Formik for Case form
export const useCaseFormik = (
    handleSubmit: (formData: Case, actions: FormikHelpers<Case>) => void,
    initialValues: Case = initialCaseValues
) => {
    const formik = useFormik<Case>({
        initialValues,
        validationSchema: caseValidationSchema,
        onSubmit: handleSubmit,
    });

    return formik;
};
