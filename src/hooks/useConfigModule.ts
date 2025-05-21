import { useContext } from 'react';
import { ConfigModuleContext } from '../contexts/ConfigModuleContext';

const useConfigModule = () => {
  const context = useContext(ConfigModuleContext);

  if (!context) {
    throw new Error('ConfigModuleContext must be placed within ConfigModuleProvider');
  }

  return context;
};

export default useConfigModule;
