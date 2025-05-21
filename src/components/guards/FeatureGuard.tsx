import React from "react";
import { Navigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import Loader from "../Loader";

interface FeatureGuardType {
  children: React.ReactNode;
  featureKey: string;
}

// For routes that can only be accessed by users with allowed permissions
function FeatureGuard({ children, featureKey }: FeatureGuardType) {
  const { isAuthenticated, isInitialized, user } = useAuth();

  if(!isInitialized) {
    return <Loader/>
  }
  
  if (!user?.Features.includes(featureKey)) {
    return <Navigate to="/auth/404" />;
  }

  return <React.Fragment>{children}</React.Fragment>;
}

export default FeatureGuard;
