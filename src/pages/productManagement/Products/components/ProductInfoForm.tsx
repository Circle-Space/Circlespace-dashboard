import React from 'react';
import { Col, Form, Row, Button, Card, InputGroup } from 'react-bootstrap';
import Section from '../../../../components/Section';
import { FormikProps } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { faEdit, faExclamationCircle, faPen, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Product } from '../../types/ProductManagementTypes';
import useProductManagement from '../../hooks/useProductManagement';


interface Props {
  formik: FormikProps<Product>;
  formTitle: string;
}

const ProductInfoForm = ({ formik, formTitle } :Props) => {
  const {categories, products} = useProductManagement()
  return (
    <>
      <div className="mb-2">
        <h1 className="dashboard-header-text mb-0">{formTitle}</h1>
        <span className="small-light-black">
          some subtitle/description
        </span>
      </div>

      <Section title="Product Information">
        <Row className='mb-3'>
          <Form.Group as={Col} md={4} sm={4}>
            <Form.Label className="mb-1">Product Name</Form.Label>
            <Form.Control
              {...formik.getFieldProps('Name')} // Correctly apply Formik props
              isInvalid={Boolean(formik.touched.Name && formik.errors.Name)}
            />
            {formik.touched.Name && formik.errors.Name && (
              <Form.Control.Feedback type="invalid">{formik.errors.Name}</Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group as={Col} md={4} sm={4}>
            <Form.Label className="mb-1">SKU</Form.Label>
            <Form.Control
              {...formik.getFieldProps('SKU')}
              isInvalid={Boolean(formik.touched.SKU && formik.errors.SKU)}
            />
            {formik.touched.SKU && formik.errors.SKU && (
              <Form.Control.Feedback type="invalid">{formik.errors.SKU}</Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group as={Col} md={4} sm={4}>
            <Form.Label className="mb-1">Price</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                type="number"
                min={0}
                {...formik.getFieldProps('Price')}
                isInvalid={Boolean(formik.touched.Price && formik.errors.Price)}
              />
              {formik.touched.Price && formik.errors.Price && (
                <Form.Control.Feedback type="invalid">{formik.errors.Price}</Form.Control.Feedback>
              )}
            </InputGroup>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md={4} sm={4}>
            <Form.Label className="mb-1">Category</Form.Label>
            <Form.Select
              {...formik.getFieldProps('CategoryId')}
              isInvalid={Boolean(formik.touched.CategoryId && formik.errors.CategoryId)}
            >
              <option>Select Category (optional)</option>
              {categories.map(c => 
                <option value={c.Id}>{c.Name}</option>
              )}
            </Form.Select>
            {formik.touched.CategoryId && formik.errors.CategoryId && (
              <Form.Control.Feedback type="invalid">{formik.errors.CategoryId}</Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group as={Col} md={4} sm={4}>
            <Form.Label className="mb-1">Parent Product</Form.Label>
            <Form.Select
              {...formik.getFieldProps('ParentProductId')}
              isInvalid={Boolean(formik.touched.ParentProductId && formik.errors.ParentProductId)}
            >
              <option>Select Parent Product (optional)</option>
              {products.map(p => (
                <option value={p.Id}>{p.Name}</option>
              ))}
            </Form.Select>
            {formik.touched.ParentProductId && formik.errors.ParentProductId && (
              <Form.Control.Feedback type="invalid">{formik.errors.ParentProductId}</Form.Control.Feedback>
            )}
          </Form.Group>
        </Row>
        <Row>
          <Form.Group >
            <Form.Label className="mb-1">Description</Form.Label>
            <Form.Control
              as="textarea"
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

export default ProductInfoForm;
