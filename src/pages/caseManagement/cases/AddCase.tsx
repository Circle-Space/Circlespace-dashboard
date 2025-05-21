import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import { Nav, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CommandBar from '../../../components/CommandBar';
import useLayout from '../../../hooks/useLayout';
import { Case } from './types/casesTypes';
import { caseValidationSchema, initialCaseValues } from './components/FormikConfig';
import GeneralInformationForm from './components/GeneralInformationForm';
import useCase from './hooks/useCase';

interface Props { }

const AddCase: React.FC<Props> = () => {
  const { addCase } = useCase();
  const navigate = useNavigate();
  const { setNavbarTitle } = useLayout();

  useEffect(() => {
    setNavbarTitle('Add Case');

    return () => {
      setNavbarTitle('');
    };
  }, []);

  const handleSubmit = (formData: Case) => {
    addCase(formData, () => {
      navigate(-1);
    });
  };

  return (
    <Formik initialValues={initialCaseValues} validationSchema={caseValidationSchema} onSubmit={() => {}}>
      {formikProps => (
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
              </Nav>

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

export default AddCase;
