import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext.jsx';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const location = useLocation();
  const { isAuthenticated, isAuthenticating, isAdmin } = useAuth();

  if (isAuthenticating) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="glass-card w-72 rounded-3xl p-10 text-center text-lg font-semibold text-primary dark:text-accent">
          Authenticating...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
