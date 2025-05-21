import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { Alert, Card, Nav, Tab } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import CommandBar from '../../../components/CommandBar';
import useLayout from '../../../hooks/useLayout';
import { categoryValidationSchema, initialCategoryValues } from './components/FormikConfig';
import CategoryInfoForm from './components/CategoryInfoForm';
import AttachmentForm from '../../contacts/components/AttachmentForm';
import { Category } from '../types/ProductManagementTypes';
import useProductManagement from '../hooks/useProductManagement';
import Loading from '../../../components/Loading';


interface Props { }

const UpdateCategory = ({ }: Props) => {
  const { id } = useParams()
  const navigate = useNavigate();
  const [tab, setTab] = useState('General');
  const [loading, setLoading] = useState(true)
  const { setNavbarTitle } = useLayout();
  const { getCategoryById, category, updateCategory, error, clear } = useProductManagement();

  useEffect(() => {
    setNavbarTitle('Add Product');
    if (id) {
      getCategoryById(id, () => setLoading(false))
    }
    //document.body.style.overflow = 'hidden';

    return () => {
      setNavbarTitle('');
      clear();
      //document.body.style.overflow = 'unset';
    };
  }, [id]);

  const handleSubmit = (formData: Category) => {
    updateCategory(formData, () => navigate(-1))
  };

  return (
    <Loading loading={loading}>
      <Formik initialValues={category} validationSchema={categoryValidationSchema} onSubmit={handleSubmit}>
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
              buttons={[

              ]}
            />

            <div className="form-container">
              <Tab.Container defaultActiveKey="general">
                <Nav className="mb-3" variant="tabs">
                  <Nav.Item className="custom-nav-item">
                    <Nav.Link eventKey="general">General</Nav.Link>
                  </Nav.Item>
                </Nav>
                <Card.Body>
                  {error && <Alert variant="danger">{error}</Alert>}
                </Card.Body>
                <Tab.Content>
                  <Tab.Pane eventKey="general">
                    <CategoryInfoForm formik={formikProps} />
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

export default UpdateCategory;
