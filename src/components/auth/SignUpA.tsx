import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { Alert, Button, Form, OverlayTrigger, Popover } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import { PASSWORD_PATTERN } from "../../constants";



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

function SignUpA() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [showPasswordGuide, setShowPasswordGuide] = useState(true);


  return (
    <Formik
      initialValues={{
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        submit: false,
        verifyPassword: "",
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required("Username is required"),
        firstName: Yup.string().max(255).required("First name is required"),
        lastName: Yup.string().max(255).required("Last name is required"),
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
        password: Yup.string()
          .required("Password is required")
          .matches(
            PASSWORD_PATTERN,
            "Password must meet the requirements"
          )
          .min(8, "Password must be at least 8 characters")
          .max(16, "Password must not exceed 16 characters"),
        verifyPassword: Yup.string()
          .required("Please confirm your password")
          .oneOf([Yup.ref("password"), ""], "Passwords must match"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await signUp(
            values.username,
            values.email,
            values.password,
            values.firstName,
            values.lastName
          );
          navigate("/auth/sign-in");
        } catch (error: any) {
          const message = error.response?.data?.message || "Something went wrong";

          setStatus({ success: false });
          setErrors({ submit: message });
          setSubmitting(false);
        }

      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <Form onSubmit={handleSubmit}>
          {errors.submit && (
            <Alert className="my-3" variant="danger">
              <div className="alert-message">{errors.submit}</div>
            </Alert>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              value={values.username}
              isInvalid={Boolean(touched.username && errors.username)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!touched.username && (
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="First name"
              value={values.firstName}
              isInvalid={Boolean(touched.firstName && errors.firstName)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!touched.firstName && (
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Last name"
              value={values.lastName}
              isInvalid={Boolean(touched.lastName && errors.lastName)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!touched.lastName && (
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Email address"
              value={values.email}
              isInvalid={Boolean(touched.email && errors.email)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!touched.email && (
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <div className="input-group">
              <OverlayTrigger
                trigger={showPasswordGuide ? ["hover"] : []}
                placement="top"
                overlay={
                  <Popover id="password-guide-popover">
                    <Popover.Body>
                      <PasswordGuide />
                    </Popover.Body>
                  </Popover>
                }
              >
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  minLength={8}
                  maxLength={16}
                  value={values.password}
                  isInvalid={Boolean(touched.password && errors.password)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </OverlayTrigger>
              {!!touched.password && (
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              )}

            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Verify Password</Form.Label>
            <Form.Control
              type="password"
              name="verifyPassword"
              placeholder="Verify Password"
              value={values.verifyPassword}
              isInvalid={Boolean(
                touched.verifyPassword && errors.verifyPassword
              )}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!touched.verifyPassword && (
              <Form.Control.Feedback type="invalid">
                {errors.verifyPassword}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <PasswordGuide />
          <div className="text-center mt-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
            >
              Sign up
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate("/auth/sign-in")}
              className="ms-2"
            >
              Cancel
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default SignUpA;
