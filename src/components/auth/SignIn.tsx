import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, FormikHelpers, Form as FormikForm, Field } from 'formik';
import * as Yup from 'yup';
import { Alert, Button, Form } from 'react-bootstrap';
import { Person, Lock, Microsoft, Google } from 'react-bootstrap-icons';

import useAuth from '../../hooks/useAuth';

interface SignInValues {
  username: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const initialValues: SignInValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values: SignInValues, { setSubmitting }: FormikHelpers<SignInValues>) => {
    try {
      await signIn(values.username, values.password);
      navigate('/dashboard');
    } catch (error: any) {
      const message = error.message || 'Something went wrong';
      setSubmitError(message);
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ errors, touched, isSubmitting }) => (
        <FormikForm noValidate>
          {submitError && (
            <Alert className="my-3" variant="danger">
              <div className="alert-message">{submitError}</div>
            </Alert>
          )}

          <Form.Group className="mb-3" controlId="username">
            <div className="d-flex align-items-center border-bottom">
              <Person size={20} className="me-2" />
              <Field
                type="text"
                name="username"
                placeholder="Type your username"
                as={Form.Control}
                className="border-0 shadow-none bg-transparent flex-grow-1"
                style={{ fontSize: '1rem' }}
                isInvalid={touched.username && errors.username}
              />
            </div>
            {touched.username && errors.username && (
              <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                {errors.username}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <div className="d-flex align-items-center border-bottom">
              <Lock size={20} className="me-2" />
              <Field
                type="password"
                name="password"
                placeholder="Type your password"
                as={Form.Control}
                className="border-0 shadow-none bg-transparent flex-grow-1"
                style={{ fontSize: '1rem' }}
                isInvalid={touched.password && errors.password}
              />
            </div>
            {touched.password && errors.password && (
              <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                {errors.password}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <div className="text-end mb-3">
            <Link to="/auth/reset-password" className="sign-in-link">
              Forgot password?
            </Link>
          </div>

          <div className="d-grid mb-3">
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="rounded-pill login-button"
              style={{
                border: 'none',
                padding: '0.5rem 0',
                background: 'linear-gradient(45deg, #7F00FF, #E100FF)',
                transition: 'background 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <span className="button-text" style={{ position: 'relative', zIndex: 1 }}>
                LOGIN
              </span>
              <div
                className="button-background"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '200%',
                  height: '100%',
                  background: 'linear-gradient(45deg, #E100FF, #7F00FF, #E100FF)',
                  transition: 'transform 0.3s ease',
                }}
              />
            </Button>
          </div>

          <style>{`
            .login-button:hover .button-background {
              transform: translateX(50%);
            }
          .sign-in-link {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border: 1px solid #007bff;
          border-radius: 50px;
          color: #007bff;
          background-color: #ffffff;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 0.9rem;
          line-height: 1;
        }

        .sign-in-link:hover {
          background-color: #007bff;
          color: #ffffff;
          text-decoration: none;
        }
          `}</style>

          <div className="text-center mb-3">
            <span>Or Sign In Using</span>
          </div>

          <div className="d-flex justify-content-center gap-3 mb-3">
            <Button variant="outline-primary" className="rounded-circle p-2">
              <Microsoft size={20} />
            </Button>
            <Button variant="outline-danger" className="rounded-circle p-2">
              <Google size={20} />
            </Button>
          </div>

          <div className="text-center">
            <small>
              Don't have an account?{' '}
              <Link to="/auth/sign-up" className="sign-in-link">
                Sign Up
              </Link>
            </small>
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};

export default SignIn;
