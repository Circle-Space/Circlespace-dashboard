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
import { useNavigate } from "react-router";

import DevicesIcon
    from "../../../assets/img/commandbar/devices_technology_icon.svg";
import CommandBar from "../../../components/CommandBar";
import TabCommandBar from "../../../components/TabCommandBar";
import useUsers from "../../../hooks/useUsers";
import DeviceForm from "../components/DeviceForm";
import {
    initialUserForm,
    validationUserSchema,
} from "../components/FormikConfig";
import GeneralUserForm from "../components/GeneralUserForm";
import { User } from "../types/userTypes";

interface Props { }

const AddUserForm = ({ }: Props) => {
    const navigate = useNavigate();
    const [tab, setTab] = useState("General")
    const { addUser, error } = useUsers();
    const [showDeviceModal, setShowDeviceModal] = useState(false);

    const toggleDeviceModal = () => setShowDeviceModal(!showDeviceModal);


    const handleSubmit = async (formData: User) => {
        await addUser(formData, () => { navigate("/administration/users") })
    };





    const getTabContent = (currentTab: string, formikProps: FormikProps<User>): JSX.Element => {
        switch (currentTab) {
            case "General":
                return <GeneralUserForm formik={formikProps} />;
            case "Devices":
                return <DeviceForm
                    values={formikProps.values.Devices || []}
                    showModal={showDeviceModal}
                    setShowModal={setShowDeviceModal}
                    formik={formikProps}
                />;
            default:
                return <div>Tab content not found</div>;
        }
    };


    return (
        <Formik
            initialValues={initialUserForm}
            validationSchema={validationUserSchema}
            onSubmit={() => { }}
        >
            {(formikProps) => (
                <Form>
                    <CommandBar
                        handleSaveAndClose={() => handleSubmit(formikProps.values)}
                        handleClear={() => { formikProps.resetForm() }}
                        handleBack={() => { navigate(-1) }}
                        buttons={[
                            ...(
                                //only show buttons for when user is in devices
                                tab === "Devices" ? [{
                                    name: "+ Device",
                                    handleClick: toggleDeviceModal,
                                    iconSvgSrc: DevicesIcon,
                                    iconSvgStyle: { width: "22px", height: "22px" },
                                }] : []
                            ),
                        ]}
                    />

                    <TabCommandBar
                        header="Add New User"
                        tabs={["General", "Devices"]}
                        activeTab={tab}
                        onChange={setTab}
                    />

                    <div style={{ marginTop: -2 }} className="analytics-command-bar">
                        <Card.Body>
                            {error && (
                                <Alert variant="danger" className="mb-3">
                                    {error}
                                </Alert>
                            )}
                        </Card.Body>

                        {getTabContent(tab, formikProps)}


                    </div>



                </Form>
            )}
        </Formik>
    );
};

export default AddUserForm;
