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
    useNavigate,
    useParams,
} from "react-router-dom";

import CommandBar from "../../../components/CommandBar";
import TabCommandBar from "../../../components/TabCommandBar";
import useFeatures from "../../../hooks/useFeatures";
import useRoles from "../../../hooks/useRoles";
import useStaticValue from "../../../hooks/useStaticValue";
import { Role } from "../types/rolesTypes";
import {
    findSelectOptionFeatureById,
    mapFeaturesToOptions,
} from "../../../utils/selectOptionUtils";
import { validationRoleSchema } from "../components/FormikConfig";
import GeneralRoleForm from "../components/GeneralRoleForm";

interface Props { }

const UpdateRole = ({ }: Props) => {
    const navigate = useNavigate();
    const { staticValues } = useStaticValue();
    const { getStaticValues } = useStaticValue()
    const { roleId } = useParams(); ``
    const [tab, setTab] = useState("General");
    const { getRolesbyId, updateRole, role } = useRoles();

    useEffect(() => {
        if (roleId) {
            getRolesbyId(roleId);
        }
    }, [roleId]);


    const handleSubmit = async (formData: Role) => {
        const { Features, ...rest } = formData
        const featureValues = Features.map((option) => option.value);
        console.log("fe", featureValues)
        const reqData = {
            ...rest,
            Features: featureValues,
        }

        await updateRole(reqData, () => {
            getStaticValues(() => {
                navigate("/administration/roles");
            });
        });
    };

    const getTabContent = (currentTab: string, formikProps: FormikProps<Role>): JSX.Element => {
        switch (currentTab) {
            case "General":
                return <GeneralRoleForm formik={formikProps} />;

            default:
                return <div>Tab content not found</div>;
        }
    };

    const initialValues: Role = {
        Name: role.records?.Name,
        Description: role.records?.Description,
        Features: findSelectOptionFeatureById(role.records?.Features || [], mapFeaturesToOptions(staticValues.Features)),
        IsActive: role.records?.IsActive || false,// Assuming IsActive is a boolean property
        Id: role.records?.Id
    };



    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationRoleSchema}
            onSubmit={() => { }}
            enableReinitialize
        >
            {(formikProps) => (
                <Form>
                    <CommandBar
                        handleSaveAndClose={() => handleSubmit(formikProps.values)}
                        handleClear={() => {
                            formikProps.setValues({
                                Id: role.records?.Id,
                                Name: "",
                                Description: "",
                                Features: [],
                                IsActive: false,
                            })
                        }}
                        handleBack={() => { navigate(-1); }}
                    />
                    <TabCommandBar
                        header="Edit Role"
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

export default UpdateRole;
