import { useContext } from "react";

import { AnalyticsContext } from "../contexts/AnalyticsContext";
const useAnalytics = () => {
    const context = useContext(AnalyticsContext);

    if (!context)
        throw new Error("AnalyticstContext must be placed within DeviceManagementProvider");

    return context;
};

export default useAnalytics;
