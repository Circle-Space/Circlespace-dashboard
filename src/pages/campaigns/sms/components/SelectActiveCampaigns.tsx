import React, { useEffect, useMemo, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import useCampaignmanagement from '../../../../hooks/useCampaignManagement';
import { Campaign } from '../../../../types/campaigns/campaignTypes';
import { SelectOption } from '../../../../types/SelectOption';

interface Props {
  deviceId: string;
  selectedCampaign: Campaign | null;
  setSelectedCampaign: (campaign: Campaign) => void;
}

const SelectActiveCampaigns = ({ deviceId, selectedCampaign, setSelectedCampaign }: Props) => {
  const { campaigns } = useCampaignmanagement();
  const [filteredCampaigns, setFilteredCampaigns] = useState<SelectOption[]>([]);
  const [optionSelected, setOptionSelected] = useState<SelectOption | null>(null);

  const campaignOptions = useMemo(() => {
    return campaigns
      .filter(c => c.deviceId === deviceId && c.status === 'Running')
      .map(c => ({ label: c.name, value: c.id }));
  }, [campaigns, deviceId]);

  useEffect(() => {
    setFilteredCampaigns(campaignOptions);

    if (!optionSelected && selectedCampaign && selectedCampaign.id) {
      const option = campaignOptions.find(c => c.value === selectedCampaign.id);
      if (option) {
        setOptionSelected(option);
      }
    }

    if (campaignOptions && campaignOptions.length === 0) {
      setOptionSelected(null);
      setFilteredCampaigns([]);
    }
  }, [campaignOptions, selectedCampaign, optionSelected]);

  return (
    <div>
      {filteredCampaigns && filteredCampaigns.length === 0 ? (
        <h1 className="dashboard-header-text mb-3">{'No Campaigns Available'}</h1>
      ) : (
        <Form.Group >
          <Form.Label>Select Active Campaigns</Form.Label>
          <Select
            className="react-select-container"
            options={filteredCampaigns}
            value={optionSelected}
            onChange={option => {
              const campaign = campaigns.find(c => c.id === option?.value);
              setOptionSelected(option);
              if (campaign) {
                setSelectedCampaign(campaign);
              }
            }}
          />
        </Form.Group>
      )}
    </div>
  );
};

export default SelectActiveCampaigns;
