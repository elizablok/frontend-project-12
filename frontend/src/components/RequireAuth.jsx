import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import getRoutes from '../routes';

const RequireAuth = ({ children }) => {
  const { user } = useAuth();

  return (
    user ? children : <Navigate to={getRoutes.signInPagePath()} />
  );
};

export default RequireAuth;
