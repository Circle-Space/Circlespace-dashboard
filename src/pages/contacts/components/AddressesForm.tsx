import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import { Formik } from "formik";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Address } from "../../../types/addresses/addressTypes";
import { addressValidationSchema } from "./FormikConfig";

const initialAddress: Address = {
    AddressBookLinkID: "00000000-0000-0000-0000-000000000000",
    AddressType: "",
    AddressLine1: "",
    AddressLine2: "",
    AddressLine3: "",
    City: "",
    State: "",
    PostalCode: "",
    Country: "",
    Notes: "",
    VerifiedStatus: false,
    VerificationDate: null
}

interface Props {
    values: Address[];
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const AddressForm = ({ values, setFieldValue }: Props) => {
    const [showModal, setShowModal] = useState(false);

    const addAddress = (newEntry: Address) => {
        setFieldValue('AddressList', [...values, newEntry]);
        setShowModal(false);
    };

    return (
        <>
            <Button variant="primary" onClick={() => setShowModal(true)}>Add Address</Button>
            <Modal size="xl" show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Formik
                        initialValues={initialAddress}
                        validationSchema={addressValidationSchema}
                        onSubmit={(values, { resetForm }) => {
                            addAddress(values);
                            resetForm();
                        }}
                    >
                        {({ values, handleChange, setFieldValue, handleSubmit, errors, touched }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Row className='mb-2'>
                                    <Form.Group as={Col} md={3} sm={3}>
                                        <Form.Label>Address Type</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="AddressType"
                                            onChange={handleChange}
                                            isInvalid={!!errors.AddressType && touched.AddressType}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.AddressType}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} md={3} sm={3}>
                                        <Form.Label>Address Line 1</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="AddressLine1"
                                            onChange={handleChange}
                                            isInvalid={!!errors.AddressLine1 && touched.AddressLine1}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.AddressLine1}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} md={2} sm={3}>
                                        <Form.Label>City</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="City"
                                            onChange={handleChange}
                                            isInvalid={!!errors.City && touched.City}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.City}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} md={2} sm={2}>
                                        <Form.Label>State</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="State"
                                            onChange={handleChange}
                                            isInvalid={!!errors.State && touched.State}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.State}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md={2} sm={2}>
                                        <Form.Label>Postal Code</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="PostalCode"
                                            onChange={handleChange}
                                            isInvalid={!!errors.PostalCode && touched.PostalCode}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.PostalCode}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className='mb-2'>
                                    <Form.Group as={Col} md={3} sm={3}>
                                        <Form.Label>Address Line 2</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="AddressLine2"
                                            onChange={handleChange}
                                            isInvalid={!!errors.AddressLine2 && touched.AddressLine2}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.AddressLine2}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} md={3} sm={3}>
                                        <Form.Label>Address Line 3</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="AddressLine3"
                                            onChange={handleChange}
                                            isInvalid={!!errors.AddressLine3 && touched.AddressLine3}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.AddressLine2}
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md={2} sm={2}>
                                        <Form.Label>Postal Code</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="PostalCode"
                                            onChange={handleChange}
                                            isInvalid={!!errors.PostalCode && touched.PostalCode}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.PostalCode}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} md={2} sm={2}>
                                        <Form.Label>Country</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="Country"
                                            onChange={handleChange}
                                            isInvalid={!!errors.Country && touched.Country}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.Country}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-2">
                                    <Form.Group as={Col} md={2} sm={2}>
                                        <Form.Label>Verified Status</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="VerifiedStatus"
                                            isInvalid={!!errors.VerifiedStatus && touched.VerifiedStatus}
                                            onChange={(event) => {
                                                // Convert select option value to boolean and set it using Formik
                                                const value = event.target.value === 'true'; // 'true' or 'false' as strings from the select options
                                                setFieldValue('VerifiedStatus', value);
                                            }}
                                        >
                                            <option value="">Select</option>
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </Form.Control>
                                        {touched.VerifiedStatus && errors.VerifiedStatus && (
                                            <Form.Control.Feedback type="invalid">
                                                {errors.VerifiedStatus}
                                            </Form.Control.Feedback>
                                        )}
                                    </Form.Group>

                                    <Form.Group as={Col} md={2} sm={2}>
                                        <Form.Label>Verification Date</Form.Label>
                                        <div style={{ marginTop: -1 }}>
                                            <DatePicker
                                                wrapperClassName="datePicker custom-datepicker-width"
                                                className="form-control" // This applies Bootstrap's form control styling
                                                selected={values.VerificationDate ? new Date(values.VerificationDate) : null}
                                                onChange={date => setFieldValue('VerificationDate', date)}
                                                dateFormat="MM/dd/yyyy"
                                                maxDate={new Date()} // Disallow future dates
                                                showYearDropdown
                                                dropdownMode="select"
                                                placeholderText="mm/dd/yyyy"
                                                isClearable
                                                peekNextMonth
                                                showMonthDropdown
                                            />
                                        </div>
                                        {touched.VerificationDate && errors.VerificationDate && (
                                            <div className="text-danger mt-1">{errors.VerificationDate}</div>
                                        )}
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group>
                                        <Form.Label>Notes</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            name="Notes"
                                            onChange={handleChange}

                                        />
                                    </Form.Group>

                                </Row>

                                <Button type="submit">Save</Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal >


            {values.map((a, index) => (
                <div key={index}>
                    <h1>{`${a.AddressType}, ${a.AddressLine1}, ${a.AddressLine2}`}</h1>
                </div>
            ))
            }
        </>
    );
};

export default AddressForm;