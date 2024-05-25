import { Outlet, Navigate } from 'react-router-dom'
import isAuthentication from './auth';

const PrivateRoutes = () => {
  return isAuthentication() ? <Outlet /> : <Navigate to="/SignIn" />;
}

export default PrivateRoutes;
