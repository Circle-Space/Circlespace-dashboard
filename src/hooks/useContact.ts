import { useContext } from "react";

import { ContactContext } from "../contexts/ContactContext";
const useContact = () => {
  const context = useContext(ContactContext);

  if (!context)
    throw new Error(
      "ContactManagementContext must be placed within ContactManagementProvider"
    );

  return context;
};

export default useContact;
