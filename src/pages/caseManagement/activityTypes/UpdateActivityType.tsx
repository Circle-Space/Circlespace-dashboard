import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import CommandBar from "../../../components/CommandBar";
import useActivityType from "./hooks/useActivityType";
import { ActivityType } from "./types/ActivityTypes";
import { activityTypeValidationSchema } from "./components/FormikConfig";
import GeneralInformationForm from "./components/GeneralInformationForm";
import useLayout from "../../../hooks/useLayout";
import { Nav, Tab } from 'react-bootstrap';
import {
    Alert,
    Card,
} from "react-bootstrap";

interface Props { }

const UpdateActivityType: React.FC<Props> = () => {
    const { activityTypeId } = useParams();
    const { updateActivityType, getActivityType, activityType: existingActivityType, clearActivityTypes, error } = useActivityType();
    const [tab, setTab] = useState("General");
    const [loading, setLoading] = useState<boolean>(true);
    const { setNavbarTitle } = useLayout();
    const navigate = useNavigate();

    useEffect(() => {
        setNavbarTitle("Edit Activity Type");

        if (activityTypeId) {
            getActivityType(activityTypeId);
        }

        return () => {
            setNavbarTitle("");
            clearActivityTypes();
        };
    }, [activityTypeId]);

    useEffect(() => {
        if (existingActivityType && Object.keys(existingActivityType).length > 0) {
            setLoading(false);
        }
    }, [existingActivityType]);

    const handleSubmit = (formData: ActivityType) => {
        if (activityTypeId) {
            updateActivityType(formData, () => {
                navigate(-1);
            });
        }
    };

    return (
        <Formik initialValues={existingActivityType || {}} validationSchema={activityTypeValidationSchema} onSubmit={() => { }} enableReinitialize>
            {(formikProps) => (
                <Form>
                    <CommandBar
                        handleSaveAndClose={() => handleSubmit(formikProps.values)}
                        handleClear={() => {
                            formikProps.resetForm();
                        }}
                        handleBack={() => {
                            navigate(-1);
                        }}
                    />
                    <div className="form-container">
                        <Tab.Container defaultActiveKey="generalInfo">
                            <Nav className="mb-3" variant="tabs">
                                <Nav.Item className="custom-nav-item">
                                    <Nav.Link eventKey="generalInfo">General</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="custom-nav-item">
                                    <Nav.Link eventKey="Activities">Activities</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Card.Body>
                                {error && <Alert variant="danger">{error}</Alert>}
                            </Card.Body>
                            <Tab.Content>
                                <Tab.Pane eventKey="generalInfo">
                                    <GeneralInformationForm formik={formikProps} />
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default UpdateActivityType;
