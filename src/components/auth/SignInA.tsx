import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { Alert, Button, Form } from "react-bootstrap";

import useAuth from "../../hooks/useAuth";

function SignInA() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().max(255).required("Username is required"),
        password: Yup.string().max(255).required("Password is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await signIn(values.username, values.password);

          navigate("/dashboard");
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
              size="lg"
              type="username"
              name="username"
              placeholder="Enter your username"
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

          <Form.Group className="mb-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              size="lg"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={values.password}
              isInvalid={Boolean(touched.password && errors.password)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!touched.password && (
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            )}

          </Form.Group>
          <div className="d-flex justify-content-between mb-3">
            <p>
              <Link to="/auth/reset-password">Forgot password?</Link>
            </p>
            <p>
              <Link to="/auth/sign-up">Sign Up?</Link>
            </p>
          </div>

          <div>
            <Form.Check
              type="checkbox"
              id="rememberMe"
              label="Remember me next time"
              defaultChecked
            />
          </div>

          <div className="text-center mt-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
            >
              Sign in
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default SignInA;