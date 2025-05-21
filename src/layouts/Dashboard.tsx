import React, {
  ReactNode,
  Suspense,
  useEffect,
} from 'react';

import { Outlet } from 'react-router-dom';

import Content from '../components/Content';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import Main from '../components/Main';
import Navbar from '../components/navbar/Navbar';
import Sidebar from '../components/sidebar/Sidebar';
import Wrapper from '../components/Wrapper';
import useAuth from '../hooks/useAuth';
import useLayout from '../hooks/useLayout';
import useSidebar from '../hooks/useSidebar';

interface DashboardProps {
  children?: ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  const { user } = useAuth();
  const { items } = useSidebar();
  const { setNavbarTitle } = useLayout();

  useEffect(() => {
    setNavbarTitle("Dashboard");
    return () => {
      setNavbarTitle("");
    };
  }, []);

  const hasLogsFeature = user?.Features.includes("LOGS");
  const hasUserFeature = user?.Features.includes("USER");
  const hasDeviceFeature = user?.Features.includes("DEVICE");
  const hasAccountFeature = user?.Features.includes("ACCOUNT");
  const hasContactFeature = user?.Features.includes("CONTACT");
  const hasReportingFeature = user?.Features.includes("REPORTING");
  const hasConfigurationFeature = user?.Features.includes("CONFIGURATIONS");
  const hasLogActivityFeature = user?.Features.includes("LOG ACTIVITY");
  const hasOpportunitiesFeature = user?.Features.includes("OPPORTUNITIES");
  const hasProductFeature = user?.Features.includes("PRODUCT");
  const hasCategoriesFeature = user?.Features.includes("PRODUCT CATEGORIES");
  const hasCaseFeature = user?.Features.includes("CASES");



  // Hide the "Administration" section and its title if the user does not have any of the features "LOGS", "USER", and "DEVICE"
  const hideAdministration = !hasLogsFeature && !hasUserFeature && !hasDeviceFeature;

  const hideProduct = !hasProductFeature && !hasCategoriesFeature;

  const hideCase = !hasCaseFeature

  // Hide the "Customer" section and its title if the user does not have the "ACCOUNT" and "CONTACT" features
  const hideCustomer = !hasAccountFeature && !hasContactFeature && !hasReportingFeature && !hasConfigurationFeature && !hasLogActivityFeature && !hasOpportunitiesFeature;

  // Filter out the "Administration" and "Customer" sections if the user does not have the required features
  const finalSidebarItems = items.filter((item) => {
    if (hideAdministration && item.title === "Administration") {
      return false; // Exclude "Administration" if the user doesn't have required features
    }
    if (hideCustomer && item.title === "Customers") {
      return false; // Exclude "Customers" if the user doesn't have required features
    }
    if (hideProduct && item.title === "Product Management") {
      return false; // Exclude "Product Management" if the user doesn't have required features
    }
    if (hideCase && item.title === "Case Management") {
      return false; // Exclude "Case Management" if the user doesn't have required features
    }
    return true; // Include other sections
  });


  return (
    <React.Fragment>
      <Wrapper>
        <Sidebar items={finalSidebarItems} />
        <Main>
          <Navbar />
          <Content>
            <Suspense fallback={<Loader />}>
              {children}
              <Outlet />
            </Suspense>
          </Content>
          <Footer />
        </Main>
      </Wrapper>
    </React.Fragment>
  );
};

export default Dashboard;