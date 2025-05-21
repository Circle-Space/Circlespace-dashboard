import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import BaseTable from '../../../components/BaseTable';
import CommandBar from '../../../components/CommandBar';
import LoadingOverlay from '../../../components/LoadingOverlay';
import ModalBase from '../../../components/ModalBase';
import useLayout from '../../../hooks/useLayout';
import { PaginationType } from '../../../types/apiResponse';
import { ActivityType } from './types/ActivityTypes';
import { columns } from './components/tableColumns';
import useActivityType from './hooks/useActivityType';

const ActivityTypeManagement: React.FC = () => {
  const { getActivityTypes, activityTypes, pagination, deleteActivityType, searchActivityTypes, clearActivityTypes } = useActivityType(); // Adjust hook and method names
  const { setNavbarTitle } = useLayout();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [submittedDisabled, setSubmittedDisabled] = useState(false);
  const [selectedActivityTypes, setSelectedActivityTypes] = useState<ActivityType[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);

  const [paginationKey, setPaginationKey] = useState<string>('Get Activity Types');
  const functionMap: {
    [key: string]: (paginationType: PaginationType) => void;
  } = {
    ['Search']: (type: PaginationType) => searchActivityTypes(type, ''),
    ['Get Activity Types']: (type: PaginationType) => getActivityTypes(type),
  };

  useEffect(() => {
    setNavbarTitle('Activity Types');
    getActivityTypes('RESET');
    setPaginationKey('Get Activity Types');
    return () => {
      setNavbarTitle('');
      clearActivityTypes();
    };
  }, []);

  useEffect(() => {
    if (Array.isArray(activityTypes) && activityTypes.length >= 0) {
      setLoading(false);
    }
  }, [activityTypes]);

  const handleRowSelect = useCallback((selectedRows: ActivityType[]) => {
    setSelectedActivityTypes(selectedRows);
  }, []);

  const handleDeleteActivityType = async () => {
    if (Array.isArray(selectedActivityTypes) && selectedActivityTypes.length > 0) {
      const selectedActivityTypeIds = selectedActivityTypes.map(at => at.Id);
      await deleteActivityType(selectedActivityTypeIds);
    }
    setSubmittedDisabled(false);
    setShowDeleteModal(false);
  };

  const handleSearch = (query: string) => {
    if (typeof query === 'string' && query.trim().length > 0) {
      searchActivityTypes('RESET', query);
    }
  };



  return (
    <React.Fragment>
      <LoadingOverlay loading={isLoading} />
      <Helmet title="Activity Type Management" />
      <CommandBar
        handleNew={() => {
          navigate('AddActivityType'); // Adjust route as per your application
        }}
        handleBack={() => { }}
        handleDelete={
          selectedActivityTypes.length === 1
            ? () => {
              setShowDeleteModal(true);
            }
            : undefined
        }
        handleEdit={
          selectedActivityTypes.length === 1
            ? () => {
              navigate(`UpdateActivityType/${selectedActivityTypes[0].Id}`);
            }
            : undefined
        }
        searchOptions={{
          handleSearch: (searchVal: string) => {
            handleSearch(searchVal);
            setPaginationKey('Search');
          },
          handleClearSearch: () => {
            getActivityTypes('RESET');
            setPaginationKey('Get Activity Types');
          },
          searchPlaceholder: 'Search Activity Type...', // Adjust placeholder text
        }}
      />

      <Container className="p-3">
        <h1 className="dashboard-header-text mb-2">Manage Activity Types</h1>
        <p className="sub-header">
          The "Activity Type" section is dedicated to managing and organizing activity types. Here, users can import, view, and oversee
          activity type details, facilitating effective management and resolution. This area provides comprehensive support for tracking
          activity type statuses, communications, and actions, supporting efficient handling and service.
        </p>

        <input type="file" style={{ display: 'none' }} ref={fileInput} accept=".csv" />

        <div style={{ marginTop: -4 }} className="analytics-command-bar p-2">
          <BaseTable
            data={activityTypes || []} // Ensure activityTypes is always an array
            columns={columns} // Assuming you have defined columns for activityTypes
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
        subTitle="Please Confirm Activity Type Deletion"
        isSubmitDisabled={submittedDisabled}
        onCancel={() => setShowDeleteModal(false)}
        onSubmit={handleDeleteActivityType}
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
      >
        <>
          <p>
            You are about to delete a selection of activity types from the system. Please be aware that this action is irreversible and
            only users with administrative privileges are authorized to perform it. Once these records are deleted, there will be no method
            available to recover them. Please confirm that you understand the implications of this action and that you wish to proceed
            with the deletion of these records.
          </p>
        </>
      </ModalBase>
    </React.Fragment>
  );
};

export default ActivityTypeManagement;
