import React from 'react';
import { Col, Form, Row, Button, Card } from 'react-bootstrap';
import { Contact } from '../../../types/contacts/contactsTypes';
import Section from '../../../components/Section';
import { FormikProps } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { faEdit, faExclamationCircle, faPen, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface DocumentInformationProps {
  formik: FormikProps<Contact>;
}

const DocumentInformationForm: React.FC<DocumentInformationProps> = ({ formik }) => {
  return (
    <>
      <div className="mb-5">
        <h1 className="dashboard-header-text mb-0">Travel Documents</h1>
        <p className="small-light-black">
          Submitted Travel Documents are listed below for any updates. To add another Travel Document, select “Add Travel Document” below.
        </p>
        <Button className="mb-4" variant="outline-primary" size="lg" onClick={() => console.log('todo')}>
          <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Travel Document
        </Button>

          <h5>Travel Documents</h5>
          <Card className="mb-3 profile-experience-card">
            <Card.Body className="edit-profile-item-card-body">
              <Row className="mb-3">
                <Col xs={12}>
                  <strong>No travel documents added yet.</strong>
                </Col>
              </Row>
            </Card.Body>
          </Card>

      </div>

      <div className="mb-5">
        <h1 className="dashboard-header-text mb-0">Medical Clearances</h1>
        <p className="small-light-black">
          Submitted Medical Clearances are listed below for any updates. To add another Medical Clearance, select “Add Medical Clearance”
          below.
        </p>
        <Button className="mb-4" variant="outline-primary" size="lg" onClick={() => console.log('todo')}>
          <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Medical Clearance
        </Button>

        <h5>Medical Clearances</h5>
        <Card className="mb-3 profile-experience-card">
          <Card.Body className="edit-profile-item-card-body">
            <Row className="mb-3">
              <Col xs={12}>
                <strong>No medical clearances added yet.</strong>
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

export default DocumentInformationForm;
