import React, {
    useEffect,
    useState,
} from 'react';

import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';

import BaseTable from '../../components/BaseTable';
import CommandBar from '../../components/CommandBar';
import LoadingOverlay from '../../components/LoadingOverlay';
import useLayout from '../../hooks/useLayout';
import useLogsManagement from '../../hooks/useLogs';
import { PaginationType } from '../../types/apiResponse';
import { columns } from './components/tableColumns';

const LogsPage = () => {

    const {
        logs,
        getLogs,
        logsPagination,
        searchLogs,
        clearLogs
    } = useLogsManagement();

    const { setNavbarTitle } = useLayout();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);

    const [paginationKey, setPaginationKey] = useState("Get Logs");
    const functionMap: {
        [key: string]: (paginationType: PaginationType) => void;
    } = {
        ["Search"]: (type: PaginationType) => searchLogs(type, ""),
        ["Get Logs"]: (type: PaginationType) => getLogs(type),
    };

    useEffect(() => {
        setNavbarTitle("Logs");
        getLogs("RESET");
        setPaginationKey("Get Logs");
        return () => {
            setNavbarTitle("");
            clearLogs();
        };
    }, []);

    useEffect(() => {
        if (Array.isArray(logs) && logs.length >= 0) {
            setLoading(false);
        }
    }, [logs]);




    const handleSearch = (query: string) => {
        console.log("query " + query);
        if (typeof query === "string" && query.trim().length > 0) {
            searchLogs("RESET", query);
        }
    };



    return (
        <React.Fragment>
            <Helmet title="User Management" />
            <CommandBar

                buttons={[]}
                handleBack={() => { navigate(-1) }}
                searchOptions={{
                    handleSearch: (searchVal: string) => {
                        handleSearch(searchVal);
                        setPaginationKey("Search");
                    },
                    handleClearSearch: () => {
                        getLogs("RESET");
                        setPaginationKey("Get Logs");
                    },
                    searchPlaceholder: "Search Logs...",
                }}
            />

            <Container fluid className="p-0">
                <div className="current-loading-wrapper">
                    <LoadingOverlay loading={loading} />
                    <div style={{ marginTop: -4 }} className="analytics-command-bar p-2">
                        <BaseTable
                            data={logs}
                            columns={columns}
                            showBorder={false}
                            showStriped={false}
                            showHover={false}
                            showPagination={true}
                            pagePagination={logsPagination}
                            setPagination={functionMap[paginationKey]}
                        />
                    </div>
                </div>
            </Container>
        </React.Fragment>

    );
};

export default LogsPage;
