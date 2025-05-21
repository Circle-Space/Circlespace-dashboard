import React, { useEffect } from "react";
import useDeviceManagement from "../../../../hooks/useDeviceMangement";
import { Button, Form, Row, Col, Modal } from "react-bootstrap";
import Select from "react-select";
import { SelectOption } from "../../../../types/SelectOption";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ConversationReqBody } from "../../../devices/types/deviceTypes";
import useAuth from "../../../../hooks/useAuth";
import Avatar from "react-avatar";
import { Campaign } from "../../../../types/campaigns/campaignTypes";

interface Props {
  showModal: boolean;
  onCancel: () => void;
  deviceId: string;
  campaign: Campaign | null;
  setModalOpen: (val: boolean) => void;
}

type AddConversationFormValues = {
  Name: string;
  PhoneNumber: string;
  Language: SelectOption;
};

const TempLanguageOptions: SelectOption[] = [
  { value: "English", label: "English" },
  { value: "Spanish", label: "Spanish" },
];

const AddConversationModal = ({ showModal, onCancel, deviceId, campaign, setModalOpen }: Props) => {
  const { addConversation } = useDeviceManagement();
  const { user } = useAuth();

  const initialValues: AddConversationFormValues = {
    Name: "",
    PhoneNumber: "",
    Language: {} as SelectOption,
  };

  const validationSchema = Yup.object({
    Name: Yup.string().required("Name is required"),
    PhoneNumber: Yup.string().required("Phone number is required").min(12, "Phone number should be of 10 digits").max(12, "Phone number should be of 10 digits"),
    Language: Yup.object()
      .shape({
        value: Yup.string().required("Language is required"),
        label: Yup.string().required("Language is required"),
      })
      .required("Language is required"),
  });

  const formik = useFormik<AddConversationFormValues>({
    initialValues,
    validationSchema,
    onSubmit: (formData) => {
      const fromPhoneNumber = user?.Devices.find((d) => d.Id === deviceId)?.PhoneNumber;
      if (!user || !fromPhoneNumber) {
        return;
      }

      const { Language, ...rest } = formData;

      const reqBody: ConversationReqBody = {
        ...rest,
        UserId: user.Id,
        DeviceId: deviceId,
        Language: Language.value,
        FromPhoneNumber: fromPhoneNumber,
        Avatar: "",
        CampaignId: campaign?.id || "",
      };

      addConversation(reqBody, handleClose, (e: string) => formik.setStatus(e));
    },
  });

  useEffect(() => {
    if (formik?.status?.includes("Error")) {
      setModalOpen(true);
    }
  }, [formik.status, setModalOpen]);

  const formatPhoneNumber = (phoneNumber: string) => {
    const digits = phoneNumber.replace(/\D/g, "");
    const countryCode = "+1";
    return `${countryCode}${digits}`;
  };

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const formattedValue = formatPhoneNumber(value);
    formik.setFieldValue("PhoneNumber", formattedValue);
  };

  const handleClose = () => {
    formik.resetForm();
    onCancel();
  };

  return (
    <Modal size="lg" centered show={showModal} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>
          Add New Conversation for campaign: {campaign?.name || ""}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Row className="justify-content-between px-4">
            <Col
              className="d-flex justify-content-center align-items-center"
              md={5}
            >
              <Avatar name={formik.values.Name} round size="80" />
            </Col>
            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  isInvalid={Boolean(formik.touched.Name && formik.errors.Name)}
                  {...formik.getFieldProps("Name")}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.Name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Phone Number</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">+1</span>
                  <Form.Control
                    type="text"
                    isInvalid={Boolean(formik.touched.PhoneNumber && formik.errors.PhoneNumber)}
                    {...formik.getFieldProps('PhoneNumber')}
                    value={formik.values.PhoneNumber.replace("+1", "")}
                    onChange={handlePhoneNumberChange}
                  />
                  {formik.touched.PhoneNumber && formik.errors.PhoneNumber && (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.PhoneNumber}
                    </Form.Control.Feedback>
                  )}
                </div>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Language</Form.Label>
                <Select
                  className="react-select-container"
                  options={TempLanguageOptions}
                  name="Language"
                  id="Language"
                  onChange={(option) => {
                    formik.setFieldValue("Language", option);
                  }}
                  onBlur={() => formik.setFieldTouched("Language", true)}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      borderColor:
                        formik.touched.Language &&
                          formik.errors.Language
                          ? "red"
                          : provided.borderColor,
                    }),
                  }}
                />
                {formik.touched.Language && formik.errors.Language?.label && (
                  <div style={{ color: 'red', marginTop: "0.25rem", fontSize: "80%" }}>
                    {formik.errors.Language.label}
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>
          {formik.status && (
            <h6 className="mt-3 text-danger text-center">
              {formik.status}
            </h6>
          )}

          <div className="d-flex justify-content-end mt-3">
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="secondary" onClick={handleClose} className="ms-2">
              Cancel
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddConversationModal;
