import React, { useCallback, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import BaseTable from '../../../components/BaseTable';
import CommandBar from '../../../components/CommandBar';
import LoadingOverlay from '../../../components/LoadingOverlay';
import ModalBase from '../../../components/ModalBase';
import useLayout from '../../../hooks/useLayout';
import { PaginationType } from '../../../types/apiResponse';
import { Status } from './types/statusTypes';
import { columns } from './components/tableColumns';
import useStatus from './hooks/useStatus';

const StatusManagement: React.FC = () => {
  const { getStatus, statuses, pagination, deleteStatus, searchStatus, clearStatus } = useStatus();
  const { setNavbarTitle } = useLayout();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [submittedDisabled, setSubmittedDisabled] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<Status[]>([]);

  const [paginationKey, setPaginationKey] = useState<string>('Get Statuses');
  const functionMap: {
    [key: string]: (paginationType: PaginationType) => void;
  } = {
    ['Search']: (type: PaginationType) => searchStatus(type, ''),
    ['Get Status']: (type: PaginationType) => getStatus(type),
  };

  useEffect(() => {
    setNavbarTitle('Status');
    getStatus('RESET');
    setPaginationKey('Get Status');
    return () => {
      setNavbarTitle('');
      clearStatus();
    };
  }, []);


  useEffect(() => {
    if (Array.isArray(statuses) && statuses.length >= 0) {
      setLoading(false);
    }
  }, [statuses]);

  const handleRowSelect = useCallback((selectedRows: Status[]) => {
    setSelectedStatuses(selectedRows);
  }, []);

  const handleDeleteStatus = async () => {
    if (Array.isArray(selectedStatuses) && selectedStatuses.length > 0) {
      const selectedStatusIds = selectedStatuses.map(s => s.Id); // Adjust property as per your Status type
      await deleteStatus(selectedStatusIds);
    }
    setSubmittedDisabled(false);
    setShowDeleteModal(false);
  };

  const handleSearch = (query: string) => {
    if (typeof query === 'string' && query.trim().length > 0) {
      searchStatus('RESET', query);
    }
  };

  return (
    <React.Fragment>
      <LoadingOverlay loading={isLoading} />
      <Helmet title="Status Management" />
      <CommandBar
        handleNew={() => {
          navigate('AddStatus'); // Adjust route as per your application
        }}
        handleBack={() => { }}
        handleDelete={
          selectedStatuses.length === 1
            ? () => {
              setShowDeleteModal(true);
            }
            : undefined
        }
        handleEdit={
          selectedStatuses.length === 1
            ? () => {
              navigate(`UpdateStatus/${selectedStatuses[0].Id}`); // Adjust route and property as per your Status type
            }
            : undefined
        }
        searchOptions={{
          handleSearch: (searchVal: string) => {
            handleSearch(searchVal);
            setPaginationKey('Search');
          },
          handleClearSearch: () => {
            getStatus('RESET');
            setPaginationKey('Get Statuses');
          },
          searchPlaceholder: 'Search Status...', // Adjust placeholder text
        }}
      />

      <Container className="p-3">
        <h1 className="dashboard-header-text mb-2">Manage Status</h1>
        <p className="sub-header">
          The "Status" section is dedicated to managing and organizing statuses. Here, users can import, view, and oversee status details,
          facilitating effective status management and updates. This area provides comprehensive support for tracking status changes,
          communications, and actions, supporting efficient workflow and task management.
        </p>

        <div style={{ marginTop: -4 }} className="analytics-command-bar p-2">
          <BaseTable
            data={statuses || []} // Ensure statuses is always an array
            columns={columns}
            onRowSelect={handleRowSelect}
            showBorder={false}
            showStriped={false}
            showHover={false}
            showPagination={true}
            pagePagination={pagination}
            setPagination={functionMap[paginationKey]}
          />
        </div>
      </Container>

      <ModalBase
        size="lg"
        centered={true}
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        title="Attention: Action Requires Confirmation"
        subTitle="Please Confirm Status Deletion"
        isSubmitDisabled={submittedDisabled}
        onCancel={() => setShowDeleteModal(false)}
        onSubmit={handleDeleteStatus}
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
      >
        <>
          <p>
            You are about to delete a selection of statuses from the system. Please be aware that this action is irreversible and only users
            with administrative privileges are authorized to perform it. Once these records are deleted, there will be no method available
            to recover them. Please confirm that you understand the implications of this action and that you wish to proceed with the
            deletion of these records.
          </p>
        </>
      </ModalBase>
    </React.Fragment>
  );
};

export default StatusManagement;
