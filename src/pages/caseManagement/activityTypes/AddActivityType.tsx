import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import { Nav, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CommandBar from '../../../components/CommandBar';
import useLayout from '../../../hooks/useLayout';
import { ActivityType } from './types/ActivityTypes';
import { activityTypeValidationSchema, initialActivityTypeValues } from './components/FormikConfig';
import GeneralInformationForm from './components/GeneralInformationForm';
import useActivityType from './hooks/useActivityType';
import {
  Alert,
  Card,
} from "react-bootstrap";

interface Props { }

const AddActivityType: React.FC<Props> = () => {
  const { addActivityType, error } = useActivityType();
  const navigate = useNavigate();
  const { setNavbarTitle } = useLayout();

  useEffect(() => {
    setNavbarTitle('Add Activity Type');

    return () => {
      setNavbarTitle('');
    };
  }, []);

  const handleSubmit = (formData: ActivityType) => {
    addActivityType(formData, () => {
      navigate(-1);
    });

  };

  return (
    <Formik initialValues={initialActivityTypeValues} validationSchema={activityTypeValidationSchema} onSubmit={() => { }}>
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

export default AddActivityType;
