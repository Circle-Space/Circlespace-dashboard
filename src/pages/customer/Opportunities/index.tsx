import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';

import BaseTable from '../../../components/BaseTable';
import CommandBar from '../../../components/CommandBar';
import LoadingOverlay from '../../../components/LoadingOverlay';
import useLayout from '../../../hooks/useLayout';
import useOpportunities from '../../../hooks/useOpportunities'; // Import the hook for Opportunities
import { PaginationType } from '../../../types/apiResponse';
import { Opportunities } from '../../../types/oppurtunities/opportunitiesTypes'; // Import the Opportunities type
import { columns } from './tableColumns';

const OpportunitiesManagement = () => {
  const {
    getOpportunities,
    searchOpportunities,
    clearOpportunities,
    opportunities,
    opportunityPagination,
  } = useOpportunities(); // Use the Opportunities hook
  const { setNavbarTitle } = useLayout();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedOpportunities, setSelectedOpportunities] = useState<Opportunities[]>([]);

  // Used key and functionMap used to determine what function we use when using pagination
  const [paginationKey, setPaginationKey] = useState("Get Opportunities");
  const functionMap: {
    [key: string]: (paginationType: PaginationType) => void;
  } = {
    ["Search"]: (type: PaginationType) => searchOpportunities(type, ""),
    ["Get Opportunities"]: (type: PaginationType) => getOpportunities(type),
  };

  useEffect(() => {
    setNavbarTitle("Opportunities");
    getOpportunities("RESET");
    setPaginationKey("Get Opportunities");
    return () => {
      setNavbarTitle("");
      clearOpportunities();
    };
  }, []);

  useEffect(() => {
    if (Array.isArray(opportunities) && opportunities.length >= 0) {
      setLoading(false);
    }
  }, [opportunities]);

  const handleRowSelect = useCallback((selectedRows: Opportunities[]) => {
    console.log("Selected Rows:", selectedRows);
    setSelectedOpportunities(selectedRows);
  }, []);

  const handleAddOpportunity = (opportunity: Opportunities) => {
    console.log("Adding opportunity:", opportunity);
    // Implement add logic
  };

  const handleUpdateOpportunity = (opportunity: Opportunities) => {
    console.log("Updating opportunity:", opportunity);
    // Implement update logic
  };

  const handleDeleteOpportunity = (opportunity: Opportunities) => {
    console.log("Deleting opportunity:", opportunity);
    // Implement delete logic
  };

  const handleSearch = (query: string) => {
    console.log("query " + query);
    if (typeof query === "string" && query.trim().length > 0) {
      searchOpportunities("RESET", query);
    }
  };

  const handleBatchDelete = () => {
    console.log("Batch Deleting opportunities:", selectedOpportunities);
    // Implement batch delete logic
  };

  return (
    <React.Fragment>
      <Helmet title="Opportunities Management" />
      <CommandBar
        handleNew={() => {
          navigate("AddOpportunity");
        }}
        buttons={[]}
        handleBack={() => { }}
        handleDelete={() => { }}
        searchOptions={{
          handleSearch: (searchVal: string) => {
            handleSearch(searchVal);
            setPaginationKey("Search");
          },
          handleClearSearch: () => {
            getOpportunities("RESET");
            setPaginationKey("Get Opportunities");
          },
          searchPlaceholder: "Search Opportunity...",
        }}
      />

      <Container fluid className="p-0">
        <div className="current-loading-wrapper">
          <LoadingOverlay loading={loading} />
          <div style={{ marginTop: -4 }} className="analytics-command-bar p-2">
            <BaseTable
              data={opportunities}
              columns={columns} // Use the columns specific to Opportunities
              onRowSelect={handleRowSelect}
              showBorder={false}
              showStriped={false}
              showHover={false}
              showPagination={true}
              pagePagination={opportunityPagination}
              setPagination={functionMap[paginationKey]}
            />
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default OpportunitiesManagement;
