import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';

import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import BaseTable from '../../components/BaseTable';
import CommandBar from '../../components/CommandBar';
import LoadingOverlay from '../../components/LoadingOverlay';
import ModalBase from '../../components/ModalBase';
import useDeviceManagement from '../../hooks/useDeviceMangement';
import useLayout from '../../hooks/useLayout';
import useUsers from '../../hooks/useUsers';
import { PaginationType } from '../../types/apiResponse';
import { columns } from './components/tableColumns';
import { transformUsersData } from './functions/UserFunctions';
import { User } from './types/userTypes';

const UsersPage = () => {

    const { getUsers, searchUsers, clearUsers, userPagination, users, deleteUser } = useUsers();
    const { getDevices } = useDeviceManagement();
    const navigate = useNavigate();
    const { setNavbarTitle } = useLayout();
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [paginationKey, setPaginationKey] = useState("Get Users");
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [loading, setLoading] = useState<boolean>(true);

    const functionMap: {
        [key: string]: (paginationType: PaginationType) => void;
    } = {
        ["Search"]: (type: PaginationType) => searchUsers(type, ""),
        ["Get Users"]: (type: PaginationType) => getUsers(type),
    };



    useEffect(() => {
        setNavbarTitle("User Management");
        getUsers("RESET");
        getDevices("RESET");
        setPaginationKey("Get Users");
        return () => {
            setNavbarTitle("");
            clearUsers();
        };
    }, []);

    useEffect(() => {
        if (Array.isArray(users) && users.length >= 0) {
            setLoading(false);
        }
    }, [users]);

    const handleDeleteUser = async () => {
        await deleteUser(selectedUsers[0])
        setShowDeleteModal(false);
        getUsers("RESET")
    };

    const handleSearch = (query: string) => {
        console.log("query " + query);
        if (typeof query === "string" && query.trim().length > 0) {
            searchUsers("RESET", query);
        }
    };

    const handleRowSelect = useCallback((selectedRows: User[]) => {
        console.log("Selected Rows:", selectedRows);
        setSelectedUsers(selectedRows);
    }, []);


    const transformedUsers = useMemo(() => transformUsersData(users), [users]);

    return (
        <React.Fragment>
            <Helmet title="User Management" />
            <CommandBar
                handleNew={() => {
                    navigate("add");
                }}
                buttons={[]}
                handleBack={() => { }}
                handleDelete={selectedUsers.length === 1 ? () => {
                    setShowDeleteModal(true)
                } : undefined}
                handleEdit={
                    selectedUsers.length === 1
                        ? () => {
                            navigate(`${selectedUsers[0].Id}`)
                        }
                        : undefined
                }
                searchOptions={{
                    handleSearch: (searchVal: string) => {
                        handleSearch(searchVal);
                        setPaginationKey("Search");
                    },
                    handleClearSearch: () => {
                        getUsers("RESET");
                        setPaginationKey("Get Users");
                    },
                    searchPlaceholder: "Search User...",
                }}
            />

            <Container fluid className="p-0">
                <div className="current-loading-wrapper">
                    <LoadingOverlay loading={loading} />
                    <div style={{ marginTop: -4 }} className="analytics-command-bar p-2">
                        <BaseTable
                            data={transformedUsers}
                            columns={columns} // Use the columns specific to Users
                            onRowSelect={handleRowSelect}
                            showBorder={false}
                            showStriped={false}
                            showHover={false}
                            showPagination={true}
                            pagePagination={userPagination}
                            setPagination={functionMap[paginationKey]}
                        />
                    </div>
                </div>
            </Container>
            <ModalBase
                size="sm"
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                title="Delete Users"
                onCancel={() => setShowDeleteModal(false)}
                onSubmit={handleDeleteUser}
                primaryButtonText="Delete"
                secondaryButtonText="cancel"
            >
                <p>Are you sure you want to delete the selected Users?</p>
            </ModalBase>
        </React.Fragment>

    );
};

export default UsersPage;
