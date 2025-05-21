import { useContext } from 'react';

import { LogsContext } from '../contexts/LogsContext';

const useLogs = () => {
    const context = useContext(LogsContext);

    if (!context) {
        throw new Error("LogsContext must be placed within LogsProvider");
    }

    return context;
};

export default useLogs;
