import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link, useLocation, Outlet } from 'react-router-dom';

/**
 * AdminLayout
 * 
 * The main layout wrapper for all admin pages. Similar structure to MemberLayout
 * but with admin-specific navigation items and styling.
 * 
 * Features:
 * - Header with user info and sign out
 * - Sidebar navigation with admin menu items
 * - Main content area where child routes render via <Outlet />
 * - Quick link back to member area (admins can still view member content)
 */
function AdminLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Check if current path matches (for highlighting active nav item)
  const isActive = (path) => location.pathname === path;
  
  // Check if current path starts with (for nested routes)
  const isActiveSection = (path) => location.pathname.startsWith(path);

  // Admin navigation items - organised by category
  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊', exact: true },
    { path: '/admin/people', label: 'People', icon: '👥' },
    { path: '/admin/enrol', label: 'Enrol New Student', icon: '➕' },
    { path: '/admin/users', label: 'User Accounts', icon: '🔐' },
    { path: '/admin/classes', label: 'Classes', icon: '📅' },
    { path: '/admin/promotions', label: 'Promotions', icon: '🥋' },
    { path: '/admin/awards', label: 'Awards', icon: '🏆' },
    { path: '/admin/events', label: 'Events', icon: '📆' },
    { path: '/admin/contacts', label: 'Contacts', icon: '📞' },
  ];

  return (
    <div className="bg-[#2e2e2e] min-h-screen">
      {/* Header */}
      <div className="bg-[#1a1a1a] border-b-2 border-[#ff6d00]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-black text-white">Admin Area</h1>
                <span className="bg-[#ff6d00] text-black text-xs font-bold px-2 py-1 rounded">
                  ADMIN
                </span>
              </div>
              <p className="text-gray-400 text-sm">{user?.email}</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Quick link to member area */}
              <Link
                to="/member"
                className="text-gray-400 hover:text-white transition text-sm"
              >
                ← Member Area
              </Link>
              <button
                onClick={handleSignOut}
                className="bg-[#ff6d00] text-black px-6 py-2 rounded-lg font-bold hover:bg-[#e66200] transition"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl p-4 border-2 border-[#3d3d3d] sticky top-4">
              <nav className="space-y-2">
                {navItems.map((item) => {
                  // For the dashboard, only highlight on exact match
                  // For other items, highlight if path starts with the item path
                  const active = item.exact 
                    ? isActive(item.path)
                    : isActiveSection(item.path);
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                        active
                          ? 'bg-[#ff6d00] text-white font-bold'
                          : 'text-gray-300 hover:bg-[#2e2e2e] hover:text-white'
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
              
              {/* Separator */}
              <hr className="border-[#3d3d3d] my-4" />
              
              {/* Back to public site link */}
              <Link
                to="/"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#2e2e2e] hover:text-white transition-all duration-300"
              >
                <span className="text-xl">🏠</span>
                <span>Public Site</span>
              </Link>
            </div>
          </div>

          {/* Main Content Area - Child routes render here */}
          <div className="lg:col-span-3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;