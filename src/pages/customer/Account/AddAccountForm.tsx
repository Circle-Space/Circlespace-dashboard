import React, { useState } from "react";

import {
  Alert,
  Card,
  Container,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import useAccountManagement from "../../../hooks/useAccount";
import useToast from "../../../hooks/useToast";
import { AccountFormValues } from "../../../types/accountManagement/accountTypes";
import { SelectOption } from "../../../types/SelectOption";
import AccountFormInputs from "./AccountFormInputs";

interface Props {
  clearForm: boolean;
}

const AddAccountForm = ({ clearForm }: Props) => {
  const { addAccount } = useAccountManagement();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { showErrorToast } = useToast();

  const handleSubmit = async (formData: AccountFormValues) => {
    const { ...rest } = formData;
    const reqData = {
      ...rest,
      PrimaryContactId: formData.PrimaryContactId && Object.keys(formData.PrimaryContactId).length === 0
        ? ""  // Set to empty string if it's an empty object
        : formData.PrimaryContactId  // Keep the original value if it's not an empty object
    };

    console.log("add acc", reqData)
    try {
      await addAccount(reqData);
      navigate("/customer/AccountManagement")
    } catch (error: any) {
      const message = error?.response?.data?.message || "Something went wrong";
      setErrorMessage(message);
      showErrorToast("Failed To add the Account")
    }
  };

  const initialValues = {
    Name: "",
    WebsiteUrl: "",
    PhoneNumber: "",
    Address1: "",
    Address2: "",
    Address3: "",
    City: "",
    State: "",
    Country: "",
    PostalCode: "",
    PrimaryContactId: {} as SelectOption
  } as unknown as AccountFormValues;

  const validationSchema = Yup.object({
    Name: Yup.string().required("Name is required"),
    WebsiteUrl: Yup.string()
      .matches(
        /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
        "Invalid website URL"
      ),
    PhoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be a 10-digit number"),
  });

  return (
    <Container>
      <Card.Body style={{ marginTop: "20px" }}>
        {errorMessage && (
          <Alert variant="danger" className="mb-3">
            {errorMessage}
          </Alert>
        )}
        <AccountFormInputs
          initialValues={initialValues}
          onSubmit={handleSubmit}
          leftButtonText="Submit"
          rightButtonText="Cancel"
          validationSchema={validationSchema}
          clearForm={clearForm}
        />
      </Card.Body>
    </Container>
  );
};

export default AddAccountForm;
