import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import { Nav, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CommandBar from '../../../components/CommandBar';
import useLayout from '../../../hooks/useLayout';
import { Status } from './types/statusTypes'; // Assuming Status type is defined similarly
import { statusValidationSchema, initialStatusValues } from './components/FormikConfig'; // Adjust as per your Formik config
import GeneralInformationForm from './components/GeneralInformationForm'; // Example component for status form
import useStatus from './hooks/useStatus'; // Custom hook for status management
import {
  Alert,
  Card,
} from "react-bootstrap";

interface Props { }

const AddStatus: React.FC<Props> = () => {
  const { addStatus, error } = useStatus();
  const navigate = useNavigate();
  const { setNavbarTitle } = useLayout();

  useEffect(() => {
    setNavbarTitle('Add Status');

    return () => {
      setNavbarTitle('');
    };
  }, []);

  const handleSubmit = (formData: Status) => {
    addStatus(formData, () => {
      navigate(-1);
    });
  };

  return (
    <Formik initialValues={initialStatusValues} validationSchema={statusValidationSchema} onSubmit={() => { }}>
      {formikProps => (
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

export default AddStatus;
