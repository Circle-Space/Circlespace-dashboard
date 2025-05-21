import React, { useState } from 'react';

import { FormikProps } from 'formik';
import {
  Button,
  Form,
} from 'react-bootstrap';

import {
  faMinusCircle,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Section from '../../../components/Section';
import { CampaignFormValues } from '../../../types/campaigns/campaignTypes'; // Adjust the import path as needed

interface CampaignMessageTemplatesProps {
  formik: FormikProps<CampaignFormValues>;
}

const CampaignMessageTemplates: React.FC<CampaignMessageTemplatesProps> = ({ formik }) => {
  const [charCount, setCharCount] = useState(0);

  const addTemplate = () => {
    const templates = formik.values.templates;
    if (templates.length < 3) {
      formik.setFieldValue('templates', [...templates, '']);
    }
  };

  const removeTemplate = (index: number) => {
    const templates = formik.values.templates.filter((_, i) => i !== index);
    formik.setFieldValue('templates', templates);
  };

  const handleTemplateChange = (event: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const templates = [...formik.values.templates];
    templates[index] = event.target.value;
    formik.setFieldValue('templates', templates);
    setCharCount(event.target.value.length);
  };

  return (
    <>
      <p className="sub-header">
        Each campaign can consist of
        up to 3 segments, with a maximum of 155 characters per segment. Segments are dispatched sequentially, typically
        within a few seconds of each other.
      </p>

      <Section backgroundColor="#FFFFFF" title="Message Segments">
        {formik.values.templates.map((template, index) => (
          <Form.Group key={index}>
            <div className="d-flex justify-content-between mb-2 mt-1">
              <Form.Label>Segment Tex {index + 1}</Form.Label>
              <div>
                {formik.values.templates.length > 1 && (
                  <Button size="sm" className="me-2" onClick={() => removeTemplate(index)}>
                    <FontAwesomeIcon icon={faMinusCircle} />
                  </Button>
                )}
                {index === formik.values.templates.length - 1 && (
                  <Button size="sm" onClick={addTemplate}>
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </Button>
                )}
              </div>
            </div>
            <Form.Control
              as="textarea"
              name={`templates[${index}]`}
              value={template}
              maxLength={160}
              onChange={(e) => handleTemplateChange(e as React.ChangeEvent<HTMLTextAreaElement>, index)}
              onBlur={formik.handleBlur}
              isInvalid={Boolean(formik.touched.templates && formik.errors.templates && formik.errors.templates[index])}
            />
            {formik.touched.templates && formik.errors.templates && formik.errors.templates[index] && (
              <Form.Control.Feedback type="invalid">{formik.errors.templates[index]}</Form.Control.Feedback>
            )}
          </Form.Group>
        ))}
        <div className="segment"> {charCount}/160 </div>
      </Section>
    </>
  );
};

export default CampaignMessageTemplates;
