import React, { useEffect, useState } from "react";
import { Form, Formik, FormikProps } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import CommandBar from "../../../components/CommandBar";
import useStatus from "./hooks/useStatus";
import { Status } from "./types/statusTypes";
import { statusValidationSchema } from "./components/FormikConfig";
import GeneralInformationForm from "./components/GeneralInformationForm";
import useLayout from "../../../hooks/useLayout";
import { Nav, Tab } from 'react-bootstrap';
import {
    Alert,
    Card,
} from "react-bootstrap";

interface Props { }

const UpdateStatus: React.FC<Props> = () => {
    const { statusId } = useParams();
    const { updateStatus, getStatusbyId, status: existingStatus, clearStatus, error } = useStatus();
    const [loading, setLoading] = useState<boolean>(true);
    const { setNavbarTitle } = useLayout();
    const navigate = useNavigate();

    useEffect(() => {
        setNavbarTitle("Edit Status");
        if (statusId) {
            getStatusbyId(statusId);
        }

        return () => {
            setNavbarTitle("");
            clearStatus();
        };
    }, [statusId]);

    useEffect(() => {
        if (existingStatus && Object.keys(existingStatus).length > 0) {
            setLoading(false);
        }
    }, [existingStatus]);

    const handleSubmit = (formData: Status) => {
        if (statusId) {
            updateStatus(formData, () => {
                navigate(-1);
            });
        }
    };

    return (
        <Formik initialValues={existingStatus || {}} validationSchema={statusValidationSchema} onSubmit={() => { }} enableReinitialize>
            {(formikProps: FormikProps<Status>) => (
                <Form>
                    <CommandBar
                        handleSaveAndClose={() => {
                            handleSubmit(formikProps.values)
                        }}
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

export default UpdateStatus;
