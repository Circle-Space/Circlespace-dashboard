import React, { useState } from "react";
import { Formik } from "formik";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Account } from "../../../types/accounts/accountTypes";
import { accountValidationSchema } from "./FormikConfig";

const initialAddress: Account = {
    Id: "00000000-0000-0000-0000-000000000000",
    Name: ""
}

interface Props {
    values: Account[];
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const AccountForm = ({ values, setFieldValue }: Props) => {
    const [showModal, setShowModal] = useState(false);

    const addAccount = (newEntry: Account) => {
        setFieldValue('AccountList', [...values, newEntry]);
        setShowModal(false);
    };

    return (
        <>
            <Button variant="primary" onClick={() => setShowModal(true)}>Add Account</Button>
            <Modal size="xl" show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Formik
                        initialValues={initialAddress}
                        validationSchema={accountValidationSchema}
                        onSubmit={(values, { resetForm }) => {
                            addAccount(values);
                            resetForm();
                        }}
                    >
                        {({ values, handleChange, setFieldValue, handleSubmit, errors, touched }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Row className='mb-2'>
                                    <Form.Group as={Col} md={3} sm={3}>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="Name"
                                            onChange={handleChange}
                                            isInvalid={!!errors.Name && touched.Name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.Name}
                                        </Form.Control.Feedback>
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
                    <h1>{`${a.Name}`}</h1>
                </div>
            ))
            }
        </>
    );
};

export default AccountForm;