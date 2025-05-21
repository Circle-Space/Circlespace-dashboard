import React, { useState } from "react";

import {
    Form,
    Formik,
    FormikProps,
} from "formik";
import {
    Alert,
    Card,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import CommandBar from "../../../components/CommandBar";
import TabCommandBar from "../../../components/TabCommandBar";
import useDevices
    from "../../../hooks/useDeviceMangement"; // Adjust import if necessary
import {
    deviceValidationSchema,
    initialDevice,
} from "../components/FormikConfig"; // Adjust import if necessary
import GeneralDeviceForm
    from "../components/GeneralDeviceForm"; // Import the GeneralDeviceForm component
import { Device } from "../types/deviceTypes"; // Adjust import if necessary

interface Props { }

const AddDeviceForm: React.FC<Props> = () => {
    const navigate = useNavigate();
    const [tab, setTab] = useState("General");
    const { addDevice, error } = useDevices();

    const handleSubmit = async (formData: Device) => {
        await addDevice(formData, () => {
            navigate(-1);
        });
    };

    const getTabContent = (currentTab: string, formikProps: FormikProps<Device>): JSX.Element => {
        switch (currentTab) {
            case "General":
                return <GeneralDeviceForm formik={formikProps} />; // Render GeneralDeviceForm for the "General" tab
            default:
                return <div>Tab content not found</div>;
        }
    };

    return (
        <Formik
            initialValues={initialDevice}
            validationSchema={deviceValidationSchema}
            onSubmit={handleSubmit}
        >
            {(formikProps) => (
                <Form>
                    <CommandBar
                        handleSaveAndClose={() => {
                            formikProps.submitForm();
                        }}
                        handleClear={() => {
                            formikProps.resetForm();
                        }}
                        handleBack={() => {
                            navigate(-1);
                        }}
                    />

                    <TabCommandBar
                        header="Add New Device"
                        tabs={["General"]}
                        activeTab={tab}
                        onChange={setTab}
                    />

                    <div style={{ marginTop: -2 }} className="analytics-command-bar">
                        <Card.Body>
                            {error && <Alert variant="danger">{error}</Alert>}
                        </Card.Body>

                        <GeneralDeviceForm formik={formikProps} /> {/* Render GeneralDeviceForm */}
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default AddDeviceForm;
