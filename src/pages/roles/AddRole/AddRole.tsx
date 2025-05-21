import React, { useState } from "react";

import {
    Form,
    Formik,
    FormikProps,
} from "formik";
import { useNavigate } from "react-router";

import CommandBar from "../../../components/CommandBar";
import TabCommandBar from "../../../components/TabCommandBar";
import useRoles from "../../../hooks/useRoles";
import { Role } from "../types/rolesTypes";
import {
    initialRoleFormValues,
    validationRoleSchema,
} from "../components/FormikConfig";
import GeneralRoleForm from "../components/GeneralRoleForm";

;

interface Props { }

const AddRole = ({ }: Props) => {
    const navigate = useNavigate();
    const [tab, setTab] = useState("General")
    const { addRole } = useRoles();

    const handleSubmit = (formData: Role) => {
        const { Features, ...rest } = formData
        const featureValues = Features.map((option) => option.value);
        const reqData = {
            ...rest,
            Features: featureValues,
        }

        addRole(reqData, () => {
            navigate("/administration/roles")
        });

    };




    const getTabContent = (currentTab: string, formikProps: FormikProps<Role>): JSX.Element => {
        switch (currentTab) {
            case "General":
                return <GeneralRoleForm formik={formikProps} />

            default:
                return <div>Tab content not found</div>;
        }
    };

    return (
        <Formik
            initialValues={initialRoleFormValues}
            validationSchema={validationRoleSchema}
            onSubmit={() => { }}
        >
            {(formikProps) => (
                <Form>
                    <CommandBar
                        handleSaveAndClose={() => handleSubmit(formikProps.values)}
                        handleClear={() => { formikProps.resetForm() }}
                        handleBack={() => { navigate(-1); }}
                    />
                    <TabCommandBar
                        header="Add New Role"
                        tabs={["General"]}
                        activeTab={tab}
                        onChange={setTab}
                    />

                    <div style={{ marginTop: -2 }} className="analytics-command-bar">

                        {getTabContent(tab, formikProps)}


                    </div>

                </Form>
            )}
        </Formik>
    );
};

export default AddRole;
