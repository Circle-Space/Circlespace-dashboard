import React, { useCallback, useState } from "react";
import { Formik, FormikProps } from "formik";
import { Button, Form, Modal } from "react-bootstrap";
import { Edit, Trash } from "react-feather";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import BaseTable from "../../../components/BaseTable";
import Section from "../../../components/Section";
import useDeviceManagement from "../../../hooks/useDeviceMangement";
import { PaginationType } from "../../../types/apiResponse";
import { initialDevice } from "../../devices/components/FormikConfig";
import deviceColumns from "../../devices/components/tableColumns";
import { Device } from "../../devices/types/deviceTypes";
import { User } from "../types/userTypes";

interface Props {
    values: Device[];
    formik: FormikProps<User>;
    showModal: boolean;
    setShowModal: (show: boolean) => void;
}

const DeviceForm = ({ values, showModal, setShowModal, formik }: Props) => {
    const navigate = useNavigate()
    const { getDevices, searchDevices, clearDevices, devices, devicePagination } = useDeviceManagement();
    
    const [paginationKey, setPaginationKey] = useState("Get Devices");
    const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);

    const functionMap: {
        [key: string]: (paginationType: PaginationType) => void;
    } = {
        ["Search"]: (type: PaginationType) => searchDevices(type, ""),
        ["Get Devices"]: (type: PaginationType) => getDevices("RESET"),
    };

    // useEffect(() => {
    //     setSelectedDevices(values);
    // }, []); // Re-run this effect if `values` changes

    const addDevice = () => {
        formik.setFieldValue("Devices", [...values, ...selectedDevices]);
        setSelectedDevices([])
        closeModal()
    };

    const closeModal = () => {
        setSelectedDevices([])
        setShowModal(false)
    }

    const handleRowSelect = useCallback((selectedRows: Device[]) => {
        //setSelectedDevices(selectedRows);
    }, []);

    const handleEdit = (id: string) => {
        navigate(`/administration/devices/${id}`)
    }

    const handleDelete = (id: string) => {
        formik.setFieldValue("Devices", values.filter(v => v.Id.toLowerCase() !== id.toLowerCase()));
    }

    const columnsWithActionButtons = [
        ...deviceColumns,
        {
            Header: "Actions",
            Cell: ({ row }: any) => (
                <>
                    <Button
                        className="me-2"
                        size="sm"
                        onClick={() => handleEdit(row.original.Id)}
                    >
                        <Edit />
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(row.original.Id)}
                    >
                        <Trash />
                    </Button>
                </>
            ),
        },
    ]

    return (
        <>
            <BaseTable
                data={values}
                columns={columnsWithActionButtons}
                onRowSelect={handleRowSelect}
                showBorder={true}
                showStriped={true}
                showHover={true}
                showPagination={false}
                showCheckboxes={false}
                pagePagination={devicePagination}
                setPagination={functionMap[paginationKey]}
            />

            <Modal size="xl" show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Device</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={initialDevice}
                        onSubmit={addDevice}
                    >
                        {({ handleSubmit }) => (
                            <Section>
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>Device</Form.Label>
                                        <Select
                                            className="react-select-container"
                                            // Filter options to only include devices not in selectedDevices
                                            options={devices.filter(x =>
                                                !values.find(y => y.Id.toLowerCase() === x.Id.toLowerCase())
                                            )}
                                            value={selectedDevices}
                                            getOptionLabel={(device) => {
                                                const parts = [
                                                    `Type: ${device.DeviceType}`,
                                                    `Name: ${device.DeviceName}`,
                                                ];

                                                if (device.SerialNumber) {
                                                    parts.push(`Serial Number: ${device.SerialNumber}`);
                                                }

                                                if (device.DeviceType.toLowerCase().includes("phone") && device.PhoneNumber) {
                                                    parts.push(`Phone Number: ${device.PhoneNumber}`);
                                                }
                                                return parts.join(", ");
                                            }}
                                            getOptionValue={(device) => device.Id}
                                            onChange={(selectedOptions) => {
                                                const updatedDevices = [...selectedOptions];
                                                setSelectedDevices(updatedDevices);
                                            }}
                                            onBlur={() => formik.setFieldTouched("Devices", true)}
                                            isMulti={true}
                                        />
                                    </Form.Group>
                                    <Button type="submit">Save</Button>
                                </Form>
                            </Section>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default DeviceForm;
