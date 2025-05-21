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
import useDeviceManagement from '../../hooks/useDeviceMangement';
import useLayout from '../../hooks/useLayout';
import { PaginationType } from '../../types/apiResponse';
import { deviceColumns } from './components/tableColumns';
import { Device } from './types/deviceTypes';

const DevicePage = () => {
  const { getDevices, searchDevices, clearDevices, devices, devicePagination, deleteDevice } = useDeviceManagement();
  const navigate = useNavigate();
  const { setNavbarTitle } = useLayout();
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);
  const [paginationKey, setPaginationKey] = useState("Get Devices");
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [loading, setLoading] = useState<boolean>(true);

  const functionMap: {
    [key: string]: (paginationType: PaginationType) => void;
  } = {
    ["Search"]: (type: PaginationType) => searchDevices(type, ""),
    ["Get Devices"]: (type: PaginationType) => getDevices("RESET"),
  };

  useEffect(() => {
    setNavbarTitle("Devices Management");
    getDevices("RESET");
    setPaginationKey("Get Devices");
    return () => {
      setNavbarTitle("");
      clearDevices();
    };
  }, []);

  useEffect(() => {
    if (Array.isArray(devices) && devices.length >= 0) {
      setLoading(false);
    }
  }, [devices]);


  const handleAddDevice = (device: Device) => {
    console.log("Adding device:", device);
    // Implement add logic
  };

  const handleUpdateDevice = (device: Device) => {
    console.log("Updating device:", device);
    // Implement update logic
  };

  const handleDeleteDevice = async () => {
    await deleteDevice(selectedDevices[0])
    setShowDeleteModal(false);
    getDevices("RESET")
  };

  const handleSearch = (query: string) => {
    console.log("query " + query);
    if (typeof query === "string" && query.trim().length > 0) {
      searchDevices("RESET", query);
    }
  };

  const handleBatchDelete = () => {
    console.log("Batch Deleting devices:", selectedDevices);
    // Implement batch delete logic
  };

  const handleRowSelect = useCallback((selectedRows: Device[]) => {
    console.log("Selected Rows:", selectedRows);
    setSelectedDevices(selectedRows);
  }, []);


  return (
    <React.Fragment>
      <Helmet title="Device Management" />
      <CommandBar
        handleNew={() => {
          navigate("add");
        }}
        handleBack={() => { }}
        handleEdit={
          selectedDevices.length === 1
            ? () => {
              navigate(`${selectedDevices[0].Id}`)
            }
            : undefined
        }
        handleDelete={selectedDevices.length === 1 ? () => {
          setShowDeleteModal(true)
        } : undefined}
        searchOptions={{
          handleSearch: (searchVal: string) => {
            handleSearch(searchVal);
            setPaginationKey("Search");
          },
          handleClearSearch: () => {
            getDevices("RESET");
            setPaginationKey("Get Devices");
          },
          searchPlaceholder: "Search Device...",
        }}
      />

      <Container fluid className="p-0">
        <div className="current-loading-wrapper">
          <LoadingOverlay loading={loading} />
          <div style={{ marginTop: -4 }} className="analytics-command-bar p-2">
            <BaseTable
              data={devices}
              columns={deviceColumns}
              onRowSelect={handleRowSelect}
              showBorder={false}
              showStriped={false}
              showHover={false}
              showPagination={true}
              pagePagination={devicePagination}
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
        onSubmit={handleDeleteDevice}
        primaryButtonText="Delete"
        secondaryButtonText="cancel"
      >
        <p>Are you sure you want to delete the selected Device?</p>
      </ModalBase>
    </React.Fragment>
  );
};

export default DevicePage;
