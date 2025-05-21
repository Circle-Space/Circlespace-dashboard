import "react-datepicker/dist/react-datepicker.css";

import React from "react";

import { FormikProps } from "formik";
import {
    Col,
    Form,
    Row,
} from "react-bootstrap";

import Section from "../../../components/Section";
import { Feature } from "../types/featuresTypes";

interface GeneralFeatureProps {
    formik: FormikProps<Feature>;
}


const GeneralFeatureForm: React.FC<GeneralFeatureProps> = ({ formik }) => {

    return (
        <>
            <Section
                title="Feature Information"
                subTitle="Please enter the Feature information."
            >

                <Row>
                    <Form.Group as={Col} md={6}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control

                            isInvalid={Boolean(
                                formik.touched.Name &&
                                formik.errors.Name
                            )}
                            {...formik.getFieldProps("Name")}
                        />
                        {formik.touched.Name &&
                            formik.errors.Name && (
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.Name}
                                </Form.Control.Feedback>
                            )}
                    </Form.Group>
                    <Form.Group as={Col} md={6}>
                        <Form.Label>Description</Form.Label>
                        <Form.Control

                            isInvalid={Boolean(
                                formik.touched.Description &&
                                formik.errors.Description
                            )}
                            {...formik.getFieldProps("Description")}
                        />
                        {formik.touched.Description &&
                            formik.errors.Description && (
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.Description}
                                </Form.Control.Feedback>
                            )}
                    </Form.Group>
                </Row>
                <Form.Group as={Col} md={3} sm={3}>
                    <div>
                        <Form.Check
                            type="checkbox"
                            label="Active"
                            {...formik.getFieldProps('IsActive')}
                            checked={formik.values.IsActive}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.touched.IsActive && formik.errors.IsActive}
                        </Form.Control.Feedback>
                    </div>
                </Form.Group>
            </Section>
        </>
    );
};

export default GeneralFeatureForm;
