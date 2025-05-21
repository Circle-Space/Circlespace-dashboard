import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import Select from 'react-select';
import { FormikProps } from 'formik';
import Section from '../../../../components/Section';
import { ActivityType } from '../types/ActivityTypes';

interface GeneralInformationProps {
  formik: FormikProps<ActivityType>;
}

const GeneralInformationForm: React.FC<GeneralInformationProps> = ({ formik }) => {


  return (
    <>
      <div className="mb-2">
        <h1 className="dashboard-header-text mb-0">Add General Information for Activity Type</h1>
        <span className="small-light-black">
          The "General Information" page is a focused section for entering and updating key details about your cases. This integral part
          of Activity Type management allows users to input essential information such as Name , Description.
        </span>
      </div>

      <Section title="Activity Type Information">
        <Row>
          <Form.Group as={Col} md={12} sm={12}>
            <Form.Label className="mb-1">Name</Form.Label>
            <Form.Control
              type="text"
              {...formik.getFieldProps('Name')}
              isInvalid={Boolean(formik.touched.Name && formik.errors.Name)}
            />
            {formik.touched.Name && formik.errors.Name && (
              <Form.Control.Feedback type="invalid">{formik.errors.Name}</Form.Control.Feedback>
            )}
          </Form.Group>


          <Row>
            <Form.Group as={Col} md={12} sm={12}>
              <Form.Label>Description</Form.Label>
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


        </Row>
      </Section>

      <div className="form-footer-container mt-5 pt-4">
      </div>
    </>
  );
};

export default GeneralInformationForm;
