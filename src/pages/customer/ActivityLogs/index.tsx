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
import useActivityLog from '../../../hooks/useActivitylogs';
import useLayout from '../../../hooks/useLayout';
import { ActivityLog } from '../../../types/activityLogs/activityLogsTypes';  // Make sure you import the correct type
import { PaginationType } from '../../../types/apiResponse';
import { columns } from './tableColumns';  // Make sure you import the correct columns

const ActivityLogManagement = () => {
  const {
    getActivityLogs,
    searchActivityLogs,
    clearActivityLogs,
    activityLogs,
    activityLogPagination,
  } = useActivityLog();
  const { setNavbarTitle } = useLayout();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedActivityLogs, setSelectedActivityLogs] = useState<ActivityLog[]>([]);

  // Used key and functionMap used to determine what function we use when using pagination
  const [paginationKey, setPaginationKey] = useState("Get ActivityLogs");
  const functionMap: {
    [key: string]: (paginationType: PaginationType) => void;
  } = {
    ["Search"]: (type: PaginationType) => searchActivityLogs(type, ""),
    ["Get ActivityLogs"]: (type: PaginationType) => getActivityLogs(type),
  };

  useEffect(() => {
    setNavbarTitle("ActivityLogs");
    getActivityLogs("RESET");
    setPaginationKey("Get ActivityLogs");
    return () => {
      setNavbarTitle("");
      clearActivityLogs();
    };
  }, []);

  useEffect(() => {
    if (Array.isArray(activityLogs) && activityLogs.length >= 0) {
      setLoading(false);
    }
  }, [activityLogs]);

  const handleRowSelect = useCallback((selectedRows: ActivityLog[]) => {
    console.log("Selected Rows:", selectedRows);
    setSelectedActivityLogs(selectedRows);
  }, []);

  const handleAddActivityLog = (activityLog: ActivityLog) => {
    console.log("Adding activity log:", activityLog);
    // Implement add logic
  };

  const handleUpdateActivityLog = (activityLog: ActivityLog) => {
    console.log("Updating activity log:", activityLog);
    // Implement update logic
  };

  const handleDeleteActivityLog = (activityLog: ActivityLog) => {
    console.log("Deleting activity log:", activityLog);
    // Implement delete logic
  };

  const handleSearch = (query: string) => {
    console.log("query " + query);
    if (typeof query === "string" && query.trim().length > 0) {
      searchActivityLogs("RESET", query);
    }
  };

  const handleBatchDelete = () => {
    console.log("Batch Deleting activity logs:", selectedActivityLogs);
    // Implement batch delete logic
  };

  return (
    <React.Fragment>
      <Helmet title="ActivityLog Management" />
      <CommandBar
        handleNew={() => {
          // Adjust the route as needed
          navigate("AddActivityLog");
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
            getActivityLogs("RESET");
            setPaginationKey("Get ActivityLogs");
          },
          searchPlaceholder: "Search ActivityLog...",
        }}
      />

      <Container fluid className="p-0">
        <div className="current-loading-wrapper">
          <LoadingOverlay loading={loading} />
          <div style={{ marginTop: -4 }} className="analytics-command-bar p-2">
            <BaseTable
              data={activityLogs}
              columns={columns}  // Adjust this to use the correct columns
              onRowSelect={handleRowSelect}
              showBorder={false}
              showStriped={false}
              showHover={false}
              showPagination={true}
              pagePagination={activityLogPagination}
              setPagination={functionMap[paginationKey]}
            />
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default ActivityLogManagement;
