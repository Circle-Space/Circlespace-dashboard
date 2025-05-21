import { useContext } from "react";

import { RolesContext } from "../contexts/RolesContext";

const useRoles = () => {
    const context = useContext(RolesContext);

    if (!context)
        throw new Error("RolesContext must be placed within RolesProvider");

    return context;
};

export default useRoles;
