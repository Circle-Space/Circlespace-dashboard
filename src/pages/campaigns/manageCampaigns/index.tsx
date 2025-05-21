import React, {
  useEffect,
  useState,
} from 'react';

import {
  Card,
  Col,
  Row,
} from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import AllConversationsIcon from '../../../assets/img/commandbar/all_chat_forum_group_message_icon.svg';
import DoNotCallIcon from '../../../assets/img/commandbar/stopcall.svg';
import CampaignCard from '../../../components/CampaignCard';
import CommandBar from '../../../components/CommandBar';
import useCampaignmanagement from '../../../hooks/useCampaignManagement';
import useEmailTemplates from '../../../hooks/useEmailTemplates';
import useLayout from '../../../hooks/useLayout';
import { Campaign } from '../../../types/campaigns/campaignTypes';

const Campaigns = () => {
  const { fetchCampaigns, campaigns, getCampaignStatus, searchCampaign } = useCampaignmanagement();
  const { getEmailTemplates } = useEmailTemplates();
  const navigate = useNavigate();
  const { setNavbarTitle } = useLayout();

  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setNavbarTitle('Campaigns');
    fetchCampaigns();
    getEmailTemplates("RESET")
    return () => {
      setNavbarTitle('');

    };
  }, []);

  const handleStatusChange = async (status: string) => {
    setSearchQuery('');
    setSelectedStatus(status);
    if (status === 'Cancelled' || status === 'Archived' || status === 'Stopped') {
      getCampaignStatus(status);
    } else {
      fetchCampaigns();
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (typeof query === 'string' && query.trim().length > 0) {
      searchCampaign(query);
    } else {
      // If the search query is empty, fetch all campaigns
      fetchCampaigns();
    }
  };

  const primaryFlowToggleButtons = {
    name: 'Campaign',
    dropDownTitle: 'Campaign Status',
    dropDownButtons: [
      {
        name: 'Canceled Campaigns',
        handleClick: () => handleStatusChange('Cancelled'),
        iconSvgSrc: DoNotCallIcon,
        iconSvgStyle: { width: '16px', height: '16px' },
      },
      {
        name: 'Stopped Campaigns',
        handleClick: () => handleStatusChange('Stopped'),
        iconSvgSrc: DoNotCallIcon,
        iconSvgStyle: { width: '16px', height: '16px' },
      },
      {
        name: 'Archives',
        handleClick: () => handleStatusChange('Archived'),
        iconSvgSrc: DoNotCallIcon,
        iconSvgStyle: { width: '16px', height: '16px' },
      },
      {
        name: 'Show All',
        handleClick: () => handleStatusChange('All'),
        iconSvgSrc: AllConversationsIcon,
        iconSvgStyle: { width: '16px', height: '16px' },
      },
    ],
  };

  return (
    <React.Fragment>
      <Helmet title="Campaigns" />
      <CommandBar
        handleNew={() => {
          navigate('create');
        }}
        handleBack={() => {
          navigate(-1);
        }}
        flowToggleButtonPrimary={primaryFlowToggleButtons}
        searchOptions={{
          handleSearch: (searchVal: string) => {
            handleSearch(searchVal);
          },
          handleClearSearch: () => {
            setSearchQuery('');
            fetchCampaigns();
            setSelectedStatus('All');
          },
          searchPlaceholder: 'Search Campaigns...',
        }}
      />

      <div style={{ marginTop: -4 }} className="analytics-command-bar p-2">
        <Row>
          {searchQuery && campaigns.length === 0 && (
            <Col md={12}>
              <Card className="py-2">
                <Card.Title className="text-center">Search Results</Card.Title>
                <div className="text-center">No records found</div>
              </Card>
            </Col>
          )}

          {searchQuery && campaigns.length > 0 && (
            <Col md={12}>
              <Card className="py-2">
                <Card.Title className="text-center">Search Results</Card.Title>
                <Row>
                  {campaigns.map((c: Campaign) => (
                    <Col xs={12} sm={6} md={4} lg={4} xl={3} className="mb-4" key={c.id}>
                      <CampaignCard campaign={c} />
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>
          )}

          {!searchQuery &&
            selectedStatus !== 'Cancelled' &&
            selectedStatus !== 'Archived' &&
            selectedStatus !== 'Stopped' &&
            campaigns.length > 0 && (
              <>
                <Col md={6}>
                  <Card.Title className="text-center mb-2">Upcoming</Card.Title>
                  <Row>
                    {campaigns
                      .filter((c: Campaign) => c.status === 'Not Started')
                      .map((c: Campaign) => (
                        <Col xs={12} sm={12} md={12} lg={6} xl={6} className="mb-3" key={c.id}>
                          <CampaignCard campaign={c} />
                        </Col>
                      ))}
                  </Row>
                </Col>
                <Col md={6} className="border-left">
                  <Card.Title className="text-center mb-2">In Progress</Card.Title>
                  <Row>
                    {campaigns
                      .filter((c: Campaign) => c.status === 'Running')
                      .map((c: Campaign) => (
                        <Col xs={12} sm={12} md={12} lg={6} xl={6} className="mb-3" key={c.id}>
                          <CampaignCard campaign={c} />
                        </Col>
                      ))}
                  </Row>
                </Col>
              </>
            )}

          {selectedStatus === 'Cancelled' && campaigns.length === 0 && (
            <Col md={12}>
              <Card className="py-2">
                <Card.Title className="text-center">Cancelled</Card.Title>
                <div className="text-center">No records found</div>
              </Card>
            </Col>
          )}

          {selectedStatus === 'Cancelled' && campaigns.length > 0 && (
            <Col md={12}>
              <Card className="py-2">
                <Card.Title className="text-center">Cancelled</Card.Title>
                <Row>
                  {campaigns
                    .filter((c: Campaign) => c.status === 'Cancelled')
                    .map((c: Campaign) => (
                      <Col xs={12} sm={6} md={4} lg={4} xl={3} className="mb-4" key={c.id}>
                        <CampaignCard campaign={c} />
                      </Col>
                    ))}
                </Row>
              </Card>
            </Col>
          )}

          {selectedStatus === 'Archived' && campaigns.length === 0 && (
            <Col md={12}>
              <Card className="py-2">
                <Card.Title className="text-center">Archived</Card.Title>
                <div className="text-center">No records found</div>
              </Card>
            </Col>
          )}

          {selectedStatus === 'Archived' && campaigns.length > 0 && (
            <Col md={12}>
              <Card className="py-2">
                <Card.Title className="text-center">Archived</Card.Title>
                <Row>
                  {campaigns
                    .filter((c: Campaign) => c.status === 'Archived')
                    .map((c: Campaign) => (
                      <Col xs={12} sm={6} md={4} lg={4} xl={3} className="mb-4" key={c.id}>
                        <CampaignCard campaign={c} />
                      </Col>
                    ))}
                </Row>
              </Card>
            </Col>
          )}

          {selectedStatus === 'Stopped' && campaigns.length === 0 && (
            <Col md={12}>
              <Card className="py-2">
                <Card.Title className="text-center">Stopped</Card.Title>
                <div className="text-center">No records found</div>
              </Card>
            </Col>
          )}

          {selectedStatus === 'Stopped' && campaigns.length > 0 && (
            <Col md={12}>
              <Card className="py-2">
                <Card.Title className="text-center">Stopped</Card.Title>
                <Row>
                  {campaigns
                    .filter((c: Campaign) => c.status === 'Stopped')
                    .map((c: Campaign) => (
                      <Col xs={12} sm={6} md={4} lg={4} xl={3} className="mb-4" key={c.id}>
                        <CampaignCard campaign={c} />
                      </Col>
                    ))}
                </Row>
              </Card>
            </Col>
          )}
        </Row>
      </div>
    </React.Fragment>
  );
};

export default Campaigns;
