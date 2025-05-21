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
import { Priority } from './types/priorityTypes';
import { columns } from './components/tableColumns';
import usePriority from './hooks/usePriority';

const PriorityManagement: React.FC = () => {
  const { getPriorities, priorities, pagination, deletePriority, searchPriorities, clearPriorities } = usePriority();
  const { setNavbarTitle } = useLayout();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [submittedDisabled, setSubmittedDisabled] = useState(false);
  const [selectedPriorities, setSelectedPriorities] = useState<Priority[]>([]);

  const [paginationKey, setPaginationKey] = useState<string>('Get Priorities');
  const functionMap: {
    [key: string]: (paginationType: PaginationType) => void;
  } = {
    ['Search']: (type: PaginationType) => searchPriorities(type, ''),
    ['Get Priorities']: (type: PaginationType) => getPriorities(type),
  };

  useEffect(() => {
    setNavbarTitle('Priority');
    getPriorities('RESET');
    setPaginationKey('Get Priorities');
    return () => {
      setNavbarTitle('');
      clearPriorities();
    };
  }, []);

  useEffect(() => {
    if (Array.isArray(priorities) && priorities.length >= 0) {
      setLoading(false);
    }
  }, [priorities]);

  const handleRowSelect = useCallback((selectedRows: Priority[]) => {
    setSelectedPriorities(selectedRows);
  }, []);

  const handleDeletePriority = async () => {
    if (Array.isArray(selectedPriorities) && selectedPriorities.length > 0) {
      const selectedPriorityIds = selectedPriorities.map(p => p.Id);
      await deletePriority(selectedPriorityIds);
    }
    setSubmittedDisabled(false);
    setShowDeleteModal(false);
  };

  const handleSearch = (query: string) => {
    if (typeof query === 'string' && query.trim().length > 0) {
      searchPriorities('RESET', query);
    }
  };

  return (
    <React.Fragment>
      <LoadingOverlay loading={isLoading} />
      <Helmet title="Priority Management" />
      <CommandBar
        handleNew={() => {
          navigate('AddPriority');
        }}
        handleBack={() => { }}
        handleDelete={
          selectedPriorities.length === 1
            ? () => {
              setShowDeleteModal(true);
            }
            : undefined
        }
        handleEdit={
          selectedPriorities.length === 1
            ? () => {
              navigate(`UpdatePriority/${selectedPriorities[0].Id}`);
            }
            : undefined
        }
        searchOptions={{
          handleSearch: (searchVal: string) => {
            handleSearch(searchVal);
            setPaginationKey('Search');
          },
          handleClearSearch: () => {
            getPriorities('RESET');
            setPaginationKey('Get Priorities');
          },
          searchPlaceholder: 'Search Priority...',
        }}
      />

      <Container className="p-3">
        <h1 className="dashboard-header-text mb-2">Manage Priority</h1>
        <p className="sub-header">
          The "Priority" section is dedicated to managing and organizing priorities. Here, users can import, view, and oversee priority details,
          facilitating effective priority management and updates. This area provides comprehensive support for tracking priority changes,
          communications, and actions, supporting efficient workflow and task management.
        </p>

        <div style={{ marginTop: -4 }} className="analytics-command-bar p-2">
          <BaseTable
            data={priorities || []}
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
        subTitle="Please Confirm Priority Deletion"
        isSubmitDisabled={submittedDisabled}
        onCancel={() => setShowDeleteModal(false)}
        onSubmit={handleDeletePriority}
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
      >
        <>
          <p>
            You are about to delete a selection of priorities from the system. Please be aware that this action is irreversible and only users
            with administrative privileges are authorized to perform it. Once these records are deleted, there will be no method available
            to recover them. Please confirm that you understand the implications of this action and that you wish to proceed with the
            deletion of these records.
          </p>
        </>
      </ModalBase>
    </React.Fragment>
  );
};

export default PriorityManagement;
