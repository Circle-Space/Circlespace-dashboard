import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useState } from "react";
import { FormikProps } from "formik";
import { Col, Form, Row } from "react-bootstrap";
import Select from "react-select";
import Section from "../../../components/Section";
import useStaticValue from "../../../hooks/useStaticValue";
import { SelectOption } from "../../../types/SelectOption";
import { getISORepresentation } from "../../../utils/dateUtils";
import { mapRolesToOptions } from "../../../utils/selectOptionUtils";
import { User } from "../types/userTypes";
import { formatSelectedRole } from "../functions/UserFunctions";

interface GeneralUserProps {
    formik: FormikProps<User>;
}

const GeneralUserForm: React.FC<GeneralUserProps> = ({ formik }) => {
    const [roleOptions, setRoleOptions] = useState<SelectOption[]>([])
    const { staticValues } = useStaticValue();

    useEffect(() => {
        const options = mapRolesToOptions(staticValues.Roles);
        setRoleOptions(options);
    }, [staticValues]);


    return (
        <>
            <Section
                title="User Information"
                subTitle="Please enter the user information."
            >
                <Row>
                    <Form.Group as={Col} md={3} sm={3}>
                        <Form.Label className="mb-1">First Name</Form.Label>
                        <Form.Control
                            type="text"
                            {...formik.getFieldProps("FirstName")}
                            isInvalid={Boolean(formik.touched.FirstName && formik.errors.FirstName)}
                        />
                        {formik.touched.FirstName && formik.errors.FirstName && (
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.FirstName}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <Form.Group as={Col} md={3} sm={3}>
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            type="text"
                            isInvalid={Boolean(formik.touched.LastName && formik.errors.LastName)}
                            {...formik.getFieldProps('LastName')}
                        />
                        {formik.touched.LastName && formik.errors.LastName && (
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.LastName}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <Form.Group as={Col} md={3} sm={3}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            isInvalid={Boolean(formik.touched.Email && formik.errors.Email)}
                            {...formik.getFieldProps('Email')}
                        />
                        {formik.touched.Email && formik.errors.Email && (
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.Email}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <Form.Group as={Col} md={3} sm={3}>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="text"
                            isInvalid={Boolean(formik.touched.PhoneNumber && formik.errors.PhoneNumber)}
                            {...formik.getFieldProps('PhoneNumber')}
                        />
                        {formik.touched.PhoneNumber && formik.errors.PhoneNumber && (
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.PhoneNumber}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <Form.Group as={Col} md={3} sm={3}>
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                            type="date"
                            className="datePicker"
                            isInvalid={Boolean(formik.touched.DateOfBirth && formik.errors.DateOfBirth)}
                            {...formik.getFieldProps('DateOfBirth')}
                            value={
                                formik.values.DateOfBirth
                                    ? getISORepresentation(formik.values.DateOfBirth)
                                    : ''
                            }
                        />
                        {formik.touched.DateOfBirth && formik.errors.DateOfBirth && (
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.DateOfBirth}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                </Row>
            </Section>
            <Section
                title="Address Information"
            >
                <Row>
                    <Form.Group as={Col} md={3} sm={3}>
                        <Form.Label>Address 1</Form.Label>
                        <Form.Control
                            type="text"
                            isInvalid={Boolean(formik.touched.Address1 && formik.errors.Address1)}
                            {...formik.getFieldProps('Address1')}
                        />
                        {formik.touched.Address1 && formik.errors.Address1 && (
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.Address1}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>


                    <Form.Group as={Col} md={3} sm={3}>
                        <Form.Label>Address 2</Form.Label>
                        <Form.Control
                            type="text"
                            isInvalid={Boolean(formik.touched.Address2 && formik.errors.Address2)}
                            {...formik.getFieldProps('Address2')}
                        />
                        {formik.touched.Address2 && formik.errors.Address2 && (
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.Address2}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>


                    <Form.Group as={Col} md={3} sm={3}>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            isInvalid={Boolean(formik.touched.City && formik.errors.City)}
                            {...formik.getFieldProps('City')}
                        />
                        {formik.touched.City && formik.errors.City && (
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.City}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <Form.Group as={Col} md={3} sm={3}>
                        <Form.Label>State</Form.Label>
                        <Form.Control
                            type="text"
                            isInvalid={Boolean(formik.touched.State && formik.errors.State)}
                            {...formik.getFieldProps('State')}
                        />
                        {formik.touched.State && formik.errors.State && (
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.State}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <Form.Group as={Col} md={3} sm={3}>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                            type="text"
                            isInvalid={Boolean(formik.touched.PostalCode && formik.errors.PostalCode)}
                            {...formik.getFieldProps('PostalCode')}
                        />
                        {formik.touched.PostalCode && formik.errors.PostalCode && (
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.PostalCode}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <Form.Group as={Col} md={3} sm={3}>
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type="text"
                            isInvalid={Boolean(formik.touched.Country && formik.errors.Country)}
                            {...formik.getFieldProps('Country')}
                        />
                        {formik.touched.Country && formik.errors.Country && (
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.Country}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                </Row>

            </Section>

            <Section
                title="Administration Information"
            >
                <Row>

                    <Form.Group as={Col} md={3} sm={3}>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            isInvalid={Boolean(formik.touched.Username && formik.errors.Username)}
                            {...formik.getFieldProps('Username')}
                        />
                        {formik.touched.Username && formik.errors.Username && (
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.Username}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                        <Form.Group as={Col} md={3} sm={3}>
                            <Form.Label>Role</Form.Label>
                            <Select
                                className="react-select-container"
                                options={roleOptions}
                                getOptionLabel={(option) => option.label}
                                getOptionValue={(option) => option.value}
                                value={roleOptions.find(option => formik.values.Roles && option.label === formik.values.Roles[0]?.Name)}
                               onChange={(selectedOption) => {
                                const formattedRole = formatSelectedRole(selectedOption);
                                formik.setFieldValue("Roles", formattedRole);
                            }}
                            onBlur={() => formik.setFieldTouched("Roles", true)}
                            />
                        </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} md={3} sm={3}>
                        <Form.Label>Temporary Password</Form.Label>
                        <Form.Control
                            type="password"
                            isInvalid={Boolean(formik.touched.PasswordHash && formik.errors.PasswordHash)}
                            {...formik.getFieldProps('PasswordHash')} // Update field name to "PasswordHash"
                        />
                        {formik.touched.PasswordHash && formik.errors.PasswordHash && (
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.PasswordHash}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <Form.Group as={Col} md={3} sm={3}>
                        <Form.Label>Confirm Temporary Password</Form.Label>
                        <Form.Control
                            type="password"
                            isInvalid={Boolean(formik.touched.ConfirmPasswordHash && formik.errors.ConfirmPasswordHash)}
                            {...formik.getFieldProps('ConfirmPasswordHash')} // Update field name to "PasswordHash"
                        />
                        {formik.touched.ConfirmPasswordHash && formik.errors.ConfirmPasswordHash && (
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.ConfirmPasswordHash}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <Form.Group as={Col} md={3} sm={3}>
                        <div>
                            <Form.Check
                                type="checkbox"
                                label="Approved"
                                {...formik.getFieldProps('IsApproved')}
                                checked={formik.values.IsApproved}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.touched.IsApproved && formik.errors.IsApproved}
                            </Form.Control.Feedback>
                        </div>
                    </Form.Group>
                </Row>
            </Section >

        </>
    );

};

export default GeneralUserForm;