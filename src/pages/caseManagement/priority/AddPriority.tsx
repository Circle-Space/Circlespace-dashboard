import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import { Nav, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CommandBar from '../../../components/CommandBar';
import useLayout from '../../../hooks/useLayout';
import { Priority } from './types/priorityTypes';
import { priorityValidationSchema, initialPriorityValues } from './components/FormikConfig';
import GeneralInformationForm from './components/GeneralInformationForm';
import usePriority from './hooks/usePriority';
import {
  Alert,
  Card,
} from "react-bootstrap";

interface Props { }

const AddPriority: React.FC<Props> = () => {
  const { addPriority, error } = usePriority();
  const navigate = useNavigate();
  const { setNavbarTitle } = useLayout();

  useEffect(() => {
    setNavbarTitle('Add Priority');

    return () => {
      setNavbarTitle('');
    };
  }, []);

  const handleSubmit = (formData: Priority) => {
    addPriority(formData, () => {
      navigate(-1);
    });
  };

  return (
    <Formik initialValues={initialPriorityValues} validationSchema={priorityValidationSchema} onSubmit={() => { }}>
      {(formikProps) => (
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

export default AddPriority;
