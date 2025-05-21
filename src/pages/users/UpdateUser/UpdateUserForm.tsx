import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Form,
    Formik,
    FormikProps,
} from "formik";
import _ from "lodash";
import { Alert } from "react-bootstrap";
import {
    useNavigate,
    useParams,
} from "react-router";

import DevicesIcon
    from "../../../assets/img/commandbar/devices_technology_icon.svg";
import CommandBar from "../../../components/CommandBar";
import LoadingOverlay from "../../../components/LoadingOverlay";
import TabCommandBar from "../../../components/TabCommandBar";
import useLayout from "../../../hooks/useLayout";
import useUsers from "../../../hooks/useUsers";
import DeviceForm from "../components/DeviceForm";
import { validationUpdateUserSchema } from "../components/FormikConfig";
import GeneralUserForm from "../components/GeneralUserForm";
import {
    generateHeaderSections,
    transformUserData,
} from "../functions/UserFunctions";
import { User } from "../types/userTypes";

interface Props { }

const UpdateUserForm = ({ }: Props) => {
    const { userId } = useParams()
    const navigate = useNavigate();
    const [tab, setTab] = useState("General")
    const [loading, setLoading] = useState<boolean>(true);
    const { clearUsers, getUserById, updateUser, user, error } = useUsers();
    const { setNavbarTitle } = useLayout();
    const [showDeviceModal, setShowDeviceModal] = useState(false);

    useEffect(() => {
        setNavbarTitle("Edit User");
        if (userId) {
            getUserById(userId)
        }

        return () => {
            setNavbarTitle("");
            clearUsers();
        };
    }, []);

    useEffect(() => {
        if (user && Object.keys(user).length > 0) {
            setLoading(false);
        }

    }, [user])

    // Method to toggle the device modal
    const toggleDeviceModal = () => setShowDeviceModal(!showDeviceModal);

    const handleSubmit = (formData: User) => {
        updateUser(formData, () => {
            navigate("/administration/users")
        });

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

    const transformedUser = useMemo(() => transformUserData(user), [user.Id]);
    const headerSections = useMemo(() => generateHeaderSections(transformedUser), [user.Id])

    return (
        <Formik
            initialValues={user || {}}
            validationSchema={validationUpdateUserSchema}
            onSubmit={() => { }}
            enableReinitialize
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
                        header={`${transformedUser.FirstName} ${transformedUser.LastName}`}
                        tabs={["General", "Devices"]}
                        activeTab={tab}
                        onChange={setTab}
                        sections={headerSections}
                    />
                    <div className="current-loading-wrapper">
                        <LoadingOverlay loading={loading} />

                        <div style={{ marginTop: -2 }} className="analytics-command-bar">
                            {error && (
                                <Alert variant="danger" className="mb-3">
                                    {error}
                                </Alert>
                            )}

                            {getTabContent(tab, formikProps)}
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default UpdateUserForm;
