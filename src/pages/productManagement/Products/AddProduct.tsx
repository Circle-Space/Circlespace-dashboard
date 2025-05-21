import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { Nav, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CommandBar from '../../../components/CommandBar';
import useLayout from '../../../hooks/useLayout';
import { productValidationSchema, initialProductValues } from './components/FormikConfig';
import ProductInfoForm from './components/ProductInfoForm';
import AttachmentForm from '../../contacts/components/AttachmentForm';
import { Product } from '../types/ProductManagementTypes';
import useProductManagement from '../hooks/useProductManagement';


interface Props {}

const AddProduct = ({}: Props) => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('General');
  const { setNavbarTitle } = useLayout();
  const { addProduct } = useProductManagement();
  useEffect(() => {
    setNavbarTitle('Add Product');

    //document.body.style.overflow = 'hidden';

    return () => {
      setNavbarTitle('');
      //document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = (formData: Product) => {
    addProduct(formData, () => {  navigate(-1) })
  };

  return (
    <Formik initialValues={initialProductValues} validationSchema={productValidationSchema} onSubmit={handleSubmit}>
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
                          
              <Tab.Content>
                <Tab.Pane eventKey="generalInfo">
                  <ProductInfoForm formTitle="Add Product" formik={formikProps} />
                </Tab.Pane>        
              </Tab.Content>
            </Tab.Container>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddProduct;
