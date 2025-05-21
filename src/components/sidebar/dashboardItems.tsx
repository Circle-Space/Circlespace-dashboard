import {
  Archive,
  BookOpen,
  Clipboard,
  Settings,
  TrendingUp,
  User,
} from 'react-feather';

import {
  faBuilding,
  faBullhorn,
  faCalendarDay,
  faChartSimple,
  faClipboardCheck,
  faClipboardList,
  faComments,
  faEnvelope,
  faEye,
  faFileEdit,
  faHourglass,
  faInbox,
  faRocket,
  faSlidersH,
  faTachometerAlt,
  faTools,
  faUserCog,
  faUserFriends,
  faUserPen,
  faUsersCog,
  faPhone,
  faBorderAll
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  NavItemsType,
  SidebarItemsType,
} from '../../types/sidebar';

const faIconSolidColor = 'rgba(233, 236, 239, 0.5)';
const faIconSize = '20px';

const faIcons = {
  ClipboardList: () => <FontAwesomeIcon icon={faClipboardList} style={{ fontSize: faIconSize, color: faIconSolidColor }} />,
  PostInbox: () => <FontAwesomeIcon icon={faInbox} style={{ fontSize: faIconSize, color: faIconSolidColor }} />,
  PostEdit: () => <FontAwesomeIcon icon={faFileEdit} style={{ fontSize: faIconSize, color: faIconSolidColor }} />,
  ChartSimple: () => <FontAwesomeIcon icon={faChartSimple} style={{ fontSize: faIconSize, color: faIconSolidColor }} />,
  HistoricalHours: () => <FontAwesomeIcon icon={faHourglass} style={{ fontSize: faIconSize, color: faIconSolidColor }} />,
  CalendarDays: () => <FontAwesomeIcon icon={faCalendarDay} style={{ fontSize: faIconSize, color: faIconSolidColor }} />,
  Eyes: () => <FontAwesomeIcon icon={faEye} style={{ fontSize: faIconSize, color: faIconSolidColor }} />,
  UserEditPen: () => <FontAwesomeIcon icon={faUserPen} style={{ fontSize: faIconSize, color: faIconSolidColor }} />,
  UserRoles: () => <FontAwesomeIcon icon={faUsersCog} style={{ fontSize: faIconSize, color: faIconSolidColor }} />,
  UserFeature: () => <FontAwesomeIcon icon={faUserCog} style={{ fontSize: faIconSize, color: faIconSolidColor }} />,
  Building: () => <FontAwesomeIcon icon={faBuilding} style={{ fontSize: faIconSize, color: faIconSolidColor }} />,
  UserFriends: () => <FontAwesomeIcon icon={faUserFriends} style={{ fontSize: faIconSize, color: faIconSolidColor }} />,
  Tools: () => <FontAwesomeIcon icon={faTools} style={{ fontSize: faIconSize, color: faIconSolidColor }} />,
  ClipboardCheck: () => <FontAwesomeIcon icon={faClipboardCheck} style={{ fontSize: faIconSize, color: faIconSolidColor }} />,
  Bullhorn: () => <FontAwesomeIcon icon={faBullhorn} style={{ fontSize: faIconSize, color: faIconSolidColor }} />,
  TachometerAlt: () => <FontAwesomeIcon icon={faTachometerAlt} style={{ fontSize: faIconSize, color: faIconSolidColor }} />,
  Comments: () => <FontAwesomeIcon icon={faComments} style={{ fontSize: faIconSize, color: faIconSolidColor }} />,
  Rocket: () => <FontAwesomeIcon icon={faRocket} style={{ fontSize: faIconSize, color: faIconSolidColor }} />,
  SlidersH: () => <FontAwesomeIcon icon={faSlidersH} style={{ fontSize: faIconSize, color: faIconSolidColor }} />,
  Envelope: () => <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: faIconSize, color: faIconSolidColor }} />,
  Phone: () => <FontAwesomeIcon icon={faPhone} style={{ fontSize: faIconSize, color: faIconSolidColor }} />,
  BorderAll: () => <FontAwesomeIcon icon={faBorderAll} style={{ fontSize: faIconSize, color: faIconSolidColor }} />,
};

const generalSection = [
  {
    href: '/dashboard',
    icon: faIcons.TachometerAlt,
    title: 'Dashboard',
  },
] as SidebarItemsType[];

const servicesSection = [
  {
    href: '/services/campaigns',
    icon: faIcons.Bullhorn,
    title: 'Campaigns',
    featureKey: 'Campaigns'
  },
  {
    href: '/services/sms',
    icon: faIcons.Phone,
    title: 'SMS',
    featureKey: 'Campaigns',
  },
  {
    href: '/services/emails',
    icon: faIcons.Envelope,
    title: 'Emails',
  },

] as SidebarItemsType[];

const productSection = [
  {
    href: '/product-management/products',
    icon: faIcons.Bullhorn,
    title: 'Products',
    featureKey: 'PRODUCT',
  },
  {
    href: '/product-management/categories',
    icon: faIcons.Bullhorn,
    title: "Categories",
    featureKey: 'PRODUCT CATEGORIES',
  }
]
const usersSection = [
  {
    href: '/users',
    icon: User,
    title: 'Users',
  },
] as SidebarItemsType[];

const reportSections = [
  {
    href: '',
    icon: faIcons.ChartSimple,
    title: 'Reporting',
    featureKey: 'REPORTING',
    children: [
      {
        href: '',
        icon: Archive,
        title: 'Assignments',
      },
      {
        href: '',
        icon: Clipboard,
        title: 'Skills',
      },
    ],
  },
] as SidebarItemsType[];

const configurationsSections = [
  {
    href: '',
    icon: faIcons.SlidersH,
    title: 'Configurations',
    featureKey: 'CONFIGURATIONS',
    children: [],
  },
] as SidebarItemsType[];

const administrationSections = [
  {
    href: '/administration/users',
    title: 'Users',
    icon: faIcons.UserEditPen,
    featureKey: 'USER',
  },
  {
    href: '/administration/roles',
    title: 'Roles',
    icon: faIcons.UserRoles,
    featureKey: 'USER',
  },
  {
    href: '/administration/features',
    title: 'Features',
    icon: faIcons.UserFeature,
    featureKey: 'USER',
  },
  {
    href: '/administration/devices',
    title: 'Devices',
    icon: faIcons.Tools,
    featureKey: 'DEVICE',
  },
  {
    href: "",
    icon: Settings,
    title: "Configurations",
    children: [
      {
        title: "Email Settings",
        children: [
          {
            href: "/administration/configurations/automatedemails",
            title: "Automated Emails",
          }
        ]
      },
      {
        title: "Case Settings",
        children: [
          {
            href: '/case/ActivityTypeManagement',
            title: 'Activity Types',
            icon: faIcons.Building,
          },
          {
            href: '/case/StatusManagement',
            title: 'Statuses',
            icon: faIcons.Building,
          },
          {
            href: '/case/PriorityManagement',
            title: 'Priorities',
            icon: faIcons.Building,
          },
        ]
      },

    ],
  },
  {
    href: '/administration/logs',
    icon: faIcons.ClipboardCheck,
    title: 'Logs',
    featureKey: 'LOGS',
    // badge: '3',
  },
] as SidebarItemsType[];

const CustomerSections = [
  {
    href: '/customer/AccountManagement',
    title: 'Accounts',
    icon: faIcons.Building,
    featureKey: 'ACCOUNT',
  },
  {
    href: '/customer/ContactManagement',
    title: 'Contacts',
    icon: faIcons.UserFriends,
    featureKey: 'CONTACT',
  },
  {
    href: '/customer/Activitylogs',
    title: 'Log Activity',
    icon: BookOpen,
    featureKey: 'LOG ACTIVITY',
  },
  {
    href: '/customer/Opportunities',
    title: 'Opportunities',
    icon: TrendingUp,
    featureKey: 'OPPORTUNITIES',
  },
] as SidebarItemsType[];

const CaseSections = [
  {
    href: '/case/CaseManagement',
    title: 'Cases',
    icon: faIcons.Building,
    featureKey: 'CASES',
  },
  {
    href: '/case/CaseManagement/OpenCases',
    title: 'Open Cases',
    icon: faIcons.Building,
  },
  {
    href: '/case/CaseManagement/MyCases',
    title: 'My Cases',
    icon: faIcons.Building,
  },

] as SidebarItemsType[];


const navItems = [
  {
    title: '',
    pages: generalSection,
  },
  {
    title: 'Campaign Management',
    pages: servicesSection,
  },
  {
    title: 'Customers',
    pages: CustomerSections,
  },
  {
    title: 'Case Management',
    pages: CaseSections,
  },
  {
    title: 'Product Management',
    pages: productSection,
  },
  {
    title: '',
    pages: reportSections,
  },
  {
    title: '',
    pages: configurationsSections,
  },
  {
    title: 'Administration',
    pages: administrationSections,
  },
] as NavItemsType[];

export default navItems;
