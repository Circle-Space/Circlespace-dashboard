import React, { useCallback, useEffect, useState } from 'react';
import { Formik, FormikProps } from 'formik';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import Select from 'react-select';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BaseTable from '../../../../components/BaseTable';
import Section from '../../../../components/Section';
import useStaticValue from '../../../../hooks/useStaticValue';
import { PaginationType } from '../../../../types/apiResponse';
import useActivityType from '../../activityTypes/hooks/useActivityType';
import useCase from '../hooks/useCase';
import { Activities } from '../types/casesTypes';
import { activityValidationSchema } from './FormikConfig';
import { activitycolumns } from './tableColumns';
import { ApiFilterParameter } from '../../../../types/apiFilterParameter/apiFilterParameter';

interface ActivityFormProps {
  values: Activities[];
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  formik: FormikProps<Activities>;
}

const ActivitiesForm: React.FC<ActivityFormProps> = ({ values, setFieldValue, formik }) => {
  const { staticValues } = useStaticValue();
  const [showModal, setShowModal] = useState(false);
  const [existingActivities, setExistingActivities] = useState<Activities[]>([]);
  const [selectedActivityType, setSelectedActivityType] = useState<string>("00000000-0000-0000-0000-000000000000");
  const [selectedActivities, setSelectedActivities] = useState<Activities[]>([]);
  const [editingActivity, setEditingActivity] = useState<Activities | null>(null);



  const { addCaseActivities, case: existingCase, pagination, searchCases, getActivitiesByCaseId, deleteCaseActivities, updateCaseActivities } = useCase();

  const [paginationKey, setPaginationKey] = useState<string>('Get Cases Activities');

  const functionMap: {
    [key: string]: (type: PaginationType) => void;
  } = {
    ['Search']: (type: PaginationType) => searchCases(type, ''),
    ['Get Cases Activities']: (type: PaginationType) => getActivitiesByCaseId({ columnName: 'CaseId', columnCondition: 1, columnValue: existingCase?.Id || '' }, type),
  };



  useEffect(() => {
    if (values && values.length > 0) {
      setExistingActivities(values);
    }
  }, [values]);

  useEffect(() => {
    setPaginationKey('Get Cases Activities');
  }, []);

  const initialActivityValues = {
    caseId: existingCase?.Id || '',
    ActivityTypeId: selectedActivityType,
    Notes: '',
    Outcome: '',
    ActivityDate: new Date().toISOString(),
    ActivityType: []
  };

  const handleRowSelect = useCallback((selectedRows: Activities[]) => {
    setSelectedActivities(selectedRows);
  }, []);

  const addActivities = async (newEntry: any) => {
    const mergedValues = {
      caseId: existingCase?.Id || '',
      ...newEntry,
      ActivityTypeId: selectedActivityType,
      ActivityType: [{ Name: staticValues.CaseActivityTypes.find(option => option.value === selectedActivityType)?.label || '' }],
    };

    await addCaseActivities(mergedValues, () => {
      setShowModal(false);
      setSelectedActivityType('');
    });
    const filter: ApiFilterParameter = {
      columnName: 'CaseId',
      columnCondition: 1,
      columnValue: existingCase?.Id || ''
    };
    await getActivitiesByCaseId(filter, "RESET");
  };

  const editActivity = (activity: Activities) => {
    setEditingActivity(activity);
    setSelectedActivityType(activity.ActivityTypeId);
    setShowModal(true);
  };

  const deleteActivity = (activityId: string) => {
    deleteCaseActivities(activityId, () => {
      setExistingActivities(prevActivities => {
        const updatedActivities = prevActivities.filter(act => act.Id !== activityId);
        setFieldValue('Activities', updatedActivities);
        setSelectedActivities(selectedActivities.filter(act => act.Id !== activityId));
        return updatedActivities;
      });
    });
  };

  return (
    <>
      <div className="mb-5">
        <h1 className="dashboard-header-text mb-0">Activities</h1>
        <p className="small-light-black">
          The "Activities" section allows users to manage Activities related to the case. This feature supports various file types for
          documentation and record-keeping purposes.
        </p>
        <Button className="mb-2" variant="outline-primary" size="lg" onClick={() => setShowModal(true)}>
          <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Activities
        </Button>
      </div>
      <Section backgroundColor="#FFFFFF">
        <Modal
          size="lg"
          show={showModal}
          onHide={() => {
            setShowModal(false);
            setEditingActivity(null);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>{editingActivity ? 'Edit Activity' : 'Add New Activity'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={editingActivity ? editingActivity : initialActivityValues}
              validationSchema={activityValidationSchema}
              onSubmit={(values, { resetForm }) => {
                if (editingActivity) {
                  const mergedValues = {
                    caseId: existingCase?.Id || '',
                    ...values,
                    Id: editingActivity.Id,
                    ActivityTypeId: selectedActivityType,
                    ActivityType: [
                      { Name: staticValues.CaseActivityTypes.find(option => option.value === selectedActivityType)?.label || '' },
                    ],
                  };

                  updateCaseActivities(mergedValues, () => {
                    const updatedActivities = existingActivities.map(activity =>
                      activity.Id === editingActivity.Id ? mergedValues : activity,
                    );
                    setExistingActivities(updatedActivities);
                    setFieldValue('Activities', updatedActivities);
                    setShowModal(false);
                    setEditingActivity(null);
                    setSelectedActivityType('');
                  });
                } else {
                  addActivities(values);
                }
                resetForm();
              }}
            >
              {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    {/* Activity Type */}
                    <Form.Group as={Col} md={12} sm={12}>
                      <Form.Label>Activity Type</Form.Label>
                      <Select
                        className="react-select-container"
                        options={staticValues.CaseActivityTypes}
                        value={staticValues.CaseActivityTypes.find(option => option.value === values.ActivityTypeId)}
                        name="ActivityTypeId"
                        id="ActivityTypeId"
                        onChange={option => {
                          setSelectedActivityType(option?.value || '');
                          setFieldValue('ActivityTypeId', option?.value);
                        }}
                      />

                      {touched.ActivityTypeId && errors.ActivityTypeId && (
                        <div style={{ color: 'red', marginTop: '0.25rem', fontSize: '80%' }}>{errors.ActivityTypeId}</div>
                      )}
                    </Form.Group>

                    <Form.Group as={Col} md={12} sm={12}>
                      <Form.Label>Outcome</Form.Label>
                      <Form.Control type="text" name="Outcome" value={values.Outcome} onChange={handleChange} />
                      <Form.Control.Feedback type="invalid">{errors.Outcome}</Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Form.Group as={Col} md={12} sm={12}>
                    <Form.Label>Notes</Form.Label>
                    <Form.Control as="textarea" name="Notes" value={values.Notes} onChange={handleChange} />
                    <Form.Control.Feedback type="invalid">{errors.Notes}</Form.Control.Feedback>
                  </Form.Group>

                  <Modal.Footer>
                    <Button type="submit">{editingActivity ? 'Update' : 'Save'}</Button>
                    <Button
                      variant="outline-secondary"
                      onClick={() => {
                        setShowModal(false);
                        setEditingActivity(null);
                        setSelectedActivityType('');
                      }}
                    >
                      Close
                    </Button>
                  </Modal.Footer>
                </Form>
              )}
            </Formik>
          </Modal.Body>
        </Modal>

        <BaseTable
          data={existingActivities}
          columns={activitycolumns}
          onRowSelect={handleRowSelect}
          showBorder={false}
          showStriped={false}
          showHover={false}
          showPagination={true}
          showCheckboxes={false}
          pagePagination={pagination}
          setPagination={functionMap[paginationKey]}
          actionButtons={[
            {
              name: 'Edit',
              onClick: data => editActivity(data.original),
            },
            {
              name: 'Delete',
              onClick: data => deleteActivity(data.original.Id),
            },
          ]}
        />
      </Section>
    </>
  );
};

export default ActivitiesForm;
