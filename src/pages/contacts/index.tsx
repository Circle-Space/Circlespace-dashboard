import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import DownloadIcon from '../../assets/img/commandbar/database_download_grid_icon.svg';
import UploadIcon from '../../assets/img/commandbar/database_grid_up_row_icon.svg';
import BaseTable from '../../components/BaseTable';
import CommandBar from '../../components/CommandBar';
import LoadingOverlay from '../../components/LoadingOverlay';
import ModalBase from '../../components/ModalBase';
import useContact from '../../hooks/useContact';
import useLayout from '../../hooks/useLayout';
import { PaginationType } from '../../types/apiResponse';
import { Contact } from '../../types/contacts/contactsTypes';
import { downloadFile } from '../../utils/downloadFileUtil';
import DetailRow from './components/DetailRow';
import { columns } from './components/tableColumns';

const ContactManagement = () => {
  const { getContacts, searchContacts, clearContacts, deleteContacts, contacts, pagination, addAttachment } = useContact();
  const { setNavbarTitle } = useLayout();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [submittedDisabled, setSubmittedDisabled] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);

  const [paginationKey, setPaginationKey] = useState('Get Contacts');
  const functionMap: {
    [key: string]: (paginationType: PaginationType) => void;
  } = {
    ['Search']: (type: PaginationType) => searchContacts(type, ''),
    ['Get Contacts']: (type: PaginationType) => getContacts(type),
  };

  useEffect(() => {
    setNavbarTitle('Contacts');
    getContacts('RESET');
    setPaginationKey('Get Contacts');
    return () => {
      setNavbarTitle('');
      clearContacts();
    };
  }, []);

  useEffect(() => {
    if (Array.isArray(contacts) && contacts.length >= 0) {
      setLoading(false);
    }
  }, [contacts]);

  const handleRowSelect = useCallback((selectedRows: Contact[]) => {
    setSelectedContacts(selectedRows);
  }, []);

  const handleAddContact = (contact: Contact) => {
    console.log('Adding contact:', contact);
    // Implement add logic
  };

  const handleUpdateContact = (contact: Contact) => {
    console.log('Updating contact:', contact);
    // Implement update logic
  };

  const handleDeleteContact = async () => {
    if (Array.isArray(selectedContacts) && selectedContacts.length > 0) {
      const selectedContactIds = selectedContacts.map(contact => contact.Id);
      await deleteContacts(selectedContactIds);
    }
    setSubmittedDisabled(false);
    setShowDeleteModal(false);
  };

  const handleSearch = (query: string) => {
    if (typeof query === 'string' && query.trim().length > 0) {
      searchContacts('RESET', query);
    }
  };

  const handleBatchDelete = () => {
    console.log('Batch Deleting contacts:', selectedContacts);
    // Implement batch delete logic
  };

  const handleFileLinkClick = () => {
    if (fileInput && fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      debugger;
      setIsLoading(true);
      await addAttachment(Array.from(event.target.files));
      setIsLoading(false);
    }
      if (fileInput && fileInput.current) {
        fileInput.current.value = '';
      }
  };

  return (
    <React.Fragment>
      <LoadingOverlay loading={isLoading} />
      <Helmet title="Contact Management" />
      <CommandBar
        handleNew={() => {
          navigate('AddContact');
        }}
        buttons={[
          {
            name: 'Download Template',
            handleClick: () => {
              downloadFile('templates', 'contact import template.csv');
            },
            iconSvgSrc: DownloadIcon,
            iconSvgStyle: { width: '22px', height: '22px' },
          },
          {
            name: 'Import Contacts',
            handleClick: handleFileLinkClick,
            iconSvgSrc: UploadIcon,
            iconSvgStyle: { width: '22px', height: '22px' },
          },
        ]}
        handleBack={() => {}}
        handleDelete={
          selectedContacts.length > 0
            ? () => {
                setShowDeleteModal(true);
              }
            : undefined
        }
        handleEdit={
          selectedContacts.length === 1
            ? () => {
                navigate(`UpdateContact/${selectedContacts[0].Id}`);
              }
            : undefined
        }
        searchOptions={{
          handleSearch: (searchVal: string) => {
            handleSearch(searchVal);
            setPaginationKey('Search');
          },
          handleClearSearch: () => {
            getContacts('RESET');
            setPaginationKey('Get Contacts');
          },
          searchPlaceholder: 'Search Contact...',
        }}
      />

      <Container className="p-3">
        <h1 className="dashboard-header-text mb-2">Manage Contacts</h1>
        <p className="sub-header">
          The "Contact" section is dedicated to the management and organization of individual leads and contacts. Here, users can import,
          view, and oversee their contact lists, enabling the team to effectively reach out with tailored services and products. This area
          acts as a comprehensive platform for tracking interactions, preferences, and communication with potential and existing customers,
          supporting targeted marketing efforts and personalized customer engagement.
        </p>

        <input type="file" style={{ display: 'none' }} ref={fileInput} accept=".csv" onChange={handleFileChange} />

        <div style={{ marginTop: -4 }} className="analytics-command-bar p-2">
          <BaseTable
            data={contacts || []}
            columns={columns}
            onRowSelect={handleRowSelect}
            showBorder={false}
            showStriped={true}
            showHover={true}
            showPagination={true}
            pagePagination={pagination}
            setPagination={functionMap[paginationKey]}
            // uncomment this if you want to see the expand
            /*renderRowDetails={contact => <DetailRow contact={contact} />}*/
          />
        </div>
      </Container>

      <ModalBase
        size="lg"
        centered={true}
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        title="Attention: Action Requires Confirmation"
        subTitle="Please Confirm Contact Deletion"
        isSubmitDisabled={submittedDisabled}
        onCancel={() => setShowDeleteModal(false)}
        onSubmit={handleDeleteContact}
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
      >
        <>
          <p>
            You are about to delete a selection of contacts from the system. Please be aware that this action is irreversible and only users
            with administrative privileges are authorized to perform it. Once these records are deleted, there will be no method available
            to recover them. Please confirm that you understand the implications of this action and that you wish to proceed with the
            deletion of these records.
          </p>
        </>
      </ModalBase>
    </React.Fragment>
  );
};

export default ContactManagement;
