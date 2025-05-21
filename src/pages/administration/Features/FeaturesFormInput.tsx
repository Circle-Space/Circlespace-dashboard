import React from "react";
import { FormikHelpers, useFormik } from "formik";
import { Button, Form, Row, Col } from "react-bootstrap";
import * as Yup from "yup";
import { FeaturesFormValues } from "../../features/types/featuresContext";
import useFeaturesManagement from "../../../hooks/useFeatures";

interface Props {
    onSubmit: (formData: FeaturesFormValues) => void;
    onCancel: () => void;
    initialValues: FeaturesFormValues;
    leftButtonText: string;
    rightButtonText: string;
    validationSchema: Yup.Schema<any>;
}

const FeaturesFormInputs = ({
    onSubmit,
    onCancel,
    initialValues,
    leftButtonText,
    rightButtonText,
    validationSchema,
}: Props) => {
    const { error } = useFeaturesManagement();

    const handleSubmit = (
        values: FeaturesFormValues,
        { setSubmitting }: FormikHelpers<FeaturesFormValues>
    ) => {
        onSubmit(values);
        setSubmitting(false);
    };

    const formik = useFormik<FeaturesFormValues>({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group >
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    isInvalid={Boolean(formik.touched.Name && formik.errors.Name)}
                    {...formik.getFieldProps("Name")}
                />
                {formik.touched.Name && formik.errors.Name && (
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.Name}
                    </Form.Control.Feedback>
                )}
            </Form.Group>
            <Row className="mb-2">
                <Form.Group >
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        isInvalid={Boolean(formik.touched.Description && formik.errors.Description)}
                        {...formik.getFieldProps("Description")}
                    />
                    {formik.touched.Description && formik.errors.Description && (
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.Description}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>
            </Row>
            <Row className="mb-2">
                <Form.Group as={Col} md={6}>
                    <div>
                        <Form.Check
                            type="checkbox"
                            label="Active"
                            {...formik.getFieldProps("IsActive")}
                            checked={formik.values.IsActive}
                        />
                        {formik.touched.IsActive && formik.errors.IsActive && (
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.IsActive}
                            </Form.Control.Feedback>
                        )}
                    </div>
                </Form.Group>
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
                <Button variant="secondary" onClick={onCancel} className="ms-2">
                    {rightButtonText}
                </Button>
            </div>
        </Form>
    );
};

export default FeaturesFormInputs;
