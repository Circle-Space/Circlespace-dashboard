import { ConfigModule } from './configModuleTypes';

export type ConfigModuleState = {
  loading: boolean;
  configModule: ConfigModule[];
  error: string;
};

export type ConfigModuleContextType = ConfigModuleState & {
  getConfigModule: () => void;
};

export type ConfigModuleAction =
  | {
      type: 'GET_CONFIGMODULE';
      payload: {
        configModule: ConfigModule[];
      };
    }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };
