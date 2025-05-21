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
    OpportunitiesFormValues,
} from "../../../types/oppurtunities/opportunitiesContext";
import { SelectOption } from "../../../types/SelectOption";
import { getISORepresentation } from "../../../utils/dateUtils";
import {
    mapAccountToOptions,
    mapContactToOptions,
} from "../../../utils/selectOptionUtils";

interface Props {
    onSubmit: (formData: OpportunitiesFormValues) => void;
    initialValues: OpportunitiesFormValues;
    leftButtonText: string;
    validationSchema: Yup.Schema<any>;
    clearForm?: boolean;
}

const OpportunitiesFormInputs = ({
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
        values: OpportunitiesFormValues,
        { setSubmitting }: FormikHelpers<OpportunitiesFormValues>
    ) => {
        onSubmit(values);
        setSubmitting(false);
    };

    const formik = useFormik<OpportunitiesFormValues>({
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
                        <Card.Title className="px-3 pt-3 pb-0 mb-0">Opportunities Information</Card.Title>
                        <Card.Body>
                            <Form.Group>
                                <Form.Label>Name<span style={{ color: "red" }}> *</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    isInvalid={Boolean(formik.touched.name && formik.errors.name)}
                                    {...formik.getFieldProps("name")}
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.name}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    isInvalid={Boolean(formik.touched.title && formik.errors.title)}
                                    {...formik.getFieldProps("title")}
                                />
                                {formik.touched.title && formik.errors.title && (
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.title}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type="text"
                                    isInvalid={Boolean(formik.touched.category && formik.errors.category)}
                                    {...formik.getFieldProps("category")}
                                />
                                {formik.touched.category && formik.errors.category && (
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.category}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Status</Form.Label>
                                <Form.Control
                                    type="text"
                                    isInvalid={Boolean(formik.touched.status && formik.errors.status)}
                                    {...formik.getFieldProps("status")}
                                />
                                {formik.touched.status && formik.errors.status && (
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.status}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Open Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    className="datePicker"
                                    isInvalid={Boolean(formik.touched.openDate && formik.errors.openDate)}
                                    {...formik.getFieldProps('openDate')}
                                    value={
                                        formik.values.openDate
                                            ? getISORepresentation(formik.values.openDate)
                                            : ''
                                    }
                                />
                                {formik.touched.openDate && formik.errors.openDate && (
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.openDate}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Close Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    className="datePicker"
                                    isInvalid={Boolean(formik.touched.closeDate && formik.errors.closeDate)}
                                    {...formik.getFieldProps('closeDate')}
                                    value={
                                        formik.values.closeDate
                                            ? getISORepresentation(formik.values.closeDate)
                                            : ''
                                    }
                                />
                                {formik.touched.closeDate && formik.errors.closeDate && (
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.closeDate}
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
                            {/* Add other fields as needed */}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card style={{ marginBottom: "20px" }}>
                        <Card.Title className="px-3 pt-3 pb-0 mb-0">Additional Information</Card.Title>
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
                            <Form.Group as={Col}>
                                <Form.Label>Rating</Form.Label>
                                <Form.Control
                                    type="text"
                                    isInvalid={Boolean(formik.touched.rating && formik.errors.rating)}
                                    {...formik.getFieldProps("rating")}
                                />
                                {formik.touched.rating && formik.errors.rating && (
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.rating}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Probability</Form.Label>
                                <Form.Control
                                    type="text"
                                    isInvalid={Boolean(formik.touched.probability && formik.errors.probability)}
                                    {...formik.getFieldProps("probability")}
                                />
                                {formik.touched.probability && formik.errors.probability && (
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.probability}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>How Found</Form.Label>
                                <Form.Control
                                    type="text"
                                    isInvalid={Boolean(formik.touched.howFound && formik.errors.howFound)}
                                    {...formik.getFieldProps("howFound")}
                                />
                                {formik.touched.howFound && formik.errors.howFound && (
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.howFound}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Expected Revenue</Form.Label>
                                <Form.Control
                                    type="text"
                                    isInvalid={Boolean(formik.touched.expectedRevenue && formik.errors.expectedRevenue)}
                                    {...formik.getFieldProps("expectedRevenue")}
                                />
                                {formik.touched.expectedRevenue && formik.errors.expectedRevenue && (
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.expectedRevenue}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Stage Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    isInvalid={Boolean(formik.touched.stageName && formik.errors.stageName)}
                                    {...formik.getFieldProps("stageName")}
                                />
                                {formik.touched.stageName && formik.errors.stageName && (
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.stageName}
                                    </Form.Control.Feedback>
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

export default OpportunitiesFormInputs;
