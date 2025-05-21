import { useContext } from 'react';
import { PriorityContext } from '../contexts/PriorityContext'; // Adjust as per your priority context location

const usePriority = () => {
  const context = useContext(PriorityContext);

  if (!context) throw new Error('PriorityContext must be placed within PriorityProvider');

  return context;
};

export default usePriority;
