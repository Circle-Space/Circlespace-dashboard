import React, { useEffect } from 'react';

import {
  Card,
  Col,
  Form,
  Row,
} from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';

import CommandBar from '../../../components/CommandBar';
import useAuth from '../../../hooks/useAuth';
import useCampaignManagement from '../../../hooks/useCampaignManagement';
import useLayout from '../../../hooks/useLayout';
import {
  Campaign,
  CampaignFormValues,
} from '../../../types/campaigns/campaignTypes';
import { SelectOption } from '../../../types/SelectOption';
import {
  formatDateForDisplay,
  formatDateTime,
} from '../../../utils/dateUtils';
import {
  findSelectOptionByValue,
  mapDevicesToOptions,
} from '../../../utils/selectOptionUtils';
import CampaignInformation from './CampaignInformation';
import CampaignMessageTemplates from './CampaignMessageTemplates';
import {
  updateCampaignHandleSubmit,
  useCampaignFormik,
} from './FormikConfig';
import GlobalVariablesInfo from './GlobalVariablesInfo';

const EditCampaignForm = () => {
  const { updateCampaign } = useCampaignManagement();
  const { setNavbarTitle } = useLayout();
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();
  let campaign = location.state as Campaign;

  useEffect(() => {
    setNavbarTitle('Edit Campaign');
  }, []);

  const mapCampaignToFormValues = (campaign: Campaign): CampaignFormValues => {
    const deviceOptions = mapDevicesToOptions(user?.Devices || []);
    console.log("date ca", formatDateForDisplay(campaign.startDate),)

    return {
      name: campaign.name,
      startDate: formatDateForDisplay(campaign.startDate),
      endDate: formatDateForDisplay(campaign.endDate),
      description: campaign.description,
      manualStart: campaign.manualStart,
      templates: campaign.templates,
      FileName: campaign.FileName,
      filePath: campaign.filePath,
      cloudProvider: campaign.cloudProvider,
      deviceId: findSelectOptionByValue(campaign.deviceId, deviceOptions) || ({} as SelectOption),
      campaignType: campaign.campaignType,
      devicePhoneNumber: '',
    };
  };

  const mapFormValuesToCampaign = (campaignFormValues: CampaignFormValues): Campaign => {
    campaign.name = campaignFormValues.name;
    campaign.startDate = campaignFormValues.startDate;
    campaign.endDate = campaignFormValues.endDate;
    campaign.description = campaignFormValues.description;
    campaign.templates = campaignFormValues.templates;
    campaign.deviceId = campaignFormValues.deviceId.value;
    return campaign;
  };

  const initialValues = mapCampaignToFormValues(campaign);

  const handleSubmit = (formData: CampaignFormValues) => {
    campaign = mapFormValuesToCampaign(formData);
    const { startDate, endDate, ...rest } = campaign;
    const formattedStartDate = formatDateTime(formData.startDate);
    const formattedEndDate = formatDateTime(formData.endDate);
    const reqData: CampaignFormValues = {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      ...rest,
    };
    updateCampaignHandleSubmit(reqData, navigate, updateCampaign);
  };

  const formik = useCampaignFormik(handleSubmit, initialValues);

  return (
    <React.Fragment>
      <Helmet title={'Edit Campaign'} />
      <CommandBar handleBack={() => navigate('/services/campaigns')} handleSaveAndClose={() => formik.submitForm()} />

      <div style={{ marginTop: -4 }} className="analytics-command-bar p-2">
        <Card.Body>
          <Row>
            <Col md={8}>
              <Form onSubmit={formik.handleSubmit}>
                <CampaignInformation formik={formik} />
                <CampaignMessageTemplates formik={formik} />
              </Form>
            </Col>
            <Col md={3}>
              <GlobalVariablesInfo />
            </Col>
          </Row>
        </Card.Body>
      </div>
    </React.Fragment>
  );
};

export default EditCampaignForm;
