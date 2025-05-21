import React, { useEffect, useState } from "react";
import { Form, Formik, FormikProps } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import CommandBar from "../../../components/CommandBar";
import TabCommandBar from "../../../components/TabCommandBar";
import useCase from "./hooks/useCase";
import { Activities, Case } from "./types/casesTypes";
import { caseValidationSchema } from "./components/FormikConfig";
import GeneralInformationForm from "./components/GeneralInformationForm";
import useLayout from "../../../hooks/useLayout";
import { Nav, Tab } from 'react-bootstrap';
import ActivitiesForm from "./components/ActivitiesForm";
import { ApiFilterParameter } from "../../../types/apiFilterParameter/apiFilterParameter";

interface Props { }

const UpdateCase = ({ }: Props) => {
  const { caseId } = useParams();
  const { updateCase, getCase, case: existingCase, clearCases, getActivitiesByCaseId, caseActivities } = useCase();
  const [loading, setLoading] = useState<boolean>(true);
  const { setNavbarTitle } = useLayout();
  const navigate = useNavigate();

  useEffect(() => {
    setNavbarTitle("Edit Case");
    if (caseId) {
      getCase(caseId);
      const filter: ApiFilterParameter = {
        columnName: 'CaseId',
        columnCondition: 1,
        columnValue: caseId
      };
      getActivitiesByCaseId(filter, "RESET");
    }

    return () => {
      setNavbarTitle("");
      clearCases();
    };
  }, [caseId]);

  useEffect(() => {
    if (existingCase && Object.keys(existingCase).length > 0) {
      setLoading(false);
    }
  }, [existingCase]);

  const handleSubmit = (formData: Case, shouldNavigate: boolean) => {
    if (caseId) {
      updateCase(formData, () => {
        if (shouldNavigate) {
          navigate(-1);
        }
      });
    }
  };

  return (
    <Formik
      initialValues={existingCase || {}}
      validationSchema={caseValidationSchema}
      onSubmit={() => { }} // Empty onSubmit to prevent auto-submission//onSubmit={(values) => handleSubmit(values, true)}
      enableReinitialize
    >
      {(formikProps: FormikProps<Case>) => (
        <Form>
          <CommandBar
            handleSave={() => handleSubmit(formikProps.values, false)}
            handleSaveAndClose={() => handleSubmit(formikProps.values, true)}
            handleBack={() => {
              navigate(-1);
            }}
          />
          <div className="form-container">
            <Tab.Container defaultActiveKey="generalInfo">
              <Nav className="mb-3" variant="tabs">
                <Nav.Item className="custom-nav-item">
                  <Nav.Link eventKey="generalInfo">General</Nav.Link>
                </Nav.Item>
                <Nav.Item className="custom-nav-item">
                  <Nav.Link eventKey="Activities">Activities</Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="generalInfo">
                  <h5 className="dashboard-header-text mb-0">Case Number : {existingCase?.CaseNumber}</h5>
                  <GeneralInformationForm formik={formikProps} />
                </Tab.Pane>
                <Tab.Pane eventKey="Activities">
                  {/* Ensure values passed to ActivitiesForm are Activities */}
                  <ActivitiesForm
                    values={caseActivities || []}
                    setFieldValue={formikProps.setFieldValue}
                    formik={formikProps as unknown as FormikProps<Activities>}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateCase;
