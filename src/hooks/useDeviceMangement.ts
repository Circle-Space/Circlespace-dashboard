import { useContext } from "react";

import { DeviceContext } from "../contexts/DeviceContext";
const useDeviceManagement = () => {
  const context = useContext(DeviceContext);

  if (!context)
    throw new Error(
      "DeviceManagementContext must be placed within DeviceManagementProvider"
    );

  return context;
};

export default useDeviceManagement;
