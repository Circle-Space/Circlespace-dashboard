
import React, { useEffect } from "react";
import { Modal, Form, Row, Button, Col, FloatingLabel } from "react-bootstrap";
import { useFormik } from "formik";
import Select from "react-select";
import UserFormModal from "../UserManagement/Usermodel";

export interface RolesForm extends FormData {
    id: number;
    name: string;
    description: string;
}

interface Props {
    open: boolean;
    type: string | "Edit" | "Add";
    handleClose: () => void;
    initialValues?: RolesForm;
    handleSubmit: (values: RolesForm) => void;
}



const RolesFormModal = ({
    open,
    type,
    handleClose,
    initialValues,
    handleSubmit,
}: Props) => {
    const getInitialVal = () => {
        if (initialValues && type === "Edit") {
            return initialValues;
        } else {
            return {
                id: 0,
                name: "",
                description: "",
            } as unknown as RolesForm;
        }
    };

    const onSubmit = (values: RolesForm) => {
        handleSubmit(values);
        handleClose();
    };

    const formik = useFormik({
        initialValues: getInitialVal(),
        onSubmit,
    });

    useEffect(() => {
        if (initialValues && type === "Edit") {
            formik.setValues(initialValues);
        } else {
            formik.resetForm();
        }
    }, [initialValues, type]);

    return (
        <Modal centered show={open}>
            <Modal.Header>{type} Roles</Modal.Header>
            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <Row>
                        <Form.Group as={Col} md={12}>
                            <FloatingLabel label="Name" className="mb-3">
                                <Form.Control
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} md={12}>
                            <FloatingLabel label="Description" className="mb-3">
                                <Form.Control
                                    type="text"
                                    id="description"
                                    name="description"
                                    placeholder="Description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Row>
                    <div>
                        <Button variant="primary" type="submit">
                            {type === "Edit" ? "Save" : "Create"}
                        </Button>

                        <Button className="ms-3" variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};
export default RolesFormModal;