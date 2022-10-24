import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthn } from '../contexts/AuthnProvider';
import getRoutes from '../routes';

const RequireAuthn = ({ children }) => {
  const { user } = useAuthn();

  return (
    user ? children : <Navigate to={getRoutes.signInPagePath()} />
  );
};

export default RequireAuthn;
