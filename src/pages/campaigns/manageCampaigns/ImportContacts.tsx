import React, { useRef, useState } from 'react';
import { FormikProps } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CheckCircle } from '../../../components/EmbeddedIcons';
import { apiConfig } from '../../../config';
import { CampaignFormValues } from '../../../types/campaigns/campaignTypes';

const documentPath = `${apiConfig.baseUrl}/blob/download/`;

interface ImportContactsProps {
  formik: FormikProps<CampaignFormValues>;
}

const ImportContacts: React.FC<ImportContactsProps> = ({ formik }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const fileInput = useRef<HTMLInputElement>(null);

  const handleFileLinkClick = () => {
    if (fileInput && fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      debugger;
      const file = event.target.files[0] || null;
      if (file && file.type) {
        formik.setFieldValue('FileName', file.name);
        formik.setFieldValue('files', [file]);
        setUploadedFile(file);

      }
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
      const file = event.dataTransfer.items[0].getAsFile() || null;
      if (file && file.type) {
        debugger;
        formik.setFieldValue('FileName', file.name);
        formik.setFieldValue('files', [file]);
        setUploadedFile(file);
      }
    }
  };

const handleDeleteAttachment = async () => {
  formik.setFieldValue('FileName', null);
  formik.setFieldValue('files', []);
  setUploadedFile(null);
};

  const downloadAttachment = (fileName: string) => {
    const link = document.createElement('a');
    link.href = `${documentPath}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
    
      <div className="mb-3">
        <h1 className="dashboard-header-text mb-3">Upload Contacts</h1>
        <p className="sub-header">
          To launch an SMS campaign, a contact list is essential. Our CSV template ensures compatibility with various
          apps for easy integration. For large data customizations, our technical support and engineers are here to
          assist. For optimal performance, we recommend creating campaigns with no more than 5000 users. Need help?
          Contact us for support and tailored solutions.
        </p>
      </div>

      <div className="upload-container text-center pt-5 pb-5 mb-3" onDragOver={handleDragOver} onDrop={handleDrop}>
        <span className="upload-text">
          Drag Files here or{' '}
          <span className="upload-link-text" onClick={handleFileLinkClick}>
            Choose from Folder
          </span>
        </span>
        <br />
        <span className="upload-text">Select a .csv file</span>
        <Form.Control
          type="file"
          style={{ display: 'none' }}
          ref={fileInput}
          accept=".csv"
          onChange={handleFileChange}
          isInvalid={Boolean(formik.touched.FileName && formik.errors.FileName)}
        />

        {formik.touched.FileName && formik.errors.FileName && (
          <Form.Control.Feedback type="invalid">{formik.errors.FileName}</Form.Control.Feedback>
        )}
      </div>

      <div className="mb-5 mt-5 gray-top-border pt-5">
        <h1 className="dashboard-header-text mb-0">Attachment</h1>
      </div>

      {uploadedFile && (
        <div className="attachment-container ps-4 pe-4 pt-3 pb-3 mb-4">
          <div className="d-flex align-items-center">
            <div style={{ marginRight: '20px' }}>
              <CheckCircle size={20} width={20} />
            </div>

            <div>
              <span className="file-name-text-bold">File Name:</span>
              <br />
              <span className="file-name-text">{uploadedFile.name}</span>
            </div>
          </div>
          <div className="d-flex align-items-center">
            {/* cperez: for exit only <Button
              style={{ marginRight: '20px' }}
              size="sm"
              variant="icon"
              onClick={() => downloadAttachment(uploadedFile.name)}
            >
              <EyeWhiteBackground size={30} width={30} />
            </Button> */}
            <Button size="sm" variant="icon" onClick={() => handleDeleteAttachment()}>
              <FontAwesomeIcon fontSize={16} color="#990000" icon={faTrash} style={{ cursor: 'pointer' }} />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImportContacts;
