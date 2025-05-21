import "react-datepicker/dist/react-datepicker.css";

import React, {
    useEffect,
    useState,
} from "react";

import { FormikProps } from "formik";
import {
    Col,
    Form,
    Row,
} from "react-bootstrap";
import Select from "react-select";

import Section from "../../../components/Section";
import useFeaturesManagement from "../../../hooks/useFeatures";
import { Role } from "../types/rolesTypes";
import { SelectOption } from "../../../types/SelectOption";
import { mapFeaturesToOptions } from "../../../utils/selectOptionUtils";
import useStaticValue from "../../../hooks/useStaticValue";

interface GeneralRoleProps {
    formik: FormikProps<Role>;
}

const GeneralRoleForm: React.FC<GeneralRoleProps> = ({ formik }) => {
    const [featuresOptions, setfeaturesOptions] = useState<SelectOption[]>([])
    const { staticValues } = useStaticValue();

    useEffect(() => {
        setfeaturesOptions(mapFeaturesToOptions(staticValues.Features))
    }, [])

    return (
        <>
            <Section
                title="Role Information"
                subTitle="Please enter the Role information."
            >
                <Row>
                    <Form.Group as={Col} md={6}>
                        <Form.Label>Name </Form.Label>
                        <Form.Control
                            type="text"
                            isInvalid={Boolean(formik.touched.Name && formik.errors.Name)}
                            {...formik.getFieldProps("Name")}
                        />

                        {formik.touched.Name && formik.errors.Name && (
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.Name}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <Form.Group as={Col} md={6}>
                        <Form.Label>Features</Form.Label>
                        <Select
                            className="react-select-container"
                            options={featuresOptions}
                            value={formik.values.Features}
                            name="Features"
                            id="Features"
                            onChange={(option) => {
                                formik.setFieldValue("Features", option);
                            }}
                            isMulti
                            styles={{
                                control: (provided, state) => ({
                                    ...provided,
                                    borderColor: formik.touched.Features && formik.errors.Features ? "red" : provided.borderColor,
                                }),
                            }}
                        />
                        {formik.touched.Features && formik.errors.Features && (
                            <div style={{ color: 'red', marginTop: "0.25rem", fontSize: "80%" }}>
                                {formik.errors.Features}
                            </div>
                        )}
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} md={12} >
                        <Form.Label className="mb-1">Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            isInvalid={Boolean(formik.touched.Description && formik.errors.Description)}
                            {...formik.getFieldProps("Description")}
                        />
                        {formik.touched.Description && formik.errors.Description && (
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.Description}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                </Row>

                <Form.Group as={Col} md={3} sm={3}>
                    <div>
                        <Form.Check
                            type="checkbox"
                            label="Active"
                            {...formik.getFieldProps('IsActive')}
                            checked={formik.values.IsActive}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.touched.IsActive && formik.errors.IsActive}
                        </Form.Control.Feedback>
                    </div>
                </Form.Group>
            </Section>
        </>
    );
};

export default GeneralRoleForm;
