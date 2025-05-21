import { Navigate } from 'react-router-dom';
import { lazy } from '@loadable/component';
// Guards
import AuthGuard from './components/guards/AuthGuard';
import FeatureGuard from './components/guards/FeatureGuard';
// Layouts
import AuthLayout from './layouts/Auth';
import DashboardLayout from './layouts/Dashboard';
import EditFeaturesForm from './pages/administration/Features/EditFeaturesForm';
import Campaigns from './pages/campaigns/manageCampaigns';
import AddCampaignForm from './pages/campaigns/manageCampaigns/AddCampaignForm';
import EditCampaignForm from './pages/campaigns/manageCampaigns/EditCampaignForm';
import EmailTemp from './pages/campaigns/emails/EmailTemp';
import AdminAutomateEmail from './pages/Configurations/AutomateEmails';
//Contact
import ContactManagement from './pages/contacts';
import AddContact from './pages/contacts/AddContact';
import UpdateContact from './pages/contacts/UpdateContact/UpdateContact';
import AddAccount from './pages/customer/Account/AddAccount';
import EditAccountForm from './pages/customer/Account/EditAccountForm';
import AccountManagement from './pages/customer/Account/index';
import ActivityLogManagement from './pages/customer/ActivityLogs';
import AddActivityLogForm from './pages/customer/ActivityLogs/AddActivitylogsForm';
import EditActivityLogForm from './pages/customer/ActivityLogs/EditActivitylogsForm';
import OpportunitiesManagement from './pages/customer/Opportunities';
import AddOpportunitiesForm from './pages/customer/Opportunities/AddOpportunitiesForm';
import EditOpportunitiesForm from './pages/customer/Opportunities/EditOpportunitiesForm';
import DashboardPage from './pages/dashboard';
import AddDeviceForm from './pages/devices/AddDevice/AddDeviceForm';
import UpdateDeviceForm from './pages/devices/UpdateDevice/UpdateDeviceForm';
// import EditDeviceForm from "./pages/devices/EditDeviceForm";
//Features
import FeaturesPage from './pages/features';
import UpdateFeature from './pages/features/UpdateFeature/UpdateFeature';
import ProfilePage from './pages/profile';
//Roles
import RolesPage from './pages/roles';
import UpdateRole from './pages/roles/UpdateRole/UpdateRole';
//users
import UsersPage from './pages/users';
import UpdateUserForm from './pages/users/UpdateUser/UpdateUserForm';

//Products
import Products from './pages/productManagement/products';
import Categories from './pages/productManagement/categories';
import AddProduct from './pages/productManagement/products/AddProduct';
import AddCategory from './pages/productManagement/categories/AddCategory';
import UpdateProduct from './pages/productManagement/products/UpdateProduct';
import UpdateCategory from './pages/productManagement/categories/UpdateCategory';

//Case management
import CaseManagement from './pages/caseManagement/cases';
import AddCase from './pages/caseManagement/cases/AddCase';
import UpdateCase from './pages/caseManagement/cases/UpdateCase';
import ActivityTypeManagement from './pages/caseManagement/activityTypes';
import AddActivityType from './pages/caseManagement/activityTypes/AddActivityType';
import UpdateActivityType from './pages/caseManagement/activityTypes/UpdateActivityType';
import StatusManagement from './pages/caseManagement/status/index';
import AddStatus from './pages/caseManagement/status/AddStatus';
import UpdateStatus from './pages/caseManagement/status/UpdateStatus';
import PriorityManagement from './pages/caseManagement/priority';
import AddPriority from './pages/caseManagement/priority/AddPriority';
import UpdatePriority from './pages/caseManagement/priority/UpdateStatus';
import OpenCases from './pages/caseManagement/cases/OpenCases';
import MyCases from './pages/caseManagement/cases/MyCases';

const AddFeaturesForm = lazy(() => import('./pages/features/AddFeature/AddFeatureForm'));

const AddRolesForm = lazy(() => import('./pages/roles/AddRole/AddRole'));

const AddUserForm = lazy(() => import('./pages/users/AddUser/AddUserForm'));

// Services
const Messages = lazy(() => import('./pages/campaigns/sms'));

const DeviceManagement = lazy(() => import('./pages/devices/index'));
const Roles = lazy(() => import('./pages/administration/Roles/RolesView'));
const Features = lazy(() => import('./pages/administration/Features/FeaturesView'));

const Logs = lazy(() => import('./pages/logs/index'));

const EditRolesForm = lazy(() => import('./pages/administration/Roles/EditRolesForm'));

// Auth
const Page500 = lazy(() => import('./pages/auth/Page500'));
const Page404 = lazy(() => import('./pages/auth/Page404'));
const SignIn = lazy(() => import('./pages/auth/SignIn'));
const SignUp = lazy(() => import('./pages/auth/SignUp'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'));

const routes = [
  {
    path: '/',
    element: <Navigate to="/dashboard" />,
  },
  {
    path: '/',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
    ],
  },

  {
    path: '/services',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),

    children: [
      {
        path: 'Roles',
        element: <Roles />,
      },
      {
        path: 'Features',
        element: <Features />,
      },
      {
        path: 'sms',
        element: <Messages />,
      },
      {
        path: 'campaigns',
        element: <Campaigns />,
      },
      {
        path: 'campaigns/create',
        element: <AddCampaignForm />,
      },
      {
        path: 'campaign/edit',
        element: <EditCampaignForm />,
      },
      {
        path: 'emails',
        element: <EmailTemp />
      }
    ],
  },
  {
    path: '/product-management',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: 'products',
        element: <Products />
      },
      {
        path: 'categories',
        element: <Categories />
      },
      {
        path: 'products/create',
        element: <AddProduct />
      },
      {
        path: 'products/update/:id',
        element: <UpdateProduct />
      },
      {
        path: 'categories/create',
        element: <AddCategory />
      },
      {
        path: 'categories/update/:id',
        element: <UpdateCategory />
      }
    ]
  },
  {
    path: '/administration',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'users/add',
        element: <AddUserForm />,
      },
      {
        path: 'users/:userId',
        element: <UpdateUserForm />,
      },
      {
        path: 'roles',
        element: <RolesPage />,
      },
      {
        path: 'roles/add',
        element: <AddRolesForm />,
      },
      {
        path: 'roles/:roleId',
        element: <UpdateRole />,
      },
      {
        path: 'features',
        element: <FeaturesPage />,
      },
      {
        path: 'features/add',
        element: <AddFeaturesForm />,
      },
      {
        path: 'features/:featureId',
        element: <UpdateFeature />,
      },

      {
        path: 'UserManagement/Roles/AddRoles',
        element: <AddRolesForm />,
      },
      {
        path: 'UserManagement/Roles/EditRoles',
        element: <EditRolesForm />,
      },
      {
        path: 'UserManagement/Features',
        element: <Features />,
      },
      {
        path: 'UserManagement/Features/Addfeatures',
        element: <AddFeaturesForm />,
      },
      {
        path: 'UserManagement/Features/Editfeatures',
        element: <EditFeaturesForm />,
      },
      {
        path: 'devices',
        element: <DeviceManagement />,
      },
      {
        path: 'devices/add',
        element: <AddDeviceForm />,
      },
      {
        path: 'devices/:deviceId',
        element: <UpdateDeviceForm />,
      },
      {
        path: 'configurations/automatedemails',
        element: <AdminAutomateEmail />,
      },
      {
        path: 'Logs',
        element: (
          <FeatureGuard featureKey="LOGS">
            <Logs />
          </FeatureGuard>
        ),
      },
    ],
  },
  {
    path: '/customer',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: 'AccountManagement',
        element: <AccountManagement />,
      },
      {
        path: 'AccountManagement/AddAccount',
        element: <AddAccount />,
      },
      {
        path: 'AccountManagement/EditAccount',
        element: <EditAccountForm />,
      },
      {
        path: 'ContactManagement',
        element: <ContactManagement />,
      },
      {
        path: 'ContactManagement/AddContact',
        element: <AddContact />,
      },
      {
        path: 'ContactManagement/UpdateContact/:userId',
        element: <UpdateContact />,
      },
      {
        path: 'Activitylogs',
        element: <ActivityLogManagement />,
      },
      {
        path: 'Activitylogs/AddActivityLogs',
        element: <AddActivityLogForm />,
      },
      {
        path: 'Activitylogs/EditActivityLogs',
        element: <EditActivityLogForm />,
      },
      {
        path: 'Opportunities',
        element: <OpportunitiesManagement />,
      },
      {
        path: 'Opportunities/AddOpportunities',
        element: <AddOpportunitiesForm />,
      },
      {
        path: 'Opportunities/EditOpportunities',
        element: <EditOpportunitiesForm />,
      },
    ],
  },
  {
    path: '/case',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: 'CaseManagement',
        element: <CaseManagement />,
      },
      {
        path: 'CaseManagement/OpenCases',
        element: <OpenCases />,
      },
      {
        path: 'CaseManagement/OpenCases/AddCase',
        element: <AddCase />,
      },
      {
        path: 'CaseManagement/OpenCases/UpdateCase/:caseId',
        element: <UpdateCase />,
      },
      {
        path: 'CaseManagement/MyCases',
        element: <MyCases />,
      },
      {
        path: 'CaseManagement/MyCases/AddCase',
        element: <AddCase />,
      },
      {
        path: 'CaseManagement/MyCases/UpdateCase/:caseId',
        element: <UpdateCase />,
      },
      {
        path: 'CaseManagement/AddCase',
        element: <AddCase />,
      },
      {
        path: 'CaseManagement/UpdateCase/:caseId',
        element: <UpdateCase />,
      },
      {
        path: 'ActivityTypeManagement',
        element: <ActivityTypeManagement />,
      },
      {
        path: 'ActivityTypeManagement/AddActivityType',
        element: <AddActivityType />,
      },
      {
        path: 'ActivityTypeManagement/UpdateActivityType/:activityTypeId',
        element: <UpdateActivityType />,
      },
      {
        path: 'StatusManagement',
        element: <StatusManagement />,
      },
      {
        path: 'StatusManagement/AddStatus',
        element: <AddStatus />,
      },
      {
        path: 'StatusManagement/UpdateStatus/:statusId',
        element: <UpdateStatus />,
      },
      {
        path: 'PriorityManagement',
        element: <PriorityManagement />,
      },
      {
        path: 'PriorityManagement/AddPriority',
        element: <AddPriority />,
      },
      {
        path: 'PriorityManagement/UpdatePriority/:priorityId',
        element: <UpdatePriority />,
      },
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'sign-in',
        element: <SignIn />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
      {
        path: 'reset-password',
        element: <ResetPassword />,
      },
      {
        path: '404',
        element: <Page404 />,
      },
      {
        path: '500',
        element: <Page500 />,
      },
    ],
  },
  {
    path: '*',
    element: <AuthLayout />,
    children: [
      {
        path: '*',
        element: <Page404 />,
      },
    ],
  },

  {
    path: '/profile',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: '',
        element: <ProfilePage />,
      },
    ],
  },
];

export default routes;
