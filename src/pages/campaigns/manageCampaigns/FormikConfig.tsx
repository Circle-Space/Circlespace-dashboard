import {
  FormikHelpers,
  useFormik,
} from 'formik';
import { NavigateFunction } from 'react-router-dom';
import * as Yup from 'yup';

import {
  Campaign,
  CampaignFormValues,
} from '../../../types/campaigns/campaignTypes';
import { SelectOption } from '../../../types/SelectOption';

export const campaignInitialValues: CampaignFormValues = {
  name: '',
  startDate: '',
  endDate: '',
  description: '',
  manualStart: false,
  templates: [''],
  FileName: '',
  filePath: '',
  cloudProvider: 'Azure',
  deviceId: {} as SelectOption,
  campaignType: 'LOCAL_DAEMON',
  devicePhoneNumber: '',
};

export const campaignValidationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date().required('End date is required'),
  description: Yup.string().required('Description is required'),
  templates: Yup.array()
    .of(Yup.string().required('Template is required').max(160, 'Maximum 160 characters allowed'))
    .required('Templates are required')
    .min(1, 'At least one template is required'),
  deviceId: Yup.object()
    .shape({
      value: Yup.string().required('Device is required'),
      label: Yup.string().required('Device is required'),
    })
    .required('Device is required'),
  FileName: Yup.string().required('File is required'),
});

export const useCampaignFormik = (
  handleSubmit: (formData: CampaignFormValues, actions: FormikHelpers<CampaignFormValues>) => void,

  initialValues: CampaignFormValues = campaignInitialValues,
) => {
  const formik = useFormik<CampaignFormValues>({
    initialValues,
    validationSchema: campaignValidationSchema,
    onSubmit: handleSubmit,
  });

  return formik;
};

export const updateCampaignHandleSubmit = (
  campaign: Campaign,
  navigate: NavigateFunction,
  updateCampaign: (reqData: Campaign, callback: () => void) => void,
) => {
  updateCampaign(campaign, () => navigate('/services/campaigns'));
};
