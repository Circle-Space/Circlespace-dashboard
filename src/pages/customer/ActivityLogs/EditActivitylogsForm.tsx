import React, { useState } from "react";

import { Alert, Card, Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import CommandBar from "../../../components/CommandBar";
import useAccountManagement from "../../../hooks/useAccount";
import useActivityLogs from "../../../hooks/useActivitylogs";
import useContactManagement from "../../../hooks/useContact";
import useToast from "../../../hooks/useToast";
import {
  ActivityLog,
  ActivityLogFormValues,
} from "../../../types/activityLogs/activityLogsTypes";
import {
  findSelectOptionByValue,
  mapAccountToOptions,
  mapContactToOptions,
} from "../../../utils/selectOptionUtils";
import ActivityLogFormInputs from "./ActivitylogsFormInputs";

const EditActivityLogForm = () => {
  const { updateActivityLog } = useActivityLogs(); // Update with your actual hook
  const { account } = useAccountManagement();
  const { contact } = useContactManagement();
  const navigate = useNavigate();
  const location = useLocation();
  const activityLogData: ActivityLog = location.state;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { showErrorToast } = useToast();

  const handleSubmit = async (formData: ActivityLogFormValues) => {
    const { accountId, contactId, ...rest } = formData;
    const updatedActivityLog = {
      ...activityLogData,
      accountId: accountId?.value,
      contactId: contactId?.value,
      ...rest,
    } as ActivityLog;

    try {
      await updateActivityLog(updatedActivityLog); // Update with your actual update function
      navigate("/customer/ActivityLogs"); // Update with your actual path
    } catch (error: any) {
      const message = error?.response?.data?.message || "Something went wrong";
      setErrorMessage(message);
      showErrorToast("Failed to Update the Activity Log");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const initialValues: ActivityLogFormValues = {
    // Adjust properties based on your ActivityLogFormValues
    Id: activityLogData.Id,
    accountId: findSelectOptionByValue(
      activityLogData.AccountId,
      mapAccountToOptions(account)
    ),
    contactId: findSelectOptionByValue(
      activityLogData.ContactId,
      mapContactToOptions(contact)
    ),
    subject: activityLogData.Subject,
    activityType: activityLogData.ActivityType,
    activityDate: activityLogData?.ActivityDate,
    description: activityLogData.Description,
  } as ActivityLogFormValues;

  const validationSchema = Yup.object({
    subject: Yup.string().required("Subject is required"),
  });

  return (
    <div>
      <CommandBar
        handleSave={() => {}}
        handleSaveAndClose={() => {}}
        handleClear={() => {}}
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
          <ActivityLogFormInputs
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

export default EditActivityLogForm;
