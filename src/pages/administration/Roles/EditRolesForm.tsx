import React, { useState } from "react";
import { Container, Card, Alert } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import useRolesManagement from "../../../hooks/useRoles";
import RolesFormInputs from "./RolesFormInput";
import { Role, RolesFormValues } from "../../roles/types/rolesContext";
import { SelectOption } from "../../../types/SelectOption";
import useFeaturesManagement from "../../../hooks/useFeatures";
import { findSelectOptionFeatureById, mapFeaturesToOptions } from "../../../utils/selectOptionUtils";
import useToast from "../../../hooks/useToast";

const EditRolesForm = () => {
    const { updateRoles } = useRolesManagement();
    const { features } = useFeaturesManagement();
    const navigate = useNavigate();
    const location = useLocation();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { showErrorToast } = useToast();
    const roleData: Role = location.state;

    const handleSubmit = async (formData: RolesFormValues) => {
        const { Features, ...rest } = formData
        const featureValues = Features.map((option) => option.value);
        const reqData = {
            ...roleData,
            ...rest,
            Features: featureValues,
        }

        try {
            await updateRoles(reqData);
            navigate("/administration/UserManagement", { state: "roles" })
        } catch (error: any) {
            const message = error?.response?.data?.message || "Something went wrong";
            setErrorMessage(message);
            showErrorToast("Failed to Update the Roles");
        }
    };

    const onCancel = () => {
        navigate("/administration/UserManagement/", { state: "roles" });
    };

    const initialValues = {
        Name: roleData.Name,
        Description: roleData.Description,
        Features: findSelectOptionFeatureById(roleData.Features, mapFeaturesToOptions(features)), // Assuming Features is an array
    } as unknown as RolesFormValues;

    const validationSchema = Yup.object({
        Name: Yup.string().required("Name is required"),
        Description: Yup.string().required("Description is required"),
        Features: Yup.array(
            Yup.object().shape({
                value: Yup.string().required("Feature is required"),
                label: Yup.string().required("Feature is required"),
            })
        ).min(1, "At least one feature is required"),
    });

    return (
        <Container>
            <Card>
                <Card.Title className="px-3 pt-3 pb-0 mb-0">Edit Role</Card.Title>
                <hr className="bottom-gradient-border" />
                <Card.Body>
                    {errorMessage && (
                        <Alert variant="danger" className="mb-3">
                            {errorMessage}
                        </Alert>
                    )}
                    <RolesFormInputs
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

export default EditRolesForm;
