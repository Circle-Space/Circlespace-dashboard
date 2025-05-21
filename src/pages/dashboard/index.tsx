import React, {
    useEffect,
    useState,
} from 'react';

import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

import useLayout from '../../hooks/useLayout';
import SelectDashboard from './SelectDashboard';
import useAnalytics from '../../hooks/useAnalytics';
import DragAndDropDashboard from './DragAndDropDashboard';
import {
    ChartData,
    ConversationStatusSummary,
    UserActivityReport,
} from '../../types/analytics/analyticsTypes';

const DashboardPage = () => {
    const [selectedCampaign, setSelectedCampaign] = useState<string>('Default'); // Set initial value to 'Default'
    const { campaignAnalytics, contactsUnsubscriptionRateAnalytics, deviceUsageAndEngagementAnalytics, userActivityReport, conversationStatusSummary } = useAnalytics();

    const { setNavbarTitle } = useLayout();

    const truncateString = (str: string, maxLength: number) => {
        return str.length > maxLength ? `${str.slice(0,maxLength)}...` : str
    }
  
    const barChartData2 = [
        ['CampaignName', 'Total Contacts', 'Unsubscribed Contacts'],
        [campaignAnalytics[0]?.CampaignName || 'No Campaign',
        contactsUnsubscriptionRateAnalytics[0]?.TotalContacts || 0,
        contactsUnsubscriptionRateAnalytics[0]?.UnsubscribedContacts || 0],
    ];

    const contactUnsubscribeData = [
        ['CampaignName', 'Total Contacts', 'Unsubscribed Contacts'],
        ...contactsUnsubscriptionRateAnalytics.slice(0, 10).map(a => [a.CampaignName, a.TotalContacts, a.UnsubscribedContacts])
    ];

    const deviceUsageData = [
        ['DeviceName', 'Conversations Count'],
        ...deviceUsageAndEngagementAnalytics.map(a => [a.DeviceName, a.ConversationsCount])
    ];

    const campaignAnalyticsData = [
        ['Campaign Name', 'Total Messages Sent', 'Successful Messages'],
        ...campaignAnalytics.slice(0, 10).map(a => [a.CampaignName, a.TotalMessagesSent, a.SuccessfulMessages])
    ];

    const userActivityData = [
        ['User', 'Messages Sent', 'Conversations Started'],
        ...userActivityReport.map((report: UserActivityReport) => [report.Username, report.MessagesSent, report.ConversationsStarted])
    ];

    const convStatusData = [
        ['Status', 'Number of Conversations'],
        ...conversationStatusSummary.map((summary: ConversationStatusSummary) => [summary.Status, summary.NumberOfConversations])
    ];

      // default data
      const defaultDashboardData: ChartData[] = [
        { id: 'pie', chartType: 'ColumnChart', title: 'Campaign Analytics ', data: campaignAnalyticsData },
        { id: 'bar', chartType: 'ColumnChart', title: 'Contacts Unsubscription Rate Analytics ', data: contactUnsubscribeData },
        { id: 'line', chartType: 'Histogram', title: 'Device Usage and Engagement Analytics ', data: deviceUsageData },
        { id: 'column', chartType: 'ColumnChart', title: 'User Activity Report ', data: userActivityData },
        { id: 'histogram', chartType: 'PieChart', title: 'Conversation Status Summary ', data: convStatusData }
    ];

    const campaighDashboardData: ChartData[] = [
        { id: 'chart1', chartType: 'BarChart', title: 'Campaign Analytics ', data: campaignAnalyticsData },
        { id: 'chart2', chartType: 'BarChart', title: 'Contacts Unsubscription Rate Analytics ', data: barChartData2  },
    ];

    useEffect(() => {
        setNavbarTitle("Dashboard");
    }, []);

    const getDashboard = () => {
        if(selectedCampaign === "Campaign Dashboard") {
            return campaighDashboardData
        } else {
            return defaultDashboardData
        }
    }

    return (
        <React.Fragment>
            <Helmet title="Dashboard" />
            <Container fluid className="p-0 h-100">
                <SelectDashboard
                    selectedCampaign={selectedCampaign}
                    setSelectedCampaign={setSelectedCampaign}
                />
                <DragAndDropDashboard
                    dashboardName={selectedCampaign}
                    data={getDashboard()}
                />
            </Container>
        </React.Fragment>
    );
};

export default DashboardPage;
