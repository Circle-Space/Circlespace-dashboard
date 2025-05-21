import React, { useEffect, useState } from 'react';

import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import CommandBar from '../../../components/CommandBar';
import LoadingOverlay from '../../../components/LoadingOverlay';
import useAuth from '../../../hooks/useAuth';
import useCampaignManagement from '../../../hooks/useCampaignManagement';
import useLayout from '../../../hooks/useLayout';
import { ResponseCode } from '../../../types/apiResponse';
import { CampaignFormValues } from '../../../types/campaigns/campaignTypes';
import { formatDateTime } from '../../../utils/dateUtils';
import CampaignEmailer from './CampaignEmailer';
import CampaignInformation from './CampaignInformation';
import CampaignMessageTemplates from './CampaignMessageTemplates';
import { useCampaignFormik } from './FormikConfig';
import ImportContacts from './ImportContacts';

const AddCampaignForm = () => {
  const { addCampaign } = useCampaignManagement();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setNavbarTitle } = useLayout();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setNavbarTitle('Add Campaign');

    return () => {
      setNavbarTitle('');
    };
  }, []);

  const handleSubmit = async (formData: CampaignFormValues) => {
    if (!user || isLoading) return;

    const { deviceId, devicePhoneNumber, startDate, endDate, emailHtmlContent, ...rest } = formData;
    const formattedStartDate = formatDateTime(formData.startDate);
    const formattedEndDate = formatDateTime(formData.endDate);

    const selectedDevice = user.Devices.find(device => device.Id === deviceId.value);

    if (!selectedDevice) return;

    const PhoneNumber = selectedDevice.PhoneNumber;
    const reqData: CampaignFormValues = {
      deviceId: deviceId.value,
      devicePhoneNumber: PhoneNumber,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      emailHtmlContent: JSON.stringify(formData.emailHtmlContent),
      ...rest,
    };

    reqData.UserId = user.Id;
    reqData.Useremail = user.Email;

    setIsLoading(true);

    try {
      debugger;
      const resp = await addCampaign(reqData);
      if (resp?.code === ResponseCode.SUCCESS) {
        navigate('/services/campaigns');
      }
    } catch (error) {
      console.error('Error while adding campaign', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useCampaignFormik(handleSubmit);
  const variableUsage: string[] = [
    '$first_name - Insert the first name of the contact',
    '$last_name - Insert the last name of the contact',
    '$city - Insert the city of the contact',
    '$state - Insert the state of the contact',
    '$zipcode - Insert the zipcode of the contact',
  ];

  return (
    <React.Fragment>
      <LoadingOverlay loading={isLoading} />
      <Helmet title={'Add Campaign'} />
      <CommandBar
        handleBack={() => navigate('/services/campaigns')}
        handleSaveAndClose={() => formik.submitForm()}
        isSavingAndClosing={isLoading}
      />

      <Container className="pt-3 pb-3 ps-0 pe-0">
        <h1 className="dashboard-header-text mb-2">Add New SMS Campaign</h1>
        <p className="sub-header">
          Create an SMS Campaign with text messaging services through this interface. Each campaign can consist of up to 3 segments, with a
          maximum of 155 characters per segment. Segments are dispatched sequentially, typically within a few seconds of each other.
        </p>
        <Row>
          <Col md={8}>
            <Form onSubmit={formik.handleSubmit}>
              <CampaignInformation formik={formik} />
              <CampaignEmailer formik={formik} />
              <CampaignMessageTemplates formik={formik} />
              <ImportContacts formik={formik} />
            </Form>
          </Col>
          <Col md={4}>
            <Card style={{ marginTop: 20 }}>
              <Card.Body>
                <Card.Title>Personalize Your Messages</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Use the variables below to customize each SMS:</Card.Subtitle>
                <ul className="list-unstyled">
                  {variableUsage.map((usage, index) => (
                    <li key={index}>{usage}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default AddCampaignForm;
