import React, { useEffect, useState } from "react";
import { Form, Formik, FormikProps } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import CommandBar from "../../../components/CommandBar";
import TabCommandBar from "../../../components/TabCommandBar";
import useContact from "../../../hooks/useContact";
import { Contact } from "../../../types/contacts/contactsTypes";
import AccountForm from "../components/AccountForm";
import AddressForm from "../components/AddressesForm";
import { contactValidationSchema } from "../components/FormikConfig";
import GeneralInformationForm from "../components/GeneralInformationForm";
import PhoneNumberForm from "../components/PhoneNumberForm";
import LoadingOverlay from "../../../components/LoadingOverlay";
import useLayout from "../../../hooks/useLayout";
import AddPhoneIcon from "../../../assets/img/commandbar/phone_plus_action_call_icon.svg";
import AddAddressIcon from "../../../assets/img/commandbar/add_address_book_icon.svg";
import CompanyTreeIcon from "../../../assets/img/commandbar/company_tree_workplace_office_icon.svg";
import useAuth from "../../../hooks/useAuth";


interface Props { }

const UpdateContact = ({ }: Props) => {
    const { userId } = useParams();
    const { user } = useAuth();
    const { addContact } = useContact();
    const { getContact, contact, clearContacts } = useContact();
    const [tab, setTab] = useState("General")
    const [loading, setLoading] = useState<boolean>(true);
    const { setNavbarTitle } = useLayout();
    const navigate = useNavigate();

    useEffect(() => {
        setNavbarTitle("Edit Contact");
        if (userId) {
            getContact(userId)
        }

        return () => {
            setNavbarTitle("");
            clearContacts();
        };
    }, []);

    useEffect(() => {
        if (contact && Object.keys(contact).length > 0) {
            setLoading(false);
        }

    }, [contact])


    const handleSubmit = (formData: Contact) => {
        formData.CreatedBy = user?.Username;
        addContact(formData, () => {
            navigate(-1)
        })
    };

    const getTabContent = (currentTab: string, formikProps: FormikProps<Contact>): JSX.Element => {
        switch (currentTab) {
            case "General":
                return <GeneralInformationForm formik={formikProps} />;
            case "Phone Numbers":
                return <PhoneNumberForm values={formikProps.values.PhoneDirectories} setFieldValue={formikProps.setFieldValue} />
            case "Addresses":
                return <AddressForm values={formikProps.values.AddressList} setFieldValue={formikProps.setFieldValue} />
            case "Accounts":
                return <AccountForm values={formikProps.values.AccountList} setFieldValue={formikProps.setFieldValue} />
            default:
                return <div>Tab content not found</div>;
        }
    };

    return (
        <Formik
            initialValues={contact || {}}
            validationSchema={contactValidationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            {(formikProps) => (
                <Form>
                    <CommandBar
                        handleSaveAndClose={() => handleSubmit(formikProps.values)}
                        handleClear={() => { formikProps.resetForm()}}
                        handleBack={() => { navigate(-1) }}
                        buttons={[
                            {
                                name: "+ Phone",
                                handleClick: () => { },
                                iconSvgSrc: AddPhoneIcon,
                                iconSvgStyle: { width: "22px", height: "22px" },
                            },
                            {
                                name: "+ Address",
                                handleClick: () => { },
                                iconSvgSrc: AddAddressIcon,
                                iconSvgStyle: { width: "22px", height: "22px" },
                            },
                            {
                                name: "+ Account",
                                handleClick: () => { },
                                iconSvgSrc: CompanyTreeIcon,
                                iconSvgStyle: { width: "22px", height: "22px" },
                            },
                        ]}

                    />
                    <TabCommandBar
                        header="New Contact"
                        tabs={["General", "Phone Numbers", "Addresses", "Accounts", "Files"]}
                        activeTab={tab}
                        onChange={setTab}
                    />
                    <div className="current-loading-wrapper">
                        <LoadingOverlay loading={loading} />
                    <div style={{ marginTop: -2 }} className="analytics-command-bar">
                        {getTabContent(tab, formikProps)}
                        </div>
                    </div>

                </Form>
            )}
        </Formik>
    );
};

export default UpdateContact;
