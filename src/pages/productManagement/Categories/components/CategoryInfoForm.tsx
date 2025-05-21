import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Section from '../../../../components/Section';
import { FormikProps } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';
import { Category } from '../../types/ProductManagementTypes';


interface Props {
  formik: FormikProps<Category>;
}

const CategoryInfoForm = ({ formik }: Props) => {
  return (
    <>
      <div className="mb-2">
        <h1 className="dashboard-header-text mb-0">Add Category</h1>
        <span className="small-light-black">
          some subtitle/description
        </span>
      </div>

      <Section title="Category Information">
        <Row>
          <Form.Group as={Col} md={12} sm={12}>
            <Form.Label className="mb-1">Category Name</Form.Label>
            <Form.Control
              type="text"
              {...formik.getFieldProps('Name')} // Correctly apply Formik props
              isInvalid={Boolean(formik.touched.Name && formik.errors.Name)}
            />
            {formik.touched.Name && formik.errors.Name && (
              <Form.Control.Feedback type="invalid">{formik.errors.Name}</Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group as={Col} md={12} sm={12}>
            <Form.Label className="mb-1">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              {...formik.getFieldProps('Description')}
              isInvalid={Boolean(formik.touched.Description && formik.errors.Description)}
            />
            {formik.touched.Description && formik.errors.Description && (
              <Form.Control.Feedback type="invalid">{formik.errors.Description}</Form.Control.Feedback>
            )}
          </Form.Group>
        </Row>
      </Section>
    </>
  );
};

export default CategoryInfoForm;
