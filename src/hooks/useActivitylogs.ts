import { useContext } from "react";

import { ActivityLogContext } from "../contexts/ActivitylogsContext";

const useActivityLogs = () => {
    const context = useContext(ActivityLogContext);

    if (!context) {
        throw new Error("ActivityLogContext must be placed within ActivityLogProvider");
    }

    return context;
};

export default useActivityLogs;
