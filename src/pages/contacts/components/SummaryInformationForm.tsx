import React, { useState } from 'react';
import { Col, Form, Row, Button, Card } from 'react-bootstrap';
import { Contact } from '../../../types/contacts/contactsTypes';
import Section from '../../../components/Section';
import { FormikProps } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { faEdit, faExclamationCircle, faPen, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Editor from '../../../components/RichTextEditor/RichTextEditorBase'; 
export const emptyRTEState: string = `{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"heading","version":1,"tag":"h3"}],"direction":null,"format":"","indent":0,"type":"root","version":1}}`;
import { RichTextEditorData } from '../../../RichTextEditorData'; 


interface SummaryInformationProps {
  formik: FormikProps<Contact>;
}

const SummaryInformationForm: React.FC<SummaryInformationProps> = ({ formik }) => {
  const [initialSummary, setInitialSummary] = useState<string>(emptyRTEState);
  const [editorContent, setEditorContent] = useState<RichTextEditorData>();
  
  return (
    <>
      <div className="mb-5">
        <h1 className="dashboard-header-text mb-0">Summary</h1>
        <p className="small-light-black">Briefly introduce yourself. Add any skills that are related to your profile.</p>
      </div>

      <Card className="mb-3 profile-summary-card">
        <Card.Body className="edit-profile-item-card-body">
          <Editor
            editorConfig={initialSummary}
            formatDropdown={true}
            fontSizeDropdown={true}
            fontFamilyDropdown={true}
            textAlignmentDropdown={true}
            highlighterPlugin={true}
            formatPlugin={true}
            autoLinkPlugin={true}
            disabled={false}
            toolbar={true}
            onChange={newContent => setEditorContent(newContent)}
          />
        </Card.Body>
      </Card>
      <div className="form-footer-container mt-5 pt-4"></div>
    </>
  );
};

export default SummaryInformationForm;
