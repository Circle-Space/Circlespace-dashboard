import React, {
    useEffect,
    useState,
} from 'react';

import { FormikProps } from 'formik';
import {
    Col,
    Form,
    Row,
} from 'react-bootstrap';
import Select from 'react-select';

import Editor from '../../../components/RichTextEditor/RichTextEditorBase';
import Section from '../../../components/Section';
import useEmailTemplates from '../../../hooks/useEmailTemplates';
import { EmailTemplate } from '../../Configurations/types/emailTemplatestype';
import { RichTextEditorData } from '../../../RichTextEditorData';
import { CampaignFormValues } from '../../../types/campaigns/campaignTypes';
import { SelectOption } from '../../../types/SelectOption';
import { mapTemplateNameToOptions } from '../../../utils/selectOptionUtils';

export const emptyRTEState: string = `{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"heading","version":1,"tag":"h3"}],"direction":null,"format":"","indent":0,"type":"root","version":1}}`;

interface CampaignEmailerProps {
    formik: FormikProps<CampaignFormValues>;
}

const CampaignEmailer: React.FC<CampaignEmailerProps> = ({ formik }) => {
    const { emailTemplates } = useEmailTemplates();
    const [templateOptions, setTemplateOptions] = useState<SelectOption[]>([]);
    const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
    const [initialSummary, setInitialSummary] = useState<string>(emptyRTEState);
    const [editorContent, setEditorContent] = useState<RichTextEditorData>();


    useEffect(() => {
        setTemplateOptions(mapTemplateNameToOptions(emailTemplates));
    }, []);



    const handleSelectChange = (selectedOption: SelectOption | null) => {
        if (selectedOption) {
            const selectedTemplateName = selectedOption.label;
            const selectedTemplate = emailTemplates.find(template => template.TemplateName === selectedTemplateName);

            setSelectedTemplate(selectedTemplate || null);
            setInitialSummary(selectedTemplate?.HtmlContent || '');

            // Update the formik value with the selected template ID
            formik.setFieldValue("emailTemplateId", selectedOption.value);
            formik.setFieldValue("subject", selectedTemplate?.Subject);
        }
    }


    return (
        <>
            <p className="sub-header">
                Choose an email template and fill in the details for the campaign.
            </p>

            <Section backgroundColor="#FFFFFF" title="Email Details">
                <Row className="mb-3">
                    <Form.Group as={Col} md={12}>
                        <Form.Label>Select Templates</Form.Label>
                        <Select
                            options={templateOptions}
                            value={{ value: formik.values.emailTemplateId, label: selectedTemplate?.TemplateName }}
                            name="emailTemplateId"
                            id="emailTemplateId"
                            onChange={selectedOption => {
                                handleSelectChange(selectedOption);
                            }}
                            onBlur={() => formik.setFieldTouched('emailTemplateId', true)}
                            styles={{
                                control: (provided, state) => ({
                                    ...provided,
                                    borderColor:
                                        formik.touched.emailTemplateId && formik.errors.emailTemplateId ? 'red' : provided.borderColor,
                                }),
                            }}
                        />
                        {formik.touched.emailTemplateId && formik.errors.emailTemplateId && (
                            <div
                                style={{
                                    color: 'red',
                                    marginTop: '0.25rem',
                                    fontSize: '80%',
                                }}
                            >
                                {formik.errors.emailTemplateId}
                            </div>
                        )}
                    </Form.Group>
                </Row>

                {selectedTemplate && (
                    <>
                        <Row className="mb-3">
                            <Form.Group as={Col} md={12}>
                                <Form.Label>Subject</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...formik.getFieldProps('subject')}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.subject}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Form.Group as={Col} md={12}>
                            <Form.Label column sm={3}>HTML Content</Form.Label>

                            <Editor
                                editorConfig={initialSummary}
                                formatDropdown={true}
                                fontSizeDropdown={true}
                                fontFamilyDropdown={true}
                                textAlignmentDropdown={true}
                                highlighterPlugin={true}
                                formatPlugin={true}
                                autoLinkPlugin={true}
                                disabled={false}
                                toolbar={true}
                                onChange={newContent => {
                                    setEditorContent(newContent);
                                    formik.setFieldValue("emailHtmlContent", JSON.stringify(newContent));
                                }}
                            />

                        </Form.Group>

                    </>
                )}
            </Section >
        </>
    );
};

export default CampaignEmailer;
