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
import LoadingOverlay from "../../../components/LoadingOverlay";
import TabCommandBar from "../../../components/TabCommandBar";
import useFeatures from "../../../hooks/useFeatures";
import useLayout from "../../../hooks/useLayout";
import { Feature } from "../types/featuresTypes";
import { validationFeatureSchema } from "../components/FormikConfig";
import GeneralFeatureForm from "../components/GeneralFeatureForm";

interface Props { }

const UpdateFeature = ({ }: Props) => {
    const navigate = useNavigate();
    const { featureId } = useParams();
    const { getFeaturesbyId, updateFeature, clearFeatures, feature } = useFeatures();
    const [tab, setTab] = useState("General");
    const [loading, setLoading] = useState<boolean>(true);
    const { setNavbarTitle } = useLayout();

    useEffect(() => {
        setNavbarTitle("Edit Feature");
        if (featureId) {
            getFeaturesbyId(featureId);
        }

        return () => {
            setNavbarTitle("");
            clearFeatures();
        };
    }, []);


    useEffect(() => {
        if (feature && Object.keys(feature).length > 0) {
            setLoading(false);
        }
    }, [feature]);

    const handleSubmit = async (formData: Feature) => {

        await updateFeature(formData, () => {
            navigate("/administration/features");
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
            initialValues={feature || {}}
            validationSchema={validationFeatureSchema}
            onSubmit={() => { }}
            enableReinitialize
        >
            {(formikProps) => (
                <Form>
                    <CommandBar
                        handleSaveAndClose={() => handleSubmit(formikProps.values)}
                        handleClear={() => {
                            formikProps.setValues({
                                Id: feature.Id,
                                Name: "",
                                Description: "",
                                IsActive: false,
                            })
                        }}
                        handleBack={() => { navigate(-1); }}
                    />
                    <TabCommandBar
                        header="Edit Feature"
                        tabs={["General"]}
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

export default UpdateFeature;
