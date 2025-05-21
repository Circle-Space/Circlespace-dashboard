import React, {
  useEffect,
  useState,
} from 'react';

import {
  Button,
  Card,
  Container,
  Form,
  Modal,
} from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import Select, { MultiValue, ActionMeta } from 'react-select';

import {
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Editor from '../../components/RichTextEditor/RichTextEditorBase';
import useEmailTemplates from '../../hooks/useEmailTemplates';
import useUsers from '../../hooks/useUsers';
import useLayout from '../../hooks/useLayout';
import { EmailTemplate } from '../../pages/Configurations/types/emailTemplatestype';
import { SelectOption } from '../../types/SelectOption';
import { mapTemplateNameToOptions } from '../../utils/selectOptionUtils';
import useAuth from '../../hooks/useAuth';
import CommandBar from '../../components/CommandBar';
import { useNavigate } from 'react-router-dom';

export const emptyRTEState: string = `{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"heading","version":1,"tag":"h3"}],"direction":null,"format":"","indent":0,"type":"root","version":1}}`;

export const AdminAutomateEmail = () => {
  const { user } = useAuth();
  const { getUsers, users } = useUsers();
  const {
    emailTemplates,
    getEmailTemplates,
    addEmailTemplate,
    updateEmailTemplate,
    deleteEmailTemplate
  } = useEmailTemplates();
  const navigate = useNavigate()

  const [newTemplateName, setNewTemplateName] = useState<string>("");
  const [currentEmailTemplate, setCurrentEmailTemplate] = useState<SelectOption | null>();
  const [editorState, setEditorState] = useState<string>(emptyRTEState);
  const [currentEditorState, setCurrentEditorState] = useState<string>(emptyRTEState);
  const [subject, setSubject] = useState<string>('');
  const [variables, setVariables] = useState<SelectOption[]>();
  const { setNavbarTitle } = useLayout();
  const [templateOptions, setTemplateOptions] = useState<SelectOption[]>([]);
  const [userOptions, setuserOptions] = useState<SelectOption[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<MultiValue<SelectOption> | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    getUsers("RESET");

    return () => {
      setNavbarTitle('');
    }
  }, [])

  useEffect(() => {
    if (users && users.length > 0) {
      const options = users.map(user => ({
        value: user.Email,
        label: `${user.FirstName} ${user.LastName} - ${user.Email}`,
      }));
      setuserOptions(options);
    } else {
      setuserOptions([]);
    }
  }, [users]);

  useEffect(() => {
    console.log("updating options", emailTemplates)
    setTemplateOptions(mapTemplateNameToOptions(emailTemplates));
  }, [emailTemplates]);

  useEffect(() => {
    setNavbarTitle("Automated Emails");
    getEmailTemplates("RESET");
  }, [setNavbarTitle]);

  const handleUserChange = (options: MultiValue<SelectOption> | null) => {
    setSelectedUsers(options || []);
  };

  const handleChange = (newState: string) => {
    setCurrentEditorState(newState);
  };

  const handleChangeTemplate = (newOption: SelectOption) => {
    setCurrentEmailTemplate(newOption);
    const selectedTemplateName = newOption.label;
    const selectedTemplate = emailTemplates.find(template => template.TemplateName === selectedTemplateName);
    if (selectedTemplate) {
      console.log("SELECTEd", selectedTemplate)
      setEditorState(selectedTemplate.HtmlContent || emptyRTEState);
      setSubject(selectedTemplate.Subject || '');
      const CCEmails = selectedTemplate.RecipientAddresses?.split(";") || [];
      const selectedUsers = userOptions.filter(u => CCEmails.includes(u.value));
      setSelectedUsers(selectedUsers);
    }
  };

  const handleSave = () => {
    if (currentEmailTemplate) {
      const recipientEmails = selectedUsers?.map(user => user.value).join(';') || '';

      const newTemplateEmail: EmailTemplate = {
        Id: currentEmailTemplate.value,
        TemplateName: currentEmailTemplate.label,
        HtmlContent: JSON.stringify(currentEditorState),
        Status: 'Active',
        Subject: subject,
        SenderAddress: user?.Email || '',
        RecipientAddresses: recipientEmails,
      };

      updateEmailTemplate(newTemplateEmail, () => {
        setNewTemplateName('');
        setCurrentEmailTemplate(null);
        setEditorState(emptyRTEState);
        setSelectedUsers(null);
        setSubject('');
      });
    }
  };

  const handleAddTemplate = () => {
    if (newTemplateName && newTemplateName.length > 0) {
      const recipientEmails = selectedUsers?.map(user => user.value).join(';') || '';

      const newTemplateEmail: EmailTemplate = {
        Id: '00000000-0000-0000-0000-000000000000',
        TemplateName: newTemplateName,
        HtmlContent: emptyRTEState,
        Subject: '',
        SenderAddress: user?.Email || '',
        RecipientAddresses: recipientEmails,
        Status: "Active"
      };

      addEmailTemplate(newTemplateEmail, (newId: string) => {
        const newTemplate: SelectOption = { value: newId, label: newTemplateName }
        handleChangeTemplate(newTemplate)
        handleCloseModal()
      });
    }
  };

  const handleDelete = () => {
    if (currentEmailTemplate) {
      const selectedTemplateName = currentEmailTemplate.label;
      const selectedTemplate = emailTemplates.find(template => template.TemplateName === selectedTemplateName);
      if (selectedTemplate) {
        deleteEmailTemplate(selectedTemplate)
        setCurrentEmailTemplate(null)
      }
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setNewTemplateName('')
  }

  return (
    <div className="p-3">
      <Helmet title="Default Automate Emails" />
      <CommandBar
        handleBack={() => navigate('/services/campaigns')}
        handleDelete={currentEmailTemplate ? handleDelete : undefined}
        handleNew={() => setShowModal(true)}
        handleSaveAndClose={currentEmailTemplate ? handleSave : undefined}
      />

      <Container className='mt-4' fluid="md">
        <div className="mb-3">
          <h1 className="dashboard-header-text mb-0">Automate Emails</h1>
          <span className="sub-header">
            Streamline your email campaigns effortlessly with template selection, rich text editing, and segmented dispatch. Customize content, manage recipients, and optimize delivery for effective communication.
            <br /><br />
            To get started:
            <ul>
              <li>Select an email template from the dropdown list below.</li>
              <li>Customize the email subject and add recipients in the fields provided.</li>
              <li>Edit the email content using the rich text editor.</li>
              <li>Save your changes or create a new template using the options in the command bar above.</li>
            </ul>
          </span>
        </div>

        <Form.Group className="mb-5 d-flex align-items-center">
          <div className='w-100'>
            <Form.Label>Select Email Template</Form.Label>
            <Select
              options={templateOptions}
              placeholder="Automated Email"
              value={currentEmailTemplate}
              onChange={option => {
                if (option) {
                  handleChangeTemplate(option);
                }
              }}
            />
          </div>
        </Form.Group>

        {currentEmailTemplate && (
          <Card className="p-3">
            <div className="mb-4">
              <Form.Group>
                <Form.Label className="medium-black">Subject</Form.Label>
                <Form.Control
                  type="text"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder="Enter email subject"
                />
              </Form.Group>
            </div>

            <div className="mb-4">
              <Form.Label className="medium-black">Add CC</Form.Label>
              <Select
                id="profileSelect"
                className="react-select-container"
                options={userOptions}
                name="profileSelect"
                value={selectedUsers}
                placeholder="Employee Email"
                onChange={handleUserChange}
                isMulti={true}
              />
            </div>

            <div className="rich-text-editorWrapper">
              <Editor
                editorConfig={editorState}
                undoRedoOptions={true}
                fontFamilyDropdown={true}
                fontSizeDropdown={true}
                formatDropdown={true}
                highlighterPlugin={true}
                variableDropdown={true}
                availableVariables={variables}
                formatPlugin={true}
                autoLinkPlugin={true}
                onChange={handleChange}
              />
            </div>
          </Card>
        )}
      </Container>

      <Modal show={showModal} size="sm" onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Template Name</Modal.Title>
        </Modal.Header>
        <Form >
          <Modal.Body>
            <Form.Group controlId="templateName">
              <Form.Label>Template Name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter template name"
                value={newTemplateName}
                isInvalid={templateOptions.some(t => t.label === newTemplateName)}
                onChange={e => setNewTemplateName(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (newTemplateName.length > 4) {
                      handleAddTemplate();
                    }
                  }
                }}
              />
              {templateOptions.some(t => t.label === newTemplateName) && (
                <Form.Control.Feedback type="invalid">
                  This name already exists.
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              onClick={handleAddTemplate}
              variant="primary"
              disabled={newTemplateName.length <= 4 || templateOptions.some(t => t.label === newTemplateName)}
            >
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminAutomateEmail;
