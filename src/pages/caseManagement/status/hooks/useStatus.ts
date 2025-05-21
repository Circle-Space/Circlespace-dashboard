import { useContext } from 'react';
import { StatusContext } from '../contexts/StatusContext'; // Adjust as per your status context location

const useStatus = () => {
  const context = useContext(StatusContext);

  if (!context) throw new Error('StatusContext must be placed within StatusProvider');

  return context;
};

export default useStatus;
