import React, { useState } from "react";
import { Container, Card, Alert } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from 'yup';
import { Features, FeaturesFormValues } from "../../features/types/featuresContext";
import useFeaturesManagement from "../../../hooks/useFeatures";
import FeaturesFormInputs from "./FeaturesFormInput";
import useToast from "../../../hooks/useToast";

const EditFeaturesForm = () => {
    const { updateFeatures } = useFeaturesManagement();
    const navigate = useNavigate();
    const location = useLocation();
    const featureData: Features = location.state;
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { showErrorToast } = useToast();


    const handleSubmit = async (formData: FeaturesFormValues) => {
        const { ...rest } = formData;
        const updatedFeature = {
            ...featureData,
            ...rest
        } as Features;

        try {
            await updateFeatures(updatedFeature);
            navigate("/administration/UserManagement/", { state: "features" })
        } catch (error: any) {
            const message = error?.response?.data?.message || "Something went wrong";
            setErrorMessage(message);
            showErrorToast("Failed to Update the Features")
        }
    };

    const onCancel = () => {
        navigate("/administration/UserManagement/", { state: "features" })
    };

    const initialValues: FeaturesFormValues = {
        Name: featureData.Name,
        Description: featureData.Description,
        IsActive: featureData.IsActive  // Convert to boolean
    } as FeaturesFormValues

    const validationSchema = Yup.object({
        Name: Yup.string().required("Name is required"),
        Description: Yup.string().required("Description is required"),
    });

    return (
        <Container>
            <Card>
                <Card.Title className="px-3 pt-3 pb-0 mb-0">
                    Edit Features
                </Card.Title>
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
                        leftButtonText="Update"
                        rightButtonText="Cancel"
                        validationSchema={validationSchema}
                    />
                </Card.Body>
            </Card>
        </Container>
    );
}

export default EditFeaturesForm;
