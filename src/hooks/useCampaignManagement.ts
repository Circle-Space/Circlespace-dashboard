import { useContext } from "react";
import { CampaignManagementContext } from "../contexts/CampaignManagementContext";

const useCampaignmanagement = () => {
    const context = useContext(CampaignManagementContext);

    if (!context) {
        throw new Error("CampaignManagementContext must be placed within CampaignManagementProvider");
    }

    return context;
};

export default useCampaignmanagement;
