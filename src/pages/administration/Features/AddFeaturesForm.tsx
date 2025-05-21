import React, { useState } from "react";
import { Container, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import useFeaturesManagement from "../../../hooks/useFeatures";
import FeaturesFormInputs from "./FeaturesFormInput";
import { FeaturesFormValues } from "../../features/types/featuresContext";
import useToast from "../../../hooks/useToast";

const AddFeaturesForm = () => {
    const { addFeatures } = useFeaturesManagement();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { showErrorToast } = useToast();

    const handleSubmit = async (formData: FeaturesFormValues) => {
        try {
            await addFeatures(formData);
            navigate("/administration/UserManagement", { state: "features" })
        } catch (error: any) {
            const message = error?.response?.data?.message || "Something went wrong";
            setErrorMessage(message);
            showErrorToast("Failed To add the Feature")
        }
    };

    const onCancel = () => {
        navigate("/administration/UserManagement/", { state: "features" })
    };

    const initialValues = {
        Name: "",
        Description: "",
        IsActive: false,
    } as FeaturesFormValues;

    const validationSchema = Yup.object({
        Name: Yup.string().required("Name is required"),
        Description: Yup.string().required("Description is required"),
    });

    return (
        <Container>
            <Card>
                <Card.Title className="px-3 pt-3 pb-0 mb-0">Add New Feature</Card.Title>
                <hr className="bottom-gradient-border" />
                <Card.Body>
                    {errorMessage && (
                        <Alert variant="danger" className="mb-3">
                            {errorMessage}
                        </Alert>
                    )}
                    <FeaturesFormInputs
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        onCancel={onCancel}
                        leftButtonText="Submit"
                        rightButtonText="Cancel"
                        validationSchema={validationSchema}
                    />
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AddFeaturesForm;
