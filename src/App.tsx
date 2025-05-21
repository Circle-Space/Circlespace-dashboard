import 'react-toastify/dist/ReactToastify.css';
import './i18n';

import React, { Suspense } from 'react';

import {
  Helmet,
  HelmetProvider,
} from 'react-helmet-async';
import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Loader from './components/Loader';
import AccountProvider from './contexts/AccountContext';
import ActivityLogsProvider from './contexts/ActivitylogsContext';
import AnalyticsProvider from './contexts/AnalyticsContext';
import CampaignManagementProvider from './contexts/CampaignManagementContext';
import ContactProvider from './contexts/ContactContext';
import DeviceManagementProvider from './contexts/DeviceContext';
import EmailTemplateProvider from './contexts/EmailTemplatesContext';
import FeaturesManagementProvider from './contexts/FeaturesContext';
import AuthProvider from './contexts/JWTProvider';
import LayoutProvider from './contexts/LayoutProvider';
import LogsProvider from './contexts/LogsContext';
import OpportunitiesProvider from './contexts/OpportunitiesContext';
import RolesProvider from './contexts/RolesContext';
import SidebarProvider from './contexts/SidebarProvider';
import StaticValueProvider from './contexts/StaticValuesContext';
import ThemeProvider from './contexts/ThemeProvider';
import UserManagementProvider from './contexts/UserContext';
import routes from './routes';
import ChartJsDefaults from './utils/ChartJsDefaults';
import ProductManagementProvider from './pages/productManagement/context/ProductManagementContext';
import CaseProvider from './pages/caseManagement/cases/contexts/CaseContext';
import ActivityTypeProvider from './pages/caseManagement/activityTypes/contexts/ActivityTypeContext';
import StatusProvider from './pages/caseManagement/status/contexts/StatusContext';
import PriorityProvider from './pages/caseManagement/priority/contexts/PriorityContext';
import ConfigModuleProvider from './contexts/ConfigModuleContext';

const App = () => {
  const content = useRoutes(routes);

  return (
    <>
      <HelmetProvider>
        <Helmet
          titleTemplate="%s | SMS Management"
          defaultTitle="SMS Management" />
        <Suspense fallback={<Loader />}>
          <ThemeProvider>
            <SidebarProvider>
              <LayoutProvider>
                <ChartJsDefaults />
                <LogsProvider>
                  <StaticValueProvider>
                    <ConfigModuleProvider>
                      <AccountProvider>
                        <ContactProvider>
                          <CaseProvider>
                            <StatusProvider>
                              <PriorityProvider>
                                <ActivityTypeProvider>
                                  <EmailTemplateProvider>
                                    <ActivityLogsProvider>
                                      <OpportunitiesProvider>
                                        <CampaignManagementProvider>
                                          <DeviceManagementProvider>
                                            <AnalyticsProvider>
                                              <FeaturesManagementProvider>
                                                <RolesProvider>
                                                  <UserManagementProvider>
                                                    <ProductManagementProvider>
                                                      <AuthProvider>{content}</AuthProvider>
                                                    </ProductManagementProvider>
                                                  </UserManagementProvider>
                                                </RolesProvider>
                                              </FeaturesManagementProvider>
                                            </AnalyticsProvider>
                                          </DeviceManagementProvider>
                                        </CampaignManagementProvider>
                                      </OpportunitiesProvider>
                                    </ActivityLogsProvider>
                                  </EmailTemplateProvider>
                                </ActivityTypeProvider>
                              </PriorityProvider>
                            </StatusProvider>
                          </CaseProvider>
                        </ContactProvider>
                      </AccountProvider>
                    </ConfigModuleProvider>
                  </StaticValueProvider>
                </LogsProvider>
              </LayoutProvider>
            </SidebarProvider>
          </ThemeProvider>
        </Suspense>
      </HelmetProvider>
      <ToastContainer />
    </>
  );
};

export default App;
