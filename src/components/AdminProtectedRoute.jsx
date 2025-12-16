import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * AdminProtectedRoute
 * 
 * A wrapper component that protects routes requiring admin access.
 * It checks both authentication status AND admin role before allowing access.
 * 
 * Flow:
 * 1. If still loading auth state -> Show loading spinner
 * 2. If not logged in -> Redirect to login page
 * 3. If logged in but role still loading -> Show loading spinner
 * 4. If logged in but NOT admin -> Redirect to member area (they don't have permission)
 * 5. If logged in AND admin -> Render the protected content
 */
function AdminProtectedRoute({ children }) {
  const { user, loading, userRole, roleLoading, isAdmin } = useAuth();

  // Still checking if user is logged in
  if (loading) {
    return (
      <div className="bg-[#2e2e2e] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6d00] mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  // User is not logged in at all -> send to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // User is logged in, but we're still fetching their role
  if (roleLoading) {
    return (
      <div className="bg-[#2e2e2e] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6d00] mx-auto mb-4"></div>
          <p className="text-white text-xl">Checking permissions...</p>
        </div>
      </div>
    );
  }

  // User is logged in but doesn't have admin role -> redirect to member area
  if (!isAdmin()) {
    return <Navigate to="/member" />;
  }

  // User is admin -> show the protected content
  return children;
}

export default AdminProtectedRoute;