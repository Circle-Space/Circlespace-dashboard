import React from 'react';
import { Col, Form, Row, Button, Card } from 'react-bootstrap';
import { Contact } from '../../../types/contacts/contactsTypes';
import Section from '../../../components/Section';
import { FormikProps } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { faEdit, faExclamationCircle, faPen, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface SkillsProps {
  formik: FormikProps<Contact>;
}

const SkillsForm: React.FC<SkillsProps> = ({ formik }) => {
  return (
    <>
      <div className="mb-5 mt-4">
        <h1 className="dashboard-header-text mb-0">Skills and Training</h1>
        <span className="small-light-black">
          Submitted Skills, Languages, and Trainings are listed below for any updates. Under each category, click the Add button to include
          additional Skills and/or Trainings.
        </span>
      </div>

      <div className="mb-5">
        <h1 className="dashboard-header-text mb-0">Skill Codes</h1>

        <Button className="mb-4" variant="outline-primary" size="lg" onClick={() => console.log('todo')}>
          <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Skill Code
        </Button>

        <h5>Languages</h5>
        <Card className="mb-3 profile-experience-card">
          <Card.Body className="edit-profile-item-card-body">
            <Row className="mb-3">
              <Col xs={12}>
                <strong>No Skills added yet.</strong>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>

      <div className="mb-5">
        <h1 className="dashboard-header-text mb-0">Languages</h1>

        <Button className="mb-4" variant="outline-primary" size="lg" onClick={() => console.log('todo')}>
          <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Language
        </Button>

        <h5>Languages</h5>
        <Card className="mb-3 profile-experience-card">
          <Card.Body className="edit-profile-item-card-body">
            <Row className="mb-3">
              <Col xs={12}>
                <strong>No Language added yet.</strong>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>

      <div className="mb-5">
        <h1 className="dashboard-header-text mb-0">Training</h1>

        <Button className="mb-4" variant="outline-primary" size="lg" onClick={() => console.log('todo')}>
          <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Training
        </Button>

        <h5>Training</h5>
        <Card className="mb-3 profile-experience-card">
          <Card.Body className="edit-profile-item-card-body">
            <Row className="mb-3">
              <Col xs={12}>
                <strong>No Training added yet.</strong>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>

      <div className="form-footer-container mt-5 pt-4"></div>
    </>
  );
};

export default SkillsForm;
