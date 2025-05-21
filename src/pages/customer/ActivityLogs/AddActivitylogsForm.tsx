import React, { useState } from "react";

import { Alert, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import CommandBar from "../../../components/CommandBar";
import useActivityLogs from "../../../hooks/useActivitylogs";
import useToast from "../../../hooks/useToast";
import { ActivityLogFormValues } from "../../../types/activityLogs/activityLogsTypes";
import { SelectOption } from "../../../types/SelectOption";
import ActivityLogFormInputs from "./ActivitylogsFormInputs";

const AddActivityLogForm = () => {
  const { addActivityLog } = useActivityLogs();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { showErrorToast } = useToast();

  const handleSubmit = async (formData: ActivityLogFormValues) => {
    const { accountId, contactId, ...rest } = formData;
    const reqData = {
      accountId: accountId.value,
      contactId: contactId.value,
      ...rest,
    };
    try {
      await addActivityLog(reqData);
      navigate("/customer/ActivityLogs");
    } catch (error: any) {
      console.error("Error caught:", error);
      const message = error?.response?.data?.message || "Something went wrong";
      setErrorMessage(message);
      showErrorToast("Failed to Add the Activity Log");
    }
  };

  const initialValues = {
    subject: "",
    activityType: "",
    accountId: {} as SelectOption,
    contactId: {} as SelectOption,
    description: "",
  } as ActivityLogFormValues;

  const validationSchema = Yup.object({
    subject: Yup.string().required("Subject is required"),
  });
  const handleBack = async () => {
    console.log("here...");
    navigate(-1);
  };

  return (
    <div>
      <CommandBar
        handleSave={() => {}}
        handleSaveAndClose={() => {}}
        handleClear={() => {}}
        handleBack={handleBack}
      />
      <Container>
        <Card.Body style={{ marginTop: "20px" }}>
          {errorMessage && (
            <Alert variant="danger" className="mb-3">
              {errorMessage}
            </Alert>
          )}
          <ActivityLogFormInputs
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

export default AddActivityLogForm;
