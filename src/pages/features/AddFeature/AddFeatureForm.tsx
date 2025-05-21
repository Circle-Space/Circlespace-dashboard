import React, { useState } from "react";

import {
    Form,
    Formik,
    FormikProps,
} from "formik";
import { useNavigate } from "react-router-dom";

import CommandBar from "../../../components/CommandBar";
import TabCommandBar from "../../../components/TabCommandBar";
import useFeatures from "../../../hooks/useFeatures";
import {
    initialFeatureFormValues,
    validationFeatureSchema,
} from "../components/FormikConfig";
import GeneralFeatureForm from "../components/GeneralFeatureForm";
import { Feature } from "../types/featuresTypes";

interface Props { }

const AddFeatureForm: React.FC<Props> = () => {
    const navigate = useNavigate();
    const [tab, setTab] = useState("General");
    const { addFeature } = useFeatures();

    const handleSubmit = (formData: Feature) => {
        addFeature(formData, () => {
            navigate("/administration/features")
        });
    };

    const getTabContent = (currentTab: string, formikProps: FormikProps<Feature>): JSX.Element => {
        switch (currentTab) {
            case "General":
                return <GeneralFeatureForm formik={formikProps} />;
            default:
                return <div>Tab content not found</div>;
        }
    };

    return (
        <Formik
            initialValues={initialFeatureFormValues}
            validationSchema={validationFeatureSchema}
            onSubmit={() => { }}
        >
            {(formikProps) => (
                <Form>
                    <CommandBar
                        handleSaveAndClose={() => handleSubmit(formikProps.values)}
                        handleClear={() => { formikProps.resetForm() }}
                        handleBack={() => {
                            navigate(-1);
                        }}
                    />
                    <TabCommandBar
                        header="Add New Feature"
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

export default AddFeatureForm;
