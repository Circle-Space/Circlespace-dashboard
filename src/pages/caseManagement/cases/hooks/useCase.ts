import { useContext } from 'react';
import { CaseContext } from '../contexts/CaseContext'; // Adjust path as per your actual context location

const useCase = () => {
  const context = useContext(CaseContext);

  if (!context) throw new Error('CaseManagementContext must be placed within CaseManagementProvider');

  return context;
};

export default useCase;
