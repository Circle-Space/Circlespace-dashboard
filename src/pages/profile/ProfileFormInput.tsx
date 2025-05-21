import React, { useState, useEffect } from "react";
import { useFormik, FormikHelpers } from "formik";
import { Button, Form, Row, Col } from "react-bootstrap";
import { UserFormValues } from "../users/types/userTypes";
import * as Yup from 'yup';
import { getISORepresentation } from "../../utils/dateUtils";
import useRolesManagement from "../../hooks/useRoles";
import { SelectOption } from "../../types/SelectOption";
import { mapRolesToOptions } from "../../utils/selectOptionUtils";
import useUsers from "../../hooks/useUsers";

interface Props {
    onSubmit: (formData: UserFormValues) => void;
    initialValues: UserFormValues;
    leftButtonText: string;
    validationSchema: Yup.Schema<any>
}

const ProfileFormInputs = ({
    onSubmit,
    initialValues,
    leftButtonText,
    validationSchema
}: Props) => {
    const [roleOptions, setRoleOptions] = useState<SelectOption[]>([])
    const { roles } = useRolesManagement();
    const { error } = useUsers();

    useEffect(() => {
        setRoleOptions(mapRolesToOptions(roles))
    }, [])

    const handleSubmit = (values: UserFormValues, { setSubmitting }: FormikHelpers<UserFormValues>) => {
        onSubmit(values);
        setSubmitting(false);
    };

    const formik = useFormik<UserFormValues>({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit
    })

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Row className="mb-2">
                <Form.Group as={Col} md={3}>
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                        type="text"
                        isInvalid={Boolean(formik.touched.FirstName && formik.errors.FirstName)}
                        {...formik.getFieldProps('FirstName')}
                    />
                    {formik.touched.FirstName && formik.errors.FirstName && (
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.FirstName}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>
                <Form.Group as={Col} md={3}>
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
                <Form.Group as={Col} md={6}>
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
            </Row>
            <Row className="mb-2">
                <Form.Group as={Col} md={6}>
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

                <Form.Group as={Col} md={6}>
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
                    {/* {formik.touched.DateOfBirth && formik.errors.DateOfBirth && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.DateOfBirth}
            </Form.Control.Feedback>
          )} */}
                </Form.Group>
            </Row>
            <Row className="mb-2">
                <Form.Group as={Col} md={6}>
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
                <Form.Group as={Col} md={6}>
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
            </Row>
            <Row className="mb-2">
                <Form.Group as={Col} md={6}>
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

                <Form.Group as={Col} md={6}>
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
            </Row>
            <Row className="mb-2">
                <Form.Group as={Col} md={6}>
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
                <Form.Group as={Col} md={6}>
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
            <Row className="mb-2">
                <Form.Group as={Col} md={6}>
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
            </Row>

            <div className="text-center">
                <Button variant="primary" type="submit">
                    {leftButtonText}
                </Button>
            </div>
        </Form>
    )
}

export default ProfileFormInputs