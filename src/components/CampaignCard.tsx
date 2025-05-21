import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { Button, Card, Dropdown } from 'react-bootstrap';
import { MoreVertical, Play, X, XOctagon } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { faDownload, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { apiConfig } from '../config';
import useCampaignmanagement from '../hooks/useCampaignManagement';
import { Campaign } from '../types/campaigns/campaignTypes';
import ModalBase from './ModalBase';

interface Props {
  campaign: Campaign;
}

const CampaignCard = ({ campaign }: Props) => {
  const navigate = useNavigate();
  const { deleteCampaign, campaignstatus, fetchCampaigns, getCampaignStatus } =
    useCampaignmanagement();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleEdit = () => {
    navigate("/services/campaign/edit", { state: campaign });
  };

  const handleDelete = () => {
    deleteCampaign(campaign.id);
    setShowDelete(false);
  };

  const handleStatusChange = async (newStatus: string) => {
    await campaignstatus(campaign.id.toString(), newStatus);

    if (campaign.status === "Not Started" || campaign.status === "Running") {
      fetchCampaigns();
    } else {
      getCampaignStatus(campaign.status);
    }
  };

  const getBackgroundStatusColor = (status: string) => {
    switch (status) {
      case "Not Started":
        return "yellow";
      case "Running":
        return "limegreen";
      default:
        return "grey";
    }

    return status === "Running" ? "limegreen" : "yellow";
  };

  const getColor = (status: string) => {
    switch (status) {
      case "Not Started":
        return "black";
      case "Running":
        return "white";
      default:
        return "black";
    }
  };

  const downloadPdf = (fileName: string) => {
    const documentPath = `${apiConfig.baseUrl}/Blob/download-file/campaigns/${fileName}`;
    const link = document.createElement("a");
    link.href = documentPath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  console.log(campaign.status);
  
  return (
    <Card className="campaign-card">
      <div className="d-flex justify-content-between">
        <div>
          <h5 style={{ fontWeight: 'bolder' }} className="mb-1">
            {campaign.name}
          </h5>
          <span
            className="campaign-status-tag"
            style={{
              backgroundColor: getBackgroundStatusColor(campaign.status),
              color: getColor(campaign.status),
            }}
          >
            {campaign.status}
          </span>
        </div>
        <div>
          <h6>{campaign.devicePhoneNumber}</h6>
        </div>
        <div className="d-flex align-items-center">
          {campaign.FileName && (
            <Button className="me-1" size="sm" variant="primary" onClick={() => downloadPdf(campaign.FileName)}>
              <FontAwesomeIcon icon={faDownload} /> {campaign.FileName}
            </Button>
          )}

          {/** cperez: Archived was removed. this feature can be added later if the client wants to do something with it. for example Clone 
           *   No need to add the button for now until we get requirements from client.
          */}
          {campaign.status !== 'Archived' && (
            <Dropdown ref={dropdownRef} show={show}>
              <MoreVertical onClick={() => setShow(prev => !prev)} />
              <Dropdown.Menu>
                {campaign.status === 'Not Started' && (
                  <>
                    <Dropdown.Item onClick={() => handleStatusChange('Running')}>
                      <Play className="me-1" size={16} /> Start
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleEdit}>
                      <FontAwesomeIcon icon={faEdit} style={{ marginRight: '8px' }} />
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setShowDelete(true)}>
                      <FontAwesomeIcon icon={faTrash} style={{ marginRight: '8px' }} />
                      Delete
                    </Dropdown.Item>
                  </>
                )}

                {campaign.status === 'Running' && (
                  <>
                    <Dropdown.Item onClick={() => handleStatusChange('Stopped')}>
                      <XOctagon className="me-1" size={16} /> Stop
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleStatusChange('Cancelled')}>
                      <X className="me-1" size={16} /> Cancel
                    </Dropdown.Item>
                  </>
                )}
                {campaign.status === 'Cancelled' && (
                  <>
                    <Dropdown.Item onClick={() => setShowDelete(true)}>
                      <FontAwesomeIcon icon={faTrash} style={{ marginRight: '8px' }} />
                      Delete
                    </Dropdown.Item>
                  </>
                )}

                {campaign.status === 'Stopped' && (
                  <>
                    <Dropdown.Item onClick={() => handleStatusChange('Running')}>
                      <Play className="me-1" size={16} /> Start
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setShowDelete(true)}>
                      <FontAwesomeIcon icon={faTrash} style={{ marginRight: '8px' }} />
                      Delete
                    </Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
          )}

        </div>
      </div>
      <div className="campaign-gray-border-bottom mb-1" />
      <div className="campaign-analytics-container">
        {/* Analytics squares */}
        <div className="campaign-analytics-square">
          <span className="campaign-analytics-title" style={{ color: '#cc6302' }}>
            Queued
          </span>
          <strong className="campaign-analytics-number">{campaign.Queued}</strong>
        </div>
        <div className="campaign-analytics-square">
          <span className="campaign-analytics-title" style={{ color: '#028a02' }}>
            Fulfilled
          </span>
          <strong className="campaign-analytics-number">{campaign.Fulfilled}</strong>
        </div>
        <div className="campaign-analytics-square">
          <span className="campaign-analytics-title" style={{ color: '#9e2222' }}>
            Failed
          </span>
          <strong className="campaign-analytics-number">{campaign.Unsuccessful}</strong>
        </div>
      </div>

      <div className="d-flex justify-content-between mb-1 px-3">
        <span className="campaign-start-date">Start Date: {moment.utc(campaign.startDate).format('MM/DD/YYYY')}</span>
        <span className="campaign-end-date">End Date: {moment.utc(campaign.endDate).format('MM/DD/YYYY')}</span>
      </div>
      <div className="px-3">
        <p className="campaign-card-description" style={{ fontStyle: 'italic', fontSize: 'small' }}>
          Description:
          {campaign.description.length > 200 ? campaign.description.substring(0, 200) + '...' : campaign.description}
        </p>
      </div>

      <ModalBase
        show={showDelete}
        onHide={() => setShowDelete(false)}
        onCancel={() => setShowDelete(false)}
        onSubmit={handleDelete}
        title="Confirm Delete"
        size="sm"
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
      >
        <div>
          Are you sure you want to delete campaign: <strong>{campaign.name}</strong>
        </div>
      </ModalBase>
    </Card>
  );
};

export default CampaignCard;
