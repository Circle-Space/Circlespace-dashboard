import { PaginationInfo, PaginationType } from '../../../types/apiResponse';
import { Feature } from './featuresTypes';

export type FeatureState = {
  features: Feature[];
  feature: Feature;
  error: string;
  selectedFeature: Feature;
  searchVal: string;
  featurePagination: PaginationInfo;
};

export type FeatureContextType = FeatureState & {
  getFeatures: (paginationType: PaginationType, onSuccess?: () => void) => Promise<void>;
  getFeaturesbyId: (id: string, callback?: () => void) => Promise<void>;
  addFeature: (feature: Feature, onSuccess?: () => void) => void;
  updateFeature: (feature: Feature, onSuccess?: () => void) => void;
  deleteFeature: (feature: Feature, onSuccess?: () => void) => void;
  searchFeatures: (paginationType: PaginationType, searchKey: string, onSuccess?: () => void) => void;
  clearFeatures: () => void;
};

export type FeatureAction =
  | {
      type: 'GET_FEATURES';
      payload: {
        features: Feature[];
        featurePagination: PaginationInfo;
      };
    }
  | {
      type: 'GET_FEATURES_ID';
      payload: {
        features: Feature;
      };
    }
  | {
      type: 'DELETE_FEATURE';
      payload: Feature;
    }
  | {
      type: 'SEARCH_FEATURE';
      payload: {
        features: Feature[];
        featurePagination: PaginationInfo;
      };
    }
  | {
      type: 'SET_SEARCH_VAL_FEATURE';
      payload: string;
    }
  | {
      type: 'SET_ERROR';
      payload: string;
    }
  | {
      type: 'CLEAR_FEATURES';
    };
