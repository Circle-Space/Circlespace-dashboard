import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import { Formik } from "formik";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import PhoneCard from "../../../components/PhoneCard";
import Section from "../../../components/Section";
import { countryCodeOptions, phoneTypesOptions } from "../../../constants";
import {
    PhoneDirectory,
} from "../../../types/phoneDirectories/phoneDirectoryTypes";
import { phoneDirectoryValidationSchema } from "./FormikConfig";

const initialPhoneDirectory: PhoneDirectory = {
    PhoneDirectoryLinkID: "00000000-0000-0000-0000-000000000000",
    AreaCode: "",
    PhoneNumber: "",
    CountryCode: "",
    Extension: "",
    PhoneType: "",
    IsPrimary: false,
    VerifiedStatus: false,
    VerificationDate: "",
    Region: "",
    FormattedNumber: "",
    Label: "",
    Notes: ""
}

interface PhoneNumberFormProps {
    values: PhoneDirectory[];
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const PhoneNumberForm: React.FC<PhoneNumberFormProps> = ({ values, setFieldValue }) => {
    const [showModal, setShowModal] = useState(false);
    const addPhoneDirectory = (newEntry: PhoneDirectory) => {
        newEntry.FormattedNumber = `${newEntry.CountryCode}${newEntry.AreaCode}${newEntry.PhoneNumber}`
        setFieldValue('PhoneDirectories', [...values, newEntry]);
        setShowModal(false);
    };

    return (
        <>
            <Button variant="primary" onClick={() => setShowModal(true)}>Add Phone Number</Button>
            <Modal size="xl" show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Phone Entry</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Formik
                        initialValues={initialPhoneDirectory}
                        validationSchema={phoneDirectoryValidationSchema}
                        onSubmit={(values, { resetForm }) => {
                            addPhoneDirectory(values);
                            resetForm();
                        }}
                    >

                        {({ values, handleChange, setFieldValue, handleSubmit, errors, touched }) => (
                            <Section>
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Row>
                                        {/* Phone Type */}
                                        <Form.Group as={Col} md={2} sm={2}>
                                            <Form.Label>Phone Type</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="PhoneType"
                                                value={values.PhoneType}
                                                onChange={handleChange}
                                                isInvalid={touched.PhoneType && !!errors.PhoneType}
                                            >
                                                {phoneTypesOptions.map((option, index) => (
                                                    <option key={index} value={option.value}>
                                                        {`${option.name}`}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.PhoneType}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        {/* Country Code */}
                                        <Form.Group as={Col} md={2} sm={2}>
                                            <Form.Label>Country Code</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="CountryCode"
                                                value={values.CountryCode}
                                                onChange={handleChange}
                                                isInvalid={!!errors.CountryCode && touched.CountryCode}
                                            >
                                                {countryCodeOptions.map((option, index) => (
                                                    <option key={index} value={option.code ? option.code : ""}>
                                                        {option.code ? `${option.code} - ${option.name}` : option.name}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.CountryCode}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        {/* Area Code */}
                                        <Form.Group as={Col} md={1} sm={1}>
                                            <Form.Label>Area Code</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="AreaCode"
                                                onChange={handleChange}
                                                isInvalid={!!errors.AreaCode && touched.AreaCode}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.AreaCode}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        {/* Phone Number*/}
                                        <Form.Group as={Col} md={2} sm={2}>
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="PhoneNumber"
                                                onChange={handleChange}
                                                isInvalid={!!errors.PhoneNumber && touched.PhoneNumber}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.PhoneNumber}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        {/* Phone Number Extension */}
                                        <Form.Group as={Col} md={1} sm={1}>
                                            <Form.Label>Extension</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="Extension"
                                                onChange={handleChange}

                                            />
                                        </Form.Group>

                                        {/* Is Primary */}
                                        <Form.Group as={Col} md={1} sm={1}>
                                            <Form.Label>Is Primary?</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="IsPrimary"
                                                isInvalid={!!errors.IsPrimary && touched.IsPrimary}
                                                onChange={(event) => {
                                                    // Convert select option value to boolean and set it using Formik
                                                    const value = event.target.value === 'true'; // 'true' or 'false' as strings from the select options
                                                    setFieldValue('IsPrimary', value);
                                                }}
                                            >
                                                <option value="">Select</option>
                                                <option value="true">Yes</option>
                                                <option value="false">No</option>
                                            </Form.Control>
                                            {touched.IsPrimary && errors.IsPrimary && (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.IsPrimary}
                                                </Form.Control.Feedback>
                                            )}
                                        </Form.Group>

                                        {/* Is verified? */}
                                        <Form.Group as={Col} md={1} sm={1}>
                                            <Form.Label>Verified?</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="VerifiedStatus"
                                                isInvalid={!!errors.VerifiedStatus && touched.VerifiedStatus}
                                                onChange={(event) => {
                                                    const value = event.target.value === 'true' ? true : event.target.value === 'false' ? false : null;
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

                                        {/* Verification Date */}
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

                                    <Row style={{ marginTop: 10 }}>
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

                            </Section>
                        )}

                    </Formik>
                </Modal.Body>
            </Modal>

            {/* Listing existing phone directory entries */}
            {values.map((directory, index) => (
                <div key={index}>
                    {/* Display details of each phone directory entry */}
                    {/* Adjust display according to your needs <p>{directory.PhoneNumber} - {directory.PhoneType} - {directory.Notes}</p> */}
                    <PhoneCard phone={directory} />
                </div>
            ))}

        </>



    );

};

export default PhoneNumberForm;