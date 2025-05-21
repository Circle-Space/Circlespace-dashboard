import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";

import BaseTable from "../../../components/BaseTable";
import LoadingOverlay from "../../../components/LoadingOverlay";
import useLayout from "../../../hooks/useLayout";
import useRoleManagement from "../../../hooks/useRoles";
import { PaginationType } from "../../../types/apiResponse";
import { Role } from "../../roles/types/rolesTypes";
import { columns } from "./tableColumns";

const RoleManagement = () => {
  const {
    getRoles,
    searchRoles,
    clearRoles,
    roles,
    rolePagination,
  } = useRoleManagement();
  const { setNavbarTitle } = useLayout();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);

  const [paginationKey, setPaginationKey] = useState("Get Roles");
  const functionMap: {
    [key: string]: (paginationType: PaginationType) => void;
  } = {
    ["Search"]: (type: PaginationType) => searchRoles(type, ""),
    ["Get Roles"]: (type: PaginationType) => getRoles(type),
  };

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
    if (Array.isArray(roles) && roles.length > 0) {
      setLoading(false);
    }
  }, [roles]);

  const handleRowSelect = useCallback((selectedRows: Role[]) => {
    console.log("Selected Rows:", selectedRows);
    setSelectedRoles(selectedRows);
  }, []);

  return (
    <React.Fragment>
      <Helmet title="Role Management" />
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
    </React.Fragment>
  );
};

export default RoleManagement;
