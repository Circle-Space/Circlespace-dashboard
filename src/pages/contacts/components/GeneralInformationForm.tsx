import React from 'react';
import { Col, Form, Row, Button, Card } from 'react-bootstrap';
import { Contact } from '../../../types/contacts/contactsTypes';
import Section from '../../../components/Section';
import { FormikProps } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { faEdit, faExclamationCircle, faPen, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface GeneralInformationProps {
  formik: FormikProps<Contact>;
}

const GeneralInformationForm: React.FC<GeneralInformationProps> = ({ formik }) => {
  return (
    <>
      <div className="mb-2">
        <h1 className="dashboard-header-text mb-0">Add General Information for Contact</h1>
        <span className="small-light-black">
          The "General Information" page is a focused section for entering and updating key details about your contacts. This integral part
          of contact management allows users to input essential information such as names, and contact details.
        </span>
      </div>

      <Section title="Contact Information">
        <Row>
          <Form.Group as={Col} md={3} sm={3}>
            <Form.Label className="mb-1">First Name</Form.Label>
            <Form.Control
              type="text"
              {...formik.getFieldProps('FirstName')} // Correctly apply Formik props
              isInvalid={Boolean(formik.touched.FirstName && formik.errors.FirstName)}
            />
            {formik.touched.FirstName && formik.errors.FirstName && (
              <Form.Control.Feedback type="invalid">{formik.errors.FirstName}</Form.Control.Feedback>
            )}
          </Form.Group>

          {/* Assuming you have a MiddleName field in your form values */}
          <Form.Group as={Col} md={3} sm={3}>
            <Form.Label className="mb-1">Middle Name (Optional)</Form.Label>
            <Form.Control type="text" {...formik.getFieldProps('MiddleName')} />
          </Form.Group>

          <Form.Group as={Col} md={3} sm={3}>
            <Form.Label className="mb-1">Last Name</Form.Label>
            <Form.Control
              type="text"
              {...formik.getFieldProps('LastName')}
              isInvalid={Boolean(formik.touched.LastName && formik.errors.LastName)}
            />
            {formik.touched.LastName && formik.errors.LastName && (
              <Form.Control.Feedback type="invalid">{formik.errors.LastName}</Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group as={Col} md={3} sm={3}>
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              {...formik.getFieldProps('Gender')}
              isInvalid={Boolean(formik.touched.Gender && formik.errors.Gender)}
            >
              <option value="">Select Gender (Optional)</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-Binary">Non-Binary</option>
              <option value="Genderqueer">Genderqueer</option>
              <option value="Genderfluid">Genderfluid</option>
              <option value="Agender">Agender</option>
              <option value="Bigender">Bigender</option>
              <option value="Two-Spirit">Two-Spirit</option>
              <option value="Third Gender">Third Gender</option>
              <option value="Prefer Not to Say">Prefer Not to Say</option>
              <option value="Other">Other</option>
            </Form.Control>
            {formik.touched.Gender && formik.errors.Gender && (
              <Form.Control.Feedback type="invalid">{formik.errors.Gender}</Form.Control.Feedback>
            )}
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md={3} sm={3}>
            <Form.Label className="mb-1">Primary Email</Form.Label>
            <Form.Control
              type="email"
              {...formik.getFieldProps('Email')}
              isInvalid={Boolean(formik.touched.Email && formik.errors.Email)}
            />
            {formik.touched.Email && formik.errors.Email && (
              <Form.Control.Feedback type="invalid">{formik.errors.Email}</Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group as={Col} md={3} sm={3}>
            <Form.Label className="mb-1">2nd Email</Form.Label>
            <Form.Control type="email" {...formik.getFieldProps('Email2')} />
          </Form.Group>

          <Form.Group as={Col} md={3} sm={3}>
            <Form.Label>Date of Birth</Form.Label>
            <div style={{ marginTop: -4 }}>
              <DatePicker
                wrapperClassName="datePicker custom-datepicker-width"
                className="form-control" // This applies Bootstrap's form control styling
                selected={formik.values.DateOfBirth ? new Date(formik.values.DateOfBirth) : null}
                onChange={date => formik.setFieldValue('DateOfBirth', date)}
                dateFormat="MM/dd/yyyy"
                maxDate={new Date()} // Disallow future dates
                showYearDropdown
                dropdownMode="select"
                placeholderText="mm/dd/yyyy"
                isClearable
                peekNextMonth
                showMonthDropdown
              />
            </div>
            {formik.touched.DateOfBirth && formik.errors.DateOfBirth && <div className="text-danger mt-1">{formik.errors.DateOfBirth}</div>}
          </Form.Group>
        </Row>
      </Section>

      <div className="mb-5">
        <h1 className="dashboard-header-text mb-0">Phone Numbers</h1>
        <p className="small-light-black">
          The "Add Phone Numbers" section enables users to input and manage the phone numbers of their contacts. This critical feature
          allows for the direct addition of mobile, work, and home phone numbers, ensuring that you have multiple channels for reaching out
          to your contacts.
        </p>
        <Button className="mb-4" variant="outline-primary" size="lg" onClick={() => console.log('todo')}>
          <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Phone Numbers
        </Button>

        <h5>Phone Numbers</h5>
        <Card className="mb-3 profile-experience-card">
          <Card.Body className="edit-profile-item-card-body">
            <Row className="mb-3">
              <Col xs={12}>
                <strong>No phone numbers added yet.</strong>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>

      <div className="mb-5">
        <h1 className="dashboard-header-text mb-0">Adresses</h1>
        <p className="small-light-black">
          Submitted Medical Clearances are listed below for any updates. To add another Medical Clearance, select “Add Medical Clearance”
          below.
        </p>
        <Button className="mb-4" variant="outline-primary" size="lg" onClick={() => console.log('todo')}>
          <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Address
        </Button>

        <h5>Addresses</h5>
        <Card className="mb-3 profile-experience-card">
          <Card.Body className="edit-profile-item-card-body">
            <Row className="mb-3">
              <Col xs={12}>
                <strong>No address added yet.</strong>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>

      <div className="mb-5">
        <h1 className="dashboard-header-text mb-0">Account / Employers</h1>
        <p className="small-light-black">
          In the "Add Employers" section, users have the ability to record and update the employment information of their contacts. This
          functionality is designed to capture details about each contact's current and past employment, including company names, roles, and
          employment durations.
        </p>
        <Button className="mb-4" variant="outline-primary" size="lg" onClick={() => console.log('todo')}>
          <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Account
        </Button>

        <h5>Employers/Account</h5>
        <Card className="mb-3 profile-experience-card">
          <Card.Body className="edit-profile-item-card-body">
            <Row className="mb-3">
              <Col xs={12}>
                <strong>No employers nor account added yet.</strong>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>

      <div className="form-footer-container mt-5 pt-4">

      </div>
    </>
  );
};

export default GeneralInformationForm;
