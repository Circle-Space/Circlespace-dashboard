import React, { useEffect, useState } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import { Nav, Tab } from 'react-bootstrap';
import CommandBar from '../../../components/CommandBar';
import usePriority from './hooks/usePriority';
import { Priority } from './types/priorityTypes';
import { priorityValidationSchema } from './components/FormikConfig';
import GeneralInformationForm from './components/GeneralInformationForm';
import useLayout from '../../../hooks/useLayout';
import {
    Alert,
    Card,
} from "react-bootstrap";

interface Props { }

const UpdatePriority: React.FC<Props> = () => {
    const { priorityId } = useParams();
    const { updatePriority, getPriorityById, priority: existingPriority, clearPriorities, error } = usePriority();
    const [loading, setLoading] = useState<boolean>(true);
    const { setNavbarTitle } = useLayout();
    const navigate = useNavigate();

    useEffect(() => {
        setNavbarTitle('Edit Priority');
        if (priorityId) {
            getPriorityById(priorityId);
        }

        return () => {
            setNavbarTitle('');
            clearPriorities();
        };
    }, [priorityId]);

    useEffect(() => {
        if (existingPriority && Object.keys(existingPriority).length > 0) {
            setLoading(false);
        }
    }, [existingPriority]);

    const handleSubmit = (formData: Priority) => {
        if (priorityId) {
            updatePriority(formData, () => {
                navigate(-1);
            });
        }
    };

    return (
        <Formik initialValues={existingPriority || {}} validationSchema={priorityValidationSchema} onSubmit={() => { }} enableReinitialize>
            {(formikProps: FormikProps<Priority>) => (
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

export default UpdatePriority;
