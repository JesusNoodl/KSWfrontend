import { Link } from 'react-router-dom';
import { useState } from 'react';

function Home() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#ff6d00] via-[#ff8533] to-[#e66200] text-black overflow-hidden pb-0">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-black rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-black rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight">
            Welcome to<br />
            <span className="text-white drop-shadow-lg">Fakenham Martial Arts</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-medium text-gray-900">
            Transform your mind, body, and spirit through martial arts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-black text-[#ff6d00] px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-900 hover:scale-105 transition-all duration-300 shadow-2xl inline-block"
            >
              Get Started Today
            </Link>
            <button 
              onClick={() => setShowVideo(true)}
              className="bg-white text-black px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-2xl border-2 border-black"
            >
              Watch Video
            </button>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 -mb-1">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="#2e2e2e"/>
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-[#2e2e2e] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl text-white md:text-5xl font-black mb-4">Why Choose Us?</h2>
            <div className="w-24 h-1 bg-[#ff6d00] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-[#ff6d00]">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🥋</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Expert Instructors</h3>
              <p className="text-gray-600 leading-relaxed">
                Learn from certified black belt instructors with decades of experience in traditional martial arts
              </p>
            </div>

            {/* Card 2 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-[#ff6d00]">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">👨‍👩‍👧‍👦</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">All Ages Welcome</h3>
              <p className="text-gray-600 leading-relaxed">
                Classes designed for kids, teens, and adults at every skill level from beginner to black belt
              </p>
            </div>

            {/* Card 3 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-[#ff6d00]">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🏆</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Modern Facilities</h3>
              <p className="text-gray-600 leading-relaxed">
                Train in our dojang with professional instructors and a welcoming atmosphere
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-[#2e2e2e] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Begin Your Journey?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Join our community and discover the benefits of martial arts training
          </p>
          <Link
            to="/contact"
            className="bg-[#ff6d00] text-black px-12 py-4 rounded-xl font-bold text-lg hover:bg-[#e66200] hover:scale-105 transition-all duration-300 shadow-2xl inline-block"
          >
            Book Your Free Trial
          </Link>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <div 
            className="relative bg-[#1a1a1a] rounded-2xl shadow-2xl max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-4 -right-4 bg-[#ff6d00] text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold hover:bg-[#e66200] hover:scale-110 transition-all duration-300 shadow-2xl z-10"
              aria-label="Close video"
            >
              ×
            </button>

            {/* Video Container */}
            <div className="p-6">
              <div className="relative w-full" style={{ paddingBottom: '177.5%' }}>
                <iframe 
                  src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2FFakenhamkuksoolwon%2Fvideos%2F873246978349256%2F&show_text=false&width=267&t=0" 
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  style={{ border: 'none' }}
                  scrolling="no" 
                  frameBorder="0" 
                  allowFullScreen={true} 
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;