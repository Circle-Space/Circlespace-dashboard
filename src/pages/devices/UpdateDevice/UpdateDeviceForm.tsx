import React, {
    useEffect,
    useState,
} from "react";

import {
    Form,
    Formik,
    FormikProps,
} from "formik";
import {
    Alert,
    Card,
} from "react-bootstrap";
import {
    useNavigate,
    useParams,
} from "react-router";

import CommandBar from "../../../components/CommandBar";
import TabCommandBar from "../../../components/TabCommandBar";
import useDevices from "../../../hooks/useDeviceMangement";
import { deviceValidationSchema } from "../components/FormikConfig";
import GeneralDeviceForm from "../components/GeneralDeviceForm";
import { Device } from "../types/deviceTypes";

interface Props { }

const UpdateDeviceForm: React.FC<Props> = () => {
    const { deviceId } = useParams();
    const navigate = useNavigate();
    const [tab, setTab] = useState("General");
    const [loading, setLoading] = useState<boolean>(true);
    const { getDeviceById, updateDevice, device, error } = useDevices();

    useEffect(() => {

        if (deviceId) {
            getDeviceById(deviceId);
        }


    }, [deviceId]);

    useEffect(() => {

        if (device && Object.keys(device).length > 0) {
            setLoading(false);
        }
    }, [device]);

    const handleSubmit = (formData: Device) => {
        updateDevice(formData, () => {
            navigate(-1);
        });
    };

    const getTabContent = (currentTab: string, formikProps: FormikProps<Device>): JSX.Element => {
        switch (currentTab) {
            case "General":
                return <GeneralDeviceForm formik={formikProps} />;
            default:
                return <div>Tab content not found</div>;
        }
    };

    return (
        <Formik
            initialValues={device || {}}
            validationSchema={deviceValidationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
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

                        {getTabContent(tab, formikProps)}
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default UpdateDeviceForm;
