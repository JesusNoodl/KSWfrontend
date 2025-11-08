function Contact() {
  return (
    <div className="bg-[#2e2e2e] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-white mb-4">Contact Us</h1>
          <div className="w-24 h-1 bg-[#ff6d00] mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">We'd love to hear from you</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl p-8 border-2 border-[#3d3d3d]">
            <h2 className="text-3xl font-black mb-6 text-white">Get In Touch</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-[#2e2e2e] border-2 border-[#3d3d3d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6d00] focus:border-transparent text-white placeholder-gray-500 transition"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 bg-[#2e2e2e] border-2 border-[#3d3d3d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6d00] focus:border-transparent text-white placeholder-gray-500 transition"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Phone Number</label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-3 bg-[#2e2e2e] border-2 border-[#3d3d3d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6d00] focus:border-transparent text-white placeholder-gray-500 transition"
                  placeholder="07123456789"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Message</label>
                <textarea 
                  rows="5"
                  className="w-full px-4 py-3 bg-[#2e2e2e] border-2 border-[#3d3d3d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6d00] focus:border-transparent text-white placeholder-gray-500 transition resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-[#ff6d00] to-[#e66200] text-white py-4 rounded-xl hover:from-[#e66200] hover:to-[#ff6d00] hover:scale-105 transition-all duration-300 font-bold text-lg shadow-2xl"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl p-8 border-2 border-[#3d3d3d]">
            <h2 className="text-3xl font-black mb-6 text-white">Visit Us</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-[#ff6d00] pl-4">
                <h3 className="font-bold text-[#ff6d00] text-lg mb-2">Address</h3>
                <p className="text-gray-300 text-lg">
                  123 Martial Arts Way<br/>
                  Fakenham, Norfolk<br/>
                  NR21 1AA
                </p>
              </div>

              <div className="border-l-4 border-[#ff6d00] pl-4">
                <h3 className="font-bold text-[#ff6d00] text-lg mb-2">Phone</h3>
                <p className="text-gray-300 text-lg">0161 123 4567</p>
              </div>

              <div className="border-l-4 border-[#ff6d00] pl-4">
                <h3 className="font-bold text-[#ff6d00] text-lg mb-2">Email</h3>
                <p className="text-gray-300 text-lg">info@fakenhamma.com</p>
              </div>

              <div className="border-l-4 border-[#ff6d00] pl-4">
                <h3 className="font-bold text-[#ff6d00] text-lg mb-2">Training Hours</h3>
                <p className="text-gray-300 text-lg">
                  Monday - Friday: 5:00 PM - 9:00 PM<br/>
                  Saturday: 9:00 AM - 1:00 PM<br/>
                  Sunday: 9:00 AM - 10:00 AM
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 pt-8 border-t-2 border-[#3d3d3d]">
              <button className="w-full bg-gradient-to-r from-[#ff6d00] to-[#e66200] text-white py-4 rounded-xl hover:from-[#e66200] hover:to-[#ff6d00] hover:scale-105 transition-all duration-300 font-bold text-lg shadow-2xl">
                Book a Free Trial Class
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;