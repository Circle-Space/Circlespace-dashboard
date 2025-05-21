import React, { useState } from "react";
import { Form, Button, Card, Modal, Alert } from "react-bootstrap";
import * as yup from "yup";
import useUsers from "../../hooks/useUsers";
import { PASSWORD_PATTERN } from "../../constants";
import { Password } from "../users/types/userTypes";
import useAuth from "../../hooks/useAuth";


function PasswordGuide() {
    return (
        <Form.Text className="text-muted">
            Password must be between 8 and 16 characters long.
            <ul>
                <li>a uppercase letter.</li>
                <li>an lowercase letter.</li>
                <li>a one number.</li>
                <li>a special character (ex:@!$#%&).</li>
            </ul>
        </Form.Text>
    );
}

const ForgetPassword = () => {
    const { UpdatePasswordProfile } = useUsers();
    const { user, signOut } = useAuth();
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [passwordData, setPasswordData] = useState<Password>({
        Id: user?.Id || "",
        oldPassword: "",
        newPassword: "",
    });
    const [confirmpassword, setconfirmpassword] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === "confirmPassword") {
            setconfirmpassword(value);
        } else {
            setPasswordData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }

        if (name === "newPassword" || name === "confirmPassword") {
            validationSchema
                .validateAt(name, { ...passwordData, [name]: value })
                .then(() => {
                    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
                })
                .catch((error: yup.ValidationError) => {
                    setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
                });
        }

        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };



    const validationSchema = yup.object().shape({
        oldPassword: yup
            .string()
            .required("Current Password is required")
            .matches(PASSWORD_PATTERN, "Current Password must meet the password requirements"),
        newPassword: yup
            .string()
            .required("New Password is required")
            .min(8, "Password must be at least 8 characters")
            .max(16, "Password must not exceed 16 characters")
            .matches(PASSWORD_PATTERN, "New Password must meet the password requirements"),
        confirmPassword: yup
            .string()
            .required("Please confirm your password")
            .oneOf([yup.ref("newPassword")], "Passwords must match"),
    });


    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const isFormValid = Object.values(passwordData).every((value) => value.trim() !== "");
            if (!isFormValid) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    oldPassword: passwordData.oldPassword ? "" : "Current Password is required",
                    newPassword: passwordData.newPassword ? "" : "New Password is required",
                    confirmPassword: confirmpassword ? "" : "Please confirm your password",
                }));
                return;
            }

            await validationSchema.validate(
                { ...passwordData, confirmPassword: confirmpassword },
                { abortEarly: false }
            );
            setShowConfirmationModal(true);
            setErrors({});
        } catch (error: any) {
            if (error.inner) {
                const validationErrors: { [key: string]: string } = {};
                error.inner.forEach((err: yup.ValidationError) => {
                    validationErrors[err.path as keyof typeof validationErrors] = err.message;
                });
                setErrors((prevErrors) => ({ ...prevErrors, ...validationErrors }));
            } else {
                const message = error.message || "Something went wrong";
                setErrorMessage(message);
            }
        }
    };


    const handleConfirmPasswordChange = async () => {
        setShowConfirmationModal(false);
        try {
            await UpdatePasswordProfile(passwordData, () => signOut());
            setErrors({});
            setErrorMessage(null);
        } catch (error: any) {
            const message = error?.response?.data?.message || "Something went wrong";
            setErrorMessage(message);
        }
    };

    const handleCancelPasswordChange = () => {
        setShowConfirmationModal(false);
    };

    return (
        <Card style={{ marginBottom: "20px" }}>
            <Form onSubmit={handleSubmit}>
                <Card.Title className="px-3 pt-3 pb-0 mb-0">Reset Password</Card.Title>
                <Card.Body className="text-center">
                    {errorMessage && (
                        <Alert variant="danger" className="mb-3">
                            {errorMessage}
                        </Alert>
                    )}
                    <Form.Group>
                        <div style={{ textAlign: 'left' }}> {/* Apply custom inline style */}
                            <Form.Label>Current Password</Form.Label>
                        </div>
                        <Form.Control
                            type="password"
                            name="oldPassword"
                            value={passwordData.oldPassword}
                            onChange={handleInputChange}
                            isInvalid={!!errors.oldPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.oldPassword}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <div style={{ textAlign: 'left' }}> {/* Apply custom inline style */}
                            <Form.Label>New Password</Form.Label>
                        </div>
                        <Form.Control
                            type="password"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handleInputChange}
                            isInvalid={!!errors.newPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.newPassword}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <div style={{ textAlign: 'left' }}> {/* Apply custom inline style */}
                            <Form.Label>Confirm Password</Form.Label>
                        </div>
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={confirmpassword}
                            onChange={handleInputChange}
                            isInvalid={!!errors.confirmPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.confirmPassword}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <div className="mt-4">
                        <div style={{ textAlign: 'left' }}>
                            <PasswordGuide />
                        </div>
                    </div>
                    <div className="mt-4">
                        <Button variant="primary" type="submit">
                            Change Password
                        </Button>
                    </div>
                </Card.Body>
            </Form>
            <Modal show={showConfirmationModal} onHide={handleCancelPasswordChange}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to change your password?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelPasswordChange}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirmPasswordChange}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>
    );
};

export default ForgetPassword;
