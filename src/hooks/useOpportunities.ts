import { useContext } from "react";

import {
    OpportunityContext,
} from "../contexts/OpportunitiesContext"; // Assuming you have an OpportunitiesContext

const useOpportunitiesManagement = () => {
    const context = useContext(OpportunityContext);

    if (!context) {
        throw new Error("OpportunitiesManagementContext must be placed within OpportunitiesManagementProvider");
    }

    return context;
};

export default useOpportunitiesManagement;
