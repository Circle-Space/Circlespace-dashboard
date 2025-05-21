import React, {
    useEffect,
    useState,
} from "react";

import {
    FormikHelpers,
    useFormik,
} from "formik";
import {
    Alert,
    Button,
    Card,
    Col,
    Container,
    Form,
    Row,
} from "react-bootstrap";
import * as Yup from "yup";

import {
    faSearch,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useAccountManagement from "../../../hooks/useAccount";
import useContact from "../../../hooks/useContact";
import {
    AccountFormValues,
} from "../../../types/accountManagement/accountTypes";
import { SelectOption } from "../../../types/SelectOption";
import { mapContactToOptions } from "../../../utils/selectOptionUtils";

interface Props {
    onSubmit: (formData: AccountFormValues) => void;
    initialValues: AccountFormValues;
    leftButtonText: string;
    rightButtonText: string;
    validationSchema: Yup.Schema<any>;
    clearForm?: boolean;
}

const AccountFormInputs = ({
    onSubmit,
    initialValues,
    leftButtonText,
    validationSchema,
    clearForm
}: Props) => {
    const [ContactOptions, setContactOptions] = useState<SelectOption[]>([])
    const { error } = useAccountManagement();
    const { contacts, searchContacts } = useContact();
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState<SelectOption[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    useEffect(() => {
        setContactOptions(mapContactToOptions(contacts));
        // Check if initialValues.PrimaryContactId has both label and value properties
        if (
            initialValues.PrimaryContactId &&
            initialValues.PrimaryContactId.label &&
            initialValues.PrimaryContactId.value
        ) {
            setSearchValue(initialValues.PrimaryContactId.label);
        }
    }, [contacts]);


    const handleSubmit = (
        values: AccountFormValues,
        { setSubmitting }: FormikHelpers<AccountFormValues>
    ) => {
        onSubmit(values);
        setSubmitting(false);
    };

    const formik = useFormik<AccountFormValues>({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    useEffect(() => {
        if (clearForm) {
            formik.resetForm();
        }
    }, [clearForm]);

    const handleSearchClick = async () => {
        // TODO: dont know what this is suppose to do but searchContacts dosen't return anything
        // This needs to be reworked.
        try {
            const response = await searchContacts(searchValue);

            // if (response.length > 0) {
            //     setSearchResults(mapContactToOptions(response));
            //     setShowResults(true);
            // } else {
            //     // If no records found, create a custom option
            //     setSearchResults([
            //         {
            //             label: "No record found",
            //             value: "",
            //         },
            //     ]);
            //     setShowResults(true);
            // }

        } catch (error: any) {
            console.error("Error fetching search me error :", error);
            const message = error?.response.data.document.FieldErrors[0]?.FieldMessage || "Something went wrong";
            setErrorMessage(message)
            setSearchResults([]);
            setShowResults(true); // Show "No record found" even in case of an error
        }
    };

    const handleClearClick = () => {
        setSearchResults([]);
        setShowResults(false);
        setSearchValue("");
        formik.setFieldValue("PrimaryContactId", "");
    };

    const handleContactSelect = (option: any) => {
        setSearchValue(option.label);
        console.log("selected value", option.label)
        formik.setFieldValue("PrimaryContactId", option.value);
        setShowResults(false);
    };




    const handleInputChange = async (e: any) => {
        const inputValue = e.target.value;

        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission
            await handleSearchClick(); // Trigger search
        } else {
            setSearchValue(inputValue);

            // Reset state when the search box becomes empty
            if (inputValue.trim() === "") {
                setSearchResults([]);
                setShowResults(false);
                setErrorMessage("");
            }
        }
    };

    return (
        <Container>
            <Card.Body style={{ marginTop: "20px" }}>
                {errorMessage && (
                    <Alert variant="danger" className="mb-3">
                        {errorMessage}
                    </Alert>
                )}
            </Card.Body>
            <Form onSubmit={formik.handleSubmit} onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}>
                <Row>
                    <Col md={6}>
                        <Card style={{ marginBottom: "20px" }}>
                            <Card.Title className="px-3 pt-3 pb-0 mb-0">Accounts</Card.Title>
                            <Card.Body>
                                <Form.Group>
                                    <Form.Label>Name<span style={{ color: 'red' }}>  *</span></Form.Label>
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

                                <Form.Group>
                                    <Form.Label>Website</Form.Label>
                                    <Form.Control
                                        type="text"
                                        isInvalid={Boolean(formik.touched.WebsiteUrl && formik.errors.WebsiteUrl)}
                                        {...formik.getFieldProps("WebsiteUrl")}
                                    />
                                    {formik.touched.WebsiteUrl && formik.errors.WebsiteUrl && (
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.WebsiteUrl}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        isInvalid={Boolean(formik.touched.PhoneNumber && formik.errors.PhoneNumber)}
                                        {...formik.getFieldProps("PhoneNumber")}
                                    />
                                    {formik.touched.PhoneNumber && formik.errors.PhoneNumber && (
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.PhoneNumber}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card style={{ marginBottom: "20px" }}>
                            <Card.Title className="px-3 pt-3 pb-0 mb-0">Contacts</Card.Title>
                            <Card.Body>

                                <Form.Group>
                                    <Form.Label>Contact</Form.Label>

                                    <div className="m-2 d-flex">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={searchValue}
                                            onChange={handleInputChange}
                                            onBlur={() => {
                                                formik.setFieldTouched("PrimaryContactId", true);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleSearchClick();
                                                }
                                            }}
                                            placeholder="Type to search Account"
                                        />
                                        <Button
                                            className="search-button"
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={handleSearchClick}
                                        >
                                            <FontAwesomeIcon icon={faSearch} />
                                        </Button>
                                        <Button
                                            className="clear-button"
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={handleClearClick}
                                        >
                                            <FontAwesomeIcon icon={faXmark} />
                                        </Button>
                                    </div>
                                    {showResults && (
                                        <ul className="search-results">
                                            {searchResults.length > 0 && searchResults.map((option) => (
                                                <li
                                                    key={option.value}
                                                    onClick={() => handleContactSelect(option)}
                                                >
                                                    <div className="result-item">
                                                        <div className="result-label">{option.label}</div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Card style={{ marginBottom: "20px" }}>
                    <Card.Title className="px-3 pt-3 pb-0 mb-0">Address</Card.Title>
                    <Card.Body>
                        <Form.Group>
                            <Form.Label>Address 1</Form.Label>
                            <Form.Control
                                as="textarea"
                                isInvalid={Boolean(formik.touched.Address1 && formik.errors.Address1)}
                                {...formik.getFieldProps("Address1")}
                            />
                            {formik.touched.Address1 && formik.errors.Address1 && (
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.Address1}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Address 2</Form.Label>
                            <Form.Control
                                as="textarea"
                                isInvalid={Boolean(formik.touched.Address2 && formik.errors.Address2)}
                                {...formik.getFieldProps("Address2")}
                            />
                            {formik.touched.Address2 && formik.errors.Address2 && (
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.Address2}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Address 3</Form.Label>
                            <Form.Control
                                as="textarea"
                                isInvalid={Boolean(formik.touched.Address3 && formik.errors.Address3)}
                                {...formik.getFieldProps("Address3")}
                            />
                            {formik.touched.Address3 && formik.errors.Address3 && (
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.Address3}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                isInvalid={Boolean(formik.touched.City && formik.errors.City)}
                                {...formik.getFieldProps("City")}
                            />
                            {formik.touched.City && formik.errors.City && (
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.City}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                type="text"
                                isInvalid={Boolean(formik.touched.State && formik.errors.State)}
                                {...formik.getFieldProps("State")}
                            />
                            {formik.touched.State && formik.errors.State && (
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.State}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control
                                type="text"
                                isInvalid={Boolean(formik.touched.PostalCode && formik.errors.PostalCode)}
                                {...formik.getFieldProps("PostalCode")}
                            />
                            {formik.touched.PostalCode && formik.errors.PostalCode && (
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.PostalCode}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                type="text"
                                isInvalid={Boolean(formik.touched.Country && formik.errors.Country)}
                                {...formik.getFieldProps("Country")}
                            />
                            {formik.touched.Country && formik.errors.Country && (
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.Country}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                    </Card.Body>
                </Card>





                {error && (
                    <div style={{ color: "red", marginTop: "0.25rem", fontSize: "80%" }}>
                        {error}
                    </div>
                )}
                <div className="text-center">
                    <Button variant="primary" type="submit">
                        {leftButtonText}
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default AccountFormInputs;

