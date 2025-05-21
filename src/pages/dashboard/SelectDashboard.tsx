import React, { useState } from 'react';

import {
    Col,
    Form,
    Row,
} from 'react-bootstrap';
import Select from 'react-select';

interface Props {
    selectedCampaign: string;
    setSelectedCampaign: (campaignId: string) => void;
}

const SelectDashboard = ({ selectedCampaign, setSelectedCampaign }: Props) => {
    const [selectedOption, setSelectedOption] = useState<string>(selectedCampaign);

    const dashboardOptions = [
        { label: 'Default', value: 'Default' },
        { label: 'Campaign Dashboard', value: 'Campaign Dashboard' },
    ];

    return (
        <Row className="mb-1 p-2">
            <Form.Group as={Col} md={2}>
                <Form.Label>Select Dashboard</Form.Label>
                <Select
                    className="react-select-container"
                    options={dashboardOptions}
                    getOptionLabel={(option) => option.label}
                    value={selectedOption ? { label: selectedOption, value: selectedOption } : null}
                    onChange={(option) => {
                        if (option) {
                            setSelectedOption(option.value as string);
                            setSelectedCampaign(option.value === 'Campaign Dashboard' ? 'Campaign Dashboard' : 'Default');
                        }
                    }}
                />
            </Form.Group>
        </Row>
    );
};

export default SelectDashboard;
