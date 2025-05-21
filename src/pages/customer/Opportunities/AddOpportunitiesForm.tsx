import React, { useState } from "react";

import {
    Alert,
    Card,
    Container,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import CommandBar from "../../../components/CommandBar";
import useOpportunitiesManagement from "../../../hooks/useOpportunities";
import useToast from "../../../hooks/useToast";
import { OpportunitiesFormValues } from "../../../types/oppurtunities/opportunitiesTypes";
import { SelectOption } from "../../../types/SelectOption";
import OpportunitiesFormInputs from "./OpportunitiesFormInputs";

const AddOpportunitiesForm = () => {
    const { addOpportunities } = useOpportunitiesManagement();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { showErrorToast } = useToast();

    const handleSubmit = async (formData: OpportunitiesFormValues) => {
        const { accountId, contactId, ...rest } = formData;
        const reqData = {
            accountId: accountId.value,
            contactId: contactId.value,
            ...rest
        }
        try {
            await addOpportunities(reqData);
            navigate("/customer/Opportunities");
        } catch (error: any) {
            console.error("Error caught:", error);
            const message = error?.response?.data?.message || "Something went wrong";
            setErrorMessage(message);
            showErrorToast("Failed to Add the Opportunity");
        }
    };

    const initialValues = {
        name: "",
        title: "",
        category: "",
        status: "",
        description: "",
        rating: "",
        probability: "",
        howFound: "",
        expectedRevenue: "",
        stageName: "",
        accountId: {} as SelectOption,
        contactId: {} as SelectOption,
    } as OpportunitiesFormValues;

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        probability: Yup.number().typeError("Probability must be in decimal between 0 and 0.9").min(0).max(0.9, "Probability must be between 0 and 0.9"),
        expectedRevenue: Yup.number().typeError("Expected Revenue must be a number"),
    });


    const handleBack = async () => {
        navigate(-1);
    };

    return (
        <div>
            <CommandBar
                handleSave={() => { }}
                handleSaveAndClose={() => { }}
                handleClear={() => { }}
                handleBack={handleBack}
            />
            <Container>
                <Card.Body style={{ marginTop: "20px" }}>
                    {errorMessage && (
                        <Alert variant="danger" className="mb-3">
                            {errorMessage}
                        </Alert>
                    )}
                    <OpportunitiesFormInputs
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        leftButtonText="Submit"
                        validationSchema={validationSchema}
                    />
                </Card.Body>
            </Container>
        </div>
    );
};

export default AddOpportunitiesForm;
