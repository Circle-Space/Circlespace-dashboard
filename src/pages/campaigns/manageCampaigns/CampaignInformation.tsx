import 'react-datepicker/dist/react-datepicker.css';

import React from 'react';

import { FormikProps } from 'formik';
import {
  Col,
  Form,
  Row,
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Select from 'react-select';

import Section from '../../../components/Section';
import useAuth from '../../../hooks/useAuth';
import { CampaignFormValues } from '../../../types/campaigns/campaignTypes';
import { mapDevicesToOptions } from '../../../utils/selectOptionUtils';

interface CampaignInformationProps {
  formik: FormikProps<CampaignFormValues>;
}

const CampaignInformation: React.FC<CampaignInformationProps> = ({ formik }) => {
  const { user } = useAuth();

  const handleDateTimeChange = (field: string, date: Date) => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      formik.setFieldValue(field, date);
    }
  };

  return (
    <Section backgroundColor="#FFFFFF" title="Campaign Information">
      <Row className="mb-3">
        <Form.Group as={Col} md={4} sm={4}>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            isInvalid={Boolean(formik.touched.name && formik.errors.name)}
            {...formik.getFieldProps('name')}
          />
          {formik.touched.name && formik.errors.name && (
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group as={Col} md={4} lg={4}>
          <Form.Label>Start Date</Form.Label>
          <div style={{ marginTop: 0 }}>
            <DatePicker
              selected={formik.values.startDate ? new Date(formik.values.startDate) : null}
              onChange={(date) => handleDateTimeChange('startDate', date)}
              showTimeSelect
              timeFormat="hh:mm aa"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="form-control"
              popperClassName="datePickerPopper"
              wrapperClassName="datePickerWrapper"
              minDate={new Date()}
            />
            {formik.touched.startDate && formik.errors.startDate && (
              <div className="invalid-feedback" style={{ display: 'block' }}>
                {formik.errors.startDate}
              </div>
            )}
          </div>
        </Form.Group>


        <Form.Group as={Col} md={4} lg={4} >
          <Form.Label>End Date</Form.Label>
          <div style={{ marginTop: 0 }}>
            <DatePicker
              selected={formik.values.endDate ? new Date(formik.values.endDate) : null}
              onChange={(date) => handleDateTimeChange('endDate', date)}
              showTimeSelect
              timeFormat="hh:mm aa"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="form-control"
              popperClassName="datePickerPopper"
              wrapperClassName="datePickerWrapper"
              minDate={new Date()}
            />
            {formik.touched.endDate && formik.errors.endDate && (
              <div className="invalid-feedback" style={{ display: 'block' }}>
                {formik.errors.endDate}
              </div>
            )}
          </div>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md={12}>
          <Form.Label>Select Device</Form.Label>
          <Select
            options={mapDevicesToOptions(user?.Devices || [])}
            value={formik.values.deviceId}
            name="deviceId"
            id="deviceId"
            onChange={(option) => {
              formik.setFieldValue('deviceId', option);
            }}
            onBlur={() => formik.setFieldTouched('deviceId', true)}
            styles={{
              control: (provided, state) => ({
                ...provided,
                borderColor:
                  formik.touched.deviceId && formik.errors.deviceId?.label ? 'red' : provided.borderColor,
              }),
            }}
          />
          {formik.touched.deviceId && formik.errors.deviceId?.label && (
            <div
              style={{
                color: 'red',
                marginTop: '0.25rem',
                fontSize: '80%',
              }}
            >
              {formik.errors.deviceId.label}
            </div>
          )}
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md={12}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            rows={4}
            isInvalid={Boolean(formik.touched.description && formik.errors.description)}
            {...formik.getFieldProps('description')}
          />
          {formik.touched.description && formik.errors.description && (
            <Form.Control.Feedback type="invalid">{formik.errors.description}</Form.Control.Feedback>
          )}
        </Form.Group>
      </Row>
    </Section>
  );
};

export default CampaignInformation;
