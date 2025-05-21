import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import Select from 'react-select';
import { FormikProps } from 'formik';
import Section from '../../../../components/Section';
import { Case } from '../types/casesTypes';
import useStaticValue from '../../../../hooks/useStaticValue';

interface GeneralInformationProps {
  formik: FormikProps<Case>;
}

const GeneralInformationForm: React.FC<GeneralInformationProps> = ({ formik }) => {
  const { staticValues } = useStaticValue();



  return (
    <>
      <div className="mb-2">
        <h1 className="dashboard-header-text mb-0">Add General Information for Case</h1>
        <span className="small-light-black">
          The "General Information" page is a focused section for entering and updating key details about your cases. This integral part of
          case management allows users to input essential information such as case numbers, subjects, and descriptions.
        </span>
      </div>

      <Section title="Case Information">
        <Row>
          <Form.Group as={Col} sm={6}>
            <Form.Label className="mb-1">Name*</Form.Label>
            <Form.Control type="text" {...formik.getFieldProps('Name')} isInvalid={Boolean(formik.touched.Name && formik.errors.Name)} />
            {formik.touched.Name && formik.errors.Name && (
              <Form.Control.Feedback type="invalid">{formik.errors.Name}</Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group as={Col} md={6}>
            <Form.Label>Assign To</Form.Label>
            <Select
              options={staticValues.Users}
              value={staticValues.Users.find(option => option.value === formik.values.AssignTo)}
              onChange={option => {
                formik.setFieldValue('AssignTo', option?.value);
              }}
              onBlur={() => formik.setFieldTouched('AssignTo', true)}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  borderColor: formik.touched.AssignTo && formik.errors.AssignTo ? 'red' : provided.borderColor,
                }),
              }}
            />

            {formik.touched.AssignTo && formik.errors.AssignTo && (
              <Form.Control.Feedback type="invalid">{formik.errors.AssignTo}</Form.Control.Feedback>
            )}
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md={6}>
            <Form.Label>Status*</Form.Label>
            <Select
              options={staticValues.CaseStatuses}
              value={staticValues.CaseStatuses.find(option => option.value === formik.values.StatusID)}
              onChange={option => {
                formik.setFieldValue('StatusID', option?.value);
              }}
              onBlur={() => formik.setFieldTouched('StatusID', true)}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  borderColor: formik.touched.StatusID && formik.errors.StatusID ? 'red' : provided.borderColor,
                }),
              }}
            />

            {formik.touched.StatusID && formik.errors.StatusID && (
              <Form.Control.Feedback type="invalid">{formik.errors.StatusID}</Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group as={Col} md={6}>
            <Form.Label>Priority*</Form.Label>
            <Select
              options={staticValues.CasePriorities}
              value={staticValues.CasePriorities.find(option => option.value === formik.values.PriorityID)}
              onChange={option => {
                formik.setFieldValue('PriorityID', option?.value);
              }}
              onBlur={() => formik.setFieldTouched('PriorityID', true)}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  borderColor: formik.touched.PriorityID && formik.errors.PriorityID ? 'red' : provided.borderColor,
                }),
              }}
            />
            {formik.touched.PriorityID && formik.errors.PriorityID && (
              <Form.Control.Feedback type="invalid">{formik.errors.PriorityID}</Form.Control.Feedback>
            )}
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md={12}>
            <Form.Label>Description*</Form.Label>
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

      <div className="form-footer-container mt-5 pt-4">{/* Buttons or additional components for form submission or navigation */}</div>
    </>
  );
};

export default GeneralInformationForm;
