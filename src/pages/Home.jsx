function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to Fakenham Martial Arts
          </h1>
          <p className="text-xl mb-8">
            Transform your mind, body, and spirit through martial arts
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Get Started Today
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <div className="text-4xl mb-4">🥋</div>
            <h3 className="text-xl font-bold mb-3">Expert Instructors</h3>
            <p className="text-gray-600">
              Learn from certified black belt instructors with decades of experience
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
            <h3 className="text-xl font-bold mb-3">All Ages Welcome</h3>
            <p className="text-gray-600">
              Classes designed for kids, teens, and adults at every skill level
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-bold mb-3">Modern Facilities</h3>
            <p className="text-gray-600">
              Train in our state-of-the-art dojo with professional equipment
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;