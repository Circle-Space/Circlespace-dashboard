import React, { useEffect, useState } from "react";
import { Formik, FormikHelpers, useFormik } from "formik";
import { Button, Form, Row, Col } from "react-bootstrap";
import * as Yup from "yup";
import { RolesFormValues } from "../../roles/types/rolesTypes";
// import useUserManagement from "../../../hooks/useUserManagement";
import Select from "react-select";
import useFeaturesManagement from "../../../hooks/useFeatures";
import useRoles from "../../../hooks/useRoles";
import { SelectOption } from "../../../types/SelectOption";
import { mapFeaturesToOptions } from "../../../utils/selectOptionUtils";

interface Props {
    onSubmit: (formData: RolesFormValues) => void;
    onCancel: () => void;
    initialValues: RolesFormValues;
    leftButtonText: string;
    rightButtonText: string;
    validationSchema: Yup.Schema<any>;
}

const RolesFormInputs = ({
    onSubmit,
    onCancel,
    initialValues,
    leftButtonText,
    rightButtonText,
    validationSchema,
}: Props) => {
    const [featuresOptions, setfeaturesOptions] = useState<SelectOption[]>([])
    const { features } = useFeaturesManagement();
    const { error } = useRoles();


    useEffect(() => {
        setfeaturesOptions(mapFeaturesToOptions(features))
    }, [])

    const handleSubmit = (
        values: RolesFormValues,
        { setSubmitting }: FormikHelpers<RolesFormValues>
    ) => {
        onSubmit(values);
        setSubmitting(false);
    };

    const formik = useFormik<RolesFormValues>({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Row className="mb-2">
                <Form.Group as={Col} md={6}>
                    <Form.Label>Name </Form.Label>
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
                <Form.Group as={Col} md={6}>
                    <Form.Label>Features</Form.Label>
                    <Select
                        className="react-select-container"
                        options={featuresOptions}
                        value={formik.values.Features}
                        name="Features"
                        id="Features"
                        onChange={(option) => {
                            formik.setFieldValue("Features", option);
                        }}
                        isMulti
                        styles={{
                            control: (provided, state) => ({
                                ...provided,
                                borderColor: formik.touched.Features && formik.errors.Features ? "red" : provided.borderColor,
                            }),
                        }}
                    />
                    {formik.touched.Features && formik.errors.Features && (
                        <div style={{ color: 'red', marginTop: "0.25rem", fontSize: "80%" }}>
                            {formik.errors.Features}
                        </div>
                    )}
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group>
                    <Form.Label className="mb-1">Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        isInvalid={Boolean(
                            formik.touched.Description && formik.errors.Description
                        )}
                        {...formik.getFieldProps("Description")}
                    />
                    {formik.touched.Description && formik.errors.Description && (
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.Description}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>
            </Row>
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

export default RolesFormInputs;
