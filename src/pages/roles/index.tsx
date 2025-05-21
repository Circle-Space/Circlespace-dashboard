import React, {
    useCallback,
    useEffect,
    useState,
} from 'react';

import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';

import BaseTable from '../../components/BaseTable';
import CommandBar from '../../components/CommandBar';
import LoadingOverlay from '../../components/LoadingOverlay';
import ModalBase from '../../components/ModalBase';
import useFeatures from '../../hooks/useFeatures';
import useLayout from '../../hooks/useLayout';
import useRoles from '../../hooks/useRoles';
import useStaticValue from '../../hooks/useStaticValue';
import { PaginationType } from '../../types/apiResponse';
import { columns } from './components/tableColumns';
import { Role } from './types/rolesTypes';

const RolesPage = () => {
    const {
        getRoles,
        searchRoles,
        clearRoles,
        roles,
        rolePagination,
        deleteRole
    } = useRoles();
    const navigate = useNavigate();
    const { setNavbarTitle } = useLayout();
    const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [paginationKey, setPaginationKey] = useState("Get Roles");

    const functionMap: {
        [key: string]: (paginationType: PaginationType) => void;
    } = {
        ["Search"]: (type: PaginationType) => searchRoles(type, ""),
        ["Get Roles"]: (type: PaginationType) => getRoles(type),
    };

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setNavbarTitle("Role Management");
        getRoles("RESET");
        setPaginationKey("Get Roles");
        return () => {
            setNavbarTitle("");
            clearRoles();
        };
    }, []);

    useEffect(() => {
        if (Array.isArray(roles) && roles.length >= 0) {
            setLoading(false);
        }
    }, [roles]);

    const handleDeleteRole = async () => {
        await deleteRole(selectedRoles[0])
        setShowDeleteModal(false);
        getRoles("RESET")
    };

    const handleSearch = (query: string) => {
        console.log("query " + query);
        if (typeof query === "string" && query.trim().length > 0) {
            searchRoles("RESET", query);
        }
    };


    const handleRowSelect = useCallback((selectedRows: Role[]) => {
        console.log("Selected Rows:", selectedRows);
        setSelectedRoles(selectedRows);
    }, []);


    return (
        <React.Fragment>
            <Helmet title="User Management" />
            <CommandBar
                handleNew={() => {
                    navigate("add");
                }}
                buttons={[]}
                handleBack={() => { }}
                handleDelete={selectedRoles.length === 1 ? () => {
                    setShowDeleteModal(true)
                } : undefined}
                handleEdit={
                    selectedRoles.length === 1
                        ? () => {
                            navigate(`${selectedRoles[0].Id}`)
                        }
                        : undefined
                }
                searchOptions={{
                    handleSearch: (searchVal: string) => {
                        handleSearch(searchVal);
                        setPaginationKey("Search");
                    },
                    handleClearSearch: () => {
                        getRoles("RESET");
                        setPaginationKey("Get Roles");
                    },
                    searchPlaceholder: "Search Role...",
                }}
            />

            <Container fluid className="p-0">
                <div className="current-loading-wrapper">
                    <LoadingOverlay loading={loading} />
                    <div style={{ marginTop: -4 }} className="analytics-command-bar p-2">
                        <BaseTable
                            data={roles}
                            columns={columns}
                            onRowSelect={handleRowSelect}
                            showBorder={false}
                            showStriped={false}
                            showHover={false}
                            showPagination={true}
                            pagePagination={rolePagination}
                            setPagination={functionMap[paginationKey]}
                        />
                    </div>
                </div>
            </Container>
            <ModalBase
                size="sm"
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                title="Delete Roles"
                onCancel={() => setShowDeleteModal(false)}
                onSubmit={handleDeleteRole}
                primaryButtonText="Delete"
                secondaryButtonText="cancel"
            >
                <p>Are you sure you want to delete the selected Roles?</p>
            </ModalBase>
        </React.Fragment>

    );
};

export default RolesPage;
