import { Link } from 'react-router-dom';

function MemberDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl p-8 border-2 border-[#3d3d3d]">
        <h2 className="text-3xl font-black text-white mb-4">Welcome to Your Member Area</h2>
        <p className="text-gray-400 text-lg">
          Use the navigation on the left to view your details, promotion history, and more.
        </p>
      </div>

      {/* Quick Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/member/details" className="bg-gradient-to-br from-[#ff6d00] to-[#e66200] rounded-2xl shadow-2xl p-6 text-white hover:scale-105 transition-transform duration-300">
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-2xl font-black mb-2">Student Details</h3>
          <p className="opacity-90">View and manage your personal information</p>
        </Link>

        <Link to="/member/promotions" className="bg-gradient-to-br from-[#ff6d00] to-[#e66200] rounded-2xl shadow-2xl p-6 text-white hover:scale-105 transition-transform duration-300">
          <div className="text-4xl mb-4">🥋</div>
          <h3 className="text-2xl font-black mb-2">Promotions</h3>
          <p className="opacity-90">Track your belt progression and achievements</p>
        </Link>

        <Link to="/member/awards" className="bg-gradient-to-br from-[#ff6d00] to-[#e66200] rounded-2xl shadow-2xl p-6 text-white hover:scale-105 transition-transform duration-300">
          <div className="text-4xl mb-4">🏆</div>
          <h3 className="text-2xl font-black mb-2">Awards</h3>
          <p className="opacity-90">View your awards</p>
        </Link>

      </div>

      {/* Announcement Card */}
      <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl p-6 border-l-4 border-[#ff6d00]">
        <h3 className="text-xl font-bold text-white mb-2">📢 Announcements</h3>
        <p className="text-gray-400">
          Check the News section regularly for updates about upcoming events, gradings, and important information.
        </p>
      </div>
    </div>
  );
}

export default MemberDashboard;