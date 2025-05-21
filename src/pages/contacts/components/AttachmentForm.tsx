import React, { useEffect, useRef, useState } from 'react';
import { Col, Form, Row, Button, Card } from 'react-bootstrap';
import { Contact } from '../../../types/contacts/contactsTypes';
import Section from '../../../components/Section';
import { FormikProps } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { faEdit, faExclamationCircle, faPen, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface AttachmentFormProps {
  formik: FormikProps<Contact>;
}

const AttachmentForm: React.FC<AttachmentFormProps> = ({ formik }) => {

      const [reaProfileId, setReaProfileId] = useState(null);
      const [isLoading, setIsLoading] = useState(false);
      const [attachmentFiles, setAttachmentFiles] = useState<File[]>([]);
      const fileInput = useRef<HTMLInputElement>(null);
  const documentPath = `/blob/download/`;
  


      const handleFileLinkClick = () => {
        if (fileInput && fileInput.current) {
          fileInput.current.click();
        }
      };

      const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
      };
      const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
          const file = event.dataTransfer.items[0].getAsFile() || null;
          if (file && file.type) {
            setIsLoading(true);

            setIsLoading(false);
          }
        }
      };

      const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
          const file = event.target.files[0] || null;
          if (file && file.type) {
            setIsLoading(true);

            setIsLoading(false);
          }
        }
      };
      const handleDeleteAttachment = async (profileId: number, fileName: string) => {
        setIsLoading(true);

        setIsLoading(false);
      };

      const downloadAttachment = (fileName: string, downloadUrl: string) => {
        setIsLoading(true);
        const link = document.createElement('a');
        link.href = `${documentPath}${downloadUrl}`;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => {
          setIsLoading(false);
        }, 5000);
  };
  
  return (
    <>
      <div className="mb-5 mt-4">
        <h1 className="dashboard-header-text mb-0">Upload Files </h1>
      </div>

      <div className="upload-container text-center pt-5 pb-5 mb-3" onDragOver={handleDragOver} onDrop={handleDrop}>
        <span className="upload-text">
          Drag Files here or{' '}
          <span className="upload-link-text" onClick={handleFileLinkClick}>
            Choose from Folder
          </span>
        </span>
        <br />
        <span className="upload-text">Select up to 3 PDF, JPEG, or GIF files</span>
        <input type="file" style={{ display: 'none' }} ref={fileInput} accept=".pdf, .jpeg, .jpg, .gif" onChange={handleFileChange} />
      </div>

      <div className="mb-5 mt-5 gray-top-border pt-5">
        <h1 className="dashboard-header-text mb-0">Attachments </h1>
      </div>

      
      <div className="form-footer-container mt-5 pt-4"></div>
    </>
  );
};

export default AttachmentForm;
