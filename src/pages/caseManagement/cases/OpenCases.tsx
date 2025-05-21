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
import { Case } from './types/casesTypes';
import { columns } from './components/tableColumns';
import useCase from './hooks/useCase';
import { ApiFilterParameter } from '../../../types/apiFilterParameter/apiFilterParameter';
import useStaticValue from '../../../hooks/useStaticValue';

const OpenCases: React.FC = () => {
    const { getOpenCases, cases, pagination, deleteCases } = useCase();
    const { staticValues } = useStaticValue();
    const { setNavbarTitle } = useLayout();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [submittedDisabled, setSubmittedDisabled] = useState(false);
    const [selectedCases, setSelectedCases] = useState<Case[]>([]);
    const [StatusId, setStatusId] = useState("");
    const [paginationKey, setPaginationKey] = useState<string>('Get Open Cases');

    const functionMap: {
        [key: string]: (paginationType: PaginationType) => void;
    } = {
        ['Get Open Cases']: (type: PaginationType) => getOpenCases({ columnName: 'StatusId', columnCondition: 1, columnValue: StatusId || '' }, type),
    };

    const getOpenStatusId = () => {
        const openStatus = staticValues.CaseStatuses.find(status => status.label === "Open");
        if (openStatus) {
            console.log("Open status ID:", openStatus.value);
            setStatusId(openStatus.value);

            const filter: ApiFilterParameter = {
                columnName: 'StatusId',
                columnCondition: 1,
                columnValue: openStatus.value
            };
            getOpenCases(filter, "RESET");
        } else {
            console.log("Open status not found");
        }
    };

    useEffect(() => {
        setNavbarTitle('Open Cases');

        if (staticValues.CaseStatuses) {
            getOpenStatusId();
        }

        setPaginationKey('Get Open Cases');

        return () => {
            setNavbarTitle('');
        };
    }, [staticValues.CaseStatuses]);

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
            getOpenCases({ columnName: 'StatusId', columnCondition: 1, columnValue: StatusId || '' }, "RESET")
        }
        setSubmittedDisabled(false);
        setShowDeleteModal(false);
    };

    return (
        <React.Fragment>
            <LoadingOverlay loading={isLoading} />
            <Helmet title="OpenCases" />
            <CommandBar
                handleBack={() => { navigate(-1) }}
                handleNew={() => { navigate("AddCase") }}
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
                searchOptions={{
                    handleSearch: (searchVal: string) => {
                        setPaginationKey('Search');
                    },
                    handleClearSearch: () => {
                        getOpenCases({ columnName: 'StatusId', columnCondition: 1, columnValue: StatusId || '' }, "RESET");
                        setPaginationKey('Get Open Cases');
                    },
                    searchPlaceholder: 'Search Open Cases...',
                }}
            />

            <Container className="p-3">
                <h1 className="dashboard-header-text mb-2">Manage Open Cases</h1>
                <p className="sub-header">
                    The "Open Cases" section allows you to manage and organize open cases. Users can view, edit, and delete cases, facilitating effective case management and updates. This area supports tracking case details and actions, enhancing workflow efficiency.
                </p>

                <div style={{ marginTop: -4 }} className="analytics-command-bar p-2">
                    <BaseTable
                        data={cases || []}
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
                        You are about to delete a selection of open cases from the system. Please be aware that this action is irreversible and only users
                        with administrative privileges are authorized to perform it. Once these cases are deleted, there will be no method available
                        to recover them. Please confirm that you understand the implications of this action and that you wish to proceed with the
                        deletion of these cases.
                    </p>
                </>
            </ModalBase>
        </React.Fragment>
    );
};

export default OpenCases;