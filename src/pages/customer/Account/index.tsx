import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  Container,
  Row,
} from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';

import BaseTable from '../../../components/BaseTable';
import CommandBar from '../../../components/CommandBar';
import LoadingOverlay from '../../../components/LoadingOverlay';
import ModalBase from '../../../components/ModalBase';
import useAccount from '../../../hooks/useAccount';
import useLayout from '../../../hooks/useLayout';
import { Account } from '../../../types/accounts/accountTypes';
import { PaginationType } from '../../../types/apiResponse';
import DetailRow from './DetailRow';
import { columns } from './tableColumns';

const AccountManagement = () => {
  const {
    getAccounts,
    searchAccounts,
    clearAccounts,
    accounts,
    pagination,
  } = useAccount();

  const { setNavbarTitle } = useLayout();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedAccounts, setSelectedAccounts] = useState<Account[]>([]);


  const [paginationKey, setPaginationKey] = useState("Get Accounts");
  const functionMap: {
    [key: string]: (paginationType: PaginationType) => void;
  } = {
    ["Search"]: (type: PaginationType) => searchAccounts(type, ""),
    ["Get Accounts"]: (type: PaginationType) => getAccounts(type),
  };

  useEffect(() => {
    setNavbarTitle("Accounts");
    getAccounts("RESET");
    setPaginationKey("Get Accounts");
    //document.body.style.overflow = 'hidden';

    return () => {
      setNavbarTitle("");
      clearAccounts();
      //document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    if (Array.isArray(accounts) && accounts.length >= 0) {
      setLoading(false);
    }
  }, [accounts]);

  const handleRowSelect = useCallback((selectedRows: Account[]) => {
    console.log("Selected Rows:", selectedRows);
    setSelectedAccounts(selectedRows);
  }, []);

  const handleAddAccount = (account: Account) => {
    console.log("Adding account:", account);
    // Implement add logic
  };

  const handleUpdateAccount = (account: Account) => {
    console.log("Updating account:", account);
    // Implement update logic
  };

  const handleDeleteAccount = () => {
    console.log("Deleting account:");
    // Implement delete logic
  };

  const handleSearch = (query: string) => {

    if (typeof query === "string" && query.trim().length > 0) {

      searchAccounts("RESET", query);
    }
  };

  const handleBatchDelete = () => {
    console.log("Batch Deleting accounts:", selectedAccounts);
    // Implement batch delete logic
  };

  return (
    <React.Fragment>
      <LoadingOverlay loading={loading} />
      <Helmet title="Account Management" />
      <CommandBar
        handleNew={() => {
          navigate('AddAccount');
        }}
        buttons={[]}
        handleBack={() => { }}
        handleDelete={
          selectedAccounts.length > 0
            ? () => {
              setShowDeleteModal(true);
            }
            : undefined
        }
        handleEdit={
          selectedAccounts.length === 1
            ? () => {
              console.log('EDITING');
            }
            : undefined
        }
        searchOptions={{
          handleSearch: (searchVal: string) => {
            handleSearch(searchVal);
            setPaginationKey('Search');
          },
          handleClearSearch: () => {
            getAccounts('RESET');
            setPaginationKey('Get Accounts');
          },
          searchPlaceholder: 'Search Account...',
        }}
      />

      <Container className="p-3">
        <h1 className="dashboard-header-text mb-2">Manage Accounts</h1>
        <p className="sub-header">
          An "Account" represents companies or customers within SMS, serving as a central hub for managing and tracking all
          interactions and transactions associated with each business entity or individual customer. This section allows users to add,
          organize, and maintain detailed records of companies and customers, facilitating efficient relationship management and streamlined
          communication.
        </p>

        <Row className="mb-2">
          <div style={{ marginTop: -4 }} className="analytics-command-bar p-2">
            <BaseTable
              data={accounts}
              columns={columns}
              onRowSelect={handleRowSelect}
              showBorder={false}
              showStriped={false}
              showHover={false}
              showPagination={true}
              pagePagination={pagination}
              setPagination={functionMap[paginationKey]}
              renderRowDetails={account => <DetailRow account={account} />}
            />
          </div>
        </Row>
      </Container>

      <ModalBase
        size="sm"
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        title="Delete Accounts"
        onCancel={() => setShowDeleteModal(false)}
        onSubmit={handleDeleteAccount}
        primaryButtonText="Delete"
        secondaryButtonText="cancel"
      >
        <p>Are you sure you want to delete the selected accounts?</p>
      </ModalBase>
    </React.Fragment>
  );
};

export default AccountManagement; 