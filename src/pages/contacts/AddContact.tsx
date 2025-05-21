import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { Nav, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AddAddressIcon from '../../assets/img/commandbar/add_address_book_icon.svg';
import CompanyTreeIcon from '../../assets/img/commandbar/company_tree_workplace_office_icon.svg';
import AddPhoneIcon from '../../assets/img/commandbar/phone_plus_action_call_icon.svg';
import CommandBar from '../../components/CommandBar';
import useAuth from '../../hooks/useAuth';
import useContact from '../../hooks/useContact';
import useLayout from '../../hooks/useLayout';
import { Contact } from '../../types/contacts/contactsTypes';
import AccountForm from './components/AccountForm';
import AddressForm from './components/AddressesForm';
import { contactValidationSchema, initialContactValues } from './components/FormikConfig';
import GeneralInformationForm from './components/GeneralInformationForm';
import PhoneNumberForm from './components/PhoneNumberForm';
import DocumentInformationForm from './components/DocumentInformationForm';
import SummaryInformationForm from './components/SummaryInformationForm';
import SkillsForm from './components/SkillsForm';
import AttachmentForm from './components/AttachmentForm';



interface Props {}

const AddContact = ({}: Props) => {
  const { user } = useAuth();
  const { addContact } = useContact();
  const navigate = useNavigate();
  const [tab, setTab] = useState('General');
  const { setNavbarTitle } = useLayout();

  useEffect(() => {
    setNavbarTitle('Add Contact');

    //document.body.style.overflow = 'hidden';

    return () => {
      setNavbarTitle('');
      //document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = (formData: Contact) => {
    formData.CreatedBy = user?.Username;
    addContact(formData, () => {
      navigate(-1);
    });
  };

  return (
    <Formik initialValues={initialContactValues} validationSchema={contactValidationSchema} onSubmit={handleSubmit}>
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
              {
                name: '+ Phone',
                handleClick: () => {},
                iconSvgSrc: AddPhoneIcon,
                iconSvgStyle: { width: '22px', height: '22px' },
              },
              {
                name: '+ Address',
                handleClick: () => {},
                iconSvgSrc: AddAddressIcon,
                iconSvgStyle: { width: '22px', height: '22px' },
              },
              {
                name: '+ Account',
                handleClick: () => {},
                iconSvgSrc: CompanyTreeIcon,
                iconSvgStyle: { width: '22px', height: '22px' },
              },
            ]}
          />

          <div className="form-container">
            <Tab.Container defaultActiveKey="userProfile">
              <Nav className="mb-3" variant="tabs">
                <Nav.Item className="custom-nav-item">
                  {' '}
                  <Nav.Link eventKey="generalInfo">General</Nav.Link>
                </Nav.Item>

                <Nav.Item className="custom-nav-item">
                  <Nav.Link eventKey="travelDocumentation">Documents</Nav.Link>
                </Nav.Item>
                <Nav.Item className="custom-nav-item">
                  <Nav.Link eventKey="summary">Summary</Nav.Link>
                </Nav.Item>
                <Nav.Item className="custom-nav-item">
                  <Nav.Link eventKey="skillsTraining">Skills & Training</Nav.Link>
                </Nav.Item>
                <Nav.Item className="custom-nav-item">
                  <Nav.Link eventKey="attachments">Attachments</Nav.Link>
                </Nav.Item>
            </Nav>
                          

              <Tab.Content>
                <Tab.Pane eventKey="generalInfo">
                  <GeneralInformationForm formik={formikProps} />
                </Tab.Pane>
                <Tab.Pane eventKey="travelDocumentation">
                  <DocumentInformationForm formik={formikProps} />
                </Tab.Pane>
                <Tab.Pane eventKey="summary">
                  <SummaryInformationForm formik={formikProps} />
                </Tab.Pane>
                <Tab.Pane eventKey="skillsTraining">
                  <SkillsForm formik={formikProps} />
                </Tab.Pane>
                <Tab.Pane eventKey="attachments">
                    <AttachmentForm formik={formikProps} />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddContact;
