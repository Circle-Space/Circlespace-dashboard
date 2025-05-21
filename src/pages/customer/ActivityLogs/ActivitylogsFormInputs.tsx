import React, {
    useEffect,
    useState,
} from "react";

import {
    FormikHelpers,
    useFormik,
} from "formik";
import {
    Button,
    Card,
    Col,
    Form,
    Row,
} from "react-bootstrap";
import Select from "react-select";
import * as Yup from "yup";

import useAccountManagement from "../../../hooks/useAccount";
import useContactManagement from "../../../hooks/useContact";
import {
    ActivityLogFormValues,
} from "../../../types/activityLogs/activityLogsTypes";
import { SelectOption } from "../../../types/SelectOption";
import { getISORepresentation } from "../../../utils/dateUtils";
import {
    mapAccountToOptions,
    mapContactToOptions,
} from "../../../utils/selectOptionUtils";

interface Props {
    onSubmit: (formData: ActivityLogFormValues) => void;
    initialValues: ActivityLogFormValues;
    leftButtonText: string;
    validationSchema: Yup.Schema<any>;
    clearForm?: boolean;
}

const AddActivityLogFormInputs = ({
    onSubmit,
    initialValues,
    leftButtonText,
    validationSchema,
    clearForm,
}: Props) => {
    const [AccountOptions, setAccountOptions] = useState<SelectOption[]>([]);
    const [ContactOptions, setContactOptions] = useState<SelectOption[]>([]);
    const { account } = useAccountManagement();
    const { contact } = useContactManagement();
    const { error } = useContactManagement();

    useEffect(() => {
        setAccountOptions(mapAccountToOptions(account));
        setContactOptions(mapContactToOptions(contact));
    }, [account, contact]);

    const handleSubmit = (
        values: ActivityLogFormValues,
        { setSubmitting }: FormikHelpers<ActivityLogFormValues>
    ) => {
        onSubmit(values);
        setSubmitting(false);
    };

    const formik = useFormik<ActivityLogFormValues>({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    useEffect(() => {
        if (clearForm) {
            formik.resetForm();
        }
    }, [clearForm]);

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Row>
                <Col md={6}>
                    <Card style={{ marginBottom: "20px" }}>
                        <Card.Title className="px-3 pt-3 pb-0 mb-0">Activity Log Information</Card.Title>
                        <Card.Body>
                            <Form.Group>
                                <Form.Label>Subject<span style={{ color: "red" }}> *</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    isInvalid={Boolean(formik.touched.subject && formik.errors.subject)}
                                    {...formik.getFieldProps("subject")}
                                />
                                {formik.touched.subject && formik.errors.subject && (
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.subject}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Activity Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    className="datePicker"
                                    isInvalid={Boolean(formik.touched.activityDate && formik.errors.activityDate)}
                                    {...formik.getFieldProps('activityDate')}
                                    value={
                                        formik.values.activityDate
                                            ? getISORepresentation(formik.values.activityDate)
                                            : ''
                                    }
                                />
                                {formik.touched.activityDate && formik.errors.activityDate && (
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.activityDate}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Activity Type</Form.Label>
                                <Form.Control
                                    type="text"
                                    isInvalid={Boolean(formik.touched.activityType && formik.errors.activityType)}
                                    {...formik.getFieldProps("activityType")}
                                />
                                {formik.touched.activityType && formik.errors.activityType && (
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.activityType}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    isInvalid={Boolean(formik.touched.description && formik.errors.description)}
                                    {...formik.getFieldProps("description")}
                                />
                                {formik.touched.description && formik.errors.description && (
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.description}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card style={{ marginBottom: "20px" }}>
                        <Card.Title className="px-3 pt-3 pb-0 mb-0">Contact Information</Card.Title>
                        <Card.Body>
                            <Form.Group as={Col}>
                                <Form.Label>Account</Form.Label>
                                <Select
                                    className="react-select-container"
                                    options={AccountOptions}
                                    value={formik.values.accountId}
                                    name="accountId"
                                    id="accountId"
                                    onChange={(option) => {
                                        formik.setFieldValue("accountId", option);
                                    }}
                                    onBlur={() => formik.setFieldTouched("accountId", true)}
                                    styles={{
                                        control: (provided, state) => ({
                                            ...provided,
                                            borderColor: formik.touched.accountId && formik.errors.accountId?.label ? "red" : provided.borderColor,
                                        }),
                                    }}
                                />
                                {formik.touched.accountId && formik.errors.accountId?.label && (
                                    <div style={{ color: 'red', marginTop: "0.25rem", fontSize: "80%" }}>
                                        {formik.errors.accountId.label}
                                    </div>
                                )}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Contact</Form.Label>
                                <Select
                                    className="react-select-container"
                                    options={ContactOptions.map((option) => ({ value: option.value, label: option.label }))}
                                    value={formik.values.contactId}
                                    name="contactId"
                                    id="contactId"
                                    onChange={(option) => {
                                        formik.setFieldValue("contactId", option);
                                    }}
                                    onBlur={() => formik.setFieldTouched("contactId", true)}
                                    styles={{
                                        control: (provided, state) => ({
                                            ...provided,
                                            borderColor: formik.touched.contactId && formik.errors.contactId ? "red" : provided.borderColor,
                                        }),
                                    }}
                                />
                                {formik.touched.contactId && formik.errors.contactId && (
                                    <div style={{ color: "red", marginTop: "0.25rem", fontSize: "80%" }}>
                                        {formik.errors.contactId.label}
                                    </div>
                                )}
                            </Form.Group>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {error && (
                <div style={{ color: "red", marginTop: "0.25rem", fontSize: "80%" }}>
                    {error}
                </div>
            )}
            <div className="text-center">
                <Button variant="primary" type="submit">
                    {leftButtonText}
                </Button>
            </div>
        </Form>
    );
};

export default AddActivityLogFormInputs;
