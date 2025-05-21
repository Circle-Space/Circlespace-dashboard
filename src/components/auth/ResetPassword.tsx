import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form as FormikForm, Field } from 'formik';
import { Alert, Button, Form } from 'react-bootstrap';
import { Envelope } from 'react-bootstrap-icons';
import useAuth from '../../hooks/useAuth';

interface ResetPasswordProps {
  avatar: string;
}

function ResetPassword({ avatar }: ResetPasswordProps) {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  return (
    <div className="form-section">
      <div className="form-container">
        <div className="avatar-container">
          <img src={avatar} alt="Avatar" className="avatar-image" />
        </div>

        <h1 className="welcome-text mb-4">
          Reset Password for <span className="product-name">Spartan Nexus</span>
        </h1>

        <p className="text-muted mb-3 register-text">Enter your email to reset password</p>
        <Formik
          initialValues={{
            email: '',
            submit: false,
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              await resetPassword(values.email);
              navigate('/auth/sign-in');
            } catch (error: any) {
              const message = error.message || 'Something went wrong';
              setStatus({ success: false });
              setErrors({ submit: message });
              setSubmitting(false);
            }
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <FormikForm noValidate>
              {errors.submit && (
                <Alert className="my-3" variant="danger">
                  <div className="alert-message">{errors.submit}</div>
                </Alert>
              )}

              <Form.Group className="mb-4 custom-input-group" controlId="email">
                <div className="d-flex align-items-center border-bottom">
                  <Envelope size={20} className="me-2" />
                  <Field type="email" name="email" placeholder="Type your email" className="custom-input" />
                </div>
                {touched.email && errors.email && (
                  <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                    {errors.email}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <div className="d-flex flex-column gap-3 mt-5 mb-4">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="w-100 rounded-pill login-button"
                  style={{
                    border: 'none',
                    padding: '0.75rem 0',
                    fontSize: '1rem',
                    position: 'relative',
                    overflow: 'hidden',
                    zIndex: 1,
                  }}
                >
                  <span style={{ position: 'relative', zIndex: 2 }}>Reset Password</span>
                  <div
                    className="button-background"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '200%',
                      height: '100%',
                      background: 'linear-gradient(to right, #E100FF, #7F00FF, #E100FF)',
                      transition: 'transform 0.3s ease',
                      zIndex: 1,
                    }}
                  />
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() => navigate('/auth/sign-in')}
                  className="w-100 rounded-pill"
                  style={{
                    padding: '0.75rem 0',
                    fontSize: '1rem',
                  }}
                >
                  Cancel
                </Button>
              </div>

              <div className="text-end mb-3">
                <span className="me-2">Remember your password?</span>
                <Link to="/auth/sign-in" className="sign-in-link">
                  Sign In
                </Link>
              </div>
            </FormikForm>
          )}
        </Formik>
      </div>

      <style jsx>{`
        .form-section {
          background-color: #f8f9fa;
          padding: 4rem;
          right: 0;
          position: absolute;
          height: 100vh;
          border-left: 0.5px solid rgba(0, 0, 0, 0.1);
          box-shadow: -10px 0 20px -5px rgba(0, 0, 0, 0.1);
          /*box-shadow: -15px 0 30px -10px rgba(0, 0, 0, 0.2);*/
          /*box-shadow: -12px 0 24px -6px rgba(50, 50, 93, 0.25), -8px 0 16px -8px rgba(0, 0, 0, 0.3);*/
          /*box-shadow: -10px 0 20px -5px rgba(0, 0, 0, 0.1), -20px 0 40px -10px rgba(0, 0, 0, 0.05);*/

          overflow-y: auto;

          /*Midnight Steel: background: linear-gradient(135deg, #2c3e50 0%, #bdc3c7 100%);*/
          /*Gunmetal Gray:  background: linear-gradient(135deg, #393939 0%, #888888 100%);*/
          /*Dark Titanium:  background: linear-gradient(135deg, #1c2833 0%, #52565e 100%);
          /*Brushed Silver: background: linear-gradient(135deg, #4b4b4b 0%, #c0c0c0 100%);*/
          /*Charcoal Alloy: background: linear-gradient(135deg, #2d3436 0%, #636e72 100%);*/
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
        }

        .form-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: -5px;
          height: 100%;
          width: 5px;
          background: linear-gradient(to bottom, #e100ff, #7f00ff);
          box-shadow: 0 0 10px rgba(127, 0, 255, 0.5);
        }

        .form-container {
          width: 100%;
          max-width: 420px;
          display: flex;
          flex-direction: column;
          margin-top: -35px;
          position: relative;
          z-index: 1;
        }

        .welcome-text {
          font-size: 1.5rem;
          font-weight: 400;
          color: #333;
          text-align: center;
          margin-bottom: 1rem;
          margin-top: -15px;
        }

        .product-name {
          display: block;
          font-size: 2.25rem;
          font-weight: 700;
          color: #007bff;
          letter-spacing: -0.5px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .register-text {
          margin-top: 30px;
        }

        .avatar-container {
          text-align: center;
          margin-bottom: 2rem;
        }

        .avatar-image {
          width: 95px;
          height: 95px;
          border-radius: 60%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .avatar-image:hover {
          transform: scale(1.1);
        }

        h1 {
          font-size: 2rem;
          font-weight: bold;
        }

        .login-button {
          background: linear-gradient(45deg, #7f00ff, #e100ff);
          transition: all 0.3s ease;
        }

        .login-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(127, 0, 255, 0.3);
        }

        .login-button:hover .button-background {
          transform: translateX(50%);
        }

        .custom-input-group {
          position: relative;
          margin-bottom: 1.5rem;
        }

        .custom-input-group .border-bottom {
          border-bottom: 1px solid #ced4da;
          transition: border-color 0.15s ease-in-out;
        }

        .custom-input-group:focus-within .border-bottom {
          border-bottom: 2px solid #7f00ff;
        }

        .custom-input {
          border: none;
          background-color: transparent;
          width: 100%;
          font-size: 1rem;
          padding: 0.375rem 0;
          outline: none;
        }

        .custom-input-group svg {
          color: #6c757d;
        }

        .custom-input-group:focus-within svg {
          color: #7f00ff;
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
          box-shadow: 0 2px 4px rgba(0, 123, 255, 0.3);
        }
      `}</style>
    </div>
  );
}

export default ResetPassword;
