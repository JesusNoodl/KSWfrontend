import { useAuth } from '../../contexts/AuthContext';

/**
 * AdminDashboard
 * 
 * The main landing page for the admin area. Shows an overview of the system
 * and quick access cards to common admin tasks.
 * 
 * Future enhancements could include:
 * - Recent activity feed
 * - Quick statistics (total students, upcoming events, etc.)
 * - Alerts/notifications
 */
function AdminDashboard() {
  const { user } = useAuth();

  // Quick action cards for common admin tasks
  const quickActions = [
    {
      title: 'Enrol New Student',
      description: 'Add a new student to the system',
      icon: '➕',
      link: '/admin/enrol',
      colour: 'bg-green-600',
    },
    {
      title: 'Manage People',
      description: 'View and edit student records',
      icon: '👥',
      link: '/admin/people',
      colour: 'bg-blue-600',
    },
    {
      title: 'Promotions',
      description: 'Record belt promotions',
      icon: '🥋',
      link: '/admin/promotions',
      colour: 'bg-purple-600',
    },
    {
      title: 'Classes',
      description: 'Manage class schedule',
      icon: '📅',
      link: '/admin/classes',
      colour: 'bg-yellow-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-[#1a1a1a] rounded-2xl p-6 border-2 border-[#3d3d3d]">
        <h2 className="text-2xl font-bold text-white mb-2">
          Welcome to the Admin Dashboard
        </h2>
        <p className="text-gray-400">
          Manage students, classes, promotions, and more from here.
        </p>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickActions.map((action) => (
          <a
            key={action.title}
            href={action.link}
            className="bg-[#1a1a1a] rounded-2xl p-6 border-2 border-[#3d3d3d] hover:border-[#ff6d00] transition-all duration-300 group"
          >
            <div className="flex items-start gap-4">
              <div className={`${action.colour} p-3 rounded-xl text-2xl`}>
                {action.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#ff6d00] transition">
                  {action.title}
                </h3>
                <p className="text-gray-400 text-sm">{action.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Stats Section - Placeholder for future enhancement */}
      <div className="bg-[#1a1a1a] rounded-2xl p-6 border-2 border-[#3d3d3d]">
        <h3 className="text-lg font-bold text-white mb-4">Quick Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#2e2e2e] rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-[#ff6d00]">—</p>
            <p className="text-gray-400 text-sm">Total Students</p>
          </div>
          <div className="bg-[#2e2e2e] rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-[#ff6d00]">—</p>
            <p className="text-gray-400 text-sm">Active Classes</p>
          </div>
          <div className="bg-[#2e2e2e] rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-[#ff6d00]">—</p>
            <p className="text-gray-400 text-sm">Upcoming Events</p>
          </div>
          <div className="bg-[#2e2e2e] rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-[#ff6d00]">—</p>
            <p className="text-gray-400 text-sm">Recent Promotions</p>
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-4 text-center">
          Statistics coming soon
        </p>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-[#1a1a1a] rounded-2xl p-6 border-2 border-[#3d3d3d]">
        <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
        <div className="text-center py-8">
          <p className="text-gray-400">Activity feed coming soon</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;