import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { Alert, Card, Nav, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CommandBar from '../../../components/CommandBar';
import useLayout from '../../../hooks/useLayout';
import { categoryValidationSchema, initialCategoryValues } from './components/FormikConfig';
import CategoryInfoForm from './components/CategoryInfoForm';
import AttachmentForm from '../../contacts/components/AttachmentForm';
import { Category } from '../types/ProductManagementTypes';
import useProductManagement from '../hooks/useProductManagement';


interface Props { }

const AddCategory = ({ }: Props) => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('General');
  const { setNavbarTitle } = useLayout();
  const { addCategory, error } = useProductManagement();

  useEffect(() => {
    setNavbarTitle('Add Category');

    //document.body.style.overflow = 'hidden';

    return () => {
      setNavbarTitle('');
      //document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = (formData: Category) => {
    addCategory(formData, () => navigate(-1))
  };

  return (
    <Formik initialValues={initialCategoryValues} validationSchema={categoryValidationSchema} onSubmit={handleSubmit}>
      {formikProps => (
        <Form>
          <CommandBar
            handleSaveAndClose={() => formikProps.submitForm()}
            handleClear={() => {
              formikProps.resetForm();
            }}
            handleBack={() => {
              navigate(-1);
            }}
            buttons={[

            ]}
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
                  <CategoryInfoForm formik={formikProps} />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddCategory;
