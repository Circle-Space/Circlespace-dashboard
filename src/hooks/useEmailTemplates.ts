import { useContext } from 'react';

import { EmailTemplateContext } from '../contexts/EmailTemplatesContext';

const useEmailTemplates = () => {
  const context = useContext(EmailTemplateContext);

  if (!context) {
    throw new Error('EmailTemplateContext must be placed within EmailTemplateManagementProvider');
  }

  return context;
};

export default useEmailTemplates;
