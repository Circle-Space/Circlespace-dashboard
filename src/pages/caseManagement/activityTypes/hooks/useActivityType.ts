import { useContext } from 'react';
import { ActivityTypeContext } from '../contexts/ActivityTypeContext';

const useActivityType = () => {
  const context = useContext(ActivityTypeContext);

  if (!context) throw new Error('ActivityTypeContext must be placed within ActivityTypeProvider');

  return context;
};

export default useActivityType;
