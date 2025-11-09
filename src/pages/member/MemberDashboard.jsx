import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';

function MemberDashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/member', label: 'Dashboard', icon: '🏠' },
    { path: '/member/details', label: 'My Details', icon: '👤' },
    { path: '/member/promotions', label: 'Promotions', icon: '🥋' },
    { path: '/member/classes', label: 'My Classes', icon: '📅' },
    { path: '/member/news', label: 'News', icon: '📰' },
    { path: '/member/locations', label: 'Locations', icon: '📍' },
    { path: '/member/cancelled', label: 'Cancelled Classes', icon: '🚫' },
  ];

  return (
    <div className="bg-[#2e2e2e] min-h-screen">
      {/* Header */}
      <div className="bg-[#1a1a1a] border-b-2 border-[#ff6d00]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-black text-white">Member Area</h1>
              <p className="text-gray-400 text-sm">{user?.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="bg-[#ff6d00] text-black px-6 py-2 rounded-lg font-bold hover:bg-[#e66200] transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl p-4 border-2 border-[#3d3d3d] sticky top-4">
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive(item.path)
                        ? 'bg-[#ff6d00] text-white font-bold'
                        : 'text-gray-300 hover:bg-[#2e2e2e] hover:text-white'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberDashboard;