import React from "react";
import { Formik } from "formik";
import { Alert, Button, Form } from "react-bootstrap";
import * as Yup from "yup";

interface RolesFormProps {
  handleClose: () => void;
}

const FEATURES = [
  { name: "CMS", value: "CMS" },
  { name: "SMS", value: "SMS" },
  { name: "CRM", value: "CRM" },
];

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  features: Yup.array().min(1, "Select at least one feature"),
});

function RolesForm(props: RolesFormProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // handle form submission
  };

  const handleCancel = () => {
    props.handleClose();
  };

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        active: true,
        features: [],
        submit: false,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
        // Handle form submission here
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
              {errors.submit}
            </Alert>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Name"
              value={values.name}
              isInvalid={Boolean(touched.name && errors.name)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!touched.name && (
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              placeholder="Description"
              value={values.description}
              isInvalid={Boolean(touched.description && errors.description)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!touched.description && (
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Features</Form.Label>
            <div>
              {FEATURES.map((feature) => (
                <Form.Check
                  key={feature.value}
                  type="checkbox"
                  id={`feature-${feature.value}`}
                  label={feature.name}
                  name="features"
                  value={feature.value}
                  onChange={(event) => {
                    const { value, checked } = event.target;
                    if (checked) {
                      handleChange({
                        target: { name: "features", value: [...values.features, value] },
                      });
                    } else {
                      handleChange({
                        target: { name: "features", value: values.features.filter((v) => v !== value) },
                      });
                    }
                  }}
                />
              ))}
            </div>
            {!!touched.features && (
              <Form.Control.Feedback type="invalid">
                {errors.features}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="text-center">
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              Add Record
            </Button>{" "}
            <Button variant="secondary" onClick={handleCancel} className="ms-2">
              Cancel
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default RolesForm;
