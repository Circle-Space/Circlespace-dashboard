import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { Nav, Tab } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import CommandBar from '../../../components/CommandBar';
import useLayout from '../../../hooks/useLayout';
import { productValidationSchema, initialProductValues } from './components/FormikConfig';
import ProductInfoForm from './components/ProductInfoForm';
import AttachmentForm from '../../contacts/components/AttachmentForm';
import { Product } from '../types/ProductManagementTypes';
import useProductManagement from '../hooks/useProductManagement';
import Loading from '../../../components/Loading';


interface Props {}

const UpdateProduct = ({}: Props) => {
  const {id} = useParams()
  const { getProductById, product, updateProduct } = useProductManagement()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('General');
  const { setNavbarTitle } = useLayout();

  useEffect(() => {
    setNavbarTitle('Add Product');
    if(id) {
        getProductById(id, () => setLoading(false))
    }
    //document.body.style.overflow = 'hidden';

    return () => {
      setNavbarTitle('');
      //document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = (formData: Product) => {
    updateProduct(formData, () => {
      navigate(-1);
    });
  };
  return (
    <Loading loading={loading}>
      <Formik initialValues={product} validationSchema={productValidationSchema} onSubmit={handleSubmit}>
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
              buttons={[
              
              ]}
            />

            <div className="form-container">
              <Tab.Container defaultActiveKey="general">
                <Nav className="mb-3" variant="tabs">
                  <Nav.Item className="custom-nav-item">
                    <Nav.Link eventKey="general">General</Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="custom-nav-item">
                    <Nav.Link eventKey="attachments">Attachments</Nav.Link>
                  </Nav.Item>
                </Nav>
                            
                <Tab.Content>
                  <Tab.Pane eventKey="general">
                    <ProductInfoForm formTitle="Update Product" formik={formikProps} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="attachments">
                      <h1>Attachments go here </h1>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </div>
          </Form>
        )}
      </Formik>
    </Loading>
  );
};

export default UpdateProduct;
