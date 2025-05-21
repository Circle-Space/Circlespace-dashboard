import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const useUsers = () => {
  const context = useContext(UserContext);

  if (!context)
    throw new Error(
      "UserManagementContext must be placed within UserManagementProvider"
    );

  return context;
};

export default useUsers;
