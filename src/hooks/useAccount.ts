import { useContext } from "react";

import { AccountContext } from "../contexts/AccountContext";

const useAccount = () => {
    const context = useContext(AccountContext);

    if (!context)
        throw new Error("AccountManagementContext must be placed within AccountManagementProvider");

    return context;
};

export default useAccount;
