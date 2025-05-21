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
import { columns } from './components/tableColumns';
import useCase from './hooks/useCase';
import { Case } from './types/casesTypes';
import EditFilter from '../QuickViews/EditFilters';
import { FilterColumn } from '../../../types/editFilter';
import HelpView from '../QuickViews/HelpView';


const CaseManagement: React.FC = () => {
  const { getCases, cases, pagination, deleteCases, searchCases, clearCases } = useCase();

  const { setNavbarTitle } = useLayout();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [submittedDisabled, setSubmittedDisabled] = useState(false);
  const [selectedCases, setSelectedCases] = useState<Case[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [paginationKey, setPaginationKey] = useState<string>('Get Cases');
  const functionMap: {
    [key: string]: (paginationType: PaginationType) => void;
  } = {
    ['Search']: (type: PaginationType) => searchCases(type, ''),
    ['Get Cases']: (type: PaginationType) => getCases(type),
  };

  const filterColumns: FilterColumn[] = [
    { name: 'Name', type: 'string', conditions: ['equals', 'contains', 'starts with'] },
    { name: 'Age', type: 'number', conditions: ['equals', 'greater than', 'less than'] },
    // Add more columns as needed
  ];

  useEffect(() => {
    setNavbarTitle('Cases');
    getCases('RESET');
    setPaginationKey('Get Cases');
    return () => {
      setNavbarTitle('');
      clearCases();
    };
  }, []);

  useEffect(() => {
    if (Array.isArray(cases) && cases.length >= 0) {
      setLoading(false);
    }
  }, [cases]);

  const handleRowSelect = useCallback((selectedRows: Case[]) => {
    setSelectedCases(selectedRows);
  }, []);

  const handleDeleteCase = async () => {
    if (Array.isArray(selectedCases) && selectedCases.length > 0) {
      const selectedCaseIds = selectedCases.map(c => c.Id); // Adjust property as per your case type
      await deleteCases(selectedCaseIds);
    }
    setSubmittedDisabled(false);
    setShowDeleteModal(false);
  };

  const handleSearch = (query: string) => {
    if (typeof query === 'string' && query.trim().length > 0) {
      searchCases('RESET', query);
    }
  };

  return (
    <React.Fragment>
      <LoadingOverlay loading={isLoading} />
      <Helmet title="Case Management" />
      <CommandBar
        handleNew={() => {
          navigate('AddCase');
        }}
        handleBack={() => {}}
        handleDelete={
          selectedCases.length === 1
            ? () => {
                setShowDeleteModal(true);
              }
            : undefined
        }
        handleEdit={
          selectedCases.length === 1
            ? () => {
                navigate(`UpdateCase/${selectedCases[0].Id}`); // Adjust route and property as per your case type
              }
            : undefined
        }
        handleEntityFilter={() => setShowFilters(true)}
        handleHelp={() => setShowHelp(true)}
        searchOptions={{
          handleSearch: (searchVal: string) => {
            handleSearch(searchVal);
            setPaginationKey('Search');
          },
          handleClearSearch: () => {
            getCases('RESET');
            setPaginationKey('Get Cases');
          },
          searchPlaceholder: 'Search Case...', // Adjust placeholder text
        }}
      />

      <Container className="p-3">
        <h1 className="dashboard-header-text mb-2">Manage Cases</h1>
        <p className="sub-header">
          The "Case" section is dedicated to managing and organizing cases. Here, users can import, view, and oversee case details,
          facilitating effective case management and resolution. This area provides comprehensive support for tracking case statuses,
          communications, and actions, supporting efficient case handling and customer service.
        </p>

        <input type="file" style={{ display: 'none' }} ref={fileInput} accept=".csv" />

        <div style={{ marginTop: -4 }} className="analytics-command-bar p-2">
          <BaseTable
            data={cases || []} // Ensure cases is always an array
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
        subTitle="Please Confirm Case Deletion"
        isSubmitDisabled={submittedDisabled}
        onCancel={() => setShowDeleteModal(false)}
        onSubmit={handleDeleteCase}
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
      >
        <>
          <p>
            You are about to delete a selection of cases from the system. Please be aware that this action is irreversible and only users
            with administrative privileges are authorized to perform it. Once these records are deleted, there will be no method available
            to recover them. Please confirm that you understand the implications of this action and that you wish to proceed with the
            deletion of these records.
          </p>
        </>
      </ModalBase>
      <EditFilter
        show={showFilters}
        onClose={() => setShowFilters(false)}
        onApply={filters => {
          console.log('Applied filters:', filters);
          setShowFilters(false);
        }}
        columns={filterColumns}
      />
      <HelpView show={showHelp} onClose={() => setShowHelp(false)}></HelpView>
    </React.Fragment>
  );
};

export default CaseManagement;
