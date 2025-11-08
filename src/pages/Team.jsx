import { Link } from 'react-router-dom';

function Team() {
  const team = [
    {
      name: "SBN Richard Calver",
      rank: "4th Dan Black Belt",
      image: "🥋"
    },
    {
      name: "KSN Katie Calver",
      rank: "2nd Dan Black Belt",
      image: "🥊"
    }
  ];

  return (
    <div className="bg-[#2e2e2e] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-white mb-4">Meet Our Team</h1>
          <div className="w-24 h-1 bg-[#ff6d00] mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Our experienced instructors are here to guide your journey</p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <div 
              key={index} 
              className="group bg-[#1a1a1a] rounded-2xl shadow-2xl p-10 text-center hover:shadow-[#ff6d00]/50 transition-all duration-300 hover:-translate-y-2 border-2 border-[#3d3d3d] hover:border-[#ff6d00]"
            >
              <div className="text-8xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {member.image}
              </div>
              <h3 className="text-3xl font-black mb-3 text-white">
                {member.name}
              </h3>
              <p className="text-[#ff6d00] font-bold text-xl mb-4">
                {member.rank}
              </p>
              <div className="w-16 h-1 bg-[#ff6d00] mx-auto"></div>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#ff6d00] to-[#e66200] p-8 rounded-2xl shadow-2xl">
            <h3 className="font-black text-2xl mb-4 text-white text-center">Want to Train With Us?</h3>
            <p className="text-white text-center text-lg mb-6">
              Our instructors bring decades of experience and passion for martial arts. Join us and experience world-class training.
            </p>
            <div className="text-center">
              <Link
                to="/contact"
                className="bg-black text-[#ff6d00] px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                Book Your Free Trial
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;