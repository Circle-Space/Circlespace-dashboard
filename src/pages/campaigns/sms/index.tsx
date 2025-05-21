import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';

import CommandBar from '../../../components/CommandBar';
import LoadingOverlay from '../../../components/LoadingOverlay';
import useAnalytics from '../../../hooks/useAnalytics';
import useCampaignmanagement from '../../../hooks/useCampaignManagement';
import useDeviceManagement from '../../../hooks/useDeviceMangement';
import useLayout from '../../../hooks/useLayout';
import { PaginationType } from '../../../types/apiResponse';
import { Campaign } from '../../../types/campaigns/campaignTypes';
import Chat from './components/Chat';
import { SelectOption } from '../../../types/SelectOption';
import { ChatDots, ClockHistory } from 'react-bootstrap-icons';
import { FlowToggleButton } from '../../../types/commandbar';
import useAuth from '../../../hooks/useAuth';

const Messages = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [deviceLoading, setDeviceLoading] = useState(false);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [chatIniating, setChatIniating] = useState(false);
  const [conversationState, setConversationState] = useState('Show All');
  const [device, setDevice] =  useState<SelectOption | null>(null);

  const {
    getConversationByDeviceId,
    getActiveConversationByDeviceId,
    getInboundConversationByDeviceId,
    getConversationByConvType,
    getConversationBySearchFilter,
    getConversationByCampaignId,
    clearDevices,
  } = useDeviceManagement();
  const { getDeviceAnalytics } = useAnalytics();
  const { fetchCampaigns, campaigns } = useCampaignmanagement();
  const { setNavbarTitle } = useLayout();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false); // State to track if a search has been performed
  const [searchResultsCount, setSearchResultsCount] = useState(0);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const { user } = useAuth();

  const campaignOptions: FlowToggleButton = useMemo(() => {
    return {
      name: "Select Campaign...",
      icon: "BagCheck",
      options: campaigns
      .filter(c => c.deviceId === device?.value && c.status === 'Running')
      .map(c => ({ 
        label: c.name,
        value: c.id,
        icon: 'XCircle',
        handleClick: () => {
          setSelectedCampaign(c)
        } 
      }))
    }
  }, [campaigns, device]);

  useEffect(() => {
    //set default campaign
    const c = campaigns.filter(campaign => {
      return campaign.deviceId === device?.value && campaign.status === 'Running';
    });

    setSelectedCampaign(c[0] || null);

  }, [campaigns]);


  useEffect(() => {
    const fetchCampaignId = async () => {
      await fetchCampaigns();
      const c = campaigns.find(campaign => campaign.deviceId === device?.value && campaign.status === 'Running');
      if (c) {
        setSelectedCampaign(c);
      }
    };

    fetchCampaignId();

    setNavbarTitle('Chat');
    document.body.style.overflow = 'hidden';

    return () => {
      setNavbarTitle('');
      //clearDevices(); todo....
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    setSelectedCampaign(null)
  }, [device]) 

  useEffect(() => {
    setConversationState('Waiting For Agent');
    if (selectedCampaign && device) {
      setDeviceLoading(true)
      getInboundConversationByDeviceId(device.value, selectedCampaign.id, "RESET", () => setDeviceLoading(false));
    }
  }, [device, selectedCampaign]);

  useEffect(() => {
    setNavbarTitle(conversationState);
  }, [conversationState]);

  // Used to determine which endpoint to call when hitting load more.
  const functionMap: { [key: string]: (paginationType: PaginationType) => void } = {
    ['Waiting For Agent']: (type: PaginationType) => {
      if (selectedCampaign && device) {
        getInboundConversationByDeviceId(device.value, selectedCampaign.id, type, () => setDeviceLoading(false));
      }
    },

    ['Active Conversations']: (type: PaginationType) => {
      if (selectedCampaign && device) {
        getActiveConversationByDeviceId(device.value, selectedCampaign.id, type, () => setDeviceLoading(false));
      }
    },

    ['Show All']: (type: PaginationType) => {
      if (selectedCampaign && device) {
        getConversationByCampaignId(device.value, selectedCampaign.id, type, () => setDeviceLoading(false));
      }
    },
    ['Do Not Call']: (type: PaginationType) => {
      if (selectedCampaign && device) {
        getConversationByConvType(device.value, selectedCampaign.id, 'DoNotCall', 'SMS', type, () => setDeviceLoading(false));
      }
    },

    ['Interested']: (type: PaginationType) => {
      if (selectedCampaign && device) {
        getConversationByConvType(device.value, selectedCampaign.id, 'Interested', 'SMS', type, () => setDeviceLoading(false));
      }
    },
    ['Not Interested']: (type: PaginationType) => {
      if (selectedCampaign && device) {
        getConversationByConvType(device.value, selectedCampaign.id, 'NotInterested', 'SMS', type, () => setDeviceLoading(false));
      }
    },

    ['Quoted']: (type: PaginationType) => { },

    ['Follow-Up']: (type: PaginationType) => {
      if (selectedCampaign && device) {
        getConversationByConvType(device.value, selectedCampaign.id, 'FollowUp', 'SMS', type, () => setDeviceLoading(false));
      }
    },

    ['Appointments']: (type: PaginationType) => {
      if (selectedCampaign && device) {
        getConversationByConvType(device.value, selectedCampaign.id, 'Appointments', 'SMS', type, () => setDeviceLoading(false));
      }
    },

    ['Appointment Sent']: (type: PaginationType) => {
      if (selectedCampaign && device) {
        getConversationByConvType(device.value, selectedCampaign.id, 'AppointmentSent', 'SMS', type, () => setDeviceLoading(false));
      }
    },

    ['Appointment Set']: (type: PaginationType) => {
      if (selectedCampaign && device) {
        getConversationByConvType(device.value, selectedCampaign.id, 'AppointmentSet', 'SMS', type, () => setDeviceLoading(false));
      }
    },
    ['Sold']: (type: PaginationType) => {
      if (selectedCampaign && device) {
        getConversationByConvType(device.value, selectedCampaign.id, 'Sold', 'SMS', type, () => setDeviceLoading(false));
      }
    },

    ['Failed']: (type: PaginationType) => {
      if (selectedCampaign && device) {
        getConversationByConvType(device.value, selectedCampaign.id, 'Failed', 'SMS', type, () => setDeviceLoading(false));
      }
    },

    ['Search']: (type: PaginationType) => getConversationBySearchFilter(device?.value, '', type),
  };

  const getAll = () => {
    setConversationState('Show All');
    if (selectedCampaign && device) {
      setDeviceLoading(true);
      getConversationByCampaignId(device.value, selectedCampaign.id, 'RESET', () => setDeviceLoading(false));
    }
  };

  const handleSearch = (searchVal: string) => {
    setSearched(true);
    setConversationState('Search');
    if (typeof searchVal === "string" && searchVal.trim().length > 0) {
      getConversationBySearchFilter(device?.value, searchVal, "RESET");
    }
  };

const primaryFlowToggleButtons: FlowToggleButton = {
  name: 'Conversations',
  icon: 'ChatDots',
  options: [
    {
      value: 'waiting',
      label: 'Waiting for Agent',
      icon: 'ClockHistory',
      handleClick: () => {
        if (selectedCampaign && device) {
          setConversationState('Waiting For Agent');
          setDeviceLoading(true);
          getInboundConversationByDeviceId(device.value, selectedCampaign.id, 'RESET', () => setDeviceLoading(false));
        }
      },
    },
    {
      value: 'active',
      label: 'Active Conversations',
      icon: 'ChatLeftText',
      handleClick: () => {
        if (selectedCampaign && device) {
          setConversationState('Active Conversations');
          setDeviceLoading(true);
          getActiveConversationByDeviceId(device.value, selectedCampaign.id, 'RESET', () => setDeviceLoading(false));
        }
      },
    },
    {
      value: 'all',
      label: 'Show All',
      icon: 'Collection',
      handleClick: getAll,
    },
  ],
};

const secondaryFlowToggleButtons: FlowToggleButton = {
  name: 'Campaign Flows',
  icon: 'Diagram3Fill',
  options: [
    {
      value: 'doNotCall',
      label: 'Do Not Call',
      icon: 'TelephoneX',
      handleClick: () => {
        if (selectedCampaign && device) {
          setConversationState('Do Not Call');
          setDeviceLoading(true);
          getConversationByConvType(device.value, selectedCampaign.id, 'DoNotCall', 'SMS', 'RESET', () => setDeviceLoading(false));
        }
      },
    },
    {
      value: 'interested',
      label: 'Interested',
      icon: 'HandThumbsUp',
      handleClick: () => {
        if (selectedCampaign && device) {
          setConversationState('Interested');
          setDeviceLoading(true);
          getConversationByConvType(device.value, selectedCampaign.id, 'Interested', 'SMS', 'RESET', () => setDeviceLoading(false));
        }
      },
    },
    {
      value: 'notInterested',
      label: 'Not Interested',
      icon: 'HandThumbsDown',
      handleClick: () => {
        if (selectedCampaign && device) {
          setConversationState('Not Interested');
          setDeviceLoading(true);
          getConversationByConvType(device.value, selectedCampaign.id, 'NotInterested', 'SMS', 'RESET', () => setDeviceLoading(false));
        }
      },
    },
    {
      value: 'quoted',
      label: 'Quoted',
      icon: 'Cash',
      handleClick: () => {
        if (selectedCampaign && device) {
          setConversationState('Quoted');
          setDeviceLoading(true);
          getConversationByConvType(device.value, selectedCampaign.id, 'Quoted', 'SMS', 'RESET', () => setDeviceLoading(false));
        }
      },
    },
    {
      value: 'followUp',
      label: 'Follow-Up',
      icon: 'Calendar2Check',
      handleClick: () => {
        if (selectedCampaign && device) {
          setConversationState('Follow-Up');
          setDeviceLoading(true);
          getConversationByConvType(device.value, selectedCampaign.id, 'FollowUp', 'SMS', 'RESET', () => setDeviceLoading(false));
        }
      },
    },
    {
      value: 'appointments',
      label: 'Appointments',
      icon: 'Calendar2Date',
      handleClick: () => {
        if (selectedCampaign && device) {
          setConversationState('Appointments');
          setDeviceLoading(true);
          getConversationByConvType(device.value, selectedCampaign.id, 'Appointments', 'SMS', 'RESET', () => setDeviceLoading(false));
        }
      },
    },
    {
      value: 'appointmentSent',
      label: 'Appointment Sent',
      icon: 'SendCheck',
      handleClick: () => {
        if (selectedCampaign && device) {
          setConversationState('Appointment Sent');
          setDeviceLoading(true);
          getConversationByConvType(device.value, selectedCampaign.id, 'AppointmentSent', 'SMS', 'RESET', () => setDeviceLoading(false));
        }
      },
    },
    {
      value: 'appointmentSet',
      label: 'Appointment Set',
      icon: 'CalendarCheck',
      handleClick: () => {
        if (selectedCampaign && device) {
          setConversationState('Appointment Set');
          setDeviceLoading(true);
          getConversationByConvType(device.value, selectedCampaign.id, 'AppointmentSet', 'SMS', 'RESET', () => setDeviceLoading(false));
        }
      },
    },
    {
      value: 'sold',
      label: 'Sold',
      icon: 'BagCheck',
      handleClick: () => {
        if (selectedCampaign && device) {
          setConversationState('Sold');
          setDeviceLoading(true);
          getConversationByConvType(device.value, selectedCampaign.id, 'Sold', 'SMS', 'RESET', () => setDeviceLoading(false));
        }
      },
    },
    {
      value: 'failed',
      label: 'Failed',
      icon: 'XCircle',
      handleClick: () => {
        if (selectedCampaign && device) {
          setConversationState('Failed');
          setDeviceLoading(true);
          getConversationByConvType(device.value, selectedCampaign.id, 'Failed', 'SMS', 'RESET', () => setDeviceLoading(false));
        }
      },
    },
  ],
};

  const selectDevicesDropdown: FlowToggleButton = {
    name: "Select Device...",
    icon: "BagCheck",
    options: user?.Devices.map(d => ({
      value: d.Id, 
      label: d.PhoneNumber,
      icon: 'XCircle',
      handleClick: () => {
        setDevice({value: d.Id, label: d.PhoneNumber})
      }
    })) || []
  }


  const toggleSidebar = () => {
    debugger;
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <React.Fragment>
      <LoadingOverlay loading={deviceLoading || chatIniating || analyticsLoading} />

      <Helmet title="Messages Dashboard" />

      {/** -----------------Chat CommandBar -------------------->  */}
      <CommandBar
        handleBack={() => {
          navigate(-1);
        }}
        handleNew={() => {
          setAddModalOpen(addModalOpen => !addModalOpen);
        }}
        searchOptions={{
          handleSearch: (searchVal: string) => {
            handleSearch(searchVal);
          },
          handleClearSearch: () => {
            setSearched(false);
            getAll();
          },
          searchPlaceholder: 'Search Chat...',
        }}
        flowToggleButtons={[
          selectDevicesDropdown,
          campaignOptions,
          primaryFlowToggleButtons,
          secondaryFlowToggleButtons,
        ].filter(f => f.options.length > 0)}

      />

      {/* <h1 className="dashboard-header-text mb-1 p-2">Campaign Converse</h1>
            <p className="sub-header p-2">
              Step into the communication hub where your marketing efforts meet real conversations. Select a campaign to unveil your leads,
              then dive into a dialogue that converts. Each SMS is a step towards success. Let the engagement begin!
            </p> */}

      {/* <SelectActiveCampaigns deviceId={id} selectedCampaign={selectedCampaign}  /> */}

      <Chat
        device={device}
        selectedCampaign={selectedCampaign}
        showModalOpen={addModalOpen}
        setModalOpen={setAddModalOpen}
        setChatIniating={setChatIniating}
        resetSearch={getAll}
        fetchConversation={functionMap[conversationState]}
        toggleSidebar={toggleSidebar}
        showSidebar={sidebarVisible}
      />
    </React.Fragment>
  );
};

export default Messages;
