import React, { useState } from "react";

import {
  Alert,
  Card,
  Container,
} from "react-bootstrap";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import * as Yup from "yup";

import CommandBar from "../../../components/CommandBar";
import useAccountManagement from "../../../hooks/useAccount";
import useContactManagement from "../../../hooks/useContact";
import useOpportunitiesManagement from "../../../hooks/useOpportunities";
import useToast from "../../../hooks/useToast";
import {
  Opportunities,
  OpportunitiesFormValues,
} from "../../../types/oppurtunities/opportunitiesContext";
import {
  findSelectOptionByValue,
  mapAccountToOptions,
  mapContactToOptions,
} from "../../../utils/selectOptionUtils";
import OpportunitiesFormInputs from "./OpportunitiesFormInputs";

const EditOpportunitiesForm = () => {
  const { updateOpportunities } = useOpportunitiesManagement();
  const { account } = useAccountManagement();
  const { contact } = useContactManagement();
  const navigate = useNavigate();
  const location = useLocation();
  const opportunityData: Opportunities = location.state;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { showErrorToast } = useToast();

  const handleSubmit = async (formData: OpportunitiesFormValues) => {
    const { accountId, contactId, ...rest } = formData;
    const updatedOpportunity = {
      ...opportunityData,
      accountId: accountId?.value,
      contactId: contactId?.value,
      ...rest,
    } as OpportunitiesFormValues;

    try {
      await updateOpportunities(updatedOpportunity);
      navigate("/customer/Opportunities");
    } catch (error: any) {
      const message = error?.response?.data?.message || "Something went wrong";
      setErrorMessage(message);
      showErrorToast("Failed to Update the Opportunity");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const initialValues: OpportunitiesFormValues = {
    name: opportunityData.Name,
    title: opportunityData.Title,
    category: opportunityData.Category,
    status: opportunityData.Status,
    description: opportunityData.Description,
    rating: opportunityData.Rating,
    probability: opportunityData.Probability,
    howFound: opportunityData.HowFound,
    expectedRevenue: opportunityData.ExpectedRevenue,
    openDate: opportunityData.OpenDate,
    closeDate: opportunityData.CloseDate,
    stageName: opportunityData.StageName,
    accountId: findSelectOptionByValue(
      opportunityData.AccountId,
      mapAccountToOptions(account)
    ),
    contactId: findSelectOptionByValue(
      opportunityData.ContactId,
      mapContactToOptions(contact)
    ),
  } as OpportunitiesFormValues;

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    probability: Yup.number().typeError("Probability must be a number").min(0).max(0.9, "Probability must be between 0 and 0.9"),
    expectedRevenue: Yup.number().typeError("Expected Revenue must be a number"),
  });


  return (
    <div>
      <CommandBar
        handleSave={() => { }}
        handleSaveAndClose={() => { }}
        handleClear={() => { }}
        handleBack={handleBack}
        buttons={[]}
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
            leftButtonText="Update"
            validationSchema={validationSchema}
          />
        </Card.Body>
      </Container>
    </div>
  );
};

export default EditOpportunitiesForm;
