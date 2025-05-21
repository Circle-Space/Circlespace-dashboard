import React from 'react';
import { Spinner } from 'react-bootstrap';

interface LoadingOverlayProps {
  loading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="loading-overlay">
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default LoadingOverlay;