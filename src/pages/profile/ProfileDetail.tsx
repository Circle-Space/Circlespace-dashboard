import React, {
    useEffect,
    useState,
} from "react";

import Avatar from "react-avatar";
import {
    Alert,
    Card,
    Col,
    Row,
} from "react-bootstrap";
import * as Yup from "yup";

import useAuth from "../../hooks/useAuth";
import useRolesManagement from "../../hooks/useRoles";
import useToast from "../../hooks/useToast";
import useUsers from "../../hooks/useUsers";
import { AuthUser } from "../../types/auth";
import { UserFormValues } from "../users/types/userTypes";
import {
    findSelectOptionByLabel,
    mapRolesToOptions,
} from "../../utils/selectOptionUtils";
import ProfileFormInputs from "./ProfileFormInput";

interface Props {
    user: AuthUser | null;
}


const ProfileDetail = ({ user }: Props) => {
    const { roles } = useRolesManagement();
    const { getUserinfo } = useAuth();
    const { getUsers, updateUser } = useUsers();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { showErrorToast } = useToast();


    useEffect(() => {
        getUsers("RESET");
        getUserinfo();
    }, []);



    const handleSubmit = async (formData: UserFormValues) => {
        const { RoleId } = formData;
        const updatedUser = {
            ...user,
            ...formData,
            RoleId: RoleId.value,
        };

        try {
            await updateUser(updatedUser);
            getUserinfo();
        } catch (error: any) {
            const message = error?.response?.data?.message || "Something went wrong";
            setErrorMessage(message);
            showErrorToast("Failed to Update the user");
        }
    };

    const initialValues = {
        FirstName: user?.FirstName,
        LastName: user?.LastName,
        Email: user?.Email,
        Username: user?.Username,
        RoleId: findSelectOptionByLabel(user?.RoleName || "", mapRolesToOptions(roles)),
        DateOfBirth: user?.DateOfBirth,
        PhoneNumber: user?.PhoneNumber,
        Address1: user?.Address1,
        Address2: user?.Address2,
        City: user?.City,
        State: user?.State,
        Country: user?.Country,
        PostalCode: user?.PostalCode,
        IsApproved: user?.IsApproved
    } as UserFormValues;


    const validationSchema = Yup.object({
        FirstName: Yup.string().required('First Name is required'),
        LastName: Yup.string().required("Last Name is required"),
        Username: Yup.string().required("Username is required"),
        Email: Yup.string().email('Invalid email').required('Email is required'),
        RoleId: Yup.object()
            .shape({
                value: Yup.string().required('Roles is required'),
                label: Yup.string().required('Roles is required'),
            })
            .required('Roles is required'),
    });



    return (
        <div>
            <Card style={{ marginBottom: "20px" }}>
                <Card.Title className="px-3 pt-3 pb-0 mb-0">Profile Details</Card.Title>
                <Card.Body className="text-center">
                    <Row>
                        <Col sm={12} md={6} lg={8}>
                            <div className="text-left mb-3">
                                <Card.Body className="text-center">
                                    <h4 className="mb-0">{user?.FirstName} {user?.LastName}</h4>
                                    <p>Email: {user?.Email}</p>
                                    <h4>About</h4>
                                    <p>Roles: {user?.RoleName}</p>

                                </Card.Body>
                            </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                            <div className="d-flex flex-column align-items-center mt-3">
                                <Avatar
                                    className="me-1"
                                    name={`${user?.FirstName} ${user?.LastName}`}
                                    style={{ width: "130px", height: "130px", marginLeft: "25px" }}
                                    round

                                />
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <Card style={{ marginBottom: "20px" }}>
                <Card.Title className="px-3 pt-3 pb-0 mb-0">Profile Info</Card.Title>
                <Card.Body >
                    {errorMessage && (
                        <Alert variant="danger" className="mb-3">
                            {errorMessage}
                        </Alert>
                    )}
                    <ProfileFormInputs
                        onSubmit={handleSubmit}
                        initialValues={initialValues}
                        leftButtonText="Save"
                        validationSchema={validationSchema}
                    />
                </Card.Body>
            </Card>
        </div>
    );
};

export default ProfileDetail;
