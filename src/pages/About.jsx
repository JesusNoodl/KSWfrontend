function About() {
  return (
    <div className="bg-[#2e2e2e] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-white mb-4">About Fakenham Martial Arts</h1>
          <div className="w-24 h-1 bg-[#ff6d00] mx-auto"></div>
        </div>

        {/* Our Story */}
        <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl p-10 mb-10 border-2 border-[#3d3d3d] hover:border-[#ff6d00] transition-all duration-300">
          <h2 className="text-3xl font-black mb-6 text-[#ff6d00]">Our Story</h2>
          <p className="text-gray-300 mb-6 text-lg leading-relaxed">
            KSW Martial Arts was founded in 2010 with a mission to provide high-quality martial arts 
            training to students of all ages and skill levels. Our school combines traditional values 
            with modern teaching methods to create a welcoming environment for everyone.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            We believe that martial arts is more than just physical training—it's a path to personal 
            growth, discipline, and self-confidence. Our experienced instructors are dedicated to 
            helping each student reach their full potential.
          </p>
        </div>

        {/* Mission & Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl p-10 border-t-4 border-[#ff6d00] hover:shadow-[#ff6d00]/50 transition-all duration-300">
            <h3 className="text-2xl font-black mb-4 text-white">Our Mission</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              To empower students through martial arts training, fostering discipline, respect, 
              and personal excellence in a supportive community environment.
            </p>
          </div>

          <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl p-10 border-t-4 border-[#ff6d00] hover:shadow-[#ff6d00]/50 transition-all duration-300">
            <h3 className="text-2xl font-black mb-4 text-white">Our Values</h3>
            <ul className="text-gray-300 space-y-3 text-lg">
              <li className="flex items-center">
                <span className="text-[#ff6d00] mr-3 text-2xl">•</span>
                Respect for all
              </li>
              <li className="flex items-center">
                <span className="text-[#ff6d00] mr-3 text-2xl">•</span>
                Continuous improvement
              </li>
              <li className="flex items-center">
                <span className="text-[#ff6d00] mr-3 text-2xl">•</span>
                Community focus
              </li>
              <li className="flex items-center">
                <span className="text-[#ff6d00] mr-3 text-2xl">•</span>
                Excellence in teaching
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-[#ff6d00] to-[#e66200] p-10 rounded-2xl shadow-2xl text-center">
          <h3 className="font-black text-3xl mb-4 text-white">Ready to Start Your Journey?</h3>
          <p className="text-white text-lg mb-6">
            Join our martial arts family and discover what you're truly capable of
          </p>
          <button className="bg-black text-[#ff6d00] px-12 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 shadow-2xl">
            Contact Us Today
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;