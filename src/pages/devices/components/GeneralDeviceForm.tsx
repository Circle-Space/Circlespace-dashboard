import "react-datepicker/dist/react-datepicker.css";

import React from "react";

import { FormikProps } from "formik";
import {
    Col,
    Form,
    Row,
} from "react-bootstrap";
import Select from "react-select";

import Section from "../../../components/Section";
import useStaticValue from "../../../hooks/useStaticValue";
import { mapDeviceTypesToOptions } from "../../../utils/selectOptionUtils";
import { Device } from "../types/deviceTypes";

interface DeviceFormProps {
    formik: FormikProps<Device>;
}

const DeviceForm: React.FC<DeviceFormProps> = ({ formik }) => {
    const { getStaticValues, staticValues } = useStaticValue();

    const deviceTypeOptions = mapDeviceTypesToOptions(staticValues?.DeviceTypes);

    return (
        <>
            <Section
                title="Device Information"
                subTitle="Please enter the device information."
            >
                <Row>

                    <Form.Group as={Col} md={3} sm={3}>
                        <Form.Label>Device Type</Form.Label>
                        <Select
                            className="react-select-container"
                            options={deviceTypeOptions}
                            value={deviceTypeOptions.find((option) => option.value === formik.values.DeviceType)}
                            name="DeviceType"
                            id="DeviceType"
                            onChange={(option) => {
                                formik.setFieldValue("DeviceType", option?.value || "");
                            }}
                            onBlur={() => formik.setFieldTouched("DeviceType", true)}
                            styles={{
                                control: (provided, state) => ({
                                    ...provided,
                                    borderColor: formik.touched.DeviceType && formik.errors.DeviceType ? "red" : provided.borderColor,
                                }),
                            }}
                        />
                        {formik.touched.DeviceType && formik.errors.DeviceType && (
                            <div style={{ color: "red", marginTop: "0.25rem", fontSize: "80%" }}>
                                {formik.errors.DeviceType}
                            </div>
                        )}
                    </Form.Group>

                    <Form.Group as={Col} md={3} sm={3}>
                        <Form.Label>Device Name</Form.Label>
                        <Form.Control
                            type="text"
                            {...formik.getFieldProps("DeviceName")}
                            isInvalid={Boolean(formik.touched.DeviceName && formik.errors.DeviceName)}
                        />
                        {formik.touched.DeviceName && formik.errors.DeviceName && (
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.DeviceName}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <Form.Group as={Col} md={3} sm={3}>
                        <Form.Label>Serial Number</Form.Label>
                        <Form.Control
                            type="text"
                            {...formik.getFieldProps("SerialNumber")}
                            isInvalid={Boolean(formik.touched.SerialNumber && formik.errors.SerialNumber)}
                        />
                        {formik.touched.SerialNumber && formik.errors.SerialNumber && (
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.SerialNumber}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <Form.Group as={Col} md={3} sm={3}>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="text"
                            {...formik.getFieldProps("PhoneNumber")}
                            isInvalid={Boolean(formik.touched.PhoneNumber && formik.errors.PhoneNumber)}
                        />
                        {formik.touched.PhoneNumber && formik.errors.PhoneNumber && (
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.PhoneNumber}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <Form.Group as={Col} md={3} sm={3}>
                        <Form.Label>Connection String</Form.Label>
                        <Form.Control
                            type="text"
                            {...formik.getFieldProps("ConnectionString")}
                            isInvalid={Boolean(formik.touched.ConnectionString && formik.errors.ConnectionString)}
                        />
                        {formik.touched.ConnectionString && formik.errors.ConnectionString && (
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.ConnectionString}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <Form.Group as={Col} md={3} sm={3}>
                        <div>
                            <Form.Check
                                type="checkbox"
                                label="Is Active"
                                {...formik.getFieldProps('IsActive')}
                                checked={formik.values.IsActive}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.touched.IsActive && formik.errors.IsActive}
                            </Form.Control.Feedback>
                        </div>
                    </Form.Group>
                </Row>
            </Section>
        </>
    );
};

export default DeviceForm;