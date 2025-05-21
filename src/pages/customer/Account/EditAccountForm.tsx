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
import useToast from "../../../hooks/useToast";
import {
  Account,
  AccountFormValues,
} from "../../../types/accountManagement/accountTypes";
import {
  findSelectOptionByValue,
  mapContactToOptions,
} from "../../../utils/selectOptionUtils";
import AccountFormInputs from "./AccountFormInputs";

const EditAccountForm = () => {
  const { updateAccount } = useAccountManagement();
  const { contact } = useContactManagement();
  const navigate = useNavigate();
  const location = useLocation();
  const accountData: Account = location.state;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { showErrorToast } = useToast();

  const handleSubmit = async (formData: AccountFormValues) => {
    const { ...rest } = formData;
    const updatedAccount = {
      ...accountData,
      ...rest,
      PrimaryContactId: formData.PrimaryContactId && Object.keys(formData.PrimaryContactId).length === 0
        ? ""  // Set to empty string if it's an empty object
        : formData.PrimaryContactId  // Keep the original value if it's not an empty object
    } as Account;

    try {
      await updateAccount(updatedAccount);
      navigate("/customer/AccountManagement");
    } catch (error: any) {
      const message = error?.response?.data?.message || "Something went wrong";
      setErrorMessage(message);
      showErrorToast("Failed to Update the Account");
    }
  };

  const handleBack = async () => {
    console.log("here...");
    navigate(-1);
  };

  const initialValues: AccountFormValues = {
    Id: accountData.Id,
    Name: accountData.Name,
    WebsiteUrl: accountData.WebsiteUrl,
    PhoneNumber: accountData.PhoneNumber,
    Address1: accountData.Address1,
    Address2: accountData.Address2,
    Address3: accountData.Address3,
    City: accountData.City,
    State: accountData.State,
    Country: accountData.Country,
    PostalCode: accountData.PostalCode,
    PrimaryContactId: findSelectOptionByValue(
      accountData.PrimaryContactId,
      mapContactToOptions(contact)
    ),
  } as unknown as AccountFormValues;

  const validationSchema = Yup.object({
    Name: Yup.string().required("Name is required"),
    WebsiteUrl: Yup.string().matches(
      /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
      "Invalid website URL"
    ),
    PhoneNumber: Yup.string().matches(
      /^\d{10}$/,
      "Phone number must be a 10-digit number"
    ),
  });

  return (
    <div>
      <CommandBar
        handleSave={() => { }}
        handleSaveAndClose={() => { }}
        handleClear={() => { }}
        handleBack={handleBack}
        buttons={[]} />
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
            leftButtonText="Update"
            rightButtonText="Cancel"
            validationSchema={validationSchema}
          />
        </Card.Body>
      </Container>
    </div>
  );
};

export default EditAccountForm;
